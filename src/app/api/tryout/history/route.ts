import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ attempts: [] })
    }

    const attempts = await prisma.examAttempt.findMany({
      where: {
        userId: session.user.id,
        status: "COMPLETED",
      },
      orderBy: { finishedAt: "desc" },
      take: 10,
      select: {
        id: true,
        scaledScore: true,
        finishedAt: true,
        template: { select: { name: true } },
      },
    })

    return NextResponse.json({
      attempts: attempts.map(a => ({
        id: a.id,
        templateName: a.template?.name || "Try Out",
        scaledScore: a.scaledScore || 0,
        finishedAt: a.finishedAt?.toISOString() || new Date().toISOString(),
      }))
    })
  } catch (error) {
    console.error("Tryout history error:", error)
    return NextResponse.json({ attempts: [] })
  }
}
