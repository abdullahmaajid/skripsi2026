import 'dotenv/config';
import puppeteer from 'puppeteer';
import { PrismaClient, UniType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Konfigurasi URL SNPMB (bisa disesuaikan dengan portal yang aktif)
const BASE_URL = 'https://sidata-ptn-snpmb.bppp.kemdikbud.go.id';

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapePTN() {
  console.log('🚀 Memulai Scraper SIDATA SNPMB 100% Lengkap...');
  
  // Puppeteer digunakan untuk bypass client-side rendering (SPA)
  const browser = await puppeteer.launch({
    headless: true, // Ubah ke false jika ingin melihat prosesnya di layar
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Fix untuk error dlopen macOS ARM64
    acceptInsecureCerts: true, // Mengabaikan error SSL/Sertifikat yang sering terjadi di situs pemerintah
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list']
  });
  
  const page = await browser.newPage();
  // Set User-Agent layaknya browser asli agar tidak diblokir firewall
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  try {
    console.log('🌐 Mengakses Halaman Utama PTN SNBT...');
    // Pindah ke ptn_sb.php (Kode untuk SNBT/SBMPTN)
    await page.goto(`${BASE_URL}/ptn_sb.php?ptn=0`, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Tunggu tabel daftar PTN muncul di DOM
    await page.waitForSelector('table.table-striped', { timeout: 15000 });
    
    // Ekstrak daftar semua PTN se-Indonesia
    const ptnList = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table.table-striped tbody tr'));
      return rows.map(row => {
        const cells = row.querySelectorAll('td');
        const linkElem = cells[2]?.querySelector('a');
        return {
          code: cells[1]?.textContent?.trim() || '',
          name: cells[2]?.textContent?.trim() || '',
          link: linkElem ? linkElem.getAttribute('href') : null
        };
      }).filter(ptn => ptn.code && ptn.link); // Pastikan hanya baris yang punya URL
    });
    
    console.log(`✅ Berhasil menemukan ${ptnList.length} Universitas.`);
    
    // Loop setiap PTN untuk masuk ke halaman detailnya (mengambil Prodi)
    for (let i = 0; i < ptnList.length; i++) {
      const ptn = ptnList[i];
      console.log(`\n🏫 [${i+1}/${ptnList.length}] Memproses: ${ptn.name} (${ptn.code})`);
      
      // Upsert University ke Database kita
      const university = await prisma.university.upsert({
        where: { code: ptn.code },
        update: { name: ptn.name },
        create: {
          code: ptn.code,
          name: ptn.name,
          location: 'Indonesia', // Lokasi default (bisa diedit di admin)
          type: UniType.NEGERI
        }
      });
      
      // Kunjungi halaman detail PTN tersebut
      await page.goto(`${BASE_URL}/${ptn.link}`, { waitUntil: 'networkidle2', timeout: 60000 });
      
      // Ambil daftar prodi dari tabel (Biasanya formatnya: No | Kode | Nama | Jenjang | Daya Tampung | Peminat)
      const majors = await page.evaluate(() => {
        const majorRows = Array.from(document.querySelectorAll('table.table-hover tbody tr'));
        return majorRows.map(row => {
          const cells = row.querySelectorAll('td');
          if (cells.length < 5) return null; // Skip jika bukan baris prodi
          
          return {
            code: cells[1]?.textContent?.trim() || '',
            name: cells[2]?.textContent?.trim() || '',
            degree: cells[3]?.textContent?.trim() || 'S1',
            quota: parseInt(cells[4]?.textContent?.trim() || '0', 10),
            applicants: parseInt(cells[5]?.textContent?.trim() || '0', 10)
          };
        }).filter(m => m !== null && m.code !== '');
      });
      
      console.log(`   └─ Ditemukan ${majors.length} Program Studi.`);
      
      let insertedMajors = 0;
      for (const major of majors) {
        if (!major) continue;
        
        // 1. Klasifikasi Cluster (Rumpun) secara Regex Otomatis
        let cluster: 'SAINTEK' | 'SOSHUM' | 'CAMPURAN' = 'CAMPURAN';
        const lowerName = major.name.toLowerCase();
        if (lowerName.includes('teknik') || lowerName.includes('kedokteran') || lowerName.includes('sains') || lowerName.includes('matematika') || lowerName.includes('farmasi')) {
           cluster = 'SAINTEK';
        } else if (lowerName.includes('hukum') || lowerName.includes('sastra') || lowerName.includes('ekonomi') || lowerName.includes('manajemen') || lowerName.includes('akuntansi')) {
           cluster = 'SOSHUM';
        }
        
        // 2. Kalkulasi Estimasi Skor Kasar (Berdasarkan Keketatan)
        const ratio = major.quota > 0 ? (major.applicants / major.quota) : 0;
        let estScore = 550; // Base score (Aman minimum)
        if (ratio > 50) estScore = Math.floor(Math.random() * (800 - 730 + 1) + 730); // 730 - 800
        else if (ratio > 30) estScore = Math.floor(Math.random() * (729 - 680 + 1) + 680); // 680 - 729
        else if (ratio > 15) estScore = Math.floor(Math.random() * (679 - 620 + 1) + 620); // 620 - 679
        else if (ratio > 5) estScore = Math.floor(Math.random() * (619 - 580 + 1) + 580);  // 580 - 619
        
        // 3. Simpan ke Database (Upsert)
        await prisma.major.upsert({
          where: { code: major.code },
          update: {
            name: major.name,
            quota: major.quota,
            applicants: major.applicants,
            estimatedScore: estScore // Update skor jika ada perubahan ketat
          },
          create: {
            code: major.code,
            name: major.name,
            universityId: university.id,
            faculty: 'Fakultas Belum Diketahui', // Bisa diedit di admin panel
            degree: (major.degree === 'D3' || major.degree === 'D4') ? major.degree : 'S1',
            quota: major.quota,
            applicants: major.applicants,
            estimatedScore: estScore,
            cluster: cluster,
            year: new Date().getFullYear() // Gunakan tahun sekarang
          }
        });
        insertedMajors++;
      }
      console.log(`   └─ ✅ Berhasil menyimpan ${insertedMajors} prodi ke database.`);
      
      // Delay 3 detik agar tidak dianggap sebagai serangan DDoS oleh firewall SNPMB
      await delay(3000); 
    }
    
    console.log('\n🎉 PROSES SCRAPING KAMPUS & PRODI 100% SELESAI!');
    
  } catch (error) {
    console.error('❌ Terjadi kesalahan saat scraping:', error);
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
}

scrapePTN();
