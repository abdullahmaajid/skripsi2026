# BAB III
# METODE TUGAS AKHIR

## 3.1 Metode Penelitian
Pada aplikasi simulasi Tryout UTBK SNBT ini, proses pengembangan sistem dilakukan menggunakan metode ADDIE (Analysis, Design, Development, Implementation dan Evaluation). Metode ini dipilih karena memiliki tahapan yang sistematis sehingga memudahkan proses analisis, perancangan, pengembangan, implementasi, dan evaluasi sistem. Setiap tahapan dilakukan secara terstruktur sehingga hasil pengembangan dapat dievaluasi sebelum dilanjutkan ke tahap berikutnya. Dengan demikian, sistem yang dihasilkan diharapkan dapat berfungsi sesuai dengan tujuan penelitian.

Gambar 3.1 Metode Pengembangan ADDIE

Berdasarkan Gambar 3.1, tahapan yang dilakukan dalam pengembangan sistem adalah sebagai berikut:
1. **Analysis (Analisis Kebutuhan)**
Pada tahap ini, penulis menentukan fitur-fitur pada sistem sesuai dengan rumusan masalah yang telah ditentukan. Prosesnya meliputi pengumpulan data, analisis kebutuhan pengguna, serta penentuan kebutuhan sistem, baik kebutuhan fungsional, maupun kebutuhan non-fungsional. Tahapan analisis dilakukan secara menyeluruh agar sistem yang dikembangkan dapat berjalan sesuai dengan tujuan penelitian.

2. **Design System (Desain Sistem)**
Tahapan berikutnya merancang sistem yang akan dikembangkan. Perancangan ini dibuat menggunakan *Unified Modeling Language* (UML), seperti *Use Case Diagram*, *Activity Diagram*, dan Perancangan Basis Data. Perancangan ini dirancang untuk menggambarkan bagaimana pengguna (Siswa dan Admin) dapat berinteraksi dengan sistem. Selain itu, dalam tahap ini juga dirancang struktur basis data serta tampilan antarmuka agar sistem Tryout mudah digunakan.

3. **Development (Pengembangan)**
Pada tahapan ini, rancangan sistem yang telah dibuat sebelumnya diterapkan ke dalam bentuk kode program. Proses pengembangannya meliputi pembuatan logika di bagian *backend*, pengelolaan basis data, serta pembuatan *frontend* yang interaktif agar sistem dapat berjalan dengan baik dan pengguna dapat mengaksesnya dengan mudah.

4. **Implementation (Implementasi)**
Pada tahap ini, sistem yang telah selesai dibangun mulai diterapkan ke lingkungan yang sebenarnya agar dapat diakses dan digunakan oleh pengguna. Proses ini meliputi instalasi dan konfigurasi sistem, migrasi basis data, serta pengaturan *environment*, termasuk konfigurasi API key untuk Groq dan OpenRouter. Selain itu, dilakukan pula pengenalan sistem kepada calon pengguna, yaitu Siswa dan Admin, agar mereka memahami cara mengakses dan menggunakan fitur-fitur sesuai dengan perannya masing-masing. Tahap ini menjadi penghubung antara sistem yang telah selesai dikembangkan dengan tahap evaluasi, karena sistem yang telah diimplementasikan tersebut akan langsung digunakan oleh responden sebelum masuk ke pengujian pada tahap berikutnya.

5. **Evaluation (Evaluasi)**
Pada tahap ini dilakukan evaluasi terhadap sistem yang telah dikembangkan melalui beberapa jenis pengujian, yaitu:
   **a. Black-Box Testing**
   Pengujian dilakukan untuk memastikan seluruh fungsi sistem berjalan sesuai dengan kebutuhan yang telah ditentukan. Pengujian mencakup fitur autentikasi, pengelolaan bank soal, Mode Belajar, Mode Tryout, AI Tutor, *Learning Analytics*, *Personal Plan*, serta proses impor soal dari dokumen Excel.
   **b. System Usability Scale (SUS)**
   Pengujian dilakukan untuk mengukur tingkat kemudahan penggunaan (*usability*) sistem berdasarkan penilaian responden yang terdiri atas Siswa dan Admin.
   **c. Penetration Testing**
   Pengujian keamanan dilakukan menggunakan OWASP ZAP untuk mengidentifikasi potensi kerentanan pada aplikasi web, seperti kesalahan konfigurasi keamanan, kelemahan autentikasi, *missing security headers*, serta potensi kerentanan lainnya. Hasil pengujian digunakan sebagai dasar evaluasi dan perbaikan keamanan sistem sebelum aplikasi digunakan.

## 3.2 Requirement Analysis
Sebagai tahap awal dari model pengembangan ADDIE, dilakukan analisis kebutuhan sistem melalui studi literatur dan pengamatan terhadap platform Tryout yang sudah ada. Hasil analisis ini menjadi dasar dalam merumuskan kebutuhan sistem, yang nantinya diterapkan pada aplikasi agar sistem yang dibangun sejalan dengan tujuan penelitian. Kebutuhan sistem tersebut terbagi menjadi dua jenis, yaitu kebutuhan fungsional dan kebutuhan non-fungsional, yang disusun berdasarkan fitur dan spesifikasi *Intelligent Tutoring System* (ITS) yang dikembangkan.

### 3.2.1 Kebutuhan Fungsional

**1. Aktor: Siswa**
Tabel 3.1 Kebutuhan Fungsional Siswa
| No. | Kebutuhan Fungsional |
|---|---|
| 1 | Siswa dapat melakukan registrasi dan *login* ke dalam sistem, termasuk menggunakan akun Google (*Google Sign-In*). |
| 2 | Siswa dapat melakukan proses lupa *password* dan memperbarui *password* melalui *email*. |
| 3 | Siswa dapat mengatur target nilai belajar, universitas impian, jurusan, dan target harian sebagai dasar perencanaan pembelajaran. |
| 4 | Siswa dapat melihat *personal plan* dan prioritas materi berdasarkan hasil penguasaan materi yang tersimpan pada sistem. |
| 5 | Siswa dapat mengerjakan ujian simulasi (*Tryout*) melalui halaman yang dilengkapi *timer* dan navigasi soal. |
| 6 | Siswa dapat memulai sesi Mode Belajar dengan bantuan AI Tutor yang memberikan *hint* saat terjadi kesalahan. |
| 7 | Siswa dapat memulai sesi Mode Tryout tanpa bantuan AI Tutor. |
| 8 | Siswa dapat melihat *dashboard* analitik pembelajaran yang menampilkan statistik belajar, progres, tren nilai, status penguasaan materi, dan rekomendasi belajar. |
| 9 | Siswa dapat melihat hasil ujian lengkap dengan AI Study Report. |
| 10 | Siswa dapat melihat riwayat pembelajaran dari seluruh aktivitas pengerjaan ujian dan latihan yang pernah dilakukan. |
| 11 | Siswa dapat mengelola data profil akun dan mengubah *password*. |

