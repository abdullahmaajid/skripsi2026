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
    const templates = await prisma.examTemplate.findMany({
      include: {
        sections: {
          include: { subject: { select: { name: true } } },
          orderBy: { order: "asc" },
        },
        _count: { select: { attempts: true } },
      },
      orderBy: { name: "asc" },
    })
    return NextResponse.json({ data: templates })
  } catch (error) {
    console.error("GET tryouts error:", error)
    return NextResponse.json({ error: "Gagal memuat tryout" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { name, description, duration, totalItems, cluster, isDiagnostic } = await req.json()
    if (!name || duration === undefined || totalItems === undefined) {
      return NextResponse.json({ error: "Nama, durasi, dan jumlah soal wajib diisi" }, { status: 400 })
    }

    const template = await prisma.examTemplate.create({
      data: {
        name,
        description: description || null,
        duration: parseInt(duration),
        totalItems: parseInt(totalItems),
        cluster: cluster || "CAMPURAN",
        isDiagnostic: !!isDiagnostic,
        isAdaptive: false, // Deprecated: always false.
      },
    })

    return NextResponse.json({ data: template }, { status: 201 })
  } catch (error) {
    console.error("POST tryout error:", error)
    return NextResponse.json({ error: "Gagal menambah tryout" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { id, name, description, duration, totalItems, cluster, isDiagnostic } = await req.json()
    if (!id || !name || duration === undefined || totalItems === undefined) {
      return NextResponse.json({ error: "ID, Nama, durasi, dan jumlah soal wajib diisi" }, { status: 400 })
    }

    const template = await prisma.examTemplate.update({
      where: { id },
      data: {
        name,
        description: description || null,
        duration: parseInt(duration),
        totalItems: parseInt(totalItems),
        cluster: cluster || "CAMPURAN",
        isDiagnostic: !!isDiagnostic,
      },
    })

    return NextResponse.json({ data: template })
  } catch (error) {
    console.error("PUT tryout error:", error)
    return NextResponse.json({ error: "Gagal memperbarui tryout" }, { status: 500 })
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

    await prisma.examTemplate.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE tryout error:", error)
    return NextResponse.json({ error: "Gagal menghapus tryout" }, { status: 500 })
  }
}
