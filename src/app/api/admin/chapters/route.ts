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
    const chapters = await prisma.chapter.findMany({
      include: { subject: { select: { name: true } } },
      orderBy: [{ subject: { name: "asc" } }, { order: "asc" }],
    })
    return NextResponse.json({ data: chapters })
  } catch (error) {
    console.error("GET chapters error:", error)
    return NextResponse.json({ error: "Gagal memuat bab" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { name, subjectId, order, theorySummary } = await req.json()
    if (!name || !subjectId) {
      return NextResponse.json({ error: "Nama dan Mata Pelajaran wajib diisi" }, { status: 400 })
    }

    const chapter = await prisma.chapter.create({
      data: {
        name,
        subjectId,
        order: order !== undefined ? parseInt(order) : 0,
        theorySummary: theorySummary || null,
      },
      include: { subject: { select: { name: true } } },
    })

    return NextResponse.json({ data: chapter }, { status: 201 })
  } catch (error) {
    console.error("POST chapter error:", error)
    return NextResponse.json({ error: "Gagal menambah bab" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { id, name, subjectId, order, theorySummary } = await req.json()
    if (!id || !name || !subjectId) {
      return NextResponse.json({ error: "ID, Nama, dan Mata Pelajaran wajib diisi" }, { status: 400 })
    }

    const chapter = await prisma.chapter.update({
      where: { id },
      data: {
        name,
        subjectId,
        order: order !== undefined ? parseInt(order) : 0,
        theorySummary: theorySummary || null,
      },
      include: { subject: { select: { name: true } } },
    })

    return NextResponse.json({ data: chapter })
  } catch (error) {
    console.error("PUT chapter error:", error)
    return NextResponse.json({ error: "Gagal memperbarui bab" }, { status: 500 })
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

    await prisma.chapter.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE chapter error:", error)
    return NextResponse.json({ error: "Gagal menghapus bab" }, { status: 500 })
  }
}
