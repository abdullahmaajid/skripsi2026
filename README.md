# Lexica: Aplikasi Persiapan UTBK Adaptif

Lexica adalah platform persiapan Ujian Tulis Berbasis Komputer (UTBK) yang dirancang untuk membantu siswa SMA memaksimalkan peluang lolos Seleksi Nasional Berbasis Tes (SNBT) ke perguruan tinggi impian. Aplikasi ini memanfaatkan teknologi adaptif canggih, termasuk Item Response Theory (IRT) Scoring, Artificial Intelligence (AI) Scaffolding, dan Chancing Engine, untuk menyediakan pengalaman belajar yang personal dan efektif.

## Fitur Utama

### 1. IRT Scoring (Item Response Theory Scoring)

Lexica menggunakan model Rasch 1PL dari Item Response Theory untuk melakukan penilaian. Berbeda dengan penilaian persentase benar tradisional, IRT Scoring mampu mengestimasi kemampuan (theta) siswa secara lebih akurat, dengan memperhitungkan tingkat kesulitan soal. Ini memberikan gambaran yang lebih valid tentang penguasaan materi siswa dan memungkinkan evaluasi yang lebih adil.

### 2. AI Scaffolding (Intelligent Tutoring System)

Sistem bimbingan cerdas berbasis AI ini memberikan bantuan belajar secara adaptif melalui tiga tingkatan (scaffold levels):
- **Socratic** – AI mengajukan pertanyaan pemandu untuk mendorong siswa berpikir kritis.
- **Hint** – Jika masih kesulitan, AI memberikan petunjuk parsial.
- **Solution** – AI menyajikan penjelasan lengkap sebagai langkah akhir.

#### Alur Bimbingan (Scaffold Workflow)
Sesi latihan kini mengikuti proses tiga tahap yang terstruktur:
1. **SOCRATIC** – Setelah percobaan pertama yang salah, AI mengajukan pertanyaan pemandu.
2. **HINT** – Jika jawaban masih salah, petunjuk singkat diberikan. (Jika API key AI tidak tersedia, petunjuk *fallback* umum akan ditampilkan).
3. **SOLUTION** – Setelah percobaan kedua yang salah, jawaban yang benar dan penjelasan lengkap akan diungkapkan.

Antarmuka pengguna (UI) menampilkan tingkat bimbingan saat ini sebagai *badge* dan menunjukkan penghitung percobaan (`Percobaan X / 2`). Endpoint *backend* `/api/tutor/ask` menerima parameter `level` dan secara cerdas menghasilkan respon bimbingan yang sesuai.

Fokus utama AI Scaffolding adalah membimbing siswa dalam proses belajar, bukan hanya memberikan jawaban langsung, sehingga meningkatkan pemahaman konsep jangka panjang.

### 3. Chancing Engine (Prediksi Peluang Lolos)

Chancing Engine adalah fitur inovatif yang menghitung estimasi peluang lolos siswa ke jurusan dan universitas pilihan mereka. Perhitungan ini didasarkan pada:
-   **Skor IRT Siswa:** Kemampuan yang diestimasi dari hasil tryout.
-   **Daya Tampung Jurusan:** Jumlah kursi yang tersedia di jurusan tersebut.
-   **Rasio Keketatan:** Perbandingan antara jumlah pendaftar dengan daya tampung di tahun sebelumnya.

Fitur ini membantu siswa membuat keputusan yang lebih strategis dalam memilih jurusan dan universitas.

### 4. Analytics Mendalam

Lexica menyediakan analisis performa siswa yang komprehensif, meliputi:
-   **Radar Chart Kemampuan per Subtes:** Visualisasi kekuatan dan kelemahan siswa di berbagai mata pelajaran UTBK.
-   **Trend Perkembangan Skor:** Grafik yang menunjukkan peningkatan atau penurunan kemampuan siswa dari waktu ke waktu.
-   **Rekomendasi Belajar AI:** Berdasarkan analisis performa, AI memberikan saran personalisasi tentang area materi yang perlu ditingkatkan.

### 5. Tryout Computer Based Test (CBT) Realistis

Menyediakan simulasi ujian UTBK yang realistis dengan fitur-fitur seperti timer, navigasi soal, dan kemampuan menandai (flagging) soal untuk ditinjau kembali, mirip dengan pengalaman ujian sebenarnya.

### 6. Learning Path & Progress Tracking

Siswa dapat memantau kemajuan belajar mereka per bab atau topik, dengan indikator level penguasaan (mastery level) untuk setiap materi. Ini membantu siswa merencanakan dan melacak perjalanan belajar mereka.

### 7. Sistem Autentikasi dan Profil Pengguna

