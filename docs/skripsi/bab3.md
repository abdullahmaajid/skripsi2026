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
Pada tahap ini, sistem yang telah selesai dibangun mulai diterapkan ke lingkungan yang sebenarnya agar dapat diakses dan digunakan oleh pengguna. Proses ini meliputi instalasi dan konfigurasi sistem, migrasi basis data, serta pengaturan *environment*, termasuk konfigurasi API key untuk OpenRouter. Selain itu, dilakukan pula pengenalan sistem kepada calon pengguna, yaitu Siswa dan Admin, agar mereka memahami cara mengakses dan menggunakan fitur-fitur sesuai dengan perannya masing-masing. Tahap ini menjadi penghubung antara sistem yang telah selesai dikembangkan dengan tahap evaluasi, karena sistem yang telah diimplementasikan tersebut akan langsung digunakan oleh responden sebelum masuk ke pengujian pada tahap berikutnya.

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
| 1 | Siswa dapat melakukan registrasi dan *login* ke dalam sistem menggunakan kredensial email. |
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
a. Sistem dirancang agar dapat diandalkan dalam berinteraksi dengan layanan eksternal, seperti layanan *Artificial Intelligence* (AI).
b. Sistem dirancang dapat merespons setiap interaksi pengguna dengan cepat selama proses pembelajaran maupun pelaksanaan ujian (*real-time processing*).
c. Antarmuka sistem dibuat dengan memperhatikan kemudahan penggunaan (*user-friendly*) agar setiap pengguna dapat mengoperasikan sistem dengan lebih mudah.
d. Keamanan data dijaga dengan menerapkan metode *hashing* pada *password* sebelum disimpan ke dalam basis data serta melengkapi *Security Headers* standar.
e. Sistem dirancang untuk mampu menangani beban akses tinggi (*high concurrency*) dari ratusan koneksi secara bersamaan tanpa mengalami penolakan servis (*crash*).
f. Aplikasi dilengkapi dengan perlindungan *Secure CBT Mode* (*Anti-Cheat*) yang terintegrasi di sisi peramban klien untuk menjamin integritas pelaksanaan ujian.

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
Arsitektur sistem digunakan untuk menggambarkan hubungan antar komponen utama yang membangun aplikasi. Pada penelitian ini, sistem dikembangkan menggunakan arsitektur berbasis *web* modern dengan **Next.js** sebagai *framework* utama dan **Prisma** sebagai *Object-Relational Mapping* (ORM). Koneksi ke basis data **PostgreSQL** dijembatani oleh *middleware* *connection pooler* **PgBouncer** guna memastikan stabilitas lalu lintas ribuan kueri tanpa membebani memori pangkalan data secara langsung. Layanan **OpenRouter API** bertindak sebagai penyedia *Large Language Model* (LLM). Perancangan arsitektur sistem bertujuan untuk memberikan gambaran mengenai alur komunikasi antar komponen sehingga proses pengolahan data dan layanan AI dapat berjalan dengan lancar secara *real-time* dan tangguh terhadap *spike traffic*.

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
Setelah berhasil *login*, Admin memiliki hak akses penuh untuk melakukan pengelolaan (*Create, Read, Update, Delete* / CRUD) terhadap entitas sistem, meliputi:
- Kelola Pengguna (Tambah, Lihat, Perbarui, Hapus).
- Kelola Daftar Soal (Tambah, Lihat, Perbarui, Hapus).
- Kelola Daftar Bab (Tambah, Lihat, Perbarui, Hapus).
- Kelola Mata Pelajaran (Tambah, Lihat, Perbarui, Hapus).
- Kelola Paket Tryout (Tambah, Lihat, Perbarui, Hapus).
- Kelola Subtes (Tambah, Lihat, Perbarui, Hapus).
- Pantau Ringkasan Platform, Analitik & Evaluasi Ujian, Target Siswa, serta Penggunaan Token AI.
- Kelola Daftar Universitas dan Program Studi (Tambah, Lihat, Perbarui, Hapus).
- Kelola Pengaturan dan Peraturan Sistem.
- Logout.

### 3.3.2 Activity Diagram

Dokumen ini menjelaskan alur cerita bagaimana setiap pihak berinteraksi di dalam platform Lexica UTBK. Alur menggambarkan apa yang dilakukan oleh Siswa dan Admin, bagaimana sistem merespons, serta interaksi dengan AI Tutor. Seluruh alur diagram dijabarkan sebagai berikut.

**1. Activity Diagram Siswa dan Admin**

**a. Login**
Gambar 3.3 Activity Diagram Login
Gambar 3.3 menggambarkan proses pengguna ke dalam sistem. Proses dimulai ketika pengguna membuka halaman login, kemudian memasukkan informasi yang diperlukan untuk proses autentikasi. Selanjutnya, sistem akan memverifikasi data yang dimasukkan. Apabila proses autentikasi berhasil, sistem akan mengarahkan pengguna ke dashboard sesuai dengan role yang dimiliki. Jika autentikasi gagal, sistem akan menampilkan pesan kesalahan dan mengarahkan kembali ke halaman login.