**2. Aktor: Admin**
Tabel 3.2 Kebutuhan Fungsional Admin
| No. | Kebutuhan Fungsional |
|---|---|
| 1 | Admin dapat *login* ke dalam sistem. |
| 2 | Admin dapat melihat *dashboard* admin yang menampilkan informasi mengenai jumlah siswa, mata pelajaran, dan ujian yang tersedia di dalam sistem. |
| 3 | Admin dapat mengelola mata pelajaran (Subject). |
| 4 | Admin dapat mengelola topik materi (Chapter) sebagai pengelompokan bank soal pada setiap mata pelajaran. |
| 5 | Admin dapat mengelola bank soal, terutama mengimpor soal dari file Excel, mengunggah media pendukung, serta menyaring soal berdasarkan mata pelajaran. |
| 6 | Admin dapat memantau hasil sesi belajar dan hasil ujian yang dikerjakan oleh siswa secara keseluruhan. |
| 7 | Admin dapat mengelola data pengguna, mengatur peran (*role*) pengguna, serta mengonfigurasi pengaturan sistem (batas *token*, akses, dll). |

**3. Kebutuhan Fungsional Sistem**
Tabel 3.3 Kebutuhan Fungsional Sistem
| No. | Kebutuhan Fungsional |
|---|---|
| 1 | Sistem dapat memeriksa dan menilai jawaban pilihan ganda secara otomatis berdasarkan kunci jawaban yang tersedia. |
| 2 | Sistem dapat menyimpan dan menampilkan simbol maupun ekspresi matematika menggunakan karakter standar Unicode dan notasi aljabar berbasis teks (LaTeX/KaTeX). |
| 3 | Sistem dapat memberikan bantuan pembelajaran secara adaptif pada Mode Belajar, berupa AI Hint, AI Feedback, serta pembatasan jumlah percobaan menjawab (*scaffolding*). |
| 4 | Sistem dapat menghitung skor akhir berdasarkan hasil *Pre-Test*, *Main-Test*, dan *Post-Test* sesuai dengan bobot yang telah ditentukan. |
| 5 | Sistem dapat menghasilkan AI Personal Study Report setelah siswa menyelesaikan sesi belajar. |
| 6 | Sistem dapat menyusun *Personal Plan* dan menentukan prioritas belajar berdasarkan hasil nilai yang diperoleh siswa melalui *Chancing Engine*. |
| 7 | Sistem dapat memperbarui tingkat penguasaan materi (*Mastery Tracking*) secara otomatis berdasarkan hasil pengerjaan siswa. |
| 8 | Sistem dapat mengirimkan *email* notifikasi untuk membantu pengguna melakukan pembaruan *password*. |

### 3.2.2 Kebutuhan Non-Fungsional
Kebutuhan non-fungsional menggambarkan kualitas sistem secara keseluruhan dan tidak dikaitkan dengan aktor tertentu, seperti:
a. Sistem tetap dapat digunakan dengan baik meskipun terdapat kendala pada layanan eksternal, seperti layanan *Artificial Intelligence* (AI), dengan adanya mekanisme *fallback* otomatis (dari Groq ke OpenRouter).
b. Sistem dirancang dapat merespons setiap interaksi pengguna dengan cepat selama proses pembelajaran maupun pelaksanaan ujian (*real-time processing*).
c. Antarmuka sistem dibuat dengan memperhatikan kemudahan penggunaan (*user-friendly*) agar setiap pengguna dapat mengoperasikan sistem dengan lebih mudah.
d. Keamanan data dijaga dengan menerapkan metode *hashing* pada *password* sebelum disimpan ke dalam basis data serta melengkapi *Security Headers* standar.

## 3.3 Desain Sistem
Bagian ini menjelaskan perancangan sistem yang akan dikembangkan berdasarkan hasil analisis kebutuhan yang telah dilakukan sebelumnya. Perancangan ini bertujuan untuk memberikan gambaran mengenai bagaimana sistem akan bekerja, baik dari sisi proses, pengelolaan data, maupun tampilan antarmuka yang digunakan oleh pengguna. Dalam penelitian, perancangan sistem dibagi menjadi 4 pendekatan utama, yaitu:

**1. Pemodelan Sistem dengan Unified Modeling Language (UML)**
Pada tahapan perancangan, penulis menggunakan pendekatan berbasis objek menggunakan *Unified Modeling Language* (UML). UML dipakai untuk menggambarkan dan mendokumentasikan alur kerja *Intelligent Tutoring System* (ITS) ini berjalan. Beberapa diagram UML yang digunakan antara lain:
a. **Use Case Diagram**
Use Case Diagram digunakan untuk menggambarkan hubungan antara pengguna dengan sistem yang dibuat. Use Case diagram ini menunjukkan fitur-fitur yang dapat digunakan oleh pengguna serta interaksi yang terjadi di dalam sistem.
b. **Activity Diagram**
Activity Diagram digunakan untuk menjelaskan alur proses yang berjalan di dalam sistem. Diagram ini membantu menggambarkan urutan aktivitas pengguna, mulai dari awal hingga akhir proses. Dalam penelitian ini, Activity Diagram digunakan untuk menggambarkan proses Login, proses pengerjaan soal, hingga proses sistem memberikan hasil evaluasi kepada pengguna.

**2. Pendekatan Database Diagram**
Perancangan Database dilakukan untuk menentukan struktur penyimpanan data pada sistem. Database dirancang agar data pengguna, profil siswa, target kampus, data soal, hasil pengerjaan, serta riwayat interaksi (*chat*) dengan AI Tutor dapat tersimpan dengan baik dan terorganisir di dalam *Relational Database Management System*.

**3. Arsitektur Sistem**
Arsitektur sistem digunakan untuk menggambarkan hubungan antar komponen utama yang membangun aplikasi. Pada penelitian ini, sistem dikembangkan menggunakan arsitektur berbasis *web* modern dengan **Next.js** sebagai *framework* utama, **Prisma** sebagai *Object-Relational Mapping* (ORM), serta **PostgreSQL** sebagai basis data. Selain itu, sistem juga terintegrasi dengan layanan Google OAuth 2.0 untuk proses autentikasi. Layanan **Groq API** bertindak sebagai penyedia utama *Large Language Model* (LLM), sedangkan **OpenRouter API** menjadi layanan cadangan (*Fallback*) apabila layanan utama sedang padat (*rate limit*). Perancangan arsitektur sistem bertujuan untuk memberikan gambaran mengenai alur komunikasi antar komponen sehingga proses pengolahan data dan layanan AI dapat berjalan dengan lancar secara *real-time*.

