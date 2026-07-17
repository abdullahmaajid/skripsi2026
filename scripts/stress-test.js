const autocannon = require('autocannon');
const fs = require('fs');
const path = require('path');

// 1. SILAKAN GANTI COOKIE INI DENGAN COOKIE ANDA
const MY_COOKIE = "authjs.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiMjAzcXhWQ05YbmJ2Z180bHlnZkdaa3BQVlZydUhXVmtnc3hwcTl5Y3A5ZU9NMnA3aXFGRnd3WUwxWktrZzN5QVB0UWY4ZldOelkzcW9kVWpGY3JTLXcifQ..s0r-WDrkfAVy0lRUhExA2w.sE_x1-OhXob6qV9snNYaV48URZ65JMz5dusRuDu2yuM_oS1bxbsH4qAinRVIT8_y8qaFl5EjoAd20cSIdv6iY6eKoVQPh-CY-3kSS5WG2EAEjF5jZbxMjyOL-ZDo36HgSzIU64YQ70KP9AaFDoNCIz06ck1ZRJBoFWJAXWja1m1GvEGhVNOTfxV-z4gsJXw8H7XL6bF-P4SUqGx5b5OKcTNcvJDvmT_NsH7FAqOqyBAUX15z8UjTyWaDMI6MaBSwN4FV8ZtorStRiJo77AR57Q.NUYqSV1iWcwkP2qa7AROs-WqRs2l00H4uhy9IjCB_6s";

// 2. GANTI URL INI DENGAN ENDPOINT YANG MAU DITEST
const TARGET_URL = 'http://localhost:3000/api/profile';

async function runTest() {
  console.log(`🚀 Memulai Stress Test pada ${TARGET_URL}...`);
  console.log(`Mensimulasikan 35 user bersamaan selama 10 detik...`);

  const result = await autocannon({
    url: TARGET_URL,
    connections: 35,
    duration: 10,
    headers: {
      cookie: MY_COOKIE
    }
  });

  console.log('✅ Tes selesai! Menyusun laporan...');

  // Membuat Laporan Format Markdown
  const reportDate = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  const report = `
# Laporan Stress Test Performa
**Tanggal:** ${new Date().toLocaleString('id-ID')}
**Target URL:** \`${result.url}\`
**Jumlah Koneksi Bersamaan:** ${result.connections} User
**Durasi Tes:** ${result.duration} Detik

---

## 📊 Hasil Utama
- **Total Request Berhasil:** ${result.requests.total} kali
- **Total Error / Timeout:** ${result.errors} kali (Sempurna jika 0)
- **Total Data Ditransfer:** ${(result.throughput.total / 1024 / 1024).toFixed(2)} MB

## ⚡ Kecepatan Server (Latency)
Berapa lama waktu yang dibutuhkan server untuk membalas? (Lebih kecil lebih baik)
- **Rata-rata (Average):** ${result.latency.average} ms
- **Paling Cepat (Min):** ${result.latency.min} ms
- **Paling Lambat (Max):** ${result.latency.max} ms
- **P99 (Kondisi 1% Terburuk):** ${result.latency.p99} ms

## 💪 Kekuatan Angkat (Throughput)
Seberapa banyak server bisa melayani request dalam satu detik? (Lebih besar lebih kuat)
- **Rata-rata:** ${result.requests.average} Request / Detik
- **Tertinggi (Max):** ${result.requests.max} Request / Detik

---
*Laporan dibuat secara otomatis oleh skrip Stress Test UTBK App.*
`;

  // Pastikan folder reports ada
  const reportsDir = path.join(__dirname, '..', 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
  }

  // Simpan Laporan
  const fileName = `stress-test-${reportDate}.md`;
  const filePath = path.join(reportsDir, fileName);
  fs.writeFileSync(filePath, report.trim());

  console.log(`📄 Laporan berhasil disimpan di: reports/${fileName}`);
  console.log(`Silakan buka file tersebut untuk membaca hasil tesnya!`);
}

runTest().catch(console.error);
