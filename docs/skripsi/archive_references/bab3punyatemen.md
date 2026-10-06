
BAB III. METODE TUGAS AKHIR
3.1        Metode Penelitian
Pada aplikasi Tryout ini, proses pengembangan sistem dilakukan menggunakan metode ADDIE (Analysis, Design, Development, dan Evaluation). Metode ini dipilih karena memiliki tahapan yang sistematis sehingga memudahkan proses analisis, perancangan, pengembangan, implementasi, dan evaluasi sistem. Setiap tahapan dilakukan secara terstruktur sehingga hasil pengembangan dapat dievaluasi sebelum dilanjutkan ke tahap berikutnya. Dengan demikian, sistem yang dihasilkan diharapkan dapat berfungsi sesuai dengan tujuan penelitian.

Gambar 3. 1 Metode Pengembangan ADDIE
Berdasarkan gambar 3.1, tahapan yang dilakukan dalam pengembangan sistem adalah sebagai berikut:
Analysis (Analisis Kebutuhan)
Pada tahap ini, penulis menentukan fitur-fitur pada sistem sesuai dengan rumusan masalah yang telah ditentukan. Prosesnya meliputi pengumpulan data,analisis kebutuhan pengguna, serta penentuan kebutuhan sistem, baik kebutuhan fungsional, maupun kebutuhan non-fungsional. Tahapan analisis dilakukan secara menyeluruh agar sistem yang dikembangkan dapat berjalan sesuai dengan tujuan penelitian.
Design System (Desain Sistem)
Tahapan berikutnya merancang sistem yang akan dikembangkan. Perancangan ini dibuat menggunakan Unified Modeling Language (UML), seperti Use Case Diagram, Activity Diagram, dan Perancangan Basis Data. Perancangan ini dirancang untuk menggambarkan bagaimana pengguna (siswa dan Superadmin) dapat berinteraksi dengan sistem. Selain itu, dalam tahap ini juga merancang struktur basis data, serta  tampilan antarmuka agar sistem Tryout mudah digunakan.
3.     Development (Pengembangan)
Pada tahapan ini, rancangan sistem yang telah dibuat sebelumnya diterapkan ke dalam bentuk kode program. Proses pengembangannya meliputi pembuatan logika di bagian backend, pengelolaan basis data, serta pembuatan frontend yang interaktif agar sistem dapat berjalan dengan baik, dan  pengguna dapat mengakses dengan mudah.
Implementation (Implementasi)
Pada tahapan ini, sistem yang telah dikembangkan dijalankan dan digunakan sesuai dengan skenario yang telah dirancang. Selanjutnya dilakukan pengujian oleh responden sesuai dengan perannya, yaitu siswa dan superadmin, untuk memastikan seluruh fitur dapat digunakan dengan baik sebelum dilakukan evaluasi.
5.     Evaluation (Evaluasi)
Pada tahap ini dilakukan evaluasi terhadap sistem yang telah dikembangkan melalui beberapa jenis pengujian, yaitu:
 
a. Black-Box Testing
Pengujian dilakukan untuk memastikan seluruh fungsi sistem berjalan sesuai dengan kebutuhan yang telah ditentukan. Pengujian mencakup fitur autentikasi, pengelolaan bank soal, Mode Belajar, Mode Ujian, AI Tutor, Learning Analytics, Personal Plan, serta proses impor soal dari dokumen Excel.
b. System Usability Scale (SUS)
Pengujian dilakukan untuk mengukur tingkat kemudahan penggunaan (usability) sistem berdasarkan penilaian responden yang terdiri atas siswa dan SuperAdmin.
c. Penetration Testing
Pengujian keamanan dilakukan menggunakan OWASP ZAP untuk mengidentifikasi potensi kerentanan pada aplikasi web, seperti kesalahan konfigurasi keamanan, kelemahan autentikasi, missing security headers, serta potensi kerentanan lainnya. Hasil pengujian digunakan sebagai dasar evaluasi dan perbaikan keamanan sistem sebelum aplikasi digunakan.
3.2        Requirement Analysis
Analisis kebutuhan sistem dilakukan melalui studi literatur dan analisis terhadap platform Tryout yang telah tersedia. Hasil analisis tersebut digunakan sebagai dasar dalam menyusun kebutuhan fungsional dan non-fungsional yang akan diimplementasikan pada aplikasi sehingga sistem yang dikembangkan sesuai dengan tujuan penelitian.
Pada tahap ini, kebutuhan sistem terbagi menjadi dua jenis, yaitu kebutuhan fungsional dan kebutuhan non-fungsional. Kebutuhan tersebut disusun berdasarkan fitur dan spesifikasi Intelligent Tutoring System (ITS) yang dikembangkan.
 
 
 
3.2.1    Kebutuhan Fungsional 
     1.         Aktor : Siswa
Tabel 3. 1 Kebutuhan Fungsional Siswa
No.
Kebutuhan Fungsional

Siswa dapat melakukan registrasi dan login ke dalam sistem, termasuk menggunakan akun Google (Google Sign-In).

Siswa dapat melakukan proses lupa kata sandi dan memperbarui kata sandi melalui email.

Siswa dapat mengatur target nilai belajar dan target harian sebagai dasar perencanaan pembelajaran.

Siswa dapat melihat personal plan dan prioritas materi berdasarkan hasil penguasaan materi yang tersimpan pada sistem.

Siswa dapat mengerjakan ujian melalui halaman ujian yang dilengkapi timer dan navigasi soal.

Siswa dapat memulai sesi Mode Belajar dengan bantuan AI Tutor yang memberikan hint saat terjadi kesalahan.

Siswa dapat memulai sesi Mode Ujian tanpa bantuan AI Tutor.
 
 
No.
Kebutuhan Fungsional

Siswa dapat melihat dashboard analitik pembelajaran yang menampilkan statistik belajar, progres, tren nilai, status penguasaan materi, dan rekomendasi belajar.

Siswa dapat melihat hasil ujian lengkap dengan AI Study Report.
10.
Siswa dapat melihat riwayat pembelajaran dari seluruh aktivitas pengerjaan ujian dan latihan yang pernah dilakukan.

Siswa dapat mengelola profil dan mengubah password.
 
     2.         Aktor : Superadmin 
Tabel 3. 2 Kebutuhan Fungsional Superadmin
No.
Kebutuhan Fungsional
1.
Superadmin dapat login ke dalam sistem.
2.
Superadmin dapat melihat dashboard admin menampilkan informasi mengenai jumlah siswa, mata pelajaran soal, dan ujian yang tersedia di dalam sistem.
3.
Superadmin dapat mengelola mata pelajaran.
4.
Superadmin dapat mengelola materi pada setiap mata pelajaran.
No.
Kebutuhan Fungsional
5.
Superadmin dapat mengelola bank soal, terutama mengimpor soal dari file Excel, mengunggah media pendukung, serta melakukan pencarian dan penyaringan soal berdasarkan mata pelajaran maupun paket soal.
6.
Superadmin dapat memantau hasil sesi belajar dan hasil ujian yang dikerjakan oleh siswa.

