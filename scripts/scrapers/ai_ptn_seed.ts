import 'dotenv/config';
import { PrismaClient, UniType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Base Data PTN Top (50 PTN)
const TOP_PTNS = [
  "Universitas Gadjah Mada", "Universitas Indonesia", "Institut Teknologi Bandung", "Universitas Airlangga", "Universitas Diponegoro",
  "Institut Pertanian Bogor", "Institut Teknologi Sepuluh Nopember", "Universitas Brawijaya", "Universitas Padjadjaran", "Universitas Hasanuddin",
  "Universitas Sebelas Maret", "Universitas Sumatera Utara", "Universitas Andalas", "Universitas Sriwijaya", "Universitas Pendidikan Indonesia",
  "Universitas Negeri Malang", "Universitas Negeri Yogyakarta", "Universitas Negeri Semarang", "Universitas Negeri Surabaya", "Universitas Negeri Padang",
  "Universitas Negeri Makassar", "Universitas Syiah Kuala", "Universitas Jember", "Universitas Lampung", "Universitas Riau",
  "Universitas Tanjungpura", "Universitas Lambung Mangkurat", "Universitas Mulawarman", "Universitas Udayana", "Universitas Mataram",
  "Universitas Nusa Cendana", "Universitas Pattimura", "Universitas Cenderawasih", "Universitas Halu Oleo", "Universitas Tadulako",
  "Universitas Sam Ratulangi", "Universitas Jenderal Soedirman", "Universitas Bengkulu", "Universitas Jambi", "Universitas Palangka Raya",
  "UIN Syarif Hidayatullah", "UIN Sunan Kalijaga", "UIN Maulana Malik Ibrahim", "UIN Sunan Ampel", "UIN Walisongo",
  "UIN Sunan Gunung Djati", "Universitas Terbuka", "Universitas Trunojoyo", "Universitas Khairun", "Universitas Papua"
];

// Base Data Jurusan Realistis
const SAINTEK_MAJORS = [
  { name: "Kedokteran", quotaRange: [40, 150], applicantRange: [2000, 4000], faculty: "Fakultas Kedokteran" },
  { name: "Farmasi", quotaRange: [50, 120], applicantRange: [1500, 3000], faculty: "Fakultas Farmasi" },
  { name: "Ilmu Komputer", quotaRange: [40, 100], applicantRange: [1800, 3500], faculty: "FASILKOM / FMIPA" },
  { name: "Sistem Informasi", quotaRange: [50, 120], applicantRange: [1500, 2800], faculty: "FASILKOM / FMIPA" },
  { name: "Teknik Informatika", quotaRange: [60, 150], applicantRange: [2500, 4500], faculty: "Fakultas Teknik" },
  { name: "Kesehatan Masyarakat", quotaRange: [80, 200], applicantRange: [1000, 2500], faculty: "FKM" },
  { name: "Teknik Sipil", quotaRange: [70, 180], applicantRange: [1200, 2800], faculty: "Fakultas Teknik" },
  { name: "Teknik Industri", quotaRange: [60, 150], applicantRange: [1500, 3000], faculty: "Fakultas Teknik" },
  { name: "Arsitektur", quotaRange: [40, 100], applicantRange: [1000, 2200], faculty: "Fakultas Teknik" },
  { name: "Matematika", quotaRange: [50, 120], applicantRange: [500, 1500], faculty: "FMIPA" },
  { name: "Statistika", quotaRange: [40, 90], applicantRange: [800, 2000], faculty: "FMIPA" },
  { name: "Agribisnis", quotaRange: [70, 150], applicantRange: [1000, 2500], faculty: "Fakultas Pertanian" },
];

const SOSHUM_MAJORS = [
  { name: "Ilmu Hukum", quotaRange: [100, 400], applicantRange: [2500, 5000], faculty: "Fakultas Hukum" },
  { name: "Manajemen", quotaRange: [80, 250], applicantRange: [3000, 6000], faculty: "FEB" },
  { name: "Akuntansi", quotaRange: [80, 200], applicantRange: [2000, 4500], faculty: "FEB" },
  { name: "Psikologi", quotaRange: [70, 200], applicantRange: [2500, 5500], faculty: "Fakultas Psikologi" },
  { name: "Ilmu Komunikasi", quotaRange: [60, 180], applicantRange: [2000, 4500], faculty: "FISIP" },
  { name: "Hubungan Internasional", quotaRange: [40, 120], applicantRange: [1500, 3500], faculty: "FISIP" },
  { name: "Administrasi Bisnis", quotaRange: [60, 150], applicantRange: [1200, 3000], faculty: "FIA / FISIP" },
  { name: "Administrasi Publik", quotaRange: [60, 150], applicantRange: [1000, 2500], faculty: "FIA / FISIP" },
  { name: "Sastra Inggris", quotaRange: [50, 120], applicantRange: [800, 2000], faculty: "FIB" },
  { name: "Ilmu Politik", quotaRange: [40, 100], applicantRange: [600, 1800], faculty: "FISIP" },
  { name: "Sosiologi", quotaRange: [50, 120], applicantRange: [500, 1500], faculty: "FISIP" },
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateScore(quota: number, applicants: number) {
  const ratio = quota > 0 ? (applicants / quota) : 0;
  if (ratio > 40) return getRandomInt(730, 780);
  if (ratio > 25) return getRandomInt(690, 729);
  if (ratio > 15) return getRandomInt(650, 689);
  if (ratio > 8) return getRandomInt(600, 649);
  return getRandomInt(550, 599);
}

async function seedAIGenerated() {
  console.log(`🚀 Memulai AI Seeder: Membuat 50 PTN dan 500+ Prodi secara instan...`);
  
  try {
    // Bersihkan data lama
    await prisma.major.deleteMany({});
    await prisma.university.deleteMany({});
    
    let totalMajors = 0;
    
    for (let i = 0; i < TOP_PTNS.length; i++) {
      const ptnName = TOP_PTNS[i];
      const ptnCode = `1${i.toString().padStart(3, '0')}`; // Kode dummy
      
      const university = await prisma.university.create({
        data: {
          code: ptnCode,
          name: ptnName,
          location: 'Indonesia',
          type: UniType.NEGERI
        }
      });
      
      // Pilih 5-7 jurusan Saintek dan 5-7 jurusan Soshum secara acak (10-14 prodi per PTN)
      const selectedSaintek = [...SAINTEK_MAJORS].sort(() => 0.5 - Math.random()).slice(0, getRandomInt(5, 7));
      const selectedSoshum = [...SOSHUM_MAJORS].sort(() => 0.5 - Math.random()).slice(0, getRandomInt(5, 7));
      const allSelectedMajors = [
        ...selectedSaintek.map(m => ({ ...m, cluster: 'SAINTEK' })),
        ...selectedSoshum.map(m => ({ ...m, cluster: 'SOSHUM' }))
      ];
      
      for (let j = 0; j < allSelectedMajors.length; j++) {
        const major = allSelectedMajors[j];
        const majorCode = `${ptnCode}${j.toString().padStart(3, '0')}`;
        const quota = getRandomInt(major.quotaRange[0], major.quotaRange[1]);
        const applicants = getRandomInt(major.applicantRange[0], major.applicantRange[1]);
        const score = calculateScore(quota, applicants);
        
        await prisma.major.create({
          data: {
            code: majorCode,
            name: major.name,
            universityId: university.id,
            faculty: major.faculty,
            degree: 'S1',
            quota: quota,
            applicants: applicants,
            estimatedScore: score,
            cluster: major.cluster as 'SAINTEK' | 'SOSHUM',
            year: new Date().getFullYear()
          }
        });
        totalMajors++;
      }
      
      process.stdout.write(`\r✅ Berhasil membuat ${i+1}/50 PTN... (Total Prodi: ${totalMajors})`);
    }
    
    console.log(`\n🎉 SELESAI! Berhasil meng-generate ${TOP_PTNS.length} PTN dengan ${totalMajors} Prodi realistis ke Database!`);
    
  } catch (error) {
    console.error('\n❌ Terjadi kesalahan saat AI Seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAIGenerated();