**b. Register**
Gambar 3.4 Activity Diagram Register
Gambar 3.4 menggambarkan proses pengguna dalam melakukan pendaftaran ke dalam sistem. Proses dimulai ketika pengguna membuka halaman pendaftaran dan memasukkan data diri yang diperlukan. Selanjutnya, sistem akan memverifikasi validitas data ke database. Apabila data valid, sistem akan menyimpan data dan mengarahkan pengguna ke halaman login. Jika tidak valid, sistem akan menampilkan pesan kesalahan.

---

**2. Activity Diagram Siswa**

**a. Lihat Learning Overview (Dashboard Siswa)**
Gambar 3.5 Activity Diagram Lihat Learning Overview
Gambar 3.5 menggambarkan proses Siswa dalam mengakses ringkasan pembelajaran yang tersedia dalam sistem. Setelah Siswa berhasil masuk dan diarahkan ke halaman utama, sistem akan mengambil data dari database dan menampilkan keseluruhan ringkasan data nilai serta progres belajar pada halaman dashboard.

**b. Memilih Materi Belajar (Learning Path)**
Gambar 3.6 Activity Diagram Memilih Materi Belajar
Gambar 3.6 menggambarkan proses Siswa dalam memilih materi belajar. Proses dimulai ketika Siswa membuka menu perjalanan belajar. Selanjutnya, sistem akan mengambil data dari database dan menampilkan daftar mata pelajaran beserta bab materi yang dapat dipelajari oleh Siswa.

**c. Mengerjakan Latihan Bab**
Gambar 3.7 Activity Diagram Mengerjakan Latihan Bab
Gambar 3.7 menggambarkan proses Siswa dalam mengerjakan soal latihan. Proses dimulai saat Siswa memilih suatu materi, kemudian sistem menampilkan lembar soal. Siswa memilih jawaban yang dianggap benar. Sistem akan mengecek jawaban tersebut dan memberikan respons yang sesuai. Apabila jawaban salah, sistem memberi kesempatan kedua beserta petunjuk dari AI. Apabila jawaban benar, sistem menampilkan opsi untuk melihat pembahasan AI sebelum lanjut ke nomor selanjutnya.

**d. Lihat Pembahasan Dari Hasil Belajar**
Gambar 3.8 Activity Diagram Lihat Pembahasan Dari Hasil Belajar
Gambar 3.8 menggambarkan proses Siswa dalam melihat pembahasan hasil latihan. Setelah Siswa menyelesaikan latihan, sistem akan menampilkan halaman hasil akhir. Siswa dapat menekan tombol untuk melihat evaluasi. Sistem kemudian menampilkan halaman yang berisi nomor soal dan kunci jawaban, di mana Siswa dapat meninjau detail dari setiap pertanyaan.

**e. Ulangi Latihan**
Gambar 3.9 Activity Diagram Ulangi Latihan
Gambar 3.9 menggambarkan proses Siswa dalam mengulang sesi pengerjaan latihan. Setelah Siswa berada di halaman hasil dan menekan tombol untuk mengulang, sistem akan menghapus riwayat pengerjaan saat itu, lalu memuat ulang lembar soal dari awal agar Siswa dapat mengerjakan kembali.

**f. Pilih Subtes Lain**
Gambar 3.10 Activity Diagram Pilih Subtes Lain
Gambar 3.10 menggambarkan proses Siswa dalam beralih ke latihan pada materi lain. Setelah Siswa berada di halaman hasil akhir dan memilih opsi subtes lain, sistem akan memproses permintaan tersebut dan mengarahkan Siswa kembali ke halaman pemilihan materi belajar.

**g. Lihat Paket Tryout**
Gambar 3.11 Activity Diagram Lihat Paket Tryout
Gambar 3.11 menggambarkan proses Siswa dalam mengakses data jadwal ujian simulasi. Setelah Siswa membuka menu tryout, sistem akan mengambil data dari database dan menampilkan ketersediaan jadwal beserta paket soal ujian yang dapat dikerjakan oleh Siswa.

**h. Mengerjakan Tryout**
Gambar 3.12 Activity Diagram Mengerjakan Tryout
Gambar 3.12 menggambarkan proses Siswa dalam melaksanakan simulasi ujian. Proses dimulai saat Siswa memilih paket ujian dan menekan tombol mulai. Sistem akan menampilkan lembar soal beserta penunjuk waktu berjalan. Setelah Siswa selesai dan menekan kumpulkan, sistem akan mengalkulasi skor keseluruhan dan menampilkannya pada layar hasil akhir.

**i. Lihat Review Jawaban & Bahas dengan AI Tutor**
Gambar 3.13 Activity Diagram Lihat Review Jawaban Tryout
Gambar 3.13 menggambarkan proses Siswa dalam berinteraksi dengan AI Tutor pasca ujian. Setelah Siswa membuka halaman evaluasi tryout dan menekan tombol pembahasan AI, sistem akan memunculkan area diskusi di mana AI menganalisis miskonsepsi Siswa secara mendalam tanpa langsung memberikan jawaban.

**j. Navigasi Modul Rapor & Evaluasi**
Gambar 3.14 Activity Diagram Navigasi Modul Rapor
Gambar 3.14 menggambarkan proses Siswa dalam bernavigasi pada halaman rapor. Proses dimulai saat Siswa membuka menu evaluasi, kemudian sistem memuat halaman analitik. Sistem akan menampilkan pilihan tab informasi, dan memperbarui konten tampilan sesuai dengan opsi tab yang dipilih oleh Siswa.

