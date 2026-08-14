# Dokumentasi Rute Aplikasi (Lexica UTBK)

Dokumen ini merangkum seluruh daftar rute (*route URLs*) yang digunakan dalam sistem berbasis **Next.js App Router** (`src/app`). Terdapat **30 rute utama** yang terbagi menjadi 3 bagian: Rute Publik/Autentikasi, Rute Admin, dan Rute Siswa.

---

## 1. Rute Publik & Autentikasi
Rute ini dapat diakses tanpa hak akses khusus atau digunakan sebagai gerbang masuk ke dalam sistem.

| Rute URL | Fungsi / Tujuan |
|---|---|
| `/` | **Landing Page**: Halaman utama publik untuk memperkenalkan fitur aplikasi dan portal pendaftaran awal. |
| `/auth/login` | **Halaman Login**: Halaman autentikasi untuk Siswa maupun Admin (Mendukung kredensial Email & Google). |
| `/auth/register` | **Halaman Daftar**: Registrasi pembuatan akun baru bagi pengguna umum (Siswa). |

---

## 2. Rute Modul Admin
Rute ini hanya dapat diakses oleh akun yang memiliki hak akses (*Role*) Administrator atau Tutor. Folder pada sistem: `src/app/(app)/admin/`

| Rute URL | Fungsi / Tujuan |
|---|---|
| `/admin` | **Dashboard Admin**: Pusat informasi ringkasan statistik (jumlah siswa aktif, ujian selesai, dan matriks harian). |
| `/admin/tryouts` | **Kelola Paket Ujian**: Manajemen pembuatan paket Tryout, struktur mata pelajaran, dan subbab materi kurikulum. |
| `/admin/questions` | **Kelola Bank Soal**: Mengelola daftar butir soal (menambah, mengubah, menghapus) secara manual. |
| `/admin/scraper` | **Tambah Soal Massal**: Halaman untuk mengunggah dokumen PDF/Excel untuk diekstrak menjadi soal terstruktur menggunakan AI Parser. |
| `/admin/stats` | **Monitoring Aktivitas**: Melakukan *tracking* riwayat ujian, progres, dan aktivitas belajar siswa secara agregat. |
| `/admin/users` | **Kelola Data Pengguna**: Manajemen tabel akun pengguna (verifikasi akun, *banned*, ubah role). |
| `/admin/settings` | **Pengaturan Sistem**: Konfigurasi tingkat sistem seperti batasan *rate limit*, parameter aplikasi, dan *toggle* fitur global. |

---

## 3. Rute Modul Siswa
Rute ini difokuskan untuk pengalaman pembelajaran (*Intelligent Tutoring*) dan hanya dapat diakses oleh akun Siswa.

### 3.1 Onboarding & Dashboard
| Rute URL | Fungsi / Tujuan |
|---|---|
| `/onboarding` | **OnBoarding Profil**: Pengumpulan preferensi awal target universitas dan program studi. |
| `/onboarding/plan` | **Penentuan Strategi**: Memilih target belajar harian dan identifikasi kelemahan awal. |
| `/onboarding/result` | **Hasil Analisis Awal**: Ringkasan *plan* sebelum diarahkan ke Dashboard. |
| `/dashboard` | **Dashboard Siswa**: Panel utama siswa berisi grafik ringkas, jalan pintas *tryout*, dan target hari ini. |
| `/settings` | **Pengaturan Akun**: Halaman modifikasi *password*, profil, dan preferensi target kampus. |

### 3.2 Mode Belajar & Tryout
| Rute URL | Fungsi / Tujuan |
|---|---|
| `/learning-path` | **Rute Belajar Adaptif**: Peta saran belajar yang menavigasi siswa menuju subbab terlemah berdasarkan analisis *Item Response Theory* (IRT). |
| `/practice` | **Mode Belajar (Index)**: Daftar kurikulum materi / mata pelajaran ujian UTBK untuk latihan harian tanpa batas waktu ketat. |
| `/practice/[subjectId]` | **Detail Topik Materi**: Menampilkan rincian sub-topik (bab) dan status progres (*Belum Mulai, Butuh Perhatian*) untuk satu mata pelajaran. |
| `/tutor/[[...attemptId]]` | **Ruang Pengerjaan & AI Tutor**: Halaman simulasi *Scaffolding* interaktif di mana AI memberikan petunjuk (*hints*) saat jawaban salah pada Mode Belajar. |
| `/tryout/list` | **Daftar Paket Tryout**: Menampilkan semua daftar ujian simulasi resmi yang tersedia. |
| `/tryout/[id]` | **Mode Tryout (Live)**: Halaman pengerjaan simulasi UTBK resmi dengan batas waktu otomatis (*Timer*), di mana AI Tutor dimatikan. |
| `/tryout/[id]/review` | **Pembahasan Tryout**: Halaman rekap pasca-ujian untuk mengevaluasi jawaban benar dan salah disertai pembahasan konvensional. |

### 3.3 Learning Analytics (Analisis Data)
Folder pada sistem: `src/app/(app)/analytics/`

| Rute URL | Fungsi / Tujuan |
|---|---|
| `/analytics` | **Pusat Analitik**: Halaman utama portal rapor statistik perkembangan belajar siswa secara keseluruhan. |
| `/analytics/evaluation` | **Evaluasi Kemampuan**: Ringkasan poin kelebihan dan kekurangan siswa berdasarkan kurva pembelajaran kognitif. |
| `/analytics/trend` | **Tren Perkembangan**: Grafik lintasan tren performa skor (naik/turun) dari waktu ke waktu berdasarkan riwayat *tryout*. |
| `/analytics/radar` | **Radar Kompetensi**: Grafik Jaring Laba-Laba yang membandingkan persentase kompetensi antar-mata pelajaran (Kuantitatif vs Literasi). |
| `/analytics/subject/[id]` | **Detail Skor Subtes**: Membedah performa dan penguasaan per sub-indikator dalam satu mata pelajaran secara mendalam. |
| `/analytics/chancing` | **Chancing Engine**: Halaman prediksi probabilitas kelulusan ke Perguruan Tinggi target berdasarkan rata-rata skor IRT terkini. |
| `/analytics/chancing/[majorId]` | **Kalkulasi Detail Prodi**: Rincian metrik daya tampung, prioritas, dan jarak skor terhadap *passing grade* jurusan yang ditarget. |
| `/analytics/explorer` | **Eksplorasi Kampus**: Katalog lengkap pencarian jurusan / universitas untuk mengubah target belajar. |
