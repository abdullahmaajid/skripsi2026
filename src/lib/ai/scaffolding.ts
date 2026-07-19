export type ScaffoldLevel = 'SOCRATIC' | 'HINT' | 'SOLUTION'

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

Format jawaban:
1. **Konsep yang Diuji**: [identifikasi konsep]
2. **Langkah Penyelesaian**: [step-by-step]
3. **Kesalahan Umum**: [yang harus dihindari]

Gunakan Bahasa Indonesia, format Markdown.`
}

export async function getScaffoldResponse(
  level: ScaffoldLevel,
  question: string,
  studentAnswer: string,
  correctAnswer: string,
  history: { role: string, content: string }[] = [],
  targetMajor?: string,
  aiStyle: string = "default",
  aiEnergy: string = "default"
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return getFallbackResponse(level, question, correctAnswer)
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
      case "quirky": stylePrompt = "Bicaralah dengan gaya yang nyentrik, menyenangkan, imajinatif, dan sedikit humoris ala anak Gen-Z (gunakan kata gaul sesekali)."; break;
      case "efficient": stylePrompt = "Bicaralah sesingkat mungkin, lugas, langsung ke intinya tanpa kalimat pengantar yang panjang."; break;
      case "sarcastic": stylePrompt = "Bicaralah dengan nada sinis, kritis, dan sedikit sarkastis (tapi tetap bertujuan mendidik dan membuat siswa mikir keras)."; break;
    }

    let energyPrompt = ""
    switch (aiEnergy) {
      case "high": energyPrompt = "Gunakan tingkat energi yang sangat tinggi, seru, dan gunakan tanda seru atau emoji yang ekspresif!"; break;
      case "low": energyPrompt = "Gunakan tingkat energi yang tenang, kalem, netral, dan jarang menggunakan emoji."; break;
    }

    if (stylePrompt || energyPrompt) {
      systemInstruction += `\n\nATURAN GAYA BAHASA (PERSONALITY):\n- ${stylePrompt}\n- ${energyPrompt}`
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

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: messages,
        temperature: 0.6,
        max_tokens: level === "SOLUTION" ? 600 : 350
      })
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error("Groq API error response:", errText)
      throw new Error(`Groq API returned ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Groq API error:", error)
    return getFallbackResponse(level, question, correctAnswer)
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

export function getNextScaffoldLevel(current: ScaffoldLevel): ScaffoldLevel | null {
  if (current === 'SOCRATIC') return 'HINT'
  if (current === 'HINT') return 'SOLUTION'
  return null
}
