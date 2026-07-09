import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    // Return demo data if not logged in
    return NextResponse.json({ data: [
      { subject: "Penalaran Umum", score: 650, target: 700 },
      { subject: "PBM", score: 720, target: 700 },
      { subject: "PPU", score: 680, target: 700 },
      { subject: "Lit. B.Indo", score: 690, target: 700 },
      { subject: "Lit. B.Inggris", score: 610, target: 700 },
      { subject: "Pen. MTK", score: 580, target: 750 },
      { subject: "PK", score: 630, target: 750 },
    ]})
  }

  // Get user's target score
  const profile = await prisma.studentProfile.findUnique({
    where: { userId },
    include: { targetMajor1: true },
  })
  const targetScore = profile?.targetMajor1?.estimatedScore || 700

  // Get latest completed attempt
  const latestAttempt = await prisma.examAttempt.findFirst({
    where: { userId, status: "COMPLETED" },
    orderBy: { finishedAt: "desc" },
    select: { id: true },
  })

  const subjects = await prisma.subject.findMany({ orderBy: { name: "asc" } })

  if (!latestAttempt) {
    return NextResponse.json({ data: subjects.map(s => ({ subject: s.name, score: 0, target: targetScore })) })
  }

  const subScores = await prisma.subjectScore.findMany({ where: { attemptId: latestAttempt.id } })

  const data = subjects.map(s => {
    const ss = subScores.find(sc => sc.subjectId === s.id)
    return { subject: s.name, score: ss?.scaledScore || 0, target: targetScore }
  })

  return NextResponse.json({ data })
}