**4. Perancangan AI Tutor**
Perancangan AI Tutor dilakukan untuk menjelaskan mekanisme kerja komponen ITS yang digunakan pada Mode Belajar. Pada bagian ini dijelaskan bagaimana AI Tutor memproses jawaban siswa, menentukan strategi bimbingan berdasarkan jumlah percobaan (*attempt count*), menyesuaikan respons menggunakan nilai *mastery*, serta menyusun *prompt* sebelum dikirimkan ke LLM. Selain itu, bagian ini juga membahas komponen pendukung seperti *Prompt Builder*, *Rule-Based Strategy Selector*, *Blind Mode Architecture*, *Mastery Tracking*, dan *Personal Plan* yang bekerja bersama untuk menghasilkan pengalaman belajar yang adaptif sesuai dengan kemampuan masing-masing siswa.

### 3.3.1 Use Case Diagram

Gambar 3.2 Use Case Diagram

Gambar 3.2 menjelaskan *Use Case Diagram* yang menggambarkan fungsionalitas pada platform simulasi UTBK SNBT berbasis ITS. Diagram ini menunjukkan aktor yang berinteraksi dengan sistem beserta fungsi-fungsi yang dapat diakses sesuai dengan hak akses masing-masing.

**1. Aktor Utama (Pengguna Sistem)**
Terdapat 2 aktor utama yang berinteraksi dengan sistem, yakni sebagai berikut:
**a. Siswa**
Siswa dapat melakukan autentikasi untuk mengakses fitur pembelajaran, seperti mengelola profil, melihat *dashboard*, menyusun rencana belajar (*Personal Plan*), mengerjakan simulasi pada Mode Belajar (didampingi AI Tutor) maupun Mode Tryout (tanpa bantuan AI), berdiskusi secara bebas di Ruang AI Tutor Khusus, serta melihat hasil analitik dan evaluasi (AI Study Report).

**b. Admin**
Admin merupakan pengelola sistem yang memiliki kendali penuh terhadap manajemen konten dan pengguna. Aktivitas yang dapat dilakukan meliputi pemantauan *dashboard*, pengelolaan mata pelajaran, topik materi, bank soal (termasuk *scrape* data massal), pemantauan aktivitas siswa, pengelolaan parameter sistem (*settings*), serta pengelolaan data akun pengguna.

**2. Relasi include dan extend**
Pada Gambar 3.2, pemodelan sistem ini menekankan pembatasan akses melalui relasi *include* dan *extend* yang terpusat pada proses autentikasi.
**a. Relasi include**
- Relasi *include* terhadap Login: Seluruh *use case* fungsionalitas utama, baik di sisi Admin maupun Siswa wajib melalui proses Login. Hal ini menunjukkan bahwa pengguna wajib melakukan autentikasi terlebih dahulu sebelum dapat mengakses fitur-fitur tersebut.
- Relasi *include* pada Mode Tryout/Belajar: *Use-Case* Melaksanakan Mode Belajar memiliki relasi *include* yang mengarah ke Penjelasan AI Tutor, menunjukkan bahwa fitur AI Tutor turut disertakan secara wajib dalam alur tersebut.
**b. Relasi extend**
*Use-case* Logout memiliki relasi *extend* terhadap Login, yang menunjukkan bahwa pengguna dapat mengakhiri sesi penggunaan sistem setelah berhasil masuk.

**3. Fungsionalitas Berdasarkan Aktor**
**a. Fungsionalitas Siswa**
Setelah berhasil *login*, *Use-Case* yang dapat diakses oleh Siswa yakni sebagai berikut:
- Kelola Profil untuk mengubah informasi data diri, gaya AI (*AI Style*), serta target Universitas & Jurusan.
- Melihat Dashboard yang menampilkan ringkasan aktivitas belajar siswa.
- Menyusun Personal Plan (mengatur prioritas belajar).
- Melaksanakan Mode Belajar yang di dalamnya menyertakan fitur AI Tutor (*Learning Path* & *Quick Drill*).
- Melaksanakan Mode Tryout.
- Berinteraksi di Ruang AI Tutor Khusus (*Free-chat* dengan AI Tutor).
- Melihat Hasil Analitik dan Evaluasi (Riwayat Nilai, *Mastery*, dll).
- Logout.

**b. Fungsionalitas Admin**
Setelah berhasil *login*, Admin dapat mengakses fitur administrasi sistem, yaitu:
- Kelola Profil.
- Melihat Dashboard yang menampilkan ringkasan statistik aplikasi secara keseluruhan.
- Kelola Mata Pelajaran (*Subject*).
- Kelola Topik Materi (*Chapter*).
- Kelola Bank Soal (*Questions* & *Options*), termasuk fitur Impor via *Scraper*.
- Melihat Aktivitas Siswa (*Analytics*).
- Kelola Pengguna dan Pengaturan Sistem.
- Logout.

### 3.3.2 Activity Diagram
# Alur Penggunaan Aplikasi Lexica UTBK (Versi Cerita Awam)

Dokumen ini menjelaskan alur cerita bagaimana setiap pihak berinteraksi di dalam platform Lexica UTBK sehari-hari. Kita akan melihat secara jelas apa yang dilakukan oleh Siswa, bagaimana Sistem merespons, dan kapan AI Tutor ikut campur membantu siswa. Jika ada percabangan alur, pilihan akan dijabarkan menggunakan format "Opsi" dan "Konektor". Seluruh 55 alur diagram (19 untuk Siswa & 35 untuk Admin) telah dijabarkan di bawah ini.

---

## 👨🎓 Bagian 1: Pengalaman Belajar Siswa (Student)

### 1. Masuk ke Aplikasi (Login & Lihat Learning Overview)
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Siswa membuka aplikasi, memasukkan email beserta kata sandi, lalu menekan tombol "Login".
- Sistem mengecek apakah data tersebut benar. Jika cocok, Sistem akan mengarahkan siswa ke halaman utama (Dashboard).
- Di halaman Dashboard, Sistem menyajikan ringkasan data, seperti nilai tryout sejauh ini dan progres belajar.
- Siswa kemudian melihat dan membaca ringkasan belajarnya tersebut.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 2. Memilih Materi Belajar (Lihat Learning Path)
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Siswa mengeklik menu "Learning Path" di pinggir layar.
- Sistem memproses permintaan tersebut dan menampilkan peta jalan belajar siswa yang berisi daftar mata pelajaran dan bab-bab materi.
- Siswa melihat-lihat dan memilih bab mana yang ingin dipelajari hari ini.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 3. Mengerjakan Latihan Bab
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Siswa memilih bab yang ingin dilatih.
- Sistem menampilkan lembar soal di layar utama dan memunculkan panel AI Tutor di sebelah kanan.
- AI Tutor bersiap-siap (standby) menunggu interaksi.
- Siswa memiliki cabang pilihan awal:
  - Opsi 1 (Opsional): Bertanya di chat panel AI sebelum menebak jawaban -> (AI Tutor merespons dengan memberikan petunjuk tipis/hint, lalu siswa kembali ke pilihan menebak).
  - Opsi 2 (Wajib): Memilih opsi A/B/C/D/E dan mengeklik tombol "Jawab" -> (Melangkah ke proses pengecekan jawaban oleh Sistem).
