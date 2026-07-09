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
    const subtestPerformanceRaw = await prisma.subjectScore.findMany({
      select: {
        subjectId: true,
        scaledScore: true,
      },
    });

    const validScores = subtestPerformanceRaw.filter(item => item.scaledScore !== null);

    const groupedScores = validScores.reduce((acc, item) => {
      if (!acc[item.subjectId]) {
        acc[item.subjectId] = { sum: 0, count: 0 };
      }
      acc[item.subjectId].sum += item.scaledScore!;
      acc[item.subjectId].count++;
      return acc;
    }, {} as Record<string, { sum: number; count: number }>);

    // Fetch subject names to map subjectId to name
    const subjects = await prisma.subject.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const subjectMap = new Map(subjects.map(s => [s.id, s.name]));

    const data = Object.entries(groupedScores).map(([subjectId, { sum, count }]) => ({
      subtest: subjectMap.get(subjectId) || "Unknown",
      averageScore: count > 0 ? sum / count : 0,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Subtest performance API error:", error);
    return NextResponse.json({ error: "Gagal memuat performa subtes" }, { status: 500 });
  }
}
