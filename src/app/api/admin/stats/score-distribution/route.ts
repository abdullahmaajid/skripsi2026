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

    const completedAttempts = await prisma.examAttempt.findMany({
      where: {
        status: "COMPLETED",
        scaledScore: {
          not: null,
        },
      },
      select: {
        scaledScore: true,
      },
    });

    const distribution = scoreRanges.map(range => {
      const count = completedAttempts.filter(attempt => {
        const score = attempt.scaledScore || 0; // Fallback for null scores
        return score >= range.min && score <= range.max;
      }).length;
      return { scoreRange: range.label, count };
    });

    return NextResponse.json({ data: distribution });
  } catch (error) {
    console.error("Score distribution API error:", error);
    return NextResponse.json({ error: "Gagal memuat distribusi skor" }, { status: 500 });
  }
}
