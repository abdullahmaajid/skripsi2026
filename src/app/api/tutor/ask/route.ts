import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { getScaffoldResponse, getNextScaffoldLevel, type ScaffoldLevel } from "@/lib/ai/scaffolding"

// ─── Free chat system prompt (replaces the deleted /api/tutor/chat) ───────────
const FREE_CHAT_SYSTEM_PROMPT = `Kamu adalah AI Tutor UTBK bernama "Lexica AI". Kamu membantu siswa Indonesia mempersiapkan ujian UTBK/SNBT.

Peranmu:
- Menjawab pertanyaan seputar materi UTBK (TPS, Literasi, Penalaran Matematika, dll)
- Memberikan tips belajar dan strategi ujian
- Memotivasi siswa
- Menjelaskan konsep dengan bahasa yang mudah dipahami

Aturan:
- Gunakan Bahasa Indonesia yang santai tapi edukatif
- Jawaban singkat dan to the point (maksimal 200 kata)
- Gunakan emoji secukupnya untuk membuat percakapan lebih hidup
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

      const apiKey = process.env.GROQ_API_KEY
      if (!apiKey) {
        return NextResponse.json({
          response:
            "Hai! Aku AI Tutor Lexica. Sayangnya koneksi AI sedang offline sementara. Coba lagi nanti ya! 😊",
        })
      }

      const trimmedFreeHistory = (history || []).slice(-4)
      const formattedHistory = trimmedFreeHistory
        .filter((_: unknown, index: number) => index > 0)
        .map((msg: { role: string; content: string }) => ({
          role: msg.role === "assistant" ? "assistant" : "user",
          content: msg.content,
        }))

      const messages = [
        { role: "system", content: FREE_CHAT_SYSTEM_PROMPT },
        ...formattedHistory,
        { role: "user", content: freeMessage },
      ]

      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "llama-3.1-8b-instant", messages, temperature: 0.6, max_tokens: 350 }),
      })

      if (!groqRes.ok) {
        const errText = await groqRes.text()
        console.error("Groq API error (free chat):", errText)
        throw new Error(`Groq returned ${groqRes.status}`)
      }

      const data = await groqRes.json()
      return NextResponse.json({ response: data.choices[0].message.content })
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
    if (currentLevel && ["SOCRATIC", "HINT", "SOLUTION"].includes(currentLevel)) {
      level = currentLevel as ScaffoldLevel
    }

    // ── PARALLEL: fetch correctAnswer (if missing) + targetMajor simultaneously ─
    const [dbQuestion, userProfile] = await Promise.all([
      (!resolvedCorrectAnswer && questionId)
        ? prisma.question.findUnique({ where: { id: questionId }, include: { options: true } })
        : Promise.resolve(null),
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: { profile: { select: { targetMajor1: { select: { name: true, university: { select: { name: true } } } } } } },
      }),
    ])

    if (!resolvedCorrectAnswer) {
      const correctOpt = dbQuestion?.options.find((o) => o.isCorrect)
      resolvedCorrectAnswer = correctOpt?.text ?? ""
    }

    if (!resolvedCorrectAnswer) {
      return NextResponse.json({ error: "Jawaban benar tidak tersedia." }, { status: 400 })
    }

    let targetMajor: string | undefined
    if (userProfile?.profile?.targetMajor1) {
      targetMajor = `${userProfile.profile.targetMajor1.name} — ${userProfile.profile.targetMajor1.university.name}`
    }
    // ─────────────────────────────────────────────────────────────────────────

    const response = await getScaffoldResponse(
      level,
      question,
      studentAnswer || "(tidak menjawab)",
      correctAnswer,
      history || [],
      targetMajor
    )

    const nextLevel = getNextScaffoldLevel(level)

    // Persist TutoringSession and TutoringMessage (non-blocking — don't await)
    if (session.user.id && questionId) {
      const userId = session.user.id
      ;(async () => {
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
            data: { sessionId: tutoringSession.id, role: "ASSISTANT", content: response },
          })
        } catch (dbErr) {
          console.error("Failed to persist tutoring session:", dbErr)
        }
      })()
    }

    return NextResponse.json({ level, response, nextLevel, hasNext: nextLevel !== null })
  } catch (error) {
    console.error("Tutor API error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan pada AI Tutor." }, { status: 500 })
  }
}
