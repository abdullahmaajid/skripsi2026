# BAB III. METODE TUGAS AKHIR

## 3.1 Metode Penelitian
Pada platform Lexica ini, proses pengembangan sistem dilakukan menggunakan metode ADDIE (Analysis, Design, Development, Implementation, dan Evaluation). Metode ini dipilih karena memiliki tahapan yang sistematis sehingga memudahkan proses analisis, perancangan, pengembangan, implementasi, dan evaluasi sistem. Setiap tahapan dilakukan secara terstruktur sehingga hasil pengembangan dapat dievaluasi sebelum dilanjutkan ke tahap berikutnya. Dengan demikian, sistem yang dihasilkan diharapkan dapat berfungsi sesuai dengan tujuan penelitian.

1. **Analysis (Analisis Kebutuhan)**
Pada tahap ini, penulis menentukan fitur-fitur pada sistem sesuai dengan rumusan masalah yang telah ditentukan. Prosesnya meliputi pengumpulan data, analisis kebutuhan pengguna, serta penentuan kebutuhan sistem, baik kebutuhan fungsional, maupun kebutuhan non-fungsional. Tahapan analisis dilakukan secara menyeluruh agar sistem yang dikembangkan dapat berjalan sesuai dengan tujuan penelitian.
2. **Design System (Desain Sistem)**
Tahapan berikutnya merancang sistem yang akan dikembangkan. Perancangan ini dibuat menggunakan *Unified Modeling Language* (UML), seperti Use Case Diagram, Activity Diagram, dan Perancangan Basis Data. Perancangan ini dirancang untuk menggambarkan bagaimana pengguna (siswa dan Superadmin) dapat berinteraksi dengan sistem. Selain itu, dalam tahap ini juga merancang struktur basis data, serta tampilan antarmuka agar platform Lexica mudah digunakan.
3. **Development (Pengembangan)**
Pada tahapan ini, rancangan sistem yang telah dibuat sebelumnya diterapkan ke dalam bentuk kode program. Proses pengembangannya meliputi pembuatan logika di bagian *backend*, pengelolaan basis data menggunakan ORM, serta pembuatan *frontend* yang interaktif agar sistem dapat berjalan dengan baik dan sangat responsif.
4. **Implementation (Implementasi)**
Pada tahapan ini, sistem yang telah dikembangkan di-*deploy* ke layanan peladen awan (*cloud serverless*) dan digunakan sesuai dengan skenario yang telah dirancang. Selanjutnya dilakukan pengujian oleh responden sesuai dengan perannya, yaitu siswa dan superadmin, untuk memastikan seluruh fitur dapat digunakan dengan baik sebelum dilakukan evaluasi.
5. **Evaluation (Evaluasi)**
Pada tahap ini dilakukan evaluasi terhadap sistem yang telah dikembangkan melalui beberapa jenis pengujian, yaitu:
   **a. Black-Box & Performance Testing**
   Pengujian dilakukan untuk memastikan seluruh fungsi sistem berjalan sesuai dengan kebutuhan yang telah ditentukan. Pengujian mencakup fitur autentikasi, pengelolaan bank soal, Mode Belajar, Mode Ujian, AI Tutor, Learning Analytics, serta proses impor soal. Selain itu, dilakukan *Stress Testing* (menggunakan *Autocannon*) untuk menguji ketahanan batas beban server (*throughput* dan *latency*).
   **b. System Usability Scale (SUS)**
   Pengujian dilakukan untuk mengukur tingkat kemudahan penggunaan (*usability*) sistem berdasarkan penilaian responden.
   **c. Penetration Testing**
   Pengujian keamanan dilakukan menggunakan OWASP ZAP untuk mengidentifikasi potensi kerentanan pada aplikasi web.

---

## 3.2 Requirement Analysis
Analisis kebutuhan sistem dilakukan melalui studi literatur dan analisis terhadap platform persiapan UTBK sejenis yang telah tersedia. Hasil analisis tersebut digunakan sebagai dasar dalam menyusun kebutuhan fungsional dan non-fungsional.

### 3.2.1 Kebutuhan Fungsional 

