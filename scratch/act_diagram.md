### 3.3.2 Activity Diagram

Dokumen ini menjelaskan alur cerita bagaimana setiap pihak berinteraksi di dalam platform Lexica UTBK sehari-hari. Alur menggambarkan apa yang dilakukan oleh Siswa, bagaimana Sistem merespons, dan kapan AI Tutor ikut membantu siswa. Apabila terdapat percabangan alur, pilihan dijabarkan menggunakan format Opsi dan Konektor. Seluruh 55 alur diagram, terdiri atas 19 alur untuk Siswa dan 35 alur untuk Admin, dijabarkan sebagai berikut.

**1. Activity Diagram Siswa dan Admin**

**a. Login**
Gambar 3.3 Activity Diagram Login
Gambar 3.3 menjelaskan proses login pengguna ke dalam sistem. Proses dimulai ketika pengguna membuka halaman login, kemudian memasukkan informasi yang diperlukan untuk proses autentikasi (email dan kata sandi). Selanjutnya, sistem akan memverifikasi data yang dimasukkan. Apabila proses autentikasi berhasil, sistem akan mengarahkan pengguna (Siswa maupun Admin) ke dashboard sesuai dengan role yang dimiliki. Jika autentikasi gagal, sistem akan menampilkan pesan kesalahan dan mengarahkan kembali ke halaman login.

**b. Register**
Gambar 3.4 Activity Diagram Register
Gambar 3.4 menjelaskan proses pendaftaran (register) pengguna baru. Proses dimulai ketika pengguna membuka halaman register dan memasukkan data identitas yang diperlukan. Sistem akan memverifikasi validitas data tersebut. Jika data valid dan email belum terdaftar, sistem akan membuatkan akun baru dan mengarahkan pengguna ke halaman login. Jika tidak valid, sistem akan menampilkan pesan peringatan.

---

**2. Activity Diagram Siswa**

**a. Lihat Learning Overview (Dashboard Siswa)**
Gambar 3.5 Activity Diagram Lihat Learning Overview
Gambar 3.5 menjelaskan proses saat siswa melihat ringkasan pembelajaran di halaman utama. Proses dimulai setelah siswa berhasil login dan diarahkan ke Dashboard. Sistem menyajikan ringkasan data, seperti nilai tryout sejauh ini dan progres belajar. Siswa kemudian dapat meninjau dan membaca ringkasan belajarnya tersebut untuk merencanakan sesi belajarnya.

**b. Memilih Materi Belajar (Learning Path)**
Gambar 3.6 Activity Diagram Memilih Materi Belajar
Gambar 3.6 menjelaskan alur saat siswa mengeklik menu "Learning Path" pada navigasi. Sistem merespons dengan menampilkan peta jalan belajar siswa yang berisi daftar mata pelajaran dan bab-bab materi yang dipersonalisasi. Siswa kemudian menelusuri daftar tersebut dan memilih bab spesifik yang ingin dipelajari.

**c. Mengerjakan Latihan Bab**
Gambar 3.7 Activity Diagram Mengerjakan Latihan Bab
Gambar 3.7 menjelaskan alur pengerjaan soal latihan bab. Sistem menampilkan lembar soal beserta panel AI Tutor. Siswa dapat memilih opsi jawaban dan mengeklik "Jawab". Jika salah pada percobaan pertama, sistem memberikan peringatan dan AI Tutor memberikan petunjuk (hint). Jika kembali salah pada percobaan kedua, soal dilewati dan AI memberikan evaluasi lengkap. Jika benar, sistem menampilkan notifikasi keberhasilan dan opsi untuk melihat pembahasan AI sebelum lanjut ke soal berikutnya.

**d. Lihat Pembahasan Dari Hasil Belajar**
Gambar 3.8 Activity Diagram Lihat Pembahasan
Gambar 3.8 menjelaskan proses evaluasi hasil latihan. Di layar hasil akhir, siswa mengeklik tombol "Lihat Pembahasan". Sistem menampilkan halaman evaluasi berisi navigasi daftar soal dan kunci jawaban. Siswa dapat berpindah antar soal dan secara aktif menanyakan penjabaran konsep secara spesifik melalui chat dengan AI Tutor di panel yang tersedia.

