import { prisma } from '../../src/lib/prisma'

async function main() {
  console.log('🚀 Memulai proses pemetaan ulang (redistribusi) bab soal...')

  const subjects = await prisma.subject.findMany({
    include: {
      chapters: {
        orderBy: { order: 'asc' }
      }
    }
  })

  let totalMoved = 0
  let deletedSemuaMateri = 0

  for (const subject of subjects) {
    // Cari bab "Semua Materi"
    const semuaMateri = subject.chapters.find(c => c.name.toLowerCase() === 'semua materi')
    
    // Cari bab-bab yang sah (bukan "Semua Materi")
    const validChapters = subject.chapters.filter(c => c.name.toLowerCase() !== 'semua materi')

    if (validChapters.length === 0) {
      console.log(`⏩ Lewati ${subject.name}: Tidak ada bab spesifik, hanya "Semua Materi" atau kosong.`)
      continue
    }

    // Ambil semua soal dari subject ini (dari bab manapun)
    const questions = await prisma.question.findMany({
      where: {
        chapter: { subjectId: subject.id }
      },
      select: { id: true }
    })

    if (questions.length === 0) {
      console.log(`⏩ Lewati ${subject.name}: Tidak ada soal.`)
      continue
    }

    console.log(`\n📦 Subject: ${subject.name}`)
    console.log(`   Total soal: ${questions.length}`)
    console.log(`   Bab tersedia: ${validChapters.map(c => c.name).join(', ')}`)

    // Acak urutan soal sebelum dibagi
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5)
    
    // Hitung distribusi rata-rata
    const chunkSize = Math.ceil(shuffledQuestions.length / validChapters.length)
    
    // Pindahkan soal ke bab yang sah
    for (let i = 0; i < validChapters.length; i++) {
      const targetChapter = validChapters[i]
      const chunk = shuffledQuestions.slice(i * chunkSize, (i + 1) * chunkSize)
      
      if (chunk.length > 0) {
        await prisma.question.updateMany({
          where: { id: { in: chunk.map(q => q.id) } },
          data: { chapterId: targetChapter.id }
        })
        console.log(`   ✅ Dipetakan ${chunk.length} soal ke bab "${targetChapter.name}"`)
        totalMoved += chunk.length
      }
    }

    // Jika "Semua Materi" ada, pastikan kosong lalu hapus agar tidak membingungkan
    if (semuaMateri) {
      const remainingQuestions = await prisma.question.count({ where: { chapterId: semuaMateri.id } })
      if (remainingQuestions === 0) {
        await prisma.chapter.delete({ where: { id: semuaMateri.id } })
        console.log(`   🗑️  Bab "Semua Materi" berhasil dihapus karena sudah kosong.`)
        deletedSemuaMateri++
      } else {
        console.log(`   ⚠️ Bab "Semua Materi" tidak bisa dihapus karena masih ada ${remainingQuestions} soal tersisa.`)
      }
    }
  }

  console.log(`\n🎉 SELESAI!`)
  console.log(`Total soal berhasil dipetakan ulang: ${totalMoved}`)
  console.log(`Total bab "Semua Materi" dihapus: ${deletedSemuaMateri}`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
