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
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    // Fetch all users created in the last 30 days
    const recentUsers = await prisma.user.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    // Fetch all exam attempts in the last 30 days (as a proxy for "active sessions")
    const recentAttempts = await prisma.examAttempt.findMany({
      where: { startedAt: { gte: thirtyDaysAgo } },
      select: { startedAt: true },
      orderBy: { startedAt: "asc" },
    });

    // Build a map of date -> { registrations, activeSessions }
    const dayMap: Record<string, { registrations: number; activeSessions: number }> = {};

    // Seed the last 30 days so chart always shows a continuous range
    for (let i = 0; i < 30; i++) {
      const d = new Date(thirtyDaysAgo);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().split("T")[0];
      dayMap[key] = { registrations: 0, activeSessions: 0 };
    }

    for (const u of recentUsers) {
      const key = u.createdAt.toISOString().split("T")[0];
      if (dayMap[key]) dayMap[key].registrations++;
    }

    for (const a of recentAttempts) {
      const key = a.startedAt.toISOString().split("T")[0];
      if (dayMap[key]) dayMap[key].activeSessions++;
    }

    const data = Object.entries(dayMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, vals]) => ({
        date: date.slice(5), // "MM-DD" format for cleaner chart labels
        registrations: vals.registrations,
        activeSessions: vals.activeSessions,
      }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("User activity trend API error:", error);
    return NextResponse.json({ error: "Gagal memuat tren aktivitas pengguna" }, { status: 500 });
  }
}
