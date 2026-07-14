# Arsitektur Algoritma & User Experience (UX) Lexica

Dokumen ini membedah secara komprehensif logika matematika (algoritma *backend*) dan rancangan pengalaman pengguna (UX *frontend*) yang mendasari setiap fitur di dalam platform Lexica. Dokumentasi ini berfungsi sebagai landasan teoretis dan teknis untuk penulisan skripsi.

---

## 🧮 BAGIAN I: LOGIKA ALGORITMA (CORE ALGORITHMS)

### 1. Item Response Theory (IRT) - 1 Parameter Logistic (Rasch Model)
Algoritma ini digunakan pada modul **Try Out** untuk memberikan skor kemampuan yang adil, mengacu pada standar penilaian UTBK asli.

- **Formula Probabilitas:**
  Peluang siswa dengan kemampuan ($\theta$) menjawab benar soal dengan tingkat kesulitan ($b$):
  $$P(\theta) = \frac{1}{1 + e^{-(\theta - b)}}$$
- **Metode Estimasi (Newton-Raphson):**
  Untuk mencari nilai kemampuan ($\theta$) yang paling akurat, sistem menggunakan metode iteratif *Maximum Likelihood Estimation* (MLE):
  $$\theta_{k+1} = \theta_k + \frac{\sum (U_i - P_i)}{\sum P_i (1 - P_i)}$$
  Sistem akan beriterasi hingga nilai delta $\theta$ kurang dari 0.001 (konvergen).
- **Konversi Skor:**
  Nilai logit $\theta$ dikonversikan ke skala riil UTBK (200 - 800):
  $$\text{Skor Akhir} = 500 + (\theta \times 100)$$
- **UX Justification:** Siswa mendapat skor berdasarkan bobot tingkat kesulitan butir soal yang mampu dijawab, bukan sekadar persentase benar mentah. Ini mendorong perilaku siswa yang berorientasi pada ketepatan (*accuracy*).

### 2. Algoritma Chancing Engine (Prediksi Kelulusan)
Simulator analitis yang menghitung persentase peluang masuk siswa ke program studi target.

- **Perhitungan Rasio Dasar:**
  $$\text{Rasio} = \frac{\text{Skor Tryout Siswa}}{\text{Estimasi Skor Aman Prodi}}$$
  Sistem mengelompokkan rasio ke dalam batas ambang (*thresholds*):
  - $\ge 1.1$ : **Aman** (hingga 95%)
  - $1.0 - 1.1$ : **Bersaing** (60% - 80%)
  - $0.9 - 1.0$ : **Sulit** (30% - 60%)
  - $< 0.9$ : **Sangat Sulit** (maksimal 30%)
- **Koreksi Keketatan (Competitiveness Factor):**
  Peluang akhir disesuaikan dengan realitas lapangan (jumlah peminat vs kuota daya tampung):
  $$\text{Keketatan} = \frac{\text{Jumlah Peminat}}{\text{Daya Tampung}}$$
  $$\text{Faktor Koreksi} = \max\left(0.5, 1 - (\text{Keketatan} - 5) \times 0.05\right)$$
  $$\text{Peluang Akhir} = \text{Peluang Dasar} \times \text{Faktor Koreksi}$$

### 3. Logika Scaffolding AI Tutor Bertingkat
Sistem membimbing pemahaman siswa menggunakan Llama-3.1 via Groq API. Parameter *scaffolding* diatur secara ketat lewat *system prompt*.

- **Level 1 (SOCRATIC):** Mengajukan pertanyaan pemancing (e.g., *"Menurutmu apa kata kunci di paragraf kedua?"*).
- **Level 2 (HINT):** Memberikan petunjuk arah (e.g., *"Coba gunakan rumus turunan pertama..."*).
- **Level 3 (SOLUTION):** Memberikan *breakdown* jawaban penuh dari A sampai Z.
- **Zero-Friction Context Injection:** Algoritma ini berjalan di *background*. Begitu siswa menjawab salah di mode latihan, *metadata* (ID soal, isi soal, pilihan jawaban siswa, kunci jawaban rahasia) otomatis dibungkus ke dalam *payload* API. Di *frontend*, kunci jawaban ditutup dengan format `???`, namun di *backend* AI menerima kunci utuh.
- **Target Major Context Injection:** Konteks jurusan target siswa (`targetMajor1`) di-injeksi ke prompt AI untuk personalisasi motivasi. Misal: *"Teknik Informatika UI butuh pemahaman matematika yang kuat. Yuk kuasai konsep ini!"*

### 4. Free Chat Mode AI Tutor
Mode percakapan langsung untuk pertanyaan umum bukan soal latihan.

- **Entry Points:**
  - Halaman khusus `/tutor`
  - Tombol "Tanya AI" pada masing-masing bab di Learning Path
