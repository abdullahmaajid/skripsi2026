# BAB III
# METODE TUGAS AKHIR

## 3.1 Metode Tugas Akhir
Pada aplikasi simulasi Tryout UTBK SNBT ini, proses pengembangan sistem dilakukan menggunakan metode ADDIE (Analysis, Design, Development, Implementation dan Evaluation). Metode ini dipilih karena memiliki tahapan yang sistematis sehingga memudahkan proses analisis, perancangan, pengembangan, implementasi, dan evaluasi sistem. Setiap tahapan dilakukan secara terstruktur sehingga hasil pengembangan dapat dievaluasi sebelum dilanjutkan ke tahap berikutnya. Dengan demikian, sistem yang dihasilkan diharapkan dapat berfungsi sesuai dengan tujuan tugas akhir.

Gambar 3.1 Metode Pengembangan ADDIE

Berdasarkan Gambar 3.1, tahapan yang dilakukan dalam pengembangan sistem adalah sebagai berikut:
1. **Analysis (Analisis Kebutuhan)**
Pada tahap ini, penulis menentukan fitur-fitur pada sistem sesuai dengan rumusan masalah yang telah ditentukan. Prosesnya meliputi pengumpulan data, analisis kebutuhan pengguna, serta penentuan kebutuhan sistem, baik kebutuhan fungsional, maupun kebutuhan nonfungsional. Tahapan analisis dilakukan secara menyeluruh agar sistem yang dikembangkan dapat berjalan sesuai dengan tujuan tugas akhir.

2. **Design System (Desain Sistem)**
Tahapan berikutnya merancang sistem yang akan dikembangkan. Perancangan ini dibuat menggunakan *Unified Modeling Language* (UML), seperti *Use Case Diagram*, *Activity Diagram*, dan Perancangan Basis Data. Perancangan ini dirancang untuk menggambarkan bagaimana pengguna (Siswa dan Admin) dapat berinteraksi dengan sistem. Selain itu, dalam tahap ini juga dirancang struktur basis data serta tampilan antarmuka agar sistem Tryout mudah digunakan.

3. **Development (Pengembangan)**
Pada tahapan ini, rancangan sistem yang telah dibuat sebelumnya diterapkan ke dalam bentuk kode program. Proses pengembangannya meliputi pembuatan logika di bagian *backend*, pengelolaan basis data, serta pembuatan *frontend* yang interaktif agar sistem dapat berjalan dengan baik dan pengguna dapat mengaksesnya dengan mudah.

4. **Implementation (Implementasi)**
Pada tahap ini, sistem yang telah selesai dibangun mulai diterapkan ke lingkungan yang sebenarnya agar dapat diakses dan digunakan oleh pengguna. Proses ini meliputi instalasi dan konfigurasi sistem, migrasi basis data, serta pengaturan *environment*, termasuk konfigurasi API key untuk OpenRouter. Selain itu, dilakukan pula pengenalan sistem kepada calon pengguna, yaitu Siswa dan Admin, agar mereka memahami cara mengakses dan menggunakan fitur-fitur sesuai dengan perannya masing-masing. Tahap ini menjadi penghubung antara sistem yang telah selesai dikembangkan dengan tahap evaluasi, karena sistem yang telah diimplementasikan tersebut akan langsung digunakan oleh responden sebelum masuk ke pengujian pada tahap berikutnya.

5. **Evaluation (Evaluasi)**
Pada tahap ini dilakukan evaluasi terhadap sistem yang telah dikembangkan melalui beberapa jenis pengujian, yaitu:
   **a. Black-Box Testing**
   Pengujian dilakukan untuk memastikan seluruh fungsi sistem berjalan sesuai dengan kebutuhan yang telah ditentukan. Pengujian mencakup fitur autentikasi, pengelolaan bank soal, Mode Belajar, Mode Tryout, AI Tutor, *Learning Analytics*, dan *Personal Plan*.
   **b. System Usability Scale (SUS)**
   Pengujian dilakukan untuk mengukur tingkat kemudahan penggunaan (*usability*) sistem berdasarkan penilaian responden yang terdiri atas Siswa dan Admin.
   **c. Penetration Testing**
   Pengujian keamanan dilakukan menggunakan OWASP ZAP untuk mengidentifikasi potensi kerentanan pada aplikasi web, seperti kesalahan konfigurasi keamanan, kelemahan autentikasi, *missing security headers*, serta potensi kerentanan lainnya. Hasil pengujian digunakan sebagai dasar evaluasi dan perbaikan keamanan sistem sebelum aplikasi digunakan.

## 3.2 Requirement Analysis
Sebagai tahap awal dari model pengembangan ADDIE, dilakukan analisis kebutuhan sistem melalui studi literatur dan pengamatan terhadap platform Tryout yang sudah ada. Hasil analisis ini menjadi dasar dalam merumuskan kebutuhan sistem, yang nantinya diterapkan pada aplikasi agar sistem yang dibangun sejalan dengan tujuan tugas akhir. Kebutuhan sistem tersebut terbagi menjadi dua jenis, yaitu kebutuhan fungsional dan kebutuhan nonfungsional, yang disusun berdasarkan fitur dan spesifikasi *Intelligent Tutoring System* (ITS) yang dikembangkan.

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
| 6 | Siswa dapat memulai sesi Mode Belajar interaktif yang didampingi *AI Tutor* dengan metode bimbingan bertingkat (Level 1 *Socratic*, Level 2 *Hint*, Level 3 *Review*). |
| 7 | Siswa dapat memulai sesi Mode Tryout tanpa bantuan AI Tutor. |
| 8 | Siswa dapat menggunakan fitur *Free-Chat* di Ruang AI Tutor Khusus untuk berdiskusi mandiri mengenai soal UTBK. |
| 9 | Siswa dapat melihat *dashboard* analitik pembelajaran yang menampilkan statistik belajar, progres, tren nilai, status penguasaan materi, dan rekomendasi belajar. |
| 10 | Siswa dapat melihat hasil ujian lengkap dengan AI Study Report. |
| 11 | Siswa dapat melihat riwayat pembelajaran dari seluruh aktivitas pengerjaan ujian dan latihan yang pernah dilakukan. |
| 12 | Siswa dapat mengelola data profil akun dan mengubah *password*. |

**2. Aktor: Admin**
Tabel 3.2 Kebutuhan Fungsional Admin
| No. | Kebutuhan Fungsional |
|---|---|
| 1 | Admin dapat *login* ke dalam sistem. |
| 2 | Admin dapat melihat *dashboard* admin yang menampilkan informasi mengenai jumlah siswa, mata pelajaran, dan ujian yang tersedia di dalam sistem. |
| 3 | Admin dapat mengelola entitas hierarkis kurikulum pendidikan, seperti Mata Pelajaran, Subtes, dan Topik Materi (Chapter). |
| 4 | Admin dapat mengelola bank soal, termasuk merancang soal interaktif dan merender ekspresi matematika kompleks menggunakan format *Markdown* dan *LaTeX/KaTeX*. |
| 5 | Admin dapat memantau hasil sesi belajar dan hasil ujian yang dikerjakan oleh siswa secara keseluruhan. |
| 6 | Admin dapat mengelola direktori Universitas dan Program Studi untuk kebutuhan komputasi *Chancing Engine*, termasuk melakukan ekstraksi data massal melalui modul *Scraper*. |
| 7 | Admin dapat mengelola konfigurasi akun pengguna beserta penugasan peran sistem (*Role-Based Access Control*). |
| 8 | Admin dapat mengelola pengaturan dan peraturan operasional sistem secara keseluruhan. |

**3. Kebutuhan Fungsional Sistem**
Tabel 3.3 Kebutuhan Fungsional Sistem
| No. | Kebutuhan Fungsional |
|---|---|
| 1 | Sistem dapat memeriksa dan menilai jawaban pilihan ganda secara otomatis berdasarkan kunci jawaban yang tersedia. |
| 2 | Sistem dapat menyimpan dan menampilkan simbol maupun ekspresi matematika menggunakan karakter standar Unicode dan notasi aljabar berbasis teks (LaTeX/KaTeX). |
| 3 | Sistem dapat memberikan bantuan pembelajaran secara adaptif pada Mode Belajar, berupa AI Hint, AI Feedback, serta pembatasan jumlah percobaan menjawab (*scaffolding*). |
| 4 | Sistem dapat menghitung skor akhir berdasarkan hasil pengerjaan pada Mode Tryout menggunakan IRT dan Mode Belajar berbasis penguasaan materi (Mastery). |
| 5 | Sistem dapat menghasilkan AI Personal Study Report setelah siswa menyelesaikan sesi belajar. |
| 6 | Sistem dapat menyusun *Personal Plan* dan menentukan prioritas belajar berdasarkan hasil nilai yang diperoleh siswa melalui *Chancing Engine*. |
| 7 | Sistem dapat memperbarui tingkat penguasaan materi (*Mastery Tracking*) secara otomatis berdasarkan hasil pengerjaan siswa. |
| 8 | Sistem dapat mengirimkan *email* notifikasi untuk membantu pengguna melakukan pembaruan *password*. |

