import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const userId = session.user.id

    // Get all subjects and chapters
    const subjects = await prisma.subject.findMany({
      include: {
        chapters: {
          orderBy: { order: "asc" }
        }
      },
      orderBy: { name: "asc" }
    })

    // Get user responses to calculate dynamic mastery
    const responses = await prisma.questionResponse.findMany({
      where: { attempt: { userId, status: "COMPLETED" } },
      include: { 
        question: true,
        attempt: true
      }
    })

    // Group responses by chapter and attempt
    const chapterAttempts = new Map()
    for (const r of responses) {
      const chapterId = r.question.chapterId
      if (!chapterAttempts.has(chapterId)) {
        chapterAttempts.set(chapterId, new Map())
      }
      
      const attemptsForChapter = chapterAttempts.get(chapterId)
      if (!attemptsForChapter.has(r.attempt.id)) {
        attemptsForChapter.set(r.attempt.id, {
          startedAt: r.attempt.startedAt.getTime(),
          correct: 0,
          total: 0
        })
      }
      
      const stat = attemptsForChapter.get(r.attempt.id)
      stat.total += 1
      if (r.isCorrect) {
        stat.correct += 1
      }
    }

    // For each chapter, pick the latest attempt's stats
    const chapterStats = new Map()
    for (const [chapterId, attemptsForChapter] of chapterAttempts.entries()) {
      let latestStat = null
      for (const stat of attemptsForChapter.values()) {
        if (!latestStat || stat.startedAt > latestStat.startedAt) {
          latestStat = stat
        }
      }
      if (latestStat) {
        chapterStats.set(chapterId, latestStat)
      }
    }

    // Fetch manual ChapterProgress (updated via Latihan Bab)
    const chapterProgressRecords = await prisma.chapterProgress.findMany({
      where: { userId }
    })
    const manualProgressMap = new Map()
    for (const p of chapterProgressRecords) {
      manualProgressMap.set(p.chapterId, p)
    }

    const learningPath = subjects.map(sub => {
      const chapters = sub.chapters.map(ch => {
        const stats = chapterStats.get(ch.id)
        const manual = manualProgressMap.get(ch.id)
        
        let mastery = 0
        let status = "NOT_STARTED"

        // Dynamic tryout mastery
        let dynamicMastery = 0
        if (stats && stats.total > 0) {
          dynamicMastery = Math.round((stats.correct / stats.total) * 100)
        }

        // Manual practice mastery
        const manualMastery = manual?.masteryLevel || 0

        // Take the highest
        mastery = Math.max(dynamicMastery, manualMastery)
        
        if (mastery >= 70) {
          status = "COMPLETED"
        } else if (mastery > 0 || (stats && stats.total > 0) || manual) {
          status = "IN_PROGRESS"
        }

        return {
          id: ch.id,
          name: ch.name,
          mastery,
          status,
          totalQuestionsDone: stats ? stats.total : 0,
          theorySummary: ch.theorySummary || null,
          subjectId: sub.id
        }
      })

      // Sort chapters: In Progress first, then Not Started, then Completed
      chapters.sort((a, b) => {
        const priority = { "IN_PROGRESS": 1, "NOT_STARTED": 2, "COMPLETED": 3 }
        return priority[a.status as keyof typeof priority] - priority[b.status as keyof typeof priority]
      })

      // Calculate average mastery for the subject
      const totalMastery = chapters.reduce((sum, ch) => sum + ch.mastery, 0)
      const averageMastery = chapters.length > 0 ? totalMastery / chapters.length : 0

      return {
        id: sub.id,
        name: sub.name,
        averageMastery,
        chapters
      }
    })

    // Sort subjects dynamically by lowest mastery first (weakest subject appears on top)
    // If average mastery is the same, keep alphabetical order (stable sort via initial DB order + mastery sort)
    learningPath.sort((a, b) => a.averageMastery - b.averageMastery)

    return NextResponse.json({ learningPath })
  } catch (error) {
    console.error("Learning path error:", error)
    return NextResponse.json({ error: "Failed to load learning path" }, { status: 500 })
  }
}