**k. Lihat Analisis Kemampuan (Rapor & Tren)**
Gambar 3.15 Activity Diagram Lihat Analisis Kemampuan
Gambar 3.15 menggambarkan proses Siswa dalam meninjau grafik analisis nilainya. Setelah Siswa membuka tab rapor, sistem akan melakukan perhitungan otomatis dan menampilkan grafik perkembangan nilai beserta selisih dengan target jurusan Siswa.

**l. Lihat Bank Soal Salah**
Gambar 3.16 Activity Diagram Lihat Bank Soal Salah
Gambar 3.16 menggambarkan proses Siswa dalam melihat daftar soal yang sulit. Setelah Siswa mengakses tab evaluasi, sistem akan mengumpulkan data riwayat kesalahan Siswa dari database dan menampilkannya sebagai daftar soal yang perlu ditinjau ulang.

**m. Bahas Soal dari Bank Soal Salah**
Gambar 3.17 Activity Diagram Bahas Soal dari Bank Soal Salah
Gambar 3.17 menggambarkan proses Siswa dalam membahas ulang soal yang salah. Proses dimulai saat Siswa memilih satu soal dari daftar soal salah dan meminta penjelasan AI. Sistem akan memuat pertanyaan tersebut ke ruang diskusi, dan AI Tutor akan membantu Siswa memahami penyelesaiannya.

**n. Lihat Peluang Lolos (Chancing Engine)**
Gambar 3.18 Activity Diagram Lihat Peluang Lolos
Gambar 3.18 menggambarkan proses Siswa dalam mengecek rasionalisasi peluang kelulusan. Setelah Siswa mengakses tab peluang lolos, sistem akan membandingkan skor ujian Siswa dengan standar nilai masuk jurusan terkait di database, lalu menampilkan angka persentase kemungkinannya pada layar.

**o. Lihat Detail Jurusan Target**
Gambar 3.19 Activity Diagram Lihat Detail Jurusan Target
Gambar 3.19 menggambarkan proses Siswa dalam mengakses rincian data kampus pilihan. Saat Siswa menekan sebuah jurusan target, sistem akan mengambil data dari database dan menampilkan rincian seperti jumlah peminat serta kuota ketersediaan pada halaman popup.

**p. Bahas Soal Dalam Aplikasi**
Gambar 3.20 Activity Diagram Bahas Soal Dalam Aplikasi
Gambar 3.20 menggambarkan proses Siswa dalam berdiskusi bebas tentang soal yang tersedia di aplikasi. Setelah Siswa membuka menu katalog ruang tutor, sistem menampilkan arsip soal. Siswa kemudian memilih salah satu soal, dan sistem memulai ruang obrolan dengan AI Tutor untuk pembahasan soal tersebut.

**q. Bahas Soal Luar Aplikasi**
Gambar 3.21 Activity Diagram Bahas Soal Luar Aplikasi
Gambar 3.21 menggambarkan proses Siswa dalam menanyakan soal dari luar sistem. Proses dimulai saat Siswa mengetik teks bebas pada kolom diskusi, lalu mengirimkannya. Sistem akan memproses teks masukan tersebut dan AI Tutor akan memberikan balasan berupa penjelasan terkait soal tersebut.

**r. Mengubah Pengaturan Profil & Target**
Gambar 3.22 Activity Diagram Mengubah Pengaturan Profil
Gambar 3.22 menggambarkan proses Siswa dalam mengubah data pengaturan. Proses dimulai saat Siswa membuka formulir data profil dan memilih target jurusan baru. Selanjutnya, sistem akan menyimpan perubahan data tersebut ke database dan menampilkan pemberitahuan bahwa data berhasil diperbarui.

**s. Lihat Subtes Practice**
Gambar 3.23 Activity Diagram Lihat Subtes Practice
Gambar 3.23 menggambarkan proses Siswa dalam melihat ketersediaan latihan cepat. Setelah Siswa membuka menu practice, sistem akan mengambil data kategori dari database dan menampilkan pilihan kategori subtes yang siap dilatih.

**t. Mengerjakan Subtes Practice**
Gambar 3.24 Activity Diagram Mengerjakan Subtes Practice
Gambar 3.24 menggambarkan proses Siswa dalam menyelesaikan latihan cepat. Proses dimulai saat Siswa memilih sebuah kategori subtes, lalu sistem akan secara acak menarik sejumlah soal dari database dan menampilkannya satu persatu untuk dijawab oleh Siswa.

---

**3. Activity Diagram Admin**

**a. Tambah Pengguna**
Gambar 3.25 Activity Diagram Tambah Pengguna
Gambar 3.25 menggambarkan proses Admin dalam menambahkan data pengguna baru ke dalam sistem. Proses dimulai ketika Admin membuka halaman manajemen pengguna dan menekan tombol tambah. Selanjutnya, sistem akan menampilkan formulir pengisian data, memvalidasi input Admin, lalu menyimpannya ke database.

**b. Memperbarui Pengguna**
Gambar 3.26 Activity Diagram Memperbarui Pengguna
Gambar 3.26 menggambarkan proses Admin dalam memperbarui data pengguna. Setelah Admin memilih salah satu pengguna pada tabel dan mengubah isi informasinya, sistem akan merekam modifikasi tersebut dan memperbarui catatan pengguna yang sesuai pada database.

