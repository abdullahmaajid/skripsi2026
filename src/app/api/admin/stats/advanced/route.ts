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
    // 1. Passing Probability
    const profiles = await prisma.studentProfile.findMany({
      where: { targetMajor1Id: { not: null } },
      include: {
        user: {
          include: {
            attempts: {
              where: { status: "COMPLETED", scaledScore: { not: null } },
              orderBy: { scaledScore: "desc" },
              take: 1
            }
          }
        },
        targetMajor1: true
      }
    });

    let passedCount = 0;
    let totalTargeted = 0;
    profiles.forEach(p => {
      if (p.targetMajor1 && p.targetMajor1.estimatedScore) {
        totalTargeted++;
        const bestScore = p.user.attempts[0]?.scaledScore || 0;
        if (bestScore >= p.targetMajor1.estimatedScore) {
          passedCount++;
        }
      }
    });
    const passingProbability = totalTargeted > 0 ? (passedCount / totalTargeted) * 100 : 0;

    // 2. Time Management
    const completedAttempts = await prisma.examAttempt.findMany({
      where: { status: "COMPLETED", finishedAt: { not: null } },
      select: { startedAt: true, finishedAt: true }
    });
    
    let totalSeconds = 0;
    completedAttempts.forEach(a => {
      if (a.finishedAt) {
        totalSeconds += Math.floor((a.finishedAt.getTime() - a.startedAt.getTime()) / 1000);
      }
    });
    const averageDurationMinutes = completedAttempts.length > 0 ? (totalSeconds / completedAttempts.length) / 60 : 0;

    // 3. IRT Stats
    const questions = await prisma.question.findMany({
      select: { difficulty: true }
    });
    let mudah = 0, sedang = 0, sulit = 0;
    questions.forEach(q => {
      if (q.difficulty < -1.0) mudah++;
      else if (q.difficulty > 1.0) sulit++;
      else sedang++;
    });

    // 4. Completion Rate
    const attempts = await prisma.examAttempt.groupBy({
      by: ['status'],
      _count: { _all: true }
    });
    
    let completed = 0, abandoned = 0, inProgress = 0, timedOut = 0;
    attempts.forEach(a => {
      if (a.status === "COMPLETED") completed = a._count._all;
      if (a.status === "ABANDONED") abandoned = a._count._all;
      if (a.status === "IN_PROGRESS") inProgress = a._count._all;
      if (a.status === "TIMED_OUT") timedOut = a._count._all;
    });
    
    const totalAttempts = completed + abandoned + inProgress + timedOut;
    const completionRate = totalAttempts > 0 ? (completed / totalAttempts) * 100 : 0;

    return NextResponse.json({
      data: {
        passingProbability,
        timeManagement: {
          averageDurationMinutes,
        },
        irtStats: {
          mudah, sedang, sulit
        },
        completionRate: {
          completed, abandoned, inProgress, timedOut, rate: completionRate
        }
      }
    });

  } catch (error) {
    console.error("Advanced analytics API error:", error);
    return NextResponse.json({ error: "Gagal memuat analitik lanjutan" }, { status: 500 });
  }
}
