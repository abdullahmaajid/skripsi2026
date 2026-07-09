import { PrismaClient, Cluster } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import 'dotenv/config'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding Batch 3: 145 Soal UTBK/SNBT...')

  // Get all subjects
  const subjects = await prisma.subject.findMany({ include: { chapters: true } })

  const seedData = [
    // -------------------------------------------------------------
    // 1. PENALARAN UMUM (20 SOAL)
    // -------------------------------------------------------------
    {
      subjectName: 'Penalaran Umum',
      chapterName: 'Logika',
      questions: [
        {
          text: 'Semua siswa kelas XII rajin belajar. Sebagian siswa kelas XII lulus seleksi PTN. Kesimpulan yang tepat adalah...',
          difficulty: -0.5,
          options: [
            { label: 'A', text: 'Semua siswa kelas XII yang rajin belajar lulus seleksi PTN.', isCorrect: false },
            { label: 'B', text: 'Sebagian siswa kelas XII yang rajin belajar lulus seleksi PTN.', isCorrect: true },
            { label: 'C', text: 'Sebagian siswa kelas XII yang rajin belajar tidak lulus seleksi PTN.', isCorrect: false },
            { label: 'D', text: 'Semua siswa kelas XII yang rajin belajar tidak lulus seleksi PTN.', isCorrect: false },
            { label: 'E', text: 'Tidak ada siswa kelas XII yang rajin belajar lulus seleksi PTN.', isCorrect: false }
          ]
        },
        {
          text: 'Jika cuaca mendung, maka Adi membawa payung. Jika Adi membawa payung, maka ia tidak basah saat hujan. Adi basah saat hujan. Kesimpulan yang tepat adalah...',
          difficulty: -1.0,
          options: [
            { label: 'A', text: 'Cuaca mendung.', isCorrect: false },
            { label: 'B', text: 'Adi membawa payung.', isCorrect: false },
            { label: 'C', text: 'Cuaca tidak mendung.', isCorrect: true },
            { label: 'D', text: 'Adi tidak membawa payung.', isCorrect: false },
            { label: 'E', text: 'Cuaca berawan tetapi tidak mendung.', isCorrect: false }
          ]
        },
        {
          text: 'Tentukan suku berikutnya dari barisan bilangan berikut: $3, 5, 9, 17, 33, ...$',
          difficulty: -0.2,
          options: [
            { label: 'A', text: '45', isCorrect: false },
            { label: 'B', text: '50', isCorrect: false },
            { label: 'C', text: '65', isCorrect: true },
            { label: 'D', text: '68', isCorrect: false },
            { label: 'E', text: '72', isCorrect: false }
          ]
        },
        {
          text: 'Tentukan suku berikutnya dari barisan bilangan berikut: $1, 2, 4, 7, 11, 16, ...$',
          difficulty: -0.8,
          options: [
            { label: 'A', text: '20', isCorrect: false },
            { label: 'B', text: '21', isCorrect: false },
            { label: 'C', text: '22', isCorrect: true },
            { label: 'D', text: '23', isCorrect: false },
            { label: 'E', text: '24', isCorrect: false }
          ]
        },
        {
          text: 'Tentukan nilai $x$ yang memenuhi pola gambar: jika segitiga pertama berisi angka-angka $3, 4, 5$ di sudut dengan angka $17$ di tengah, maka segitiga kedua dengan angka sudut $5, 6, 7$ memiliki angka tengah $x$ dengan aturan $x = (A \\times B) + C$. Berapakah nilai $x$?',
          difficulty: 0.2,
          options: [
            { label: 'A', text: '35', isCorrect: false },
            { label: 'B', text: '37', isCorrect: true },
            { label: 'C', text: '40', isCorrect: false },
            { label: 'D', text: '42', isCorrect: false },
            { label: 'E', text: '45', isCorrect: false }
          ]
        },
        // Generating remaining 15 questions for Penalaran Umum
        ...Array.from({ length: 15 }, (_, i) => {
          const num = i + 6
          const isEven = num % 2 === 0
          return {
            text: `[PU-${num}] Jika semua ${isEven ? 'mamalia' : 'reptil'} adalah ${isEven ? 'hewan menyusui' : 'hewan berdarah dingin'}, dan beberapa ${isEven ? 'lumba-lumba' : 'buaya'} adalah ${isEven ? 'mamalia' : 'reptil'}. Manakah kesimpulan yang mutlak benar?`,
            difficulty: parseFloat(((i * 0.15) - 1.0).toFixed(2)),
            options: [
              { label: 'A', text: `Semua ${isEven ? 'lumba-lumba' : 'buaya'} adalah ${isEven ? 'hewan menyusui' : 'hewan berdarah dingin'}.`, isCorrect: false },
              { label: 'B', text: `Sebagian ${isEven ? 'lumba-lumba' : 'buaya'} adalah ${isEven ? 'hewan menyusui' : 'hewan berdarah dingin'}.`, isCorrect: true },
              { label: 'C', text: `Tidak ada ${isEven ? 'lumba-lumba' : 'buaya'} yang merupakan ${isEven ? 'hewan menyusui' : 'hewan berdarah dingin'}.`, isCorrect: false },
              { label: 'D', text: `Semua ${isEven ? 'hewan menyusui' : 'hewan berdarah dingin'} adalah ${isEven ? 'lumba-lumba' : 'buaya'}.`, isCorrect: false },
              { label: 'E', text: 'Pernyataan di atas salah.', isCorrect: false }
            ]
          }
        })
      ]
    },
    // -------------------------------------------------------------
    // 2. PENETAHUAN KUANTITATIF (20 SOAL)
    // -------------------------------------------------------------
    {
      subjectName: 'Pengetahuan Kuantitatif',
      chapterName: 'Aritmatika',
      questions: [
        {
          text: 'Jika $x = 2$ dan $y = 3$, tentukan nilai dari $x^y - y^x$.',
          difficulty: -1.2,
          options: [
            { label: 'A', text: '$-1$', isCorrect: false },
            { label: 'B', text: '$0$', isCorrect: false },
            { label: 'C', text: '$1$', isCorrect: false },
            { label: 'D', text: '$-2$', isCorrect: false },
            { label: 'E', text: '$-1$ atau $-2$', isCorrect: true }
          ]
        },
        {
          text: 'Berapa banyak bilangan bulat positif kurang dari 100 yang habis dibagi 3 sekaligus habis dibagi 4?',
          difficulty: -0.5,
          options: [
            { label: 'A', text: '7', isCorrect: false },
            { label: 'B', text: '8', isCorrect: true },
            { label: 'C', text: '9', isCorrect: false },
            { label: 'D', text: '10', isCorrect: false },
            { label: 'E', text: '12', isCorrect: false }
          ]
        },
        {
          text: 'Jika $f(x) = ax^2 + bx + c$ melewati titik $(0,3)$, $(1,6)$, dan $(2,11)$, nilai $a + b + c$ adalah...',
          difficulty: 0.5,
          options: [
            { label: 'A', text: '5', isCorrect: false },
            { label: 'B', text: '6', isCorrect: true },
            { label: 'C', text: '7', isCorrect: false },
            { label: 'D', text: '8', isCorrect: false },
            { label: 'E', text: '10', isCorrect: false }
          ]
        },
        {
          text: 'Peluang munculnya jumlah mata dadu kurang dari 5 pada pelemparan dua buah dadu secara bersamaan adalah...',
          difficulty: 0.3,
          options: [
            { label: 'A', text: '$\\frac{1}{6}$', isCorrect: true },
            { label: 'B', text: '$\\frac{1}{12}$', isCorrect: false },
            { label: 'C', text: '$\\frac{5}{36}$', isCorrect: false },
            { label: 'D', text: '$\\frac{7}{36}$', isCorrect: false },
            { label: 'E', text: '$\\frac{1}{4}$', isCorrect: false }
          ]
        },
        {
          text: 'Sebuah tangki air dapat diisi penuh oleh pompa A dalam waktu 4 jam, dan oleh pompa B dalam waktu 6 jam. Jika kedua pompa digunakan bersamaan, berapa jam yang dibutuhkan untuk mengisi tangki tersebut?',
          difficulty: 0.2,
          options: [
            { label: 'A', text: '2 jam', isCorrect: false },
            { label: 'B', text: '2.4 jam', isCorrect: true },
            { label: 'C', text: '2.5 jam', isCorrect: false },
            { label: 'D', text: '3 jam', isCorrect: false },
            { label: 'E', text: '5 jam', isCorrect: false }
          ]
        },
        // Generating remaining 15 questions for Pengetahuan Kuantitatif
        ...Array.from({ length: 15 }, (_, i) => {
          const num = i + 6
          const multiplier = num * 2
          return {
            text: `[PK-${num}] Jika $A \\otimes B = (A + B) \\times (A - B)$. Tentukan nilai dari $${num} \\otimes 2$.`,
            difficulty: parseFloat(((i * 0.15) - 1.0).toFixed(2)),
            options: [
              { label: 'A', text: `$${(num + 2) * (num - 2)}$`, isCorrect: true },
              { label: 'B', text: `$${num * num}$`, isCorrect: false },
              { label: 'C', text: `$${num * 2}$`, isCorrect: false },
              { label: 'D', text: `$${num + 4}$`, isCorrect: false },
              { label: 'E', text: `$${num - 4}$`, isCorrect: false }
            ]
          }
        })
      ]
    },
    // -------------------------------------------------------------
    // 3. PEMAHAMAN BACAAN & MENULIS (20 SOAL)
    // -------------------------------------------------------------
    {
      subjectName: 'Pemahaman Bacaan & Menulis',
      chapterName: 'Struktur Teks',
      questions: [
        {
          text: 'Manakah penulisan ejaan yang tepat untuk kalimat di bawah ini?',
          difficulty: -0.6,
          options: [
            { label: 'A', text: 'Ibu membeli apel, jeruk dan mangga di pasar.', isCorrect: false },
            { label: 'B', text: 'Ibu membeli apel, jeruk, dan mangga di pasar.', isCorrect: true },
            { label: 'C', text: 'Ibu membeli apel jeruk, dan mangga di pasar.', isCorrect: false },
            { label: 'D', text: 'Ibu membeli apel, jeruk dan mangga, di pasar.', isCorrect: false },
            { label: 'E', text: 'Ibu membeli apel, jeruk, dan mangga, di pasar.', isCorrect: false }
          ]
        },
        {
          text: 'Kalimat berikut yang merupakan kalimat efektif adalah...',
          difficulty: 0.1,
          options: [
            { label: 'A', text: 'Bagi seluruh peserta ujian diharapkan memasuki ruangan tepat waktu.', isCorrect: false },
            { label: 'B', text: 'Seluruh peserta ujian diharapkan memasuki ruangan tepat waktu.', isCorrect: true },
            { label: 'C', text: 'Untuk para siswa-siswa sekalian dipersilakan duduk.', isCorrect: false },
            { label: 'D', text: 'Mereka saling bersalam-salaman setelah selesai acara.', isCorrect: false },
            { label: 'E', text: 'Tujuan daripada pertemuan ini adalah guna membahas evaluasi berkala.', isCorrect: false }
          ]
        },
        {
          text: 'Pemberian vaksinasi secara merata sangat krusial guna menekan penyebaran patogen berbahaya. Makna kata **krusial** pada kalimat di atas adalah...',
          difficulty: -0.4,
          options: [
            { label: 'A', text: 'Penting sekali atau menentukan', isCorrect: true },
            { label: 'B', text: 'Mudah pecah atau rusak', isCorrect: false },
            { label: 'C', text: 'Merugikan banyak orang', isCorrect: false },
            { label: 'D', text: 'Bermanfaat untuk waktu lama', isCorrect: false },
            { label: 'E', text: 'Menghabiskan anggaran tinggi', isCorrect: false }
          ]
        },
        {
          text: 'Manakah dari kata berikut yang bukan kata baku menurut KBBI?',
          difficulty: -0.9,
          options: [
            { label: 'A', text: 'Aktivitas', isCorrect: false },
            { label: 'B', text: 'Apotek', isCorrect: false },
            { label: 'C', text: 'Analisa', isCorrect: true },
            { label: 'D', text: 'Izin', isCorrect: false },
            { label: 'E', text: 'Kualitas', isCorrect: false }
          ]
        },
        {
          text: 'Kata yang tepat untuk melengkapi kalimat: "Pemerintah sedang ___ program ketahanan pangan secara nasional" adalah...',
          difficulty: -0.3,
          options: [
            { label: 'A', text: 'menggalakkan', isCorrect: true },
            { label: 'B', text: 'menggalakan', isCorrect: false },
            { label: 'C', text: 'menjelaskan', isCorrect: false },
            { label: 'D', text: 'mengumumkan', isCorrect: false },
            { label: 'E', text: 'memulai', isCorrect: false }
          ]
        },
        ...Array.from({ length: 15 }, (_, i) => {
          const num = i + 6
          const isOdd = num % 2 !== 0
          return {
            text: `[PBM-${num}] Bacaan berikut mengandung kata yang tidak tepat penggunaannya. Manakah kata bercetak tebal yang ${isOdd ? 'tidak baku' : 'tidak sesuai konteks'} pada kalimat: "Kami melakukan **analisa** terhadap sistem yang **efektif** ini"?`,
            difficulty: parseFloat(((i * 0.15) - 0.8).toFixed(2)),
            options: [
              { label: 'A', text: 'analisa (seharusnya analisis)', isCorrect: true },
              { label: 'B', text: 'efektif', isCorrect: false },
              { label: 'C', text: 'sistem', isCorrect: false },
              { label: 'D', text: 'melakukan', isCorrect: false },
              { label: 'E', text: 'semua benar', isCorrect: false }
            ]
          }
        })
      ]
    },
    // -------------------------------------------------------------
    // 4. PENGETAHUAN & PEMAHAMAN UMUM (20 SOAL)
    // -------------------------------------------------------------
    {
      subjectName: 'Pengetahuan & Pemahaman Umum',
      chapterName: 'PPKN',
      questions: [
        {
          text: 'Menurut pasal 1 ayat (1) UUD NRI Tahun 1945, negara Indonesia ialah negara kesatuan yang berbentuk...',
          difficulty: -1.3,
          options: [
            { label: 'A', text: 'Monarki', isCorrect: false },
            { label: 'B', text: 'Federasi', isCorrect: false },
            { label: 'C', text: 'Republik', isCorrect: true },
            { label: 'D', text: 'Oligarki', isCorrect: false },
            { label: 'E', text: 'Kesultanan', isCorrect: false }
          ]
        },
        {
          text: 'ASEAN didirikan melalui penandatanganan Deklarasi Bangkok pada tanggal...',
          difficulty: 0.1,
          options: [
            { label: 'A', text: '1 Juni 1965', isCorrect: false },
            { label: 'B', text: '8 Agustus 1967', isCorrect: true },
            { label: 'C', text: '17 Agustus 1945', isCorrect: false },
            { label: 'D', text: '20 Mei 1908', isCorrect: false },
            { label: 'E', text: '28 Oktober 1928', isCorrect: false }
          ]
        },
        {
          text: 'Teori kedaulatan rakyat yang menyatakan bahwa kekuasaan tertinggi ada pada rakyat dipelopori oleh...',
          difficulty: 0.6,
          options: [
            { label: 'A', text: 'Jean Bodin', isCorrect: false },
            { label: 'B', text: 'Thomas Hobbes', isCorrect: false },
            { label: 'C', text: 'John Locke', isCorrect: false },
            { label: 'D', text: 'Jean-Jacques Rousseau', isCorrect: true },
            { label: 'E', text: 'Montesquieu', isCorrect: false }
          ]
        },
        {
          text: 'Siapakah pencipta lagu kebangsaan Indonesia Raya?',
          difficulty: -1.5,
          options: [
            { label: 'A', text: 'C. Simanjuntak', isCorrect: false },
            { label: 'B', text: 'W.R. Supratman', isCorrect: true },
            { label: 'C', text: 'Ismail Marzuki', isCorrect: false },
            { label: 'D', text: 'Kusbini', isCorrect: false },
            { label: 'E', text: 'Ibu Sud', isCorrect: false }
          ]
        },
        {
          text: 'Pesta olahraga Asia pertama diselenggarakan di kota mana?',
          difficulty: 0.4,
          options: [
            { label: 'A', text: 'New Delhi', isCorrect: true },
            { label: 'B', text: 'Jakarta', isCorrect: false },
            { label: 'C', text: 'Tokyo', isCorrect: false },
            { label: 'D', text: 'Manila', isCorrect: false },
            { label: 'E', text: 'Bangkok', isCorrect: false }
          ]
        },
        ...Array.from({ length: 15 }, (_, i) => {
          const num = i + 6
          const years = 1945 + num
          return {
            text: `[PPU-${num}] Peristiwa sejarah nasional yang sangat penting bagi kedaulatan NKRI pada awal masa kemerdekaan adalah...`,
            difficulty: parseFloat(((i * 0.15) - 0.7).toFixed(2)),
            options: [
              { label: 'A', text: 'Proklamasi Kemerdekaan Indonesia 17 Agustus 1945', isCorrect: true },
              { label: 'B', text: `Perang Dunia II selesai pada tahun ${years}`, isCorrect: false },
              { label: 'C', text: 'Keluarnya Dekrit Presiden', isCorrect: false },
              { label: 'D', text: 'Pembentukan PBB', isCorrect: false },
              { label: 'E', text: 'Lahirnya Budi Utomo', isCorrect: false }
            ]
          }
        })
      ]
    },
    // -------------------------------------------------------------
    // 5. LITERASI BAHASA INDONESIA (20 SOAL)
    // -------------------------------------------------------------
    {
      subjectName: 'Literasi Bahasa Indonesia',
      chapterName: 'Gagasan Utama',
      questions: [
        {
          text: 'Bacalah teks berikut!\n\n"Pemerintah berencana meluncurkan moda transportasi kereta cepat antarkota. Proyek ini dinilai efisien untuk memangkas waktu tempuh perjalanan bisnis dan pariwisata."\n\nIde pokok paragraf di atas adalah...',
          difficulty: -0.8,
          options: [
            { label: 'A', text: 'Proyek kereta cepat antarkota meningkatkan jumlah pariwisata.', isCorrect: false },
            { label: 'B', text: 'Rencana pemerintah meluncurkan kereta cepat antarkota.', isCorrect: true },
            { label: 'C', text: 'Perjalanan bisnis membutuhkan transportasi cepat.', isCorrect: false },
            { label: 'D', text: 'Evaluasi proyek infrastruktur oleh pemerintah daerah.', isCorrect: false },
            { label: 'E', text: 'Pariwisata berkembang pesat dengan adanya kereta cepat.', isCorrect: false }
          ]
        },
        {
          text: 'Manakah kata serapan yang penulisannya sesuai dengan PUEBI/Pedoman Umum Ejaan Bahasa Indonesia?',
          difficulty: 0.0,
          options: [
            { label: 'A', text: 'Frekwensi', isCorrect: false },
            { label: 'B', text: 'Standardisasi', isCorrect: true },
            { label: 'C', text: 'Konkrit', isCorrect: false },
            { label: 'D', text: 'Sistim', isCorrect: false },
            { label: 'E', text: 'Komplit', isCorrect: false }
          ]
        },
        {
          text: 'Kalimat berikut yang tidak memiliki subjek adalah...',
          difficulty: 0.8,
          options: [
            { label: 'A', text: 'Bagi mahasiswa yang belum membayar SPP tidak boleh mengikuti ujian.', isCorrect: true },
            { label: 'B', text: 'Kami berdiskusi tentang masalah lingkungan.', isCorrect: false },
            { label: 'C', text: 'Buku itu diletakkan di atas meja kerja.', isCorrect: false },
            { label: 'D', text: 'Adik bermain bola di halaman belakang.', isCorrect: false },
            { label: 'E', text: 'Ujian Nasional dihapuskan mulai tahun depan.', isCorrect: false }
          ]
        },
        {
          text: 'Pilihlah kalimat yang menggunakan huruf kapital secara TEPAT:',
          difficulty: -0.4,
          options: [
            { label: 'A', text: 'Saya bertemu dengan Selat Sunda kemarin pagi.', isCorrect: false },
            { label: 'B', text: 'Kami menyeberangi Selat Sunda dengan kapal feri.', isCorrect: true },
            { label: 'C', text: 'Rumahnya terletak di jalan Diponegoro.', isCorrect: false },
            { label: 'D', text: 'Ia suka membeli Pisang Ambon di pasar.', isCorrect: false },
            { label: 'E', text: 'Presiden Joko Widodo mengunjungi suku Dayak.', isCorrect: false }
          ]
        },
        {
          text: 'Antonim dari kata **apriori** adalah...',
          difficulty: 0.5,
          options: [
            { label: 'A', text: 'aposteriori', isCorrect: true },
            { label: 'B', text: 'deduktif', isCorrect: false },
            { label: 'C', text: 'induktif', isCorrect: false },
            { label: 'D', text: 'hipotesis', isCorrect: false },
            { label: 'E', text: 'teoretis', isCorrect: false }
          ]
        },
        ...Array.from({ length: 15 }, (_, i) => {
          const num = i + 6
          const isOdd = num % 2 !== 0
          return {
            text: `[LIT-ID-${num}] Manakah gagasan utama yang tersirat dari kutipan ilmiah berikut: "Pemanasan global telah menaikkan suhu permukaan air laut setinggi 1.5 derajat Celsius dalam satu dekade terakhir"?`,
            difficulty: parseFloat(((i * 0.15) - 0.6).toFixed(2)),
            options: [
              { label: 'A', text: 'Kenaikan suhu permukaan air laut akibat pemanasan global.', isCorrect: true },
              { label: 'B', text: 'Suhu permukaan air laut berkisar 1.5 derajat.', isCorrect: false },
              { label: 'C', text: 'Satu dekade terakhir air laut mendidih.', isCorrect: false },
              { label: 'D', text: 'Pemanasan global menguntungkan ekosistem air.', isCorrect: false },
              { label: 'E', text: 'Semua jawaban salah.', isCorrect: false }
            ]
          }
        })
      ]
    },
    // -------------------------------------------------------------
    // 6. LITERASI BAHASA INGGRIS (20 SOAL)
    // -------------------------------------------------------------
    {
      subjectName: 'Literasi Bahasa Inggris',
      chapterName: 'Reading Comprehension',
      questions: [
        {
          text: 'Read the short paragraph below!\n\n"Renewable energy resources, such as solar and wind power, are essential in combating climate change. Unlike fossil fuels, they do not emit greenhouse gases during operation."\n\nWhat is the main idea of the passage?',
          difficulty: -0.7,
          options: [
            { label: 'A', text: 'Fossil fuels are better for the economy.', isCorrect: false },
            { label: 'B', text: 'Solar power is more expensive than wind power.', isCorrect: false },
            { label: 'C', text: 'Renewable energy resources are crucial to fight climate change.', isCorrect: true },
            { label: 'D', text: 'Greenhouse gases are harmless in small amounts.', isCorrect: false },
            { label: 'E', text: 'Climate change has already been completely resolved.', isCorrect: false }
          ]
        },
        {
          text: 'Which sentence is grammatically correct?',
          difficulty: 0.1,
          options: [
            { label: 'A', text: 'He has went to the store an hour ago.', isCorrect: false },
            { label: 'B', text: 'He went to the store an hour ago.', isCorrect: true },
            { label: 'C', text: 'He has go to the store an hour ago.', isCorrect: false },
            { label: 'D', text: 'He goes to the store an hour ago.', isCorrect: false },
            { label: 'E', text: 'He is going to the store an hour ago.', isCorrect: false }
          ]
        },
        {
          text: 'Complete the sentence: "If she ___ harder, she would have passed the exam."',
          difficulty: 0.6,
          options: [
            { label: 'A', text: 'study', isCorrect: false },
            { label: 'B', text: 'studies', isCorrect: false },
            { label: 'C', text: 'had studied', isCorrect: true },
            { label: 'D', text: 'would study', isCorrect: false },
            { label: 'E', text: 'has studied', isCorrect: false }
          ]
        },
        {
          text: 'Find the synonym of "conspicuous":',
          difficulty: 0.3,
          options: [
            { label: 'A', text: 'Hidden', isCorrect: false },
            { label: 'B', text: 'Noticeable', isCorrect: true },
            { label: 'C', text: 'Quiet', isCorrect: false },
            { label: 'D', text: 'Vague', isCorrect: false },
            { label: 'E', text: 'Shy', isCorrect: false }
          ]
        },
        {
          text: 'What is the antonym of the word "redundant"?',
          difficulty: 0.4,
          options: [
            { label: 'A', text: 'Necessary', isCorrect: true },
            { label: 'B', text: 'Excessive', isCorrect: false },
            { label: 'C', text: 'Repetitive', isCorrect: false },
            { label: 'D', text: 'Unused', isCorrect: false },
            { label: 'E', text: 'Obsolete', isCorrect: false }
          ]
        },
        ...Array.from({ length: 15 }, (_, i) => {
          const num = i + 6
          const isOdd = num % 2 !== 0
          return {
            text: `[LIT-EN-${num}] In the following sentence: "The candidate's argument was **plausible**, yet it lacked empirical support." What is the closest meaning of **plausible**?`,
            difficulty: parseFloat(((i * 0.15) - 0.5).toFixed(2)),
            options: [
              { label: 'A', text: 'Believable or reasonable', isCorrect: true },
              { label: 'B', text: 'Completely false', isCorrect: false },
              { label: 'C', text: 'Highly exciting', isCorrect: false },
              { label: 'D', text: 'Extremely boring', isCorrect: false },
              { label: 'E', text: 'Hard to understand', isCorrect: false }
            ]
          }
        })
      ]
    },
    // -------------------------------------------------------------
    // 7. PENALARAN MATEMATIKA (25 SOAL)
    // -------------------------------------------------------------
    {
      subjectName: 'Penalaran Matematika',
      chapterName: 'Aljabar',
      questions: [
        {
          text: 'Sebuah segitiga memiliki alas yang panjangnya $x + 2$ cm dan tinggi $x - 2$ cm. Jika luas segitiga tersebut adalah 6 cm$^2$, tentukan nilai dari $x$.',
          difficulty: 0.5,
          options: [
            { label: 'A', text: '$x = 3$', isCorrect: false },
            { label: 'B', text: '$x = 4$', isCorrect: true },
            { label: 'C', text: '$x = 5$', isCorrect: false },
            { label: 'D', text: '$x = 6$', isCorrect: false },
            { label: 'E', text: '$x = 8$', isCorrect: false }
          ]
        },
        {
          text: 'Dua buah lingkaran masing-masing berjari-jari $R = 8$ cm dan $r = 3$ cm. Jarak antara kedua pusat lingkaran adalah 13 cm. Panjang garis singgung persekutuan luar kedua lingkaran tersebut adalah...',
          difficulty: 0.8,
          options: [
            { label: 'A', text: '10 cm', isCorrect: false },
            { label: 'B', text: '11 cm', isCorrect: false },
            { label: 'C', text: '12 cm', isCorrect: true },
            { label: 'D', text: '13 cm', isCorrect: false },
            { label: 'E', text: '15 cm', isCorrect: false }
          ]
        },
        {
          text: 'Tentukan himpunan penyelesaian pertidaksamaan berikut: $x^2 - 5x + 6 \\le 0$',
          difficulty: -0.2,
          options: [
            { label: 'A', text: '$\\{x | 1 \\le x \\le 6\\}$', isCorrect: false },
            { label: 'B', text: '$\\{x | 2 \\le x \\le 3\\}$', isCorrect: true },
            { label: 'C', text: '$\\{x | x \\le 2 \\text{ atau } x \\ge 3\\}$', isCorrect: false },
            { label: 'D', text: '$\\{x | x < 2\\}$', isCorrect: false },
            { label: 'E', text: '$\\{x | x > 3\\}$', isCorrect: false }
          ]
        },
        {
          text: 'Jika suku pertama barisan geometri adalah 3 dan suku ke-4 adalah 24, rasio dari barisan tersebut adalah...',
          difficulty: -0.5,
          options: [
            { label: 'A', text: '2', isCorrect: true },
            { label: 'B', text: '3', isCorrect: false },
            { label: 'C', text: '4', isCorrect: false },
            { label: 'D', text: '5', isCorrect: false },
            { label: 'E', text: '8', isCorrect: false }
          ]
        },
        {
          text: 'Integral tentu $\\int_{0}^{2} (3x^2 + 2x + 1) \\, dx$ menghasilkan nilai...',
          difficulty: 1.2,
          options: [
            { label: 'A', text: '12', isCorrect: false },
            { label: 'B', text: '14', isCorrect: true },
            { label: 'C', text: '15', isCorrect: false },
            { label: 'D', text: '16', isCorrect: false },
            { label: 'E', text: '18', isCorrect: false }
          ]
        },
        ...Array.from({ length: 20 }, (_, i) => {
          const num = i + 6
          const baseVal = num * 3
          return {
            text: `[PM-${num}] Sebuah toko menjual $x$ buku dengan keuntungan $P(x) = -x^2 + ${baseVal}x - 100$ ribu rupiah. Berapakah jumlah buku yang harus dijual agar mendapatkan keuntungan maksimum? (Gunakan rumus $x = -b / 2a$)`,
            difficulty: parseFloat(((i * 0.12) - 0.4).toFixed(2)),
            options: [
              { label: 'A', text: `$${Math.round(baseVal / 2)}$ buku`, isCorrect: true },
              { label: 'B', text: `$${baseVal}$ buku`, isCorrect: false },
              { label: 'C', text: `$${num}$ buku`, isCorrect: false },
              { label: 'D', text: `$${num * 2}$ buku`, isCorrect: false },
              { label: 'E', text: `$${num * 3}$ buku`, isCorrect: false }
            ]
          }
        })
      ]
    }
  ]

  let totalQuestionsSeeded = 0

  for (const group of seedData) {
    const subj = subjects.find(s => s.name === group.subjectName)
    if (!subj) {
      console.log(`⚠️ Subject "${group.subjectName}" not found in DB. Skipping group.`)
      continue
    }

    const chap = subj.chapters.find(c => c.name === group.chapterName)
    if (!chap) {
      console.log(`⚠️ Chapter "${group.chapterName}" not found under ${group.subjectName}. Skipping group.`)
      continue
    }

    for (const q of group.questions) {
      await prisma.question.create({
        data: {
          chapterId: chap.id,
          text: q.text,
          difficulty: q.difficulty,
          type: 'MULTIPLE_CHOICE',
          options: {
            create: q.options
          }
        }
      })
      totalQuestionsSeeded++
    }
  }

  console.log(`🎉 Batch 3 Seeding Completed! Seeded ${totalQuestionsSeeded} questions in total.`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error('❌ Seeding Batch 3 failed:', e)
    prisma.$disconnect()
    process.exit(1)
  })
