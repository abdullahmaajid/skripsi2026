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
        studentScore = scaleToSNBT(user.irtAbility)
      }
    } else {
      // Fallback to query param for unauthenticated/demo
      const scoreParam = req.nextUrl.searchParams.get("score")
      if (scoreParam) studentScore = parseFloat(scoreParam)
    }

    const competitiveness = major.applicants / major.quota
    const result = calculateChance(studentScore, major.estimatedScore, competitiveness)

    // Populate weakSubjects from latest attempt's SubjectScores
    if (session?.user?.id) {
      const latestAttempt = await prisma.examAttempt.findFirst({
        where: { userId: session.user.id, status: "COMPLETED" },
        orderBy: { finishedAt: "desc" },
        select: { id: true },
      })
      if (latestAttempt) {
        const subScores = await prisma.subjectScore.findMany({
          where: { attemptId: latestAttempt.id },
          orderBy: { scaledScore: "asc" },
          take: 3,
        })
        if (subScores.length > 0) {
          const subjects = await prisma.subject.findMany({
            where: { id: { in: subScores.map(s => s.subjectId) } },
          })
          result.weakSubjects = subjects.map(s => s.name)
        }
      }
    }

    // Generate recommendation based on deficit
    if (result.deficit < 0) {
      result.recommendation = `Kamu perlu menaikkan skor sebesar ${Math.abs(result.deficit)} poin. Fokus pada subtes terlemah${result.weakSubjects.length > 0 ? `: ${result.weakSubjects.join(", ")}` : ""} dan gunakan AI Tutor untuk memahami konsep yang lemah.`
    } else {
      result.recommendation = `Skor kamu sudah di atas estimasi aman (+${result.deficit}). Pertahankan dan terus berlatih untuk memastikan posisimu tetap kuat.`
    }

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
