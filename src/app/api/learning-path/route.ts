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

    // Fetch target major to determine cluster weights
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
      include: { targetMajor1: true }
    })
    const targetCluster = studentProfile?.targetMajor1?.cluster || "CAMPURAN"

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
      select: {
        isCorrect: true,
        question: {
          select: {
            chapterId: true
          }
        },
        attempt: {
          select: {
            id: true,
            startedAt: true
          }
        }
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
      // Determine weight based on cluster
      let weight = 1.0
      if (targetCluster === "SAINTEK") {
        if (sub.name === "Penalaran Matematika" || sub.name === "Pengetahuan Kuantitatif") weight = 1.5
      } else if (targetCluster === "SOSHUM") {
        if (sub.name === "Literasi Bahasa Indonesia" || sub.name === "Literasi Bahasa Inggris") weight = 1.5
      }

      const chapters = sub.chapters.map(ch => {
        const stats = chapterStats.get(ch.id)
        const manual = manualProgressMap.get(ch.id)
        
        let status = "NOT_STARTED"

        const conceptMastery = manual?.masteryLevel || 0
        const examReadiness = stats && stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : null
        
        // Status logic
        if (examReadiness !== null) {
          // If they failed the tryout (< 70), downgrade to IN_PROGRESS regardless of practice score
          if (examReadiness >= 70 && conceptMastery >= 70) status = "COMPLETED"
          else status = "IN_PROGRESS"
        } else {
          // No tryout data, rely on practice
          if (conceptMastery >= 70) status = "COMPLETED"
          else if (conceptMastery > 0 || manual) status = "IN_PROGRESS"
        }

        // Legacy mastery for UI ring
        const mastery = Math.max(conceptMastery, examReadiness || 0)

        return {
          id: ch.id,
          name: ch.name,
          mastery, // Legacy fallback
          conceptMastery,
          examReadiness,
          status,
          totalQuestionsDone: stats ? stats.total : 0,
          theorySummary: ch.theorySummary || null,
          subjectId: sub.id
        }
      })

      // Sort chapters: In Progress first, then Not Started, then Completed
      chapters.sort((a, b) => {
        const priorityMap = { "IN_PROGRESS": 1, "NOT_STARTED": 2, "COMPLETED": 3 }
        return priorityMap[a.status as keyof typeof priorityMap] - priorityMap[b.status as keyof typeof priorityMap]
      })

      // Calculate average mastery for the subject ring
      const totalMastery = chapters.reduce((sum, ch) => sum + ch.mastery, 0)
      const averageMastery = chapters.length > 0 ? totalMastery / chapters.length : 0

      // Calculate Priority Score
      const totalReadiness = chapters.reduce((sum, ch) => sum + (ch.examReadiness !== null ? ch.examReadiness : ch.conceptMastery), 0)
      const averageReadiness = chapters.length > 0 ? totalReadiness / chapters.length : 0
      const priorityScore = (100 - averageReadiness) * weight

      return {
        id: sub.id,
        name: sub.name,
        averageMastery,
        priorityScore,
        weight,
        chapters
      }
    })

    // Sort subjects dynamically by highest Priority Score first
    learningPath.sort((a, b) => b.priorityScore - a.priorityScore)

    return NextResponse.json({ learningPath })
  } catch (error) {
    console.error("Learning path error:", error)
    return NextResponse.json({ error: "Failed to load learning path" }, { status: 500 })
  }
}
