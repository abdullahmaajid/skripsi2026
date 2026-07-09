import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    
    const { chapterId, correctCount, totalAnswered } = await req.json()
    if (!chapterId || totalAnswered === 0) return NextResponse.json({ success: true })

    const masteryLevel = Math.round((correctCount / totalAnswered) * 100)
    const status = masteryLevel >= 70 ? "COMPLETED" : "IN_PROGRESS"

    const existing = await prisma.chapterProgress.findUnique({
      where: { userId_chapterId: { userId: session.user.id, chapterId } }
    })

    if (!existing || masteryLevel > existing.masteryLevel) {
      await prisma.chapterProgress.upsert({
        where: { userId_chapterId: { userId: session.user.id, chapterId } },
        update: { masteryLevel, status },
        create: { userId: session.user.id, chapterId, masteryLevel, status }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 })
  }
}
