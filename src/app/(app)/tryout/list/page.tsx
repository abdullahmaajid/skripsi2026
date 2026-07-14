import { prisma } from "@/lib/prisma"
import TryoutListClient from "./TryoutListClient"
import { auth } from "@/auth"

export default async function TryoutListPage() {
  const session = await auth()
  const userId = session?.user?.id

  const templates = await prisma.examTemplate.findMany({
    orderBy: { name: "asc" },
    include: { 
      _count: { select: { attempts: true } },
      attempts: userId ? {
        where: { userId, status: "COMPLETED" },
        select: { scaledScore: true },
        orderBy: { scaledScore: "desc" },
        take: 1
      } : undefined
    },
  })

  const questionCount = await prisma.question.count()

  return <TryoutListClient templates={templates.map(t => {
    const isCompleted = t.attempts && t.attempts.length > 0;
    const bestScore = isCompleted ? t.attempts[0].scaledScore : 0;
    
    return {
      id: t.id,
      name: t.name,
      description: t.description || "",
      duration: t.duration,
      totalItems: Math.min(t.totalItems, questionCount),
      cluster: t.cluster,
      isAdaptive: t.isAdaptive,
      attempts: t._count.attempts,
      isCompleted,
      bestScore
    }
  })} />
}
