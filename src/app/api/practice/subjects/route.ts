import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({
      select: {
        id: true,
        name: true,
        cluster: true,
        chapters: {
          select: {
            id: true,
            name: true,
            _count: { select: { questions: true } }
          }
        }
      },
      orderBy: { name: "asc" },
    })

    return NextResponse.json({
      subjects: subjects.map((s) => ({
        id: s.id,
        name: s.name,
        cluster: s.cluster,
        totalQuestions: s.chapters.reduce((sum, ch) => sum + ch._count.questions, 0),
        chapters: s.chapters.map((ch) => ({
          id: ch.id,
          name: ch.name,
          questionCount: ch._count.questions,
        })),
      })),
    })
  } catch (error) {
    console.error("Subjects fetch error:", error)
    return NextResponse.json({ error: "Gagal memuat data subtes." }, { status: 500 })
  }
}
