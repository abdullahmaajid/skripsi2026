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
    const scoreRanges = [
      { min: 200, max: 300, label: "200-300" },
      { min: 301, max: 400, label: "301-400" },
      { min: 401, max: 500, label: "401-500" },
      { min: 501, max: 600, label: "501-600" },
      { min: 601, max: 700, label: "601-700" },
      { min: 701, max: 800, label: "701-800" },
    ];

    // Use SubjectScore for more granular distribution (per subtes scores)
    const subjectScores = await prisma.subjectScore.findMany({
      select: { scaledScore: true },
    });

    // Also pull ExamAttempt-level scaledScore as fallback
    const attemptScores = await prisma.examAttempt.findMany({
      where: { status: "COMPLETED", scaledScore: { not: null } },
      select: { scaledScore: true },
    });

    // Combine all scores
    const allScores = [
      ...subjectScores.map(s => s.scaledScore),
      ...attemptScores.map(a => a.scaledScore!),
    ];

    const distribution = scoreRanges.map(range => {
      const count = allScores.filter(score => score >= range.min && score <= range.max).length;
      return { scoreRange: range.label, count };
    });

    return NextResponse.json({ data: distribution });
  } catch (error) {
    console.error("Score distribution API error:", error);
    return NextResponse.json({ error: "Gagal memuat distribusi skor" }, { status: 500 });
  }
}