**c. Melihat Pengguna**
Gambar 3.27 Activity Diagram Melihat Pengguna
Gambar 3.27 menggambarkan proses Admin dalam mengakses data pengguna yang tersedia dalam sistem. Setelah Admin membuka menu manajemen pengguna, sistem akan mengambil data dari database dan menampilkan keseluruhan data pengguna pada halaman manajemen pengguna.

**d. Menghapus Pengguna**
Gambar 3.28 Activity Diagram Menghapus Pengguna
Gambar 3.28 menggambarkan proses Admin dalam menghapus data pengguna. Proses dimulai ketika Admin menekan tombol hapus pada suatu baris pengguna, sistem akan meminta konfirmasi, dan setelah disetujui, sistem akan menghapus pengguna tersebut secara permanen dari database.

**e. Tambah Daftar Soal**
Gambar 3.29 Activity Diagram Tambah Daftar Soal
Gambar 3.29 menggambarkan proses Admin dalam menambahkan instrumen soal ke dalam sistem. Setelah Admin menekan tombol tambah soal dan mengisi detail pertanyaan beserta kuncinya, sistem akan mengolah masukan tersebut lalu menyimpannya ke dalam database sebagai butir soal baru.

**f. Memperbarui Daftar Soal**
Gambar 3.30 Activity Diagram Memperbarui Daftar Soal
Gambar 3.30 menggambarkan proses Admin dalam merevisi butir soal yang sudah ada. Saat Admin mengedit konten teks pertanyaan atau jawaban pada formulir dan menekan tombol simpan, sistem akan melakukan pembaruan pada rekaman database.

**g. Melihat Daftar Soal**
Gambar 3.31 Activity Diagram Melihat Daftar Soal
Gambar 3.31 menggambarkan proses Admin dalam mengakses koleksi daftar soal. Setelah Admin membuka menu pengelolaan soal, sistem akan mengambil data dari database dan menampilkan seluruh kumpulan butir soal pada halaman tersebut.

**h. Menghapus Daftar Soal**
Gambar 3.32 Activity Diagram Menghapus Daftar Soal
Gambar 3.32 menggambarkan proses Admin dalam menghapus instrumen soal. Setelah Admin mengeklik fungsi hapus pada sebuah entri soal dan mengonfirmasinya, sistem akan memproses penghapusan data tersebut sepenuhnya dari database.

**i. Tambah Daftar Bab**
Gambar 3.33 Activity Diagram Tambah Daftar Bab
Gambar 3.33 menggambarkan proses Admin dalam menambahkan kelompok bab materi baru. Setelah Admin memasukkan nama bab dan menekan tombol simpan, sistem akan membuat entri data baru untuk bab tersebut di dalam database.

**j. Memperbarui Daftar Bab**
Gambar 3.34 Activity Diagram Memperbarui Daftar Bab
Gambar 3.34 menggambarkan proses Admin dalam memperbaiki detail pada sebuah bab. Setelah Admin mengubah data nama bab dan menyimpannya, sistem akan merekam perubahan tersebut secara permanen pada database.

**k. Melihat Daftar Bab**
Gambar 3.35 Activity Diagram Melihat Daftar Bab
Gambar 3.35 menggambarkan proses Admin dalam mengakses daftar bab materi. Setelah Admin membuka halaman daftar bab, sistem akan mengambil seluruh data rincian bab dari database lalu menampilkannya secara terurut pada halaman manajemen.

**l. Menghapus Daftar Bab**
Gambar 3.36 Activity Diagram Menghapus Daftar Bab
Gambar 3.36 menggambarkan proses Admin dalam menghapus bab beserta asosiasinya. Setelah Admin menekan aksi hapus dan memberikan persetujuan, sistem akan menghilangkan entri bab tersebut dari database.

**m. Tambah Mata Pelajaran**
Gambar 3.37 Activity Diagram Tambah Mata Pelajaran
Gambar 3.37 menggambarkan proses Admin dalam menambahkan entri mata pelajaran baru. Setelah Admin mengisi kolom nama bidang studi, sistem akan merekam data tersebut ke dalam basis data sebagai kurikulum baru.

**n. Memperbarui Mata Pelajaran**
Gambar 3.38 Activity Diagram Memperbarui Mata Pelajaran
Gambar 3.38 menggambarkan proses Admin dalam mengubah ejaan nama mata pelajaran. Ketika Admin mengoreksi teks dan menekan simpan, sistem akan memodifikasi rekaman sebelumnya di dalam database.

**o. Melihat Mata Pelajaran**
Gambar 3.39 Activity Diagram Melihat Mata Pelajaran
Gambar 3.39 menggambarkan proses Admin dalam mengakses daftar mata pelajaran utama. Setelah Admin membuka tab yang sesuai, sistem akan mengambil data dari database dan menampilkan seluruh kategori mata pelajaran kepada pengguna.

**p. Menghapus Mata Pelajaran**
Gambar 3.40 Activity Diagram Menghapus Mata Pelajaran
Gambar 3.40 menggambarkan proses Admin dalam melenyapkan sebuah mata pelajaran secara utuh. Setelah Admin menekan aksi hapus, sistem akan membersihkan segala rekaman data terkait mapel tersebut dari dalam database.