Superadmin dapat mengelola data pengguna serta mengatur peran pengguna sesuai dengan hak akses yang tersedia pada sistem.
 
3. Kebutuhan Fungsional Sistem
No.
Kebutuhan Fungsional

Sistem dapat memeriksa dan menilai jawaban pilihan ganda secara otomatis berdasarkan kunci jawaban yang tersedia.

Sistem dapat menampilkan simbol maupun rumus matematika menggunakan MathJax atau LaTeX.

Sistem dapat memberikan bantuan pembelajaran secara adaptif pada Mode Belajar, berupa AI Hint, AI Feedback, serta pembatasan jumlah percobaan menjawab.
 
No.
Kebutuhan Fungsional

Sistem dapat menghitung skor akhir berdasarkan hasil Pre-Test, Main-Test, dan Post-Test sesuai dengan bobot yang telah ditentukan.

Sistem dapat menghasilkan AI Personal Study Report setelah siswa menyelesaikan sesi belajar.

Sistem dapat menyusun Personal Plan dan menentukan prioritas belajar berdasarkan hasil nilai yang diperoleh siswa.

Sistem dapat memperbarui tingkat penguasaan materi dan submateri secara otomatis berdasarkan hasil pengerjaan siswa.

Sistem dapat mengirimkan email notifikasi untuk membantu pengguna melakukan pembaruan kata sandi.
 
3.2.2    Kebutuhan Non-Fungsional
Kebutuhan non-fungsional menggambarkan kualitas sistem secara keseluruhan dan tidak dikaitkan dengan aktor tertentu, seperti:
a.     Sistem tetap dapat digunakan dengan baik meskipun terdapat kendala pada layanan eksternal, seperti layanan Artificial Intelligent (AI).
b.     Sistem dirancang dapat merespons setiap interaksi pengguna dengan cepat selama proses pembelajaran maupun pelaksanaan ujian.
c.     Antarmuka sistem dibuat dengan memperhatikan kemudahan penggunaan (user-friendly) agar setiap pengguna dapat mengoperasikan sistem dengan lebih mudah.
d.     Keamanan data dijaga dengan menerapkan enkripsi kata sandi sebelum disimpan ke dalam database.
3.3        Desain Sistem
Bagian ini menjelaskan perancangan sistem yang akan dikembangkan berdasarkan hasil analisis kebutuhan yang telah dilakukan sebelumnya. Perancangan ini bertujuan untuk memberikan gambaran mengenai bagaimana sistem akan bekerja, baik dari sisi proses, pengelolaan data, maupun tampilan antarmuka yang digunakan oleh pengguna. Dalam penelitian, perancangan sistem dibagi menjadi tiga pendekatan utama, yaitu:
1.     Pemodelan Sistem dengan Unified Modeling Language (UML)
Pada tahapan perancangan, penulis menggunakan pendekatan berbasis objek menggunakan Unified Modeling Language (UML). UML dipakai untuk menggambarkan dan mendokumentasikan alur kerja Intelligent Tutoring System (ITS) ini berjalan. Beberapa diagram UML yang digunakan antara lain:
a.     Use Case Diagram
Use Case Diagram digunakan untuk menggambarkan hubungan antara pengguna dengan sistem yang dibuat. Use Case diagram ini menunjukkan fitur-fitur yang dapat digunakan oleh pengguna serta interaksi yang terjadi di dalam sistem
b.     Activity Diagram 
Activity Diagram digunakan untuk menjelaskan alur proses yang berjalan di dalam sistem. Diagram ini membantu menggambarkan urutan aktivitas pengguna, mulai dari awal hingga akhir proses. Dalam penelitian ini, Activity Diagram digunakan untuk menggambarkan proses Login, proses pengerjaan soal, hingga proses sistem memberikan hasil evaluasi kepada pengguna. 
 
 
2. Pendekatan Database Diagram 
Perancangan Database dilakukan untuk menentukan struktur penyimpanan data pada sistem. Database dirancang agar data pengguna, data soal, hasil pengerjaan siswa, serta data pembelajaran dapat tersimpan dengan baik dan terorganisir. 
3. Arsitektur Sistem 
Arsitektur sistem digunakan untuk menggambarkan hubungan antar komponen utama yang membangun aplikasi. Pada penelitian ini, sistem dikembangkan menggunakan arsitektur berbasis web dengan Laravel sebagai Framework utama, PostgreSQL sebagai basis data, serta layanan Google OAuth 2.0 untuk proses autentikasi pengguna. Selain itu, sistem juga terintegrasi dengan layanan Groq API sebagai penyedia utama LLM dan OpenRouter API sebagai layanan cadangan (Fallback) apabila layanan utama tidak dapat digunakan. Perancangan arsitektur sistem bertujuan untuk memberikan gambaran mengenai alur komunikasi antar komponen sehingga proses pengolahan data dan layanan AI dapat berjalan dengan baik.
4. Perancangan AI Tutor
Perancangan AI Tutor dilakukan untuk menjelaskan mekanisme kerja komponen ITS yang digunakan pada Mode Belajar. Pada bagian ini dijelaskan bagaimana AI Tutor memproses jawaban siswa, menentukan strategi bimbingan berdasarkan jumlah percobaan (attempt count), menyesuaikan respons menggunakan nilai mastery, serta menyusun prompt sebelum dikirimkan ke LLM. Selain itu, bagian ini juga membahas komponen pendukung seperti Prompt Builder, Rule-Based Strategy Selector, Blind Mode Architecture, Mastery Tracking, dan Personal Plan yang bekerja bersama untuk menghasilkan pengalaman belajar yang adaptif sesuai dengan kemampuan masing-masing siswa.
3.3.1.  Use Case Diagram

Gambar 3. 2 Use Case Diagram
Berdasarkan Gambar 3.2 menjelaskan Use Case Diagram yang menggambarkan fungsionalitas pada sistem Tryout Tes Kemampuan Akademik berbasis Intelligent Tutoring System (ITS). Diagram ini menunjukkan aktor yang berinteraksi dengan sistem beserta fungsi-fungsi yang dapat diakses sesuai dengan hak akses masing-masing.
1.     Aktor Utama (Pengguna Sistem)
Terdapat 2 aktor utama yang berinteraksi dengan sistem. Yakni sebagai berikut : 
a.     Siswa
Siswa dapat melakukan autentikasi, mengatur personal plan, mengerjakan simulasi pada Mode Belajar (didampingi AI Tutor) maupun Mode Ujian (tanpa AI), mengakses halaman analitik personal, serta mengakses halaman riwayat pembelajaran.
b.     Superadmin
Superadmin memiliki kendali penuh terhadap manajemen seluruh mata pelajaran, bank soal global, monitoring aktivitas seluruh pengguna, serta pengelolaan data dan hak akses akun.
 