**1. Aktor : Siswa**
Tabel 3.1 Kebutuhan Fungsional Siswa
| No. | Kebutuhan Fungsional |
|:---:|---|
| 1 | Siswa dapat melakukan registrasi dan login ke dalam sistem menggunakan kredensial email dan kata sandi. |
| 2 | Siswa dapat mengatur target nilai belajar dan target harian sebagai dasar perencanaan pembelajaran. |
| 3 | Siswa dapat melihat *personal plan* dan prioritas materi berdasarkan hasil penguasaan materi yang tersimpan pada sistem. |
| 4 | Siswa dapat mengerjakan ujian melalui halaman ujian yang dilengkapi *timer* dan navigasi soal. |
| 5 | Siswa dapat memulai sesi Mode Belajar dengan bantuan AI Tutor yang memberikan *hint* adaptif saat terjadi kesalahan. |
| 6 | Siswa dapat melihat *dashboard* analitik pembelajaran yang menampilkan statistik belajar, tren nilai, kalkulasi probabilitas lulus (*chancing*), dan rekomendasi belajar. |
| 7 | Siswa dapat melihat riwayat pembelajaran dari seluruh aktivitas pengerjaan ujian dan latihan yang pernah dilakukan lengkap dengan *AI Study Report*. |

**2. Aktor : Superadmin** 
Tabel 3.2 Kebutuhan Fungsional Superadmin
| No. | Kebutuhan Fungsional |
|:---:|---|
| 1 | Superadmin dapat login ke dalam sistem. |
| 2 | Superadmin dapat melihat dashboard admin menampilkan informasi mengenai jumlah siswa, mata pelajaran soal, dan ujian yang tersedia. |
| 3 | Superadmin dapat mengelola data mata pelajaran dan materi bab. |
| 4 | Superadmin dapat mengelola bank soal, mengimpor soal dari file Excel, serta mengelola data Universitas dan Jurusan. |
| 5 | Superadmin dapat memantau hasil sesi belajar dan hasil ujian yang dikerjakan oleh siswa. |

**3. Kebutuhan Fungsional Sistem**
Tabel 3.3 Kebutuhan Fungsional Sistem
| No. | Kebutuhan Fungsional |
|:---:|---|
| 1 | Sistem dapat memeriksa dan menilai jawaban pilihan ganda secara otomatis berdasarkan kunci jawaban. |
| 2 | Sistem dapat menampilkan simbol maupun rumus matematika menggunakan format LaTeX secara *real-time*. |
| 3 | Sistem dapat memberikan bantuan pembelajaran secara adaptif pada Mode Belajar, berupa *AI Hint*, *AI Feedback*, serta pembatasan jumlah percobaan menjawab. |
| 4 | Sistem dapat menghitung peluang kelulusan secara algoritmis berdasarkan nilai siswa dan tingkat ketetatan program studi tujuan. |
| 5 | Sistem dapat memperbarui tingkat penguasaan materi (*Mastery Tracking*) secara otomatis berdasarkan hasil pengerjaan siswa. |

### 3.2.2 Kebutuhan Non-Fungsional
a. Sistem dirancang menggunakan arsitektur *Serverless* agar dapat melakukan penskalaan (*scaling*) otomatis dan melayani ratusan interaksi pengguna per detik (di atas 140 req/sec) tanpa kendala *timeout*.
b. Sistem memanfaatkan mekanisme *Edge Caching* untuk mendistribusikan data statis secara instan dengan waktu muat kurang dari 20 milidetik.
c. Sistem tetap dapat digunakan secara mandiri untuk berlatih meskipun terdapat kendala koneksi pada layanan eksternal *Artificial Intelligent* (melalui komponen antarmuka *Fallback Hint* pengganti *chat*).
d. Keamanan data dijaga dengan menerapkan enkripsi kata sandi dan proteksi sesi menggunakan standar Auth.js.

---

## 3.3 Desain Sistem

### 3.3.1 Pemodelan Sistem dengan Unified Modeling Language (UML)
UML dipakai untuk menggambarkan dan mendokumentasikan alur kerja *Intelligent Tutoring System* (ITS) ini berjalan. Beberapa diagram UML yang digunakan antara lain *Use Case Diagram* dan *Activity Diagram* yang memetakan aktivitas login, ujian, analitik, dan manajemen data.

### 3.3.2 Arsitektur Sistem 
Arsitektur sistem digunakan untuk menggambarkan hubungan antar komponen utama yang membangun aplikasi. Pada penelitian ini, sistem dikembangkan menggunakan arsitektur berbasis web modern dengan **Next.js (App Router)** sebagai Framework *full-stack* utama, **Prisma ORM** sebagai penghubung basis data, dan **PostgreSQL (Neon Serverless DB)** sebagai penyimpanan data utama. Layanan autentikasi menggunakan standar keamanan Auth.js. 

