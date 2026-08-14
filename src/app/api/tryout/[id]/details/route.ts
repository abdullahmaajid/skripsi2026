import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const template = await prisma.examTemplate.findUnique({
      where: { id },
      include: {
        sections: {
          orderBy: { order: 'asc' },
          include: {
            subject: true
          }
        }
      }
    })
    
    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }
    
    return NextResponse.json({ data: template })
  } catch (error) {
    console.error("Error fetching template details:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