- Sistem langsung mengecek kebenaran jawaban tersebut.
  - Jika salah (Percobaan 1): Sistem memunculkan peringatan kuning "Kesempatan Terakhir". AI Tutor otomatis mengirim chat (hint). Siswa memiliki cabang pilihan:
    - Opsi 1: Langsung menjawab ulang -> (Kembali ke proses pengecekan jawaban oleh Sistem).
    - Opsi 2: Membalas chat AI Tutor untuk berdiskusi dulu -> (Siswa berdiskusi dengan AI dan tetap berada di soal ini, sebelum akhirnya menebak ulang).
  - Jika salah (Percobaan 2 / Habis): Sistem mengubah status soal menjadi "Dilewati". AI Tutor otomatis mengirim chat evaluasi. Siswa memiliki cabang pilihan:
    - Opsi 1: Berdiskusi dengan AI Tutor untuk mencari tahu kesalahannya -> (Siswa tertahan berdiskusi di soal ini).
    - Opsi 2: Langsung mengeklik "Lanjut" -> (Sistem berpindah dan memuat lembar soal berikutnya).
  - Jika benar: Sistem memunculkan notifikasi "Benar!" dan tombol "Lihat Pembahasan AI". AI Tutor otomatis mengirim chat apresiasi. Siswa memiliki cabang pilihan:
    - Opsi 1: Mengobrol dengan AI Tutor -> (Siswa tertahan berdiskusi di soal ini).
    - Opsi 2: Mengeklik tombol "Lihat Pembahasan AI" -> (Siswa tertahan membaca pembahasan di soal ini).
    - Opsi 3 (Wajib): Mengeklik tombol "Lanjut" -> (Sistem berpindah dan memuat lembar soal berikutnya).
- Setelah semua soal habis (atau di-Next sampai soal terakhir), Sistem menampilkan Layar Hasil Akhir yang berisi rekapitulasi nilai.
- Siswa dihadapkan pada 3 percabangan aksi akhir:
  - Opsi 1: Mengeklik "Ulangi Latihan" -> (Konektor A) mengarah ke Alur Nomor 5.
  - Opsi 2: Mengeklik "Lihat Pembahasan" -> (Konektor B) mengarah ke Alur Nomor 4.
  - Opsi 3: Mengeklik "Pilih Subtes Lain" -> (Konektor C) mengarah ke Alur Nomor 6.
- Status Akhir Alur: [Konektor A / B / C (Lanjut ke Alur Lain)]

### 4. Lihat Pembahasan Dari Hasil Belajar
- Status Awal Alur: [Konektor B (Lanjutan dari Alur Nomor 3)]
- Di layar hasil, Siswa mengeklik tombol "Lihat Pembahasan".
- Sistem menampilkan halaman evaluasi berisi navigasi daftar soal, status jawaban, dan kunci.
- Siswa dihadapkan pada percabangan interaksi yang akan terus me-loop (berputar):
  - Opsi 1: Memilih nomor soal lain di navigasi -> (Sistem memuat detail soal baru tersebut dan siswa bebas berinteraksi lagi).
  - Opsi 2: Mengeklik tombol "Tanya Pembahasan AI" -> (AI Tutor memberikan penjabaran konsep dan siswa tetap di soal ini).
  - Opsi 3: Mengirim chat balasan bebas -> (AI Tutor membalas secara interaktif dan siswa tetap di soal ini).
  - Opsi 4: Mengeklik "Keluar/Kembali" dari halaman pembahasan -> (Menutup mode review dan mengakhiri alur ini).
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 5. Ulangi Latihan
- Status Awal Alur: [Konektor A (Lanjutan dari Alur Nomor 3)]
- Di layar hasil, Siswa mengeklik tombol "Ulangi Latihan".
- Sistem segera menghapus/mereset riwayat sesi tadi dan memuat soal dari nomor 1 lagi.
- Siswa mulai mengerjakan soal dari awal lagi.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 6. Pilih Subtes Lain (dari Sesi Selesai)
- Status Awal Alur: [Konektor C (Lanjutan dari Alur Nomor 3)]
- Di layar hasil, Siswa mengeklik tombol "Pilih Subtes Lain".
- Sistem mengarahkan layar kembali ke halaman Learning Path.
- Siswa bebas memilih modul atau subtes pelajaran lainnya.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 7. Lihat Paket Tryout
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Siswa membuka menu Tryout di sidebar.
- Sistem menarik data ujian dari server dan menampilkan daftar paket tryout SNBT yang bisa diikuti.
- Siswa melihat-lihat jadwal dan paket yang tersedia.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 8. Mengerjakan Tryout
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Siswa memilih satu paket ujian, lalu mengeklik "Mulai".
- Sistem menyiapkan lembar soal simulasi dan mulai menjalankan hitung mundur waktu (timer).
- Siswa membaca soal dan dihadapkan pada aksi navigasi:
  - Opsi 1: Memilih jawaban dan mengeklik "Selanjutnya" -> (Sistem menyimpan jawaban dan berpindah ke soal berikutnya).
  - Opsi 2: Mengeklik "Sebelumnya" -> (Sistem berpindah mundur ke soal sebelumnya).
  - Opsi 3: Mencentang kotak "Ragu-ragu" -> (Sistem memberi tanda peringatan kuning pada nomor navigasi soal tersebut).
- Setelah ujian selesai, Siswa mengeklik "Kumpulkan" (atau Sistem akan mengumpulkan otomatis jika waktu habis).
- Sistem memproses hasil menggunakan metode perhitungan rumus IRT yang kompleks untuk mengukur skor.
- Sistem menampilkan skor akhir ke layar.
- Siswa dihadapkan pada 2 percabangan aksi akhir:
  - Opsi 1: Mengeklik "Lihat Review Jawaban" -> (Konektor A) mengarah ke Alur Nomor 9 (Mode Tampilan).
  - Opsi 2: Mengeklik "Bahas dengan AI Tutor" -> (Konektor B) mengarah ke Alur Nomor 9 (Mode Chat Socratic).
- Status Akhir Alur: [Konektor A / B (Lanjut ke Alur Lain)]