2.     Relasi include dan extend 
Pada Gambar 3.2, terdapat relasi include dan extend yang menggambarkan hubungan antar use-case.
a.     Relasi include 
         Sebagian besar use case memiliki relasi include terhadap Login. Hal ini menunjukkan bahwa pengguna harus melakukan autentikasi terlebih dahulu sebelum dapat mengakses seluruh fitur yang tersedia pada sistem.
b.     Relasi extend
Use-case Logout memiliki relasi extend terhadap Login, yang menunjukkan bahwa pengguna dapat mengakhiri sesi penggunaan sistem setelah berhasil melakukan login.
3.     Fungsionalitas Berdasarkan Aktor 
a.     Fungsionalitas Siswa
      Setelah berhasil login, siswa dapat mengakses beberapa fitur utama, yaitu:
·      Mengatur target belajar (Onboarding & Target Belajar).
·      Melihat dashboard siswa yang menampilkan ringkasan aktivitas belajar.
·      Memulai Mode Belajar (ITS) yang dilengkapi dengan AI Tutor.
·      Memulai Mode Ujian (Tryout) tanpa bantuan AI.
·      Melihat analitik pembelajaran (Learning Analytics) sebagai evaluasi hasil belajar.
·      Mengubah informasi akun melalui fitur Edit Profil.
Selama proses Mode Belajar, sistem akan memanfaatkan AI Tutor untuk menentukan strategi pembelajaran dan memberikan umpan balik sesuai dengan kondisi belajar siswa.
 
b.     Fungsionalitas SuperAdmin
Setelah berhasil login, SuperAdmin dapat mengakses fitur administrasi sistem, yaitu:
·      Melihat dashboard admin.
·      Mengelola data mata pelajaran dan subbab.
·      Mengelola bank soal beserta media pendukung.
·      Mengimpor soal dari file Excel.
·      Memantau hasil belajar siswa.
·      Mengelola data pengguna beserta hak aksesnya.
3.3.2.  Activity Diagram 
1.     Activity Diagram Siswa, dan SuperAdmin
a.     Login 

Gambar 3. 3 Activity Diagram Login
Gambar 3.3 menjelaskan proses login pengguna ke dalam sistem. Proses dimulai ketika pengguna membuka halaman login, kemudian memasukkan informasi yang diperlukan untuk proses autentikasi. Selanjutnya, sistem akan memverifikasi data yang dimasukkan. Apabila proses autentikasi berhasil, sistem akan mengarahkan pengguna (Siswa dan Superadmin) ke dashboard sesuai dengan dengan role yang dimiliki. Jika autentikasi gagal, sistem akan menampilkan pesan kesalahan dan mengarahkan kembali ke halaman login.
b.     Reset Password

 

Gambar 3. 4 Activity Diagram Reset Password
Gambar 3.4 menggambarkan proses pengguna saat mengatur ulang password yang terlupa. Proses dimulai dari pengguna mengakses halaman login, kemudian menekan button Lupa Sandi, setelah menekan button lupa sandi, sistem akan menampilkan halaman untuk memperbarui password. Kemudian pengguna memasukkan email yang telah terdaftar. Sistem akan memvalidasi email tersebut dan mengirimkan tautan reset password jika email valid. Setelah membuka tautan dari email, pengguna memasukkan password baru, lalu sistem memvalidasi password yang dimasukkan. Jika password memenuhi ketentuan, sistem memperbarui password dan mengarahkan pengguna ke halaman login. Namun, jika password tidak valid, sistem akan menampilkan pesan kesalahan agar pengguna dapat memperbaikinya. 
 
c.     Memperbarui Profile

Gambar 3. 5 Activity Diagram Memperbarui Profile
Gambar 3.5 menggambarkan proses pengguna dalam memperbarui informasi akun. Proses dimulai ketika pengguna memilih menu Profil Akun, kemudian sistem menampilkan halaman profil. Selanjutnya, pengguna mengubah data yang diperlukan dan menekan tombol Simpan Perubahan. Sistem kemudian menyimpan data yang telah diperbarui ke dalam database sehingga informasi profil pengguna berhasil diperbarui.
 
 
 
 
 
 
 
2.     Activity Diagram Siswa
a. Personal Plan 

Gambar 3. 6 Activity Diagram Personal Plan
Gambar 3.6 menunjukkan alur yang dilalui siswa saat pertama kali menggunakan aplikasi. Setelah berhasil login, sistem akan memeriksa apakah pengguna merupakan siswa baru atau pengguna lama. Jika pengguna merupakan siswa baru, sistem akan mengarahkan siswa untuk mengisi personal plan terlebih dahulu. Setelah data disimpan ke dalam database, sistem akan menampilkan halaman dashboard siswa. Sementara itu, jika pengguna merupakan pengguna lama, sistem akan langsung mengarahkan ke halaman dashboard tanpa perlu mengisi personal plan kembali.
b. Mode Belajar (ITS)

Gambar 3. 7 Activity Diagram Mode Belajar
Gambar 3.7 menunjukkan alur pembelajaran pada fitur Mode Belajar yang memanfaatkan AI sebagai tutor pribadi. Proses dimulai ketika siswa memilih materi yang ingin dipelajari, kemudian sistem membuat sesi pembelajaran dan menyajikan soal dalam tiga tahap, yaitu Pre-Test, Main-Test, dan Post-Test. Tahap Pre-Test digunakan untuk mengetahui pemahaman awal siswa sebelum memasuki Main-Test. Selama mengerjakan soal, sistem akan mengevaluasi jawaban siswa dan memperbarui Student Model. Jika jawaban benar, sistem akan memberikan umpan balik positif. Namun, jika jawaban salah, sistem akan memeriksa jumlah percobaan yang telah dilakukan. Selama kesempatan menjawab masih tersedia (kurang dari dua kali), AI Tutor akan menganalisis kesalahan siswa dan memberikan petunjuk (hint) agar siswa dapat mencoba kembali. Jika kesempatan menjawab telah habis, sistem akan melanjutkan ke soal berikutnya. Setelah seluruh soal pada Main-Test selesai dikerjakan, sistem menampilkan Post-Test untuk mengukur kembali pemahaman siswa. Di akhir pembelajaran, sistem menghitung skor, memperbarui Student Mastery, dan menampilkan ringkasan hasil belajar kepada siswa.
c. Mode Ujian

Gambar 3. 8 Activity Diagram Mode Ujian
Gambar 3.8 menjelaskan proses pelaksanaan Mode Ujian dalam sistem. Mode ini dirancang untuk simulasi ujian tanpa ada bantuan AI Tutor selama proses pengerjaan. Dimulai dari siswa memilih paket soal berdasarkan mata pelajaran yang telah tersedia, kemudian sistem akan menyiapkan sesi dan menyajikan soal yang telah dilengkapi oleh timer atau batas waktu. Setelah siswa menjawab seluruh soal dan menyimpan jawaban, sistem akan mengevaluasi seluruh jawaban siswa dan akan menampilkan nilai akhir ujian kepada siswa. 
d.     Melihat Analitik Siswa