**e. Ulangi Latihan**
Gambar 3.9 Activity Diagram Ulangi Latihan
Gambar 3.9 menjelaskan proses pengulangan sesi latihan. Pada layar hasil evaluasi, siswa memilih opsi "Ulangi Latihan". Sistem secara otomatis menghapus riwayat pengerjaan pada sesi sebelumnya dan memuat ulang instrumen soal dari nomor awal, sehingga siswa dapat mengerjakan soal dari awal tanpa hambatan.

**f. Pilih Subtes Lain**
Gambar 3.10 Activity Diagram Pilih Subtes Lain
Gambar 3.10 menguraikan perpindahan antar subtes. Melalui layar hasil, siswa mengeklik tombol "Pilih Subtes Lain". Sistem memproses permintaan ini dengan mengarahkan layar kembali ke halaman utama Learning Path, memungkinkan siswa untuk memilih modul atau kategori pelajaran lainnya dengan leluasa.

**g. Lihat Paket Tryout**
Gambar 3.11 Activity Diagram Lihat Paket Tryout
Gambar 3.11 menjelaskan peninjauan daftar ujian simulasi. Siswa membuka menu "Try Out" melalui bilah navigasi. Sistem mengambil data penjadwalan ujian dari server dan menampilkan seluruh daftar paket tryout SNBT yang tersedia. Siswa dapat melihat jadwal dan ketersediaan ujian tersebut.

**h. Mengerjakan Tryout**
Gambar 3.12 Activity Diagram Mengerjakan Tryout
Gambar 3.12 memodelkan pengerjaan ujian berbasis IRT. Siswa memilih paket ujian dan mengeklik "Mulai". Sistem menyiapkan antarmuka ujian yang dijaga keamanannya dan menjalankan hitung mundur waktu. Siswa dapat menavigasi soal (Sebelumnya, Selanjutnya, atau Ragu-ragu). Setelah selesai, sistem akan mengumpulkan jawaban dan memproses perhitungan skor akhir berskala.

**i. Lihat Review Jawaban & Bahas dengan AI Tutor**
Gambar 3.13 Activity Diagram Review Tryout dengan AI
Gambar 3.13 menjelaskan alur pasca-ujian tryout. Siswa diarahkan ke halaman "Review Tryout" dan mengeklik tombol "Bahas dengan AI Tutor". Sistem mengaktifkan AI Tutor dalam mode "Socratic". Siswa kemudian berdiskusi, sementara AI menganalisis miskonsepsi (kesalahpahaman) siswa secara mendalam tanpa membocorkan jawaban langsung.

**j. Navigasi Fleksibel Modul Rapor & Evaluasi**
Gambar 3.14 Activity Diagram Navigasi Modul Rapor
Gambar 3.14 menunjukkan fleksibilitas halaman Analytics. Saat siswa mengakses "Rapor & Evaluasi", sistem memuat antarmuka yang memiliki tiga tab utama: Rapor & Tren, Evaluasi Soal, dan Peluang Lolos. Siswa bebas berpindah di antara ketiga tab tersebut dan sistem akan memuat tampilan secara dinamis sesuai pilihan.

**k. Lihat Analisis Kemampuan (Rapor & Tren)**
Gambar 3.15 Activity Diagram Lihat Rapor & Tren
Gambar 3.15 menjelaskan kalkulasi halaman rapor. Saat siswa membuka tab "Rapor & Tren", sistem secara otomatis menghitung selisih rata-rata nilai siswa dengan kampus sasarannya. Sistem kemudian memvisualisasikan data tersebut menggunakan Diagram Radar, grafik tren kenaikan nilai, serta menjabarkan subtes yang menjadi kelemahan siswa.

