import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) return "UNAUTHENTICATED";
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  if (user?.role !== "ADMIN") return "FORBIDDEN";
  return null;
}

export async function GET(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const url = new URL(req.url);
    const universityId = url.searchParams.get("universityId") || undefined;
    const majorId = url.searchParams.get("majorId") || undefined;

    // Build the user relation filter conditionally
    const userFilter: any = {};
    if (universityId || majorId) {
      userFilter.profile = {
        targetMajor1: {
          ...(universityId ? { universityId } : {}),
          ...(majorId ? { id: majorId } : {}),
        }
      };
    }

    // Fetch top students by highest scaled score (unique by user, get their best attempt)
    const topStudentsData = await prisma.examAttempt.groupBy({
      by: ["userId"],
      where: {
        status: "COMPLETED",
        scaledScore: {
          not: null,
        },
        ...(Object.keys(userFilter).length > 0 ? { user: userFilter } : {})
      },
      _max: {
        scaledScore: true,
      },
      orderBy: {
        _max: {
          scaledScore: "desc",
        },
      },
      take: 10, // Increased to 10 for better leaderboard filter view
    });

    const userIds = topStudentsData.map(s => s.userId);
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        name: true,
        profile: {
          select: {
            targetMajor1: {
              select: {
                name: true,
                university: { select: { name: true } }
              }
            }
          }
        }
      },
    });

    const userMap = new Map(users.map(u => [u.id, u]));

    const data = topStudentsData.map(result => {
      const user = userMap.get(result.userId);
      const target = user?.profile?.targetMajor1;
      return {
        id: result.userId,
        name: user?.name || "Unknown User",
        score: result._max.scaledScore || 0,
        activity: "N/A",
        targetMajor: target ? target.name : null,
        targetUni: target ? target.university.name : null,
      };
    });

    // Sort again manually because group by order can sometimes be quirky in prisma
    data.sort((a, b) => b.score - a.score);

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Top students API error:", error);
    return NextResponse.json({ error: "Gagal memuat daftar siswa terbaik" }, { status: 500 });
  }
}
