import 'dotenv/config';
import { PrismaClient, Cluster } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedTryouts() {
  console.log('🚀 Memulai Restrukturisasi Sistem Tryout...');

  try {
    // 1. Bersihkan Data Lama
    console.log('🧹 Menghapus ExamAttempt & ExamTemplate lama...');
    await prisma.examAttempt.deleteMany({});
    await prisma.examTemplate.deleteMany({});
    
    // 2. Dapatkan 7 Subject Resmi UTBK
    const subjects = await prisma.subject.findMany();
    const subMap: Record<string, string> = {};
    for (const sub of subjects) {
      if (sub.name === 'Penalaran Umum') subMap['PU'] = sub.id;
      if (sub.name === 'Pengetahuan Kuantitatif') subMap['PK'] = sub.id;
      if (sub.name === 'Pemahaman Bacaan dan Menulis') subMap['PBM'] = sub.id;
      if (sub.name === 'Pengetahuan dan Pemahaman Umum') subMap['PPU'] = sub.id;
      if (sub.name === 'Literasi Bahasa Indonesia') subMap['LBI'] = sub.id;
      if (sub.name === 'Literasi Bahasa Inggris') subMap['LBING'] = sub.id;
      if (sub.name === 'Penalaran Matematika') subMap['PM'] = sub.id;
    }
    
    // Pastikan 7 subtes utama ada
    const requiredCodes = ['PU', 'PPU', 'PBM', 'PK', 'LBI', 'LBING', 'PM'];
    for (const code of requiredCodes) {
      if (!subMap[code]) {
        throw new Error(`Subject dengan kode ${code} tidak ditemukan di database!`);
      }
    }

    console.log('✅ Subject IDs berhasil dimuat.');

    // Helper untuk membuat section
    const createSection = (subjectCode: string, itemCount: number, duration: number, order: number) => {
      return {
        subjectId: subMap[subjectCode],
        itemCount,
        duration,
        order
      };
    };

    // ==========================================
    // 1. Uji Diagnosa (Singkat)
    // ==========================================
    console.log('🛠️ Membuat Uji Diagnosa...');
    await prisma.examTemplate.create({
      data: {
        name: 'Uji Diagnosa Awal',
        description: 'Uji singkat 7 subtes (10 soal per subtes) untuk mengetahui baseline kemampuan awalmu.',
        duration: 70, // 7 subtes x 10 menit
        totalItems: 70, // 7 subtes x 10 soal
        cluster: Cluster.CAMPURAN,
        isDiagnostic: true,
        sections: {
          create: [
            createSection('PU', 10, 10, 1),
            createSection('PPU', 10, 10, 2),
            createSection('PBM', 10, 10, 3),
            createSection('PK', 10, 10, 4),
            createSection('LBI', 10, 10, 5),
            createSection('LBING', 10, 10, 6),
            createSection('PM', 10, 10, 7)
          ]
        }
      }
    });

    // ==========================================
    // 2. Tryout 1: Pemanasan
    // ==========================================
    console.log('🛠️ Membuat Tryout 1 (Pemanasan)...');
    await prisma.examTemplate.create({
      data: {
        name: 'Try Out SNBT #1 (Pemanasan)',
        description: 'Tryout pemanasan dengan jumlah soal sedikit dikurangi agar kamu beradaptasi dengan sistem ujian.',
        duration: 130, // Ringan
        totalItems: 105,
        cluster: Cluster.CAMPURAN,
        isDiagnostic: false,
        sections: {
          create: [
            createSection('PU', 20, 20, 1),
            createSection('PK', 15, 20, 2),
            createSection('PPU', 15, 15, 3),
            createSection('PBM', 15, 20, 4),
            createSection('LBI', 20, 30, 5),
            createSection('LBING', 10, 15, 6),
            createSection('PM', 10, 10, 7)
          ]
        }
      }
    });

    // ==========================================
    // 3. Tryout 2: Fokus Skolastik
    // ==========================================
    console.log('🛠️ Membuat Tryout 2 (Fokus Skolastik)...');
    await prisma.examTemplate.create({
      data: {
        name: 'Try Out SNBT #2 (Fokus Skolastik)',
        description: 'Porsi soal PU, PK, PPU, dan PBM lebih padat untuk memperkuat fondasi dasar logikamu.',
        duration: 155,
        totalItems: 125,
        cluster: Cluster.CAMPURAN,
        isDiagnostic: false,
        sections: {
          create: [
            createSection('PU', 30, 30, 1), // Max PU
            createSection('PK', 20, 30, 2), // Max PK
            createSection('PPU', 20, 20, 3), // Max PPU
            createSection('PBM', 20, 25, 4), // Max PBM
            createSection('LBI', 15, 25, 5),
            createSection('LBING', 10, 15, 6),
            createSection('PM', 10, 10, 7)
          ]
        }
      }
    });

    // ==========================================
    // 4. Tryout 3: Fokus Literasi
    // ==========================================
    console.log('🛠️ Membuat Tryout 3 (Fokus Literasi)...');
    await prisma.examTemplate.create({
      data: {
        name: 'Try Out SNBT #3 (Fokus Literasi)',
        description: 'Latih kesabaran membacamu! Porsi Literasi (B.Indo, B.Inggris) dan PM dimaksimalkan.',
        duration: 165,
        totalItems: 125,
        cluster: Cluster.CAMPURAN,
        isDiagnostic: false,
        sections: {
          create: [
            createSection('PU', 15, 15, 1), 
            createSection('PK', 10, 15, 2),
            createSection('PPU', 15, 15, 3),
            createSection('PBM', 15, 15, 4),
            createSection('LBI', 30, 45, 5), // Max LBI
            createSection('LBING', 20, 30, 6), // Max LBING
            createSection('PM', 20, 30, 7)    // Max PM
          ]
        }
      }
    });

    // ==========================================
    // 5. Tryout 4: HOTS & Time Pressure
    // ==========================================
    console.log('🛠️ Membuat Tryout 4 (HOTS Mode)...');
    await prisma.examTemplate.create({
      data: {
        name: 'Try Out SNBT #4 (HOTS & Time Pressure)',
        description: 'Waktu pengerjaan per subtes dikurangi 20%. Uji mental dan manajemen waktumu di bawah tekanan ekstrim!',
        duration: 156, // 195 - 20% = 156
        totalItems: 155, // Full Items
        cluster: Cluster.CAMPURAN,
        isDiagnostic: false,
        sections: {
          create: [
            createSection('PU', 30, 24, 1),
            createSection('PK', 15, 16, 2),
            createSection('PBM', 20, 20, 3),
            createSection('PPU', 20, 12, 4),
            createSection('LBI', 30, 36, 5),
            createSection('LBING', 20, 24, 6),
            createSection('PM', 20, 24, 7)
          ]
        }
      }
    });

    // ==========================================
    // 6. Tryout 5: Grand Tryout / Simulasi Akhir
    // ==========================================
    console.log('🛠️ Membuat Tryout 5 (Simulasi Akhir)...');
    await prisma.examTemplate.create({
      data: {
        name: 'Try Out SNBT #5 (Grand Tryout)',
        description: 'Simulasi 100% format asli SNBT Kemdikbud. Total 155 soal, durasi 195 menit. Kerjakan dengan serius!',
        duration: 195,
        totalItems: 155,
        cluster: Cluster.CAMPURAN,
        isDiagnostic: false,
        sections: {
          create: [
            createSection('PU', 30, 30, 1),
            createSection('PK', 15, 20, 2),
            createSection('PBM', 20, 25, 3),
            createSection('PPU', 20, 15, 4),
            createSection('LBI', 30, 45, 5),
            createSection('LBING', 20, 30, 6),
            createSection('PM', 20, 30, 7)
          ]
        }
      }
    });

    console.log('\n🎉 PROSES RESTRUKTURISASI TRYOUT SELESAI!');
    console.log('Semua 6 Tryout (termasuk Uji Diagnosa) telah berhasil dibuat dan dikonfigurasi variatif.');

  } catch (error) {
    console.error('❌ Terjadi kesalahan saat membuat Tryout:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedTryouts();
