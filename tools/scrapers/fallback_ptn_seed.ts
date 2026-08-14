import 'dotenv/config';
import { PrismaClient, UniType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const TOP_PTN_DATA = [
  {
    code: '356', name: 'Universitas Gadjah Mada', location: 'Yogyakarta',
    majors: [
      { code: '3561011', name: 'Kedokteran', quota: 62, applicants: 3800, score: 750, cluster: 'SAINTEK', faculty: 'Fakultas Kedokteran' },
      { code: '3561026', name: 'Farmasi', quota: 84, applicants: 2100, score: 710, cluster: 'SAINTEK', faculty: 'Fakultas Farmasi' },
      { code: '3561034', name: 'Ilmu Komputer', quota: 28, applicants: 1800, score: 730, cluster: 'SAINTEK', faculty: 'FMIPA' },
      { code: '3562015', name: 'Ilmu Hukum', quota: 105, applicants: 3100, score: 720, cluster: 'SOSHUM', faculty: 'Fakultas Hukum' },
      { code: '3562023', name: 'Manajemen', quota: 45, applicants: 2800, score: 715, cluster: 'SOSHUM', faculty: 'FEB' },
      { code: '3562031', name: 'Akuntansi', quota: 45, applicants: 2500, score: 705, cluster: 'SOSHUM', faculty: 'FEB' },
      { code: '3562046', name: 'Psikologi', quota: 85, applicants: 3900, score: 735, cluster: 'SOSHUM', faculty: 'Fakultas Psikologi' },
    ]
  },
  {
    code: '321', name: 'Universitas Indonesia', location: 'Depok',
    majors: [
      { code: '3211012', name: 'Pendidikan Dokter', quota: 55, applicants: 3900, score: 760, cluster: 'SAINTEK', faculty: 'FK' },
      { code: '3211027', name: 'Ilmu Komputer', quota: 40, applicants: 2200, score: 745, cluster: 'SAINTEK', faculty: 'FASILKOM' },
      { code: '3211035', name: 'Sistem Informasi', quota: 40, applicants: 1900, score: 730, cluster: 'SAINTEK', faculty: 'FASILKOM' },
      { code: '3212013', name: 'Ilmu Hukum', quota: 95, applicants: 3300, score: 725, cluster: 'SOSHUM', faculty: 'FH' },
      { code: '3212021', name: 'Manajemen', quota: 65, applicants: 3000, score: 720, cluster: 'SOSHUM', faculty: 'FEB' },
      { code: '3212036', name: 'Ilmu Psikologi', quota: 70, applicants: 3500, score: 740, cluster: 'SOSHUM', faculty: 'FPsi' },
    ]
  },
  {
    code: '332', name: 'Institut Teknologi Bandung', location: 'Bandung',
    majors: [
      { code: '3321014', name: 'Sekolah Teknik Elektro dan Informatika (STEI) - Komputasi', quota: 120, applicants: 4500, score: 755, cluster: 'SAINTEK', faculty: 'STEI' },
      { code: '3321022', name: 'Fakultas Teknik Pertambangan dan Perminyakan (FTTM)', quota: 135, applicants: 3200, score: 730, cluster: 'SAINTEK', faculty: 'FTTM' },
      { code: '3322015', name: 'Sekolah Bisnis dan Manajemen (SBM)', quota: 85, applicants: 3800, score: 735, cluster: 'SOSHUM', faculty: 'SBM' },
    ]
  },
  {
    code: '355', name: 'Universitas Diponegoro', location: 'Semarang',
    majors: [
      { code: '3551016', name: 'Kedokteran', quota: 80, applicants: 3100, score: 725, cluster: 'SAINTEK', faculty: 'FK' },
      { code: '3551024', name: 'Kesehatan Masyarakat', quota: 110, applicants: 2500, score: 680, cluster: 'SAINTEK', faculty: 'FKM' },
      { code: '3552017', name: 'Ilmu Hukum', quota: 250, applicants: 3800, score: 690, cluster: 'SOSHUM', faculty: 'FH' },
      { code: '3552025', name: 'Manajemen', quota: 140, applicants: 3400, score: 695, cluster: 'SOSHUM', faculty: 'FEB' },
    ]
  },
  {
    code: '381', name: 'Universitas Airlangga', location: 'Surabaya',
    majors: [
      { code: '3811011', name: 'Kedokteran', quota: 75, applicants: 3300, score: 735, cluster: 'SAINTEK', faculty: 'FK' },
      { code: '3811026', name: 'Farmasi', quota: 90, applicants: 2200, score: 695, cluster: 'SAINTEK', faculty: 'FF' },
      { code: '3812012', name: 'Ilmu Komunikasi', quota: 60, applicants: 2400, score: 700, cluster: 'SOSHUM', faculty: 'FISIP' },
      { code: '3812027', name: 'Manajemen', quota: 80, applicants: 2700, score: 710, cluster: 'SOSHUM', faculty: 'FEB' },
    ]
  }
];

async function seedPTN() {
  console.log('🚀 Memulai Seeding Data PTN Realistis (Offline Fallback)...');
  
  try {
    // Bersihkan data lama agar tidak bentrok
    await prisma.major.deleteMany({});
    await prisma.university.deleteMany({});
    
    let insertedMajors = 0;
    
    for (const ptn of TOP_PTN_DATA) {
      console.log(`\n🏫 Memproses: ${ptn.name} (${ptn.code})`);
      
      const university = await prisma.university.upsert({
        where: { code: ptn.code },
        update: { name: ptn.name, location: ptn.location },
        create: {
          code: ptn.code,
          name: ptn.name,
          location: ptn.location,
          type: UniType.NEGERI
        }
      });
      
      for (const major of ptn.majors) {
        await prisma.major.upsert({
          where: { code: major.code },
          update: {
            name: major.name,
            quota: major.quota,
            applicants: major.applicants,
            estimatedScore: major.score,
            cluster: major.cluster as 'SAINTEK' | 'SOSHUM' | 'CAMPURAN',
            faculty: major.faculty
          },
          create: {
            code: major.code,
            name: major.name,
            universityId: university.id,
            faculty: major.faculty,
            degree: 'S1',
            quota: major.quota,
            applicants: major.applicants,
            estimatedScore: major.score,
            cluster: major.cluster as 'SAINTEK' | 'SOSHUM' | 'CAMPURAN',
            year: new Date().getFullYear()
          }
        });
        insertedMajors++;
      }
      console.log(`   └─ ✅ Menyimpan ${ptn.majors.length} prodi.`);
    }
    
    console.log(`\n🎉 SELESAI! Berhasil menyuntikkan ${TOP_PTN_DATA.length} Universitas dan ${insertedMajors} Prodi favorit ke Database!`);
    
  } catch (error) {
    console.error('❌ Terjadi kesalahan saat seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPTN();
