import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const subjectId = searchParams.get('subjectId')

    // Find all question responses for this user where they either got it wrong or flagged it
    const responses = await prisma.questionResponse.findMany({
      where: {
        attempt: {
          userId
        },
        OR: [
          { isCorrect: false },
          { flagged: true }
        ],
        ...(subjectId && subjectId !== "ALL" ? {
          question: {
            chapter: {
              subjectId
            }
          }
        } : {})
      },
      orderBy: { answeredAt: "desc" },
      select: {
        questionId: true,
        flagged: true,
        isCorrect: true,
        question: {
          select: {
            id: true,
            text: true,
            type: true,
            difficulty: true,
            options: { select: { id: true, label: true, text: true, isCorrect: true } },
            chapter: {
              select: {
                name: true,
                subjectId: true,
                subject: { select: { name: true } }
              }
            }
          }
        }
      }
    })

    // Group by questionId to deduplicate if they answered the same question wrongly multiple times in different attempts
    const uniqueQuestionsMap = new Map()

    for (const r of responses) {
      if (!uniqueQuestionsMap.has(r.questionId)) {
        uniqueQuestionsMap.set(r.questionId, {
          id: r.question.id,
          text: r.question.text,
          type: r.question.type,
          difficulty: r.question.difficulty,
          subject: r.question.chapter.subject.name,
          subjectId: r.question.chapter.subjectId,
          chapter: r.question.chapter.name,
          flagged: r.flagged,
          lastAnsweredCorrectly: r.isCorrect,
          options: r.question.options.map(o => ({
            id: o.id,
            label: o.label,
            text: o.text,
            isCorrect: o.isCorrect
          }))
        })
      }
    }

    const uniqueQuestions = Array.from(uniqueQuestionsMap.values())

    // Also fetch available subjects for filtering
    const subjects = await prisma.subject.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" }
    })

    return NextResponse.json({
      questions: uniqueQuestions,
      subjects
    })

  } catch (error) {
    console.error("Evaluation API error:", error)
    return NextResponse.json({ error: "Gagal memuat evaluasi soal" }, { status: 500 })
  }
}