Gambar 3. 9 Activity Diagram Analitik Siswa
Gambar 3.9 menggambarkan proses sistem ketika menampilkan data analitik berdasarkan hasil pembelajaran siswa. Diawali dengan siswa membuka menu analitik, kemudian sistem akan mengambil data pembelajaran siswa secara keseluruhan, kemudian sistem mengolah menjadi informasi yang mudah dipahami oleh siswa untuk memantau perkembangan proses pembelajarannya.
e.     Melihat Riwayat Pembelajaran

Gambar 3. 10 Activity Diagram Riwayat Pembelajaran
            Gambar 3.10 menggambarkan proses siswa dalam melihat riwayat pembelajaran yang pernah diikuti. Diawali dengan siswa membuka menu riwayat pembelajaran, sistem akan mengambil dan menampilkan riwayat aktivitas secara lengkap. Kemudian siswa memilih salah satu riwayat, yakni riwayat dari mode belajar atau mode ujian. Ketika siswa telah memilih salah satu riwayat, dan menekan tombol pembahasan, sistem akan memuat data dan menyajikan detail pembahasan kepada siswa.
3. Activity Diagram Superadmin
a.     Menambah Mata Pelajaran

Gambar 3. 11 Activity Diagram Tambah Mata Pelajaran
Gambar 3.11 menjelaskan proses Superadmin dalam menambahkan data baru mata pelajaran ke dalam sistem. Dimulai dari Superadmin memilih menu mata pelajaran, kemudian mengisi formulir yang telah disediakan, lalu menekan tombol Simpan. Selanjutnya, sistem akan memvalidasi isian data tersebut, apabila data valid, sistem akan menyimpan data ke dalam database dan menampilkan pesan sukses, namun apabila tidak valid, sistem akan menampilkan pesan error dan meminta pengguna memperbaiki isian formulir.
b.     Melihat Data Mata Pelajaran

Gambar 3. 12 Activity Diagram Melihat Data Mata Pelajaran
Gambar 3.12 menggambarkan proses superadmin dalam mengakses data mata pelajaran yang tersedia dalam sistem. Diawali dengan superadmin membuka menu mata pelajaran, sistem akan mengambil data dari database dan menampilkan halaman mata pelajaran.
 
 
 
 
 
c.     Mengedit Mata Pelajaran 

Gambar 3. 13 Activity Diagram Mengedit Mata Pelajaran
Gambar 3.13 menggambarkan proses Superadmin ketika memperbarui data mata pelajaran yang telah tersimpan di dalam database. Dimulai dari Superadmin menekan tombol edit pada salah satu data mata pelajaran, kemudian melakukan perubahan data pada formulir yang telah ditampilkan oleh sistem, setelah melakukan perubahan dan menekan tombol perbarui, selanjutnya sistem akan memvalidasi data. Apabila data yang telah diperbarui memenuhi aturan validasi, sistem akan menyimpan perubahan ke dalam database dan menampilkan pesan bahwa data berhasil diperbarui. Namun, apabila data tidak memenuhi aturan validasi, sistem akan menampilkan pesan eror dan meminta superadmin memperbaiki data yang sebelumnya akan diperbarui.  
d.     Menghapus Mata Pelajaran 

Gambar 3. 14 Activity Diagram Menghapus Mata Pelajaran
Gambar 3.14 menggambarkan proses superadmin ketika menghapus data yang tersimpan pada sistem. Superadmin memilih data mata pelajaran yang akan dihapus dan melakukan konfirmasi penghapusan, kemudian sistem akan menghapus data dari database dan menampilkan pesan informasi bahwa data berhasil dihapus. 
e.     Menambah Data Pengguna
 

Gambar 3. 15 Activity Diagram Menambah Data Pengguna
Gambar 3.15 menggambarkan alur Superadmin dalam menambahkan data pengguna baru. Proses dimulai dengan mengakses menu manajemen pengguna, menekan tombol tambah, dan mengisi formulir pendaftaran. Setelah mengisi data pengguna baru, SuperAdmin menekan tombol simpan, sistem melakukan validasi. Jika data valid, sistem menyimpannya ke database, menampilkan pesan sukses, serta memperbarui halaman. Namun, apabila data tidak valid, sistem menampilkan pesan error agar Superadmin memperbaiki isian formulir.
f.      Melihat Data Pengguna
         

Gambar 3. 16 Activity Diagram Melihat Data Pengguna
Gambar 3.16 menggambarkan proses Superadmin dalam mengakses data pengguna yang tersedia dalam sistem. Setelah Superadmin membuka menu manajemen pengguna, sistem akan mengambil data dari database dan menampilkan keseluruhan data pengguna pada halaman manajemen pengguna.
 
 
 
 
 
g.     Memperbarui Data Pengguna

Gambar 3. 17 Activity Diagram Memperbarui Data Pengguna
Gambar 3.17 menggambarkan proses Superadmin ketika memperbarui data pengguna yang telah tersimpan di dalam database. Dimulai dari Superadmin menekan tombol edit pada salah satu data pengguna, sistem akan menampilkan formulir edit data. Superadmin kemudian dapat melakukan perubahan data. Setelah Superadmin menekan tombol perbarui data, sistem akan melakukan validasi. Apabila data yang diperbarui sudah sesuai (valid), sistem akan memperbarui data ke dalam database, menampilkan pesan "Data berhasil diperbarui", dan memuat ulang halaman manajemen pengguna. Sebaliknya, apabila data tidak valid, sistem akan menampilkan pesan error agar Superadmin memperbaiki data pada formulir tersebut.
h.     Menghapus Data Pengguna

Gambar 3. 18 Activity Diagram Menghapus Data Pengguna
Gambar 3.18 menggambarkan proses Superadmin ketika menghapus data pengguna yang tersimpan pada sistem. Proses dimulai saat Superadmin menekan tombol hapus pada salah satu data pengguna. Sebagai langkah pencegahan, sistem akan memunculkan kotak dialog konfirmasi penghapusan. Pada tahap ini, apabila Superadmin membatalkan tindakan (memilih "Tidak"), sistem hanya akan menutup dialog tersebut tanpa mengubah data apapun. Namun, apabila Superadmin memberikan konfirmasi (memilih "Ya"), sistem akan menghapus data tersebut dari database, menampilkan pesan informasi bahwa data berhasil dihapus, dan memuat ulang halaman manajemen pengguna dengan susunan data yang telah diperbarui.
i.      Menambah Data Materi

