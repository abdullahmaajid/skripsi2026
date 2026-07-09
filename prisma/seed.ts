import { PrismaClient, UniType, Degree, Cluster } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import fs from 'fs'
import path from 'path'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // =====================
  // 1. USERS (Admin + Siswa)
  // =====================
  const adminPw = await bcrypt.hash('admin123', 12)
  const siswaPw = await bcrypt.hash('siswa123', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@polarius.id' },
    update: {},
    create: { name: 'Admin Polarius', email: 'admin@polarius.id', password: adminPw, role: 'ADMIN' },
  })
  console.log('✅ Admin:', admin.email)

  const siswa = await prisma.user.upsert({
    where: { email: 'budi@siswa.id' },
    update: {},
    create: { name: 'Budi Santoso', email: 'budi@siswa.id', password: siswaPw, role: 'STUDENT', irtAbility: 1.51 },
  })
  console.log('✅ Siswa:', siswa.email)

  // =====================
  // 2 & 3. UNIVERSITIES & MAJORS (DARI SCRAPED DATA JSON)
  // =====================
  const ptnDataPath = '/Users/abdullahmaajid/.gemini/antigravity-ide/brain/d96e3092-268c-44b1-bf9c-bc8b34da10ea/scratch/ptn_data.json'
  const ptnRaw = fs.readFileSync(ptnDataPath, 'utf-8')
  const scrapedMajors = JSON.parse(ptnRaw)

  // Extract unique universities
  const uniMap = new Map<string, { code: string; name: string; location: string; logoUrl: string | null }>()
  for (const m of scrapedMajors) {
    if (!uniMap.has(m.uni_code)) {
      uniMap.set(m.uni_code, {
        code: m.uni_code,
        name: m.uni_name,
        location: m.uni_location,
        logoUrl: m.uni_logo || null
      })
    }
  }

  // Seed Universities
  const seededUnis = []
  for (const u of uniMap.values()) {
    const uni = await prisma.university.upsert({
      where: { code: u.code },
      update: { name: u.name, location: u.location, logoUrl: u.logoUrl },
      create: { code: u.code, name: u.name, location: u.location, logoUrl: u.logoUrl, type: UniType.NEGERI }
    })
    seededUnis.push(uni)
  }
  console.log(`✅ ${seededUnis.length} universitas dari scraping`)

  const uniDbMap = Object.fromEntries(seededUnis.map(u => [u.code, u.id]))

  // Seed Majors
  let majorCount = 0
  for (const m of scrapedMajors) {
    let clusterEnum: Cluster = Cluster.SAINTEK
    if (m.cluster === 'SOSHUM') clusterEnum = Cluster.SOSHUM
    else if (m.cluster === 'CAMPURAN') clusterEnum = Cluster.CAMPURAN

    let degreeEnum: Degree = Degree.S1
    if (m.degree === 'D3') degreeEnum = Degree.D3
    else if (m.degree === 'D4') degreeEnum = Degree.D4

    await prisma.major.upsert({
      where: { code: m.major_code },
      update: {
        name: m.major_name,
        faculty: m.faculty,
        degree: degreeEnum,
        quota: m.quota,
        applicants: m.applicants,
        estimatedScore: m.estimated_score,
        cluster: clusterEnum,
        universityId: uniDbMap[m.uni_code]
      },
      create: {
        code: m.major_code,
        name: m.major_name,
        faculty: m.faculty,
        degree: degreeEnum,
        quota: m.quota,
        applicants: m.applicants,
        estimatedScore: m.estimated_score,
        cluster: clusterEnum,
        universityId: uniDbMap[m.uni_code]
      }
    })
    majorCount++
  }
  console.log(`✅ ${majorCount} jurusan dari scraping`)

  // Set student profile with target
  const itbIF = await prisma.major.findUnique({ where: { code: '332101' } })
  const ugmMan = await prisma.major.findUnique({ where: { code: '361201' } })
  if (itbIF && ugmMan) {
    await prisma.studentProfile.upsert({
      where: { userId: siswa.id },
      update: { school: 'SMAN 1 Jakarta', graduationYear: 2025, targetMajor1Id: itbIF.id, targetMajor2Id: ugmMan.id },
      create: { userId: siswa.id, school: 'SMAN 1 Jakarta', graduationYear: 2025, targetMajor1Id: itbIF.id, targetMajor2Id: ugmMan.id },
    })
    console.log('✅ Student profile linked')
  }

  // =====================
  // 4. SUBJECTS & CHAPTERS
  // =====================
  const subjects = [
    { name: 'Penalaran Umum', cluster: Cluster.CAMPURAN, chapters: ['Logika', 'Analogi', 'Silogisme', 'Penalaran Analitis'] },
    { name: 'Penalaran Matematika', cluster: Cluster.SAINTEK, chapters: ['Aljabar', 'Geometri', 'Statistika', 'Peluang'] },
    { name: 'Literasi Bahasa Indonesia', cluster: Cluster.CAMPURAN, chapters: ['Gagasan Utama', 'Inferensi', 'Kalimat Efektif', 'Ejaan & Tanda Baca'] },
    { name: 'Literasi Bahasa Inggris', cluster: Cluster.CAMPURAN, chapters: ['Reading Comprehension', 'Vocabulary', 'Grammar', 'Inference'] },
    { name: 'Pengetahuan & Pemahaman Umum', cluster: Cluster.CAMPURAN, chapters: ['PPKN', 'Sosial', 'Sains Dasar', 'Ekonomi'] },
    { name: 'Pemahaman Bacaan & Menulis', cluster: Cluster.CAMPURAN, chapters: ['Struktur Teks', 'Koherensi', 'Argumen', 'Ringkasan'] },
    { name: 'Pengetahuan Kuantitatif', cluster: Cluster.SAINTEK, chapters: ['Aritmatika', 'Pola Bilangan', 'Perbandingan', 'Diagram & Tabel'] },
  ]

  for (const s of subjects) {
    const subj = await prisma.subject.upsert({
      where: { name: s.name },
      update: { cluster: s.cluster },
      create: { name: s.name, cluster: s.cluster },
    })
    for (let i = 0; i < s.chapters.length; i++) {
      const chapName = s.chapters[i]
      await prisma.chapter.create({
        data: {
          name: chapName,
          subjectId: subj.id,
          order: i + 1,
          theorySummary: `# Rangkuman ${chapName}\n\nIni adalah rangkuman materi ringkas mengenai **${chapName}** untuk persiapan subtes **${s.name}**.\n\n### Konsep Utama\n1. **Definisi:** Konsep fundamental dan terminologi dasar yang wajib dipahami.\n2. **Rumus Esensial & Aturan:** Pendekatan matematis, pola logika, atau aturan bahasa yang relevan.\n3. **Tips Ujian:** Strategi eliminasi pilihan jawaban salah dan cara penyelesaian cepat.\n\nLatihlah soal secara berkala untuk memperkuat pemahaman Anda!`,
        },
      })
    }
  }
  console.log(`✅ ${subjects.length} subjects, ${subjects.reduce((a, s) => a + s.chapters.length, 0)} chapters`)

  // =====================
  // 5. QUESTIONS (Penalaran Matematika — Aljabar)
  // =====================
  const penMatSubj = await prisma.subject.findUnique({ where: { name: 'Penalaran Matematika' } })
  if (penMatSubj) {
    const aljabar = await prisma.chapter.findFirst({ where: { subjectId: penMatSubj.id, name: 'Aljabar' } })
    if (aljabar) {
      const questions = [
        { text: 'Jika x² - 4x + 3 = 0, maka nilai x yang memenuhi adalah...', difficulty: -0.5, options: [
          { label: 'A', text: 'x = -1 atau x = -3', isCorrect: false },
          { label: 'B', text: 'x = 1 atau x = 3', isCorrect: true },
          { label: 'C', text: 'x = 2 atau x = 4', isCorrect: false },
          { label: 'D', text: 'x = -2 atau x = -4', isCorrect: false },
          { label: 'E', text: 'x = 0 atau x = 3', isCorrect: false },
        ]},
        { text: 'Nilai dari log₂ 32 adalah...', difficulty: -1.0, options: [
          { label: 'A', text: '3', isCorrect: false },
          { label: 'B', text: '4', isCorrect: false },
          { label: 'C', text: '5', isCorrect: true },
          { label: 'D', text: '6', isCorrect: false },
          { label: 'E', text: '8', isCorrect: false },
        ]},
        { text: 'Jika f(x) = 2x + 3, maka f(f(2)) = ...', difficulty: 0.0, options: [
          { label: 'A', text: '13', isCorrect: false },
          { label: 'B', text: '17', isCorrect: true },
          { label: 'C', text: '15', isCorrect: false },
          { label: 'D', text: '19', isCorrect: false },
          { label: 'E', text: '21', isCorrect: false },
        ]},
        { text: 'Himpunan penyelesaian dari |2x - 6| < 4 adalah...', difficulty: 0.8, options: [
          { label: 'A', text: '{x | 1 < x < 5}', isCorrect: true },
          { label: 'B', text: '{x | -1 < x < 5}', isCorrect: false },
          { label: 'C', text: '{x | 1 < x < 7}', isCorrect: false },
          { label: 'D', text: '{x | x > 5}', isCorrect: false },
          { label: 'E', text: '{x | x < 1}', isCorrect: false },
        ]},
        { text: 'Jumlah 20 suku pertama dari deret aritmatika 3, 7, 11, 15, ... adalah...', difficulty: 0.5, options: [
          { label: 'A', text: '820', isCorrect: true },
          { label: 'B', text: '800', isCorrect: false },
          { label: 'C', text: '780', isCorrect: false },
          { label: 'D', text: '760', isCorrect: false },
          { label: 'E', text: '840', isCorrect: false },
        ]},
      ]

      for (const q of questions) {
        await prisma.question.create({
          data: {
            chapterId: aljabar.id,
            text: q.text,
            difficulty: q.difficulty,
            type: 'MULTIPLE_CHOICE',
            options: { create: q.options },
          },
        })
      }
      console.log(`✅ ${questions.length} soal Aljabar`)
    }
  }

  // =====================
  // 5b. QUESTIONS — Other Subjects
  // =====================
  const allSubjects = await prisma.subject.findMany({ include: { chapters: true } })
  const subjectQuestions: Record<string, { chapterName: string; questions: { text: string; difficulty: number; options: { label: string; text: string; isCorrect: boolean }[] }[] }[]> = {
    'Penalaran Umum': [{ chapterName: 'Logika', questions: [
      { text: 'Semua burung bisa terbang. Pinguin adalah burung. Kesimpulan yang tepat adalah...', difficulty: -0.8, options: [
        { label: 'A', text: 'Pinguin bisa terbang', isCorrect: false },
        { label: 'B', text: 'Premis pertama salah, maka kesimpulan tidak valid', isCorrect: true },
        { label: 'C', text: 'Pinguin bukan burung', isCorrect: false },
        { label: 'D', text: 'Semua yang terbang adalah burung', isCorrect: false },
        { label: 'E', text: 'Tidak dapat disimpulkan', isCorrect: false },
      ]},
      { text: 'Jika hujan turun, maka jalanan basah. Jalanan tidak basah. Kesimpulan logis adalah...', difficulty: 0.0, options: [
        { label: 'A', text: 'Hujan tidak turun (modus tollens)', isCorrect: true },
        { label: 'B', text: 'Hujan turun', isCorrect: false },
        { label: 'C', text: 'Jalanan kering', isCorrect: false },
        { label: 'D', text: 'Tidak bisa disimpulkan', isCorrect: false },
        { label: 'E', text: 'Jalanan basah karena sebab lain', isCorrect: false },
      ]},
      { text: 'Pola bilangan: 2, 6, 18, 54, ... Suku berikutnya adalah...', difficulty: -0.5, options: [
        { label: 'A', text: '108', isCorrect: false },
        { label: 'B', text: '162', isCorrect: true },
        { label: 'C', text: '148', isCorrect: false },
        { label: 'D', text: '180', isCorrect: false },
        { label: 'E', text: '216', isCorrect: false },
      ]},
      { text: 'ABCD : EFGH = IJKL : ?', difficulty: 0.3, options: [
        { label: 'A', text: 'MNOP', isCorrect: true },
        { label: 'B', text: 'LMNO', isCorrect: false },
        { label: 'C', text: 'NOPQ', isCorrect: false },
        { label: 'D', text: 'KLMN', isCorrect: false },
        { label: 'E', text: 'OPQR', isCorrect: false },
      ]},
      { text: 'Dalam sebuah antrian, Ani di depan Budi, Citra di belakang Dina, dan Dina di depan Ani. Urutan dari depan ke belakang yang benar adalah...', difficulty: 0.8, options: [
        { label: 'A', text: 'Dina, Ani, Budi, Citra', isCorrect: true },
        { label: 'B', text: 'Ani, Dina, Citra, Budi', isCorrect: false },
        { label: 'C', text: 'Citra, Dina, Ani, Budi', isCorrect: false },
        { label: 'D', text: 'Dina, Citra, Ani, Budi', isCorrect: false },
        { label: 'E', text: 'Ani, Budi, Dina, Citra', isCorrect: false },
      ]},
    ]}],
    'Literasi Bahasa Indonesia': [{ chapterName: 'Gagasan Utama', questions: [
      { text: 'Gagasan utama paragraf biasanya terdapat pada...', difficulty: -1.0, options: [
        { label: 'A', text: 'Kalimat pertama atau terakhir paragraf', isCorrect: true },
        { label: 'B', text: 'Selalu di tengah paragraf', isCorrect: false },
        { label: 'C', text: 'Judul karangan', isCorrect: false },
        { label: 'D', text: 'Catatan kaki', isCorrect: false },
        { label: 'E', text: 'Di luar paragraf', isCorrect: false },
      ]},
      { text: 'Kalimat efektif harus memenuhi syarat berikut, KECUALI...', difficulty: 0.2, options: [
        { label: 'A', text: 'Kesepadanan struktur', isCorrect: false },
        { label: 'B', text: 'Kehematan kata', isCorrect: false },
        { label: 'C', text: 'Menggunakan bahasa daerah', isCorrect: true },
        { label: 'D', text: 'Keparalelan bentuk', isCorrect: false },
        { label: 'E', text: 'Ketepatan ejaan', isCorrect: false },
      ]},
      { text: 'Penggunaan tanda koma (,) yang TEPAT terdapat pada kalimat...', difficulty: 0.5, options: [
        { label: 'A', text: 'Oleh karena itu, kita harus rajin belajar.', isCorrect: true },
        { label: 'B', text: 'Ibu membeli, sayur dan buah.', isCorrect: false },
        { label: 'C', text: 'Dia berlari, sangat cepat.', isCorrect: false },
        { label: 'D', text: 'Buku, itu sangat tebal.', isCorrect: false },
        { label: 'E', text: 'Kami pergi, ke pasar.', isCorrect: false },
      ]},
      { text: 'Kata "dikarenakan" dalam kalimat baku seharusnya diganti dengan...', difficulty: -0.3, options: [
        { label: 'A', text: 'karena', isCorrect: true },
        { label: 'B', text: 'sebab', isCorrect: false },
        { label: 'C', text: 'akibat', isCorrect: false },
        { label: 'D', text: 'oleh', isCorrect: false },
        { label: 'E', text: 'lantaran', isCorrect: false },
      ]},
      { text: 'Teks eksposisi bertujuan untuk...', difficulty: -0.7, options: [
        { label: 'A', text: 'Menghibur pembaca', isCorrect: false },
        { label: 'B', text: 'Memaparkan informasi atau penjelasan', isCorrect: true },
        { label: 'C', text: 'Menceritakan kisah fiksi', isCorrect: false },
        { label: 'D', text: 'Membujuk pembaca membeli produk', isCorrect: false },
        { label: 'E', text: 'Mendeskripsikan suatu objek', isCorrect: false },
      ]},
    ]}],
    'Literasi Bahasa Inggris': [{ chapterName: 'Reading Comprehension', questions: [
      { text: 'The word "ubiquitous" most nearly means...', difficulty: 0.5, options: [
        { label: 'A', text: 'Rare and unusual', isCorrect: false },
        { label: 'B', text: 'Found everywhere', isCorrect: true },
        { label: 'C', text: 'Extremely large', isCorrect: false },
        { label: 'D', text: 'Difficult to understand', isCorrect: false },
        { label: 'E', text: 'Recently discovered', isCorrect: false },
      ]},
      { text: 'Choose the correct sentence:', difficulty: -0.5, options: [
        { label: 'A', text: 'She don\'t like coffee.', isCorrect: false },
        { label: 'B', text: 'She doesn\'t likes coffee.', isCorrect: false },
        { label: 'C', text: 'She doesn\'t like coffee.', isCorrect: true },
        { label: 'D', text: 'She not like coffee.', isCorrect: false },
        { label: 'E', text: 'She didn\'t likes coffee.', isCorrect: false },
      ]},
      { text: '"If I had known about the meeting, I ___ attended." Choose the correct answer:', difficulty: 0.8, options: [
        { label: 'A', text: 'will have', isCorrect: false },
        { label: 'B', text: 'would have', isCorrect: true },
        { label: 'C', text: 'would', isCorrect: false },
        { label: 'D', text: 'had', isCorrect: false },
        { label: 'E', text: 'have', isCorrect: false },
      ]},
      { text: 'The author\'s primary purpose in the passage is most likely to...', difficulty: 0.3, options: [
        { label: 'A', text: 'Entertain the reader with a story', isCorrect: false },
        { label: 'B', text: 'Inform the reader about a scientific topic', isCorrect: true },
        { label: 'C', text: 'Persuade the reader to take action', isCorrect: false },
        { label: 'D', text: 'Criticize a political decision', isCorrect: false },
        { label: 'E', text: 'Describe a personal experience', isCorrect: false },
      ]},
      { text: 'Which word is the antonym of "benevolent"?', difficulty: 0.0, options: [
        { label: 'A', text: 'Kind', isCorrect: false },
        { label: 'B', text: 'Generous', isCorrect: false },
        { label: 'C', text: 'Malevolent', isCorrect: true },
        { label: 'D', text: 'Charitable', isCorrect: false },
        { label: 'E', text: 'Compassionate', isCorrect: false },
      ]},
    ]}],
    'Pengetahuan & Pemahaman Umum': [{ chapterName: 'PPKN', questions: [
      { text: 'Pancasila sebagai dasar negara ditetapkan pada tanggal...', difficulty: -1.0, options: [
        { label: 'A', text: '17 Agustus 1945', isCorrect: false },
        { label: 'B', text: '18 Agustus 1945', isCorrect: true },
        { label: 'C', text: '1 Juni 1945', isCorrect: false },
        { label: 'D', text: '22 Juni 1945', isCorrect: false },
        { label: 'E', text: '29 Mei 1945', isCorrect: false },
      ]},
      { text: 'UUD 1945 telah diamandemen sebanyak...', difficulty: -0.5, options: [
        { label: 'A', text: '2 kali', isCorrect: false },
        { label: 'B', text: '3 kali', isCorrect: false },
        { label: 'C', text: '4 kali', isCorrect: true },
        { label: 'D', text: '5 kali', isCorrect: false },
        { label: 'E', text: '6 kali', isCorrect: false },
      ]},
      { text: 'Lembaga negara yang berwenang menguji undang-undang terhadap UUD adalah...', difficulty: 0.3, options: [
        { label: 'A', text: 'Mahkamah Agung', isCorrect: false },
        { label: 'B', text: 'Mahkamah Konstitusi', isCorrect: true },
        { label: 'C', text: 'DPR', isCorrect: false },
        { label: 'D', text: 'MPR', isCorrect: false },
        { label: 'E', text: 'Presiden', isCorrect: false },
      ]},
      { text: 'Hak asasi manusia yang berkaitan dengan hak untuk hidup termasuk kategori...', difficulty: 0.0, options: [
        { label: 'A', text: 'Non-derogable rights', isCorrect: true },
        { label: 'B', text: 'Derogable rights', isCorrect: false },
        { label: 'C', text: 'Hak ekonomi', isCorrect: false },
        { label: 'D', text: 'Hak budaya', isCorrect: false },
        { label: 'E', text: 'Hak politik', isCorrect: false },
      ]},
      { text: 'Sistem pemerintahan Indonesia menurut UUD 1945 setelah amandemen adalah...', difficulty: 0.5, options: [
        { label: 'A', text: 'Parlementer', isCorrect: false },
        { label: 'B', text: 'Presidensial', isCorrect: true },
        { label: 'C', text: 'Semi-presidensial', isCorrect: false },
        { label: 'D', text: 'Federal', isCorrect: false },
        { label: 'E', text: 'Monarki konstitusional', isCorrect: false },
      ]},
    ]}],
    'Pemahaman Bacaan & Menulis': [{ chapterName: 'Struktur Teks', questions: [
      { text: 'Struktur teks prosedur terdiri dari...', difficulty: -0.5, options: [
        { label: 'A', text: 'Tujuan, langkah-langkah, penegasan ulang', isCorrect: true },
        { label: 'B', text: 'Orientasi, komplikasi, resolusi', isCorrect: false },
        { label: 'C', text: 'Tesis, argumen, rekomendasi', isCorrect: false },
        { label: 'D', text: 'Pernyataan umum, deretan penjelasan, penutup', isCorrect: false },
        { label: 'E', text: 'Abstraksi, orientasi, krisis', isCorrect: false },
      ]},
      { text: 'Konjungsi yang menunjukkan hubungan sebab-akibat adalah...', difficulty: -0.3, options: [
        { label: 'A', text: 'tetapi', isCorrect: false },
        { label: 'B', text: 'oleh karena itu', isCorrect: true },
        { label: 'C', text: 'melainkan', isCorrect: false },
        { label: 'D', text: 'dan', isCorrect: false },
        { label: 'E', text: 'atau', isCorrect: false },
      ]},
      { text: 'Paragraf deduktif memiliki ciri...', difficulty: 0.0, options: [
        { label: 'A', text: 'Kalimat utama di akhir paragraf', isCorrect: false },
        { label: 'B', text: 'Kalimat utama di awal paragraf', isCorrect: true },
        { label: 'C', text: 'Kalimat utama di tengah paragraf', isCorrect: false },
        { label: 'D', text: 'Tidak memiliki kalimat utama', isCorrect: false },
        { label: 'E', text: 'Kalimat utama di awal dan akhir', isCorrect: false },
      ]},
      { text: 'Ringkasan yang baik harus memenuhi syarat berikut, KECUALI...', difficulty: 0.4, options: [
        { label: 'A', text: 'Menggunakan kalimat sendiri', isCorrect: false },
        { label: 'B', text: 'Memuat gagasan utama', isCorrect: false },
        { label: 'C', text: 'Menambahkan opini pribadi', isCorrect: true },
        { label: 'D', text: 'Singkat dan padat', isCorrect: false },
        { label: 'E', text: 'Runtut dan logis', isCorrect: false },
      ]},
      { text: 'Kata penghubung "meskipun" menunjukkan hubungan...', difficulty: -0.2, options: [
        { label: 'A', text: 'Penjumlahan', isCorrect: false },
        { label: 'B', text: 'Pertentangan/konsesif', isCorrect: true },
        { label: 'C', text: 'Sebab-akibat', isCorrect: false },
        { label: 'D', text: 'Waktu', isCorrect: false },
        { label: 'E', text: 'Perbandingan', isCorrect: false },
      ]},
    ]}],
    'Pengetahuan Kuantitatif': [{ chapterName: 'Aritmatika', questions: [
      { text: 'Jika 40% dari suatu bilangan adalah 80, maka bilangan tersebut adalah...', difficulty: -0.8, options: [
        { label: 'A', text: '160', isCorrect: false },
        { label: 'B', text: '200', isCorrect: true },
        { label: 'C', text: '240', isCorrect: false },
        { label: 'D', text: '320', isCorrect: false },
        { label: 'E', text: '180', isCorrect: false },
      ]},
      { text: 'Perbandingan uang Andi dan Budi 3:5. Jika jumlah uang mereka Rp160.000, uang Budi adalah...', difficulty: -0.3, options: [
        { label: 'A', text: 'Rp60.000', isCorrect: false },
        { label: 'B', text: 'Rp80.000', isCorrect: false },
        { label: 'C', text: 'Rp100.000', isCorrect: true },
        { label: 'D', text: 'Rp120.000', isCorrect: false },
        { label: 'E', text: 'Rp90.000', isCorrect: false },
      ]},
      { text: 'Rata-rata nilai 5 orang siswa adalah 78. Jika seorang siswa baru bergabung dengan nilai 90, rata-rata baru adalah...', difficulty: 0.2, options: [
        { label: 'A', text: '78', isCorrect: false },
        { label: 'B', text: '80', isCorrect: true },
        { label: 'C', text: '82', isCorrect: false },
        { label: 'D', text: '84', isCorrect: false },
        { label: 'E', text: '79', isCorrect: false },
      ]},
      { text: 'Sebuah toko memberikan diskon 20% lalu diskon tambahan 10%. Total diskon efektif adalah...', difficulty: 0.6, options: [
        { label: 'A', text: '30%', isCorrect: false },
        { label: 'B', text: '28%', isCorrect: true },
        { label: 'C', text: '25%', isCorrect: false },
        { label: 'D', text: '32%', isCorrect: false },
        { label: 'E', text: '27%', isCorrect: false },
      ]},
      { text: 'Diagram batang menunjukkan data: Jan=50, Feb=70, Mar=60, Apr=80, Mei=90. Median data adalah...', difficulty: 0.3, options: [
        { label: 'A', text: '60', isCorrect: false },
        { label: 'B', text: '70', isCorrect: true },
        { label: 'C', text: '80', isCorrect: false },
        { label: 'D', text: '75', isCorrect: false },
        { label: 'E', text: '65', isCorrect: false },
      ]},
    ]}],
  }

  let totalNewQuestions = 0
  for (const [subjName, chaptersData] of Object.entries(subjectQuestions)) {
    const subj = allSubjects.find(s => s.name === subjName)
    if (!subj) { console.log(`⚠️ Subject "${subjName}" not found`); continue }
    for (const chapData of chaptersData) {
      const chap = subj.chapters.find(c => c.name === chapData.chapterName)
      if (!chap) { console.log(`⚠️ Chapter "${chapData.chapterName}" not found in ${subjName}`); continue }
      for (const q of chapData.questions) {
        await prisma.question.create({
          data: { chapterId: chap.id, text: q.text, difficulty: q.difficulty, type: 'MULTIPLE_CHOICE', options: { create: q.options } },
        })
        totalNewQuestions++
      }
    }
  }
  console.log(`✅ ${totalNewQuestions} soal tambahan (6 subtes lainnya)`)

  // =====================
  // 5c. QUESTIONS DARI SCRAPING (FALLBACK JSON)
  // =====================
  const questionsDataPath = '/Users/abdullahmaajid/.gemini/antigravity-ide/brain/d96e3092-268c-44b1-bf9c-bc8b34da10ea/scratch/questions_data.json'
  const questionsRaw = fs.readFileSync(questionsDataPath, 'utf-8')
  const scrapedQuestions = JSON.parse(questionsRaw)

  let questionCount = 0
  for (const q of scrapedQuestions) {
    const subject = await prisma.subject.findUnique({ where: { name: q.subject } })
    if (!subject) {
      console.log(`Warning: Subject ${q.subject} tidak ditemukan.`)
      continue
    }
    const chapter = await prisma.chapter.findFirst({
      where: { subjectId: subject.id, name: q.chapter }
    })
    if (!chapter) {
      console.log(`Warning: Chapter ${q.chapter} untuk subject ${q.subject} tidak ditemukan.`)
      continue
    }

    // Hindari duplikasi soal yang sama di satu bab
    const existing = await prisma.question.findFirst({
      where: { chapterId: chapter.id, text: q.text }
    })
    if (existing) continue

    await prisma.question.create({
      data: {
        chapterId: chapter.id,
        text: q.text,
        difficulty: q.difficulty,
        type: 'MULTIPLE_CHOICE',
        options: {
          create: q.options.map((o: any) => ({
            label: o.label,
            text: o.text,
            isCorrect: o.isCorrect
          }))
        }
      }
    })
    questionCount++
  }
  console.log(`✅ ${questionCount} soal ditambahkan dari scraping/fallback JSON`)

  // =====================
  // 6. EXAM TEMPLATES + SECTIONS
  // =====================
  const template1 = await prisma.examTemplate.upsert({
    where: { id: 'tryout-snbt-1' },
    update: {},
    create: {
      id: 'tryout-snbt-1',
      name: 'Try Out SNBT #1',
      description: 'Paket simulasi UTBK-SNBT lengkap.',
      duration: 195,
      totalItems: 35,
      cluster: Cluster.SAINTEK,
      isAdaptive: false,
    },
  })

  const template2 = await prisma.examTemplate.upsert({
    where: { id: 'tryout-snbt-2' },
    update: {},
    create: {
      id: 'tryout-snbt-2',
      name: 'Try Out SNBT #2 (Adaptif)',
      description: 'Paket simulasi adaptif — soal menyesuaikan kemampuanmu.',
      duration: 120,
      totalItems: 20,
      cluster: Cluster.SAINTEK,
      isAdaptive: true,
    },
  })
  console.log('✅ 2 exam templates')

  // ExamSections — distribute questions per subject
  const sectionDefs = [
    { templateId: template1.id, subjName: 'Penalaran Umum', count: 5, order: 1, duration: 15 },
    { templateId: template1.id, subjName: 'Penalaran Matematika', count: 5, order: 2, duration: 20 },
    { templateId: template1.id, subjName: 'Literasi Bahasa Indonesia', count: 5, order: 3, duration: 15 },
    { templateId: template1.id, subjName: 'Literasi Bahasa Inggris', count: 5, order: 4, duration: 15 },
    { templateId: template1.id, subjName: 'Pengetahuan & Pemahaman Umum', count: 5, order: 5, duration: 15 },
    { templateId: template1.id, subjName: 'Pemahaman Bacaan & Menulis', count: 5, order: 6, duration: 15 },
    { templateId: template1.id, subjName: 'Pengetahuan Kuantitatif', count: 5, order: 7, duration: 15 },
    { templateId: template2.id, subjName: 'Penalaran Matematika', count: 5, order: 1, duration: 20 },
    { templateId: template2.id, subjName: 'Penalaran Umum', count: 5, order: 2, duration: 15 },
    { templateId: template2.id, subjName: 'Pengetahuan Kuantitatif', count: 5, order: 3, duration: 15 },
    { templateId: template2.id, subjName: 'Literasi Bahasa Indonesia', count: 5, order: 4, duration: 15 },
  ]

  for (const sec of sectionDefs) {
    const subj = allSubjects.find(s => s.name === sec.subjName)
    if (!subj) continue
    await prisma.examSection.create({
      data: { templateId: sec.templateId, subjectId: subj.id, itemCount: sec.count, order: sec.order, duration: sec.duration },
    })
  }
  console.log(`✅ ${sectionDefs.length} exam sections`)

  console.log('\n🎉 Seeding complete!')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