### 3.2.2 Kebutuhan Nonfungsional
Kebutuhan nonfungsional memastikan ketahanan postur sistem di luar interaksi antarmuka pengguna:
a. Sistem dirancang agar dapat diandalkan dalam berinteraksi dengan layanan eksternal, seperti layanan *Artificial Intelligence* (AI).
b. Sistem dirancang dapat merespons setiap interaksi pengguna dengan cepat selama proses pembelajaran maupun pelaksanaan ujian (*real-time processing*).
c. Antarmuka sistem dibuat dengan memperhatikan kemudahan penggunaan (*user-friendly*) agar setiap pengguna dapat mengoperasikan sistem dengan lebih mudah.
d. Keamanan data dijaga menggunakan fungsi *hashing* kriptografis (*bcrypt*) pada *password* (bukan enkripsi dua arah) sebelum disimpan ke dalam basis data, serta melengkapi *Security Headers* standar.
e. Sistem dirancang untuk mampu menangani beban akses tinggi (*high concurrency*) dari ratusan koneksi secara bersamaan tanpa mengalami penolakan servis (*crash*).
f. Aplikasi dilengkapi dengan perlindungan *Secure CBT Mode* (*Anti-Cheat*) yang terintegrasi di sisi peramban klien untuk menjamin integritas pelaksanaan ujian.

## 3.3 Desain Sistem

Perancangan arsitektur sistem memetakan alur interaksi dan logika komputasi untuk menjamin sinkronisasi seluruh modul komponen. Desain ini menggunakan empat pendekatan utama:

**1. Pemodelan Sistem (UML)**

Pendekatan berbasis objek ini mendokumentasikan interaksi antarmuka menggunakan:
- **Use Case Diagram**: mendeskripsikan secara eksplisit partisi hak akses (*privileges*) antara Siswa dan Admin.
- **Activity Diagram**: menganalisis alur aktivitas sekuensial dari inisialisasi sesi *login*, algoritma pengerjaan soal, hingga generasi nilai akhir oleh mesin komputasi.

**2. Desain Basis Data**

Skema pangkalan data dirancang mengikuti prinsip relasional RDBMS. Entitas seperti pengguna, progres belajar (*Mastery Level*), bank soal, sesi ujian, dan rekam jejak obrolan AI (*Chat History*) didesain berelasi melalui skema terpusat guna menjamin kepatuhan penuh terhadap prinsip ACID (*Atomicity, Consistency, Isolation, Durability*).

**3. Arsitektur Sistem Web**

Sistem dikembangkan di atas tumpukan teknologi modern (*modern stack*). Next.js bertindak sebagai kerangka kerja *full-stack* dengan rendering sisi peladen (*Server Components*). Prisma ORM menjembatani operasi kueri ke basis data PostgreSQL, dan skalabilitas interaksinya dijaga oleh lapisan agregator koneksi PgBouncer. Ketergantungan terhadap kecerdasan buatan disuplai melalui integrasi API terenkripsi ke layanan agregator OpenRouter.

**4. Perancangan Algoritma AI Tutor**

Perancangan ini menggambarkan logika mesin inferensi ITS pada Mode Belajar. Penjabaran meliputi alur deteksi kesalahan siswa, klasifikasi percobaan (*attempt count*), injeksi parameter Mastery Level ke dalam Prompt Builder, hingga penerapan instruksi mutlak (*Blind Mode / System Guardrails*) untuk mencegah penyebaran kunci jawaban secara prematur oleh agen LLM.

### 3.3.1 Use Case Diagram

*(Tempatkan Gambar 3.2 Use Case Diagram di sini)*

Gambar 3.2 menjelaskan *Use Case Diagram* yang menggambarkan fungsionalitas pada platform simulasi UTBK SNBT berbasis ITS. Diagram ini menunjukkan aktor yang berinteraksi dengan sistem beserta fungsi-fungsi yang dapat diakses sesuai dengan hak akses masing-masing.

**1. Aktor Utama (Pengguna Sistem)**

Terdapat dua aktor utama yang berinteraksi dengan sistem, yakni sebagai berikut:

- **Siswa**: Siswa dapat melakukan autentikasi untuk mengakses fitur pembelajaran, seperti mengelola profil, melihat *dashboard*, menyusun rencana belajar (*Personal Plan*), mengerjakan simulasi pada Mode Belajar (didampingi AI Tutor) maupun Mode Tryout (tanpa bantuan AI), berdiskusi secara bebas di Ruang AI Tutor Khusus, serta melihat hasil analitik dan evaluasi (AI Study Report).
- **Admin**: Admin merupakan pengelola sistem yang memiliki kendali penuh terhadap manajemen konten dan pengguna. Aktivitas yang dapat dilakukan meliputi pemantauan *dashboard*, pengelolaan mata pelajaran, topik materi, bank soal, pemantauan aktivitas siswa, pengelolaan parameter sistem (*settings*), pengelolaan direktori universitas (termasuk *scrape* data massal), serta pengelolaan data akun pengguna.

**2. Relasi Include dan Extend**

Pada Gambar 3.2, pemodelan sistem ini menekankan pembatasan akses melalui relasi *include* dan *extend* yang terpusat pada proses autentikasi.

- **Relasi Include**:
  - Relasi *include* terhadap Login: seluruh *use case* fungsionalitas utama, baik di sisi Admin maupun Siswa, wajib melalui proses Login. Hal ini menunjukkan bahwa pengguna wajib melakukan autentikasi terlebih dahulu sebelum dapat mengakses fitur-fitur tersebut.
  - Relasi *include* pada Mode Tryout/Belajar: *Use Case* Melaksanakan Mode Belajar memiliki relasi *include* yang mengarah ke Penjelasan AI Tutor, menunjukkan bahwa fitur AI Tutor turut disertakan secara wajib dalam alur tersebut.
- **Relasi Extend**:
  - *Use Case* Logout memiliki relasi *extend* terhadap Login, yang menunjukkan bahwa pengguna dapat mengakhiri sesi penggunaan sistem setelah berhasil masuk.

**3. Fungsionalitas Berdasarkan Aktor**

**a. Fungsionalitas Siswa**

Setelah berhasil *login*, *use case* yang dapat diakses oleh Siswa yakni sebagai berikut:
- Kelola Profil untuk mengubah informasi data diri, gaya AI (*AI Style*), serta target Universitas dan Jurusan.
- Melihat Dashboard yang menampilkan ringkasan aktivitas belajar siswa.
- Menyusun Personal Plan (mengatur prioritas belajar).
- Melaksanakan Mode Belajar yang di dalamnya menyertakan fitur AI Tutor (*Learning Path* dan *Quick Drill*).
- Melaksanakan Mode Tryout.
- Berinteraksi di Ruang AI Tutor Khusus (*free-chat* dengan AI Tutor).
- Melihat Hasil Analitik dan Evaluasi (riwayat nilai, Mastery, dan lain-lain).
- Logout.

**b. Fungsionalitas Admin**

Setelah berhasil *login*, Admin memiliki hak akses penuh untuk melakukan pengelolaan (Create, Read, Update, Delete / CRUD) terhadap entitas sistem, meliputi:
- Kelola Pengguna (tambah, lihat, perbarui, hapus).
- Kelola Daftar Soal (tambah, lihat, perbarui, hapus).
- Kelola Daftar Bab (tambah, lihat, perbarui, hapus).
- Kelola Mata Pelajaran (tambah, lihat, perbarui, hapus).
- Kelola Paket Tryout (tambah, lihat, perbarui, hapus).
- Kelola Subtes (tambah, lihat, perbarui, hapus).
- Pantau Ringkasan Platform, Analitik dan Evaluasi Ujian, Target Siswa, serta Penggunaan Token AI.
- Kelola Daftar Universitas dan Program Studi (tambah, lihat, perbarui, hapus).
- Kelola Pengaturan dan Peraturan Sistem.
- Logout.

### 3.3.2 Activity Diagram

Dokumen ini menjelaskan alur cerita bagaimana setiap pihak berinteraksi di dalam platform Lexica UTBK. Alur menggambarkan apa yang dilakukan oleh Siswa dan Admin, bagaimana sistem merespons, serta interaksi dengan AI Tutor. Seluruh alur diagram dijabarkan sebagai berikut.

**1. Activity Diagram Siswa dan Admin**

**a. Login**

*(Tempatkan Gambar 3.3 Activity Diagram Login di sini)*

Gambar 3.3 menggambarkan proses pengguna masuk ke dalam sistem. Proses dimulai ketika pengguna membuka halaman login, kemudian memasukkan informasi yang diperlukan untuk proses autentikasi. Selanjutnya, sistem akan memverifikasi data yang dimasukkan. Apabila proses autentikasi berhasil, sistem akan mengarahkan pengguna ke *dashboard* sesuai dengan *role* yang dimiliki. Jika autentikasi gagal, sistem akan menampilkan pesan kesalahan dan mengarahkan kembali ke halaman login.

**b. Register**

*(Tempatkan Gambar 3.4 Activity Diagram Register di sini)*

Gambar 3.4 menggambarkan proses pengguna dalam melakukan pendaftaran ke dalam sistem. Proses dimulai ketika pengguna membuka halaman pendaftaran dan memasukkan data diri yang diperlukan. Selanjutnya, sistem akan memverifikasi validitas data ke *database*. Apabila data valid, sistem akan menyimpan data dan mengarahkan pengguna ke halaman login. Jika tidak valid, sistem akan menampilkan pesan kesalahan.

---

**2. Activity Diagram Siswa**

**a. Lihat Learning Overview (Dashboard Siswa)**

*(Tempatkan Gambar 3.5 Activity Diagram Lihat Learning Overview di sini)*

