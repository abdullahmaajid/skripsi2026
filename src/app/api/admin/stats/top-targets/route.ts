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
    const profiles = await prisma.studentProfile.findMany({
      select: {
        targetMajor1: { select: { name: true, university: { select: { name: true } } } },
        targetMajor2: { select: { name: true, university: { select: { name: true } } } }
      }
    });

    const uniCounts: Record<string, number> = {};
    const majorCounts: Record<string, number> = {};

    profiles.forEach(p => {
      const targets = [p.targetMajor1, p.targetMajor2].filter(Boolean);
      targets.forEach(t => {
        if (!t) return;
        const uni = t.university.name;
        const major = `${t.name} - ${uni}`;
        
        uniCounts[uni] = (uniCounts[uni] || 0) + 1;
        majorCounts[major] = (majorCounts[major] || 0) + 1;
      });
    });

    const topUniversities = Object.entries(uniCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topMajors = Object.entries(majorCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return NextResponse.json({ data: { topUniversities, topMajors } });
  } catch (error) {
    console.error("Top targets API error:", error);
    return NextResponse.json({ error: "Gagal memuat data target" }, { status: 500 });
  }
}
