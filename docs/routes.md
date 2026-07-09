# Daftar API Routes — Lexica UTBK-SNBT

Dokumentasi lengkap seluruh endpoint API yang tersedia di dalam aplikasi. Semua route menggunakan Next.js App Router (`src/app/api/`).

---

## 🔐 Autentikasi & Profil

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `GET/POST` | `/api/auth/[...nextauth]` | — | Handler NextAuth.js v5. Mengelola sesi login, logout, dan callback OAuth/Credentials. |
| `POST` | `/api/auth/register` | — | Registrasi akun baru. Menerima `{ name, email, password }`. Password di-hash dengan bcrypt. |
| `GET` | `/api/profile` | ✅ | Mengambil data profil siswa beserta `StudentProfile` (sekolah, tahun lulus, target jurusan). |
| `PUT` | `/api/profile` | ✅ | Memperbarui data profil siswa. |

---

## 🎓 Onboarding

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `POST` | `/api/onboarding` | ✅ | Menyimpan data profil awal siswa saat pertama kali mendaftar (sekolah, tahun kelulusan, target jurusan). |
| `PATCH` | `/api/onboarding` | ✅ | Memperbarui data onboarding yang sudah tersimpan. |

---

## 📝 Try Out (CBT Simulator)

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `POST` | `/api/tryout/start` | ✅ | Memulai sesi tryout baru. Membuat `ExamAttempt` dan mengambil soal dari `ExamTemplate` beserta seksi-seksinya. |
| `POST` | `/api/tryout/submit` | ✅ | Submit jawaban tryout. Menghitung skor IRT ($\theta$) per subtes menggunakan Newton-Raphson, mengonversi ke skala SNBT (200–800), dan menyimpan `SubjectScore`. |
| `POST` | `/api/tryout/next` | ✅ | *Reserved/Stub.* Endpoint untuk navigasi soal berikutnya (saat ini logika navigasi dikelola di *frontend*). |
| `GET` | `/api/tryout/history` | ✅ | Mengambil daftar riwayat percobaan tryout siswa yang sudah selesai, diurutkan berdasarkan tanggal terbaru. |
| `GET` | `/api/tryout/[id]/result` | ✅ | Mengambil hasil detail satu percobaan tryout berdasarkan ID: skor total, skor per subtes, dan daftar respons jawaban. |

---

## 📖 Latihan Soal (Practice / Drill)

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `GET` | `/api/practice/subjects` | — | Mengambil daftar seluruh subtes beserta jumlah soal yang tersedia untuk mode latihan. |
| `GET` | `/api/practice/questions` | — | Mengambil soal latihan acak. Query params: `subjectId` (wajib), `chapterId` (opsional), `limit` (default: 10). |

---

## 🧭 Learning Path

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `GET` | `/api/learning-path` | ✅ | Mengambil peta belajar siswa: daftar subtes → bab-bab → status penguasaan (`NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`) beserta `masteryLevel` dan `theorySummary`. |

---

## 📊 Analitik & Evaluasi

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `GET` | `/api/analytics/radar` | ✅ | Mengambil data radar chart: skor rata-rata per subtes dari seluruh tryout siswa untuk visualisasi kekuatan/kelemahan. |
| `GET` | `/api/analytics/trend` | ✅ | Mengambil data tren skor tryout dari waktu ke waktu (time series) untuk grafik perkembangan. |
| `GET` | `/api/analytics/explorer` | ✅ | Mengambil data eksplorasi analitik lanjutan (agregasi performa lintas subtes dan bab). |
| `GET` | `/api/analytics/subject/[id]` | ✅ | Mengambil analisis detail per subtes: skor per bab, soal tersulit, dan rekomendasi belajar. |
| `GET` | `/api/evaluation/questions` | ✅ | Mengambil daftar soal yang pernah dijawab **salah** oleh siswa (Bank Soal Salah / Active Recall). Query params: `subjectId` (opsional, untuk filter). |

---

## 🎯 Chancing Engine (Prediksi Kelulusan)

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `GET` | `/api/chancing/[majorId]` | ✅ | Menghitung peluang kelulusan siswa pada prodi tertentu. Mengambil skor IRT terbaru, menghitung rasio vs estimasi skor aman prodi, mengoreksi dengan faktor keketatan, dan mengembalikan persentase peluang beserta rekomendasi. |
| `GET` | `/api/majors` | — | Mengambil daftar program studi. Query params: `uniId` (filter berdasarkan universitas). |
| `GET` | `/api/universities` | — | Mengambil daftar universitas. Query params: `search` (pencarian berdasarkan nama). |

---

## 🤖 AI Tutor

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `POST` | `/api/tutor/ask` | ✅ | Endpoint utama interaksi AI Tutor. Menerima konteks soal internal (`questionId`, `question`, `studentAnswer`, `correctAnswer`, `currentLevel`, `history`) atau teks/soal bebas dari luar (`freeMessage`). Mengembalikan respons AI + `nextLevel` scaffolding. |
| `GET` | `/api/tutor/questions` | ✅ | Mengambil daftar soal yang pernah dijawab salah dan siap untuk dibahas dengan AI Tutor (mirip `/api/evaluation/questions` tapi dioptimasi untuk konteks tutor). |

---

## 🏥 Ujian Diagnostik

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `POST` | `/api/exams/diagnostic` | ✅ | Memulai ujian diagnostik awal untuk mendeteksi kemampuan dasar siswa sebelum memulai *learning path*. |

---

## 🔧 Admin Panel

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `GET` | `/api/admin/questions` | ✅ Admin | Mengambil daftar seluruh soal di bank soal (untuk manajemen). |
| `POST` | `/api/admin/questions` | ✅ Admin | Menambah soal baru ke bank soal beserta opsi jawaban, kunci jawaban, difficulty, dan bab. |
| `DELETE` | `/api/admin/questions` | ✅ Admin | Menghapus soal berdasarkan ID. |
| `GET` | `/api/admin/chapters` | ✅ Admin | Mengambil daftar bab/chapter untuk dropdown di form manajemen soal. |
| `GET` | `/api/admin/users` | ✅ Admin | Mengambil daftar seluruh pengguna beserta statistik aktivitas. |

---

## Catatan Teknis

- **Auth ✅** berarti endpoint dilindungi oleh `auth()` (NextAuth.js session check). Akses tanpa login akan mengembalikan `401 Unauthorized`.
- **Auth ✅ Admin** berarti selain login, role pengguna harus `ADMIN`. Akses oleh `STUDENT` akan mengembalikan `403 Forbidden`.
- Semua endpoint mengembalikan format **JSON**.
- Endpoint yang membutuhkan data dinamis diberi flag `export const dynamic = "force-dynamic"` agar tidak di-cache oleh Next.js.

---

*Dokumentasi ini mencerminkan kondisi API aktual per 15 Juni 2026.*