Gambar 3.5 menggambarkan proses Siswa dalam mengakses ringkasan pembelajaran yang tersedia dalam sistem. Setelah Siswa berhasil masuk dan diarahkan ke halaman utama, sistem akan mengambil data dari *database* dan menampilkan keseluruhan ringkasan data nilai serta progres belajar pada halaman *dashboard*.

**b. Memilih Materi Belajar (Learning Path)**

*(Tempatkan Gambar 3.6 Activity Diagram Memilih Materi Belajar di sini)*

Gambar 3.6 menggambarkan proses Siswa dalam memilih materi belajar. Proses dimulai ketika Siswa membuka menu perjalanan belajar (*Learning Path*). Selanjutnya, sistem akan mengambil data dari *database* dan menampilkan daftar mata pelajaran beserta bab materi yang dapat dipelajari oleh Siswa.

**c. Mengerjakan Latihan Bab**

*(Tempatkan Gambar 3.7 Activity Diagram Mengerjakan Latihan Bab di sini)*

Gambar 3.7 menggambarkan proses Siswa dalam mengerjakan soal latihan. Proses dimulai saat Siswa memilih suatu materi, kemudian sistem menampilkan lembar soal. Siswa memilih jawaban yang dianggap benar. Sistem akan mengecek jawaban tersebut dan memberikan respons yang sesuai. Apabila jawaban salah, sistem memberi kesempatan kedua beserta petunjuk dari AI. Apabila jawaban benar, sistem menampilkan opsi untuk melihat pembahasan AI sebelum lanjut ke nomor selanjutnya.

**d. Lihat Pembahasan dari Hasil Belajar**

*(Tempatkan Gambar 3.8 Activity Diagram Lihat Pembahasan dari Hasil Belajar di sini)*

Gambar 3.8 menggambarkan proses Siswa dalam melihat pembahasan hasil latihan. Setelah Siswa menyelesaikan latihan, sistem akan menampilkan halaman hasil akhir. Siswa dapat menekan tombol untuk melihat evaluasi. Sistem kemudian menampilkan halaman yang berisi nomor soal dan kunci jawaban, di mana Siswa dapat meninjau detail dari setiap pertanyaan.

**e. Ulangi Latihan**

*(Tempatkan Gambar 3.9 Activity Diagram Ulangi Latihan di sini)*

Gambar 3.9 menggambarkan proses Siswa dalam mengulang sesi pengerjaan latihan. Setelah Siswa berada di halaman hasil dan menekan tombol untuk mengulang, sistem akan menghapus riwayat pengerjaan saat itu, lalu memuat ulang lembar soal dari awal agar Siswa dapat mengerjakan kembali.

**f. Pilih Kembali ke Learning Path**

*(Tempatkan Gambar 3.10 Activity Diagram Kembali ke Learning Path di sini)*

Gambar 3.10 menggambarkan proses Siswa dalam beralih ke latihan pada materi lain. Setelah Siswa berada di halaman hasil akhir dan memilih opsi subtes lain, sistem akan memproses permintaan tersebut dan mengarahkan Siswa kembali ke halaman pemilihan materi belajar.

**g. Lihat Paket Tryout**

*(Tempatkan Gambar 3.11 Activity Diagram Lihat Paket Tryout di sini)*

Gambar 3.11 menggambarkan proses Siswa dalam mengakses data jadwal ujian simulasi. Setelah Siswa membuka menu *tryout*, sistem akan mengambil data dari *database* dan menampilkan ketersediaan jadwal beserta paket soal ujian yang dapat dikerjakan oleh Siswa.

**h. Mengerjakan Tryout**

*(Tempatkan Gambar 3.12 Activity Diagram Mengerjakan Tryout di sini)*

Gambar 3.12 menggambarkan proses Siswa dalam melaksanakan simulasi ujian. Proses dimulai saat Siswa memilih paket ujian dan menekan tombol mulai. Sistem akan menampilkan lembar soal beserta penunjuk waktu berjalan (*timer*). Setelah Siswa selesai dan menekan kumpulkan, sistem akan mengalkulasi skor keseluruhan dan menampilkannya pada layar hasil akhir.

**i. Lihat Review Jawaban dan Bahas dengan AI Tutor**

*(Tempatkan Gambar 3.13 Activity Diagram Lihat Review Jawaban Tryout di sini)*

Gambar 3.13 menggambarkan proses Siswa dalam berinteraksi dengan AI Tutor pascaujian. Setelah Siswa membuka halaman evaluasi *tryout* dan menekan tombol pembahasan AI, sistem akan memunculkan area diskusi di mana AI menganalisis miskonsepsi Siswa secara mendalam tanpa langsung memberikan jawaban.

**j. Navigasi Modul Rapor dan Evaluasi**

*(Tempatkan Gambar 3.14 Activity Diagram Navigasi Modul Rapor di sini)*

Gambar 3.14 menggambarkan proses Siswa dalam bernavigasi pada halaman rapor. Proses dimulai saat Siswa membuka menu evaluasi, kemudian sistem memuat halaman analitik. Sistem akan menampilkan pilihan tab informasi, dan memperbarui konten tampilan sesuai dengan opsi tab yang dipilih oleh Siswa.

**k. Lihat Analisis Kemampuan (Rapor dan Tren)**

*(Tempatkan Gambar 3.15 Activity Diagram Lihat Analisis Kemampuan di sini)*

Gambar 3.15 menggambarkan proses Siswa dalam meninjau grafik analisis nilainya. Setelah Siswa membuka tab rapor, sistem akan melakukan perhitungan otomatis dan menampilkan grafik perkembangan nilai beserta selisih dengan target jurusan Siswa.

**l. Lihat Bank Soal Salah**

*(Tempatkan Gambar 3.16 Activity Diagram Lihat Bank Soal Salah di sini)*

Gambar 3.16 menggambarkan proses Siswa dalam melihat daftar soal yang sulit. Setelah Siswa mengakses tab evaluasi, sistem akan mengumpulkan data riwayat kesalahan Siswa dari *database* dan menampilkannya sebagai daftar soal yang perlu ditinjau ulang.

**m. Bahas Soal dari Bank Soal Salah**

*(Tempatkan Gambar 3.17 Activity Diagram Bahas Soal dari Bank Soal Salah di sini)*

Gambar 3.17 menggambarkan proses Siswa dalam membahas ulang soal yang salah. Proses dimulai saat Siswa memilih satu soal dari daftar soal salah dan meminta penjelasan AI. Sistem akan memuat pertanyaan tersebut ke ruang diskusi, dan AI Tutor akan membantu Siswa memahami penyelesaiannya.

**n. Lihat Peluang Lolos (Chancing Engine)**

*(Tempatkan Gambar 3.18 Activity Diagram Lihat Peluang Lolos di sini)*

Gambar 3.18 menggambarkan proses Siswa dalam mengecek rasionalisasi peluang kelulusan. Setelah Siswa mengakses tab peluang lolos, sistem akan membandingkan skor ujian Siswa dengan standar nilai masuk jurusan terkait di *database*, lalu menampilkan angka persentase kemungkinannya pada layar.

**o. Lihat Detail Jurusan Target**

*(Tempatkan Gambar 3.19 Activity Diagram Lihat Detail Jurusan Target di sini)*

Gambar 3.19 menggambarkan proses Siswa dalam mengakses rincian data kampus pilihan. Saat Siswa menekan sebuah jurusan target, sistem akan mengambil data dari *database* dan menampilkan rincian seperti jumlah peminat serta kuota ketersediaan pada halaman *popup*.

**p. Bahas Soal dalam Aplikasi**

*(Tempatkan Gambar 3.20 Activity Diagram Bahas Soal dalam Aplikasi di sini)*

Gambar 3.20 menggambarkan proses Siswa dalam berdiskusi bebas tentang soal yang tersedia di aplikasi. Setelah Siswa membuka menu katalog ruang tutor, sistem menampilkan arsip soal. Siswa kemudian memilih salah satu soal, dan sistem memulai ruang obrolan dengan AI Tutor untuk pembahasan soal tersebut.

**q. Bahas Soal Luar Aplikasi**

*(Tempatkan Gambar 3.21 Activity Diagram Bahas Soal Luar Aplikasi di sini)*

Gambar 3.21 menggambarkan proses Siswa dalam menanyakan soal dari luar sistem. Proses dimulai saat Siswa mengetik teks bebas pada kolom diskusi, lalu mengirimkannya. Sistem akan memproses teks masukan tersebut dan AI Tutor akan memberikan balasan berupa penjelasan terkait soal tersebut.

**r. Mengubah Pengaturan Profil dan Target**

*(Tempatkan Gambar 3.22 Activity Diagram Mengubah Pengaturan Profil di sini)*

Gambar 3.22 menggambarkan proses Siswa dalam mengubah data pengaturan profil. Proses dimulai saat Siswa membuka formulir data profil dan memilih target jurusan baru. Selanjutnya, sistem akan menyimpan perubahan data tersebut ke *database* dan menampilkan pemberitahuan bahwa data berhasil diperbarui.

**s. Lihat Subtes Practice**

*(Tempatkan Gambar 3.23 Activity Diagram Lihat Subtes Practice di sini)*

Gambar 3.23 menggambarkan proses Siswa dalam melihat ketersediaan latihan cepat (*practice*). Setelah Siswa membuka menu *practice*, sistem akan mengambil data kategori dari *database* dan menampilkan pilihan kategori subtes yang siap dilatih.

**t. Mengerjakan Subtes Practice**

