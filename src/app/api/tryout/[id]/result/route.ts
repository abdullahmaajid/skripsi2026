import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const attempt = await prisma.examAttempt.findUnique({
      where: { id },
      include: {
        responses: {
          include: {
            question: { include: { options: true, chapter: { include: { subject: true } } } },
          },
        },
        template: true,
      },
    })

    if (!attempt) return NextResponse.json({ error: "Attempt tidak ditemukan." }, { status: 404 })

    const review = attempt.responses.map((r, idx) => ({
      number: idx + 1,
      questionId: r.questionId,
      text: r.question.text,
      type: r.question.type,
      difficulty: r.question.difficulty,
      subject: r.question.chapter.subject.name,
      timeSpent: r.timeSpent,
      isCorrect: r.isCorrect,
      selectedIds: r.selectedIds,
      options: r.question.options.map(o => ({
        id: o.id, label: o.label, text: o.text, isCorrect: o.isCorrect,
      })),
    }))

    // ========================================
    // Fetch user's target majors & calculate chance
    // ========================================
    let targetAnalysis = null
    const session = await auth()
    const userId = session?.user?.id

    if (userId) {
      const profile = await prisma.studentProfile.findUnique({
        where: { userId },
        include: {
          targetMajor1: { include: { university: true } },
          targetMajor2: { include: { university: true } },
        },
      })

      if (profile) {
        const userScore = attempt.scaledScore || 200

        const calcChance = (estimatedScore: number) => {
          const ratio = userScore / estimatedScore
          if (ratio >= 1.0) return { level: "AMAN", percent: Math.min(95, Math.round(ratio * 85)), color: "emerald" }
          if (ratio >= 0.85) return { level: "MENENGAH", percent: Math.round(ratio * 80), color: "amber" }
          if (ratio >= 0.70) return { level: "BERJUANG", percent: Math.round(ratio * 70), color: "orange" }
          return { level: "SULIT", percent: Math.max(5, Math.round(ratio * 50)), color: "rose" }
        }

        const targets = []
        if (profile.targetMajor1) {
          const m = profile.targetMajor1
          targets.push({
            label: "Pilihan 1",
            majorId: m.id,
            majorName: m.name,
            universityName: m.university.name,
            faculty: m.faculty,
            estimatedScore: m.estimatedScore,
            quota: m.quota,
            applicants: m.applicants,
            chance: calcChance(m.estimatedScore),
          })
        }
        if (profile.targetMajor2) {
          const m = profile.targetMajor2
          targets.push({
            label: "Pilihan 2",
            majorId: m.id,
            majorName: m.name,
            universityName: m.university.name,
            faculty: m.faculty,
            estimatedScore: m.estimatedScore,
            quota: m.quota,
            applicants: m.applicants,
            chance: calcChance(m.estimatedScore),
          })
        }

        // AI Recommendation: find a realistic alternative in the same cluster
        let aiRecommendation = null
        const cluster = profile.targetMajor1
          ? (await prisma.major.findUnique({ where: { id: profile.targetMajor1.id }, select: { cluster: true } }))?.cluster
          : null

        if (cluster) {
          const existingIds = [profile.targetMajor1Id, profile.targetMajor2Id].filter(Boolean)

          // Find a major where the user's score is within 80-110% of the estimated score
          // This is a "realistic stretch" recommendation
          const recommendation = await prisma.major.findFirst({
            where: {
              cluster,
              id: { notIn: existingIds as string[] },
              estimatedScore: {
                gte: userScore * 0.75,
                lte: userScore * 1.15,
              },
            },
            include: { university: true },
            orderBy: { estimatedScore: "desc" }, // Aim high but realistic
          })

          if (recommendation) {
            aiRecommendation = {
              majorId: recommendation.id,
              majorName: recommendation.name,
              universityName: recommendation.university.name,
              faculty: recommendation.faculty,
              estimatedScore: recommendation.estimatedScore,
              quota: recommendation.quota,
              applicants: recommendation.applicants,
              chance: calcChance(recommendation.estimatedScore),
            }
          }
        }

        targetAnalysis = {
          targets,
          aiRecommendation,
          userScore,
        }
      }
    }

    return NextResponse.json({
      attemptId: attempt.id,
      templateName: attempt.template.name,
      status: attempt.status,
      rawScore: attempt.rawScore,
      irtScore: attempt.irtScore,
      scaledScore: attempt.scaledScore,
      startedAt: attempt.startedAt,
      finishedAt: attempt.finishedAt,
      questions: review,
      targetAnalysis,
    })
  } catch (error) {
    console.error("Result error:", error)
    return NextResponse.json({ error: "Gagal memuat hasil." }, { status: 500 })
  }
}
