import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { calculateChance } from "@/lib/chancing/calculator"
import { scaleToSNBT } from "@/lib/irt/scoring"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ majorId: string }> }
) {
  try {
    const { majorId } = await params

    // Fetch major from database (not hardcoded)
    const major = await prisma.major.findUnique({
      where: { id: majorId },
      include: { university: true },
    })

    if (!major) {
      return NextResponse.json({ error: "Jurusan tidak ditemukan." }, { status: 404 })
    }

    // Get student score from auth session or query param fallback
    let studentScore = 500 // default
    const session = await auth()
    if (session?.user?.id) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { irtAbility: true },
      })
      if (user) {
        const config = { mean: 500, sd: 100 }
        studentScore = scaleToSNBT(user.irtAbility, config)
      }
    } else {
      // Fallback to query param for unauthenticated/demo
      const scoreParam = req.nextUrl.searchParams.get("score")
      if (scoreParam) studentScore = parseFloat(scoreParam)
    }

    const competitiveness = major.applicants / major.quota
    const result = calculateChance(studentScore, major.estimatedScore, competitiveness)

    // Populate weakSubjects and strongSubjects from latest attempt's SubjectScores
    let strongSubjectNames: string[] = []
    let scoreTrend: 'rising' | 'stable' | 'declining' | 'unknown' = 'unknown'

    if (session?.user?.id) {
      const recentAttempts = await prisma.examAttempt.findMany({
        where: { userId: session.user.id, status: "COMPLETED" },
        orderBy: { finishedAt: "desc" },
        take: 5,
        select: { id: true, scaledScore: true },
      })

      // Score trend
      if (recentAttempts.length >= 3) {
        const scores = recentAttempts.slice(0, 3).map(a => a.scaledScore || 0).reverse()
        const diffs = scores.slice(1).map((s, i) => s - scores[i])
        const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length
        if (avgDiff > 10) scoreTrend = 'rising'
        else if (avgDiff < -10) scoreTrend = 'declining'
        else scoreTrend = 'stable'
      }

      const latestAttempt = recentAttempts[0]
      if (latestAttempt) {
        // Weak subjects (bottom 3)
        const weakScores = await prisma.subjectScore.findMany({
          where: { attemptId: latestAttempt.id },
          orderBy: { scaledScore: "asc" },
          take: 3,
          include: { subject: { select: { name: true } } },
        })
        if (weakScores.length > 0) {
          result.weakSubjects = weakScores.map(s => s.subject.name)
        }

        // Strong subjects (top 2)
        const strongScores = await prisma.subjectScore.findMany({
          where: { attemptId: latestAttempt.id },
          orderBy: { scaledScore: "desc" },
          take: 2,
          include: { subject: { select: { name: true } } },
        })
        strongSubjectNames = strongScores.map(s => s.subject.name)
      }
    }

    // Generate behavior-aware recommendation
    const absDeficit = Math.abs(result.deficit)
    const weakList = result.weakSubjects.length > 0 ? result.weakSubjects.join(", ") : ""
    const strongList = strongSubjectNames.length > 0 ? strongSubjectNames.join(" dan ") : ""

    if (result.deficit >= 50) {
      result.recommendation = `Skor kamu jauh di atas estimasi aman (+${result.deficit}). Posisimu sangat kuat!${strongList ? ` Kelebihanmu di ${strongList} jadi modal besar.` : ""} Pertahankan ritme belajar dan jangan lengah.`
    } else if (result.deficit >= 0) {
      result.recommendation = `Skor kamu sudah di atas estimasi aman (+${result.deficit}), tapi selisihnya tipis. ${scoreTrend === 'rising' ? 'Tren skormu naik — terus tingkatkan!' : 'Tingkatkan lagi agar posisimu lebih aman.'}${weakList ? ` Perkuat subtes: ${weakList}.` : ""}`
    } else if (absDeficit <= 30) {
      result.recommendation = `Selisih ${absDeficit} poin — masih sangat bisa dikejar! ${scoreTrend === 'rising' ? 'Tren skormu sedang naik, momentum bagus.' : `Fokus latihan intensif di ${weakList || 'subtes terlemah'}.`} Gunakan AI Tutor untuk konsep yang masih lemah.`
    } else if (absDeficit <= 80) {
      result.recommendation = `Kamu perlu menaikkan skor ${absDeficit} poin. ${weakList ? `Prioritaskan: ${weakList}` : 'Fokus pada subtes terlemah'} — ini area dengan potensi kenaikan terbesar.${scoreTrend === 'rising' ? ' Tren skormu positif, teruskan!' : ' Konsistensi latihan adalah kunci.'}`
    } else {
      result.recommendation = `Gap ${absDeficit} poin cukup besar. ${weakList ? `Mulai dari memperkuat: ${weakList}.` : 'Fokus pada fondasi konsep dasar.'} Manfaatkan AI Tutor secara intensif dan selesaikan Try Out rutin untuk memantau progres.`
    }

    const ALL_SUBJECTS = [
      "Penalaran Matematika", "Pengetahuan Kuantitatif", "Penalaran Umum",
      "Literasi Bahasa Indonesia", "Literasi Bahasa Inggris",
      "Pemahaman Bacaan & Menulis", "Pengetahuan & Pemahaman Umum"
    ]
    
    let highPriority: string[] = []
    if (major.cluster === "SAINTEK") {
      highPriority = ["Penalaran Matematika", "Pengetahuan Kuantitatif"]
    } else if (major.cluster === "SOSHUM") {
      highPriority = ["Literasi Bahasa Indonesia", "Penalaran Umum", "Pemahaman Bacaan & Menulis"]
    } else {
      highPriority = ["Penalaran Umum", "Penalaran Matematika"] // CAMPURAN fallback
    }

    const sortedSubjects = [...ALL_SUBJECTS].sort((a, b) => {
      const aHigh = highPriority.includes(a) ? 1 : 0
      const bHigh = highPriority.includes(b) ? 1 : 0
      return bHigh - aHigh
    })

    const subjectPriorities = sortedSubjects.map(name => ({
      name,
      isHighPriority: highPriority.includes(name),
      isWeakness: result.weakSubjects.includes(name),
      isStrength: strongSubjectNames.includes(name)
    }))

    return NextResponse.json({
      major: {
        id: major.id,
        name: major.name,
        university: major.university.name,
        faculty: major.faculty,
        cluster: major.cluster,
        estimatedScore: major.estimatedScore,
        quota: major.quota,
        applicants: major.applicants,
        competitiveness: Math.round(competitiveness * 10) / 10,
      },
      chance: result,
      subjectPriorities,
      studentScore,
    })
  } catch (error) {
    console.error("Chancing error:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menghitung peluang." },
      { status: 500 }
    )
  }
}