*(Tempatkan Gambar 3.24 Activity Diagram Mengerjakan Subtes Practice di sini)*

Gambar 3.24 menggambarkan proses Siswa dalam menyelesaikan latihan cepat. Proses dimulai saat Siswa memilih sebuah kategori subtes, lalu sistem akan secara acak menarik sejumlah soal dari *database* dan menampilkannya satu per satu untuk dijawab oleh Siswa.

---

**3. Activity Diagram Admin**

**a. Tambah Pengguna**

*(Tempatkan Gambar 3.25 Activity Diagram Tambah Pengguna di sini)*

Gambar 3.25 menggambarkan proses Admin dalam menambahkan data pengguna baru ke dalam sistem. Proses dimulai ketika Admin membuka halaman manajemen pengguna dan menekan tombol tambah. Selanjutnya, sistem akan menampilkan formulir pengisian data, memvalidasi input Admin, lalu menyimpannya ke *database*.

**b. Memperbarui Pengguna**

*(Tempatkan Gambar 3.26 Activity Diagram Memperbarui Pengguna di sini)*

Gambar 3.26 menggambarkan proses Admin dalam memperbarui data pengguna. Setelah Admin memilih salah satu pengguna pada tabel dan mengubah isi informasinya, sistem akan merekam modifikasi tersebut dan memperbarui catatan pengguna yang sesuai pada *database*.

**c. Melihat Pengguna**

*(Tempatkan Gambar 3.27 Activity Diagram Melihat Pengguna di sini)*

Gambar 3.27 menggambarkan proses Admin dalam mengakses data pengguna yang tersedia dalam sistem. Setelah Admin membuka menu manajemen pengguna, sistem akan mengambil data dari *database* dan menampilkan keseluruhan data pengguna pada halaman manajemen pengguna.

**d. Menghapus Pengguna**

*(Tempatkan Gambar 3.28 Activity Diagram Menghapus Pengguna di sini)*

Gambar 3.28 menggambarkan proses Admin dalam menghapus data pengguna. Proses dimulai ketika Admin menekan tombol hapus pada suatu baris pengguna, sistem akan meminta konfirmasi, dan setelah disetujui, sistem akan menghapus pengguna tersebut secara permanen dari *database*.

**e. Tambah Daftar Soal**

*(Tempatkan Gambar 3.29 Activity Diagram Tambah Daftar Soal di sini)*

Gambar 3.29 menggambarkan proses Admin dalam menambahkan instrumen soal ke dalam sistem. Setelah Admin menekan tombol tambah soal dan mengisi detail pertanyaan beserta kuncinya, sistem akan mengolah masukan tersebut lalu menyimpannya ke dalam *database* sebagai butir soal baru.

**f. Memperbarui Daftar Soal**

*(Tempatkan Gambar 3.30 Activity Diagram Memperbarui Daftar Soal di sini)*

Gambar 3.30 menggambarkan proses Admin dalam merevisi butir soal yang sudah ada. Saat Admin mengedit konten teks pertanyaan atau jawaban pada formulir dan menekan tombol simpan, sistem akan melakukan pembaruan pada rekaman *database*.

**g. Melihat Daftar Soal**

*(Tempatkan Gambar 3.31 Activity Diagram Melihat Daftar Soal di sini)*

Gambar 3.31 menggambarkan proses Admin dalam mengakses koleksi daftar soal. Setelah Admin membuka menu pengelolaan soal, sistem akan mengambil data dari *database* dan menampilkan seluruh kumpulan butir soal pada halaman tersebut.

**h. Menghapus Daftar Soal**

*(Tempatkan Gambar 3.32 Activity Diagram Menghapus Daftar Soal di sini)*

Gambar 3.32 menggambarkan proses Admin dalam menghapus instrumen soal. Setelah Admin mengeklik fungsi hapus pada sebuah entri soal dan mengonfirmasinya, sistem akan memproses penghapusan data tersebut sepenuhnya dari *database*.

**i. Tambah Daftar Bab**

*(Tempatkan Gambar 3.33 Activity Diagram Tambah Daftar Bab di sini)*

Gambar 3.33 menggambarkan proses Admin dalam menambahkan kelompok bab materi baru. Setelah Admin memasukkan nama bab dan menekan tombol simpan, sistem akan membuat entri data baru untuk bab tersebut di dalam *database*.

**j. Memperbarui Daftar Bab**

*(Tempatkan Gambar 3.34 Activity Diagram Memperbarui Daftar Bab di sini)*

Gambar 3.34 menggambarkan proses Admin dalam memperbaiki detail pada sebuah bab. Setelah Admin mengubah data nama bab dan menyimpannya, sistem akan merekam perubahan tersebut secara permanen pada *database*.

**k. Melihat Daftar Bab**

*(Tempatkan Gambar 3.35 Activity Diagram Melihat Daftar Bab di sini)*

Gambar 3.35 menggambarkan proses Admin dalam mengakses daftar bab materi. Setelah Admin membuka halaman daftar bab, sistem akan mengambil seluruh data rincian bab dari *database* lalu menampilkannya secara terurut pada halaman manajemen.

**l. Menghapus Daftar Bab**

*(Tempatkan Gambar 3.36 Activity Diagram Menghapus Daftar Bab di sini)*

Gambar 3.36 menggambarkan proses Admin dalam menghapus bab beserta asosiasinya. Setelah Admin menekan aksi hapus dan memberikan persetujuan, sistem akan menghilangkan entri bab tersebut dari *database*.

**m. Tambah Mata Pelajaran**

*(Tempatkan Gambar 3.37 Activity Diagram Tambah Mata Pelajaran di sini)*

Gambar 3.37 menggambarkan proses Admin dalam menambahkan entri mata pelajaran baru. Setelah Admin mengisi kolom nama bidang studi, sistem akan merekam data tersebut ke dalam basis data sebagai kurikulum baru.

**n. Memperbarui Mata Pelajaran**

*(Tempatkan Gambar 3.38 Activity Diagram Memperbarui Mata Pelajaran di sini)*

Gambar 3.38 menggambarkan proses Admin dalam mengubah ejaan nama mata pelajaran. Ketika Admin mengoreksi teks dan menekan simpan, sistem akan memodifikasi rekaman sebelumnya di dalam *database*.

**o. Melihat Mata Pelajaran**

*(Tempatkan Gambar 3.39 Activity Diagram Melihat Mata Pelajaran di sini)*

Gambar 3.39 menggambarkan proses Admin dalam mengakses daftar mata pelajaran utama. Setelah Admin membuka tab yang sesuai, sistem akan mengambil data dari *database* dan menampilkan seluruh kategori mata pelajaran kepada pengguna.

**p. Menghapus Mata Pelajaran**

*(Tempatkan Gambar 3.40 Activity Diagram Menghapus Mata Pelajaran di sini)*

Gambar 3.40 menggambarkan proses Admin dalam melenyapkan sebuah mata pelajaran secara utuh. Setelah Admin menekan aksi hapus, sistem akan membersihkan segala rekaman data terkait mapel tersebut dari dalam *database*.

**q. Tambah Paket Tryout**

*(Tempatkan Gambar 3.41 Activity Diagram Tambah Paket Tryout di sini)*

Gambar 3.41 menggambarkan proses Admin dalam merencanakan jadwal ujian baru. Setelah Admin memberikan nama dan rentang waktu pelaksanaan pada formulir, sistem akan menyimpannya sebagai kerangka awal paket *tryout* ke dalam *database*.

**r. Memperbarui Paket Tryout**

*(Tempatkan Gambar 3.42 Activity Diagram Memperbarui Paket Tryout di sini)*

Gambar 3.42 menggambarkan proses Admin dalam merevisi tenggat waktu pengerjaan paket. Setelah Admin mengubah tanggal pada formulir edit dan menyimpannya, sistem akan mencatatkan penyesuaian baru tersebut di *database*.

**s. Melihat Paket Tryout**

*(Tempatkan Gambar 3.43 Activity Diagram Melihat Paket Tryout di sini)*

Gambar 3.43 menggambarkan proses Admin dalam memantau koleksi paket *tryout* yang ada. Setelah Admin mengakses menu *tryout*, sistem akan menarik data dari *database* dan menyajikan daftar jadwal ujian yang tersedia pada layar.

**t. Menghapus Paket Tryout**

*(Tempatkan Gambar 3.44 Activity Diagram Menghapus Paket Tryout di sini)*

Gambar 3.44 menggambarkan proses Admin dalam menghapus paket ujian yang telah usang. Setelah Admin memberikan konfirmasi hapus, sistem akan menghapus entri paket dan menyembunyikannya dari tampilan siswa.

**u. Tambah Subtes Tryout**

*(Tempatkan Gambar 3.45 Activity Diagram Tambah Subtes Tryout di sini)*

Gambar 3.45 menggambarkan proses Admin dalam menyuntikkan soal ke dalam paket *tryout*. Setelah Admin memilih komposisi blok soal, sistem akan menautkan daftar soal yang bersangkutan ke kerangka ujian *tryout* di *database*.

**v. Memperbarui Subtes Tryout**

*(Tempatkan Gambar 3.46 Activity Diagram Memperbarui Subtes Tryout di sini)*

Gambar 3.46 menggambarkan proses Admin dalam menyunting susunan materi sebuah ujian. Saat Admin menyesuaikan komposisi bab, sistem merespons dengan memodifikasi tata letak soal ujian di dalam *database*.

**w. Menghapus Subtes Tryout**