Gambar 3. 19 Activity Diagram Menambah Data Materi
Gambar 3.19 menggambarkan proses Superadmin dalam menambahkan data baru materi ke dalam sistem. Dimulai dari Superadmin memilih menu materi, kemudian mengisi formulir yang telah disediakan, lalu menekan tombol Simpan. Selanjutnya, sistem akan memvalidasi isian data tersebut, apabila data valid, sistem akan menyimpan data ke dalam database dan menampilkan pesan sukses, namun apabila tidak valid, sistem akan menampilkan pesan error dan meminta pengguna memperbaiki isian formulir
j.      Melihat Data Materi 

Gambar 3. 20 Activity Diagram Melihat Data Materi
Gambar 3.20 menggambarkan proses Superadmin dalam mengakses data materi yang tersedia dalam sistem. Diawali Superadmin membuka menu materi, kemudian sistem akan mengambil data dari database dan menampilkan pada dashboard materi. 
k.     Mengedit Data Materi

Gambar 3. 21 Activity Diagram Memperbarui Data Materi
Gambar 3.21 menggambarkan proses Superadmin ketika memperbarui data materi yang telah tersimpan di dalam database. Diawali dari Superadmin menekan tombol edit pada salah satu data materi, kemudian melakukan perubahan data pada formulir yang telah ditampilkan oleh sistem, setelah melakukan perubahan dan menekan tombol perbarui, selanjutnya sistem akan memvalidasi data. Apabila data yang telah diperbarui memenuhi aturan validasi, sistem akan menyimpan perubahan ke dalam database dan menampilkan pesan bahwa data berhasil diperbarui, namun, apabila data tidak memenuhi aturan validasi, sistem akan menampilkan pesan eror dan meminta superadmin memperbaiki data yang sebelumnya akan diperbarui.  
l.      Menghapus Data Materi

Gambar 3. 22 Activity Diagram Menghapus Data Materi
Gambar 3.22 menggambarkan proses Superadmin ketika menghapus data materi yang tersimpan pada sistem. Superadmin memilih data materi yang akan dihapus dan melakukan konfirmasi penghapusan, kemudian sistem akan menghapus data dari database dan menampilkan pesan informasi bahwa data berhasil dihapus. 
 
 
m.   Menambah Soal Manual

Gambar 3. 23 Activity Diagram Menambah Data Soal Manual
Gambar 3.23 menggambarkan proses Superadmin dalam menambahkan data baru bank soal ke dalam sistem secara manual. Dimulai dari Superadmin memilih menu bank soal, memilih opsi tambah soal manual, dan mengisi formulir yang telah disediakan. Pada tahap ini, pengguna dapat mengulang pengisian formulir untuk menambahkan beberapa soal sekaligus. Setelah selesai, pengguna menekan tombol "simpan semua soal". Selanjutnya, sistem akan memvalidasi isian data tersebut. Apabila data valid, sistem akan menyimpan data ke dalam database, menampilkan pesan sukses, dan memuat ulang halaman dengan data terbaru. Namun, apabila tidak valid, sistem akan menampilkan pesan error dan mengarahkan pengguna kembali untuk memperbaiki isian formulir.
n.     Menambah Soal melalui Import Excel

Gambar 3. 24 Activity Diagram Menambah Soal melalui Import Excel
Gambar 3.24 menggambarkan proses Superadmin dalam menambahkan data baru bank soal ke dalam sistem melalui import file (Excel). Dimulai dari Superadmin memilih menu bank soal, memilih opsi upload Excel, dan mengunggah file data soal ke dalam formulir yang ada. Setelah pengguna menekan tombol "Ekstrak dan Preview Soal", sistem akan membaca file tersebut. Apabila format gagal dibaca, sistem akan memunculkan pesan error. Namun, jika berhasil, sistem akan menampilkan halaman preview agar Superadmin dapat mereviu daftar soal terlebih dahulu. Setelah dipastikan benar dan pengguna menekan tombol simpan, sistem akan menyimpan data tersebut ke database, menampilkan pesan sukses, dan memperbarui halaman daftar bank soal.
o.     Melihat Data Bank Soal

Gambar 3. 25 Activity Diagram Melihat Data Soal
Gambar 3.25 menggambarkan proses Superadmin dalam mengakses data bank soal yang tersedia dalam sistem. Setelah Superadmin membuka menu bank soal, sistem akan mengambil data dari database dan menampilkan halaman bank soal.
p.     Mengedit Bank Soal 

Gambar 3. 26 Activity Diagram Mengedit Bank Soal
Gambar 3.26 menggambarkan proses Superadmin ketika memperbarui data bank soal yang telah tersimpan di dalam database. Dimulai dari Superadmin menekan tombol edit pada salah satu data bank soal, kemudian melakukan perubahan data pada formulir yang telah ditampilkan oleh sistem, setelah melakukan perubahan dan menekan tombol perbarui, selanjutnya sistem akan memvalidasi data. Apabila data yang telah diperbarui memenuhi aturan validasi, sistem akan menyimpan perubahan ke dalam database dan menampilkan pesan bahwa data berhasil diperbarui, namun, apabila data tidak memenuhi aturan validasi, sistem akan menampilkan pesan eror dan meminta superadmin memperbaiki data yang sebelumnya akan diperbarui. 
 
 
 
q.     Menghapus Data Bank Soal 

Gambar 3. 27 Activity Diagram Menghapus Bank Soal
Gambar 3.27 menggambarkan proses Superadmin ketika menghapus data yang tersimpan pada sistem. Superadmin memilih data bank soal yang akan dihapus dan melakukan konfirmasi penghapusan, kemudian sistem akan menghapus data dari database dan menampilkan pesan informasi bahwa data berhasil dihapus.
 
 
 
r.      Melihat Aktivitas Siswa 

Gambar 3. 28 Activity Diagram Monitoring Aktivitas Siswa
Gambar 3.28 menggambarkan proses Superadmin dalam mengakses data aktivitas siswa yang tersedia dalam sistem. Setelah Superadmin membuka menu aktivitas siswa, sistem akan merespons dengan menampilkan daftar seluruh siswa beserta seluruh riwayat ujiannya. Setelah daftar tersebut tampil, Superadmin dapat menekan tombol Detail pada salah satu riwayat aktivitas siswa, dan sistem akan merespons dengan menampilkan halaman Detail Aktivitas Siswa secara lengkap.
3.3.3.  Database Entity Relationship Diagram

Gambar 3. 29 Entity Relationship Diagram
Berdasarkan Gambar 3.29 yang menggambarkan struktur basis data sistem beserta hubungan antar entitasnya. Relasi tersebut mencakup data pengguna, kelas, bank soal, proses pengerjaan Tryout, serta penyimpanan hasil dan perkembangan mastery learning siswa. Rancangan basis data ini menjadi dasar penyimpanan dan pengelolaan data agar seluruh fitur sistem dapat saling terintegrasi dengan baik.
3.3.4.  Arsitektur Sistem

