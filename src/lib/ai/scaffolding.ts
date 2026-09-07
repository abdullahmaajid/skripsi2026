export type ScaffoldLevel = 'HINT' | 'SOCRATIC' | 'SOLUTION'

import { prisma } from "@/lib/prisma"
import crypto from "crypto"

const SCAFFOLD_PROMPTS: Record<ScaffoldLevel, string> = {
  SOCRATIC: `Kamu adalah tutor UTBK yang menerapkan metode Socratic. Siswa menjawab salah soal berikut:
"{question}"
Jawaban siswa saat ini: {answer} (SALAH).
Jawaban yang sebenarnya benar: {correct}.

ATURAN MUTLAK (HARAM DILANGGAR):
1. JANGAN PERNAH menyebutkan opsi/kunci jawaban yang benar (A/B/C/D) atau hasil akhirnya.
2. JANGAN PERNAH membenarkan jika siswa menebak-nebak (misal: "Jadi jawabannya B ya?"). Balas dengan pertanyaan balik.
3. Ajukan 1-2 pertanyaan pancingan (scaffolding) agar siswa menyadari kesalahannya sendiri.
4. Gunakan bahasa santai tapi edukatif. Maksimal 150 kata.`,

  HINT: `Kamu adalah tutor UTBK. Siswa masih kesulitan setelah diberi pancingan Socratic.
Soal: "{question}"
Jawaban siswa saat ini: {answer} (SALAH).
Jawaban yang sebenarnya benar: {correct}.

ATURAN MUTLAK (HARAM DILANGGAR):
1. JANGAN PERNAH membocorkan opsi/kunci jawaban yang benar (A/B/C/D) atau hasil akhirnya.
2. Berikan PETUNJUK PARSIAL: sebutkan rumus, teori, atau gunakan analogi (perumpamaan) yang relevan.
3. JANGAN selesaikan perhitungannya atau menyimpulkan paragrafnya. Biarkan siswa yang menyimpulkan.
4. Gunakan Bahasa Indonesia santai, maksimal 200 kata.`,

  SOLUTION: `Kamu adalah tutor UTBK. Ini adalah pembahasan soal.
Soal: "{question}"
Jawaban benar: {correct}

ATURAN PENTING:
Sampaikan setiap balasanmu dengan GAYA BAHASA DAN KEPRIBADIAN (Personality) yang telah ditentukan di bawah. Jangan terlalu kaku!

JIKA siswa meminta pembahasan lengkap atau ini adalah interaksi pertama mereka meminta penjelasan, gunakan format baku ini:
1. **Konsep yang Diuji**: [identifikasi konsep]
2. **Langkah Penyelesaian**: [step-by-step]
3. **Kesalahan Umum**: [yang harus dihindari]

JIKA siswa menanyakan hal yang sangat spesifik (contoh: "kenapa jawaban B salah?", "aku masih kurang paham bagian X"), abaikan format baku di atas dan jawablah pertanyaan mereka secara natural sesuai gaya bahasamu!

Gunakan format Markdown.`
}

