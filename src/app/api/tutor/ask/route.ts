import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"
import { auth } from "@/auth"
import { getScaffoldResponse, type ScaffoldLevel } from "@/lib/ai/scaffolding"

export const maxDuration = 60; // Allow AI route to run up to 60 seconds on Vercel

// ─── Free chat system prompt (replaces the deleted /api/tutor/chat) ───────────
const FREE_CHAT_SYSTEM_PROMPT = `Kamu adalah AI Tutor UTBK bernama "Lexica AI". Kamu membantu siswa Indonesia mempersiapkan ujian UTBK/SNBT.

Peranmu:
- Menjawab pertanyaan seputar materi UTBK (TPS, Literasi, Penalaran Matematika, dll)
- Memberikan tips belajar dan strategi ujian
- Memotivasi siswa
- Menjelaskan konsep dengan bahasa yang mudah dipahami

Aturan:
- Jawaban singkat dan to the point (sesuai preferensi panjang respons)
- Sesuaikan gaya bahasa dan tingkat energi sesuai preferensi siswa
- Jika ditanya di luar konteks pendidikan/UTBK, arahkan kembali ke topik belajar`

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Login diperlukan." }, { status: 401 })
    }

    const { question, studentAnswer, correctAnswer, currentLevel, questionId, history, freeMessage } =
      await req.json()

    // ─── Free chat mode (replaces old /api/tutor/chat) ────────────────────────
    if (freeMessage) {
      if (!freeMessage.trim()) {
        return NextResponse.json({ error: "Pesan tidak boleh kosong." }, { status: 400 })
      }

      const apiKey = process.env.OPENROUTER_API_KEY
      if (!apiKey) {
        return NextResponse.json(
          { response: "[Mode Offline - API Key Belum Diisi]\n\nSepertinya kunci API AI belum dikonfigurasi. Hubungi admin." },
          { status: 200 }
        )
      }

      // Fetch student's AI preferences directly from session (Zero DB Hit Optimization)
      // Fallback to DB if session doesn't have it (e.g., old session token)
      let aiStyle = (session.user as any)?.aiStyle;
      let aiEnergy = (session.user as any)?.aiEnergy;
      let aiLength = (session.user as any)?.aiLength;
      let targetMajor = (session.user as any)?.targetMajor;

      if (!aiStyle) {
        const user = await prisma.user.findUnique({
          where: { id: session.user.id },
          select: { profile: { select: { targetMajor1: { select: { name: true, university: { select: { name: true } } } }, aiStyle: true, aiEnergy: true, aiLength: true } } }
        });
        aiStyle = user?.profile?.aiStyle || "default";
        aiEnergy = user?.profile?.aiEnergy || "default";
        aiLength = user?.profile?.aiLength || "normal";
        targetMajor = user?.profile?.targetMajor1 ? `${user.profile.targetMajor1.name} — ${user.profile.targetMajor1.university.name}` : undefined;
      }

      let stylePrompt = ""
      switch (aiStyle) {
        case "professional": stylePrompt = "Bicaralah dengan nada yang rapi, presisi, dan sangat formal layaknya guru besar."; break;
        case "friendly": stylePrompt = "Bicaralah dengan nada yang sangat ramah, hangat, akrab, dan menyemangati (seperti kakak kelas yang baik)."; break;
        case "honest": stylePrompt = "Bicaralah secara terus terang, jujur tanpa basa-basi. Jika salah, langsung katakan salah dengan tegas tapi membangun."; break;
        case "quirky": stylePrompt = "Bicaralah dengan gaya yang nyentrik, menyenangkan, dan sedikit humoris ala anak Gen-Z (gunakan kata gaul sesekali, tapi jangan berlebihan)."; break;
        case "efficient": stylePrompt = "Bicaralah sesingkat mungkin, lugas, langsung ke intinya tanpa kalimat pengantar yang panjang."; break;
        case "sarcastic": stylePrompt = "Bicaralah dengan nada sedikit sarkastis dan jenaka layaknya kritikus cerdas, TAPI pastikan kamu tetap memberikan penjelasan materi yang sangat logis, edukatif, dan tidak menghina/merendahkan."; break;
      }

      let energyPrompt = ""
      switch (aiEnergy) {
        case "high": energyPrompt = "Gunakan tingkat energi yang sangat tinggi, seru, dan bersemangat!"; break;
        case "low": energyPrompt = "Gunakan tingkat energi yang tenang, kalem, dan netral."; break;
      }

      let lengthPrompt = ""
      switch (aiLength) {
        case "short": lengthPrompt = "Buat respons SANGAT SINGKAT (1-2 kalimat saja), langsung to the point."; break;
        case "long": lengthPrompt = "Buat respons PANJANG, detail, elaboratif, dan deskriptif."; break;
        default: lengthPrompt = "Buat respons dengan panjang NORMAL (sewajarnya)."; break;
      }

      let finalSystemPrompt = FREE_CHAT_SYSTEM_PROMPT
      if (stylePrompt || energyPrompt || lengthPrompt) {
        finalSystemPrompt += `\n\nATURAN GAYA BAHASA & PERSONALITY:\n- Gaya: ${stylePrompt}\n- Energi: ${energyPrompt}\n- Panjang: ${lengthPrompt}\n\nGUARDRAIL MUTLAK: Walaupun kamu mengadopsi persona di atas, tugas utamamu adalah MENGAJAR. Jawabanmu harus LOGIS, MASUK AKAL, dan MENJAWAB PERTANYAAN siswa. Jangan biarkan gaya bahasamu merusak kualitas penjelasan materimu!`
      }

      const trimmedFreeHistory = (history || []).slice(-4)
      const formattedHistory = trimmedFreeHistory
        .filter((_: unknown, index: number) => index > 0)
        .map((msg: { role: string; content: string }) => ({
          role: msg.role === "assistant" ? "assistant" : "user",
          content: msg.content,
        }))

      const messages = [
        { role: "system", content: finalSystemPrompt },
        ...formattedHistory,
        { role: "user", content: freeMessage },
      ]

      const startTime = performance.now()
      const shuffledModels = [
        "google/gemini-2.5-flash",
        "meta-llama/llama-3.1-8b-instruct:free",
        "qwen/qwen-2.5-7b-instruct:free"
      ].sort(() => Math.random() - 0.5)

      // Caching logic
      const promptHash = crypto.createHash('sha256').update(JSON.stringify(messages)).digest('hex')
      const cachedResponse = await prisma.aiResponseCache.findUnique({ where: { promptHash } })

      if (cachedResponse) {
        const duration = Math.round(performance.now() - startTime)
        console.log(`\n===========================================`)
        console.log(`🧠 [AI TUTOR LOG - FREE CHAT MODE] [CACHE HIT]`)
        console.log(`===========================================`)
        console.log(`📅 Waktu       : ${new Date().toLocaleString('id-ID')}`)
        console.log(`⏱️ Latensi     : ${duration}ms (0 Token)`)
        console.log(`-------------------------------------------`)
        console.log(`🤖 OUTPUT AI: \n${cachedResponse.response}`)
        console.log(`===========================================\n`)
        
        return NextResponse.json({ 
          response: cachedResponse.response, 
          aiLog: { mode: "FREE CHAT (CACHED)", latencyMs: duration, timestamp: new Date().toLocaleString('id-ID') } 
        })
      }

      const fetchWithRetry = async (url: string, options: RequestInit, maxRetries = 3) => {
        for (let i = 0; i < maxRetries; i++) {
          const res = await fetch(url, options)
          if (res.ok) return res
          if (res.status === 429 || res.status >= 500) {
            if (i === maxRetries - 1) return res
            await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000))
            continue
          }
          return res
        }
        throw new Error("Fetch failed completely")
      }

      const openRouterRes = await fetchWithRetry("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${apiKey}`, 
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "UTBK App Skripsi"
        },
        body: JSON.stringify({ models: shuffledModels, messages, temperature: 0.6, max_tokens: 350 }),
      })

      if (!openRouterRes.ok) {
        const errText = await openRouterRes.text()
        console.error("OpenRouter API error (free chat):", errText)
        throw new Error(`OpenRouter returned ${openRouterRes.status}`)
      }

      const data = await openRouterRes.json()
      const duration = Math.round(performance.now() - startTime)

      console.log(`\n===========================================`)
      console.log(`🧠 [AI TUTOR LOG - FREE CHAT MODE]`)
      console.log(`===========================================`)
      console.log(`📅 Waktu       : ${new Date().toLocaleString('id-ID')}`)
      console.log(`⏱️ Latensi     : ${duration}ms`)
      console.log(`📊 Models      : ${shuffledModels.map(m => m.split('/')[1].split(':')[0]).join(' -> ')} (Shuffled Fallback)`)
      if (data.usage) {
        console.log(`🪙 Token       : Prompt (${data.usage.prompt_tokens}) | Completion (${data.usage.completion_tokens}) | Total (${data.usage.total_tokens})`)
      }
      console.log(`-------------------------------------------`)
      console.log(`📥 PROSES KE OPENROUTER API (Full Messages Payload):`)
      messages.forEach((msg: any) => {
        console.log(`[${msg.role.toUpperCase()}]\n${msg.content}\n`)
      })
      console.log(`-------------------------------------------`)
      console.log(`🤖 OUTPUT AI: \n${data.choices[0].message.content}`)
      console.log(`===========================================\n`)

      const aiLog = {
        mode: "FREE CHAT",
        timestamp: new Date().toLocaleString('id-ID'),
        latencyMs: duration,
        models: shuffledModels,
        usage: data.usage,
        messages: messages,
        output: data.choices[0].message.content
      }

      // Save to cache (non-blocking)
      prisma.aiResponseCache.upsert({
        where: { promptHash },
        update: {},
        create: { promptHash, response: data.choices[0].message.content }
      }).catch(err => console.error("Cache save error:", err))

      return NextResponse.json({ response: data.choices[0].message.content, aiLog })
    }

