import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { estimateTheta, scaleToSNBT } from "@/lib/irt/scoring"

export async function POST(req: NextRequest) {
  try {
    const { attemptId, responses } = await req.json()

    if (!attemptId || !responses?.length) {
      return NextResponse.json({ error: "Data tidak valid." }, { status: 400 })
    }

    const attempt = await prisma.examAttempt.findUnique({ where: { id: attemptId } })
    if (!attempt) return NextResponse.json({ error: "Attempt tidak ditemukan." }, { status: 404 })

    // ── BATCH: fetch all questions at once instead of N+1 loop ─────────────
    const questionIds = responses.map((r: { questionId: string }) => r.questionId)
    const questions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
      include: { options: true, chapter: { include: { subject: true } } },
    })
    const questionMap = new Map(questions.map(q => [q.id, q]))
    // ───────────────────────────────────────────────────────────────────────

    const irtInputs: { difficulty: number; correct: boolean }[] = []
    const subjectMap: Record<string, { subjectId: string; inputs: { difficulty: number; correct: boolean }[]; correct: number; total: number }> = {}
    const responseRecords: {
      attemptId: string
      questionId: string
      selectedIds: string[]
      isCorrect: boolean
      timeSpent: number
      flagged: boolean
    }[] = []

    for (const r of responses) {
      const question = questionMap.get(r.questionId)
      if (!question) continue

      const correctIds = question.options.filter((o: { isCorrect: boolean }) => o.isCorrect).map((o: { id: string }) => o.id)
      const selected = r.selectedIds || []
      const isCorrect = correctIds.length === selected.length && correctIds.every((id: string) => selected.includes(id))

      responseRecords.push({
        attemptId,
        questionId: r.questionId,
        selectedIds: selected,
        isCorrect,
        timeSpent: r.timeSpent || 0,
        flagged: r.flagged || false,
      })

      irtInputs.push({ difficulty: question.difficulty, correct: isCorrect })

      const subjectId = question.chapter.subject.id
      if (!subjectMap[subjectId]) {
        subjectMap[subjectId] = { subjectId, inputs: [], correct: 0, total: 0 }
      }
      subjectMap[subjectId].inputs.push({ difficulty: question.difficulty, correct: isCorrect })
      subjectMap[subjectId].total += 1
      if (isCorrect) subjectMap[subjectId].correct += 1
    }

    // ── BATCH: upsert all responses in a transaction ───────────────────────
    await prisma.$transaction(
      responseRecords.map(rec =>
        prisma.questionResponse.upsert({
          where: { attemptId_questionId: { attemptId: rec.attemptId, questionId: rec.questionId } },
          update: { selectedIds: rec.selectedIds, isCorrect: rec.isCorrect, timeSpent: rec.timeSpent, flagged: rec.flagged },
          create: rec,
        })
      )
    )
    // ───────────────────────────────────────────────────────────────────────

    const theta = estimateTheta(irtInputs)
    const scaledScore = scaleToSNBT(theta)
    const correctCount = irtInputs.filter(i => i.correct).length
    const rawScore = (correctCount / irtInputs.length) * 100

    // ── BATCH: all final updates in a single transaction ───────────────────
    await prisma.$transaction([
      prisma.examAttempt.update({
        where: { id: attemptId },
        data: { status: "COMPLETED", finishedAt: new Date(), rawScore, irtScore: theta, scaledScore },
      }),
      prisma.user.update({
        where: { id: attempt.userId },
        data: { irtAbility: theta },
      }),
      ...Object.entries(subjectMap).map(([subjectId, subData]) => {
        const subTheta = estimateTheta(subData.inputs)
        const subScaled = scaleToSNBT(subTheta)
        return prisma.subjectScore.upsert({
          where: { attemptId_subjectId: { attemptId, subjectId } },
          update: { correct: subData.correct, total: subData.total, irtTheta: subTheta, scaledScore: subScaled },
          create: { attemptId, subjectId, correct: subData.correct, total: subData.total, irtTheta: subTheta, scaledScore: subScaled },
        })
      }),
    ])
    // ───────────────────────────────────────────────────────────────────────

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


