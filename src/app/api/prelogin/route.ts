import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password diperlukan" }, { status: 400 })
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Format email tidak valid." }, { status: 400 })
    }
    
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      return NextResponse.json({ error: "Email atau password salah" }, { status: 401 })
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ error: "Email atau password salah" }, { status: 401 })
    }
    
    return NextResponse.json({ 
      success: true, 
      role: user.role,
      redirect: user.role === "ADMIN" ? "/admin" : "/dashboard"
    })
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
  }
}