### 9. Lihat Review Jawaban & Bahas dengan AI Tutor (Tryout)
- Status Awal Alur: [Konektor A & B (Lanjutan dari Alur Nomor 8)]
- Siswa masuk ke halaman Review Tryout.
- Sistem menampilkan lembar review soal.
- Siswa mengeklik tombol "Bahas dengan AI Tutor".
- AI Tutor membuka panel chat dan masuk ke mode "Socratic" (menjadi guru yang memancing pemikiran siswa).
- Siswa merespons, dan AI Tutor akan menganalisis miskonsepsi (kesalahpahaman) siswa secara mendalam.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 10A. Navigasi Fleksibel Modul Rapor & Evaluasi
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Siswa mengeklik menu "Rapor & Evaluasi".
- Sistem memuat halaman khusus (Analytics).
- Siswa dihadapkan pada 3 percabangan tab yang bisa dipindah kapan saja secara bebas:
  - Opsi 1: Tab "Rapor & Tren" -> (Konektor A) mengarah ke Alur Nomor 10B.
  - Opsi 2: Tab "Evaluasi Soal" -> (Konektor B) mengarah ke Alur Nomor 11.
  - Opsi 3: Tab "Peluang Lolos" -> (Konektor C) mengarah ke Alur Nomor 13.
- Sistem langsung mengubah tampilan layar sesuai tab yang dipilih oleh Siswa.
- Status Akhir Alur: [Konektor A / B / C (Lanjut ke Alur Lain)]

### 10B. Lihat Analisis Kemampuan (Rapor & Tren)
- Status Awal Alur: [Konektor A (Lanjutan dari Alur Nomor 10A)]
- Siswa berada di tab "Rapor & Tren".
- Sistem mengkalkulasi selisih nilai siswa dengan target kampusnya secara otomatis.
- Sistem menampilkan Diagram Radar (jaring laba-laba), grafik tren nilai Tryout naik/turun, dan rincian kelemahan per subtes.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 11. Lihat Bank Soal Salah (Evaluasi Soal)
- Status Awal Alur: [Konektor B (Lanjutan dari Alur Nomor 10A)]
- Siswa berada di tab "Evaluasi Soal".
- Sistem mengumpulkan semua soal yang pernah dijawab salah atau ragu-ragu oleh siswa dari seluruh latihannya, lalu menampilkannya sebagai "Bank Soal Salah".
- Siswa meninjau kartu-kartu soal sulit tersebut.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 12. Lihat Bahas Soal dari Bank Soal Salah
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Siswa mengeklik tombol "Bahas AI" pada salah satu kartu soal di Bank Soal Salah.
- Sistem membuka Panel AI.
- AI Tutor menyapa siswa dan memuat konteks soal tersebut.
- Siswa berdiskusi dengan AI Tutor hingga paham.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 13. Lihat Peluang Lolos (Chancing Engine)
- Status Awal Alur: [Konektor C (Lanjutan dari Alur Nomor 10A)]
- Siswa berada di tab "Peluang Lolos".
- Sistem menjalankan mesin Chancing Engine untuk membandingkan skor siswa saat ini dengan rata-rata nilai masuk PTN sasaran.
- AI Tutor menganalisis angkanya dan memberikan rekomendasi jurusan alternatif jika target dinilai rawan.
- Sistem menyajikan persentase tingkat kelulusan di layar.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 14. Lihat Detail Salah Satu Jurusan Target
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Siswa mengeklik kartu jurusan (Misalnya: Kedokteran UI).
- Sistem memunculkan jendela timbul (popup) yang berisi statistik kuota, jumlah peminat, serta prioritas bobot subtes yang perlu dikejar.
- AI Tutor memberikan saran strategi belajar khusus untuk menembus jurusan tersebut.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 15. Bahas Soal Dalam Aplikasi (Ruang AI Tutor)
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Siswa mengeklik menu "Ruang AI Tutor".
- Sistem menampilkan arsip seluruh bank soal aplikasi (Katalog Soal).
- Siswa mengeklik tombol "Bahas" pada salah satu soal.
- AI Tutor langsung menyapa di panel chat.
- Siswa dan AI Tutor berdiskusi interaktif terkait soal arsip tersebut.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 16. Bahas Soal Luar Aplikasi (Custom Input)
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Di dalam Ruang AI Tutor, Siswa mengetik bebas atau menempel (copy-paste) naskah soal dari luar aplikasi (seperti tugas sekolah) ke dalam kolom chat.
- Siswa mengeklik tombol "Kirim".
- AI Tutor secara cerdas menganalisis struktur pertanyaan liar tersebut, lalu membalas dengan langkah-langkah penjelasan serta kunci jawaban yang tepat.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 17. Mengubah Pengaturan Profil & Target
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Siswa membuka menu "Pengaturan Profil & Target".
- Sistem menampilkan formulir berisi data diri dan 2 pilihan jurusan target UTBK.
- Siswa mengubah jurusan targetnya ke kampus lain, lalu mengeklik "Simpan Perubahan".
- Sistem memvalidasi dan menyimpan data tersebut ke dalam server.
- Sistem memunculkan notifikasi "Profil berhasil disimpan!".
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 18. Lihat Subtes (Practice / Quick Drill)
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Siswa mengeklik menu "Practice" (Latihan Cepat).
- Sistem memuat mode Quick Drill dan menyajikan kartu kategori subtes (misal: Literasi Bahasa Indonesia).
- Siswa meninjau kategori mana yang ingin dipakai pemanasan.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 19. Mengerjakan Subtes (Practice / Quick Drill)
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Siswa mengeklik tombol "Drill Sekarang" di salah satu subtes.
- Sistem secara acak menyiapkan kumpulan soal dan langsung menampilkannya.
- Mulai dari sini, alurnya sama persis dengan Mengerjakan Latihan Bab (Nomor 3): Sistem mengecek 2 kesempatan, dan AI Tutor mendampingi sepanjang soal. Di akhir sesi, Siswa juga akan menemui percabangan Konektor A, B, dan C.
- Status Akhir Alur: [Konektor A / B / C (Lanjut ke Alur Lain)]

---

## 👨💻 Bagian 2: Pengalaman Administrator (Admin)

