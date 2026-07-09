import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { estimateTheta, scaleToSNBT } from "@/lib/irt/scoring"

export async function POST(req: NextRequest) {
  try {
    const { attemptId, responses } = await req.json()
    // responses: [{ questionId, selectedIds: string[], timeSpent: number, flagged: boolean }]

    if (!attemptId || !responses?.length) {
      return NextResponse.json({ error: "Data tidak valid." }, { status: 400 })
    }

    const attempt = await prisma.examAttempt.findUnique({ where: { id: attemptId } })
    if (!attempt) return NextResponse.json({ error: "Attempt tidak ditemukan." }, { status: 404 })

    // Process each response and group by subject
    const irtInputs: { difficulty: number; correct: boolean }[] = []
    const subjectMap: Record<string, { subjectId: string; inputs: { difficulty: number; correct: boolean }[]; correct: number; total: number }> = {}

    for (const r of responses) {
      const question = await prisma.question.findUnique({
        where: { id: r.questionId },
        include: { options: true, chapter: { include: { subject: true } } },
      })
      if (!question) continue

      const correctIds = question.options.filter(o => o.isCorrect).map(o => o.id)
      const selected = r.selectedIds || []
      const isCorrect = correctIds.length === selected.length && correctIds.every((id: string) => selected.includes(id))

      await prisma.questionResponse.upsert({
        where: { attemptId_questionId: { attemptId, questionId: r.questionId } },
        update: { selectedIds: selected, isCorrect, timeSpent: r.timeSpent || 0, flagged: r.flagged || false },
        create: { attemptId, questionId: r.questionId, selectedIds: selected, isCorrect, timeSpent: r.timeSpent || 0, flagged: r.flagged || false },
      })

      irtInputs.push({ difficulty: question.difficulty, correct: isCorrect })

      // Group by subject for SubjectScore calculation
      const subjectId = question.chapter.subject.id
      if (!subjectMap[subjectId]) {
        subjectMap[subjectId] = { subjectId, inputs: [], correct: 0, total: 0 }
      }
      subjectMap[subjectId].inputs.push({ difficulty: question.difficulty, correct: isCorrect })
      subjectMap[subjectId].total += 1
      if (isCorrect) subjectMap[subjectId].correct += 1
    }

    // Calculate overall scores
    const theta = estimateTheta(irtInputs)
    const scaledScore = scaleToSNBT(theta)
    const correctCount = irtInputs.filter(i => i.correct).length
    const rawScore = (correctCount / irtInputs.length) * 100

    // Update attempt
    await prisma.examAttempt.update({
      where: { id: attemptId },
      data: { status: "COMPLETED", finishedAt: new Date(), rawScore, irtScore: theta, scaledScore },
    })

    // Update user's irtAbility
    await prisma.user.update({
      where: { id: attempt.userId },
      data: { irtAbility: theta },
    })

    // Calculate and store SubjectScore for each subject (FIX #6)
    for (const [subjectId, subData] of Object.entries(subjectMap)) {
      const subTheta = estimateTheta(subData.inputs)
      const subScaled = scaleToSNBT(subTheta)

      await prisma.subjectScore.upsert({
        where: { attemptId_subjectId: { attemptId, subjectId } },
        update: {
          correct: subData.correct,
          total: subData.total,
          irtTheta: subTheta,
          scaledScore: subScaled,
        },
        create: {
          attemptId,
          subjectId,
          correct: subData.correct,
          total: subData.total,
          irtTheta: subTheta,
          scaledScore: subScaled,
        },
      })
    }

    return NextResponse.json({
      attemptId,
      rawScore: Math.round(rawScore),
      theta: Math.round(theta * 1000) / 1000,
      scaledScore,
      correct: correctCount,
      total: irtInputs.length,
    })
  } catch (error) {
    console.error("Submit error:", error)
    return NextResponse.json({ error: "Gagal submit jawaban." }, { status: 500 })
  }
}
