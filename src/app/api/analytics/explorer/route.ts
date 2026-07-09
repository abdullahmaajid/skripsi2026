import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export const dynamic = "force-dynamic"

export async function GET() {
  const session = await auth()
  const userId = session?.user?.id

  console.log("[Explorer API] session:", session?.user?.email, "userId:", userId)

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Also fetch available subjects first to build a map
  const subjectsList = await prisma.subject.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" }
  })
  const subjectMap = Object.fromEntries(subjectsList.map(s => [s.id, s.name]))

  // Get all completed attempts ordered by date ascending
  const attempts = await prisma.examAttempt.findMany({
    where: { userId },
    orderBy: { startedAt: "asc" },
    select: {
      id: true,
      startedAt: true,
      finishedAt: true,
      status: true,
      scaledScore: true,
      irtScore: true,
      template: {
        select: { name: true }
      },
      subScores: {
        select: {
          subjectId: true,
          scaledScore: true,
          irtTheta: true
        }
      }
    }
  })

  console.log("[Explorer API] Found attempts:", attempts.length, "for user:", userId)

  // Format data
  const data = attempts.map(a => {
    // Map subScores into a dictionary
    const subjects = a.subScores.reduce((acc, sub) => {
      acc[sub.subjectId] = {
        name: subjectMap[sub.subjectId] || "Unknown",
        scaledScore: sub.scaledScore,
        irtTheta: sub.irtTheta
      }
      return acc
    }, {} as Record<string, any>)

    return {
      attemptId: a.id,
      date: a.startedAt.toISOString(),
      displayDate: a.startedAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      templateName: a.template.name,
      overall: {
        scaledScore: Math.round(a.scaledScore || 0),
        irtTheta: Math.round((a.irtScore || 0) * 100) / 100
      },
      subjects
    }
  })

  return NextResponse.json({ data, subjects: subjectsList })
}
