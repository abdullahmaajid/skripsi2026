import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { school, graduationYear, targetMajor1Id, targetMajor2Id, aiStyle, aiEnergy } = await req.json()

    await prisma.studentProfile.upsert({
      where: { userId: session.user.id },
      update: { 
        school, 
        graduationYear, 
        targetMajor1Id: targetMajor1Id || null, 
        targetMajor2Id: targetMajor2Id || null,
        ...(aiStyle && { aiStyle }),
        ...(aiEnergy && { aiEnergy })
      },
      create: { 
        userId: session.user.id, 
        school, 
        graduationYear, 
        targetMajor1Id: targetMajor1Id || null, 
        targetMajor2Id: targetMajor2Id || null,
        aiStyle: aiStyle || "default",
        aiEnergy: aiEnergy || "default"
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Onboarding error:", error)
    return NextResponse.json({ error: "Gagal menyimpan profil." }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { targetMajor2Id } = await req.json()

    await prisma.studentProfile.update({
      where: { userId: session.user.id },
      data: { targetMajor2Id: targetMajor2Id || null },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Onboarding patch error:", error)
    return NextResponse.json({ error: "Gagal memperbarui profil." }, { status: 500 })
  }
}
