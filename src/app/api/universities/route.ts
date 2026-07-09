import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search") || ""
  const universities = await prisma.university.findMany({
    where: search ? { name: { contains: search, mode: "insensitive" } } : {},
    include: { _count: { select: { majors: true } } },
    orderBy: { name: "asc" },
  })
  return NextResponse.json({ data: universities })
}
