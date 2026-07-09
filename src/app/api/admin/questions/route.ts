import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

// ─── Admin guard ─────────────────────────────────────────────────────────────
async function requireAdmin() {
  const session = await auth()
  if (!session?.user?.id) return "UNAUTHENTICATED"
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } })
  if (user?.role !== "ADMIN") return "FORBIDDEN"
  return null
}

export async function GET() {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const questions = await prisma.question.findMany({
      include: { options: true, chapter: { include: { subject: true } } },
      orderBy: { chapter: { subject: { name: "asc" } } },
    })
    return NextResponse.json({ data: questions })
  } catch (error) {
    console.error("GET questions error:", error)
    return NextResponse.json({ error: "Gagal memuat soal" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { chapterId, text, difficulty, type, options, imageUrl } = await req.json()
    if (!chapterId || !text || !options?.length) {
      return NextResponse.json({ error: "Data tidak lengkap." }, { status: 400 })
    }

    const question = await prisma.question.create({
      data: {
        chapterId,
        text,
        difficulty: parseFloat(difficulty) || 0.0,
        type: type || "MULTIPLE_CHOICE",
        imageUrl: imageUrl || null,
        options: {
          create: options.map((o: any) => ({
            label: o.label,
            text: o.text,
            isCorrect: !!o.isCorrect,
            imageUrl: o.imageUrl || null,
          })),
        },
      },
      include: { options: true },
    })
    return NextResponse.json({ data: question }, { status: 201 })
  } catch (error) {
    console.error("POST question error:", error)
    return NextResponse.json({ error: "Gagal menambah soal." }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { id, chapterId, text, difficulty, type, options, imageUrl } = await req.json()
    if (!id || !chapterId || !text || !options?.length) {
      return NextResponse.json({ error: "Data tidak lengkap." }, { status: 400 })
    }

    const updatedQuestion = await prisma.$transaction(async (tx) => {
      // 1. Update the main question attributes
      const q = await tx.question.update({
        where: { id },
        data: {
          chapterId,
          text,
          difficulty: parseFloat(difficulty) || 0.0,
          type: type || "MULTIPLE_CHOICE",
          imageUrl: imageUrl || null,
        },
      })

      // 2. Load existing options
      const existingOptions = await tx.questionOption.findMany({
        where: { questionId: id },
      })

      // 3. Find options to delete (present in DB but not in request payload)
      const inputOptionIds = options.filter((o: any) => o.id).map((o: any) => o.id)
      const optionsToDelete = existingOptions.filter((o) => !inputOptionIds.includes(o.id))

      if (optionsToDelete.length > 0) {
        await tx.questionOption.deleteMany({
          where: { id: { in: optionsToDelete.map((o) => o.id) } },
        })
      }

      // 4. Update or create current options
      for (const o of options) {
        if (o.id) {
          await tx.questionOption.update({
            where: { id: o.id },
            data: {
              label: o.label,
              text: o.text,
              isCorrect: !!o.isCorrect,
              imageUrl: o.imageUrl || null,
            },
          })
        } else {
          await tx.questionOption.create({
            data: {
              questionId: id,
              label: o.label,
              text: o.text,
              isCorrect: !!o.isCorrect,
              imageUrl: o.imageUrl || null,
            },
          })
        }
      }

      return tx.question.findUnique({
        where: { id },
        include: { options: true, chapter: { include: { subject: true } } },
      })
    })

    return NextResponse.json({ data: updatedQuestion })
  } catch (error) {
    console.error("PUT question error:", error)
    return NextResponse.json({ error: "Gagal memperbarui soal." }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const id = req.nextUrl.searchParams.get("id")
  if (!id) return NextResponse.json({ error: "ID wajib." }, { status: 400 })
  
  try {
    await prisma.question.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE question error:", error)
    return NextResponse.json({ error: "Gagal menghapus soal." }, { status: 500 })
  }
}