### 1. Login & Lihat Learning Overview (Admin Dashboard)
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin memasukkan email dan password di halaman login khusus, lalu menekan "Login".
- Sistem memverifikasi bahwa akun tersebut punya hak akses 'ADMIN'.
- Sistem lalu membuka Dashboard khusus admin yang menampilkan statistik tingkat tinggi (total pengguna, soal, rata-rata skor).
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 2. Lihat User (Manajemen User)
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik menu "Kelola Pengguna".
- Sistem menarik data dari database dan menyajikannya dalam tabel berisi daftar seluruh siswa terdaftar.
- Admin memantau status keaktifan dan persebaran rata-rata nilai siswa secara global.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 3. Lihat Daftar Soal (Bank Soal & Kurikulum)
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik menu "Kelola Soal".
- Sistem menampilkan daftar ribuan soal utuh lengkap dengan tipe dan nilai bobot IRT-nya.
- Admin meninjau daftar pertanyaan-pertanyaan tersebut.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 4. Lihat Daftar Bab (Chapters)
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin bergeser ke tab "Daftar Bab".
- Sistem menampilkan tabel daftar semua bab (misal: Pecahan, Silogisme, dll).
- Admin meninjau susunan materi bab.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 5. Lihat Daftar Mata Pelajaran (Mapel)
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin bergeser ke tab "Mata Pelajaran".
- Sistem menampilkan tabel ketujuh subtes resmi UTBK.
- Admin meninjau pengelompokkan pelajarannya.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 6. Tambah Soal
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik tombol "Tambah Soal".
- Sistem memunculkan formulir isian panjang.
- Admin mengetik naskah pertanyaan, opsi jawaban A sampai E, menandai kunci jawaban, memberi bobot kesulitan, dan mengetik pembahasan teks. Kemudian mengeklik "Simpan".
- Sistem menyuntikkan data soal baru tersebut ke dalam server agar bisa langsung dikerjakan Siswa.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 7. Tambah Bab
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik tombol "Tambah Bab".
- Admin mengetikkan nama bab baru dan memilih masuk ke mapel apa.
- Sistem menyimpan daftar bab baru.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 8. Tambah Mata Pelajaran
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik tombol "Tambah Mata Pelajaran".
- Admin mengisi nama pelajaran (Jika suatu saat ada kurikulum baru).
- Sistem menyimpan matpel baru tersebut ke database.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 9. Edit Soal
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik ikon pensil (Edit) pada baris salah satu soal.
- Sistem memuat data soal lama ke dalam formulir.
- Admin merevisi pertanyaan yang keliru ketik, lalu menekan "Simpan".
- Sistem menimpa data lama dengan data baru yang sudah direvisi.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 10. Edit Bab
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik tombol edit di salah satu bab.
- Admin memperbaiki nama babnya.
- Sistem memperbarui namanya di database.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 11. Edit Mata Pelajaran
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik tombol edit di daftar mapel.
- Admin mengoreksi nama mapelnya.
- Sistem memperbaruinya.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 12. Hapus Soal
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik ikon tempat sampah pada baris soal.
- Sistem memunculkan peringatan pop-up "Yakin ingin menghapus?".
- Admin mengeklik "Ya, Hapus".
- Sistem melenyapkan soal tersebut selamanya dari aplikasi.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 13. Hapus Bab
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik ikon hapus pada bab.
- Sistem meminta konfirmasi. Setelah disetujui, Sistem menghapus bab tersebut.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 14. Hapus Mata Pelajaran
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik ikon hapus pada mapel.
- Sistem meminta konfirmasi. Setelah disetujui, Sistem menghapus mapel tersebut beserta segala hierarki di bawahnya.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 15. Lihat Daftar Universitas (Kelola PTN/Prodi)
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin membuka menu "Kelola PTN/Prodi".
- Sistem menampilkan tabel besar berisi nama-nama kampus dari seluruh Indonesia.
- Admin memantau daftar tersebut.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 16. Lihat Daftar Prodi (Kelola PTN/Prodi)
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin bergeser ke tab "Daftar Prodi".
- Sistem menampilkan ribuan daftar jurusan kuliah lengkap dengan skor batas amannya (passing grade).
- Admin memantau daftar jurusan.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 17. Tambah Universitas
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik tombol "Tambah Universitas".
- Admin memasukkan nama kampus baru (misalnya ITB), lalu klik Simpan.
- Sistem merekam data kampus baru tersebut ke database.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 18. Tambah Prodi
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik tombol "Tambah Prodi".
- Admin mengisi nama prodi (misalnya Ilmu Komputer), kuota tahun ini, jumlah saingan, dan menautkannya ke Universitas ITB. Lalu klik Simpan.
- Sistem menyimpan data jurusan baru tersebut untuk dipakai kalkulasi Chancing Engine.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 19. Edit Universitas
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengedit nama kampus yang mungkin salah ketik.
- Sistem memperbaruinya di server.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 20. Edit Prodi
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengedit data prodi (misal: memperbarui jumlah kuota mahasiswa yang berkurang di tahun ini).
- Sistem memperbarui data statistiknya di server.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 21. Hapus Universitas
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin menekan hapus pada nama kampus, mengonfirmasi, dan Sistem menghapusnya secara permanen.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 22. Hapus Prodi
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin menekan hapus pada nama jurusan, mengonfirmasi, dan Sistem menghapusnya dari daftar ketersediaan pendaftaran.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 23. Lihat Daftar Tryout
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin membuka menu "Kelola Tryout".
- Sistem menampilkan jadwal dan kumpulan paket Tryout SNBT (dari gelombang 1 sampai gelombang terakhir).
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 24. Tambah Tryout
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik tombol "Tambah Tryout Baru".
- Admin mengetikkan nama paket (misalnya "Tryout Akbar Maret") dan tanggal pelaksanaannya.
- Sistem membuat cangkang paket ujian baru yang masih kosong (belum ada soalnya).
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 25. Tambah Subtes Tryout
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Ke dalam cangkang ujian yang masih kosong, Admin mengeklik "Tambah Subtes" dan memilih blok soal apa saja yang akan masuk ke paket tersebut.
- Sistem merangkai blok-blok soal tersebut menjadi satu paket Tryout utuh.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 26. Edit Tryout
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik edit untuk memundurkan tanggal mulai Tryout.
- Sistem merevisi jadwalnya.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 27. Edit Subtes Tryout
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengedit pengaturan subtes (misalnya mengganti susunan bab yang diujikan).
- Sistem merevisi kerangka ujiannya.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 28. Hapus Tryout
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin menghapus sebuah paket Tryout secara utuh (mungkin karena sudah terlalu lawas).
- Sistem membersihkan data pelaksanaan Tryout tersebut dari layar Siswa.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 29. Hapus Subtes Tryout
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mencopot satu subtes dari dalam paket Tryout.
- Sistem melepaskan kaitan soal tersebut dari paket Tryout tanpa menghapus soalnya dari Bank Soal utama.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 30. Lihat Statistik Ringkasan Platform
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin membuka halaman "Analytics Admin".
- Sistem merender bagan visual yang menunjukkan total aktivitas akses server secara real-time.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 31. Lihat Statistik Evaluasi Ujian
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin berpindah ke tab "Ujian".
- Sistem merangkum sebaran nilai kurva normal (bell curve) dari seluruh nilai ujian peserta.
- Admin menganalisis apakah ujian bulan ini terlalu sulit atau terlalu gampang.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 32. Lihat Statistik Target Siswa
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin berpindah ke tab "Target Siswa".
- Sistem menyortir data kampus apa yang paling difavoritkan oleh pengguna secara real-time.
- Admin melihat minat pengguna bulan ini.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 33. Lihat Statistik Token & AI
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin berpindah ke tab "API & AI".
- Sistem melaporkan data pemakaian token prompt dari interaksi AI Tutor (berguna untuk pantauan biaya operasional ChatGPT API).
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 34. Lihat Pengaturan System Admin
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin mengeklik tombol "Pengaturan Situs".
- Sistem menampilkan panel kontrol konfigurasi (misalnya bobot perhitungan, sistem blokir, dan toggle batas token AI).
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 35. Ubah Pengaturan System Admin
- Status Awal Alur: [Lingkaran Hitam Penuh (Mulai Baru)]
- Admin menggeser tuas toggle dan mengubah pengaturan sistem.
- Sistem langsung memberlakukan aturan baru tersebut ke seluruh aplikasi Lexica UTBK pada detik itu juga.
- Status Akhir Alur: [Lingkaran Hitam Sempurna (Selesai)]