Selain itu, sistem juga terintegrasi secara *server-side* dengan layanan **Groq API** sebagai penyedia *Large Language Model* (LLM) untuk memproses logika *Socratic Scaffolding*. Hal ini memastikan kerahasiaan kunci jawaban (prompt) tidak terekspos ke klien (*browser* pengguna).

### 3.3.3 Perancangan AI Tutor
AI Tutor dirancang sebagai komponen utama dalam ITS yang bertugas memberikan bimbingan kepada siswa. Komponen ini memiliki fitur:
1. **Rule-Based Strategy Selector**: Menentukan strategi bimbingan bertingkat (dikelola melalui *state* `useTutorChatStore`) berdasarkan jumlah percobaan. Jika salah 1x, AI memberikan **SOCRATIC** (pertanyaan pemandu). Jika salah 2x, AI memberikan **HINT** (petunjuk spesifik). Jika melampaui toleransi, diberikan **SOLUTION** komprehensif (mencakup Konsep, Langkah Penyelesaian, Kesalahan Umum, dan Latihan Serupa).
2. **Mastery Tracking**: Mengukur tingkat penguasaan materi secara spesifik per bab (dengan label: *Dikuasai*, *Sedang Dipelajari*, *Belum Mulai*) yang terintegrasi langsung dengan fitur peta belajar (*Learning Path*), serta mengakumulasi persentase subtes secara keseluruhan untuk menyesuaikan gaya bahasa (prompt) dari AI Tutor.
3. **Zero-Friction Context Injection**: Sistem secara rahasia menginjeksi *metadata* soal (teks soal, opsi yang dipilih siswa, dan kunci jawaban yang benar) ke dalam *context state* AI di sisi *backend*. Di antarmuka (*UI*) siswa, kunci jawaban ini di-*masking* menjadi `???` agar tidak bocor. Mekanisme ini memungkinkan AI memberikan umpan balik yang sangat spesifik dan kontekstual tanpa mengharuskan siswa mengetik ulang pertanyaannya, menjaga beban kognitif tetap rendah.

---

## 3.4 Alat dan Bahan Tugas Akhir

### 3.4.1 Perangkat Keras (Hardware)
- Laptop pengembang (ASUS TUF Gaming F15)
- OS: Windows 11 (64-bit)
- Processor: Intel Core i5-10300H @2.50GHz
- RAM: 16GB
- Penyimpanan: 512GB SSD

### 3.4.2 Perangkat Lunak (Software)
- **Visual Studio Code**: Sebagai Integrated Development Environment (IDE).
- **Node.js & npm**: *Runtime environment* dan pengelola paket.
- **Next.js (App Router)**: Framework *full-stack* utama pembangun aplikasi.
- **Prisma ORM**: Sebagai *Object-Relational Mapper* untuk efisiensi *query* database.
- **PostgreSQL (Neon DB)**: Sebagai sistem manajemen basis data *serverless*.
- **Vercel**: Sebagai platform *cloud hosting* dan *Edge Network*.

### 3.4.3 Layanan Kecerdasan Buatan (AI) 
Layanan Kecerdasan Buatan (AI) yang digunakan adalah **Groq API** dengan memanfaatkan model *llama-3.3-70b-versatile* yang berfungsi sebagai *engine* AI utama. Groq API dipilih karena kemampuannya menghasilkan pemrosesan bahasa (LPU) secara sangat cepat (*real-time*), yang esensial untuk membimbing siswa tanpa adanya jeda (latensi) yang panjang pada mode latihan. Untuk mitigasi kegagalan jaringan API, antarmuka menyediakan komponen `FallbackHint` agar siswa tetap bisa melanjutkan evaluasi.

### 3.4.4 Dataset Pihak Ketiga & Pertama
Dataset publik mengenai daftar Perguruan Tinggi Negeri (PTN), program studi, dan tingkat keketatan, dipadukan dengan dataset mandiri berupa kumpulan bank soal TKA/SNBT yang diketik dan diolah ke dalam format Excel (.xlsx) agar dapat diproses secara massal (Bulk Import) oleh sistem.