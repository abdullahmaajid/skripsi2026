import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const { templateId } = await req.json();
    if (!templateId) {
      return NextResponse.json(
        { success: false, error: "templateId wajib." },
        { status: 400 },
      );
    }

    // Get userId from auth session, fallback to body for backward compatibility
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Login diperlukan untuk memulai ujian." },
        { status: 401 },
      );
    }

    const template = await prisma.examTemplate.findUnique({
      where: { id: templateId },
      include: {
        sections: { include: { subject: true }, orderBy: { order: "asc" } },
      },
    });
    if (!template) {
      return NextResponse.json(
        { success: false, error: "Template tidak ditemukan." },
        { status: 404 },
      );
    }

    let allQuestions: any[] = [];

    if (template.sections.length > 0) {
      // Fetch all chapter IDs for all sections in PARALLEL
      const sectionChapters = await Promise.all(
        template.sections.map(section =>
          prisma.chapter.findMany({
            where: { subjectId: section.subjectId },
            select: { id: true, subjectId: true },
          })
        )
      );

      // Fetch questions for all sections in PARALLEL
      const sectionQuestionSets = await Promise.all(
        template.sections.map((section, i) => {
          const chapterIds = sectionChapters[i].map(c => c.id);
          return prisma.question.findMany({
            where: { chapterId: { in: chapterIds } },
            take: section.itemCount,
            include: { options: true, chapter: { include: { subject: true } } },
            orderBy: { difficulty: "asc" },
          });
        })
      );

      allQuestions = sectionQuestionSets.flat();
    } else {
      // Fallback: grab random questions if no sections defined
      allQuestions = await prisma.question.findMany({
        take: template.totalItems > 0 ? Math.min(template.totalItems, 50) : 10,
        include: { options: true, chapter: { include: { subject: true } } },
        orderBy: { difficulty: "asc" },
      });
    }

    if (allQuestions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Tidak ada soal tersedia untuk template ini.",
        },
        { status: 400 },
      );
    }

    const attempt = await prisma.examAttempt.create({
      data: { userId, templateId, status: "IN_PROGRESS" },
    });

    return NextResponse.json({
      success: true,
      data: {
        attemptId: attempt.id,
        duration: template.duration,
        isAdaptive: false,
        totalItems: template.totalItems,
        sections: template.sections.map(s => ({
          subjectName: s.subject.name,
          duration: s.duration,
          itemCount: s.itemCount,
        })),
        questions: allQuestions.map((q) => ({
          id: q.id,
          text: q.text,
          type: q.type,
          difficulty: q.difficulty,
          subject: q.chapter.subject.name,
          options: q.options.map((o: any) => ({
            id: o.id,
            label: o.label,
            text: o.text,
          })),
        })),
      },
    });


  } catch (error) {
    console.error("Tryout start error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memulai ujian." },
      { status: 500 },
    );
  }
}