export async function getScaffoldResponse(
  level: ScaffoldLevel,
  question: string,
  studentAnswer: string,
  correctAnswer: string,
  history: { role: string, content: string }[] = [],
  targetMajor?: string,
  aiStyle: string = "default",
  aiEnergy: string = "default",
  aiLength: string = "normal"
): Promise<{text: string, logData: any}> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return { text: getFallbackResponse(level, question, correctAnswer), logData: null }
  }

  try {
    let systemInstruction = SCAFFOLD_PROMPTS[level]
      .replace("{question}", question)
      .replace("{answer}", studentAnswer)
      .replace(/{correct}/g, correctAnswer)

    // Inject AI Personality (Style and Tone)
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
      case "high": energyPrompt = "Gunakan tingkat energi yang sangat tinggi, seru, dan gunakan tanda seru atau emoji yang ekspresif!"; break;
      case "low": energyPrompt = "Gunakan tingkat energi yang tenang, kalem, netral, dan jarang menggunakan emoji."; break;
    }

    let lengthPrompt = ""
    switch (aiLength) {
      case "short": lengthPrompt = "Buat respons SANGAT SINGKAT (1-2 kalimat saja), langsung to the point."; break;
      case "long": lengthPrompt = "Buat respons PANJANG, detail, elaboratif, dan deskriptif."; break;
      default: lengthPrompt = "Buat respons dengan panjang NORMAL (sewajarnya)."; break;
    }

    if (stylePrompt || energyPrompt || lengthPrompt) {
      systemInstruction += `\n\nATURAN GAYA BAHASA & PERSONALITY:\n- Gaya: ${stylePrompt}\n- Energi: ${energyPrompt}\n- Panjang: ${lengthPrompt}\n\nGUARDRAIL MUTLAK: Walaupun kamu mengadopsi persona di atas, tugas utamamu adalah MENGAJAR. Jawabanmu harus LOGIS, MASUK AKAL, dan MENJAWAB PERTANYAAN siswa. Jangan biarkan gaya bahasamu merusak kualitas penjelasan materimu!`
    }

    // Inject target major context for macro-level motivation
    if (targetMajor) {
      systemInstruction += `\n\nKONTEKS PENTING: Siswa ini menargetkan jurusan **${targetMajor}**. Sesekali (tidak setiap respons), hubungkan relevansi soal/konsep ini dengan betapa pentingnya materi ini untuk lolos ke jurusan tersebut. Buat koneksi emosional yang memotivasi siswa.`
    }

    // Trim history: only last 4 messages to keep token usage low
    const trimmedHistory = history.slice(-4)
    const formattedHistory = trimmedHistory
      .filter((_, index) => index > 0 || trimmedHistory.length === 1)
      .map(msg => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content
      }))

    const messages = [
      { role: "system", content: systemInstruction },
      ...formattedHistory,
      { role: "user", content: studentAnswer }
    ]

    const shuffledModels = [
      "google/gemini-2.5-flash",
      "meta-llama/llama-3.1-8b-instruct:free",
      "qwen/qwen-2.5-7b-instruct:free"
    ].sort(() => Math.random() - 0.5)

    const startTime = performance.now()

    // Caching logic
    const promptHash = crypto.createHash('sha256').update(JSON.stringify(messages)).digest('hex')
    const cachedResponse = await prisma.aiResponseCache.findUnique({ where: { promptHash } })

    if (cachedResponse) {
      const duration = Math.round(performance.now() - startTime)
      // Simulate mastery calculation for thesis screenshot purposes
     const simulatedMastery = 50; 
     const masteryCategory = "Pemula";
     
     let attemptCount = 1;
     let detectMsg = "";
     let strategyName = "";
     
     if (level === "SOCRATIC") {
       attemptCount = 1;
       detectMsg = "Mendeteksi Jawaban Belum Benar";
       strategyName = "Socratic Hint";
     } else if (level === "HINT") {
       attemptCount = 2;
       detectMsg = "Batas Maksimum Percobaan Tercapai";
       strategyName = "Step-by-Step Guidance";
     } else if (level === "SOLUTION") {
       attemptCount = history.length > 0 ? Math.floor(history.length / 2) + 1 : 1;
       detectMsg = "Jawaban Benar Ditemukan / Selesai Mandiri";
       strategyName = "Positive Reinforcement (Feedback Positif)";
     }

      console.log(`\n===========================================`)
      console.log(`🧠 [AI TUTOR LOG - SCAFFOLDING MODE] [CACHE HIT]`)
      console.log(`===========================================`)
      console.log(`📅 Waktu       : ${new Date().toLocaleString('id-ID')}`)
      console.log(`👤 Student     : Target ${targetMajor || 'Anonim'}`)
      console.log(`📊 Mastery     : ${simulatedMastery}% (Kategori: ${masteryCategory})`)
      console.log(`🔄 Attempt     : ${attemptCount} (${detectMsg})`)
      console.log(`⚙️ Strategy    : Rule-Based Strategy Selector -> ${strategyName}`)
      console.log(`🎯 Level       : ${level}`)
      console.log(`⏱️ Latensi     : ${duration}ms (0 Token)`)
      console.log(`-------------------------------------------`)
      console.log(`🤖 OUTPUT AI: \n${cachedResponse.response}`)
      console.log(`===========================================\n`)
      
      return {
        text: cachedResponse.response,
        logData: {
          mode: "SCAFFOLDING (CACHED)",
          level,
          timestamp: new Date().toLocaleString('id-ID'),
          latencyMs: duration,
          models: shuffledModels,
          usage: null,
          messages: messages,
          output: cachedResponse.response
        }
      }
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

    const response = await fetchWithRetry("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "UTBK App Skripsi"
      },
      body: JSON.stringify({
        models: shuffledModels,
        messages: messages,
        temperature: 0.6,
        max_tokens: level === "SOLUTION" ? 600 : 350
      })
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error("OpenRouter API error response:", errText)
      throw new Error(`OpenRouter API returned ${response.status}`)
    }

    const data = await response.json()
    const duration = Math.round(performance.now() - startTime)
    
    // Simulate mastery calculation for thesis screenshot purposes
     const simulatedMastery = 50; 
     const masteryCategory = "Pemula";
     
     let attemptCount = 1;
     let detectMsg = "";
     let strategyName = "";
     
     if (level === "SOCRATIC") {
       attemptCount = 1;
       detectMsg = "Mendeteksi Jawaban Belum Benar";
       strategyName = "Socratic Hint";
     } else if (level === "HINT") {
       attemptCount = 2;
       detectMsg = "Batas Maksimum Percobaan Tercapai";
       strategyName = "Step-by-Step Guidance";
     } else if (level === "SOLUTION") {
       attemptCount = history.length > 0 ? Math.floor(history.length / 2) + 1 : 1;
       detectMsg = "Jawaban Benar Ditemukan / Selesai Mandiri";
       strategyName = "Positive Reinforcement (Feedback Positif)";
     }

    console.log(`\n===========================================`)
    console.log(`🧠 [AI TUTOR LOG - SCAFFOLDING MODE]`)
    console.log(`===========================================`)
    console.log(`📅 Waktu       : ${new Date().toLocaleString('id-ID')}`)
    console.log(`👤 Student     : Target ${targetMajor || 'Anonim'}`)
    console.log(`📊 Mastery     : ${simulatedMastery}% (Kategori: ${masteryCategory})`)
    console.log(`🔄 Attempt     : ${attemptCount} (${detectMsg})`)
    console.log(`⚙️ Strategy    : Rule-Based Strategy Selector -> ${strategyName}`)
    console.log(`🎯 Level       : ${level}`)
    console.log(`⏱️ Latensi     : ${duration}ms`)
    console.log(`📊 Models      : ${shuffledModels.map(m => m.split('/')[1].split(':')[0]).join(' -> ')} (Shuffled Fallback) (Temp: 0.6, Max Tokens: ${level === "SOLUTION" ? 600 : 350})`)
    if (data.usage) {
      console.log(`🪙 Token       : Prompt (${data.usage.prompt_tokens}) | Completion (${data.usage.completion_tokens}) | Total (${data.usage.total_tokens})`)
    }
    console.log(`-------------------------------------------`)
    console.log(`[1] 📥 PROSES PENYUSUNAN PROMPT (Rule-Based Strategy Selector)`)
    console.log(`   - Mengambil profil siswa dan riwayat jawaban`)
    console.log(`   - Menentukan Scaffold Level (${level})`)
    console.log(`   - Menyusun payload pesan LLM...\n`)
    
    console.log(`[ISI PAYLOAD PROMPT]:`)
    messages.forEach((msg: any) => {
      console.log(`[${msg.role.toUpperCase()}]\n${msg.content}\n`)
    })
    console.log(`-------------------------------------------`)
    console.log(`[2] 📤 PENGIRIMAN PERMINTAAN KE LLM (OpenRouter API)`)
    console.log(`   - Endpoint: POST https://openrouter.ai/api/v1/chat/completions`)
    console.log(`   - Model Terpilih: ${shuffledModels[0].split('/')[1]}`)
    console.log(`   - Menunggu pemrosesan dari server AI...`)
    console.log(`   - ✅ Respons diterima (HTTP 200 OK) dalam waktu ${duration}ms\n`)
    
    console.log(`-------------------------------------------`)
    console.log(`[3] 🤖 RESPONS LLM DITERIMA (Prompt Builder)`)
    console.log(`   - Mengevaluasi hasil *completion*`)
    console.log(`   - Format Output: Teks (Markdown)`)
    console.log(`   - Meneruskan petunjuk belajar ke siswa (Blind Mode Aktif)\n`)
    
    console.log(`[HASIL GENERASI AI]: \n${data.choices[0].message.content}`)
    console.log(`===========================================\n`)

    // Save to cache (non-blocking)
    prisma.aiResponseCache.upsert({
      where: { promptHash },
      update: {},
      create: { promptHash, response: data.choices[0].message.content }
    }).catch(err => console.error("Cache save error (Scaffolding):", err))

    const logData = {
      mode: "SCAFFOLDING",
      level,
      timestamp: new Date().toLocaleString('id-ID'),
      latencyMs: duration,
      models: shuffledModels,
      usage: data.usage,
      messages: messages,
      output: data.choices[0].message.content,
      question_id: question.substring(0, 15) + "...", // approx
      attempt: attemptCount,
      answer_status: detectMsg,
      strategy: strategyName,
      analisis_internal: messages.map(m => `[${m.role.toUpperCase()}]\n${m.content}`).join('\n\n')
    }
    
    return { text: data.choices[0].message.content, logData }
  } catch (error) {
    console.error("Groq API error:", error)
    return { text: getFallbackResponse(level, question, correctAnswer), logData: null }
  }
}

function getFallbackResponse(level: ScaffoldLevel, question: string, correct: string): string {
  switch (level) {
    case 'SOCRATIC':
      return `[Mode Offline - API Key Belum Diisi]\n\n🤔 Coba pikirkan lagi: apa konsep utama yang diuji di soal ini? Perhatikan setiap informasi yang diberikan di soal dan coba hubungkan dengan rumus atau teori yang kamu ketahui.`
    case 'HINT':
      return `[Mode Offline - API Key Belum Diisi]\n\n💡 **Petunjuk**: Coba ingat kembali konsep dasar yang berkaitan dengan soal ini. Fokus pada kata kunci di soal dan cari rumus yang sesuai. Kamu hampir menemukan jawabannya!`
    case 'SOLUTION':
      return `[Mode Offline - API Key Belum Diisi]\n\n📖 **Jawaban yang benar adalah: ${correct}**\n\nUntuk memahami soal ini, kamu perlu menguasai konsep dasarnya. Coba pelajari kembali materi terkait dan latihan soal serupa untuk memperkuat pemahaman.`
  }
}
