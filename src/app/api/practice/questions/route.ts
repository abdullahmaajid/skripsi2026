import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function GET(req: NextRequest) {
  try {
    const subjectId = req.nextUrl.searchParams.get("subjectId")
    const chapterId = req.nextUrl.searchParams.get("chapterId")
    const limitParam = req.nextUrl.searchParams.get("limit")
    const limit = limitParam ? parseInt(limitParam, 10) : 10

    if (!subjectId && !chapterId) {
      return NextResponse.json({ error: "subjectId atau chapterId wajib diisi." }, { status: 400 })
    }

    let chapterIds: string[] = []
    if (chapterId) {
      chapterIds = [chapterId]
    } else if (subjectId) {
      // Get all chapters for this subject
      const chapters = await prisma.chapter.findMany({
        where: { subjectId },
        select: { id: true },
      })

      if (chapters.length === 0) {
        return NextResponse.json({ error: "Tidak ada bab untuk subtes ini." }, { status: 404 })
      }

      chapterIds = chapters.map((c) => c.id)
    }

    const safeLimit = Math.min(limit, 50)

    // Optimization: Avoid ORDER BY RANDOM() in SQL for better database performance.
    // Instead, fetch all matching IDs, shuffle them in memory, and pick the required amount.
    const allMatchingQuestions = await prisma.question.findMany({
      where: { chapterId: { in: chapterIds } },
      select: { id: true },
    })

    if (allMatchingQuestions.length === 0) {
      return NextResponse.json({ questions: [] })
    }

    // Fisher-Yates shuffle algorithm for true randomness
    for (let i = allMatchingQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allMatchingQuestions[i], allMatchingQuestions[j]] = [allMatchingQuestions[j], allMatchingQuestions[i]];
    }

    const randomIds = allMatchingQuestions.slice(0, safeLimit).map(q => q.id)

    if (randomIds.length === 0) {
      return NextResponse.json({ questions: [] })
    }

    const questions = await prisma.question.findMany({
      where: { id: { in: randomIds } },
      select: {
        id: true,
        text: true,
        type: true,
        difficulty: true,
        options: {
          select: { id: true, label: true, text: true, isCorrect: true },
          orderBy: { label: "asc" },
        },
        chapter: { 
          select: { 
            name: true,
            subject: { select: { id: true, name: true } } 
          } 
        },
      }
    })

    // Shuffle the questions client-side to ensure the order of returned questions
    // matches the random order from DB (since findMany doesn't guarantee order by `in`)
    const shuffled = questions.sort(() => Math.random() - 0.5)

    return NextResponse.json({
      questions: shuffled.map((q) => ({
        id: q.id,
        text: q.text,
        type: q.type,
        difficulty: q.difficulty,
        subject: q.chapter.subject.name,
        subjectId: q.chapter.subject.id,
        chapter: q.chapter.name,
        options: q.options.map((o) => ({
          id: o.id,
          label: o.label,
          text: o.text,
          isCorrect: o.isCorrect,
        })),
      })),
    })
  } catch (error) {
    console.error("Practice questions error:", error)
    return NextResponse.json({ error: "Gagal memuat soal latihan." }, { status: 500 })
  }
}