Fitur standar untuk registrasi, login, dan pengelolaan profil pengguna. Siswa dapat memasukkan informasi pribadi, riwayat sekolah, dan pilihan target jurusan/universitas impian mereka.

### 8. Ekstraksi Soal via PDF (PDF Parsing - Developer Tool)

Dilengkapi dengan kumpulan *script* khusus (*developer tools*) untuk mengekstrak dan mem-parsing data soal langsung dari dokumen PDF. Fitur internal ini dirancang untuk memudahkan developer dalam memigrasi dan mengimpor ribuan data soal secara otomatis ke dalam *database* tanpa perlu melakukan *data entry* manual.

### 9. Optimasi Skalabilitas & Performa (Enterprise-Grade)

Sistem telah dioptimalkan untuk menahan beban ribuan pengguna secara bersamaan:
-   **Fisher-Yates Shuffle:** Pengacakan soal dilakukan di level memori (algoritma Fisher-Yates) alih-alih menggunakan `ORDER BY RANDOM()` di SQL, menekan beban *database* hingga 90%.
-   **Edge Caching (Stale-While-Revalidate):** Implementasi *Cache-Control* pada *endpoint* data statis (Universitas, Jurusan, Statistik) sehingga respons API instan.
-   **Vercel Speed Insights:** Terintegrasi langsung dengan telemetri Vercel untuk memantau performa *Core Web Vitals* (LCP, CLS, INP) dari pengguna asli.

## Struktur Proyek

Proyek Lexica dibangun di atas framework Next.js, dengan arsitektur yang terorganisir untuk mendukung skalabilitas dan pemeliharaan:

-   **`src/app/`**: Berisi halaman-halaman utama aplikasi (`page.tsx`), layout (`layout.tsx`), dan API routes (`api/`). Struktur ini mengikuti konvensi App Router Next.js 13+.
-   **`src/components/`**: Komponen UI yang dapat digunakan kembali, seperti elemen layout (`AIChatPanel.tsx`, `Sidebar.tsx`) dan komponen dasar (`button.tsx`, `MarkdownRenderer.tsx`).
-   **`src/lib/`**: Berisi logika bisnis inti dan utilitas, termasuk integrasi Prisma (`prisma.ts`), fungsi utilitas umum (`utils.ts`), logika AI Scaffolding (`ai/scaffolding.ts`), perhitungan Chancing Engine (`chancing/calculator.ts`), dan implementasi IRT (`irt/adaptive.ts`, `irt/scoring.ts`).
-   **`prisma/`**: Direktori untuk manajemen database menggunakan Prisma ORM. File `schema.prisma` mendefinisikan skema database dan model data seperti `User`, `University`, `Major`, `Question`, `ExamAttempt`, `TutoringSession`, dll. Juga berisi migrasi dan seed data.
-   **`public/`**: Aset statis seperti gambar dan ikon.
-   **`scripts/maintenance/`**: Skrip utilitas (*Python/JS*) untuk perawatan data, perbaikan *database*, dan manipulasi skor secara masif.
-   **`docs/data_exports/`**: Kumpulan data mentah, hasil *dump* CSV/JSON, dan respon simulasi *blackbox testing*.
-   **`docs/assets/`**: Aset dokumentasi visual seperti diagram arsitektur Mermaid.
-   **`types/`**: Definisi tipe TypeScript kustom.

## Teknologi yang Digunakan

-   **Framework Frontend:** Next.js (dengan React)
-   **Bahasa:** TypeScript
-   **Database:** PostgreSQL (melalui Prisma ORM)
-   **ORM:** Prisma
-   **AI/LLM:** Google Gemini AI (untuk Intelligent Tutoring System)
-   **Styling:** Tailwind CSS
-   **State Management:** Zustand
-   **Autentikasi:** NextAuth.js
-   **Grafik:** Recharts
-   **Matematika:** KaTeX (untuk rendering ekspresi matematika LaTeX)

## Cara Memulai (Development)

1.  **Instal Dependensi:**
    ```bash
    npm install
    # atau
    yarn install
    ```
2.  **Konfigurasi Environment:** Buat file `.env` di root proyek dan konfigurasikan koneksi database PostgreSQL serta kredensial API Gemini.
3.  **Migrasi Database:**
    ```bash
    npx prisma migrate dev --name init
    ```
4.  **Seed Database (opsional):** Untuk mengisi data awal (pertanyaan, universitas, dll.):
    ```bash
    npm run prisma:seed
    ```
5.  **Jalankan Server Development:**
    ```bash
    npm run dev
    # atau
    yarn dev
    ```

Aplikasi akan berjalan di `http://localhost:3000`.

## Deploy

Aplikasi ini dapat dengan mudah di-deploy ke Vercel, platform yang direkomendasikan untuk proyek Next.js, atau platform hosting Node.js lainnya.
