import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const responses = await prisma.questionResponse.findMany({
      include: { 
        question: true,
        attempt: true
      }
    })
    
    return NextResponse.json({ 
      count: responses.length,
      responses: responses.map(r => ({
        id: r.id,
        questionId: r.questionId,
        chapterId: r.question.chapterId,
        isCorrect: r.isCorrect,
        attemptId: r.attempt.id,
        attemptStatus: r.attempt.status,
        attemptStartedAt: r.attempt.startedAt,
        answeredAt: r.answeredAt
      }))
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