Gambar 3. 30 Arsitektur Sistem
Berdasarkan Gambar 3.30 Arsitektur Sistem menggambarkan alur komunikasi antar komponen utama pada aplikasi Tryout berbasis ITS. Pengguna terdiri dari siswa, dan SuperAdmin membuka aplikasi melalui browser. Seluruh permintaan pengguna dikirim browser ke Laravel, kemudian Laravel mengembalikan hasil kepada pengguna. Laravel berkomunikasi dengan PostgreSQL untuk menyimpan dan mengambil data yang tersimpan. Kemudian Laravel mengirimkan Prompt ke Groq API untuk menjalankan fitur AI Tutor. Apabila layanan Groq API mengalami gangguan atau telah mencapai batas penggunaan (rate limit), permintaan akan dialihkan secara otomatis ke OpenRouter API sebagai layanan cadangan (fallback). Laravel juga terhubung dengan Google Oauth 2.0 untuk mendukung proses autentikasi menggunakan akun Google (Google Sign-In).
Sistem dikembangkan dengan arsitektur berbasis web yang mengintegrasikan aplikasi utama dengan LLM. Seluruh permintaan yang berkaitan dengan AI Tutor akan diproses melalui Prompt Builder, kemudian dikirimkan ke layanan Groq API. Apabila layanan utama tidak dapat digunakan, sistem secara otomatis mengalihkan permintaan ke OpenRouter API sebagai layanan cadangan sehingga proses pembelajaran tetap dapat berlangsung.
3.3.5.  Perancangan AI Tutor
1.     Arsitektur AI Tutor
AI Tutor dirancang sebagai komponen utama dalam Intelligent Tutoring System (ITS) yang bertugas memberikan bimbingan kepada siswa selama proses pembelajaran. Ketika siswa mengirimkan jawaban, sistem terlebih dahulu mengumpulkan informasi yang dibutuhkan, seperti soal, jawaban siswa, jumlah percobaan (attempt count), serta nilai mastery terakhir yang tersimpan pada sistem. Selanjutnya jumlah percobaan yang digunakan oleh Rule-Based Strategy Selector untuk menentukan strategi bimbingan yang akan diberikan, sementara itu, nilai mastery digunakan oleh Prompt Builder untuk menyesuaikan gaya bahasa AI sesuai dengan tingkat penguasaan materi siswa. Setelah itu, prompt dikirimkan ke LLM melalui Groq API. Apabila layanan Groq API tidak dapat digunakan, sistem secara otomatis mengalihkan permintaan ke OpenRouter API sebagai layanan cadangan sehingga proses pembelajaran tetap dapat berlangsung. Respons yang dihasilkan oleh LLM selanjutnya ditampilkan kepada siswa dalam bentuk AI Hint, AI Feedback, atau AI Study Report sesuai dengan kebutuhan pembelajaran.

Gambar 3. 31 Arsitektur AI
Berdasarkan arsitektur pada Gambar 3.31 proses dimulai ketika siswa mengirimkan jawaban, kemudian sistem akan mengumpulkan seluruh konteks pembelajaran yang diperlukan, seperti soal, jawaban siswa, jumlah percobaan, dan tingkat penguasaan materi. Seluruh informasi tersebut diproses sesuai dengan fungsinya masing-masing. Attempt count digunakan oleh Rule-Based Strategy Selector untuk menentukan strategi bimbingan, sedangkan nilai mastery digunakan oleh Prompt Builder untuk menyesuaikan gaya bahasa AI sebelum prompt dikirimkan ke LLM.
2.     Prompt Builder
Prompt Builder merupakan komponen yang bertugas menyusun instruksi (prompt) berdasarkan kondisi pembelajaran siswa. Informasi yang dimasukkan ke dalam prompt meliputi soal, jawaban siswa, jumlah percobaan, tingkat penguasaan materi, serta strategi bimbingan yang telah dipilih oleh sistem. Prompt kemudian dikirimkan ke LLM agar menghasilkan respons yang sesuai dengan kondisi siswa. Untuk mendukung proses pembelajaran yang berpusat pada siswa, Prompt Builder menerapkan mekanisme Blind Mode Architecture. Pada mekanisme ini, kunci jawaban dan seluruh pilihan jawaban tidak dikirimkan ke LLM sehingga model tidak dapat memberikan jawaban akhir secara langsung. Sebaliknya, model hanya menerima konteks soal dan informasi yang diperlukan untuk menghasilkan petunjuk atau penjelasan sesuai dengan strategi pembelajaran yang telah dipilih.
3.     Adaptive AI Prompting
AI Tutor menerapkan mekanisme Adaptive AI Prompting untuk menghasilkan respons yang sesuai dengan kondisi belajar siswa. Adaptasi dilakukan melalui dua aspek. Pertama, jumlah percobaan (attempt count) digunakan untuk menentukan strategi bimbingan berupa Socratic Hint atau Step-by-Step Guidance. Kedua, nilai mastery digunakan untuk menyesuaikan gaya bahasa AI sehingga penjelasan yang diberikan sesuai dengan tingkat penguasaan materi siswa. Dengan pendekatan ini, AI Tutor tidak hanya memberikan bantuan berdasarkan kesalahan yang dilakukan siswa, tetapi juga mempertimbangkan kemampuan belajar yang telah dicapai pada sesi-sesi sebelumnya.
4.     Rule-Based Strategy Selector 
Rule-Based Strategy Selector merupakan salah satu komponen pada AI Tutor yang berfungsi menentukan strategi bimbingan sebelum permintaan dikirimkan ke LLM. Komponen ini menerapkan pendekatan Rule-Based System dengan menggunakan jumlah percobaan sebagai dasar pengambilan keputusan. Berdasarkan jumlah percobaan tersebut, sistem menentukan apakah siswa akan memperoleh Socratic Hint atau Step-by-Step Guidance. Setelah strategi ditentukan, Prompt Builder menggunakan nilai mastery sebagai konteks untuk menyesuaikan gaya bahasa AI sehingga respons yang diberikan lebih sesuai dengan tingkat penguasaan materi siswa.
Selain strategi bimbingan yang ditentukan berdasarkan jumlah percobaan, AI Tutor juga memanfaatkan tingkat penguasaan materi sebagai konteks pembelajaran. Nilai mastery tersebut digunakan oleh Prompt Builder untuk menyesuaikan gaya bahasa AI sehingga respons yang dihasilkan sesuai dengan kemampuan siswa. Pada penelitian ini, tingkat penguasaan materi dikelompokkan kedalam tiga kategori, yaitu Ahli, Menengah, dan Pemula. Pengelompokkan tersebut digunakan sebagai dasar untuk menyesuaikan tingkat bantuan yang diberikan oleh AI Tutor, sehingga bimbingan yang dihasilkan sesuai dengan kemampuan belajar masing-masing siswa.
Tabel 3. 3 Klasifikasi Tingkat Mastery
Persentase Penguasaan %
Kategori
Keterangan
≥ 85%
Ahli
Siswa telah menguasai materi dengan sangat baik.
60% - 84%
Menengah
Siswa memiliki pemahaman yang cukup dan masih memerlukan penguatan.
< 60%
Pemula
Siswa memerlukan pembelajaran ulang pada materi tersebut.
 
