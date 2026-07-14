import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export const dynamic = "force-dynamic"

export async function GET() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return NextResponse.json({ data: [
      { attempt: "TO #1", scaled: 450, theta: -0.5, date: "Jan 15" },
      { attempt: "TO #2", scaled: 520, theta: 0.2, date: "Feb 01" },
      { attempt: "TO #3", scaled: 580, theta: 0.8, date: "Feb 20" },
    ]})
  }

  const attempts = await prisma.examAttempt.findMany({
    where: { userId, status: "COMPLETED" },
    orderBy: { finishedAt: "asc" },
    select: { id: true, scaledScore: true, irtScore: true, finishedAt: true, template: { select: { name: true } } },
  })

  const data = attempts.map((a, i) => {
    const formattedDate = a.finishedAt ? new Intl.DateTimeFormat("id-ID", { month: "short", day: "numeric" }).format(a.finishedAt) : ""
    return {
      attemptId: a.id,
      attempt: a.template.name || `TO #${i + 1}`,
      scaled: Math.round(a.scaledScore || 0),
      theta: Math.round((a.irtScore || 0) * 100) / 100,
      date: formattedDate,
      label: `TO #${i + 1}`
    }
  })

  return NextResponse.json({ data })
}
