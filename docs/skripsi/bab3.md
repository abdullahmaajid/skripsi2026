# BAB III. METODE TUGAS AKHIR

## 3.1 Metode Penelitian

Pada pengembangan aplikasi Lexica (Tryout & AI Tutor UTBK), proses pengembangan sistem dilakukan menggunakan metode ADDIE (Analysis, Design, Development, Implementation, dan Evaluation). Metode ini dipilih karena memiliki tahapan yang sistematis sehingga memudahkan proses analisis, perancangan, pengembangan, implementasi, dan evaluasi sistem. Setiap tahapan dilakukan secara terstruktur sehingga hasil pengembangan dapat dievaluasi sebelum dilanjutkan ke tahap berikutnya.

1. **Analysis (Analisis Kebutuhan)**
Pada tahap ini, penulis menentukan fitur-fitur pada sistem sesuai dengan rumusan masalah yang telah ditentukan. Prosesnya meliputi identifikasi kebutuhan akan sistem penilaian yang lebih adil (berbasis *Item Response Theory* / IRT), kebutuhan estimasi peluang kelulusan (Chancing Engine), serta bimbingan belajar terpersonalisasi menggunakan AI Tutor.
2. **Design System (Desain Sistem)**
Tahapan perancangan sistem menggunakan *Unified Modeling Language* (UML) seperti Use Case Diagram dan Activity Diagram, serta perancangan basis data menggunakan *Entity Relationship Diagram* (ERD). Pada tahap ini juga dirancang arsitektur algoritma IRT dan fungsi Sigmoid untuk probabilitas kelulusan, serta prompt sistem untuk AI Scaffolding.
3. **Development (Pengembangan)**
Rancangan sistem diterapkan ke dalam bentuk kode program menggunakan teknologi modern berbasis *Next.js 16 (App Router)* untuk frontend dan backend secara *fullstack*, *Prisma ORM* untuk manajemen basis data PostgreSQL, serta integrasi Groq API untuk memproses layanan *Large Language Model* (LLM).
4. **Implementation (Implementasi)**
Sistem yang telah dikembangkan di-*deploy* menggunakan layanan cloud (Vercel) sehingga dapat dijalankan secara nyata. Selanjutnya dilakukan pengujian oleh responden sesuai dengan perannya, yaitu siswa dan superadmin.
5. **Evaluation (Evaluasi)**
Pada tahap ini dilakukan evaluasi terhadap sistem melalui dua jenis pengujian:
- **Black-Box Testing**: Memastikan fungsionalitas fitur (CBT Simulator, IRT Scoring, Chancing, AI Tutor, Analytics) berjalan sesuai Spesifikasi Kebutuhan Fungsional (FR).
- **System Usability Scale (SUS)**: Mengukur tingkat kemudahan penggunaan (*usability*) sistem berdasarkan penilaian pengguna akhir.

---

## 3.2 Requirement Analysis

Analisis kebutuhan sistem terbagi menjadi dua jenis, yaitu kebutuhan fungsional dan kebutuhan non-fungsional, yang disusun berdasarkan spesifikasi platform edukasi cerdas berbasis AI.

### 3.2.1 Kebutuhan Fungsional 

**1. Aktor: Siswa**
Tabel 3.1 Kebutuhan Fungsional Siswa
| No. | Kebutuhan Fungsional |
|:---:|---|
| 1 | Siswa dapat melakukan registrasi dan login ke dalam sistem secara manual maupun menggunakan Google Sign-In (OAuth). |
| 2 | Siswa dapat mengisi *Onboarding* untuk menentukan target program studi dan universitas impian. |
| 3 | Siswa dapat mengerjakan Ujian Diagnostik dan Tryout reguler melalui CBT Simulator yang dilengkapi *timer*. |
| 4 | Siswa dapat mengakses *Learning Path* dengan mekanisme *mastery locking* (bab terbuka secara bertahap). |
| 5 | Siswa dapat melakukan sesi latihan soal (Mode Belajar) dengan bantuan AI Tutor yang interaktif. |
| 6 | Siswa dapat melihat *Dashboard Analytics* (Radar chart kemahiran, Tren skor, Evaluasi jawaban salah, dan kalkulasi peluang kelulusan/Chancing). |
| 7 | Siswa dapat mengelola profil akun dan target belajar. |

