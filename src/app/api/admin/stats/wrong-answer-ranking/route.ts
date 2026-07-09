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
    const wrongAnswers = await prisma.questionResponse.groupBy({
      by: ["questionId"],
      where: {
        isCorrect: false,
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
      take: 10,
    });

    const questionIds = wrongAnswers.map(wa => wa.questionId);
    const questions = await prisma.question.findMany({
      where: {
        id: {
          in: questionIds,
        },
      },
      select: {
        id: true,
        text: true,
      },
    });

    const questionMap = new Map(questions.map(q => [q.id, q.text]));

    const data = wrongAnswers.map(wa => ({
      questionId: wa.questionId,
      text: questionMap.get(wa.questionId) || "Unknown Question",
      wrongCount: wa._count.id,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Wrong answer ranking API error:", error);
    return NextResponse.json({ error: "Gagal memuat peringkat soal salah" }, { status: 500 });
  }
}
