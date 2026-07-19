import { prisma } from "@/lib/prisma"
import DashboardClient from "./DashboardClient"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { calculateChance } from "@/lib/chancing/calculator"

export default async function DashboardPage() {
  const session = await auth()
  const userId = session?.user?.id

  // Redirect admin users away from student dashboard
  if ((session?.user as any)?.role === "ADMIN") {
    redirect("/admin")
  }

  const [user, subjects] = await Promise.all([
    userId ? prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        role: true,
        irtAbility: true,
        profile: {
          select: {
            targetMajor1Id: true,
            targetMajor1: {
              select: {
                id: true,
                name: true,
                estimatedScore: true,
                cluster: true,
                university: { select: { name: true } }
              }
            }
          }
        }
      }
    }) : null,
    prisma.subject.findMany({ orderBy: { name: "asc" } })
  ])

  // Redirect admin users away from student dashboard
  if ((session?.user as any)?.role === "ADMIN") {
    redirect("/admin")
  }

  // Track journey milestones (hoisted for access later)
  let hasDiagnostic: any = null
  let hasNonDiagnosticTryout: any = null
  let hasLearningPathProgress: any = null
  let hasPracticeActivity: any = null
  let attempts: any[] = []
  let recentAttempts: any[] = []
  let soalCount = 0

  if (userId && user) {
    // Skip onboarding redirects for admin users
    if (user.role !== "ADMIN" && !user.profile?.targetMajor1Id) {
      redirect("/onboarding")
    }

    // Run parallel queries for user stats
    const [diag, nonDiag, lp, practice, userAttempts, userRecent, totalSoal] = await Promise.all([
      prisma.examAttempt.findFirst({ where: { userId, template: { isDiagnostic: true }, status: "COMPLETED" } }),
      prisma.examAttempt.findFirst({ where: { userId, template: { isDiagnostic: false }, status: "COMPLETED" } }),
      prisma.chapterProgress.findFirst({ where: { userId } }),
      prisma.questionResponse.findFirst({ where: { attempt: { userId, template: { isDiagnostic: false } } } }),
      prisma.examAttempt.findMany({
        where: { userId, status: "COMPLETED" },
        orderBy: { finishedAt: "desc" },
        take: 10,
        select: { id: true, scaledScore: true, irtScore: true, rawScore: true, startedAt: true, finishedAt: true, template: { select: { name: true } } },
      }),
      prisma.examAttempt.findMany({
        where: { userId },
        orderBy: { startedAt: "desc" },
        take: 2,
        select: { id: true, scaledScore: true, status: true, startedAt: true, template: { select: { name: true } } },
      }),
      prisma.questionResponse.count({ where: { attempt: { userId, status: "COMPLETED" } } })
    ])

    hasDiagnostic = diag
    hasNonDiagnosticTryout = nonDiag
    hasLearningPathProgress = lp
    hasPracticeActivity = practice
    attempts = userAttempts
    recentAttempts = userRecent
    soalCount = totalSoal
    
    if (user.role !== "ADMIN" && !hasDiagnostic) {
      redirect("/onboarding?resume=diagnostic")
    }
  }

  // Fetch subject scores from latest attempt
  const latestAttempt = attempts[0]
  const subScores = latestAttempt ? await prisma.subjectScore.findMany({
    where: { attemptId: latestAttempt.id },
  }) : []

  // Build radar data
  const targetScore = user?.profile?.targetMajor1?.estimatedScore || 700
  const radarData = subjects.map(s => {
    const ss = subScores.find(sc => sc.subjectId === s.id)
    return { subject: s.name.replace("Penalaran ", "Pen. ").replace("Literasi ", "Lit. ").replace("Pengetahuan ", "Peng. ").replace("Pemahaman Bacaan & Menulis", "PBM").replace("Pengetahuan & Pemahaman Umum", "PPU"), score: ss?.scaledScore || 0, target: targetScore }
  })

  // ── Dynamic Stats (Real from DB) ──
  const tryOutCount = attempts.length

  // Real jam belajar from finishedAt - startedAt
  const totalSeconds = attempts.reduce((sum, a) => {
    if (a.finishedAt && a.startedAt) {
      return sum + (new Date(a.finishedAt).getTime() - new Date(a.startedAt).getTime()) / 1000
    }
    return sum
  }, 0)
  const jamCount = parseFloat((totalSeconds / 3600).toFixed(1))

  // Countdown to UTBK
  const utbkDate = new Date('2026-05-15')
  const hariLagi = Math.max(0, Math.ceil((utbkDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)))

  // Peluang Lulus — using real chancing formula
  const estimatedScore = user?.profile?.targetMajor1?.estimatedScore || 700
  const competitiveness = (user?.profile?.targetMajor1?.applicants || 1) / (user?.profile?.targetMajor1?.quota || 1)
  const studentScoreSNBT = latestAttempt?.scaledScore || 0
  const peluangLulusObj = calculateChance(studentScoreSNBT, estimatedScore, competitiveness)
  const peluangLulus = studentScoreSNBT ? peluangLulusObj.percentage : 0

  // Fokus Subject (lowest radar score, ignoring 0)
  const validRadar = radarData.filter(r => r.score > 0)
  const sortedRadar = [...validRadar].sort((a, b) => a.score - b.score)
  const fokusSubject = sortedRadar[0]?.subject || "Penalaran Umum"

  // Tren Skor (reversed so oldest → newest for line chart)
  const trendData = [...attempts]
    .reverse()
    .map((a, i) => ({
      label: `TO ${i + 1}`,
      score: Math.round(a.scaledScore || 0),
    }))

  const recentActivities = recentAttempts.map(a => ({
    title: a.template?.name || "Try Out SNBT",
    date: a.startedAt.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
    score: a.scaledScore || 0,
    status: a.status === "COMPLETED" ? "Selesai" : "Sedang Berjalan",
  }))

  const targetName = user?.profile?.targetMajor1
    ? `${user.profile.targetMajor1.name} — ${user.profile.targetMajor1.university.name}`
    : "Belum dipilih"

  // ── Actionable Insight Engine ──
  let insightData = null;
  const zeroScoreSubjects = radarData.filter(r => r.score === 0);

  if (latestAttempt && zeroScoreSubjects.length > 0) {
    insightData = {
      type: "URGENT_REVIEW",
      subject: zeroScoreSubjects[0].subject,
      score: 0,
      target: targetScore,
      message: `Ada ${zeroScoreSubjects.length} subtes yang datanya masih kosong (salah satunya ${zeroScoreSubjects[0].subject}). Segera selesaikan Try Out untuk mendapatkan pemetaan yang akurat!`,
      actionText: "Lanjut Try Out",
      actionUrl: "/tryout/list"
    }
  } else if (latestAttempt && sortedRadar.length > 0) {
    const weakest = sortedRadar[0];
    const isCritical = weakest.score < weakest.target - 100;
    
    insightData = {
      type: isCritical ? "URGENT_REVIEW" : "REVIEW",
      subject: weakest.subject,
      score: Math.round(weakest.score),
      target: weakest.target,
      message: `Berdasarkan TO terakhir, skor ${weakest.subject} kamu (${Math.round(weakest.score)}) masih di bawah target (${weakest.target}). Jangan dibiarkan!`,
      actionText: `Perkuat ${weakest.subject}`,
      actionUrl: `/learning-path`
    }
  } else if (hasPracticeActivity && !latestAttempt) {
    insightData = {
      type: "KEEP_GOING",
      message: "Kamu sudah banyak berlatih tapi belum mencoba Try Out. Yuk ukur kemampuan aslimu!",
      actionText: "Mulai Try Out",
      actionUrl: "/tryout/list"
    }
  }

  // Journey progress object
  // Each step should only reflect its own actual activity:
  // - diagnosticDone: user completed a diagnostic exam
  // - firstTryoutDone: user completed a non-diagnostic tryout
  // - learningPathExplored: user has chapterProgress (visited & interacted with learning path)
  // - practiceStarted: user has answered questions in a non-diagnostic context
  const journeyProgress = {
    diagnosticDone: !!hasDiagnostic,
    firstTryoutDone: !!hasNonDiagnosticTryout,
    learningPathExplored: !!hasLearningPathProgress,
    practiceStarted: !!hasPracticeActivity,
  }

  // Mini AI Recommendation (Safety) — use correct Prisma Cluster enum (uppercase)
  let aiRecommendation = null
  if (userId && latestAttempt?.scaledScore) {
    const userCluster = user?.profile?.targetMajor1?.cluster ?? "SAINTEK"
    aiRecommendation = await prisma.major.findFirst({
      where: {
        cluster: userCluster,
        estimatedScore: { lte: latestAttempt.scaledScore },
      },
      orderBy: { estimatedScore: "desc" },
    })
  }

  return (
    <DashboardClient
      userName={user?.name || "Siswa"}
      targetName={targetName}
      latestScore={latestAttempt?.scaledScore || 0}
      irtTheta={user?.irtAbility || 0}
      totalAttempts={tryOutCount}
      radarData={radarData}
      recentActivities={recentActivities}
      stats={{ tryOutCount, soalCount, hariLagi, jamCount }}
      fokusSubject={fokusSubject}
      peluangLulus={peluangLulus}
      trendData={trendData}
      targetScoreGap={latestAttempt?.scaledScore ? Math.round(estimatedScore - latestAttempt.scaledScore) : null}
      journeyProgress={journeyProgress}
      aiRecommendation={aiRecommendation}
      insightData={insightData}
    />
  )
}
