export type ScaffoldLevel = 'SOCRATIC' | 'HINT' | 'SOLUTION'

const SCAFFOLD_PROMPTS: Record<ScaffoldLevel, string> = {
  SOCRATIC: `Kamu adalah tutor UTBK yang ramah dan suportif. Siswa menjawab salah soal berikut:
"{question}"
Jawaban siswa: {answer}, jawaban benar: {correct}.
JANGAN beri jawaban langsung. Ajukan 1-2 pertanyaan Socratic dalam Bahasa Indonesia yang mengarahkan siswa menemukan kesalahannya sendiri. Gunakan bahasa santai tapi edukatif. Maksimal 150 kata.`,

  HINT: `Kamu adalah tutor UTBK. Siswa masih kesulitan setelah pertanyaan Socratic.
Soal: "{question}"
Jawaban benar: {correct}
Beri PETUNJUK PARSIAL: sebutkan konsep/rumus yang relevan, tapi jangan selesaikan soalnya secara langsung.
Gunakan analogi sederhana jika memungkinkan. Bahasa Indonesia, maksimal 200 kata.`,

  SOLUTION: `Kamu adalah tutor UTBK. Siswa sudah 2x gagal memahami soal ini. Berikan PENJELASAN LENGKAP:
Soal: "{question}"
Jawaban benar: {correct}

Format jawaban:
1. **Konsep yang Diuji**: [identifikasi konsep]
2. **Langkah Penyelesaian**: [step-by-step]
3. **Kesalahan Umum**: [yang harus dihindari]
4. **Soal Latihan Serupa**: [beri 1 soal tambahan untuk latihan]

Gunakan Bahasa Indonesia, format Markdown.`
}

export async function getScaffoldResponse(
  level: ScaffoldLevel,
  question: string,
  studentAnswer: string,
  correctAnswer: string,
  history: { role: string, content: string }[] = [],
  targetMajor?: string
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