**l. Lihat Bank Soal Salah (Evaluasi Soal)**
Gambar 3.16 Activity Diagram Lihat Bank Soal Salah
Gambar 3.16 menggambarkan proses kurasi soal sulit. Pada tab "Evaluasi Soal", sistem mengumpulkan seluruh soal yang pernah dijawab salah atau ditandai ragu-ragu dari riwayat pengerjaan sebelumnya, lalu menampilkannya dalam bentuk kartu (flashcard) Bank Soal Salah untuk ditinjau ulang oleh siswa.

**m. Bahas Soal dari Bank Soal Salah**
Gambar 3.17 Activity Diagram Bahas Bank Soal Salah
Gambar 3.17 menunjukkan interaksi remedial. Siswa mengeklik tombol "Bahas AI" pada salah satu soal di Bank Soal Salah. Sistem memuat konteks soal tersebut ke dalam panel AI. AI Tutor memulai percakapan remedial interaktif hingga siswa berhasil memahami konsep pengerjaan yang benar.

**n. Lihat Peluang Lolos (Chancing Engine)**
Gambar 3.18 Activity Diagram Lihat Peluang Lolos
Gambar 3.18 memodelkan integrasi Chancing Engine. Di tab "Peluang Lolos", sistem mengolah algoritma untuk membandingkan skor skalasi (IRT) siswa dengan passing grade prodi tujuan. Sistem menampilkan persentase probabilitas kelulusan, dan AI Tutor memberikan saran prodi alternatif jika target terlalu rawan.

**o. Lihat Detail Salah Satu Jurusan Target**
Gambar 3.19 Activity Diagram Detail Jurusan Target
Gambar 3.19 menjelaskan peninjauan statistik universitas. Siswa mengeklik salah satu kartu jurusan target. Sistem memunculkan jendela modal yang memuat data kuota, jumlah pesaing historis, dan prioritas subtes yang memiliki bobot tinggi pada jurusan tersebut.

**p. Bahas Soal Dalam Aplikasi (Ruang Tutor AI)**
Gambar 3.20 Activity Diagram Bahas Soal Dalam Aplikasi
Gambar 3.20 menggambarkan fungsi Katalog Soal. Siswa mengakses "Ruang Tutor AI" di mana sistem menyajikan seluruh repositori soal yang ada di aplikasi. Saat siswa menekan "Bahas" pada salah satu soal arsip, AI Tutor langsung mengambil alih ruang diskusi untuk membahas soal tersebut.

**q. Bahas Soal Luar Aplikasi (Custom Input)**
Gambar 3.21 Activity Diagram Bahas Soal Luar Aplikasi
Gambar 3.21 menunjukkan fungsionalitas input bebas. Di dalam Ruang Tutor AI, siswa mengetik atau menempelkan (copy-paste) soal dari sumber eksternal (seperti PR sekolah). Sistem mengirim teks bebas tersebut ke LLM, dan AI Tutor membalas dengan kerangka penyelesaian dan analisis langkah-demi-langkah.

**r. Mengubah Pengaturan Profil & Target**
Gambar 3.22 Activity Diagram Mengubah Pengaturan
Gambar 3.22 menjelaskan pembaruan preferensi akun. Siswa membuka menu "Pengaturan Profil & Target". Sistem menampilkan formulir identitas dan pilihan dua prodi target. Setelah siswa menyimpan perubahan, sistem memvalidasi dan memperbarui data profil di pangkalan data secara asinkron.

**s. Lihat Subtes Practice (Quick Drill)**
Gambar 3.23 Activity Diagram Lihat Subtes Practice
Gambar 3.23 menjelaskan akses ke mode Quick Drill. Saat siswa mengeklik menu "Practice", sistem memuat kumpulan kategori subtes UTBK (seperti Literasi Bahasa Indonesia atau Penalaran Matematika). Siswa memilih kategori spesifik yang ingin dilatih secara cepat.