Berdasarkan Tabel 3.3, tingkat mastery siswa dikelompokkan ke dalam tiga kategori, yaitu Ahli, Menengah, dan Pemula. Selanjutnya, sistem menerapkan dua aturan (Decision Rule) yang saling melengkapi. Aturan pertama menentukan strategi bimbingan berdasarkan jumlah percobaan siswa, sedangkan aturan kedua memanfaatkan nilai mastery sebagai konteks dalam penyusunan prompt agar respons AI sesuai dengan tingkat penguasaan materi siswa. Kedua aturan tersebut bekerja secara berurutan sehingga AI Tutor dapat memberikan bantuan yang sesuai dengan kondisi belajar siswa. Sebagaimana ditunjukkan pada Tabel 3.4. 
Tabel 3. 4 Aturan Pemilihan Strategi Bimbingan AI Tutor
Jumlah Percobaan (Attempt Count)
Strategi Bimbingan
Salah 1x
Socratic Hint
Salah 2x
Step-by-Step Guidance
 
Berdasarkan Tabel 3.4, sistem menentukan strategi bimbingan berdasarkan jumlah percobaan yang dilakukan siswa. Apabila siswa melakukan kesalahan pada percobaan pertama, AI Tutor memberikan Socratic Hint sebagai petunjuk awal tanpa langsung memberikan jawaban. Jika siswa masih belum berhasil menjawab dengan benar setelah dua kali percobaan atau lebih, sistem mengubah strategi menjadi Step-by-Step Guidance sehingga siswa memperoleh panduan penyelesaian secara bertahap. Pergantian strategi ini merupakan penerapan Instructional Scaffolding, yaitu pemberian bantuan yang disesuaikan dengan kondisi belajar siswa.
Setelah strategi bimbingan ditentukan oleh Rule-Based Strategy Selector, Prompt Builder menyesuaikan gaya bahasa AI berdasarkan nilai mastery siswa. Penyesuaian tersebut dilakukan agar penyampaian materi sesuai dengan tingkat penguasaan yang dimiliki siswa.
Tabel 3. 5 Penyesuaian Gaya Bahasa AI Berdasarkan Mastery
Mastery
Gaya Bahasa
≥ 80%
Akademis dan ringkas
50% - 79%
Standar dan terstruktur
< 50%
Sederhana, ramah, dan suportif
 
Berdasarkan Tabel 3.5 Semakin tinggi nilai mastery, semakin ringkas dan akademis bahasa yang digunakan AI. Sebaliknya, apabila nilai mastery masih rendah, AI menggunakan bahasa yang lebih sederhana, ramah, dan suportif agar penjelasan lebih mudah dipahami.
Berdasarkan kedua tabel diatas, batas kategori mastery pada Tabel 3.3 digunakan untuk mengelompokkan tingkat penguasaan materi siswa, sedangkan batas nilai pada Tabel 3.5 digunakan sebagai aturan prompt builder dalam menyesuaikan gaya bahasa AI. Oleh karena itu, kedua batas nilai tersebut memiliki fungsi yang berbeda.

Gambar 3. 32 Flow AI
Berdasarkan Gambar 3.32 menunjukkan alur kerja AI Tutor dalam memberikan bimbingan kepada siswa pada Mode Belajar (Main-Test). Proses dimulai ketika siswa mengirimkan jawaban ke sistem. Selanjutnya sistem melakukan evaluasi terhadap jawaban tersebut untuk menentukan apakah jawaban sudah benar atau masih memerlukan bimbingan. Apabila jawaban benar, sistem memberikan AI Feedback, memperbarui data pembelajaran siswa, kemudian melanjutkan ke soal berikutnya.
Sebaliknya, apabila jawaban siswa belum tepat, sistem mengevaluasi jumlah percobaan. Berdasarkan informasi tersebut, Rule-Based Strategy Selector menentukan strategi bimbingan yang akan diberikan, yaitu Socratic Hint atau Step-by-Step Guidance. Setelah strategi ditentukan, sistem mengambil nilai mastery terakhir siswa sebagai konteks pembelajaran. Selanjutnya Prompt Builder menyusun prompt berdasarkan soal, jawaban siswa, strategi bimbingan, dan nilai mastery sebelum permintaan dikirimkan ke LLM.
5.     Blind Mode Architecture
Blind Mode Architecture diterapkan untuk mencegah AI memberikan jawaban akhir secara langsung kepada siswa selama proses pembelajaran. Pada mekanisme ini, Prompt Builder mengirimkan konteks pembelajaran yang meliputi soal, jawaban siswa, jumlah percobaan, tingkat penguasaan materi, serta strategi bimbingan yang telah dipilih oleh sistem. Sementara itu, kunci jawaban dan seluruh pilihan jawaban tidak disertakan dalam prompt yang dikirimkan ke LLM.
Melalui mekanisme tersebut, AI hanya dapat memberikan petunjuk, arahan, maupun penjelasan sesuai konteks soal tanpa mengetahui jawaban yang benar. Pendekatan ini diterapkan agar AI Tutor tetap berperan sebagai pendamping belajar yang membantu siswa menemukan solusi secara mandiri, sehingga proses pembelajaran tetap sesuai dengan prinsip Instructional Scaffolding.
6.     Integrasi Groq API dan OpenRouter API
Setelah prompt berhasil disusun, sistem mengirimkan permintaan ke LLM melalui Groq API sebagai layanan utama. Groq API dipilih karena memiliki waktu respons yang cepat sehingga dapat memberikan umpan balik kepada siswa secara real-time selama proses pembelajaran.
Untuk menjaga ketersediaan layanan AI, sistem juga mengintegrasikan OpenRouter API sebagai layanan cadangan (fallback). Apabila Groq API mengalami gangguan, timeout, atau pembatasan penggunaan (rate limiting), sistem secara otomatis mengalihkan permintaan ke OpenRouter API tanpa memerlukan tindakan dari pengguna. Dengan mekanisme tersebut, AI Tutor tetap dapat memberikan layanan secara konsisten meskipun salah satu penyedia layanan mengalami kendala.
7.     AI Hint, AI Feedback, dan AI Study Report
AI Tutor menghasilkan tiga jenis keluaran yang digunakan untuk mendukung proses pembelajaran, yaitu AI Hint, AI Feedback, dan AI Study Report. AI Hint diberikan ketika siswa masih mengalami kesulitan dalam menjawab soal pada Mode Belajar. Bentuk bantuan yang diberikan disesuaikan dengan strategi yang telah dipilih oleh Rule-Based Strategy Selector, yaitu berupa Socratic Hint atau Step-by-Step Guidance.
AI Feedback diberikan setelah siswa menyelesaikan suatu soal. Umpan balik ini berisi penjelasan mengenai jawaban siswa, konsep yang digunakan, serta alasan mengapa jawaban tersebut benar atau kurang tepat sehingga siswa dapat memahami letak kesalahannya. Setelah seluruh sesi pembelajaran selesai, sistem menghasilkan AI Study Report yang berisi ringkasan hasil belajar siswa, tingkat penguasaan materi, serta rekomendasi materi yang perlu dipelajari kembali berdasarkan hasil Mastery Tracking. Laporan ini bertujuan membantu siswa mengetahui perkembangan belajarnya dan menentukan fokus pembelajaran berikutnya.
8.     Mastery Tracking 
Mastery Tracking merupakan komponen pada AI Tutor yang berfungsi memantau tingkat penguasaan materi (mastery level) setiap siswa selama proses pembelajaran. Nilai mastery diperbarui setiap kali siswa menyelesaikan sesi pembelajaran, pembaruan dilakukan setelah seluruh rangkaian sesi belajar selesai sehingga nilai mastery yang digunakan pada sesi berikutnya merupakan hasil akumulasi pembelajaran sebelumnya. sehingga sistem dapat mengetahui perkembangan pemahaman siswa terhadap materi yang dipelajari. 
Pada penelitian ini, nilai mastery dihitung berdasarkan akumulasi hasil pengerjaan siswa pada Mode Belajar. Perhitungan dilakukan dengan membandingkan jumlah jawaban benar terhadap jumlah keseluruhan soal yang telah dikerjakan siswa sehingga nilai mastery dapat menggambarkan tingkat penguasaan materi secara keseluruhan. Perhitungan nilai mastery ditunjukkan pada Persamaan berikut.

