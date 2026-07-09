import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    // Check if user already completed a diagnostic test
    const existingAttempt = await prisma.examAttempt.findFirst({
      where: {
        userId: session.user.id,
        template: {
          is: { isDiagnostic: true },
        },
        status: "COMPLETED",
      },
    });

    if (existingAttempt) {
      return NextResponse.json({
        success: true,
        data: {
          message: "Already completed",
          attemptId: existingAttempt.id,
        },
      });
    }

    // Find the diagnostic template
    let diagnosticTemplate = await prisma.examTemplate.findFirst({
      where: { isDiagnostic: true },
    });

    // Create one if it doesn't exist
    if (!diagnosticTemplate) {
      const subjects = await prisma.subject.findMany();

      diagnosticTemplate = await prisma.examTemplate.create({
        data: {
          name: "Uji Diagnostik Awal",
          description:
            "Tes penempatan untuk mengukur kemampuan awalmu di semua mata pelajaran.",
          duration: 30,
          totalItems: subjects.length > 0 ? subjects.length * 5 : 15, // 5 items per subject
          cluster: "CAMPURAN",
          isAdaptive: false,
          isDiagnostic: true,
          sections: {
            create: subjects.map((subject, index) => ({
              subjectId: subject.id,
              itemCount: 5,
              order: index + 1,
            })),
          },
        },
      });
    }

    const response = NextResponse.json({
      success: true,
      data: { templateId: diagnosticTemplate.id },
    });
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  } catch (error) {
    console.error("Diagnostic endpoint error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to initialize diagnostic test" },
      { status: 500 },
    );
  }
}
