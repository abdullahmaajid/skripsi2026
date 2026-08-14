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
    const chapterIdsJoined = Prisma.join(chapterIds)

    // Fetch random question IDs (using raw SQL for true randomness)
    const randomIdsResult = await prisma.$queryRaw<{id: string}[]>`
      SELECT id FROM "Question"
      WHERE "chapterId" IN (${chapterIdsJoined})
      ORDER BY RANDOM()
      LIMIT ${safeLimit}
    `
    const randomIds = randomIdsResult.map(r => r.id)

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