*(Tempatkan Gambar 3.47 Activity Diagram Menghapus Subtes Tryout di sini)*

Gambar 3.47 menggambarkan proses Admin dalam mencabut relasi blok soal dari paket. Setelah Admin memberikan perintah hapus kaitan, sistem akan meniadakan ikatan paket *tryout* tersebut tanpa menghapus soal asli.

**x. Menampilkan Tab Ringkasan Platform**

*(Tempatkan Gambar 3.48 Activity Diagram Menampilkan Ringkasan Platform di sini)*

Gambar 3.48 menggambarkan proses Admin dalam memuat modul laporan performa. Setelah Admin mengeklik menu analitik, sistem akan memuat tata letak antarmuka yang berisi pilihan berbagai tab observasi.

**y. Melihat Statistik Ringkasan Platform**

*(Tempatkan Gambar 3.49 Activity Diagram Melihat Statistik Platform di sini)*

Gambar 3.49 menggambarkan proses Admin dalam melihat rekapitulasi data agregat. Setelah Admin membuka tab terkait, sistem akan mengambil data kalkulasi kumulatif dari *database* lalu menampilkannya menjadi laporan statistik interaktif.

**z. Melihat Statistik Evaluasi Ujian**

*(Tempatkan Gambar 3.50 Activity Diagram Melihat Evaluasi Ujian di sini)*

Gambar 3.50 menggambarkan proses Admin dalam meninjau distribusi skor siswa secara massal. Setelah Admin membuka tab analisis ujian, sistem akan mengumpulkan data skor dari *database* lalu merendernya dalam bentuk diagram batang.

**aa. Melihat Statistik Target Siswa**

*(Tempatkan Gambar 3.51 Activity Diagram Melihat Target Siswa di sini)*

Gambar 3.51 menggambarkan proses Admin dalam mengamati preferensi pemilihan kampus oleh pengguna. Saat tab target diakses, sistem akan mengekstrak informasi jurusan dari pengguna dan menampilkannya sebagai peringkat minat studi.

**bb. Melihat Statistik Token dan AI**

*(Tempatkan Gambar 3.52 Activity Diagram Melihat Statistik Token di sini)*

Gambar 3.52 menggambarkan proses Admin dalam mengaudit laporan pemakaian beban AI. Setelah Admin membuka tab sistem, sistem mengambil catatan kalkulasi token dari *database* untuk menampilkannya pada *dashboard* operasional.

**cc. Menampilkan Tab Daftar Universitas**

*(Tempatkan Gambar 3.53 Activity Diagram Menampilkan Daftar Universitas di sini)*

Gambar 3.53 menggambarkan proses Admin dalam mengakses panel kelola kampus negeri. Setelah Admin menavigasi menu terkait, sistem memuat tabel relasional perguruan tinggi dari *database*.

**dd. Melihat Daftar Program Studi**

*(Tempatkan Gambar 3.54 Activity Diagram Melihat Daftar Program Studi di sini)*

Gambar 3.54 menggambarkan proses Admin dalam mengakses spesifikasi jurusan perkuliahan. Saat tab prodi ditekan, sistem mengambil data lengkap daya tampung dan standar kelulusan dari *database* ke dalam layar antarmuka.

**ee. Tambah Program Studi**

*(Tempatkan Gambar 3.55 Activity Diagram Tambah Program Studi di sini)*

Gambar 3.55 menggambarkan proses Admin dalam menambah data prodi perkuliahan. Setelah Admin memasukkan informasi jurusan terkait pada formulir, sistem akan memverifikasi lalu merekam entitas program studi baru ke pangkalan data.

**ff. Memperbarui Program Studi**

*(Tempatkan Gambar 3.56 Activity Diagram Memperbarui Program Studi di sini)*

Gambar 3.56 menggambarkan proses Admin dalam mengoreksi ketersediaan kursi jurusan. Saat Admin merevisi data keketatan atau persentase *passing grade*, sistem akan memperbarui nilainya di *database*.

**gg. Menghapus Program Studi**

*(Tempatkan Gambar 3.57 Activity Diagram Menghapus Program Studi di sini)*

Gambar 3.57 menggambarkan proses Admin dalam membuang rujukan prodi dari ketersediaan pilihan siswa. Setelah konfirmasi diberikan, sistem akan menonaktifkan atau menghapus instansi program studi dari *database*.

**hh. Melihat Daftar Universitas**

*(Tempatkan Gambar 3.58 Activity Diagram Melihat Daftar Universitas di sini)*

Gambar 3.58 menggambarkan proses Admin dalam meninjau tabel daftar perguruan tinggi tingkat institusi. Setelah antarmuka terbuka, sistem akan menyajikan himpunan data universitas tersebut dari *database*.

**ii. Tambah Data Universitas**

*(Tempatkan Gambar 3.59 Activity Diagram Tambah Universitas di sini)*

Gambar 3.59 menggambarkan proses Admin dalam menambahkan entitas nama perguruan tinggi. Setelah Admin mengisi nama baru pada jendela penambahan, sistem akan menyuntikkan data nama universitas tersebut ke dalam sistem relasional.

**jj. Memperbarui Data Universitas**

*(Tempatkan Gambar 3.60 Activity Diagram Memperbarui Universitas di sini)*

Gambar 3.60 menggambarkan proses Admin dalam memperbaiki detail nomenklatur universitas. Saat Admin mengubah ejaan dan mengeklik tombol setuju, sistem memodifikasi nama institusi di pangkalan data secara menyeluruh.

**kk. Menghapus Data Universitas**

*(Tempatkan Gambar 3.61 Activity Diagram Menghapus Universitas di sini)*

Gambar 3.61 menggambarkan proses Admin dalam menghilangkan universitas induk beserta daftar jurusannya. Saat perintah dieksekusi, sistem akan menghapus seluruh data afiliasinya dari *database* secara menyeluruh.

**ll. Melihat Pengaturan Sistem**

*(Tempatkan Gambar 3.62 Activity Diagram Melihat Pengaturan Sistem di sini)*

Gambar 3.62 menggambarkan proses Admin dalam mengakses panel pengendalian inti. Saat Admin mengeklik tombol pengaturan, sistem akan mengambil susunan konfigurasi teknis dari *database* lalu menghadirkannya dalam menu kontrol.

**mm. Memperbarui Peraturan Sistem**

*(Tempatkan Gambar 3.63 Activity Diagram Memperbarui Peraturan Sistem di sini)*

Gambar 3.63 menggambarkan proses Admin dalam melakukan penyesuaian aturan operasional situs. Saat Admin mengganti sebuah parameter teknis, sistem langsung menerapkan nilai tersebut secara *real-time* pada saat itu juga.


### 3.3.3 Perancangan Basis Data
**1. Entity Relationship Diagram (ERD)**

*(Tempatkan Gambar 3.64 Entity Relationship Diagram di sini)*

Berdasarkan Gambar 3.64, perancangan basis data pada sistem dikembangkan menggunakan Prisma ORM yang dihubungkan ke dalam sistem manajemen basis data relasional PostgreSQL. Struktur relasional ini dirancang secara khusus untuk mendukung fungsionalitas sistem *tutoring* adaptif, pencatatan rekam jejak kecerdasan buatan, serta penargetan universitas secara terpadu untuk kebutuhan platform UTBK SNBT.

Entitas paling mendasar dalam sistem ini adalah tabel `User`, yang berfungsi menyimpan data identitas dan kredensial autentikasi pengguna, meliputi nama, email, *password* (yang telah melalui proses *hashing* bcrypt), serta peran akses (*role*) sebagai `STUDENT` atau `ADMIN`. Tabel `User` memiliki relasi ke tabel `StudentProfile`, yang dirancang untuk menyimpan konfigurasi personalisasi siswa secara mendalam. Personalisasi ini meliputi preferensi gaya percakapan AI (*aiStyle*, *aiEnergy*, *aiLength*), tahun kelulusan, dan relasi langsung ke tabel `Major` yang merepresentasikan target program studi pilihan pertama dan kedua siswa. Tabel `University` dan `Major` merupakan entitas independen hasil ekstraksi data (*scraping*) yang mencatat seluruh direktori perguruan tinggi negeri beserta daftar program studi, lengkap dengan atribut klaster, daya tampung, jumlah peminat, serta estimasi skor rasionalisasi (*estimatedScore*) yang akan dievaluasi oleh algoritma *Chancing Engine*.

Struktur kurikulum dan bank soal disusun secara bertingkat melalui tiga tabel hierarkis: `Subject` (mata pelajaran UTBK), `Chapter` (topik atau subbab materi), dan `Question` (butir soal). Tabel `Subject` memiliki relasi *one-to-many* dengan `Chapter`, yang kemudian menaungi banyak butir soal pada tabel `Question`. Butir soal pada sistem ini tidak sebatas teks biasa, melainkan mendukung pe-render-an format *Markdown* dan penulisan notasi aljabar melalui *KaTeX*. Tabel `Question` terhubung langsung dengan tabel `QuestionOption` yang menampung pilihan ganda berserta penanda kunci jawaban (*isCorrect*). Perlu ditekankan bahwa desain hierarkis `Subject` dan `Chapter` ini tidak difungsikan sebagai repositori penyimpan materi bacaan (*textbook*), melainkan murni dikembangkan sebagai fondasi struktur *question-based learning* (pembelajaran berbasis soal).

