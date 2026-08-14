import 'dotenv/config';
import { PrismaClient, UniType, Degree, Cluster } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedFromJson() {
  console.log('🚀 Memulai Seeding dari file ptn-majors-chancing.json...');
  
  try {
    const jsonPath = path.join(__dirname, '../pdf-parser/input/ptn-majors-chancing.json');
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const parsed = JSON.parse(rawData);
    
    const items = parsed.data;
    if (!items || !Array.isArray(items)) {
      throw new Error('Format JSON tidak sesuai. Diharapkan ada array di dalam property "data".');
    }
    
    console.log(`Berhasil membaca ${items.length} prodi dari JSON.`);
    
    // Bersihkan data lama
    await prisma.major.deleteMany({});
    await prisma.university.deleteMany({});
    
    let insertedMajors = 0;
    
    const uniMap = new Map();
    
    for (const item of items) {
      const major = item.major;
      const uni = major.university;
      
      let universityId = uniMap.get(uni.name);
      
      if (!universityId) {
        // Stable PTN Code (Ambil singkatan atau awal kata)
        const words = uni.name.replace(/[^a-zA-Z0-9 ]/g, '').split(' ');
        const ptnCode = words.length >= 2 ? (words[0].substring(0,2) + words[1].substring(0,3)).toUpperCase() : uni.name.substring(0, 5).toUpperCase();
        
        const university = await prisma.university.upsert({
          where: { name: uni.name },
          update: { logoUrl: uni.logoUrl },
          create: {
            code: ptnCode + Math.floor(Math.random() * 1000).toString(),
            name: uni.name,
            location: uni.location || 'Indonesia',
            type: uni.type === 'SWASTA' ? UniType.SWASTA : UniType.NEGERI,
            logoUrl: uni.logoUrl
          }
        });
        universityId = university.id;
        uniMap.set(uni.name, university.id);
      }
      
      const majorCode = `${major.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 5).toUpperCase()}-${Math.floor(Math.random() * 100000)}`;
      
      await prisma.major.create({
        data: {
          code: majorCode,
          name: major.name,
          universityId: universityId,
          faculty: major.faculty || 'Fakultas Umum',
          degree: (major.degree === 'D3' || major.degree === 'D4') ? major.degree : 'S1',
          quota: major.quota,
          applicants: major.applicants,
          estimatedScore: major.estimatedScore,
          cluster: (major.cluster === 'SAINTEK' || major.cluster === 'SOSHUM') ? major.cluster : 'CAMPURAN',
          year: new Date().getFullYear()
        }
      });
      insertedMajors++;
      
      if (insertedMajors % 50 === 0) {
        process.stdout.write(`\r✅ Inserted ${insertedMajors}/${items.length} prodi...`);
      }
    }
    
    console.log(`\n🎉 SELESAI! Berhasil menyuntikkan ${insertedMajors} prodi dari JSON ke Database!`);
    
  } catch (error) {
    console.error('\n❌ Terjadi kesalahan saat seeding dari JSON:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedFromJson();