**t. Mengerjakan Subtes (Practice / Quick Drill)**
Gambar 3.24 Activity Diagram Mengerjakan Subtes Practice
Gambar 3.24 memodelkan jalannya Quick Drill. Setelah siswa mengeklik "Drill Sekarang", sistem secara acak (randomize) mengambil sejumlah soal dari kategori terkait. Siswa mengerjakan soal secara repetitif dengan bantuan AI Tutor yang bersiaga pada tiap putaran latihan.

---

**3. Activity Diagram Admin**

**a. Tambah Pengguna**
Gambar 3.25 Activity Diagram Tambah Pengguna
Gambar 3.25 menjelaskan proses penambahan akun pengguna baru oleh Admin. Proses dimulai saat Admin membuka menu "Kelola Pengguna" lalu mengeklik "Tambah". Sistem menampilkan formulir data akun. Setelah Admin mengisi dan menyimpan, sistem akan melakukan hashing pada kata sandi dan membuat entri pengguna baru ke dalam database.

**b. Memperbarui Pengguna**
Gambar 3.26 Activity Diagram Memperbarui Pengguna
Gambar 3.26 menjelaskan alur pengeditan akun. Admin memilih pengguna spesifik dan mengedit informasinya (misalnya mereset kata sandi atau mengubah hak akses). Sistem memvalidasi perubahan lalu memperbaruinya secara langsung di pangkalan data.

**c. Melihat Pengguna**
Gambar 3.27 Activity Diagram Melihat Pengguna
Gambar 3.27 menjabarkan alur pembacaan data (Read). Admin mengakses tabel "Kelola Pengguna". Sistem menarik data pengguna secara massal (dengan paginasi) dari PostgreSQL dan menyajikannya secara terstruktur beserta status keaktifannya.

**d. Menghapus Pengguna**
Gambar 3.28 Activity Diagram Menghapus Pengguna
Gambar 3.28 menjelaskan mekanisme pemblokiran atau penghapusan akun. Admin menekan ikon tempat sampah pada baris pengguna. Sistem meminta konfirmasi. Jika disetujui, sistem melakukan penghapusan data secara permanen beruntun (Cascade Delete) dari pangkalan data.

**e. Tambah Daftar Soal**
Gambar 3.29 Activity Diagram Tambah Daftar Soal
Gambar 3.29 memodelkan pembuatan instrumen soal. Admin membuka "Kelola Soal" dan membuat entri baru dengan memasukkan teks soal (Markdown/LaTeX), opsi jawaban, indikator kunci benar, serta nilai parameter tingkat kesulitannya. Sistem menyuntikkan data tersebut ke bank soal aktif.

**f. Memperbarui Daftar Soal**
Gambar 3.30 Activity Diagram Memperbarui Daftar Soal
Gambar 3.30 menjelaskan proses penyuntingan soal. Admin memilih soal yang keliru atau perlu direvisi, mengedit isi teks atau kuncinya, lalu menekan simpan. Sistem memperbarui rekaman soal tersebut agar soal yang ditampilkan ke siswa adalah versi terbaru.

**g. Melihat Daftar Soal**
Gambar 3.31 Activity Diagram Melihat Daftar Soal
Gambar 3.31 menunjukkan proses pemantauan kurikulum. Admin masuk ke menu "Kelola Soal". Sistem mengambil dan menyusun daftar ribuan soal utuh dari server lengkap dengan atribut meta (topik, tingkat kesulitan, tipe soal).

**h. Menghapus Daftar Soal**
Gambar 3.32 Activity Diagram Menghapus Daftar Soal
Gambar 3.32 menjelaskan alur purifikasi bank soal. Admin menghapus soal yang dianggap sudah tidak relevan. Setelah melalui jendela konfirmasi peringatan, sistem menghapus kaitan soal dan opsi jawabannya secara permanen dari server.