Seluruh aktivitas evaluasi siswa direkam secara komprehensif pada tabel `ExamAttempt`, yang mencatat status pengerjaan (*IN_PROGRESS*, *COMPLETED*), stempel waktu, skor mentah (*rawScore*), serta estimasi nilai standar UTBK (*scaledScore*). Entitas ini terhubung ke struktur arsitektur ujian pada tabel `ExamTemplate` dan `ExamSection`. Rincian perilaku siswa saat menjawab butir soal dipecah secara mendetail ke dalam tabel `QuestionResponse`, yang menyimpan opsi jawaban yang dipilih, durasi pengerjaan per butir soal (*timeSpent*), status validitas jawaban, dan penanda ragu-ragu (*flagged*).

Guna mendukung keandalan fitur *Intelligent Tutoring System* (ITS), basis data menyediakan tabel `ChapterProgress` (berfungsi sebagai *Mastery Tracking*). Tabel ini bertugas merekam tingkat penguasaan konsep (*masteryLevel*) setiap pengguna pada suatu subbab materi secara kumulatif. Di samping itu, histori bimbingan AI dicatat secara terstruktur ke dalam tabel `TutoringSession` beserta turunan pesannya di tabel `TutoringMessage`. Data log percakapan ini diklasifikasikan berdasarkan entitas komunikator (*USER*, *ASSISTANT*, *SYSTEM*) untuk memastikan model *Large Language Model* (LLM) senantiasa memiliki rekam memori kontekstual selama melakukan *scaffolding*. Sebagai penunjang operasional, fitur kendali sistem global dikelola lewat tabel `SystemSetting`, yang memberikan fleksibilitas bagi admin untuk melakukan penyesuaian konfigurasi aplikasi secara *real-time* tanpa perlu mengubah basis kode (*source code*).

### 3.3.4 Arsitektur Sistem

*(Tempatkan Gambar 3.65 Arsitektur Sistem di sini)*

Berdasarkan Gambar 3.65, arsitektur sistem menunjukkan perancangan tingkat tinggi yang menggambarkan alur eksekusi aplikasi secara komprehensif. Titik awal interaksi terjadi ketika pengguna (*Client*) mengakses platform menggunakan peramban web. Mekanisme antarmuka pengguna (*User Interface*) dan logika komputasi *Server-Side Rendering* (SSR) ditangani secara penuh oleh *framework* Next.js yang berjalan di atas lingkungan *runtime* Node.js.

Seluruh lalu lintas kueri dan mutasi data ke basis data difasilitasi oleh Prisma ORM. Prisma bertindak sebagai lapisan abstraksi (*query builder*) yang berkomunikasi dengan layanan basis data PostgreSQL. Untuk menjamin keamanan akses, sistem autentikasi diimplementasikan menggunakan pustaka NextAuth.js yang memvalidasi kredensial lokal dengan enkripsi bcrypt yang kuat.

Pada domain kecerdasan buatan, sistem mengadopsi pola arsitektur *External LLM Integration*. *Backend* Next.js merakit instruksi terstruktur (*prompt*) melalui *Prompt Builder*, kemudian melakukan panggilan API ke layanan agregator OpenRouter. Layanan ini mendistribusikan beban komputasi dan menerapkan sistem *fallback* secara dinamis ke tiga model bahasa yang berfokus pada kecepatan, yakni Gemini 2.5 Flash, Llama 3.1 8B, dan Qwen 2.5 7B. Pemilihan model-model yang ringan beserta penggunaan agregator ini didasari oleh kebutuhan sistem ITS untuk menghadirkan bimbingan secara instan (*low latency*) dan reliabilitas tinggi (*high availability*) guna menjaga kelancaran pengalaman belajar siswa saat berdiskusi di Mode Belajar.

### 3.3.5 Perancangan AI Tutor

**1. Flowchart AI Tutor**

AI Tutor diposisikan sebagai mesin utama dari *Intelligent Tutoring System* (ITS) yang bertanggung jawab dalam menyalurkan bimbingan secara personal. Agen AI ini dirancang tidak hanya untuk mengoreksi jawaban, tetapi juga beradaptasi dengan riwayat penguasaan (*mastery*) dan jumlah kegagalan pengerjaan (*attempt count*) yang dialami siswa.

*(Tempatkan Gambar 3.66 Flowchart AI di sini)*

Berdasarkan Gambar 3.66, alur logika diawali saat siswa mengirimkan jawaban di layar Mode Belajar. Sistem akan memvalidasi keakuratan opsi tersebut. Jika jawaban bernilai benar, sistem memicu kalkulasi pembaruan skor di `ChapterProgress`, dan AI Tutor memberikan penjelasan konfirmasi (*Positive Reinforcement*). 

Namun, jika jawaban bernilai salah, sistem memeriksa batas maksimal percobaan. Informasi mengenai jumlah kegagalan (*attempt*) diumpankan ke dalam komponen *Rule-Based Strategy Selector*. Selanjutnya, *Prompt Builder* akan menyatukan seluruh konteks masalah (termasuk *Ground Truth* kunci jawaban asli) yang dilapisi oleh instruksi *Guardrail* keamanan, sebelum dikirimkan ke model LLM. Respons umpan balik yang dihasilkan kemudian dikembalikan kepada siswa agar mereka dapat merunut ulang logika penyelesaian pada percobaan berikutnya.

**2. Prompt Builder**

*Prompt Builder* adalah modul perakit instruksi internal yang berfungsi menghimpun seluruh elemen pembelajaran menjadi sebuah konteks terpadu (*mega-prompt*) sebelum dikirimkan ke *Large Language Model* (LLM). Komponen ini bertugas menyatukan variabel dinamis yang mencakup teks butir soal, opsi jebakan yang dipilih oleh siswa, riwayat percakapan (*history* pada tabel `TutoringMessage`), serta variabel target jurusan (`Major`) yang diincar oleh siswa.

Dengan menghimpun variabel-variabel tersebut, *Prompt Builder* memastikan bahwa AI Tutor memiliki kesadaran penuh terhadap konteks permasalahan yang sedang dihadapi siswa. Sebagai contoh, dengan disuntikkannya nama program studi impian siswa ke dalam *prompt*, AI sesekali dapat membangun koneksi emosional dengan cara memotivasi siswa tentang relevansi materi tersebut terhadap peluang lolos ujian SNBT mereka. Keseluruhan proses perakitan ini dieksekusi secara instan di sisi *backend* Node.js sebelum jaringan API terpanggil.

**3. Adaptive AI Prompting (Personalisasi Berbasis Profil)**

Berbeda dengan sistem *tutoring* konvensional yang menyamaratakan gaya penjelasan ke seluruh pengguna, Lexica UTBK menerapkan *Adaptive AI Prompting* yang membaca konfigurasi psikologis siswa dari entitas `StudentProfile`. Nilai konfigurasi tersebut digunakan oleh *Prompt Builder* untuk memodifikasi gaya bahasa, tingkat energi, dan panjang respons AI secara dinamis. Penyesuaian ini diklasifikasikan ke dalam tabel-tabel parameter berikut.

Tabel 3.3 Klasifikasi Gaya Pendekatan AI (*aiStyle*)
| Tipe *Personality* AI | Penjabaran *System Prompt* di dalam Sistem |
|---|---|
| *Professional* | Menggunakan nada yang rapi, presisi, dan sangat formal layaknya guru besar di sekolah. |
| *Friendly* | Menggunakan nada yang ramah, hangat, akrab, dan suportif layaknya seorang kakak kelas pendamping. |
| *Honest* | Berbicara secara terus terang, jujur, tanpa basa-basi, serta langsung mengoreksi kesalahan secara tegas. |
| *Quirky* | Menggunakan gaya nyentrik, menyenangkan, dan sedikit humoris (memasukkan kosakata gaul *Gen-Z* secukupnya). |
| *Efficient* | Merespons sesingkat mungkin, sangat lugas, dan langsung ke inti penyelesaian masalah teknis. |
| *Sarcastic* | Sarkastis dan jenaka layaknya kritikus, namun tetap sangat edukatif dan tidak pernah merendahkan mental siswa. |

Selain gaya bahasa dasar pada Tabel 3.3, sistem juga mengatur kedalaman emosi dan panjang teks balasan melalui parameter energi dan volume.

Tabel 3.4 Klasifikasi Energi dan Volume Respons AI (*aiEnergy* & *aiLength*)
| Parameter Dinamis | Pilihan Konfigurasi | Deskripsi Instruksi Pembentukan *Prompt* |
|---|---|---|
| Tingkat Energi (*aiEnergy*) | *High* / *Low* | *High*: Ekspresif, ceria, menggunakan tanda seru dan emoji. *Low*: Tenang, kalem, netral, meminimalisir emoji. |
| Volume Teks (*aiLength*) | *Short* / *Normal* / *Long* | *Short*: Sangat pendek (1-2 kalimat). *Long*: Detail, elaboratif, dan deskriptif membedah komponen materi. |

Berdasarkan Tabel 3.3 dan 3.4, persilangan antara gaya bahasa, tingkat energi, dan volume teks memungkinkan AI Tutor memiliki ratusan variasi personalitas yang unik. Penyesuaian terstruktur ini menjamin bahwa setiap siswa mendapatkan pengalaman belajar personal yang paling sesuai dengan daya tangkap emosional mereka masing-masing.

**4. Rule-Based Strategy Selector**

