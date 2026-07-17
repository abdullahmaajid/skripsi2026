import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET() {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        profile: {
          select: {
            id: true,
            userId: true,
            targetMajor1Id: true,
            targetMajor2Id: true,
            school: true,
            graduationYear: true,
            targetMajor1: { select: { id: true, name: true, estimatedScore: true, cluster: true, universityId: true, university: { select: { name: true, id: true } } } },
            targetMajor2: { select: { id: true, name: true, estimatedScore: true, cluster: true, universityId: true, university: { select: { name: true, id: true } } } }
          }
        }
      }
    })

    const universities = await prisma.university.findMany({
      select: {
        id: true,
        name: true,
        majors: {
          select: { id: true, name: true, cluster: true },
          orderBy: { name: 'asc' }
        }
      },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json({
      profile: user?.profile,
      user: {
        name: user?.name,
        email: user?.email,
        role: user?.role,
        avatar: user?.avatar
      },
      universities
    })
  } catch (error) {
    console.error("Profile API error:", error)
    return NextResponse.json({ error: "Gagal memuat profil" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const { targetMajor1Id, targetMajor2Id, school, graduationYear, name, avatar } = data

    // Update user name and avatar if provided
    if (name || avatar !== undefined) {
      const updateData: any = {}
      if (name) updateData.name = name
      if (avatar !== undefined) updateData.avatar = avatar

      await prisma.user.update({
        where: { id: userId },
        data: updateData
      })
    }

    // Upsert student profile
    const profile = await prisma.studentProfile.upsert({
      where: { userId },
      update: {
        targetMajor1Id,
        targetMajor2Id,
        school,
        graduationYear: graduationYear ? parseInt(graduationYear) : null
      },
      create: {
        userId,
        targetMajor1Id,
        targetMajor2Id,
        school,
        graduationYear: graduationYear ? parseInt(graduationYear) : null
      }
    })

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Gagal menyimpan profil" }, { status: 500 })
  }
}
