import 'dotenv/config';
import { PrismaClient, Cluster, QuestionType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const OUTPUT_DIR = path.join(__dirname, 'output');

// Daftar 7 Subtes UTBK
const SUBJECTS = [
  { code: 'PU', name: 'Penalaran Umum' },
  { code: 'PK', name: 'Pengetahuan Kuantitatif' },
  { code: 'PBM', name: 'Pemahaman Bacaan dan Menulis' },
  { code: 'PPU', name: 'Pengetahuan dan Pemahaman Umum' },
  { code: 'LBI', name: 'Literasi Bahasa Indonesia' },
  { code: 'LBIng', name: 'Literasi Bahasa Inggris' },
  { code: 'PM', name: 'Penalaran Matematika' },
];

function determineSubjectCode(filename: string): string {
  const lowerName = filename.toLowerCase();
  
  // Literasi Bahasa Inggris
  if (lowerName.includes('inggris') || lowerName.includes('eng') || lowerName.includes('lbing')) return 'LBIng';
  
  // Literasi Bahasa Indonesia
  if (lowerName.includes('indonesia') || lowerName.includes('lbi')) return 'LBI';
  
  // Pemahaman Bacaan dan Menulis
  if (lowerName.includes('pbm') || lowerName.includes('bacaan dan menulis') || lowerName.includes('bacaan & menulis')) return 'PBM';
  
  // Pengetahuan dan Pemahaman Umum
  if (lowerName.includes('ppu') || lowerName.includes('pemahaman umum')) return 'PPU';
  
  // Pengetahuan Kuantitatif
  if (lowerName.includes('pk') || lowerName.includes('kuantitatif')) return 'PK';
  
  // Penalaran Matematika
  if (lowerName.includes('pm') || lowerName.includes('matematika') || lowerName.includes('mtk')) return 'PM';
  
  // Penalaran Umum (Default if logic matches)
  if (lowerName.includes('pu') || lowerName.includes('penalaran umum') || lowerName.includes('silogisme') || lowerName.includes('logika') || lowerName.includes('kognitif')) return 'PU';
  
  // Default to PU for unknown/airdrop/temp files
  return 'PU';
}

function cleanText(text: string): string {
  if (!text) return '';
  return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function main() {
  console.log('🚀 Memulai proses migrasi dan deduplikasi bank soal UTBK...');

  // 1. Pastikan Subject dan Chapter (Semua Materi) ada di DB
  console.log('\n⚙️ Memastikan struktur Subject & Chapter ada di DB...');
  const subjectMap = new Map<string, string>(); // kode -> chapterId

  for (const subj of SUBJECTS) {
    let subject = await prisma.subject.findUnique({
      where: { name: subj.name }
    });

    if (!subject) {
      // Find existing by similar name just in case
      const existing = await prisma.subject.findFirst({
        where: { name: { contains: subj.code } }
      });
      if (existing) {
        subject = existing;
      } else {
        subject = await prisma.subject.create({
          data: {
            name: subj.name,
            cluster: Cluster.CAMPURAN
          }
        });
      }
    }

    let chapter = await prisma.chapter.findFirst({
      where: { subjectId: subject.id }
    });

    if (!chapter) {
      chapter = await prisma.chapter.create({
        data: {
          name: 'Semua Materi',
          subjectId: subject.id,
          order: 1
        }
      });
    }

    subjectMap.set(subj.code, chapter.id);
  }

  // 2. Kumpulkan soal dari file JSON
  console.log('\n📂 Membaca dan mendeduplikasi file JSON dari /output...');
  const files = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.json'));
  
  const allQuestionsBySubject: Record<string, any[]> = {
    'PU': [], 'PK': [], 'PBM': [], 'PPU': [], 'LBI': [], 'LBIng': [], 'PM': []
  };

  const seenQuestions = new Set<string>();
  let totalRaw = 0;
  let totalDuplicates = 0;

  for (const file of files) {
    const filePath = path.join(OUTPUT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    try {
      const data = JSON.parse(content);
      if (!data.questions || !Array.isArray(data.questions)) continue;

      const subjectCode = determineSubjectCode(file);

      for (const q of data.questions) {
        totalRaw++;
        const cleaned = cleanText(q.text);
        if (cleaned.length < 5) continue; // Skip soal terlalu pendek/kosong

        if (seenQuestions.has(cleaned)) {
          totalDuplicates++;
        } else {
          seenQuestions.add(cleaned);
          allQuestionsBySubject[subjectCode].push(q);
        }
      }
    } catch (e) {
      console.error(`❌ Gagal membaca ${file}:`, e);
    }
  }

  console.log(`✅ Total soal mentah: ${totalRaw}`);
  console.log(`🚮 Total duplikat dibuang: ${totalDuplicates}`);
  console.log(`✨ Total soal unik yang akan di-seed: ${totalRaw - totalDuplicates}`);

  // 3. WIPE OUT database (Hapus tabel terkait)
  console.log('\n🗑️ Wiping (Menghapus) soal-soal lama dan response di Database...');
  await prisma.questionResponse.deleteMany({});
  await prisma.questionOption.deleteMany({});
  const deleteRes = await prisma.question.deleteMany({});
  console.log(`✅ ${deleteRes.count} soal lama berhasil dihapus dari DB!`);

  // 4. Seeding ke DB
  console.log('\n🌱 Menyuntikkan (Seeding) soal-soal baru ke Database...');
  
  let totalInserted = 0;

  for (const code of Object.keys(allQuestionsBySubject)) {
    const questions = allQuestionsBySubject[code];
    const chapterId = subjectMap.get(code);

    if (!chapterId || questions.length === 0) continue;

    let inserted = 0;
    for (const q of questions) {
      try {
        const createdQ = await prisma.question.create({
          data: {
            chapterId: chapterId,
            text: q.text,
            type: QuestionType.MULTIPLE_CHOICE,
            difficulty: (Math.random() * 2 - 1), // -1 to 1 mock difficulty
            options: {
              create: (q.options || []).map((optText: string, idx: number) => ({
                label: String.fromCharCode(65 + idx), // A, B, C, D, E
                text: optText,
                isCorrect: optText === q.correctAnswer
              }))
            }
          }
        });
        inserted++;
        totalInserted++;
      } catch (err) {
        // silently catch
      }
    }
    console.log(`✅ [${code}] Berhasil insert ${inserted} soal.`);
  }

  console.log(`\n🎉 SELESAI! ${totalInserted} soal telah berhasil dimasukkan ke Database!`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