**2. Aktor: Superadmin**
Tabel 3.2 Kebutuhan Fungsional Superadmin
| No. | Kebutuhan Fungsional |
|:---:|---|
| 1 | Superadmin dapat login ke dalam sistem. |
| 2 | Superadmin dapat memantau statistik aktivitas pengguna dan distribusi skor secara global pada Dashboard. |
| 3 | Superadmin dapat mengelola data Universitas, Program Studi (Daya tampung & Keketatan), serta parameter IRT (*difficulty, discrimination*). |
| 4 | Superadmin dapat mengelola *Bank Soal* lengkap dengan dukungan LaTeX (MathJax) untuk rumus matematika. |
| 5 | Superadmin dapat mengelola modul *Scraping* data eksternal untuk memperbarui basis data PTN. |

**3. Kebutuhan Fungsional Sistem**
Tabel 3.3 Kebutuhan Fungsional Sistem
| No. | Kebutuhan Fungsional |
|:---:|---|
| 1 | Sistem dapat menghitung estimasi kemampuan siswa ($\theta$) menggunakan algoritma Item Response Theory (IRT) model 1-PL/2-PL. |
| 2 | Sistem dapat menghitung persentase peluang kelulusan (*Chancing*) menggunakan algoritma berbasis fungsi Sigmoid secara dinamis. |
| 3 | Sistem dapat menghasilkan instruksi bimbingan berjenjang (*Scaffolding*: Socratic, Hint, Solution) secara otomatis via LLM. |
| 4 | Sistem dapat merender notasi matematika (LaTeX) pada soal dan percakapan AI secara *real-time*. |

### 3.2.2 Kebutuhan Non-Fungsional

1. Sistem dirancang menggunakan arsitektur *Serverless* agar dapat melakukan *scaling* otomatis saat jumlah peserta Tryout melonjak.
2. Proses perhitungan skor IRT yang berat pada sumber daya komputasi harus dapat diselesaikan dalam batas waktu toleransi *serverless function* (maksimal 10 detik).
3. Antarmuka sistem dibuat responsif (*mobile-friendly*) dan modern (*user-friendly*) dengan mengadopsi prinsip *Cognitive Load Theory* (animasi transisi halus dan minim distraksi).
4. Data kata sandi dilindungi menggunakan algoritma *hashing* yang aman (Bcrypt) sebelum disimpan ke basis data.

---

## 3.3 Desain Sistem

### 3.3.1 Use Case Diagram

Terdapat dua aktor utama dalam sistem:
1. **Siswa**: Berperan sebagai pengguna akhir yang mengonsumsi layanan edukasi. Siswa memiliki hak akses terhadap *Use Case*: Login, Mengerjakan Tryout, Latihan Soal, Melihat Analitik (Radar, Tren, Chancing), dan Interaksi AI Tutor.
2. **Superadmin**: Berperan sebagai pengelola platform. Superadmin memiliki hak akses terhadap *Use Case*: Manajemen Soal, Manajemen Pengguna, Monitoring Statistik, dan Manajemen Data PTN.

Kedua aktor tersebut dihubungkan dengan relasi *<<include>>* pada *Use Case* Login, yang berarti autentikasi mutlak diperlukan sebelum fitur lain dapat diakses.

### 3.3.2 Activity Diagram

Activity Diagram digunakan untuk menjelaskan alur proses yang berjalan di dalam sistem Lexica. Beberapa alur krusial meliputi:
1. **Activity Diagram Pelaksanaan Tryout (CBT)**: Siswa memilih paket ujian -> Sistem menyiapkan lingkungan sesi dan *timer* -> Siswa menjawab soal -> Siswa submit -> Sistem memproses skor IRT secara *batch* -> Sistem menampilkan halaman *Result*.
2. **Activity Diagram AI Tutor (Mode Belajar)**: Siswa gagal menjawab soal -> Sistem mencegat jawaban salah -> Sistem mengirimkan konteks (*blind mode*) ke LLM -> LLM memberikan respons *Socratic* -> Siswa mencoba lagi.
3. **Activity Diagram Analitik (Chancing)**: Siswa membuka halaman prediksi -> Sistem mengambil nilai *IRT Scaled* siswa dan data ketetatan Prodi -> Sistem mengkalkulasi kurva Sigmoid -> Sistem menampilkan label peluang (Aman / Bersaing / Sulit).

### 3.3.3 Database Entity Relationship Diagram (ERD)

Sistem menggunakan basis data relasional PostgreSQL dengan desain entitas utama sebagai berikut:
- **User & StudentProfile**: Menyimpan data autentikasi dan target jurusan siswa.
- **Subject, Chapter, Question**: Struktur hierarki materi dan bank soal. Tabel Question menyimpan parameter spesifik IRT seperti tingkat kesulitan (*difficulty*).
- **ExamAttempt & QuestionResponse**: Mencatat sesi ujian siswa beserta riwayat pilihan ganda dan waktu yang dihabiskan per soal.
- **SubjectScore**: Menyimpan estimasi parameter Theta ($\theta$) per subtes.
- **TutoringSession & TutoringMessage**: Menyimpan riwayat obrolan AI *Scaffolding* untuk tiap soal.

