import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user?.id) return "UNAUTHENTICATED"
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } })
  if (!user || user.role !== "ADMIN") return "FORBIDDEN"
  return null
}

export async function GET() {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const [
      studentsCount,
      adminsCount,
      subjectsCount,
      chaptersCount,
      questionsCount,
      universitiesCount,
      majorsCount,
      tryoutsCount,
      attemptsCount,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.user.count({ where: { role: "ADMIN" } }),
      prisma.subject.count(),
      prisma.chapter.count(),
      prisma.question.count(),
      prisma.university.count(),
      prisma.major.count(),
      prisma.examTemplate.count(),
      prisma.examAttempt.count({ where: { status: "COMPLETED" } }),
    ])

    return NextResponse.json({
      data: {
        users: { students: studentsCount, admins: adminsCount, total: studentsCount + adminsCount },
        curriculum: { subjects: subjectsCount, chapters: chaptersCount, questions: questionsCount },
        ptn: { universities: universitiesCount, majors: majorsCount },
        exams: { tryouts: tryoutsCount, attempts: attemptsCount },
      },
    })
  } catch (error) {
    console.error("Admin stats API error:", error)
    return NextResponse.json({ error: "Gagal memuat statistik admin" }, { status: 500 })
  }
}