- **Perilaku AI:**
  - Role: Asisten Materi, Motivator Belajar, Strategi Ujian
  - Prompt khusus: Fokus pada pendidikan, hindari jawaban instan
  - Tidak terhubung ke scaffolding level karena tidak dalam konteks soal

---

## 🎨 BAGIAN II: ARSITEKTUR USER EXPERIENCE (UX BEHAVIOR)

Desain UX Lexica difokuskan pada **"Efisiensi Belajar Berbasis Data untuk Persiapan Ujian High-Stakes"**. Karena UTBK bersifat *performance-oriented* (one-shot, time-pressured), segala bentuk *friction* yang tidak perlu dihilangkan menggunakan pedoman *Cognitive Load Theory* (Sweller, 1988).

### 1. Struktur Navigasi 5-Menu (Konsolidasi Mental Model)
Dari sebelumnya 9 menu, UX dirampingkan menjadi 5 agar selaras dengan tahapan kognitif pengguna:
1. **Dashboard:** Ringkasan aktivitas dan target jurusan.
2. **Belajar & Latihan:** *(Ambil Tindakan)* Akses *learning path*, baca rangkuman, dan *drill* per bab.
3. **Try Out:** *(Simulasi)* Simulator CBT penuh yang mensimulasikan kondisi asli.
4. **Analitik & Evaluasi:** *(Cek Kondisi)* Dasbor terpadu berbasis tab (*nested layout*) tanpa *full-page reload*. Memuat Rapor (Radar & Trend), Bank Soal Salah (Active Recall), dan Peluang Lulus (Chancing).
5. **Bahas Soal Luar:** Entry point sekunder untuk membedah soal dari sumber eksternal (buku cetak, bimbel lain, atau TO sekolah) secara mandiri menggunakan bantuan AI Tutor.

### 2. UX Latihan Bab (Adaptive Drill Behavior)
Pengalaman berlatih per bab didesain dengan tingkat kelelahan mental (*fatigue*) yang terkalibrasi.
- **Mastery Locking:** Bab lanjutan digembok otomatis sampai siswa menyelesaikan bab sebelumnya.
- **The 2-Attempt Rule (Manajemen Frustrasi):**
  - **Kesempatan 1 Gagal (Problem-Solving Mode):** Opsi salah dicoret merah. AI Tutor muncul menyapa tanpa memberikan jawaban. *Extraneous cognitive load* dieliminasi karena soal langsung tersambung (*injected*) ke *chat*. Siswa berfokus pada *active recall*.
  - **Kesempatan 2 Gagal (Knowledge-Acquisition Mode):** Batas toleransi frustrasi tercapai. Kunci jawaban terbuka. Tombol **"Lihat Pembahasan Lengkap AI"** muncul. Saat diklik, sistem mengeksekusi Level SOLUTION. AI langsung membedah teori secara instan tanpa memaksa siswa untuk bertanya lagi.

### 3. UX Evaluasi Berkelanjutan (Active Recall System)
Siswa UTBK diwajibkan untuk mereviu kesalahan, tetapi biasanya enggan mencatat.
- **Auto-Log Kesalahan:** Setiap soal salah di Try Out maupun Latihan otomatis disedot ke dalam tab **Evaluasi (Bank Soal Salah)** di halaman Analitik. 
- Saat siswa mengunjungi bank soal ini, mereka dihadapkan pada layar diskusi terfokus bersama AI Tutor untuk menyelesaikan "utang" pemahaman materi masa lalu.

### 4. UX Try Out Simulator (High-Stakes Fidelity)
Bagaimana Lexica membangun mental baja untuk hari-H ujian:
- **Block Navigation (Isolasi Subtes):** Tidak seperti platform biasa, siswa tidak bisa berpindah subtes secara bebas. Subtes diisolasi dan harus diselesaikan sesuai urutan blok waktu layaknya sistem BPPP resmi.
- **State Preservation (Anti Hilang Jawaban):** Sinkronisasi *real-time* ke server (`userAnswers`).
- **AI Tutor Lockout:** AI Panel secara paksa dikunci selama Try Out untuk menjamin integritas kejujuran ujian simulasi.

---

## 📑 KESIMPULAN JUSTIFIKASI DESAIN

Setiap aspek teknis dalam Lexica telah divalidasi oleh teori pendidikan:
- Penggunaan **IRT** dan **Chancing Engine** memenuhi kebutuhan data *performance-oriented* siswa.
- Penggunaan **Auto-Trigger AI Solution** di kesempatan kedua menghemat *working memory* otak siswa dari kelelahan prosedural.
- Penggunaan **Tabbed Analytics** menyajikan *dashboard* analitik kompleks menjadi satu *mental map* yang ringan diakses.

Kombinasi algoritma yang akurat dan *behavioral design* yang efisien inilah yang membedakan Lexica dari *platform ed-tech* konvensional.