*Rule-Based Strategy Selector* merupakan salah satu komponen logika krusial pada AI Tutor yang berfungsi menetapkan strategi pedagogis (pendekatan pengajaran) sebelum permintaan diproses oleh LLM. Komponen ini menerapkan pendekatan *Rule-Based System* yang secara spesifik menggunakan jumlah percobaan salah (*attempt count*) sebagai dasar pengambilan keputusan kalkulatif. Berdasarkan kalkulasi hitungan tersebut, sistem menentukan kedalaman bantuan kognitif (*Instructional Scaffolding*) yang akan disalurkan kepada siswa.

Tabel 3.5 Aturan Pemilihan Strategi Bimbingan (Penentuan *Scaffold Level*)
| Kondisi Pengerjaan (*Trigger*) | Penetapan *Scaffold Level* | Penjelasan Strategi Bimbingan (*Scaffolding*) |
|---|---|---|
| Salah 1x | *Socratic Hint* (Level 1) | AI memberikan pertanyaan pancingan konseptual untuk merangsang penalaran siswa agar menyadari kesalahannya sendiri tanpa membocorkan rumus. |
| Salah 2x | *Step-by-Step Guidance* / *Hint* (Level 2) | Batas maksimum percobaan salah tercapai (Sistem akan memaksa lanjut soal). AI merincikan rumus secara parsial agar siswa memahami alur pengerjaannya. |
| Benar 1x / Benar Setelah Salah 1x | *Positive Reinforcement* / *Solution* (Level 3) | Siswa berhasil menjawab benar. AI memberikan afirmasi positif dan menjabarkan konfirmasi pembahasan utuh untuk memvalidasi pemahaman siswa. |

Berdasarkan Tabel 3.5, sistem tidak akan serta-merta memberikan pembahasan lengkap apabila siswa melakukan kesalahan. Sistem mengadopsi prinsip keilmuan *Instructional Scaffolding*, yakni menyalurkan degradasi bantuan bertahap mulai dari sekadar pancingan (*Socratic Hint*) hingga panduan pengerjaan bersyarat (*Step-by-Step Guidance*). Adapun penjabaran pembahasan utuh (Level 3) secara ketat hanya disalurkan sebagai bentuk apresiasi penegasan konsep (*Positive Reinforcement*) manakala siswa telah berhasil memecahkan soal tersebut dengan benar secara mandiri.

**5. Ground Truth Injection dan Guardrail Prompting**

Demi menjamin validitas nilai keilmuan yang dihasilkan, platform Lexica UTBK menolak mekanisme *Blind Mode* konvensional—di mana agen AI dibiarkan raba-raba untuk mencari jawaban matematis sendiri yang berisiko tinggi memicu kesalahan kalkulasi (*hallucination*). Sebagai gantinya, arsitektur yang diusung adalah kombinasi mutlak antara *Ground Truth Injection* dan *Guardrail Prompting*.

Pada fase *Ground Truth Injection*, *Prompt Builder* secara tersembunyi menyuntikkan teks kunci jawaban asli (`{correct}`) langsung ke dalam tubuh pesan internal yang dikirim ke LLM. Proses ini membekali model AI dengan pencerahan matematis dan logis yang mutlak. Namun, agar AI tidak langsung "menyuapi" siswa, sistem memborgol model AI tersebut menggunakan lapisan *Guardrail Prompting*. Instruksi *guardrail* ini (didefinisikan di *codebase* sebagai "ATURAN MUTLAK") memberikan perintah penolakan tegas yang mengharamkan agen LLM untuk menyebutkan opsi kebenaran (seperti: "Jawaban yang benar adalah C") maupun hasil perhitungan akhirnya kepada siswa. Mekanisme tarik-ulur (*push-and-pull*) inilah yang secara efektif mengunci peran LLM murni sebagai fasilitator yang mengarahkan pemikiran siswa, sekaligus menjamin 100% akurasi pembahasan AI secara fundamental.

**6. Integrasi OpenRouter API dan Multi-Model Fallback Routing**

Setelah *prompt* berhasil disusun sedemikian rupa, sistem akan mengirimkan kueri jaringan (HTTP *Request*) ke ekosistem LLM melalui layanan agregator **OpenRouter API**. Berbeda dengan integrasi statis satu model pada umumnya, arsitektur ini menerapkan ketahanan peladen tingkat tinggi melalui mekanisme komputasi bernama *Multi-Model Fallback Routing*. 

Dalam mekanisme ini, *backend* Next.js mendaftarkan sebuah *array* (deret) kandidat model AI. Model `google/gemini-2.5-flash` ditempatkan sebagai model komputasi primer mengingat keunggulan latensinya (*speed*) yang sangat mendominasi, sehingga ideal untuk membalas obrolan siswa secara *real-time*. Akan tetapi, guna memastikan layanan ITS tetap tersedia 24/7, sistem mencantumkan model sekunder *open-source* canggih yakni `meta-llama/llama-3.1-8b-instruct` dan `qwen/qwen-2.5-7b-instruct` ke dalam deret *array* tersebut. 

Apabila koneksi OpenRouter mendeteksi bahwa *server* Gemini sedang mengalami *timeout*, kelumpuhan sementara (*downtime*), atau membatasi pembacaan *token* (*rate limiting*), maka kueri jaringan akan secara otomatis diteruskan (*routed*) secara halus (*seamless*) ke model Llama atau Qwen tanpa menampilkan pesan eror ke layar pengguna.

**7. Output Pembelajaran (AI Hint, Positive Reinforcement, dan Rekomendasi Terfokus)**

Aktivitas inferensi dari AI Tutor memproduksi tiga jenis luaran terstruktur yang mendampingi berbagai spektrum perjalanan belajar siswa. Masing-masing luaran memiliki pemicu sistem (*trigger*) dan fungsi eksekusi yang sangat terpisah:

- **AI Hint (*Scaffolding*)**: Luaran ini terbentuk ketika pemicu validasi mencatat nilai *salah* dari jawaban siswa. Bentuk bantuan teks yang disajikan (mulai dari *Socratic Hint* hingga panduan parsial) disusun untuk memprovokasi siswa agar mereka dapat merunut ulang kesalahan langkahnya secara mandiri, yang senantiasa dijaga keakuratannya oleh protokol *Guardrail Prompting*.
- **Positive Reinforcement (*Feedback Positif*)**: Luaran ini dieksekusi secara instan manakala siswa mensubmit jawaban yang bernilai *benar*. Ketimbang hanya menampilkan ikon centang belaka, AI Tutor akan memanfaatkan visibilitas jawaban benar tersebut untuk memberikan penegasan konsep (afirmasi logis). Hal ini secara psikologis memberikan efek apresiasi (*reward*) sembari mematangkan ingatan retensi siswa terhadap metode yang baru saja mereka selesaikan secara gemilang.
- **Rekomendasi Terfokus (Integrasi Modul *Dashboard*)**: Di akhir pengerjaan sesi belajar, platform tidak sekadar memproduksi *Study Report* yang pasif. Nilai kumulatif penguasaan siswa dari bab tersebut langsung didistribusikan (*broadcast*) ke algoritma *Mastery Tracking*. Angka metrik ini ditangkap langsung oleh *Chancing Engine* untuk merombak susunan rekomendasi materi di halaman *dashboard*. Modifikasi proaktif secara *real-time* ini memaksa siswa untuk mengalihkan waktu belajar mereka ke topik-topik krusial UTBK yang belum mencapai standar kelulusan kompetensi.


### 3.3.6 Perancangan Learning Analytics dan Learning Path

**1. Perhitungan Skor Akhir (Skoring Ganda: IRT dan Asesmen Formatif)**

Perhitungan skor akhir siswa pada platform Lexica UTBK sama sekali tidak menggunakan skema pembobotan manual yang statis (seperti metode tradisional *pre-test/post-test*). Sebagai gantinya, sistem mengimplementasikan arsitektur *Skoring Ganda* yang bergantung pada mode pembelajaran yang sedang diakses oleh siswa: Mode Tryout (Simulasi Murni) dan Mode Belajar (Pendampingan AI).

Pada **Mode Tryout**, yang difungsikan sebagai simulasi riil UTBK SNBT sesungguhnya, penghitungan skor tidak dilakukan menggunakan persentase benar-salah murni. Sistem menerapkan algoritma *Item Response Theory* (IRT) model logistik 1 parameter (Rasch Model) untuk mengestimasi *Theta* (kemampuan laten) siswa. Skor akhir (*scaledScore*) dihitung berdasarkan interaksi probabilitas antara kemampuan absolut siswa dengan tingkat kesulitan butir soal (sebagaimana dirincikan pada persamaan *Log-Likelihood* IRT di Bab II). Metode ini menjamin bahwa skor Tryout memiliki standar deviasi dan rentang nilai yang sangat representatif dengan sistem penilaian resmi SNPMB BPPP.

Sementara itu, pada **Mode Belajar** yang didampingi AI Tutor, penilaian difokuskan sebagai asesmen formatif berkelanjutan. Skor pada mode ini dihitung menggunakan persentase murni tanpa kalibrasi IRT. Tujuannya adalah untuk mengukur seberapa presisi pemahaman siswa terhadap suatu topik bahasan pasca diberikan *scaffolding*. Skor formatif ini dihitung dengan persamaan rasio:
$$\text{Skor Latihan} = \left( \frac{\sum \text{Jawaban Benar}}{\sum \text{Total Soal yang Dikerjakan}} \right) \times 100$$

Skor dari dua sisi ini (Skor IRT untuk ujian sumatif dan Skor Rasio untuk latihan formatif) kemudian diagregasikan ke dalam tabel `ExamAttempt` dan `ChapterProgress` guna menjadi landasan empiris bagi modul analitik selanjutnya.