### 3.3.3 Perancangan Basis Data
**1. Entity Relationship Diagram (ERD)**

Gambar 3.4 Entity Relationship Diagram

Berdasarkan Gambar 3.4, perancangan basis data pada sistem dikembangkan menggunakan **Prisma ORM** yang dihubungkan ke dalam **PostgreSQL**. Struktur relasional ini dirancang khusus untuk mendukung sistem *tutoring* adaptif, gamifikasi, pencatatan respons AI, serta data target Universitas secara terpadu untuk platform UTBK SNBT.

Entitas utama dalam sistem ini adalah tabel **User**, yang berfungsi menyimpan data identitas dan autentikasi pengguna, meliputi nama, email, *password* (yang di-*hash*), serta peran (*role*). Tabel `User` memiliki relasi ke tabel **StudentProfile**, yang menyimpan konfigurasi preferensi khusus siswa seperti gaya percakapan AI (*aiStyle*, *aiEnergy*), asal sekolah, tahun kelulusan, dan relasi langsung ke tabel **Major** (target program studi pertama dan kedua). Tabel **University** dan **Major** merupakan entitas mandiri yang mencatat seluruh daftar universitas dan program studi, lengkap dengan data klaster, daya tampung, serta estimasi *score* (skor rasionalisasi) yang digunakan dalam fitur *Chancing Engine*.

Struktur materi ujian (bank soal) disusun secara bertingkat melalui tiga tabel hierarkis: **Subject** (mata pelajaran UTBK), **Chapter** (topik/subbab materi), dan **Question** (butir soal). Setiap mata pelajaran memiliki beberapa topik (relasi *one-to-many*). Kemudian, setiap topik (Chapter) menaungi banyak butir soal (*Question*). Soal-soal ini mendukung format teks *Markdown* dan KaTeX untuk ekspresi matematika. Tabel *Question* memiliki relasi terhadap **QuestionOption** yang menyimpan pilihan jawaban (A, B, C, D, E) berserta *flag* penanda kebenaran (*isCorrect*). Desain hierarkis ini tidak ditujukan sebagai penyimpanan konten *textbook*, melainkan murni sebagai struktur *question-based learning*.

Aktivitas pengerjaan latihan maupun ujian disimpan dalam tabel **ExamAttempt**, yang mencatat status (*IN_PROGRESS*, *COMPLETED*), waktu pengerjaan, skor mentah, serta skor *Scaled* (skala SNBT). *ExamAttempt* terhubung ke struktur templat ujian pada tabel **ExamTemplate** dan **ExamSection**. Rincian jawaban setiap butir soal yang dikerjakan siswa dipecah ke dalam tabel **QuestionResponse**, yang menyimpan opsi yang dipilih, jumlah waktu pengerjaan (*timeSpent* per soal), status kebenaran (*isCorrect*), serta *flagging* jika siswa menandai ragu-ragu.

Untuk mendukung fitur ITS dan *Adaptive Learning*, sistem menyediakan tabel **ChapterProgress** (sebagai *Mastery Tracking*), yang merekam tingkat persentase pemahaman (*masteryLevel*) setiap pengguna pada topik (*Chapter*) tertentu secara akumulatif. Selain itu, sistem menyimpan riwayat bimbingan *step-by-step* AI ke dalam tabel **TutoringSession** dan **TutoringMessage**, yang menyimpan seluruh *log* obrolan dengan *Role* (*User*, *Assistant*, *System*) agar model LLM memiliki memori kontekstual selama sesi pendampingan (*scaffolding*). Fitur operasional global sistem direkam pada tabel **SystemSetting**, yang memampukan admin mengubah konfigurasi *on-the-fly* tanpa perlu mengubah kode sumber.

### 3.3.4 Arsitektur Sistem

Gambar 3.5 Arsitektur Sistem

Berdasarkan Gambar 3.5, Arsitektur Sistem menunjukkan perancangan arsitektur umum yang menggambarkan alur interaksi secara utuh. Proses dimulai ketika pengguna (Client) mengakses sistem melalui peramban *web*. Antarmuka pengguna dan logika *server-side rendering* ditangani oleh **Next.js** (berbasis React) yang berjalan di atas *runtime* **Node.js**.

Seluruh permintaan data (*query/mutation*) ke *database* dihubungkan melalui perantara **Prisma ORM**, yang berkomunikasi dengan layanan *cloud database* **PostgreSQL**. Mekanisme autentikasi dikelola oleh *library* NextAuth (Auth.js) yang terhubung ke penyedia kredensial lokal dan layanan **Google OAuth 2.0 API** untuk metode masuk cepat.

Pada sisi kecerdasan buatan, sistem mengimplementasikan pola arsitektur *External LLM Integration*. *Backend* Next.js akan mengirimkan *prompt* yang telah disusun oleh *Prompt Builder* ke **Groq API** (yang menjalankan model *Llama-3*). Mengingat responsivitas AI sangat krusial, Groq dipilih karena kemampuan inferensinya yang sangat cepat. Namun, apabila layanan Groq API mengalami gangguan (*timeout*, kegagalan server, atau *rate limit*), sistem mengimplementasikan mekanisme *failover* (cadangan) secara otomatis untuk mengalihkan *request* ke **OpenRouter API** tanpa disadari oleh pengguna. Arsitektur toleransi kesalahan (*fault-tolerant*) ini memastikan layanan AI Tutor pada Mode Belajar UTBK tidak pernah terputus.

### 3.3.5 Perancangan AI Tutor

**1. Flowchart AI Tutor**
AI Tutor dirancang sebagai komponen utama dalam *Intelligent Tutoring System* (ITS) yang berfungsi memberikan bimbingan adaptif kepada siswa. AI Tutor mengevaluasi jawaban siswa dan menyesuaikan *scaffolding* berdasarkan jumlah percobaan (*attempt count*) dan histori penguasaan (*mastery*).

Gambar 3.6 Flowchart AI

