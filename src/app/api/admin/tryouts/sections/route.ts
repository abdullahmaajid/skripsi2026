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

export async function GET(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const templateId = req.nextUrl.searchParams.get("templateId")
    if (!templateId) {
      return NextResponse.json({ error: "templateId wajib diisi" }, { status: 400 })
    }

    const sections = await prisma.examSection.findMany({
      where: { templateId },
      include: { subject: { select: { name: true } } },
      orderBy: { order: "asc" },
    })

    return NextResponse.json({ data: sections })
  } catch (error) {
    console.error("GET tryout sections error:", error)
    return NextResponse.json({ error: "Gagal memuat subtes" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { templateId, subjectId, itemCount, order, duration } = await req.json()
    if (!templateId || !subjectId || itemCount === undefined || order === undefined || duration === undefined) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 })
    }

    const section = await prisma.examSection.create({
      data: {
        templateId,
        subjectId,
        itemCount: parseInt(itemCount),
        order: parseInt(order),
        duration: parseInt(duration),
      },
      include: { subject: { select: { name: true } } },
    })

    return NextResponse.json({ data: section }, { status: 201 })
  } catch (error) {
    console.error("POST tryout section error:", error)
    return NextResponse.json({ error: "Gagal menambah subtes" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { id, subjectId, itemCount, order, duration } = await req.json()
    if (!id || !subjectId || itemCount === undefined || order === undefined || duration === undefined) {
      return NextResponse.json({ error: "ID, mapel, jumlah soal, urutan, dan durasi wajib diisi" }, { status: 400 })
    }

    const section = await prisma.examSection.update({
      where: { id },
      data: {
        subjectId,
        itemCount: parseInt(itemCount),
        order: parseInt(order),
        duration: parseInt(duration),
      },
      include: { subject: { select: { name: true } } },
    })

    return NextResponse.json({ data: section })
  } catch (error) {
    console.error("PUT tryout section error:", error)
    return NextResponse.json({ error: "Gagal memperbarui subtes" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const id = req.nextUrl.searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 })
    }

    await prisma.examSection.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE tryout section error:", error)
    return NextResponse.json({ error: "Gagal menghapus subtes" }, { status: 500 })
  }
}
