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
      select: { 
        id: true, 
        difficulty: true, 
        options: { select: { id: true, isCorrect: true } }, 
        chapter: { select: { subject: { select: { id: true } } } } 
      },
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

    // ── FAST BATCH: delete existing responses and insert all at once ──
    try {
      await prisma.$transaction([
        prisma.questionResponse.deleteMany({
          where: { attemptId }
        }),
        prisma.questionResponse.createMany({
          data: responseRecords
        })
      ])
    } catch (txnError) {
      console.error("Error saving responses:", txnError);
      return NextResponse.json({ error: "Gagal menyimpan jawaban. Coba lagi." }, { status: 500 })
    }
    // ───────────────────────────────────────────────────────────────────────

    // Fetch IRT settings from DB (wrapped in try-catch to handle missing table gracefully)
    const config = { mean: 500, sd: 100 }

    const theta = estimateTheta(irtInputs)
    const scaledScore = scaleToSNBT(theta, config)
    const correctCount = irtInputs.filter(i => i.correct).length
    const rawScore = (correctCount / irtInputs.length) * 100

    // ── BATCH: all final updates in a single transaction ───────────────────
    try {
      await prisma.$transaction([
        prisma.examAttempt.update({
          where: { id: attemptId },
          data: { status: "COMPLETED", finishedAt: new Date(), rawScore, irtScore: theta, scaledScore },
        }),
        prisma.user.update({
          where: { id: attempt.userId },
          data: { irtAbility: theta },
        }),
        prisma.subjectScore.deleteMany({
          where: { attemptId }
        }),
        prisma.subjectScore.createMany({
          data: Object.entries(subjectMap).map(([subjectId, subData]) => {
            const subTheta = estimateTheta(subData.inputs)
            const subScaled = scaleToSNBT(subTheta, config)
            return { attemptId, subjectId, correct: subData.correct, total: subData.total, irtTheta: subTheta, scaledScore: subScaled }
          })
        }),
      ],
      {
        maxWait: 10000,
        timeout: 20000,
      })
    } catch (txnError) {
      console.error("Error updating attempt status:", txnError);
      return NextResponse.json({ error: "Gagal menyelesaikan ujian. Coba lagi." }, { status: 500 })
    }
    // ───────────────────────────────────────────────────────────────────────

    return NextResponse.json({
      attemptId,
      rawScore: Math.round(rawScore),
      theta: Math.round(theta * 1000) / 1000,
      scaledScore,
      correct: correctCount,
      total: irtInputs.length,
    })
  } catch (error: any) {
    console.error("Submit error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server: " + (error.message || "Unknown error") }, { status: 500 })
  }
}