**q. Tambah Paket Tryout**
Gambar 3.41 Activity Diagram Tambah Paket Tryout
Gambar 3.41 menggambarkan proses Admin dalam merencanakan jadwal ujian baru. Setelah Admin memberikan nama dan rentang waktu pelaksanaan pada formulir, sistem akan menyimpannya sebagai kerangka awal paket tryout ke dalam database.

**r. Memperbarui Paket Tryout**
Gambar 3.42 Activity Diagram Memperbarui Paket Tryout
Gambar 3.42 menggambarkan proses Admin dalam merevisi tenggat waktu pengerjaan paket. Setelah Admin mengubah tanggal pada formulir edit dan menyimpannya, sistem akan mencatatkan penyesuaian baru tersebut di database.

**s. Melihat Paket Tryout**
Gambar 3.43 Activity Diagram Melihat Paket Tryout
Gambar 3.43 menggambarkan proses Admin dalam memantau koleksi paket tryout yang ada. Setelah Admin mengakses menu tryout, sistem akan menarik data dari database dan menyajikan daftar jadwal ujian yang tersedia pada layar.

**t. Menghapus Paket Tryout**
Gambar 3.44 Activity Diagram Menghapus Paket Tryout
Gambar 3.44 menggambarkan proses Admin dalam menghapus paket ujian yang telah usang. Setelah Admin memberikan konfirmasi hapus, sistem akan menghapus entri paket dan menyembunyikannya dari tampilan siswa.

**u. Tambah Subtes Tryout**
Gambar 3.45 Activity Diagram Tambah Subtes Tryout
Gambar 3.45 menggambarkan proses Admin dalam menyuntikkan soal ke dalam paket tryout. Setelah Admin memilih komposisi blok soal, sistem akan menautkan daftar soal yang bersangkutan ke kerangka ujian tryout di database.

**v. Memperbarui Subtes Tryout**
Gambar 3.46 Activity Diagram Memperbarui Subtes Tryout
Gambar 3.46 menggambarkan proses Admin dalam menyunting susunan materi sebuah ujian. Saat Admin menyesuaikan komposisi bab, sistem merespons dengan memodifikasi tata letak soal ujian di dalam database.

**w. Menghapus Subtes Tryout**
Gambar 3.47 Activity Diagram Menghapus Subtes Tryout
Gambar 3.47 menggambarkan proses Admin dalam mencabut relasi blok soal dari paket. Setelah Admin memberikan perintah hapus kaitan, sistem akan meniadakan ikatan paket tryout tersebut tanpa menghapus soal asli.

**x. Menampilkan Tab Ringkasan Platform**
Gambar 3.48 Activity Diagram Menampilkan Ringkasan Platform
Gambar 3.48 menggambarkan proses Admin dalam memuat modul laporan performa. Setelah Admin mengeklik menu analitik, sistem akan memuat tata letak antarmuka yang berisi pilihan berbagai tab observasi.

**y. Melihat Statistik Ringkasan Platform**
Gambar 3.49 Activity Diagram Melihat Statistik Platform
Gambar 3.49 menggambarkan proses Admin dalam melihat rekapitulasi data agregat. Setelah Admin membuka tab terkait, sistem akan mengambil data kalkulasi kumulatif dari database lalu menampilkannya menjadi laporan statistik interaktif.

**z. Melihat Statistik Evaluasi Ujian**
Gambar 3.50 Activity Diagram Melihat Evaluasi Ujian
Gambar 3.50 menggambarkan proses Admin dalam meninjau distribusi skor siswa secara massal. Setelah Admin membuka tab analisis ujian, sistem akan mengumpulkan data skor dari database lalu merendernya dalam bentuk diagram belasan.

**aa. Melihat Statistik Target Siswa**
Gambar 3.51 Activity Diagram Melihat Target Siswa
Gambar 3.51 menggambarkan proses Admin dalam mengamati preferensi pemilihan kampus oleh pengguna. Saat tab target diakses, sistem akan mengekstrak informasi jurusan dari pengguna dan menampilkannya sebagai peringkat minat studi.

**bb. Melihat Statistik Token & AI**
Gambar 3.52 Activity Diagram Melihat Statistik Token
Gambar 3.52 menggambarkan proses Admin dalam mengaudit laporan pemakaian beban AI. Setelah Admin membuka tab sistem, sistem mengambil catatan kalkulasi token dari database untuk menampilkannya pada dashboard operasional.

**cc. Menampilkan Tab Daftar Universitas**
Gambar 3.53 Activity Diagram Menampilkan Daftar Universitas
Gambar 3.53 menggambarkan proses Admin dalam mengakses panel kelola kampus negeri. Setelah Admin menavigasi menu terkait, sistem memuat tabel relasional perguruan tinggi dari database.

**dd. Melihat Daftar Program Studi**
Gambar 3.54 Activity Diagram Melihat Daftar Program Studi
Gambar 3.54 menggambarkan proses Admin dalam mengakses spesifikasi jurusan perkuliahan. Saat tab prodi ditekan, sistem mengambil data lengkap daya tampung dan standar kelulusan dari database ke dalam layar antarmuka.