Berdasarkan Gambar 3.6, proses diawali saat siswa mengirimkan jawaban. Sistem memeriksa kesesuaian jawaban. Jika jawaban benar, sistem mengkalkulasi skor, memperbarui *ChapterProgress*, dan AI memberikan penjelasan konfirmasi (*Positive Reinforcement*).
Jika jawaban salah, sistem mengecek batas percobaan (*attempt limit*). Data percobaan dan nilai penguasaan diteruskan ke *Rule-Based Strategy Selector*. *Prompt Builder* kemudian menyusun konteks (tanpa memberikan kunci jawaban berkat *Blind Mode*) dan mengirimkannya ke LLM (Groq/OpenRouter). LLM memberikan respons berupa *Socratic Hint* atau *Step-by-Step Guidance*, yang kemudian di-*render* di layar untuk memandu siswa pada percobaan selanjutnya.

**2. Prompt Builder & Blind Mode Architecture**
*Prompt Builder* menggabungkan teks soal, histori *chat* (di tabel `TutoringMessage`), opsi yang dipilih siswa yang salah, jumlah percobaan, dan gaya bahasa AI yang diatur di *StudentProfile*. 
Untuk memastikan prinsip pembelajaran formatif terjaga, sistem memberlakukan *Blind Mode Architecture*. LLM **tidak pernah disuplai** dengan informasi mana opsi yang benar dari pangkalan data. Hal ini mencegah LLM melakukan *hallucination* yang tak sengaja membocorkan kunci jawaban (A, B, C, etc.) kepada siswa, sehingga memaksa LLM murni fokus pada pembimbingan penalaran konseptual.

**3. Adaptive AI Prompting & Rule-Based Strategy Selector**
*Rule-Based Strategy Selector* bertindak sebagai pengendali utama tingkat bantuan (*Scaffold Level*). Apabila siswa baru satu kali menjawab salah, tingkat bantuan ditetapkan pada `SOCRATIC` (memberikan pancingan). Apabila siswa salah hingga dua atau tiga kali, tingkat bimbingan bergeser ke `SOLUTION / STEP-BY-STEP` (menuntun logika dari awal sampai akhir).
Selain itu, *Prompt Builder* menyuntikkan instruksi persona bahasa (misalnya: akademis, ramah, atau bahkan *sarcastic*) bergantung pada konfigurasi profil siswa serta parameter penguasaan (*Mastery Status*). Siswa di tingkat pemula mendapatkan intonasi penyampaian yang lebih sabar dan terperinci, sedangkan siswa tingkat lanjut mendapat penjelasan yang *to-the-point*.

### 3.3.6 Perancangan Learning Analytics dan Personalized Planning

**1. Weighted Scoring (Perhitungan Skor Akhir)**
Perhitungan skor pada Mode Belajar dirancang sebagai perpaduan antara Asesmen Formatif (Pre-Test, Main-Test) dan Sumatif (Post-Test). Berbeda dengan sistem konvensional, skor sistem ITS memperhitungkan proses pembelajaran siswa.
Pembobotan dirancang dengan: 20% Pre-Test, 40% Main-Test, dan 40% Post-Test. 
Nilai akhir ini (*Skor Akhir*) merepresentasikan pemahaman siswa setelah diintervensi oleh AI Tutor. Skor ini juga disimpan untuk mengalkulasi *MasteryLevel* di dalam `ChapterProgress`. Sementara itu, untuk Mode Tryout murni, sistem menerapkan perhitungan skor berbasis *Item Response Theory* (IRT) atau persentase murni tanpa pembobotan tahapan, mensimulasikan lingkungan UTBK SNBT aslinya.

**2. Mastery Tracking**
Di setiap akhir pengerjaan, nilai siswa diagregasikan ke dalam entitas `ChapterProgress` yang mencatat persentase *MasteryLevel* (0-100) per Topik Materi (Subbab). Nilai ini dihitung berdasar rasio jawaban benar terhadap seluruh soal yang pernah diselesaikan. 

**3. Personal Plan (Chancing Engine Integrations)**
Fitur *Personal Plan* menyusun urutan materi (*Learning Path*) khusus untuk tiap siswa. Pada aplikasi ini, prioritas materi diukur dengan mengkorelasikan *MasteryLevel* topik siswa dengan data *Estimated Score* dari Universitas dan Jurusan target yang disimpan di `StudentProfile`. Topik materi dengan bobot nilai UTBK SNBT yang sering keluar, namun persentase pemahaman siswa (Mastery) masih sangat rendah (misal < 40%), akan dinaikkan prioritasnya di antarmuka agar dipelajari lebih dahulu (Priority Score tinggi).

## 3.4 Alat dan Bahan Tugas Akhir
Dalam pengembangan platform simulasi UTBK SNBT ini, alat dan bahan yang digunakan dikelompokkan sebagai berikut:

### 3.4.1 Perangkat Keras (Hardware)
**Alat Utama:**
- OS: Windows 11 (64-bit) / macOS
- Processor: Setara Intel Core i5 @2.50GHz atau lebih tinggi
- RAM: Minimum 16GB
- Penyimpanan: SSD 512GB

### 3.4.2 Perangkat Lunak (Software)
Pengembangan perangkat lunak memanfaatkan ekosistem berbasis JavaScript/TypeScript dan basis data relasional:
- **Visual Studio Code**: Sebagai *Integrated Development Environment* (IDE).
- **Node.js**: Sebagai *runtime environment* eksekusi *server*.
- **Next.js**: Sebagai *framework* utama aplikasi (*Full-stack React*).
- **Prisma ORM**: Sebagai alat bantu penghubung dan migrasi struktur ke basis data.
- **PostgreSQL**: Sebagai basis data relasional utama.
- **Git**: Sebagai sistem kontrol versi kode (*Version Control System*).

### 3.4.3 Layanan Kecerdasan Buatan (AI)
Integrasi *Intelligent Tutoring System* difasilitasi oleh layanan *Cloud API*:
- **Groq API**: Digunakan sebagai *engine* AI utama (Model *Llama 3 70B* / *8B*) karena kecepatannya dalam menghasilkan token (*Hint*, *Feedback*, dan *Study Report*) secara instan.
- **OpenRouter API**: Berperan sebagai layanan API *fallback* (cadangan), yang memiliki *routing* ke berbagai model bahasa mutakhir, menjaga kontinuitas layanan saat penyedia utama bermasalah.

### 3.4.4 Dataset Pihak Ketiga
Dataset meliputi referensi daftar Universitas, target Program Studi, serta materi *tryout* UTBK SNBT dari tahun sebelumnya yang didapatkan dari publikasi resmi SNPMB, buku kompilasi soal, dan pangkalan data kampus. Dataset estimasi nilai digunakan untuk simulasi peluang lulus pada modul *Chancing Engine*.

### 3.4.5 Dataset Pihak Pertama
Data bank soal primer dikompilasi secara mandiri ke dalam lembar kerja (*Spreadsheet*). Soal-soal tersebut, yang terdiri dari komponen teks, ekspresi matematis (LaTeX), dan gambar, dikonversi menggunakan piranti parsial (*parser*) otomatis ke dalam format JSON yang kemudian di-*seed* langsung ke basis data PostgreSQL agar dapat di-*render* secara dinamis oleh aplikasi.