**2. Mastery Tracking (Pelacakan Penguasaan Materi)**

*Mastery Tracking* merupakan komponen pengolahan data pada AI Tutor yang berfungsi memantau tingkat penguasaan konsep (*concept mastery*) setiap siswa secara akumulatif. Proses pembaruan nilai penguasaan ini dilakukan seketika (*real-time*) setiap kali siswa mengeksekusi penyelesaian latihan per bab (Topik Materi).

Tujuan dari penjejakan ini adalah untuk memastikan bahwa sistem tidak hanya menyimpan tumpukan angka belaka, tetapi mengkonversinya menjadi representasi jejak pemahaman. Pada platform ini, *MasteryLevel* (0-100) dikalkulasi secara harian berdasarkan perbandingan kumulatif dari seluruh penyelesaian soal formatif yang dilakukan di subbab tersebut.

Sebagai contoh, apabila siswa telah menghadapi total paparan 40 butir soal Eksponen pada Mode Belajar dan berhasil mengamankan 34 soal dengan benar (meskipun di antaranya harus melalui bimbingan AI terlebih dahulu), maka:
$$\text{Mastery Level} = \left( \frac{34}{40} \right) \times 100\% = 85\%$$
Angka rasio inilah yang kemudian disimpan sebagai nilai permanen pada entitas `ChapterProgress`, yang secara langsung mewakili tingkat literasi siswa pada ranah spesifik tersebut.

**3. Algoritma Learning Path (Rekomendasi Personal)**

Fitur *Learning Path* merupakan wujud konkret dari konsep *Personalized Learning*. Berbeda dengan kurikulum linear konvensional yang menyamaratakan alur urutan bab dari halaman pertama hingga terakhir, modul *Learning Path* merombak (*rearrange*) urutan bab pelajaran berdasarkan algoritma penentu prioritas (*Priority Algorithm*) yang sangat spesifik untuk tiap individu.

Dalam menentukan urutan prioritas, sistem pada berkas `learning-path/route.ts` tidak menggunakan rumus manual berbasis penalti waktu (*forgetting factor*), melainkan menggunakan matriks prioritas berbasis status kelulusan (*Status-Based Priority*) dan bobot klaster (*Cluster Weighting*).

**a. Status-Based Priority**
Sistem memetakan setiap bab (Topik) ke dalam 3 hierarki prioritas:
1. `IN_PROGRESS` (Prioritas Tertinggi / Peringkat 1): Diberikan kepada bab yang sudah mulai dipelajari tetapi tingkat penguasaannya (*Concept Mastery* maupun *Exam Readiness*) masih di bawah ambang batas lulus minimal (< 70%).
2. `NOT_STARTED` (Prioritas Menengah / Peringkat 2): Diberikan kepada bab yang belum pernah disentuh atau dikerjakan sama sekali oleh siswa.
3. `COMPLETED` (Prioritas Terendah / Peringkat 3): Diberikan kepada bab di mana siswa sudah berhasil meraih nilai > 70% baik pada ujian Tryout maupun Latihan harian.
Algoritma melakukan fungsi *sorting* (penyortiran) matriks di sisi peladen (*server-side*), sehingga secara otomatis bab-bab berstatus `IN_PROGRESS` ditarik paksa ke posisi teratas *dashboard* agar siswa terfokus membereskan kelemahannya sebelum melangkah ke bab baru.

**b. Cluster Weighting (Pembobotan Target PTN)**
Selain menyortir berdasarkan penguasaan, modul *Learning Path* secara proaktif mengambil data klaster rumpun jurusan (*Saintek/Soshum*) dari entitas `StudentProfile` untuk menyesuaikan beban subtes. 
- Apabila siswa menargetkan rumpun **SAINTEK**, algoritma akan memberikan bobot pengali 1.5x pada mata pelajaran *Penalaran Matematika* dan *Pengetahuan Kuantitatif*.
- Apabila siswa menargetkan rumpun **SOSHUM**, pengali 1.5x dialihkan secara eksklusif ke *Literasi Bahasa Indonesia* dan *Literasi Bahasa Inggris*.

Intervensi algoritma ini secara cerdas dan sistematis memaksa siswa untuk mengalokasikan waktu belajar terbesar mereka pada bab-bab yang paling krusial dalam menyumbang skor untuk jurusan impiannya (*Chancing Engine Integration*).


### 3.4 Alat dan Bahan Tugas Akhir

Dalam serangkaian proses perancangan, penyusunan kode sumber, dan pengujian sistem kecerdasan buatan, diperlukan spesifikasi perkakas teknis dan himpunan data primer maupun sekunder. Rincian alat dan bahan dalam tugas akhir ini dijabarkan sebagai berikut:

#### 3.4.1 Perangkat Keras (*Hardware*)
Aktivitas komputasi untuk perakitan basis data, kompilasi kode *server-side*, hingga simulasi antarmuka klien menggunakan satu mesin komputasi berarsitektur hibrida dengan spesifikasi sebagaimana ditunjukkan pada Tabel 3.6.

Tabel 3.6 Spesifikasi Perangkat Keras (*Hardware*)
| Komponen | Spesifikasi Rekomendasi (Minimum) | Spesifikasi yang Digunakan |
|---|---|---|
| **Sistem Operasi** | Windows 10 (64-bit) / macOS Monterey | macOS (Apple Silicon Environment) |
| **Prosesor (CPU)** | Intel Core i3 / AMD Ryzen 3 (Quad-Core) | Apple M1 Pro (10-Core ARM Architecture) |
| **Memori (RAM)** | 8 GB RAM | 16 GB Unified Memory |
| **Penyimpanan** | 256 GB Solid State Drive (SSD) | 512 GB Solid State Drive (SSD) |

#### 3.4.2 Perangkat Lunak (*Software*)
Pengembangan perangkat lunak mengadopsi ekosistem mutakhir berbasis *JavaScript/TypeScript* dengan tumpukan teknologi *Full-Stack* berorientasi peladen (*Serverless Edge*):
1. **Visual Studio Code**: Berperan sebagai *Integrated Development Environment* (IDE) primer untuk kegiatan *coding*.
2. **Node.js**: Berperan sebagai lingkungan eksekusi (*runtime environment*) tingkat rendah (V8 Engine) pada sisi *backend*.
3. **Next.js**: Bertindak sebagai kerangka kerja (*framework*) *React* yang memfasilitasi komputasi *Server-Side Rendering* (SSR) dan *API Routing*.
4. **Prisma ORM**: Dimanfaatkan sebagai alat abstraksi (*query builder*) untuk melaksanakan migrasi skema tabel (*schema migration*).
5. **PostgreSQL**: Berfungsi sebagai sistem manajemen pangkalan data relasional (RDBMS) utama.
6. **Git**: Berperan sebagai Sistem Kontrol Versi (*Version Control System*) untuk mendokumentasikan lintasan sejarah modifikasi kode secara komprehensif.

#### 3.4.3 Layanan Kecerdasan Buatan (AI)
Infrastruktur penalaran kecerdasan buatan dalam fitur *Intelligent Tutoring System* (ITS) diotaki oleh layanan agregasi model awan (*Cloud API Services*):
- **OpenRouter API**: Diimplementasikan sebagai gerbang utama peladen kecerdasan buatan. API ini bertugas mendistribusikan (*routing*) instruksi *Prompt Builder* secara dinamis menuju model komputasi primer **Gemini 2.5 Flash**. OpenRouter dipilih secara khusus karena memiliki arsitektur toleransi kesalahan (*fault-tolerant*), di mana ia akan otomatis melakukan manuver pengalihan (merutekan kueri) menuju model sekunder seperti *Llama 3.1 8B* atau *Qwen 2.5 7B* apabila peladen primer mengalami kendala teknis. Layanan ini memastikan bimbingan siswa berlangsung instan tanpa henti.

#### 3.4.4 Dataset Pihak Ketiga
Integrasi data eksternal direkatkan ke dalam pangkalan data guna mendukung fitur *Chancing Engine* dan validitas simulasi:
- Basis data direktori inventaris Perguruan Tinggi Negeri (PTN) di seluruh Indonesia, termasuk daftar program studi sarjana/vokasi, daya tampung kuota masuk, serta riwayat jumlah pelamar pada tahun-tahun sebelumnya yang dihimpun dari portal resmi publikasi SNPMB BPPP.
- Dataset nilai batas kelulusan (*passing grade*) yang ditransformasikan menjadi parameter *Estimated Score* untuk memicu algoritma penyortiran klaster.

#### 3.4.5 Dataset Pihak Pertama
Demi menjamin relevansi pedagogis dengan kurikulum resmi UTBK SNBT teranyar, data bank instrumen soal disusun dan direkayasa secara independen:
- Himpunan bank soal utama diketik, dikompilasi, dan dirangkai secara teliti di atas medium *Spreadsheet*. Data butir soal ini merangkum narasi literasi kompleks, lampiran grafis, hingga rumus saintifik tingkat tinggi yang seluruhnya disandikan menggunakan notasi penulisan sintaks **LaTeX / KaTeX**. Seluruh kumpulan baris *Spreadsheet* ini kemudian diparsing otomatis menjadi format struktur data JSON dan disuntikkan (*seed*) langsung ke pusat urat nadi PostgreSQL agar dapat dirender secara estetik oleh antarmuka aplikasi.