**i. Tambah Daftar Bab**
Gambar 3.33 Activity Diagram Tambah Daftar Bab
Gambar 3.33 menunjukkan penciptaan klasifikasi materi baru. Admin mengetikkan nama bab dan menentukan ke dalam mata pelajaran apa bab tersebut bernaung. Sistem membuat entri baru pada relasi tabel Chapter.

**j. Memperbarui Daftar Bab**
Gambar 3.34 Activity Diagram Memperbarui Daftar Bab
Gambar 3.34 menguraikan proses revisi silabus. Admin memperbarui nama bab (misal mengubah penamaan kurikulum baru). Sistem melakukan sinkronisasi data sehingga nama bab berubah di seluruh tampilan aplikasi.

**k. Melihat Daftar Bab**
Gambar 3.35 Activity Diagram Melihat Daftar Bab
Gambar 3.35 menjelaskan pembacaan struktur bab. Sistem menyajikan tabel daftar seluruh bab materi beserta indikator jumlah soal yang bernaung di bawah bab tersebut agar Admin dapat meninjaunya secara utuh.

**l. Menghapus Daftar Bab**
Gambar 3.36 Activity Diagram Menghapus Daftar Bab
Gambar 3.36 menjelaskan penghapusan suatu topik. Admin menyetujui peringatan sistem sebelum penghapusan dilakukan. Sistem menghapus bab tersebut, yang secara otomatis berimbas pada pelepasan asosiasi soal-soal di bawahnya (atau terhapus secara *cascade*).

**m. Tambah Mata Pelajaran**
Gambar 3.37 Activity Diagram Tambah Mata Pelajaran
Gambar 3.37 menunjukkan ekspansi kurikulum sistem. Admin menambahkan entitas mata pelajaran baru (jika ada pembaruan resmi subtes UTBK dari kementerian). Sistem menyiapkan wadah relasi baru untuk bab dan soal.

**n. Memperbarui Mata Pelajaran**
Gambar 3.38 Activity Diagram Memperbarui Mata Pelajaran
Gambar 3.38 memodelkan proses koreksi penamaan level teratas. Admin menyunting ejaan atau pengelompokan (Saintek/Soshum) pada suatu mata pelajaran. Sistem segera merender pembaruan di seluruh klien.

**o. Melihat Mata Pelajaran**
Gambar 3.39 Activity Diagram Melihat Mata Pelajaran
Gambar 3.39 menjabarkan pemantauan hierarki teratas kurikulum. Sistem menampilkan ketujuh subtes resmi (Subject) pada tabel admin sebagai referensi pengelompokkan utama pangkalan data.

**p. Menghapus Mata Pelajaran**
Gambar 3.40 Activity Diagram Menghapus Mata Pelajaran
Gambar 3.40 mengilustrasikan penghapusan modul besar. Proses ini merupakan operasi kritikal; setelah konfirmasi Admin, sistem melenyapkan mata pelajaran tersebut yang berdampak langsung hilangnya akses uji coba mapel tersebut bagi siswa.

**q. Tambah Paket Tryout**
Gambar 3.41 Activity Diagram Tambah Paket Tryout
Gambar 3.41 menjelaskan penambahan acara ujian. Admin menentukan nama paket (contoh: Tryout Akbar Maret), durasi, dan tanggal eksekusi. Sistem menginisialisasi baris (row) baru dalam tabel *ExamTemplate* yang masih kosong dari soal.

**r. Memperbarui Paket Tryout**
Gambar 3.42 Activity Diagram Memperbarui Paket Tryout
Gambar 3.42 menunjukkan fleksibilitas penjadwalan. Admin mengedit detail paket ujian, seperti menggeser tenggat waktu (deadline) pelaksanaannya. Sistem merespons dengan memodifikasi tenggat waktu tersebut pada database pendaftaran.

**s. Melihat Paket Tryout**
Gambar 3.43 Activity Diagram Melihat Paket Tryout
Gambar 3.43 menggambarkan pemantauan event. Admin melihat jadwal dan status ketersediaan dari seluruh koleksi paket Tryout dari gelombang pertama hingga gelombang terbaru secara terpusat.

