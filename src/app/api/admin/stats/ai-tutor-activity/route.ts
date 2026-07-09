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
    const aiTutorActivity = await prisma.tutoringSession.groupBy({
      by: ["level"],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
    });

    const data = aiTutorActivity.map(item => ({
      level: item.level,
      count: item._count.id,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("AI Tutor activity API error:", error);
    return NextResponse.json({ error: "Gagal memuat aktivitas AI Tutor" }, { status: 500 });
  }
}
