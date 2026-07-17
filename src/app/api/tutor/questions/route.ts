import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Find all question responses for this user where they got it wrong
    const responses = await prisma.questionResponse.findMany({
      where: {
        attempt: {
          userId,
        },
        isCorrect: false,
      },
      orderBy: { answeredAt: "desc" },
      select: {
        questionId: true,
        isCorrect: true,
        selectedIds: true,
        question: {
          select: {
            text: true,
            type: true,
            difficulty: true,
            options: { select: { id: true, label: true, text: true, isCorrect: true } },
            chapter: { select: { subject: { select: { name: true } } } },
          },
        },
      },
    })

    // Group by questionId to deduplicate and take only the latest response
    const uniqueQuestionsMap = new Map()

    for (const r of responses) {
      if (!uniqueQuestionsMap.has(r.questionId)) {
        uniqueQuestionsMap.set(r.questionId, {
          questionId: r.questionId,
          text: r.question.text,
          type: r.question.type,
          difficulty: r.question.difficulty,
          subject: r.question.chapter.subject.name,
          isCorrect: r.isCorrect,
          selectedIds: r.selectedIds,
          options: r.question.options.map((o) => ({
            id: o.id,
            label: o.label,
            text: o.text,
            isCorrect: o.isCorrect,
          })),
        })
      }
    }

    const uniqueQuestions = Array.from(uniqueQuestionsMap.values())

    return NextResponse.json({
      questions: uniqueQuestions,
    })
  } catch (error) {
    console.error("Tutor questions list API error:", error)
    return NextResponse.json({ error: "Gagal memuat soal-soal salah" }, { status: 500 })
  }
}
