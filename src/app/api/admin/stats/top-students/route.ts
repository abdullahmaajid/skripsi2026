import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) return "UNAUTHENTICATED";
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  if (user?.role !== "ADMIN") return "FORBIDDEN";
  return null;
}

export async function GET() {
  const deny = await requireAdmin();
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    // Fetch top students by highest scaled score (unique by user, get their best attempt)
    const topStudentsData = await prisma.examAttempt.groupBy({
      by: ["userId"],
      where: {
        status: "COMPLETED",
        scaledScore: {
          not: null,
        },
      },
      _max: {
        scaledScore: true,
      },
      orderBy: {
        _max: {
          scaledScore: "desc",
        },
      },
      take: 5,
    });

    const userIds = topStudentsData.map(s => s.userId);
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const userMap = new Map(users.map(u => [u.id, u.name]));

    const data = topStudentsData.map(result => ({
      id: result.userId,
      name: userMap.get(result.userId) || "Unknown User",
      score: result._max.scaledScore || 0,
      activity: "N/A",
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Top students API error:", error);
    return NextResponse.json({ error: "Gagal memuat daftar siswa terbaik" }, { status: 500 });
  }
}
