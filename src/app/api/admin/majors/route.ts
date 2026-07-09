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
    const universityId = req.nextUrl.searchParams.get("universityId") || ""
    const search = req.nextUrl.searchParams.get("search") || ""

    const where: any = {}
    if (universityId) {
      where.universityId = universityId
    }
    if (search) {
      where.name = { contains: search, mode: "insensitive" }
    }

    const majors = await prisma.major.findMany({
      where,
      include: { university: { select: { name: true } } },
      orderBy: [{ name: "asc" }],
    })

    return NextResponse.json({ data: majors })
  } catch (error) {
    console.error("GET admin majors error:", error)
    return NextResponse.json({ error: "Gagal memuat prodi" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { name, code, universityId, faculty, degree, quota, applicants, estimatedScore, cluster, year } = await req.json()
    if (!name || !code || !universityId || !faculty) {
      return NextResponse.json({ error: "Nama, Kode, Universitas, dan Fakultas wajib diisi" }, { status: 400 })
    }

    const existingCode = await prisma.major.findUnique({ where: { code } })
    if (existingCode) {
      return NextResponse.json({ error: "Kode Jurusan sudah terdaftar" }, { status: 400 })
    }

    const major = await prisma.major.create({
      data: {
        name,
        code,
        universityId,
        faculty,
        degree: degree || "S1",
        quota: quota !== undefined ? parseInt(quota) : 0,
        applicants: applicants !== undefined ? parseInt(applicants) : 0,
        estimatedScore: estimatedScore !== undefined ? parseFloat(estimatedScore) : 500,
        cluster: cluster || "SAINTEK",
        year: year !== undefined ? parseInt(year) : 2025,
      },
    })

    return NextResponse.json({ data: major }, { status: 201 })
  } catch (error) {
    console.error("POST major error:", error)
    return NextResponse.json({ error: "Gagal menambah prodi" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { id, name, code, universityId, faculty, degree, quota, applicants, estimatedScore, cluster, year } = await req.json()
    if (!id || !name || !code || !universityId || !faculty) {
      return NextResponse.json({ error: "ID, Nama, Kode, Universitas, dan Fakultas wajib diisi" }, { status: 400 })
    }

    const existingCode = await prisma.major.findFirst({
      where: { code, NOT: { id } },
    })
    if (existingCode) {
      return NextResponse.json({ error: "Kode Jurusan sudah digunakan prodi lain" }, { status: 400 })
    }

    const major = await prisma.major.update({
      where: { id },
      data: {
        name,
        code,
        universityId,
        faculty,
        degree: degree || "S1",
        quota: quota !== undefined ? parseInt(quota) : 0,
        applicants: applicants !== undefined ? parseInt(applicants) : 0,
        estimatedScore: estimatedScore !== undefined ? parseFloat(estimatedScore) : 500,
        cluster: cluster || "SAINTEK",
        year: year !== undefined ? parseInt(year) : 2025,
      },
    })

    return NextResponse.json({ data: major })
  } catch (error) {
    console.error("PUT major error:", error)
    return NextResponse.json({ error: "Gagal memperbarui prodi" }, { status: 500 })
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

    await prisma.major.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE major error:", error)
    return NextResponse.json({ error: "Gagal menghapus prodi" }, { status: 500 })
  }
}