**t. Menghapus Paket Tryout**
Gambar 3.44 Activity Diagram Menghapus Paket Tryout
Gambar 3.44 menjelaskan pembersihan riwayat acara. Paket Tryout lawas yang sudah tidak digunakan lagi dihapus oleh Admin. Sistem membersihkan visibilitas ujian tersebut dari tampilan layar seluruh pengguna.

**u. Tambah Subtes**
Gambar 3.45 Activity Diagram Tambah Subtes
Gambar 3.45 menguraikan penyusunan materi tryout. Ke dalam paket Tryout kosong, Admin menginjeksi daftar subtes atau blok soal spesifik dari bank soal. Sistem merangkai (linking) referensi soal-soal tersebut ke dalam cangkang Tryout menjadi satu kesatuan.

**v. Memperbarui Subtes**
Gambar 3.46 Activity Diagram Memperbarui Subtes
Gambar 3.46 memodelkan penyesuaian bobot paket ujian. Admin mengubah proporsi (jumlah soal) atau mengganti topik materi pada sebuah subtes di paket Tryout yang telah ada. Sistem merevisi komposisi kerangka ujian.

**w. Menghapus Subtes**
Gambar 3.47 Activity Diagram Menghapus Subtes
Gambar 3.47 menjelaskan pengurangan beban tryout. Admin melepaskan ikatan sebuah subtes (misalnya Penalaran Umum) dari sebuah paket Tryout. Sistem menghapus relasi paket tersebut tanpa merusak data asli soal di dalam Bank Soal.

**x. Menampilkan Tab Ringkasan Platform**
Gambar 3.48 Activity Diagram Menampilkan Ringkasan Platform
Gambar 3.48 menunjukkan inisialisasi modul analitik Admin. Saat Admin mengeklik menu "Analytics Admin", sistem membuka kerangka antarmuka yang terbagi menjadi beberapa tab terpisah guna memudahkan observasi.

**y. Melihat Ringkasan Platform**
Gambar 3.49 Activity Diagram Melihat Ringkasan Platform
Gambar 3.49 memodelkan pantauan agregat operasional. Pada tab "Ringkasan Platform", sistem melakukan agregasi terhadap data pengguna aktif, jumlah ujian yang diselesaikan, dan beban server lalu menampilkannya dalam bentuk metrik real-time.

**z. Melihat Evaluasi Ujian**
Gambar 3.50 Activity Diagram Melihat Evaluasi Ujian
Gambar 3.50 memvisualisasikan kualitas ujian massal. Di tab "Ujian", sistem merekapitulasi seluruh nilai siswa dan menampilkannya sebagai sebaran kurva (bell curve). Admin menggunakan data ini untuk mengevaluasi kewajaran tingkat kesulitan instrumen paket ujian bulan ini.

**aa. Melihat Target & Siswa**
Gambar 3.51 Activity Diagram Melihat Target & Siswa
Gambar 3.51 menjelaskan pemantauan minat studi pengguna. Di tab "Target Siswa", sistem merangkum jumlah pengguna berdasarkan universitas pilihan pertamanya, memberikan insight kepada Admin mengenai program studi mana yang paling diminati saat ini.

**bb. Melihat Token & AI**
Gambar 3.52 Activity Diagram Melihat Token & AI
Gambar 3.52 menunjukkan audit sumber daya pihak ketiga. Di tab "API & AI", sistem menghitung biaya kumulatif pemakaian token prompt OpenRouter (LLM) oleh seluruh siswa guna transparansi pemantauan biaya (billing) operasional server.

**cc. Menampilkan Tab Daftar Universitas**
Gambar 3.53 Activity Diagram Menampilkan Tab Daftar Universitas
Gambar 3.53 menginisiasi modul kelola PTN. Admin menavigasi ke menu "Kelola PTN/Prodi". Sistem memuat antarmuka tabel relasional khusus entitas pendidikan tinggi negeri.