### 3.3.4 Arsitektur Sistem

Lexica dikembangkan menggunakan **Next.js App Router Architecture** yang mendukung *React Server Components* (RSC) untuk performa optimal.
1. Klien berinteraksi dengan antarmuka berbasis web.
2. Permintaan *routing* dan komputasi ditangani oleh *Next.js Edge/Serverless API*.
3. Akses basis data dilakukan melalui *Prisma Client* yang terhubung ke *PostgreSQL Connection Pool*.
4. Fitur kecerdasan buatan (*AI Tutor*) diintegrasikan secara *server-side* menggunakan **Groq API** (mengakses model Llama-3.1). Hal ini memastikan *Prompt* sistem (kunci jawaban) tidak terekspos ke klien.

### 3.3.5 Perancangan Algoritma & AI Tutor

**1. Algoritma Scoring Item Response Theory (IRT)**
Lexica tidak menggunakan sistem skor bobot statis konvensional, melainkan metode Newton-Raphson untuk mengestimasi kemampuan *Latent Trait* ($\theta$) berdasarkan pola jawaban.
Fungsi optimasi matematis iteratif digunakan hingga mencapai konvergensi (Toleransi = 0.001) untuk mencari nilai Maximum Likelihood Estimation (MLE) dari kemampuan siswa.

**2. Algoritma Chancing Engine (Sigmoid Curve)**
Alih-alih menggunakan pemotongan nilai *passing grade* linier yang kaku, sistem menggunakan kurva logistik (Sigmoid) yang disesuaikan (*steepness factor*) dengan tingkat kompetisi jurusan (jumlah peminat berbanding kuota). Semakin tinggi kompetisi, semakin curam kurva probabilitasnya, sehingga selisih skor kecil sangat menentukan.
Rumus probabilitas: $P(x) = \frac{1}{1 + e^{-k(x - threshold)}}$

**3. Adaptive AI Prompting (Scaffolding System)**
Mekanisme bimbingan tidak memberikan jawaban langsung (*Blind Mode Architecture*). Tingkat bantuan disesuaikan berdasarkan riwayat percobaan siswa:
- **Level 1 (Socratic)**: Diberikan saat kesalahan pertama. AI hanya memberikan pertanyaan pancingan.
- **Level 2 (Hint)**: Diberikan jika masih salah. AI memberikan sebagian konsep/rumus.
- **Level 3 (Solution)**: Diberikan jika *stuck* total. AI menjabarkan langkah-langkah penyelesaian secara komprehensif.

---

## 3.4 Alat dan Bahan Tugas Akhir

Alat yang digunakan dalam proses pengembangan aplikasi Lexica ini meliputi:

### 3.4.1 Perangkat Keras (Hardware)
- Komputer / Laptop untuk proses penulisan kode (*coding*) dan kompilasi lokal.
- Kapasitas RAM memadai (minimal 8GB) untuk menjalankan *development server* Node.js dan eksekusi integrasi *browser* secara simultan.

### 3.4.2 Perangkat Lunak (Software)
- **Visual Studio Code**: Sebagai Integrated Development Environment (IDE).
- **Node.js & npm**: *Runtime environment* dan *package manager*.
- **Next.js (React 19)**: Framework *fullstack* utama.
- **Prisma**: ORM untuk permodelan database.
- **PostgreSQL**: Sistem manajemen basis data relasional.

### 3.4.3 Layanan Kecerdasan Buatan (AI) 
Layanan Kecerdasan Buatan (AI) yang digunakan adalah **Groq API** dengan memanfaatkan model terbuka yang sangat cepat (Llama-3.1-70b-versatile). Groq API dipilih karena kemampuannya memproses LPU (Language Processing Unit) secara *ultra-fast*, yang sangat vital untuk memberikan umpan balik (feedback) seketika (*real-time*) kepada siswa saat mode latihan berlangsung.

### 3.4.4 Dataset Pihak Ketiga
Dataset dari pihak lain yang digunakan berupa data sekunder publik mengenai daftar Perguruan Tinggi Negeri (PTN), program studi, daya tampung, serta tingkat keketatan historis yang didapatkan dari laman resmi BP3/SNPMB.

### 3.4.5 Dataset Pihak Pertama
Dataset mandiri yang disusun khusus untuk platform Lexica berupa bank soal setara UTBK-SNBT yang disusun ke dalam format JSON/Excel agar dapat diimpor secara otomatis melalui *Admin Panel* (Bulk Import) ke dalam basis data sistem, lengkap beserta informasi kunci jawaban dan parameter tingkat kesulitan IRT.