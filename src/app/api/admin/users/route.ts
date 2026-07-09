import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import bcrypt from "bcryptjs"

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
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        irtAbility: true,
        createdAt: true,
        _count: { select: { attempts: true } },
      },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ data: users })
  } catch (error) {
    console.error("GET users error:", error)
    return NextResponse.json({ error: "Gagal memuat pengguna" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { name, email, password, role } = await req.json()
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 })
    }

    // Check unique email
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        profile: role === "STUDENT" ? { create: {} } : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        irtAbility: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ data: user }, { status: 201 })
  } catch (error) {
    console.error("POST user error:", error)
    return NextResponse.json({ error: "Gagal membuat pengguna baru" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const deny = await requireAdmin()
  if (deny === "UNAUTHENTICATED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (deny === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  try {
    const { id, name, email, password, role, irtAbility } = await req.json()
    if (!id || !name || !email || !role) {
      return NextResponse.json({ error: "ID, Nama, Email, dan Role wajib diisi" }, { status: 400 })
    }

    // Check unique email (exclude current user)
    const existing = await prisma.user.findFirst({
      where: { email, NOT: { id } },
    })
    if (existing) {
      return NextResponse.json({ error: "Email sudah digunakan pengguna lain" }, { status: 400 })
    }

    const data: any = {
      name,
      email,
      role,
      irtAbility: irtAbility !== undefined ? parseFloat(irtAbility) : 0.0,
    }

    if (password) {
      data.password = await bcrypt.hash(password, 10)
    }

    // If role changed from ADMIN to STUDENT, ensure they have a profile
    if (role === "STUDENT") {
      const existingProfile = await prisma.studentProfile.findUnique({ where: { userId: id } })
      if (!existingProfile) {
        data.profile = { create: {} }
      }
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        irtAbility: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ data: user })
  } catch (error) {
    console.error("PUT user error:", error)
    return NextResponse.json({ error: "Gagal memperbarui pengguna" }, { status: 500 })
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

    // Check if trying to delete self
    const session = await auth()
    if (session?.user?.id === id) {
      return NextResponse.json({ error: "Tidak dapat menghapus akun Anda sendiri" }, { status: 400 })
    }

    await prisma.user.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE user error:", error)
    return NextResponse.json({ error: "Gagal menghapus pengguna" }, { status: 500 })
  }
}