**dd. Melihat Daftar Program Studi**
Gambar 3.54 Activity Diagram Melihat Daftar Program Studi
Gambar 3.54 memodelkan *read operation* pada tabel program studi. Sistem memaparkan data jurusan lengkap dengan kuota terbaru dan estimasi skor rasionalisasi yang sangat penting bagi algoritma Chancing Engine.

**ee. Tambah Program Studi**
Gambar 3.55 Activity Diagram Tambah Program Studi
Gambar 3.55 menjelaskan proses perluasan database jurusan. Admin menginput nama jurusan baru, kuota peminat, serta menautkannya ke Universitas induk (Parent). Sistem merekam entitas *Major* tersebut secara paten ke database.

**ff. Memperbarui Program Studi**
Gambar 3.56 Activity Diagram Memperbarui Program Studi
Gambar 3.56 menunjukkan sinkronisasi data tahunan. Jika ada perubahan rasio keketatan jurusan dari kementerian di tahun yang baru, Admin dapat mengedit persentasenya agar kalkulasi prediksi kelulusan siswa tetap valid.

**gg. Menghapus Program Studi**
Gambar 3.57 Activity Diagram Menghapus Program Studi
Gambar 3.57 menjelaskan eksekusi penonaktifan prodi. Admin menghapus program studi yang ditutup oleh universitas terkait. Sistem menghapus pilihannya dari drop-down menu pengaturan profil seluruh siswa.

**hh. Melihat Daftar Universitas**
Gambar 3.58 Activity Diagram Melihat Daftar Universitas
Gambar 3.58 menjabarkan rekap PTN secara makro. Sistem merender daftar instansi universitas dari skala nasional. Tabel ini menjadi induk dari seluruh rincian program studi yang ada di dalamnya.

**ii. Tambah Data Universitas**
Gambar 3.59 Activity Diagram Tambah Data Universitas
Gambar 3.59 menjelaskan ekspansi pangkalan data PTN baru. Admin memasukkan identitas instansi baru (misal: PTN Baru yang belum lama diresmikan). Sistem membuatkan wadah khusus agar jurusan bisa ditambahkan ke bawahnya nanti.

**jj. Memperbarui Data Universitas**
Gambar 3.60 Activity Diagram Memperbarui Data Universitas
Gambar 3.60 menjelaskan pembaruan profil universitas. Jika nama universitas berubah atau mengalami pergantian status institusi, Admin mengedit datanya dan sistem segera menyesuaikannya secara menyeluruh (Global Update).

**kk. Menghapus Data Universitas**
Gambar 3.61 Activity Diagram Menghapus Data Universitas
Gambar 3.61 memodelkan penghapusan entitas parent. Saat suatu universitas dihapus, seluruh data program studi yang tergabung di dalamnya (beserta rekam jejak siswa yang menargetkannya) akan disesuaikan atau dihapus secara aman oleh pangkalan data PostgreSQL (Cascade).

**ll. Melihat Pengaturan Sistem**
Gambar 3.62 Activity Diagram Melihat Pengaturan Sistem
Gambar 3.62 menjabarkan kontrol *superadmin*. Admin menekan tombol "Pengaturan Situs". Sistem menampilkan antarmuka *Control Panel* operasional tingkat tinggi (seperti toggle mode maintenance, batas durasi ujian global, atau limitasi token).

**mm. Memperbarui Peraturan Sistem**
Gambar 3.63 Activity Diagram Memperbarui Peraturan Sistem
Gambar 3.63 menunjukkan fungsi *Hot-Swap Settings*. Admin mengganti nilai di Pengaturan Sistem (misalnya mengubah batas interaksi AI maksimal per siswa). Begitu tuas digeser dan disimpan, nilai baru tersebut segera diaplikasikan (*enforced*) kepada ribuan pengguna yang terhubung pada detik itu juga, tanpa memerlukan *re-deploy* server (On-the-fly updates).