**ee. Tambah Program Studi**
Gambar 3.55 Activity Diagram Tambah Program Studi
Gambar 3.55 menggambarkan proses Admin dalam menambah data prodi perkuliahan. Setelah Admin memasukkan informasi jurusan terkait pada formulir, sistem akan memverifikasi lalu merekam entitas program studi baru ke pangkalan data.

**ff. Memperbarui Program Studi**
Gambar 3.56 Activity Diagram Memperbarui Program Studi
Gambar 3.56 menggambarkan proses Admin dalam mengoreksi ketersediaan kursi jurusan. Saat Admin merevisi data keketatan atau persentase passing grade, sistem akan memperbarui nilainya di database.

**gg. Menghapus Program Studi**
Gambar 3.57 Activity Diagram Menghapus Program Studi
Gambar 3.57 menggambarkan proses Admin dalam membuang rujukan prodi dari ketersediaan pilihan siswa. Setelah konfirmasi diberikan, sistem akan menonaktifkan atau menghapus instansi program studi dari database.

**hh. Melihat Daftar Universitas**
Gambar 3.58 Activity Diagram Melihat Daftar Universitas
Gambar 3.58 menggambarkan proses Admin dalam meninjau tabel daftar perguruan tinggi tingkat institusi. Setelah antarmuka terbuka, sistem akan menyajikan himpunan data universitas tersebut dari database.

**ii. Tambah Data Universitas**
Gambar 3.59 Activity Diagram Tambah Universitas
Gambar 3.59 menggambarkan proses Admin dalam menambahkan entitas nama perguruan tinggi. Setelah Admin mengisi nama baru pada jendela penambahan, sistem akan menyuntikkan data nama universitas tersebut ke dalam sistem relasional.

**jj. Memperbarui Data Universitas**
Gambar 3.60 Activity Diagram Memperbarui Universitas
Gambar 3.60 menggambarkan proses Admin dalam memperbaiki detail nomenklatur universitas. Saat Admin merubah ejaan dan mengeklik tombol setuju, sistem memodifikasi nama institusi di pangkalan data secara universal.

**kk. Menghapus Data Universitas**
Gambar 3.61 Activity Diagram Menghapus Universitas
Gambar 3.61 menggambarkan proses Admin dalam menghilangkan universitas induk berserta daftar jurusannya. Saat perintah dieksekusi, sistem akan menghapus seluruh data afiliasinya dari database secara menyeluruh.

**ll. Melihat Pengaturan Sistem**
Gambar 3.62 Activity Diagram Melihat Pengaturan Sistem
Gambar 3.62 menggambarkan proses Admin dalam mengakses panel pengendalian inti. Saat Admin mengeklik tombol pengaturan, sistem akan mengambil susunan konfigurasi teknis dari database lalu menghadirkannya dalam menu kontrol.

**mm. Memperbarui Peraturan Sistem**
Gambar 3.63 Activity Diagram Memperbarui Peraturan Sistem
Gambar 3.63 menggambarkan proses Admin dalam melakukan penyesuaian aturan operasional situs. Saat Admin mengganti sebuah parameter teknis, sistem langsung menerapkan nilai tersebut secara real-time pada saat itu juga.



### 3.3.3 Perancangan Basis Data
**1. Entity Relationship Diagram (ERD)**

Gambar 3.64 Entity Relationship Diagram

Berdasarkan Gambar 3.64, perancangan basis data pada sistem dikembangkan menggunakan **Prisma ORM** yang dihubungkan ke dalam **PostgreSQL**. Struktur relasional ini dirancang khusus untuk mendukung sistem *tutoring* adaptif, gamifikasi, pencatatan respons AI, serta data target Universitas secara terpadu untuk platform UTBK SNBT.

Entitas utama dalam sistem ini adalah tabel **User**, yang berfungsi menyimpan data identitas dan autentikasi pengguna, meliputi nama, email, *password* (yang di-*hash*), serta peran (*role*). Tabel `User` memiliki relasi ke tabel **StudentProfile**, yang menyimpan konfigurasi preferensi khusus siswa seperti gaya percakapan AI (*aiStyle*, *aiEnergy*), asal sekolah, tahun kelulusan, dan relasi langsung ke tabel **Major** (target program studi pertama dan kedua). Tabel **University** dan **Major** merupakan entitas mandiri yang mencatat seluruh daftar universitas dan program studi, lengkap dengan data klaster, daya tampung, serta estimasi *score* (skor rasionalisasi) yang digunakan dalam fitur *Chancing Engine*.

Struktur materi ujian (bank soal) disusun secara bertingkat melalui tiga tabel hierarkis: **Subject** (mata pelajaran UTBK), **Chapter** (topik/subbab materi), dan **Question** (butir soal). Setiap mata pelajaran memiliki beberapa topik (relasi *one-to-many*). Kemudian, setiap topik (Chapter) menaungi banyak butir soal (*Question*). Soal-soal ini mendukung format teks *Markdown* dan KaTeX untuk ekspresi matematika. Tabel *Question* memiliki relasi terhadap **QuestionOption** yang menyimpan pilihan jawaban (A, B, C, D, E) berserta *flag* penanda kebenaran (*isCorrect*). Desain hierarkis ini tidak ditujukan sebagai penyimpanan konten *textbook*, melainkan murni sebagai struktur *question-based learning*.

