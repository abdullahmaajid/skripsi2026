import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { calculateChance, isValidForType } from "@/lib/chancing/calculator"
import { scaleToSNBT } from "@/lib/irt/scoring"
import ChancingClient from "./ChancingClient"

export default async function ChancingPage() {
  const session = await auth()
  const userId = session?.user?.id

  const user = userId ? await prisma.user.findUnique({
    where: { id: userId },
    select: {
      irtAbility: true,
      profile: {
        select: {
          targetMajor1Id: true,
          targetMajor2Id: true,
          targetMajor1: { select: { id: true, name: true, estimatedScore: true, quota: true, applicants: true, cluster: true, university: { select: { name: true } } } },
          targetMajor2: { select: { id: true, name: true, estimatedScore: true, quota: true, applicants: true, cluster: true, university: { select: { name: true } } } },
        }
      }
    },
  }) : null

  // Use scaleToSNBT for consistency with API route (instead of manual formula)
  const studentScore = scaleToSNBT(user?.irtAbility || 0)

  const targetIds = [user?.profile?.targetMajor1Id, user?.profile?.targetMajor2Id].filter(Boolean) as string[]

  const targetMajors = targetIds.length > 0
    ? await prisma.major.findMany({ 
        where: { id: { in: targetIds } }, 
        select: { id: true, name: true, estimatedScore: true, quota: true, applicants: true, cluster: true, universityId: true, university: { select: { name: true, id: true } } } 
      })
    : []

  // ============================================================
  // BEHAVIOR DATA — Score trend, activity level, strong subjects
  // ============================================================
  let scoreTrend: 'rising' | 'stable' | 'declining' | 'unknown' = 'unknown'
  let attemptCount = 0
  let strongSubjectNames: string[] = []

  if (userId) {
    // Fetch completed attempts for trend analysis
    const recentAttempts = await prisma.examAttempt.findMany({
      where: { userId, status: 'COMPLETED' },
      orderBy: { finishedAt: 'desc' },
      take: 5,
      select: { id: true, scaledScore: true, finishedAt: true },
    })

    attemptCount = recentAttempts.length

    // Score trend: analyze last 3+ attempts
    if (recentAttempts.length >= 3) {
      const scores = recentAttempts.slice(0, 3).map(a => a.scaledScore || 0).reverse() // oldest→newest
      const diffs = scores.slice(1).map((s, i) => s - scores[i])
      const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length

      if (avgDiff > 10) scoreTrend = 'rising'
      else if (avgDiff < -10) scoreTrend = 'declining'
      else scoreTrend = 'stable'
    } else if (recentAttempts.length >= 1) {
      scoreTrend = 'stable' // Not enough data, assume stable
    }

    // Strong subjects: from latest attempt's SubjectScores
    const latestAttempt = recentAttempts[0]
    if (latestAttempt) {
      const subScores = await prisma.subjectScore.findMany({
        where: { attemptId: latestAttempt.id },
        orderBy: { scaledScore: 'desc' },
        take: 3,
        include: { subject: { select: { name: true } } },
      })
      strongSubjectNames = subScores.map(ss => ss.subject.name)
    }
  }

  // ============================================================
  // CLUSTER & KEYWORD SETUP
  // ============================================================
  const userClusters: any[] = Array.from(
    new Set(targetMajors.map((m) => m.cluster))
  )
  if (userClusters.length === 0) userClusters.push("SAINTEK")

  const getKeywords = (names: string[]): string[] => {
    const text = names.join(" ").toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
    const words = text.split(/\s+/)
    const stopWords = ['sekolah', 'teknik', 'ilmu', 'pendidikan', 'program', 'studi', 'dan', 'fakultas', 'departemen', 'sains', 'keguruan', 'terapan']
    return Array.from(new Set(words.filter((w) => w.length > 4 && !stopWords.includes(w))))
  }
  const keywords = getKeywords(targetMajors.map((m) => m.name))

  const keywordFilter = keywords.length > 0
    ? { OR: keywords.map((kw) => ({ name: { contains: kw, mode: 'insensitive' as const } })) }
    : {}

  // Collect target university IDs to encourage diversity
  const targetUniIds = targetMajors.map(m => m.universityId)

  // ============================================================
  // BEHAVIOR-AWARE THRESHOLDS
  // ============================================================
  // Adjust thresholds based on student behavior:
  // - Rising trend → student is improving, can reach slightly higher
  // - More attempts → more confident in the data, tighter recommendations
  // - Declining → recommend more safety

  const trendBoost = scoreTrend === 'rising' ? 0.03 : scoreTrend === 'declining' ? -0.03 : 0
  const confidenceLevel = Math.min(1, attemptCount / 5) // 0-1, higher = more data

  // Threshold multipliers (relative to studentScore)
  const safetyMax = studentScore * (0.85 + trendBoost)          // "Aman": estimasi harus ≤ ini
  const matchLow  = studentScore * (0.90 + trendBoost)          // "Sesuai": range bawah
  const matchHigh = studentScore * (1.05 + trendBoost)          // "Sesuai": range atas
  const reachMin  = studentScore * (1.10 + trendBoost)          // "Tantangan": range bawah
  const reachMax  = studentScore * (1.30)                       // "Tantangan": range atas (hard cap)

  // ============================================================
  // AI RECOMMENDATION QUERIES
  // ============================================================
  // Helper: build result with validation
  type MajorWithUni = NonNullable<Awaited<ReturnType<typeof prisma.major.findFirst>> & { university: { name: string } }>

  const buildResult = (major: MajorWithUni, requestedType: 'Aman' | 'Sesuai' | 'Tantangan', originalReason: string) => {
    const comp = major.applicants / major.quota
    const chance = calculateChance(studentScore, major.estimatedScore, comp)

    // Determine honest aiType based on actual chance
    let honestAiType: 'Aman' | 'Sesuai' | 'Tantangan' = requestedType
    if (chance.percentage >= 40) honestAiType = 'Aman'
    else if (chance.percentage >= 15) honestAiType = 'Sesuai'
    else honestAiType = 'Tantangan'

    // Adjust reasoning if the major was demoted because the student's score is too low
    let reason = originalReason
    if (requestedType === 'Aman' && honestAiType !== 'Aman') {
      reason = 'Ini adalah opsi dengan passing grade terendah yang tersedia, namun tetap menjadi tantangan untuk skormu saat ini.'
    } else if (requestedType === 'Sesuai' && honestAiType === 'Tantangan') {
      reason = 'Sesuai dengan rumpun/minatmu, tapi jarak skormu membuatnya masih sangat menantang.'
    }

    return {
      majorId: major.id, name: major.name, university: major.university.name,
      estimatedScore: major.estimatedScore, quota: major.quota, applicants: major.applicants,
      competitiveness: Math.round(comp * 10) / 10,
      percentage: chance.percentage, label: chance.label, deficit: chance.deficit,
      isTarget: false, aiType: honestAiType, aiReason: reason,
    }
  }

  const allExcluded = [...targetIds]
  const addExcluded = (id: string | undefined) => { if (id) allExcluded.push(id) }

  // Prefer different universities from target for diversity
  const diversityFilter = targetUniIds.length > 0
    ? { universityId: { notIn: targetUniIds } }
    : {}

  // --- 1. AMAN (Safety) ---
  // NO keyword filter — cross-field is fine for safety picks
  // Must have estimatedScore well below student's score
  let safetyResult = null
  const safetyQuery = async (extra: any = {}) => prisma.major.findFirst({
    where: {
      cluster: { in: userClusters },
      id: { notIn: allExcluded },
      estimatedScore: { lte: safetyMax, gte: 300 }, // Don't recommend absurdly low
      ...diversityFilter,
      ...extra,
    },
    orderBy: { estimatedScore: 'desc' }, // Closest to threshold = best safety pick
    select: { id: true, name: true, estimatedScore: true, quota: true, applicants: true, cluster: true, universityId: true, university: { select: { name: true, id: true } } },
  })

  let safetyMajor = await safetyQuery() as MajorWithUni | null
  // Fallback: allow same university if no diverse option
  if (!safetyMajor) safetyMajor = await safetyQuery({ universityId: undefined }) as MajorWithUni | null
  // Absolute fallback: lowest score available
  if (!safetyMajor) {
    safetyMajor = await prisma.major.findFirst({
      where: { cluster: { in: userClusters }, id: { notIn: allExcluded } },
      orderBy: { estimatedScore: 'asc' },
      select: { id: true, name: true, estimatedScore: true, quota: true, applicants: true, cluster: true, universityId: true, university: { select: { name: true, id: true } } },
    }) as MajorWithUni | null
  }

  if (safetyMajor) {
    const reason = scoreTrend === 'rising'
      ? 'Pilihan aman — skormu sedang naik, ini jadi backup yang sangat solid.'
      : 'Pilihan aman berdasarkan skor saat ini. Peluang masuk tinggi.'
    safetyResult = buildResult(safetyMajor, 'Aman', reason)
    addExcluded(safetyMajor.id)
  }

  // --- 2. SESUAI 1 (Match — slightly above score) ---
  // Uses keyword filter to keep it relevant to student's interests
  let match1Result = null
  const match1Query = async (filter: any = {}) => prisma.major.findFirst({
    where: {
      cluster: { in: userClusters },
      id: { notIn: allExcluded },
      estimatedScore: { gte: matchLow, lte: matchHigh },
      ...filter,
    },
    orderBy: { estimatedScore: 'asc' },
    select: { id: true, name: true, estimatedScore: true, quota: true, applicants: true, cluster: true, universityId: true, university: { select: { name: true, id: true } } },
  })

  let matchMajor1 = await match1Query(keywordFilter) as MajorWithUni | null
  if (!matchMajor1) matchMajor1 = await match1Query() as MajorWithUni | null
  // Absolute fallback: next lowest score
  if (!matchMajor1) {
    matchMajor1 = await prisma.major.findFirst({
      where: { cluster: { in: userClusters }, id: { notIn: allExcluded } },
      orderBy: { estimatedScore: 'asc' },
      select: { id: true, name: true, estimatedScore: true, quota: true, applicants: true, cluster: true, universityId: true, university: { select: { name: true, id: true } } },
    }) as MajorWithUni | null
  }

  if (matchMajor1) {
    const matchesInterest = keywords.some(kw => matchMajor1!.name.toLowerCase().includes(kw))
    const reason = matchesInterest
      ? `Sesuai minatmu di bidang ${matchMajor1.name.split(' ')[0]} dan cocok dengan kemampuan saat ini.`
      : `Sesuai kemampuanmu — estimasi skor dekat dengan skormu saat ini.`
    match1Result = buildResult(matchMajor1, 'Sesuai', reason)
    addExcluded(matchMajor1.id)
  }

  // --- 3. SESUAI 2 (Match — slightly below score, comfortable) ---
  let match2Result = null
  const match2Low = studentScore * 0.85
  const match2High = studentScore * 0.95

  const match2Query = async (filter: any = {}) => prisma.major.findFirst({
    where: {
      cluster: { in: userClusters },
      id: { notIn: allExcluded },
      estimatedScore: { gte: match2Low, lte: match2High },
      ...diversityFilter,
      ...filter,
    },
    orderBy: { estimatedScore: 'desc' },
    select: { id: true, name: true, estimatedScore: true, quota: true, applicants: true, cluster: true, universityId: true, university: { select: { name: true, id: true } } },
  })

  let matchMajor2 = await match2Query(keywordFilter) as MajorWithUni | null
  if (!matchMajor2) matchMajor2 = await match2Query() as MajorWithUni | null
  // Fallback: allow same university
  if (!matchMajor2) matchMajor2 = await match2Query({ ...keywordFilter, universityId: undefined }) as MajorWithUni | null
  if (!matchMajor2) {
    matchMajor2 = await prisma.major.findFirst({
      where: {
        cluster: { in: userClusters },
        id: { notIn: allExcluded },
        estimatedScore: { gte: match2Low, lte: match2High },
      },
      orderBy: { estimatedScore: 'desc' },
      select: { id: true, name: true, estimatedScore: true, quota: true, applicants: true, cluster: true, universityId: true, university: { select: { name: true, id: true } } },
    }) as MajorWithUni | null
  }
  // Absolute fallback: next lowest score
  if (!matchMajor2) {
    matchMajor2 = await prisma.major.findFirst({
      where: { cluster: { in: userClusters }, id: { notIn: allExcluded } },
      orderBy: { estimatedScore: 'asc' },
      select: { id: true, name: true, estimatedScore: true, quota: true, applicants: true, cluster: true, universityId: true, university: { select: { name: true, id: true } } },
    }) as MajorWithUni | null
  }

  if (matchMajor2) {
    const reason = strongSubjectNames.length > 0
      ? `Cocok dengan kekuatanmu di ${strongSubjectNames[0]}. Peluang realistis.`
      : `Estimasi skor sedikit di bawah kemampuanmu — peluang bagus.`
    match2Result = buildResult(matchMajor2, 'Sesuai', reason)
    addExcluded(matchMajor2.id)
  }

  // --- 4. TANTANGAN (Reach) ---
  // A stretch goal that's ambitious but not impossible
  let reachResult = null
  const reachQuery = async (filter: any = {}) => prisma.major.findFirst({
    where: {
      cluster: { in: userClusters },
      id: { notIn: allExcluded },
      estimatedScore: { gte: reachMin, lte: reachMax },
      ...filter,
    },
    orderBy: { estimatedScore: 'asc' }, // Closest reach = most achievable
    select: { id: true, name: true, estimatedScore: true, quota: true, applicants: true, cluster: true, universityId: true, university: { select: { name: true, id: true } } },
  })

  let reachMajor = await reachQuery(keywordFilter) as MajorWithUni | null
  if (!reachMajor) reachMajor = await reachQuery() as MajorWithUni | null
  // Absolute fallback: next lowest score
  if (!reachMajor) {
    reachMajor = await prisma.major.findFirst({
      where: { cluster: { in: userClusters }, id: { notIn: allExcluded } },
      orderBy: { estimatedScore: 'asc' },
      select: { id: true, name: true, estimatedScore: true, quota: true, applicants: true, cluster: true, universityId: true, university: { select: { name: true, id: true } } },
    }) as MajorWithUni | null
  }

  if (reachMajor) {
    const reason = scoreTrend === 'rising'
      ? `Tantangan yang bisa dicapai! Tren skormu naik — terus tingkatkan ${Math.round(reachMajor.estimatedScore - studentScore)} poin lagi.`
      : attemptCount >= 3
        ? `Tantangan realistis. Butuh peningkatan ${Math.round(reachMajor.estimatedScore - studentScore)} poin dari skor saat ini.`
        : `Tantangan ambisius — selesaikan lebih banyak Try Out untuk mengukur peluangmu.`
    reachResult = buildResult(reachMajor, 'Tantangan', reason)
    addExcluded(reachMajor.id)
  }

  // ============================================================
  // ASSEMBLE RESULTS — only include validated recommendations
  // ============================================================
  type ResultType = {
    majorId: string; name: string; university: string; estimatedScore: number
    quota: number; applicants: number; competitiveness: number
    percentage: number; label: string; deficit: number
    isTarget: boolean; aiType: string | null; aiReason: string | null
  }

  const targetResults: ResultType[] = targetMajors.map((m) => {
    const comp = m.applicants / m.quota
    const chance = calculateChance(studentScore, m.estimatedScore, comp)
    return {
      majorId: m.id, name: m.name, university: m.university.name,
      estimatedScore: m.estimatedScore, quota: m.quota, applicants: m.applicants,
      competitiveness: Math.round(comp * 10) / 10,
      percentage: chance.percentage, label: chance.label, deficit: chance.deficit,
      isTarget: true, aiType: null, aiReason: null,
    }
  })

  // Only include AI results that passed validation — no misleading cards
  const aiResults = [safetyResult, match1Result, match2Result, reachResult]
    .filter((r) => r != null) as ResultType[]

  const results = [...targetResults, ...aiResults]

  // Behavior context for client display
  const behaviorContext = {
    scoreTrend,
    attemptCount,
    strongSubjects: strongSubjectNames,
  }

  return <ChancingClient results={results} studentScore={studentScore} behaviorContext={behaviorContext} />
}
