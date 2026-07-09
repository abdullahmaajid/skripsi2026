import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { Cluster } from "@prisma/client"
import { calculateChance } from "@/lib/chancing/calculator"
import ChancingClient from "./ChancingClient"

export default async function ChancingPage() {
  const session = await auth()
  const userId = session?.user?.id

  const user = userId ? await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: { include: { targetMajor1: { include: { university: true } }, targetMajor2: { include: { university: true } } } } },
  }) : null

  const studentScore = Math.round(500 + (user?.irtAbility || 0) * 100)

  const targetIds = [user?.profile?.targetMajor1Id, user?.profile?.targetMajor2Id].filter(Boolean) as string[]

  const targetMajors = targetIds.length > 0
    ? await prisma.major.findMany({ where: { id: { in: targetIds } }, include: { university: true } })
    : []

  // Collect unique Cluster enum values from the user's target majors
  const userClusters: Cluster[] = Array.from(
    new Set(targetMajors.map((m) => m.cluster))
  )
  if (userClusters.length === 0) userClusters.push(Cluster.SAINTEK)

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

  const baseWhere = {
    cluster: { in: userClusters },
    ...keywordFilter,
  }

  // AI Recommendation Logic
  // 1. Aman (Safety): Score <= studentScore - 10
  const safetyMajor = await prisma.major.findFirst({
    where: { ...baseWhere, id: { notIn: targetIds }, estimatedScore: { lte: Math.max(studentScore - 10, 400) } },
    orderBy: { estimatedScore: 'desc' },
    include: { university: true },
  }) ?? await prisma.major.findFirst({
    where: { cluster: { in: userClusters }, id: { notIn: targetIds }, estimatedScore: { lte: Math.max(studentScore - 10, 400) } },
    orderBy: { estimatedScore: 'desc' },
    include: { university: true },
  }) ?? await prisma.major.findFirst({
    where: { cluster: { in: userClusters }, id: { notIn: targetIds } },
    orderBy: { estimatedScore: 'asc' },
    include: { university: true },
  })

  // 2. Sesuai 1 (Match 1): Score >= studentScore
  const excludedForMatch = [...targetIds, safetyMajor?.id].filter(Boolean) as string[]
  const matchMajor1 = await prisma.major.findFirst({
    where: { ...baseWhere, id: { notIn: excludedForMatch }, estimatedScore: { gte: studentScore } },
    orderBy: { estimatedScore: 'asc' },
    include: { university: true },
  }) ?? await prisma.major.findFirst({
    where: { cluster: { in: userClusters }, id: { notIn: excludedForMatch }, estimatedScore: { gte: studentScore } },
    orderBy: { estimatedScore: 'asc' },
    include: { university: true },
  })

  // 3. Sesuai 2 (Match 2): Score <= studentScore
  const excludedForMatch2 = [...excludedForMatch, matchMajor1?.id].filter(Boolean) as string[]
  const matchMajor2 = await prisma.major.findFirst({
    where: { ...baseWhere, id: { notIn: excludedForMatch2 }, estimatedScore: { lte: studentScore } },
    orderBy: { estimatedScore: 'desc' },
    include: { university: true },
  }) ?? await prisma.major.findFirst({
    where: { cluster: { in: userClusters }, id: { notIn: excludedForMatch2 }, estimatedScore: { lte: studentScore } },
    orderBy: { estimatedScore: 'desc' },
    include: { university: true },
  }) ?? await prisma.major.findFirst({
    where: { cluster: { in: userClusters }, id: { notIn: excludedForMatch2 } },
    orderBy: { estimatedScore: 'asc' },
    include: { university: true },
  })

  // 4. Tantangan (Reach): Score >= studentScore + 20
  const excludedForReach = [...excludedForMatch2, matchMajor2?.id].filter(Boolean) as string[]
  const reachMajor = await prisma.major.findFirst({
    where: { ...baseWhere, id: { notIn: excludedForReach }, estimatedScore: { gte: studentScore + 20 } },
    orderBy: { estimatedScore: 'asc' },
    include: { university: true },
  }) ?? await prisma.major.findFirst({
    where: { cluster: { in: userClusters }, id: { notIn: excludedForReach }, estimatedScore: { gte: studentScore + 20 } },
    orderBy: { estimatedScore: 'asc' },
    include: { university: true },
  }) ?? await prisma.major.findFirst({
    where: { cluster: { in: userClusters }, id: { notIn: excludedForReach } },
    orderBy: { estimatedScore: 'asc' },
    include: { university: true },
  })

  type AiEntry = { type: string; major: NonNullable<typeof safetyMajor> }

  const aiMajorsRaw: AiEntry[] = [
    { type: 'Aman', major: safetyMajor },
    { type: 'Sesuai', major: matchMajor1 },
    { type: 'Sesuai', major: matchMajor2 },
    { type: 'Tantangan', major: reachMajor },
  ].filter((item): item is AiEntry => item.major != null)

  const targetResults = targetMajors.map((m) => {
    const comp = m.applicants / m.quota
    const chance = calculateChance(studentScore, m.estimatedScore, comp)
    return {
      majorId: m.id, name: m.name, university: m.university.name,
      estimatedScore: m.estimatedScore, quota: m.quota, applicants: m.applicants,
      competitiveness: Math.round(comp * 10) / 10,
      percentage: chance.percentage, label: chance.label, deficit: chance.deficit,
      isTarget: true, aiType: null,
    }
  })

  const aiResults = aiMajorsRaw.map((item) => {
    const m = item.major
    const comp = m.applicants / m.quota
    const chance = calculateChance(studentScore, m.estimatedScore, comp)
    return {
      majorId: m.id, name: m.name, university: m.university.name,
      estimatedScore: m.estimatedScore, quota: m.quota, applicants: m.applicants,
      competitiveness: Math.round(comp * 10) / 10,
      percentage: chance.percentage, label: chance.label, deficit: chance.deficit,
      isTarget: false, aiType: item.type,
    }
  })

  const results = [...targetResults, ...aiResults]

  return <ChancingClient results={results} studentScore={studentScore} />
}