Aktivitas pengerjaan latihan maupun ujian disimpan dalam tabel **ExamAttempt**, yang mencatat status (*IN_PROGRESS*, *COMPLETED*), waktu pengerjaan, skor mentah, serta skor *Scaled* (skala SNBT). *ExamAttempt* terhubung ke struktur templat ujian pada tabel **ExamTemplate** dan **ExamSection**. Rincian jawaban setiap butir soal yang dikerjakan siswa dipecah ke dalam tabel **QuestionResponse**, yang menyimpan opsi yang dipilih, jumlah waktu pengerjaan (*timeSpent* per soal), status kebenaran (*isCorrect*), serta *flagging* jika siswa menandai ragu-ragu.

Untuk mendukung fitur ITS dan *Adaptive Learning*, sistem menyediakan tabel **ChapterProgress** (sebagai *Mastery Tracking*), yang merekam tingkat persentase pemahaman (*masteryLevel*) setiap pengguna pada topik (*Chapter*) tertentu secara akumulatif. Selain itu, sistem menyimpan riwayat bimbingan *step-by-step* AI ke dalam tabel **TutoringSession** dan **TutoringMessage**, yang menyimpan seluruh *log* obrolan dengan *Role* (*User*, *Assistant*, *System*) agar model LLM memiliki memori kontekstual selama sesi pendampingan (*scaffolding*). Fitur operasional global sistem direkam pada tabel **SystemSetting**, yang memampukan admin mengubah konfigurasi *on-the-fly* tanpa perlu mengubah kode sumber.

### 3.3.4 Arsitektur Sistem

Gambar 3.65 Arsitektur Sistem

Berdasarkan Gambar 3.65, Arsitektur Sistem menunjukkan perancangan arsitektur umum yang menggambarkan alur interaksi secara utuh. Proses dimulai ketika pengguna (Client) mengakses sistem melalui peramban *web*. Antarmuka pengguna dan logika *server-side rendering* ditangani oleh **Next.js** (berbasis React) yang berjalan di atas *runtime* **Node.js**.

Seluruh permintaan data (*query/mutation*) ke *database* dihubungkan melalui perantara **Prisma ORM**, yang berkomunikasi dengan layanan *cloud database* **PostgreSQL**. Mekanisme autentikasi dikelola oleh *library* NextAuth (Auth.js) yang terhubung ke penyedia kredensial lokal secara aman.

Pada sisi kecerdasan buatan, sistem mengimplementasikan pola arsitektur *External LLM Integration*. *Backend* Next.js akan mengirimkan *prompt* yang telah disusun oleh *Prompt Builder* ke **OpenRouter API** dengan menggunakan model **Gemini 2.0 Flash Lite** (awalnya menggunakan Groq API namun bermigrasi untuk menghindari isu limitasi *rate limit* yang ketat). Mengingat responsivitas AI sangat krusial, agregator OpenRouter dipadukan dengan model Flash dipilih karena kemampuan inferensinya yang sangat cepat. Arsitektur ini dirancang secara teroptimasi untuk memastikan layanan AI Tutor pada Mode Belajar UTBK dapat merespon pengguna dengan efisien.

### 3.3.5 Perancangan AI Tutor

**1. Flowchart AI Tutor**
AI Tutor dirancang sebagai komponen utama dalam *Intelligent Tutoring System* (ITS) yang berfungsi memberikan bimbingan adaptif kepada siswa. AI Tutor mengevaluasi jawaban siswa dan menyesuaikan *scaffolding* berdasarkan jumlah percobaan (*attempt count*) dan histori penguasaan (*mastery*).

Gambar 3.66 Flowchart AI

Berdasarkan Gambar 3.66, proses diawali saat siswa mengirimkan jawaban. Sistem memeriksa kesesuaian jawaban. Jika jawaban benar, sistem mengkalkulasi skor, memperbarui *ChapterProgress*, dan AI memberikan penjelasan konfirmasi (*Positive Reinforcement*).
Jika jawaban salah, sistem mengecek batas percobaan (*attempt limit*). Data percobaan dan nilai penguasaan diteruskan ke *Rule-Based Strategy Selector*. *Prompt Builder* kemudian menyusun konteks beserta *Ground Truth* kunci jawaban yang dibatasi oleh instruksi *Guardrail*, lalu mengirimkannya ke LLM (OpenRouter). LLM memberikan respons berupa *Socratic Hint* atau *Step-by-Step Guidance*, yang kemudian di-*render* di layar untuk memandu siswa pada percobaan selanjutnya.

**2. Prompt Builder & Guardrail Prompting**
*Prompt Builder* menggabungkan teks soal, histori *chat* (di tabel `TutoringMessage`), opsi yang dipilih siswa yang salah, jumlah percobaan, dan gaya bahasa AI yang diatur di *StudentProfile*. 
Untuk memastikan prinsip pembelajaran formatif terjaga, sistem memberlakukan konsep *Ground Truth Injection* yang dikombinasikan dengan *Guardrail Prompting*. LLM secara sistematis **disuplai** dengan informasi kunci jawaban yang benar (*Ground Truth*) dari pangkalan data. Tujuannya adalah mencegah LLM melakukan *hallucination* atau salah mengoreksi logika siswa. Namun, LLM dikendalikan oleh *Guardrail* mutlak dalam *prompt* yang melarang keras pembocoran opsi kunci jawaban (A, B, C, dsb.) secara langsung kepada siswa. Mekanisme ini memaksa LLM murni memandu penalaran konseptual siswa tanpa pernah menyuapi jawaban akhirnya.

