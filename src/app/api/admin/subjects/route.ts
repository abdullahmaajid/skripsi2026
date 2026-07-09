import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

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
    const subjects = await prisma.subject.findMany({
      include: {
        _count: {
          select: { chapters: true }
        }
      },
      orderBy: { name: "asc" }
    })
    return NextResponse.json({ data: subjects })
  } catch (error) {
    console.error("GET subjects error:", error)
    return NextResponse.json({ error: "Gagal memuat mata pelajaran" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { name, cluster } = await req.json()
    if (!name || !cluster) {
      return NextResponse.json({ error: "Nama dan Kluster wajib diisi" }, { status: 400 })
    }

    const subject = await prisma.subject.create({
      data: { name, cluster }
    })

    return NextResponse.json({ data: subject }, { status: 201 })
  } catch (error) {
    console.error("POST subject error:", error)
    return NextResponse.json({ error: "Gagal menambah mata pelajaran" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { id, name, cluster } = await req.json()
    if (!id || !name || !cluster) {
      return NextResponse.json({ error: "ID, Nama, dan Kluster wajib diisi" }, { status: 400 })
    }

    const subject = await prisma.subject.update({
      where: { id },
      data: { name, cluster }
    })

    return NextResponse.json({ data: subject })
  } catch (error) {
    console.error("PUT subject error:", error)
    return NextResponse.json({ error: "Gagal memperbarui mata pelajaran" }, { status: 500 })
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

    await prisma.subject.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE subject error:", error)
    return NextResponse.json({ error: "Gagal menghapus mata pelajaran" }, { status: 500 })
  }
}
