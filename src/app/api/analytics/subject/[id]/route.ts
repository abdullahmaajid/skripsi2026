import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const subject = await prisma.subject.findUnique({
      where: { id },
      include: { chapters: true }
    })

    if (!subject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 })
    }

    const responses = await prisma.questionResponse.findMany({
      where: {
        attempt: {
          userId
        },
        question: {
          chapter: {
            subjectId: id
          }
        }
      },
      include: {
        question: {
          include: {
            chapter: true
          }
        }
      }
    })

    // Aggregate by chapter
    const chapterStats: Record<string, { total: number, correct: number, name: string }> = {}

    subject.chapters.forEach(c => {
      chapterStats[c.id] = { total: 0, correct: 0, name: c.name }
    })

    responses.forEach(r => {
      const cId = r.question.chapterId
      if (chapterStats[cId]) {
        chapterStats[cId].total++
        if (r.isCorrect) {
          chapterStats[cId].correct++
        }
      }
    })

    const topics = Object.values(chapterStats).map(c => ({
      name: c.name,
      total: c.total,
      correct: c.correct,
      accuracy: c.total > 0 ? Math.round((c.correct / c.total) * 100) : 0
    }))

    return NextResponse.json({
      subjectName: subject.name,
      topics
    })

  } catch (error) {
    console.error("Subject analytics API error:", error)
    return NextResponse.json({ error: "Gagal memuat analitik subtes" }, { status: 500 })
  }
}
