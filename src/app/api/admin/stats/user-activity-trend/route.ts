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
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Fetch user registrations grouped by day
    const registrationsByDay = await prisma.user.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const data = registrationsByDay.map(item => ({
      date: item.createdAt.toISOString().split("T")[0],
      registrations: item._count.id,
      activeSessions: 0, // Placeholder until lastActivityAt issue is resolved
    }));

    // TODO: Implement active sessions logic once lastActivityAt is resolved

    return NextResponse.json({ data });
  } catch (error) {
    console.error("User activity trend API error:", error);
    return NextResponse.json({ error: "Gagal memuat tren aktivitas pengguna" }, { status: 500 });
  }
}
