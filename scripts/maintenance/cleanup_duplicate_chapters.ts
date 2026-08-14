import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import 'dotenv/config'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Menghapus Bab (Chapters) yang terduplikasi di database...")

  const subjects = await prisma.subject.findMany()

  let totalDeleted = 0

  for (const subject of subjects) {
    const chapters = await prisma.chapter.findMany({
      where: { subjectId: subject.id },
      orderBy: { order: 'asc' }
    })

    const groupedByName: Record<string, typeof chapters> = {}
    for (const chap of chapters) {
      if (!groupedByName[chap.name]) groupedByName[chap.name] = []
      groupedByName[chap.name].push(chap)
    }

    for (const [name, duplicates] of Object.entries(groupedByName)) {
      if (duplicates.length > 1) {
        const keep = duplicates[0]
        const toDeleteIds = duplicates.slice(1).map(d => d.id)

        console.log(`- Memperbaiki Bab "${name}" (${duplicates.length} terduplikat)`)

        await prisma.question.updateMany({
          where: { chapterId: { in: toDeleteIds } },
          data: { chapterId: keep.id }
        })

        await prisma.chapterProgress.deleteMany({
          where: { chapterId: { in: toDeleteIds } }
        })

        await prisma.chapter.deleteMany({
          where: { id: { in: toDeleteIds } }
        })

        totalDeleted += toDeleteIds.length
      }
    }
  }

  console.log(`✅ Selesai! Berhasil menghapus ${totalDeleted} bab yang terduplikat.`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