**3. Adaptive AI Prompting & Rule-Based Strategy Selector**
*Rule-Based Strategy Selector* bertindak sebagai pengendali utama tingkat bantuan (*Scaffold Level*). Apabila siswa baru satu kali menjawab salah, tingkat bantuan ditetapkan pada `SOCRATIC` (memberikan pertanyaan pancingan). Apabila siswa kembali menjawab salah pada percobaan kedua, tingkat bimbingan bergeser menjadi `HINT` (memberikan petunjuk parsial). Apabila siswa masih salah pada percobaan ketiga atau kehabisan nyawa, tingkat bimbingan memuncak ke `SOLUTION / STEP-BY-STEP` (menuntun logika siswa dari awal sampai akhir).
Selain itu, *Prompt Builder* menyuntikkan instruksi persona bahasa (misalnya: akademis, ramah, atau bahkan *sarcastic*) bergantung pada konfigurasi profil siswa serta parameter penguasaan (*Mastery Status*). Siswa di tingkat pemula mendapatkan intonasi penyampaian yang lebih sabar dan terperinci, sedangkan siswa tingkat lanjut mendapat penjelasan yang *to-the-point*.

### 3.3.6 Perancangan Learning Analytics dan Learning Path

**1. Evaluasi Akurasi Harian (Perhitungan Skor)**
Perhitungan skor pada Mode Belajar dirancang murni berbasis asesmen formatif berkelanjutan. Berbeda dengan sistem evaluasi konvensional, skor sistem ITS Mode Belajar mengevaluasi tingkat akurasi pemahaman materi (*Mastery Level*) harian siswa.
Skor harian dihitung berdasarkan rasio jawaban benar terhadap total soal yang diselesaikan (persentase murni). Nilai akhir ini direpresentasikan sebagai bentuk penguasaan konsep yang kemudian diakumulasikan ke dalam tabel `ChapterProgress`. Sementara itu, khusus untuk Mode Tryout murni, sistem menerapkan perhitungan skor yang sama sekali berbeda yaitu menggunakan rumusan *Item Response Theory* (IRT) guna mensimulasikan lingkungan perhitungan riil UTBK SNBT aslinya secara akurat.

**2. Mastery Tracking**
Di setiap akhir pengerjaan, nilai siswa diagregasikan ke dalam entitas `ChapterProgress` yang mencatat persentase *MasteryLevel* (0-100) per Topik Materi (Subbab). Nilai ini dihitung berdasar rasio jawaban benar terhadap seluruh soal yang pernah diselesaikan. 

**3. Learning Path (Integrasi Chancing Engine)**
Fitur *Learning Path* menyusun urutan rute belajar khusus untuk tiap siswa. Pada aplikasi ini, prioritas materi diukur dengan mengkorelasikan persentase *MasteryLevel* topik siswa dengan data *Estimated Score* dari Universitas dan Jurusan target yang disimpan di `StudentProfile` melalui kalkulasi *Chancing Engine*. Topik materi dengan bobot nilai UTBK SNBT yang sering keluar, namun persentase pemahaman siswa masih sangat rendah (misal < 40%), akan dinaikkan prioritasnya di antarmuka agar dipelajari lebih dahulu.

## 3.4 Alat dan Bahan Tugas Akhir
Dalam pengembangan platform simulasi UTBK SNBT ini, alat dan bahan yang digunakan dikelompokkan sebagai berikut:

### 3.4.1 Perangkat Keras (Hardware)
**Alat Utama:**
- Perangkat: Apple MacBook Pro (14-inci, 2021)
- Sistem Operasi: macOS
- Chip (Prosesor): Apple M1 Pro
- RAM: 16GB Unified Memory
- Penyimpanan: 512GB SSD

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
- **OpenRouter API**: Digunakan sebagai *engine* AI utama (Model *Gemini 2.0 Flash Lite*) karena kapabilitas akses universalnya serta kecepatannya dalam menghasilkan token (*Hint*, *Feedback*, dan *Study Report*) secara instan.


### 3.4.4 Dataset Pihak Ketiga
Dataset meliputi referensi daftar Universitas, target Program Studi, serta materi *tryout* UTBK SNBT dari tahun sebelumnya yang didapatkan dari publikasi resmi SNPMB, buku kompilasi soal, dan pangkalan data kampus. Dataset estimasi nilai digunakan untuk simulasi peluang lulus pada modul *Chancing Engine*.

### 3.4.5 Dataset Pihak Pertama
Data bank soal primer dikompilasi secara mandiri ke dalam lembar kerja (*Spreadsheet*). Soal-soal tersebut, yang terdiri dari komponen teks, ekspresi matematis (LaTeX), dan gambar, dikonversi menggunakan piranti parsial (*parser*) otomatis ke dalam format JSON yang kemudian di-*seed* langsung ke basis data PostgreSQL agar dapat di-*render* secara dinamis oleh aplikasi.