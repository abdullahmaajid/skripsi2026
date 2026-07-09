import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const uniId = req.nextUrl.searchParams.get("uniId")
  const cluster = req.nextUrl.searchParams.get("cluster")
  const search = req.nextUrl.searchParams.get("search") || ""

  const where: any = {}
  if (uniId) where.universityId = uniId
  if (cluster) where.cluster = cluster
  if (search) where.name = { contains: search, mode: "insensitive" }

  const majors = await prisma.major.findMany({
    where,
    include: { university: { select: { name: true, code: true } } },
    orderBy: { estimatedScore: "desc" },
  })
  return NextResponse.json({ data: majors })
}