// ─── Scaffolded tutoring mode ──────────────────────────────────────────────
// If the request lacks a correct answer, try to resolve it from the database.
if (!question) {
  return NextResponse.json(
    { error: "Data soal wajib diisi." },
    { status: 400 }
  )
}

    // Resolve scaffolding level
    let level: ScaffoldLevel = "SOCRATIC"
    if (currentLevel && ["HINT", "SOCRATIC", "SOLUTION"].includes(currentLevel)) {
      level = currentLevel as ScaffoldLevel
    }

    let resolvedCorrectAnswer = correctAnswer;

    let aiStyle = (session.user as any)?.aiStyle;
    let aiEnergy = (session.user as any)?.aiEnergy;
    let aiLength = (session.user as any)?.aiLength;
    let targetMajor = (session.user as any)?.targetMajor;

    // ── PARALLEL: fetch correctAnswer (if missing) + DB fallback simultaneously ─
    const [dbQuestion, userProfile] = await Promise.all([
      (!resolvedCorrectAnswer && questionId)
        ? prisma.question.findUnique({ where: { id: questionId }, include: { options: true } })
        : Promise.resolve(null),
      (!aiStyle) ? prisma.user.findUnique({
        where: { id: session.user.id },
        select: { profile: { select: { aiStyle: true, aiEnergy: true, aiLength: true, targetMajor1: { select: { name: true, university: { select: { name: true } } } } } } },
      }) : Promise.resolve(null),
    ])

    if (!resolvedCorrectAnswer) {
      const correctOpt = dbQuestion?.options.find((o) => o.isCorrect)
      resolvedCorrectAnswer = correctOpt?.text ?? ""
    }

    if (!resolvedCorrectAnswer) {
      return NextResponse.json({ error: "Jawaban benar tidak tersedia." }, { status: 400 })
    }

    if (!aiStyle) {
      aiStyle = userProfile?.profile?.aiStyle || "default"
      aiEnergy = userProfile?.profile?.aiEnergy || "default"
      aiLength = userProfile?.profile?.aiLength || "normal"
      if (userProfile?.profile?.targetMajor1) {
        targetMajor = `${userProfile.profile.targetMajor1.name} — ${userProfile.profile.targetMajor1.university.name}`
      }
    }
    // ─────────────────────────────────────────────────────────────────────────

    const scaffoldResult = await getScaffoldResponse(
      level,
      question,
      studentAnswer || "(tidak menjawab)",
      resolvedCorrectAnswer,
      history || [],
      targetMajor,
      aiStyle,
      aiEnergy,
      aiLength
    )

    const responseText = scaffoldResult.text;
    const aiLog = scaffoldResult.logData;

    // Persist TutoringSession and TutoringMessage (non-blocking — don't await)
    if (session.user.id && questionId) {
      const userId = session.user.id;
      (async () => {
        try {
          let tutoringSession = await prisma.tutoringSession.findFirst({
            where: { userId, questionId },
            orderBy: { createdAt: "desc" },
          })

          if (!tutoringSession) {
            tutoringSession = await prisma.tutoringSession.create({
              data: { userId, questionId, level },
            })
          } else {
            await prisma.tutoringSession.update({ where: { id: tutoringSession.id }, data: { level } })
          }

          if (studentAnswer) {
            await prisma.tutoringMessage.create({
              data: { sessionId: tutoringSession.id, role: "USER", content: studentAnswer },
            })
          }

          await prisma.tutoringMessage.create({
            data: { sessionId: tutoringSession.id, role: "ASSISTANT", content: responseText },
          })
        } catch (dbErr) {
          console.error("Failed to persist tutoring session:", dbErr)
        }
      })()
    }

    return NextResponse.json({ level, response: responseText, aiLog })
  } catch (error) {
    console.error("Tutor API error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan pada AI Tutor." }, { status: 500 })
  }
}
