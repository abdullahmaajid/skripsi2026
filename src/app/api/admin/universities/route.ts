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
    const search = req.nextUrl.searchParams.get("search") || ""
    const universities = await prisma.university.findMany({
      where: search ? { name: { contains: search, mode: "insensitive" } } : {},
      include: { _count: { select: { majors: true } } },
      orderBy: { name: "asc" },
    })
    return NextResponse.json({ data: universities })
  } catch (error) {
    console.error("GET admin universities error:", error)
    return NextResponse.json({ error: "Gagal memuat PTN" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { name, code, location, type, logoUrl } = await req.json()
    if (!name || !code || !location) {
      return NextResponse.json({ error: "Nama, Kode, dan Lokasi wajib diisi" }, { status: 400 })
    }

    const existingCode = await prisma.university.findUnique({ where: { code } })
    if (existingCode) {
      return NextResponse.json({ error: "Kode Universitas sudah terdaftar" }, { status: 400 })
    }

    const university = await prisma.university.create({
      data: {
        name,
        code,
        location,
        type: type || "NEGERI",
        logoUrl: logoUrl || null,
      },
    })

    return NextResponse.json({ data: university }, { status: 201 })
  } catch (error) {
    console.error("POST university error:", error)
    return NextResponse.json({ error: "Gagal menambah universitas" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { id, name, code, location, type, logoUrl } = await req.json()
    if (!id || !name || !code || !location) {
      return NextResponse.json({ error: "ID, Nama, Kode, dan Lokasi wajib diisi" }, { status: 400 })
    }

    const existingCode = await prisma.university.findFirst({
      where: { code, NOT: { id } },
    })
    if (existingCode) {
      return NextResponse.json({ error: "Kode Universitas sudah digunakan universitas lain" }, { status: 400 })
    }

    const university = await prisma.university.update({
      where: { id },
      data: {
        name,
        code,
        location,
        type: type || "NEGERI",
        logoUrl: logoUrl || null,
      },
    })

    return NextResponse.json({ data: university })
  } catch (error) {
    console.error("PUT university error:", error)
    return NextResponse.json({ error: "Gagal memperbarui universitas" }, { status: 500 })
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

    await prisma.university.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE university error:", error)
    return NextResponse.json({ error: "Gagal menghapus universitas" }, { status: 500 })
  }
}