Keterangan :  
·      Total Jawaban Benar = jumlah seluruh jawaban benar yang diperoleh siswa pada mode belajar.
·      Total Soal = jumlah seluruh soal yang telah dikerjakan siswa pada Mode Belajar.
Sebagai contoh, apabila siswa telah mengerjakan 20 soal pada Mode Belajar dan berhasil menjawab 16 soal dengan benar, maka nilai penguasaan materi (mastery) dihitung menggunakan persamaan sebagai berikut.

Berdasarkan hasil perhitungan tersebut, siswa memperoleh nilai mastery sebesar 80%. Melihat pada kategori tingkat penguasaan yang telah ditetapkan pada Tabel 3.3, nilai tersebut masuk dalam kategori Menengah. Nilai mastery kemudian disimpan sebagai riwayat penguasaan materi siswa, dan digunakan sebagai konteks pembelajaran pada sesi berikutnya. Selain itu, nilai tersebut dimanfaatkan dalam penyusunan AI Study Report serta sebagai dasar rekomendasi materi yang diprioritaskan pada fitur Personal Plan.
 
9.     Personal Plan
Personal Plan merupakan fitur yang memberikan rekomendasi materi belajar berdasarkan hasil Mastery Tracking. Tujuan dari fitur ini adalah membantu siswa memfokuskan proses belajar pada materi yang masih memerlukan penguatan sehingga pembelajaran menjadi lebih terarah dan sesuai dengan kebutuhan masing-masing siswa.
Untuk menentukan urutan prioritas materi, sistem menghitung Priority Score berdasarkan nilai mastery pada tingkat mata pelajaran dan subbab. Semakin rendah nilai mastery, semakin tinggi nilai Priority Score, sehingga materi tersebut akan direkomendasikan lebih dahulu.
10.  Algoritma Personal Plan
Personal Plan merupakan mekanisme yang digunakan untuk menentukan prioritas materi yang perlu dipelajari oleh siswa berdasarkan hasil analisis performa belajar. Prioritas dihitung menggunakan nilai penguasaan mata pelajaran dan tingkat penguasaan subbab. Semakin rendah tingkat penguasaan yang dimiliki siswa, maka semakin tinggi prioritas materi tersebut untuk dipelajari kembali.
PriorityScore = (100 − Nmapel ) + (100−Msubbab )
Keterangan :
-       PriorityScore   : nilai prioritas belajar
-       Nmapel           : nilai penguasaan mata pelajaran
-       Msubbab         : nilai penguasaan subbab
Nilai PriorityScore digunakan untuk mengurutkan materi yang akan ditampilkan pada fitur Personal Plan. Materi dengan nilai PriorityScore terbesar ditempatkan pada urutan teratas karena dianggap paling membutuhkan penguatan.
3.4        Alat dan Bahan Tugas akhir
Alat yang digunakan dalam proses pengembangan aplikasi TryOut ini dapat dilihat di tabel sebagai berikut:
3.4.1    Perangkat Keras (Hardware)
Alat
Spesifikasi minimum
Spesifikasi yang digunakan
Laptop
-       OS : Windows 10 (64-bit)
-       Processor :  Intel Core i3 2.0 Ghz
-       RAM : 4GB
-       Penyimpanan Internal minimal 256GB
-       Jenis Laptop : ASUS TUF Gaming F15
-       OS : Windows 11 ( 64-bit)
-       Processor : Intel Core i5- 10300H @2.50GHz 
-       RAM : 16GB
-       Penyimpanan Internal SSD : 512GB
3.4.2    Perangkat Lunak (Software)
-       Visual Studio Code
-       PostgreSQL
3.4.3    Layanan Kecerdasan Buatan (AI) 
Layanan Kecerdasan Buatan (AI) yang digunakan dalam tugas akhir ini terdiri dari dua layanan utama. Layanan pertama adalah Groq API dengan model llama-3.3-70b-versatile yang berfungsi sebagai engine AI utama untuk menghasilkan hint, feedback, dan study report bagi siswa secara real-time. Layanan kedua adalah OpenRouter API yang digunakan sebagai layanan cadangan (fallback) ketika Groq API mengalami gangguan atau pembatasan penggunaan. Kedua layanan tersebut digunakan selama sistem beroperasi, sehingga penggunaan kuota layanan akan terus berkurang seiring dengan intensitas penggunaan sistem Dataset.
3.4.4    Dataset pihak ketiga
Dataset dari pihak lain yang digunakan dalam tugas akhir ini berupa kumpulan soal latihan, seperti soal TKA dari tahun sebelumnya yang diperoleh dari buku dan sumber publik lainnya. Dataset ini digunakan sebagai referensi utama dalam penyusunan soal pada sistem, sehingga materi yang disajikan sesuai dengan standar soal yang umum digunakan.
3.4.5    Dataset pihak pertama
Selain menggunakan dataset dari pihak lain, penulis menyusun dataset mandiri untuk melengkapi kebutuhan sistem. Dataset ini berupa kumpulan soal yang diketik dan diolah ke dalam format Excel (.xlsx) agar dapat terbaca dan diproses otomatis oleh sistem. Dataset yang telah disusun dipakai sebagai bank soal utama dalam sistem.
 
