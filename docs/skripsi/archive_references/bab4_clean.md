BAB IV.
HASIL DAN PEMBAHASAN
4.1 Implementasi Tampilan Pengguna (User Interface)
Bagian ini membahas hasil implementasi tampilan antarmuka yang terdapat pada platform tryout Ujian Tulis Berbasis Komputer - Seleksi Nasional Berdasarkan Tes (UTBK SNBT) berbasis web yang telah dikembangkan. Setiap tampilan yang ditunjukkan merupakan halaman yang dapat diakses oleh pengguna sesuai dengan hak aksesnya, yaitu siswa dan admin. Selain menampilkan hasil implementasi antarmuka, bagian ini juga menjelaskan fungsi dari setiap halaman dan fitur yang tersedia untuk mendukung penggunaan sistem. Berikut merupakan hasil implementasi tampilan antarmuka pengguna pada sistem yang telah dikembangkan.
4.1.1 Landing Page
 
Gambar 4.1 Landing Page
(Placeholder: Masukkan Gambar 4.1 Landing Page di sini | Route URL: /)
Gambar 4.1 menampilkan antarmuka Landing Page yang berfungsi sebagai halaman utama sistem yang dapat diakses oleh pengguna umum sebelum melakukan autentikasi. Hal ini menjadi media untuk memperkenalkan fitur utama sistem Tryout. Pada bagian atas terdapat navigation bar yang menampilkan logo beserta tombol Masuk dan Daftar Gratis sebagai akses menuju proses autentikasi pengguna. Selanjutnya, bagian Hero Section yang menampilkan judul utama serta tombol Mulai Gratis untuk menggunakan aplikasi, di bawah Hero Section terdapat bagian Fitur yang menampilkan tiga keunggulan utama sistem, yaitu Materi Terstruktur, AI Tutor Cerdas, dan Simulasi Nyata. Ketiga fitur tersebut merepresentasikan fungsi utama sistem yang telah dirancang pada tugas akhir ini, yaitu menyediakan materi pembelajaran yang terorganisasi, memberikan bimbingan belajar berbasis ITS, serta cara kerja yang menjelaskan alur penggunaan sistem melalui tiga tahapan yaitu Evaluasi Awal, Intervensi AI, dan Simulasi & Sukses. Halaman ini juga memuat section ajakan berupa tombol Daftar Sekarang yang mengarahkan pengguna menuju halaman registrasi, dan diakhiri dengan bagian footer yang memuat identitas, tautan akses, serta informasi hak cipta. Keseluruhan antarmuka dirancang menggunakan konsep responsive web design sehingga dapat diakses dengan baik melalui berbagai ukuran perangkat.
4.1.2 Halaman Autentikasi
a. Halaman Login
 
Gambar 4.2 Halaman Login
(Placeholder: Masukkan Gambar 4.2 Halaman Login di sini | Route URL: /auth/login)
Gambar 4.2 menampilkan antarmuka halaman login yang berfungsi sebagai proses autentikasi pengguna yang telah memiliki akun. Halaman ini dapat digunakan oleh seluruh pengguna yang telah memiliki akun, baik siswa maupun admin, sesuai dengan mekanisme Role Based Access Control (RBAC) yang telah dirancang pada sistem. Antarmuka halaman login terbagi menjadi dua bagian, yaitu bagian kiri yang menampilkan ilustrasi sambutan "Welcome Back" beserta deskripsi singkat mengenai sistem, dan bagian kanan yang menampilkan formulir autentikasi yang berisi kolom alamat email dan password, opsi ingat saya, serta tautan lupa password. Sistem menyediakan mekanisme autentikasi menggunakan kombinasi email dan password. Setelah proses autentikasi berhasil dilakukan, sistem akan mengidentifikasi hak akses pengguna dan mengarahkan pengguna menuju dashboard sesuai dengan perannya.
b. Halaman Daftar Akun
 
Gambar 4.3 Halaman Daftar
(Placeholder: Masukkan Gambar 4.3 Halaman Daftar di sini | Route URL: /auth/register)
Gambar 4.3 menampilkan antarmuka halaman Daftar yang berfungsi sebagai sarana registrasi bagi pengguna baru sebelum dapat mengakses seluruh fitur pada sistem. Halaman ini memungkinkan pengguna membuat akun baru menggunakan alamat email. Antarmuka halaman terbagi menjadi dua bagian, yaitu bagian kiri yang menampilkan ilustrasi "Unlock Potential" beserta deskripsi singkat ajakan untuk pengguna memulai perjalanan belajar, dan bagian kanan menampilkan formulir registrasi berisi kolom nama, email, password, dan konfirmasi password. Pengguna dapat melakukan registrasi dengan menekan tombol "Buat Akun" setelah seluruh data diisi dengan benar. Setelah proses registrasi berhasil dilakukan menggunakan email, akun akan tersimpan pada basis data dan pengguna dapat melakukan autentikasi untuk mengakses sistem sesuai dengan hak akses yang dimiliki. Bagi pengguna yang telah memiliki akun, sistem menyediakan tautan Masuk untuk berpindah ke halaman login.
4.1.3 Implementasi Tampilan Role Admin
a. Halaman Dashboard Admin
 
Gambar 4.7 Halaman Dashboard Admin
(Placeholder: Masukkan Gambar 4.7 Halaman Dashboard Admin di sini | Route URL: /admin)
Gambar 4.7 menampilkan antarmuka halaman Dashboard Admin yang berfungsi sebagai panel kontrol utama administrator. Halaman ini menyajikan ringkasan statistik terpadu mengenai kondisi platform, meliputi jumlah Siswa Aktif Terdaftar, total Bank Soal UTBK, Struktur Kurikulum, daftar Universitas & Jurusan, serta data Simulasi Tryout. Melalui halaman ini, administrator dapat memantau secara cepat berbagai metrik sistem dan mengakses modul-modul kelola lainnya, seperti Statistik Platform, Bank Soal & Kurikulum, Manajemen User, Universitas & Jurusan, Manajemen Tryout, dan Pengaturan Sistem.
b. Halaman Manajemen User
 
Gambar 4.8 Halaman Manajemen User
(Placeholder: Masukkan Gambar 4.8 Halaman Manajemen User di sini | Route URL: /admin/users)
Gambar 4.8 menampilkan antarmuka Manajemen User yang memfasilitasi pengelolaan akun siswa dan administrator. Pada bagian atas, sistem menyajikan statistik Total Siswa dan Rata-rata Theta (IRT) yang memberikan estimasi kemampuan populasi siswa aktif. Halaman ini dilengkapi tabel daftar pengguna yang menampilkan nama, surel, hak akses (role), dan estimasi kemampuan IRT (θ). Administrator dapat melakukan pencarian pengguna, filter hak akses, serta melakukan tindakan administratif seperti menambah pengguna baru, mengubah role, atau menghapus akun yang melanggar ketentuan.
c. Halaman Bank Soal & Kurikulum
 
 
 
Gambar 4.9 Halaman Bank Soal & Kurikulum
(Placeholder: Masukkan Gambar 4.9 Halaman Bank Soal & Kurikulum di sini | Route URL: /admin/questions)
Gambar 4.9 menampilkan antarmuka Bank Soal & Kurikulum yang menjadi pusat pengelolaan materi ujian UTBK. Halaman ini terbagi menjadi tiga sub-page utama: Daftar Soal, Daftar Bab (Chapters), dan Mata Pelajaran. Struktur kurikulum disusun secara hierarkis, dimulai dari Mata Pelajaran sebagai level teratas, diikuti oleh Bab Materi, dan butir soal yang spesifik. Administrator dapat memantau jumlah total bab dan soal, serta mengelola soal pilihan ganda yang memuat teks kaya (LaTeX/Markdown) beserta parameter tingkat kesulitannya (Bobot b) untuk mendukung algoritma penilaian IRT.
d. Halaman Data Kampus (Universitas & Jurusan)
 
 
Gambar 4.10 Halaman Data Kampus
(Placeholder: Masukkan Gambar 4.10 Halaman Data Kampus di sini | Route URL: /admin/scraper)
Gambar 4.10 menampilkan antarmuka pengelolaan data perguruan tinggi negeri (PTN) dan program studi. Sistem membagi tampilan ini menjadi dua bagian, yaitu Daftar Universitas dan Daftar Program Studi. Informasi yang disajikan mencakup nama institusi, daftar program studi, fakultas, klaster ilmu (SOSHUM/SAINTEK), daya tampung, serta batas Passing Grade (skor target aman). Ketersediaan data program studi yang akurat sangat krusial, karena data ini menjadi rujukan utama bagi modul Chancing Engine dalam memprediksi peluang kelulusan siswa pada dasbor rekomendasi jurusan.
e. Halaman Manajemen Tryout
 
Gambar 4.11 Halaman Manajemen Tryout
(Placeholder: Masukkan Gambar 4.11 Halaman Manajemen Tryout di sini | Route URL: /admin/tryouts)
Gambar 4.11 menampilkan antarmuka untuk menyusun dan mengelola paket simulasi Tryout SNBT. Halaman ini menampilkan berbagai jenis paket, seperti Regular Tryout dan Diagnostic Test. Administrator dapat mengonfigurasi struktur setiap paket ujian dengan menentukan urutan subtes, jumlah soal per subtes, serta alokasi durasi pengerjaan. Pengaturan subtes yang presisi penting untuk memastikan simulasi berjalan sesuai dengan standar format ujian UTBK asli. Paket ujian yang diatur sebagai Diagnostic Test secara khusus digunakan untuk melakukan kalibrasi kemampuan awal (baseline) siswa yang baru mendaftar.
f. Halaman Statistik Platform
 
 
 
 
Gambar 4.12 Halaman Statistik Platform
(Placeholder: Masukkan Gambar 4.12 Halaman Statistik Platform di sini | Route URL: /admin/stats)
Gambar 4.12 menampilkan halaman analitik terpadu yang terdiri dari empat modul: Ringkasan Platform, Evaluasi Ujian, Target & Siswa, serta Token & AI.
	Ringkasan Platform: Menampilkan metrik seperti Ketercapaian Target, Penyelesaian Ujian, Rata-rata Waktu Ujian, serta grafik Distribusi Skor SNBT dan aktivitas pendaftaran.
	Evaluasi Ujian: Menyajikan analisis kinerja sistem secara akademis, termasuk daftar soal yang paling sering dijawab salah, subtes terlemah, dan sebaran tingkat kesulitan soal berdasarkan analisis model IRT.
	Target & Siswa: Memetakan PTN dan jurusan yang paling diminati (Top Choices), serta daftar Leaderboard siswa dengan skor tertinggi.
	Token & AI: Menampilkan statistik penggunaan token layanan kecerdasan buatan (OpenRouter API) harian serta distribusi alokasinya (misal: Tutor AI, Analisis Rapor, Generate Soal).
g. Halaman Pengaturan Sistem
 
Gambar 4.13 Halaman Pengaturan Sistem
(Placeholder: Masukkan Gambar 4.13 Halaman Pengaturan Sistem di sini | Route URL: /admin/settings)
Gambar 4.13 menampilkan panel Pengaturan Sistem yang memungkinkan administrator untuk mengonfigurasi parameter global operasional aplikasi tanpa memodifikasi kode sumber. Pengaturan mencakup parameter Scoring IRT, seperti Mean (Rata-rata 500) dan Standard Deviation (100) yang digunakan untuk melakukan konversi skor skala Rasch Model (θ) menjadi skor SNBT (200-800). Selain itu, administrator juga dapat menetapkan durasi dan jumlah soal pengerjaan default, serta menyesuaikan tanggal pelaksanaan UTBK SNBT yang akan terhubung dengan countdown timer pada dasbor siswa.
4.1.4 Implementasi Tampilan Role Siswa
a. Halaman OnBoarding
 
 
 
 
 
 
 
 
 
 
Gambar 4.15 Halaman OnBoarding Siswa
(Placeholder: Masukkan Gambar 4.15 Halaman OnBoarding Siswa di sini | Route URL: /onboarding)
Gambar 4.15 menampilkan antarmuka Halaman OnBoarding yang muncul saat siswa pertama kali mendaftar. Halaman ini berfungsi mengumpulkan data awal melalui 4 langkah: (1) Asal Sekolah dan Tahun Lulus, (2) Pemilihan Jurusan Impian Pilihan Pertama lengkap dengan data keketatan (Passing Grade), (3) Jurusan Impian Pilihan Kedua, dan (4) Pengaturan Gaya & Nada AI Tutor. Pada langkah keempat, siswa dapat memilih karakter AI Tutor (seperti Ramah, Jujur & Tegas, atau Nyentrik), Tingkat Energi, dan Panjang Respons. Setelah formulir selesai, sistem menyajikan Analisis Target awal lalu mengarahkan siswa mengikuti Uji Diagnostik Awal untuk mengkalibrasi kemampuan dasar (baseline).
b. Halaman Dashboard Siswa
 
Gambar 4.16 Halaman Dashboard Siswa
(Placeholder: Masukkan Gambar 4.16 Halaman Dashboard Siswa di sini | Route URL: /dashboard)
Gambar 4.16 menampilkan Dashboard utama siswa yang menyajikan Learning Overview. Panel ini menampilkan ringkasan Target PTN, nilai Proyeksi SNBT saat ini, serta persentase Peluang Lulus. Dasbor ini dilengkapi sistem deteksi cerdas "Titik Kritis" yang memperingatkan siswa jika terdapat subtes dengan selisih target sangat jauh, lalu memberikan pintasan belajar instan. Selain itu, dasbor memuat Target Harian beruntun (menyelesaikan Try Out, menjelajahi Learning Path), riwayat aktivitas ujian terakhir, peringkat pengguna (Leaderboard), dan sebuah panel statis Chat with Lexica untuk interaksi cepat dengan AI Tutor.
c. Halaman Learning Path
 
 
 
 
Gambar 4.17 Halaman Learning Path
(Placeholder: Masukkan Gambar 4.17 Halaman Learning Path di sini | Route URL: /learning-path)
Gambar 4.17 menampilkan rute belajar adaptif yang terpersonalisasi berdasarkan target program studi. Sistem otomatis memberikan bobot ekstra pada subtes krusial (misal: Penalaran Matematika dan Pengetahuan Kuantitatif ditarik ke urutan teratas untuk target rumpun SAINTEK). Daftar materi dibagi ke dalam bab-bab yang menampilkan status seperti "Butuh Perhatian", "Sedang Dipelajari", dan "Belum Mulai". Masing-masing bab dilengkapi indikator Kesiapan Ujian (berdasarkan performa Try Out) dan Kesiapan Konsep (dari latihan rutin), memberikan arah navigasi terstruktur agar siswa fokus menambal kekurangan dibanding belajar dari awal.
d. Halaman Practice (Latihan Soal & AI Tutor)
 
 
 
 
Gambar 4.18 Halaman Practice dan Ruang Tutor
(Placeholder: Masukkan Gambar 4.18 Halaman Practice di sini | Route URL: /practice)
Gambar 4.18 menampilkan antarmuka Practice (Quick Drill) untuk melatih kecepatan siswa mengerjakan soal secara acak per subtes. Nilai pada mode ini tidak memengaruhi grafik rapor. Pada mode pengerjaan, kunci jawaban disembunyikan dan siswa diberi kesempatan menjawab (contoh: 2x percobaan). Jika menjawab salah, AI Tutor yang berada di panel sisi kanan secara otomatis mengirimkan teguran ramah atau Socratic Hint (petunjuk berjenjang) sesuai gaya persona yang telah dikonfigurasi saat onboarding. Melalui AI Tutor ini, siswa dapat berdiskusi meminta penjelasan atau analogi lebih lanjut sebelum mencoba menjawab ulang soal tersebut.
e. Halaman Paket Try Out
 
 
 
 
 
Gambar 4.19 Halaman Paket Try Out
(Placeholder: Masukkan Gambar 4.19 Halaman Paket Try Out di sini | Route URL: /tryout/list)
Gambar 4.19 menampilkan antarmuka pemilihan paket simulasi ujian Try Out. Tersedia berbagai varian ujian seperti Try Out Pemanasan, Fokus Skolastik, Fokus Literasi, HOTS & Time Pressure, dan Grand Tryout yang mereplika durasi dan format asli SNBT Kemdikbud (195 menit, 155 soal). Pengerjaan Try Out dirancang sangat ketat: setiap subtes memiliki alokasi waktu tersendiri, berjalan secara berurutan, dan siswa tidak dapat kembali ke seksi sebelumnya jika waktu habis. Pada mode simulasi ketat ini, pendampingan AI Tutor dinonaktifkan sepenuhnya.
f. Halaman Analitik & Rapor (Radar Kemampuan)
 
Gambar 4.20 Halaman Analitik Radar
(Placeholder: Masukkan Gambar 4.20 Halaman Analitik Radar di sini | Route URL: /analytics/radar)
Gambar 4.20 menampilkan Dasbor Analitik & Evaluasi tab Rapor & Tren. Sistem menyajikan prediksi Skor SNBT (hasil perhitungan Item Response Theory) beserta Radar Kemampuan vs Target, di mana visualisasi spider-chart membandingkan skor aktual siswa melawan ambang batas jurusan pada seluruh 7 subtes SNBT. Fitur unggulan dari halaman ini adalah "Insight Analisis Cerdas", yakni rangkuman berbasis teks (Tutor AI) yang mengekstrak informasi mana subtes paling lemah dan berapa selisih poin yang harus dikejar.
g. Halaman Evaluasi Bank Soal Salah
 
Gambar 4.21 Halaman Evaluasi Soal
(Placeholder: Masukkan Gambar 4.21 Halaman Evaluasi Soal di sini | Route URL: /analytics/evaluation)
Gambar 4.21 menampilkan halaman Evaluasi Soal yang berperan sebagai "Buku Kesalahan" (Mistake Book). Pada bagian atas, AI merangkum "Top 3 Bab Paling Banyak Salah" secara statistik. Di bawahnya terdapat daftar arsip soal Try Out yang pernah dijawab salah oleh siswa. Alih-alih hanya memberikan kunci jawaban mentah, setiap soal dilengkapi dengan tombol "Bahas AI", yang memungkinkan siswa membongkar kesalahan logikanya bersama AI Tutor dan mendalami pembahasannya agar kesalahan yang sama tidak terulang.
h. Halaman Chancing Engine (Peluang Lulus)
 
 
Gambar 4.22 Halaman Chancing Engine
(Placeholder: Masukkan Gambar 4.22 Halaman Chancing Engine di sini | Route URL: /analytics/chancing)
Gambar 4.22 menampilkan antarmuka Chancing Engine yang secara dinamis memetakan probabilitas kelulusan siswa ke jurusan impian. Menampilkan rasio keketatan, selisih skor aman, serta distribusi bobot tiap subtes untuk program studi tersebut. Apabila peluang kelulusan terlalu rendah (misal: "Sangat Sulit" / 5%), algoritma AI otomatis merekomendasikan alternatif jurusan cadangan (Rekomendasi Tantangan) di berbagai universitas lain yang lebih realistis dan relevan dengan rumpun jurusan pilihan siswa.
i. Halaman Ruang Tutor AI (Arsip Chat)
 
 
Gambar 4.23 Halaman Ruang Tutor AI
(Placeholder: Masukkan Gambar 4.23 Halaman Ruang Tutor AI di sini | Route URL: /tutor)
Gambar 4.23 menampilkan Ruang Tutor AI khusus, yaitu repositori interaksi AI yang merangkum keseluruhan soal yang pernah dikerjakan siswa di segala mode. Siswa dapat menelusuri soal dengan filter per kategori (Penalaran Umum, Pengetahuan Kuantitatif, dll.). Dengan menekan salah satu soal di dalam direktori ini, siswa membuka kembali sesi chat eksklusif dengan AI untuk menanyakan materi konseptual yang belum dikuasainya hingga tuntas.
j. Halaman Pengaturan Profil & Target
 
Gambar 4.24 Halaman Pengaturan Profil
(Placeholder: Masukkan Gambar 4.24 Halaman Pengaturan Profil di sini | Route URL: /settings)
Gambar 4.24 menampilkan panel Pengaturan Sistem di sisi siswa. Halaman ini digunakan untuk mengubah identitas, profil, informasi asal sekolah, serta memperbarui Pilihan Target UTBK (Universitas dan Program Studi ke-1 & ke-2). Selain itu, panel ini memfasilitasi modifikasi preferensi instruksi sistem (Gaya Interaksi AI, Tingkat Energi, dan Panjang Respons). Setiap perubahan target pada halaman ini akan langsung berdampak pada kalkulasi peluang lolos (Chancing Engine) dan regenerasi Learning Path milik siswa secara real-time.
4.1.5 Fitur Keamanan Ujian (Secure CBT Mode)
Sistem Tryout UTBK SNBT dirancang tidak hanya untuk menyajikan soal secara interaktif, tetapi juga mengondisikan lingkungan ujian seketat mungkin untuk mensimulasikan tekanan dan integritas ujian aslinya. Untuk mencegah tindakan kecurangan akademik (academic misconduct) seperti mencari jawaban di mesin pencari atau platform AI (contoh: ChatGPT), sistem menerapkan perlindungan Secure CBT Mode (Kiosk Mode) dengan 5 (lima) lapis arsitektur keamanan:
	Isolasi Layar Penuh (Fullscreen Enforcer):
Sebelum ujian dimulai, aplikasi akan memaksa browser untuk beralih ke mode layar penuh secara otomatis. Jika siswa menekan tombol ESC untuk keluar dari layar penuh dengan tujuan menggunakan fitur layar terbelah (split screen), sistem akan menjeda ujian secara instan, menyembunyikan soal ujian, dan menampilkan peringatan wajib kembali ke layar penuh.
	Sensor Pemindahan Fokus (Blur Event):
Sistem mengunci fokus kursor OS ke jendela ujian. Jika siswa membagi layarnya ke dalam dua profil Chrome atau aplikasi yang berbeda, kursor yang mengeklik aplikasi lain akan langsung terdeteksi oleh sistem melalui pendengar event window.onblur.
	Sensor Ganti Tab (Visibility Change):
Jika siswa membuka tab baru atau meminimumkan jendela browser, API Page Visibility akan melaporkan document.hidden = true, yang langsung tercatat sebagai sebuah pelanggaran.
	Monitor Suspensi Tab (requestAnimationFrame Heartbeat):
Ini merupakan trik keamanan tingkat lanjut untuk mengatasi celah sistem operasi (seperti gestur 4 jari Swipe to another Space pada Mac). Sistem memantau detak frame visual menggunakan API requestAnimationFrame. Jika selisih antar frame melonjak lebih dari 2.000 milidetik (karena browser menghemat daya grafis saat jendela digeser ke Desktop lain), sistem mendeteksinya sebagai tindakan curang dan langsung memberikan peringatan.
	Blokir Interaksi Teks (Copy-Paste Blocker):
Antarmuka ujian dilapisi CSS user-select-none untuk melarang penyeleksian teks, serta mematikan klik kanan (contextmenu) dan pintasan salin (copy).
Batas maksimal pelanggaran dari gabungan kelima pertahanan di atas adalah tiga kali (3 Strikes Rule). Setiap kali pelanggaran terjadi, siswa akan melihat layar peringatan (Cheat Modal) berwarna merah menyala. Apabila siswa mengulangi tindakan curang hingga menyentuh batas maksimum, maka ujian akan diberhentikan secara paksa dan skor saat itu akan langsung di-submit dengan perhitungan IRT nol pada soal sisanya.
4.2 Implementasi AI Tutor
Implementasi AI Tutor pada platform Tryout UTBK SNBT berbasis ITS dilakukan untuk memberikan bantuan pembelajaran adaptif berdasarkan kondisi jawaban siswa. Sistem menentukan bentuk bantuan yang diberikan berdasarkan status jawaban dan jumlah percobaan siswa. AI Tutor memanfaatkan Large Language Model (LLM) untuk menghasilkan respons pembelajaran berdasarkan konteks soal, jawaban siswa, jumlah percobaan, dan hasil analisis sistem. Secara keseluruhan, sistem mengelola empat kondisi (states) respons AI yang berbeda.
a. Halaman Tampilan Soal dan Jawaban Siswa
 
Gambar 4.33 Halaman Tampilan Soal dan Jawaban Siswa
Gambar 4.33 menunjukkan halaman pengerjaan soal pada Mode Belajar. Pada tahap ini, siswa mengerjakan soal dan mengirimkan jawaban ke sistem. Setelah tombol "Kirim Jawaban" dipilih, sistem melakukan evaluasi terhadap jawaban siswa menggunakan mekanisme pemeriksaan jawaban yang telah diimplementasikan. Hasil evaluasi tersebut digunakan untuk menentukan status jawaban (benar atau salah), memperbarui data pembelajaran pada Student Model, serta menentukan strategi pendampingan yang akan diberikan oleh AI Tutor pada tahap berikutnya.
b. Implementasi AI Tutor pada Jawaban Salah Pertama (Socratic Hint)
 
Gambar 4.34 Log Console AI Tutor pada Percobaan Pertama
Gambar 4.34 menampilkan log proses AI Tutor ketika siswa memberikan jawaban yang salah pada percobaan pertama. Setelah sistem mendeteksi bahwa jawaban belum benar, sistem mengambil informasi jumlah percobaan (attempt count) serta tingkat penguasaan materi (mastery) yang tersimpan pada Student Model. Berdasarkan data tersebut, Rule-Based Strategy Selector menentukan level scaffolding pada tingkat SOCRATIC. Selanjutnya, AI meracik prompt yang memuat aturan mutlak mekanisme Blind Mode agar AI tidak memberikan jawaban akhir secara langsung, melainkan membalas dengan pertanyaan pancingan. Log ini memperlihatkan tiga tahapan utama secara berurutan: proses penyusunan prompt, pengiriman ke LLM melalui OpenRouter API, dan penerimaan respons.
c. Implementasi AI Tutor pada Jawaban Salah Kedua (Step-by-Step Guidance)
 
Gambar 4.35 Log Console AI Tutor pada Percobaan Kedua
Apabila siswa kembali menjawab salah pada kesempatan kedua, sistem akan mendeteksi bahwa batas maksimal percobaan telah tercapai. Gambar 4.35 memperlihatkan perubahan penanganan oleh sistem di mana level scaffolding diturunkan menjadi HINT (Strategi Step-by-Step Guidance). Pada tahap ini, instruksi prompt yang dikirimkan ke LLM diarahkan untuk membimbing siswa langkah demi langkah tanpa harus bertanya balik secara terus-menerus, mengingat kesempatan menjawab siswa pada soal tersebut telah habis.
d. Implementasi AI Tutor pada Jawaban Benar (Positive Reinforcement)
 
Gambar 4.36 Log Console AI Tutor pada Jawaban Benar
Gambar 4.36 menampilkan log proses AI Tutor ketika siswa berhasil memberikan jawaban yang benar (baik pada percobaan pertama maupun kedua). Setelah sistem memverifikasi bahwa jawaban sesuai dengan kunci jawaban, sistem tidak lagi menjalankan strategi Instructional Scaffolding karena siswa telah berhasil menyelesaikan soal secara mandiri. Sistem mengubah level scaffolding menjadi SOLUTION (Strategi Positive Reinforcement).
Prompt yang dikirimkan ke LLM pada tahap ini dirancang untuk memberikan feedback positif, validasi, dan apresiasi terhadap pemahaman siswa. Selain itu, batasan Blind Mode dilepas sehingga sistem dapat mempersiapkan penjelasan (solution) secara penuh apabila siswa meminta penjabaran lebih lanjut. Setelah proses generate respons selesai dan ditampilkan, sistem secara otomatis memperbarui data pembelajaran seperti nilai accuracy dan mastery. Data ini kemudian digunakan sebagai dasar pembaruan Learning Analytics dan Learning Path pada sesi pembelajaran berikutnya.
e. Implementasi AI Tutor pada Ruang Diskusi Bebas (Free Chat / Post-Test)
 
Gambar 4.37 Log Console AI Tutor pada Mode Free Chat
Di luar proses pengerjaan soal (Mode Belajar), siswa memiliki akses ke ruang diskusi bebas dan halaman pembahasan setelah menyelesaikan ujian (Post-Test Review). Gambar 4.37 mengilustrasikan proses AI Tutor dalam menangani request dengan mode FREE_CHAT. Pada kondisi ini, sistem tidak membatasi respons AI dengan strategi instruksional scaffolding tertentu, melainkan membebaskan AI untuk berinteraksi dan menjelaskan materi selayaknya tutor personal secara langsung berdasarkan riwayat percakapan.
6. Antarmuka Panel Chat AI Tutor
 
Gambar 4.38 Antarmuka AI 
Gambar 4.38 menampilkan antarmuka panel samping AI Tutor yang dapat diakses oleh siswa setelah menjawab soal pada Mode Belajar. Antarmuka ini dirancang menyerupai aplikasi chatting untuk memberikan pengalaman bimbingan yang interaktif dan familiar. Teks respons yang dihasilkan dari proses log pada tahapan sebelumnya diteruskan ke antarmuka ini secara asinkron. Setiap gelembung obrolan (bubble chat) mendukung perenderan persamaan matematika berformat LaTeX secara dinamis dengan memanfaatkan modul remark-math dan rehype-katex.
7. Tantangan Implementasi: Pembaruan Model LLM dan Strategi Fallback
Dalam proses implementasinya, ditemukan tantangan teknis terkait stabilitas layanan pihak ketiga. Pada awalnya, sistem dirancang dan diuji menggunakan API Groq karena keunggulan kecepatan inferensinya. Namun, ketika siklus pengembangan berjalan dalam intensitas tinggi, ditemukan kendala berupa rate limit (batas jumlah token per menit) yang sangat agresif serta beberapa kali terjadinya kegagalan koneksi jaringan (timeout).
Sebagai bentuk adaptasi terhadap siklus hidup perangkat lunak, jaminan skalabilitas untuk menangani ribuan pengguna secara bersamaan (concurrent users), serta stabilitas operasional, kode implementasi AI Tutor dimigrasikan secara mulus ke layanan agregator OpenRouter API. Untuk mencegah terjadinya bottleneck, sistem mengimplementasikan strategi Model Fallback (Load Balancing). Sistem menetapkan Gemini 2.0 Flash Lite sebagai model utama, yang secara otomatis dan instan akan dialihkan (fallback) ke model Open Source Llama 3.1 8B atau Qwen 2.5 7B apabila server utama mengalami antrean panjang.
Selain itu, sistem memperkuat ketahanan integrasi melalui algoritma Exponential Backoff (fetchWithRetry) yang menunda secara eksponensial pengulangan kueri saat koneksi terputus. Sistem juga menerapkan mekanisme Caching Kriptografi (SHA-256) untuk menyimpan riwayat respons prompt. Jika siswa memuat ulang halaman (refresh) pada soal yang sama, sistem tidak akan melakukan kueri ulang ke peladen AI, melainkan menyajikan data statis dari cache. Implementasi arsitektur ganda ini terbukti berhasil mengamankan stabilitas sistem dengan tingkat keandalan (uptime) yang tinggi serta mempertahankan tingkat responsivitas (latency) tanpa mengorbankan kualitas Socratic Scaffolding yang dihasilkan.


 
 
4.3 Implementasi Learning Analytics dan Learning Path
 
 
Gambar 4.39 Pembaruan Learning Analytics dan Learning Path
Gambar 4.39 menampilkan proses pembaruan Learning Analytics dan Learning Path setelah AI Tutor selesai memberikan respons kepada siswa. Setelah proses evaluasi jawaban selesai, sistem secara otomatis memperbarui data pembelajaran pada Student Model, termasuk nilai accuracy dan mastery berdasarkan hasil pengerjaan terbaru.
Nilai mastery yang telah diperbarui selanjutnya digunakan sebagai salah satu dasar dalam proses penyusunan kembali rekomendasi pembelajaran pada fitur Learning Path. Sistem menghitung kembali Priority Score setiap materi sehingga urutan rekomendasi belajar selalu menyesuaikan perkembangan kemampuan siswa. Selain itu, sistem juga mempertimbangkan waktu terakhir materi dipelajari melalui mekanisme Forgetting Curve sehingga materi yang telah lama tidak dipelajari dapat kembali diprioritaskan untuk dipelajari ulang.
Dengan mekanisme tersebut, Learning Analytics dapat menampilkan perkembangan kemampuan siswa secara berkelanjutan, sedangkan Learning Path mampu menghasilkan rekomendasi materi yang lebih adaptif sesuai kondisi pembelajaran terkini.
4.4 Hasil Pengujian
Pengujian sistem dilakukan untuk memastikan bahwa platform Tryout UTBK SNBT berbasis web dengan ITS yang dikembangkan dapat berfungsi sesuai dengan kebutuhan fungsional, mudah digunakan oleh pengguna, serta memiliki tingkat keamanan yang memadai.
Pada tugas akhir ini, pengujian dilakukan menggunakan tiga metode, yaitu Black Box Testing untuk menguji fungsionalitas sistem, System Usability Scale (SUS) untuk mengevaluasi tingkat usability berdasarkan pengalaman pengguna, serta Penetration Testing menggunakan OWASP ZAP (Zed Attack Proxy) untuk mengidentifikasi potensi kerentanan keamanan pada aplikasi web.
4.4.1 Black-Box Testing
Pengujian Black-Box Testing dilakukan secara manual untuk memastikan bahwa setiap fungsi pada sistem telah berjalan sesuai dengan kebutuhan fungsional yang telah dirancang. Pengujian dilakukan dengan berinteraksi langsung melalui antarmuka pengguna (User Interface), memberikan berbagai masukan (input) secara manual pada setiap fitur, kemudian mengamati apakah sistem menghasilkan output visual dan fungsional yang sesuai dengan yang diharapkan. Fitur yang diuji meliputi proses autentikasi, pengelolaan data, Mode Belajar, Mode Ujian, Learning Analytics, Personal Plan, serta berbagai fitur administrasi yang tersedia pada sistem. Selanjutnya, hasil pengujian dibandingkan dengan hasil yang diharapkan untuk memastikan bahwa setiap fungsi telah berjalan dengan baik tanpa error. Pengujian ini dibagi sesuai dua hak akses (role) utama, yakni Siswa dan Admin.
1. Pengujian Fungsionalitas Role Siswa
Pengujian fungsionalitas pada bagian ini berfokus pada alur interaksi Siswa (Student), mulai dari proses masuk hingga berbagai mode pembelajaran dan evaluasi.
a. Autentikasi & Akun
Tabel 4.1 Pengujian Black-Box Fitur Autentikasi
No	Skenario Uji (Alur Siswa)	Output yang Diharapkan	Hasil	Status
1	Login & Lihat Learning Overview (Alur 1) [Route: /auth/login] -> [/dashboard]


Siswa memasukkan email & password, lalu klik Login.	Sistem mengecek data, mengarahkan siswa ke Dashboard, dan menyajikan ringkasan data (nilai tryout & progres belajar).	Sesuai	Berhasil
b. Onboarding & Pengaturan
Tabel 4.2 Pengujian Black-Box Fitur Pengaturan Profil
No	Skenario Uji (Alur Siswa)	Output yang Diharapkan	Hasil	Status
2	Mengubah Pengaturan Profil & Target (Alur 17) [Route: /settings]


Membuka menu Pengaturan, mengubah jurusan target, dan menyimpan perubahan.	Sistem memvalidasi, menyimpan data ke server, dan memunculkan notifikasi "Profil berhasil disimpan!".	Sesuai	Berhasil
c. Mode Belajar (Learning Path)
Tabel 4.3 Pengujian Black-Box Mode Belajar
No	Skenario Uji (Alur Siswa)	Output yang Diharapkan	Hasil	Status
3	Memilih Materi Belajar (Alur 2) [Route: /learning-path]


Siswa mengeklik menu "Learning Path" di pinggir layar.	Sistem menampilkan peta jalan belajar berisi daftar mata pelajaran dan bab materi.	Sesuai	Berhasil
4	Mengerjakan Latihan Bab (Alur 3) [Route: /practice/[subjectId]]


Memilih bab dan menjawab soal. Jika salah, memicu hint AI (peringatan kuning). Jika benar, notifikasi "Benar!".	Sistem langsung mengecek jawaban. AI Tutor otomatis mendampingi (hint/apresiasi) sesuai jawaban siswa.	Sesuai	Berhasil
5	Lihat Pembahasan Dari Hasil Belajar (Alur 4) [Route: /practice/[subjectId]]


Di layar hasil latihan, mengeklik "Lihat Pembahasan".	Sistem menampilkan halaman evaluasi. Siswa bisa memilih navigasi soal, menekan "Tanya Pembahasan AI", atau berdiskusi dengan AI.	Sesuai	Berhasil
6	Ulangi Latihan (Alur 5) [Route: /practice/[subjectId]]


Di layar hasil latihan, mengeklik "Ulangi Latihan".	Sistem mereset riwayat sesi sebelumnya dan memuat soal dari nomor 1 lagi.	Sesuai	Berhasil
7	Pilih Subtes Lain (Alur 6) [Route: /learning-path]


Di layar hasil latihan, mengeklik "Pilih Subtes Lain".	Sistem mengarahkan layar kembali ke halaman Learning Path.	Sesuai	Berhasil
d. Mode Tryout
Tabel 4.4 Pengujian Black-Box Mode Tryout
No	Skenario Uji (Alur Siswa)	Output yang Diharapkan	Hasil	Status
8	Lihat Paket Tryout (Alur 7) [Route: /tryout/list]


Membuka menu Tryout di sidebar.	Sistem menarik data ujian dan menampilkan daftar paket tryout SNBT.	Sesuai	Berhasil
9	Mengerjakan Tryout (Alur 8) [Route: /tryout/[id]]


Memilih paket, mulai ujian, navigasi soal, tandai ragu-ragu, dan Kumpulkan.	Sistem menghitung mundur (timer). Setelah dikumpulkan, Sistem memproses rumus IRT dan menampilkan skor.	Sesuai	Berhasil
10	Lihat Review Jawaban & Bahas dengan AI Tutor (Alur 9) [Route: /tryout/[id]/review]


Di hasil Tryout, menekan "Bahas dengan AI Tutor".	AI Tutor membuka panel chat dalam mode "Socratic" untuk menganalisis miskonsepsi secara mendalam.	Sesuai	Berhasil
e. Rapor & Evaluasi (Analytics)
Tabel 4.5 Pengujian Black-Box Rapor & Evaluasi
No	Skenario Uji (Alur Siswa)	Output yang Diharapkan	Hasil	Status
11	Navigasi Fleksibel Modul Rapor & Evaluasi (Alur 10A) [Route: /analytics]


Mengeklik menu Rapor & Evaluasi, lalu berpindah antar 3 tab.	Sistem mengubah tampilan layar secara langsung sesuai tab yang dipilih secara bebas.	Sesuai	Berhasil
12	Lihat Analisis Kemampuan / Rapor & Tren (Alur 10B) [Route: /analytics/trend] & [/analytics/radar]


Membuka tab "Rapor & Tren".	Sistem mengkalkulasi selisih nilai target, menampilkan Diagram Radar, grafik tren, dan rincian kelemahan.	Sesuai	Berhasil
13	Lihat Bank Soal Salah / Evaluasi Soal (Alur 11) [Route: /analytics/evaluation]


Membuka tab "Evaluasi Soal".	Sistem mengumpulkan semua soal yang salah/ragu-ragu menjadi "Bank Soal Salah".	Sesuai	Berhasil
14	Lihat Peluang Lolos / Chancing Engine (Alur 13) [Route: /analytics/chancing]


Membuka tab "Peluang Lolos".	Chancing Engine membandingkan skor siswa dengan rata-rata PTN sasaran dan menyajikan persentase tingkat kelulusan.	Sesuai	Berhasil
15	Lihat Detail Salah Satu Jurusan Target (Alur 14) [Route: /analytics/chancing/[majorId]]


Mengeklik kartu jurusan (mis. Kedokteran UI).	Sistem memunculkan popup statistik kuota/peminat. AI Tutor memberi saran strategi belajar.	Sesuai	Berhasil
f. Ruang AI Tutor
Tabel 4.6 Pengujian Black-Box Ruang AI Tutor
No	Skenario Uji (Alur Siswa)	Output yang Diharapkan	Hasil	Status
16	Lihat Bahas Soal dari Bank Soal Salah (Alur 12) [Route: /tutor/[attemptId]]


Mengeklik "Bahas AI" pada salah satu kartu soal salah.	AI Tutor menyapa dan memuat konteks soal untuk berdiskusi hingga paham.	Sesuai	Berhasil
17	Bahas Soal Dalam Aplikasi / Ruang AI Tutor (Alur 15) [Route: /tutor]


Mengeklik "Ruang AI Tutor" dan menekan "Bahas" di Katalog Soal.	Sistem menampilkan arsip soal. AI Tutor menyapa di panel chat untuk diskusi interaktif.	Sesuai	Berhasil
18	Bahas Soal Luar Aplikasi / Custom Input (Alur 16) [Route: /tutor]


Mengetik/paste naskah soal dari luar aplikasi ke dalam kolom chat.	AI Tutor menganalisis struktur pertanyaan, lalu membalas dengan langkah penjelasan & kunci jawaban yang tepat.	Sesuai	Berhasil
g. Practice / Quick Drill
Tabel 4.7 Pengujian Black-Box Practice (Quick Drill)
No	Skenario Uji (Alur Siswa)	Output yang Diharapkan	Hasil	Status
19	Lihat Subtes Practice / Quick Drill (Alur 18) [Route: /practice]


Mengeklik menu "Practice".	Sistem memuat mode Quick Drill dan menyajikan kartu kategori subtes untuk pemanasan.	Sesuai	Berhasil
20	Mengerjakan Subtes Practice (Alur 19) [Route: /practice/[subjectId]]


Mengeklik "Drill Sekarang" di salah satu subtes.	Sistem secara acak menyiapkan soal. AI Tutor mendampingi siswa dengan aturan 2 kesempatan.	Sesuai	Berhasil
2. Pengujian Fungsionalitas Role Admin
h. Dashboard & Manajemen Data Utama
Tabel 4.8 Pengujian Black-Box Admin (Dashboard & CRUD Dasar)
No	Skenario Uji (Alur Admin)	Output yang Diharapkan	Hasil	Status
21	Login & Dashboard (Alur 1) [Route: /admin]


Admin login dengan akses 'ADMIN'.	Sistem menampilkan Dashboard statistik tingkat tinggi (total pengguna, soal, rata-rata skor).	Sesuai	Berhasil
22	Lihat User (Alur 2) [Route: /admin/users]


Mengeklik "Kelola Pengguna".	Sistem menarik data dan menyajikan tabel daftar siswa dan persebaran rata-rata nilai secara global.	Sesuai	Berhasil
23	Lihat Daftar Soal, Bab, dan Mapel (Alur 3, 4, 5) [Route: /admin/questions]


Membuka menu Kelola Soal dan berpindah tab.	Sistem menampilkan daftar ribuan soal utuh (dengan nilai bobot IRT), daftar bab, dan daftar mapel.	Sesuai	Berhasil
24	Tambah Soal, Bab, dan Mapel (Alur 6, 7, 8) [Route: /admin/questions]


Mengeklik Tambah pada masing-masing entitas dan menyimpannya.	Sistem menyimpan dan menyuntikkan data baru ke database agar bisa langsung diakses oleh Siswa.	Sesuai	Berhasil
25	Edit Soal, Bab, dan Mapel (Alur 9, 10, 11) [Route: /admin/questions]


Menggunakan ikon pensil (Edit) untuk memperbaiki data.	Sistem menimpa dan merevisi data lama dengan data baru di server.	Sesuai	Berhasil
26	Hapus Soal, Bab, dan Mapel (Alur 12, 13, 14) [Route: /admin/questions]


Menggunakan ikon tempat sampah dan mengonfirmasi pop-up.	Sistem menghapus data tersebut secara permanen beserta hierarki di bawahnya (jika ada).	Sesuai	Berhasil
i. Kelola PTN & Prodi
Tabel 4.9 Pengujian Black-Box Admin (Kelola PTN/Prodi)
No	Skenario Uji (Alur Admin)	Output yang Diharapkan	Hasil	Status
27	Lihat Daftar Universitas & Prodi (Alur 15, 16) [Route: /admin/scraper]


Membuka menu Kelola PTN/Prodi.	Sistem menampilkan tabel besar nama kampus dan ribuan daftar jurusan beserta skor batas aman (passing grade).	Sesuai	Berhasil
28	Tambah Universitas & Prodi (Alur 17, 18) [Route: /admin/scraper]


Mengeklik tombol Tambah dan mengisi kuota, saingan, lalu Simpan.	Sistem merekam data kampus dan jurusan baru untuk keperluan kalkulasi Chancing Engine.	Sesuai	Berhasil
29	Edit Universitas & Prodi (Alur 19, 20) [Route: /admin/scraper]


Memperbaiki salah ketik nama kampus atau mengubah kuota mahasiswa tahun ini.	Sistem memperbarui data statistiknya di server secara real-time.	Sesuai	Berhasil
30	Hapus Universitas & Prodi (Alur 21, 22) [Route: /admin/scraper]


Menekan hapus pada nama kampus atau jurusan.	Sistem menghapusnya secara permanen dari daftar ketersediaan pendaftaran.	Sesuai	Berhasil
j. Kelola Tryout
Tabel 4.10 Pengujian Black-Box Admin (Kelola Tryout)
No	Skenario Uji (Alur Admin)	Output yang Diharapkan	Hasil	Status
31	Lihat Daftar Tryout (Alur 23) [Route: /admin/tryouts]


Membuka menu "Kelola Tryout".	Sistem menampilkan jadwal dan kumpulan paket Tryout SNBT (dari gelombang pertama hingga akhir).	Sesuai	Berhasil
32	Tambah Tryout & Subtes (Alur 24, 25) [Route: /admin/tryouts]


Membuat Tryout baru dan menambahkan subtes blok soal ke dalamnya.	Sistem membuat cangkang paket baru dan merangkai blok-blok soal menjadi satu paket utuh.	Sesuai	Berhasil
33	Edit Tryout & Subtes (Alur 26, 27) [Route: /admin/tryouts]


Mengubah jadwal pelaksanaan atau susunan bab ujian.	Sistem merevisi jadwal dan kerangka ujian pada database.	Sesuai	Berhasil
34	Hapus Tryout & Subtes (Alur 28, 29) [Route: /admin/tryouts]


Menghapus paket utuh atau mencopot satu subtes.	Sistem membersihkan data pelaksanaan Tryout atau melepaskan kaitan soal tanpa menghapus isi Bank Soal utama.	Sesuai	Berhasil
k. Analitik & Pengaturan Admin
Tabel 4.11 Pengujian Black-Box Admin (Analytics & Pengaturan)
No	Skenario Uji (Alur Admin)	Output yang Diharapkan	Hasil	Status
35	Lihat Statistik Ringkasan & Token AI (Alur 30, 31) [Route: /admin/stats]


Membuka "Analytics Admin" dan tab "API & AI".	Sistem merender bagan visual aktivitas akses server dan pemakaian token prompt interaksi AI Tutor.	Sesuai	Berhasil
36	Lihat Statistik Evaluasi Ujian (Alur 32) [Route: /admin/stats]


Berpindah ke tab "Ujian".	Sistem merangkum sebaran nilai kurva normal (bell curve) dari seluruh nilai ujian peserta.	Sesuai	Berhasil
37	Lihat Statistik Target Siswa (Alur 33) [Route: /admin/stats]


Berpindah ke tab "Target Siswa".	Sistem menyortir data kampus yang paling difavoritkan oleh pengguna secara real-time.	Sesuai	Berhasil
38	Lihat & Ubah Pengaturan Sistem (Alur 34, 35) [Route: /admin/settings]


Membuka "Pengaturan Sistem", mengubah parameter kalibrasi IRT, durasi default Try Out, dan jadwal hitung mundur UTBK.	Sistem menyimpan konfigurasi ke database dan menerapkan pembaruan pengaturan tersebut secara global ke seluruh platform.	Sesuai	Berhasil
Secara keseluruhan, hasil pengujian fungsionalitas (Black-Box Testing) pada seluruh alur interaksi Siswa (19 alur) dan Admin (35 alur) menunjukkan bahwa seluruh skenario pengujian memperoleh status berhasil. Hasil tersebut menegaskan bahwa setiap cerita interaksi harian pengguna dari awal hingga akhir telah diimplementasikan tanpa penyimpangan dan mampu berjalan secara optimal. Dengan demikian, platform dinyatakan telah siap digunakan secara operasional.
4.4.2 System Usability Scale (SUS) Testing
Pengujian System Usability Scale dilakukan untuk mengukur tingkat kemudahan usability platform Tryout UTBK SNBT berbasis ITS berdasarkan pengalaman pengguna setelah menggunakan sistem. Pengujian ini melibatkan responden yang telah mencoba menggunakan sistem sesuai dengan role masing-masing, yaitu Siswa dan Admin. Setiap responden diminta mengisi kuesioner SUS yang terdiri dari 10 pernyataan dengan skala Likert 5 poin, pernyataan tersebut mencakup aspek kemudahan penggunaan, konsistensi, kemudahan dipelajari, serta kepercayaan diri pengguna ketika berinteraksi dengan sistem.
Instrumen SUS yang digunakan mengacu pada metode yang dikembangkan oleh Brooke (1996), yang terdiri atas 5 pernyataan positif, dan 5 pernyataan negatif yang disusun secara bergantian untuk mengurangi kecenderungan responden memberikan jawaban secara otomatis. Skala Likert yang digunakan pada kuesioner ini terdiri dari 5 tingkat penilaian, seperti pada Tabel 4.12 berikut.
Tabel 4.12 Skala Likert Kuesioner SUS
Skor	Keterangan
1	Sangat Tidak Setuju
2	Tidak Setuju
3	Netral
4	Setuju
5	Sangat Setuju
Adapun instrumen kuesioner yang digunakan pada tugas akhir ini ditunjukkan pada Tabel 4.13 berikut.
Tabel 4.13 Instrumen Pernyataan Kuesioner SUS
No	Pernyataan
1	Saya merasa sistem ini akan sering saya gunakan
2	Saya merasa sistem ini terlalu rumit digunakan
3	Saya merasa sistem ini mudah digunakan
4	Saya merasa membutuhkan bantuan teknisi untuk dapat menggunakan sistem ini
5	Saya merasa berbagai fitur dalam sistem ini terintegrasi dengan baik
6	Saya merasa banyak ketidakkonsistenan dalam sistem ini
7	Saya merasa sebagian besar pengguna dapat dengan cepat mempelajari cara menggunakan sistem ini
8	Saya merasa sistem ini sangat tidak praktis untuk digunakan
9	Saya merasa percaya diri saat menggunakan sistem ini
10	Saya perlu mempelajari banyak hal sebelum dapat menggunakan sistem ini dengan lancar
Perhitungan skor SUS dilakukan dengan menggunakan persamaan sebagai berikut:
	Untuk pernyataan bernilai positif (nomor 1,3,5,7,dan 9), skor responden dikurangi 1.
	Untuk pernyataan bernilai negatif (nomor 2,4,6,8, dan 10), skor diperoleh dari hasil pengurangan nilai 5 dengan skor responden.
	Seluruh skor hasil konversi kemudian dijumlahkan.
	Nilai total dikalikan dengan 2,5 sehingga diperoleh skor SUS pada rentang 0-100.
Semakin tinggi skor yang diperoleh, semakin baik tingkat usability sistem yang dirasakan oleh pengguna. Perhitungan skor pada tugas akhir ini mengacu pada metode System Usability Scale yang dikembangkan oleh Brooke (1996). Selanjutnya, hasil skor SUS diinterpretasikan menggunakan Adjective Rating yang dikemukakan oleh Bangor et al. (2008), sebagaimana ditunjukkan pada Tabel 4.14 berikut.
Tabel 4.14 Adjective Rating
Rentang Skor SUS	Kategori
> 85	Best Imaginable
80 - 85	Excellent
68 – 79	Good
51 – 67	OK
25 – 50	Poor
< 25	Worst Imaginable
a. Pengujian SUS Role Siswa
Pengujian SUS pada role Siswa melibatkan 35 responden yang merupakan pengguna target utama dari aplikasi ini. Sebaran usia responden bervariasi mulai dari 16 hingga 20 tahun, dengan dominasi usia 17 tahun. Karakteristik kelompok usia responden ditunjukkan pada Tabel 4.15 berikut.
Tabel 4.15 Karakteristik Responden Pengujian SUS (Siswa)
No	Usia	Jumlah Responden	Persentase
1	Tidak Mengisi	4	11,4%
2	16 Tahun	4	11,4%
3	17 Tahun	19	54,3%
4	18 Tahun	6	17,2%
5	20 Tahun	2	5,7%
Total		35	100%
Seluruh jawaban responden kemudian diolah menggunakan rumus perhitungan SUS, sehingga diperoleh rata-rata skor usability.
Tabel 4.16 Hasil Pengolahan Data SUS Siswa
No	Responden	Q1	Q2	Q3	Q4	Q5	Q6	Q7	Q8	Q9	Q10	Skor Konv	Skor SUS
1	R1	3	1	2	4	5	3	1	5	3	4	17	42.5
2	R2	3	1	3	2	3	2	4	2	3	2	27	67.5
3	R3	4	2	5	3	4	2	5	1	3	4	29	72.5
4	R4	2	3	3	4	5	2	3	3	4	4	21	52.5
5	R5	2	3	1	1	1	1	1	3	3	1	19	47.5
6	R6	4	3	5	3	4	2	4	2	5	3	29	72.5
7	R7	4	3	5	2	3	4	5	1	4	1	30	75.0
8	R8	5	5	4	5	5	5	5	4	5	5	20	50.0
9	R9	5	1	5	1	4	1	5	1	4	1	38	95.0
10	R10	3	2	4	2	4	3	4	2	4	3	27	67.5
11	R11	3	3	4	3	4	3	3	2	4	4	23	57.5
12	R12	4	3	3	2	4	3	4	2	3	3	25	62.5
13	R13	4	2	4	3	3	3	4	2	3	4	24	60.0
14	R14	1	2	2	1	2	2	1	2	2	2	19	47.5
15	R15	3	3	3	3	3	3	3	3	3	3	20	50.0
16	R16	4	2	3	4	2	3	3	4	3	3	19	47.5
17	R17	4	3	4	2	4	2	4	2	3	3	27	67.5
18	R18	4	3	3	5	3	4	4	2	4	3	21	52.5
19	R19	4	3	2	2	3	2	4	3	5	3	25	62.5
20	R20	3	2	4	3	3	2	4	2	3	4	24	60.0
21	R21	5	3	4	3	5	1	5	1	5	5	31	77.5
22	R22	5	2	4	3	4	3	4	2	3	5	25	62.5
23	R23	5	2	4	3	4	2	4	2	3	4	27	67.5
24	R24	2	3	3	1	1	1	2	1	3	1	24	60.0
25	R25	4	3	4	2	4	3	4	2	3	2	27	67.5
26	R26	4	1	5	1	5	2	5	1	4	5	33	82.5
27	R27	5	2	4	2	4	2	4	1	5	3	32	80.0
28	R28	3	2	4	2	4	2	4	2	4	2	29	72.5
29	R29	4	2	4	3	3	3	4	2	3	3	25	62.5
30	R30	4	2	4	3	5	2	5	1	5	5	30	75.0
31	R31	4	4	3	4	4	4	3	3	3	4	18	45.0
32	R32	4	2	4	2	4	2	4	1	4	3	30	75.0
33	R33	3	2	4	3	3	2	3	2	4	5	23	57.5
34	R34	4	3	4	3	4	3	5	2	4	3	27	67.5
35	R35	4	2	5	2	5	2	5	1	4	2	34	85.0
Rata-Rata Keseluruhan (35 Responden Siswa)													64.21
Berdasarkan hasil perhitungan pada Tabel 4.16, diperoleh rata-rata skor SUS sebesar 64,21. Berdasarkan Adjective Rating menurut Bangor et al. (2008), nilai tersebut termasuk kategori OK / Good, yang menunjukkan bahwa platform telah memiliki tingkat usability yang cukup baik dan dapat diterima (acceptable) digunakan oleh siswa, meskipun masih terdapat beberapa aspek antarmuka dan pengalaman pengguna yang dapat dikembangkan.
Sebagian besar responden memberikan penilaian pada rentang skor 55–75, yang menunjukkan bahwa sistem telah dapat digunakan dengan baik. Namun, terdapat beberapa responden yang memberikan skor relatif rendah (di bawah 50) sehingga memengaruhi nilai rata-rata keseluruhan.
b. Pengujian SUS Role Admin
Pengujian SUS pada aktor Admin (termasuk Tutor/Guru) melibatkan 6 responden yang berinteraksi dengan dashboard analitik, pembuatan bank soal, dan manajemen tryout. Berbeda dengan siswa, pengguna role ini rata-rata berusia lebih dewasa (berkisar antara 34 hingga 48 tahun).
Tabel 4.17 Hasil Pengolahan Data SUS Admin
No	Responden	Q1	Q2	Q3	Q4	Q5	Q6	Q7	Q8	Q9	Q10	Skor Konv	Skor SUS
1	A1	4	2	5	1	4	2	5	1	5	1	36	90.0
2	A2	4	1	4	1	5	2	5	1	4	1	36	90.0
3	A3	4	2	5	1	4	1	5	2	5	1	36	90.0
4	A4	5	1	5	2	5	1	5	1	5	1	39	97.5
5	A5	4	1	5	2	5	1	4	1	5	1	37	92.5
6	A6	5	2	5	1	4	1	5	1	5	1	38	95.0
Rata-Rata Keseluruhan (6 Responden Admin)													92.5
Berdasarkan hasil perhitungan pada Tabel 4.17, diperoleh rata-rata skor SUS sebesar 92,5. Berdasarkan Adjective Rating menurut Bangor et al. (2008), nilai tersebut termasuk ke dalam kategori puncak yaitu Best Imaginable. Hasil ini mengindikasikan bahwa dashboard admin yang telah dirancang sangat praktis, intuitif, dan tidak menimbulkan beban operasional (bebas ribet), yang sangat sesuai dengan profil pengguna rentang usia dewasa dalam menyelesaikan pekerjaan rekapitulasi data harian mereka.
c. Evaluasi Kualitatif (Feedback)
Selain penilaian kuantitatif berupa skor SUS, kuesioner juga mengumpulkan evaluasi kualitatif berupa ulasan positif dan saran perbaikan dari seluruh responden (Siswa dan Admin). Ringkasan ulasan positif dapat dilihat pada Tabel 4.18, sedangkan saran perbaikan dirangkum pada Tabel 4.19.
Tabel 4.18 Ulasan Positif Responden terhadap Sistem
No	Kategori	Ringkasan Ulasan Positif
1	AI Tutor & Penilaian	Kehadiran AI Tutor sangat membantu memberikan penjelasan detail secara real-time (bukan hanya jawaban instan) serta sistem penilaian probabilitas kelulusan yang dinilai akurat dan mirip aplikasi bimbingan belajar profesional.
2	Tampilan & Antarmuka	Tampilan UI yang menarik, elegan, sederhana, serta animasi responsif (tidak delay) membuat pengalaman pengguna menjadi lebih nyaman.
3	Fitur Latihan UTBK	Fitur latihan dan Tryout dinilai sangat bermanfaat untuk mengasah kemampuan diri dengan adanya statistik jawaban benar/salah, pembahasan soal, dan kesempatan menjawab ulang.
4	Kemudahan Penggunaan	Sistem sangat mudah digunakan dan user-friendly, tidak membingungkan bahkan bagi pengguna di kalangan usia senior (Admin/Tutor) dalam membantu mempercepat proses rekapitulasi data harian.
Tabel 4.19 Feedback Responden Siswa
No	Kategori	Ringkasan Feedback
1	Fitur Navigasi Soal	Menginginkan fitur yang memudahkan kembali ke nomor awal atau soal yang belum dijawab dengan lebih mudah dan fungsi pengiriman jawaban (submit) diperbaiki.
2	Materi dan Bank Soal	Menambahkan fitur penjelasan letak spesifik jawaban benar/salah, lebih banyak latihan soal, dan penjelasan/tata bahasa di hint lebih diperbaiki.
3	Pilihan Fakultas / Jurusan	Mengelompokkan pilihan jurusan berdasarkan letak universitas atau memperbanyak database rekomendasi prodi yang dapat dipilih di Chancing Engine.
4	Stabilitas Aplikasi (Bugs)	Memperbaiki masalah elemen UI yang terkadang tidak dapat diklik atau mengharuskan pengisian ulang dari awal, serta meminimalisir bugs.
5	Petunjuk Penggunaan (Onboarding)	Menambahkan tangkapan layar (screenshot) atau demo singkat, membuat laman FAQ untuk menjelaskan prediksi IRT hanyalah estimasi, dan membuat halaman bantuan/kontak.
Berdasarkan feedback tersebut, dapat disimpulkan bahwa sebagian besar responden memberikan tanggapan positif terhadap UI aplikasi, Real-time Socratic AI Tutor, serta sistem penilaian skor yang realistis. Saran yang diberikan berfokus pada penyelesaian bug teknis minor, penambahan basis data materi dan soal, serta pembenahan panduan pengguna (FAQ/Demo).
b. Pengujian SUS Role Admin
Pengujian SUS pada role Admin melibatkan 6 responden yang merupakan pengelola sistem atau tutor pembimbing dengan hak akses administratif pada sistem.
Tabel 4.19 Hasil Pengolahan Data SUS Admin
No	Responden	Q1	Q2	Q3	Q4	Q5	Q6	Q7	Q8	Q9	Q10	Skor Konversi	Skor SUS
1	R1	5	1	5	1	5	1	5	1	5	1	40	100.0
2	R2	5	1	5	1	5	1	5	1	5	1	40	100.0
3	R3	5	1	5	1	5	1	5	1	5	1	40	100.0
4	R4	5	1	5	1	5	1	5	1	5	1	40	100.0
5	R5	5	1	5	1	5	1	5	1	5	1	40	100.0
6	R6	5	1	5	1	5	1	5	1	5	1	40	100.0
Rata-Rata Keseluruhan (6 Responden)													100,0
Berdasarkan hasil perhitungan pada Tabel 4.19, diperoleh rata-rata skor SUS sebesar 100,0. Berdasarkan Adjective Rating menurut Bangor et al. (2008), nilai tersebut termasuk kategori Best Imaginable (karena bernilai lebih dari 85), yang menunjukkan bahwa sistem sangat mudah dan intuitif digunakan oleh pengguna dengan hak akses Admin. Hal ini didukung oleh evaluasi kualitatif dari responden (tutor/bapak-bapak) yang menyatakan bahwa aplikasi ini mempercepat pengerjaan rekapitulasi data, tidak membingungkan, dan sangat membantu pekerjaan operasional harian mereka.
c. Rekapitulasi Hasil Pengujian SUS
Tabel 4.20 Rekapitulasi Hasil Pengujian SUS
No	Role	Jumlah Responden	Rata-Rata SUS	Adjective Rating
1	Siswa	35	62,93	OK
2	Admin	6	100,0	Best Imaginable
Berdasarkan rekapitulasi hasil pengujian SUS pada Tabel 4.20, Role Admin memperoleh rata-rata skor SUS sebesar 100,0, sedangkan Role Siswa memperoleh rata-rata sebesar 62,93. Perbedaan ini menunjukkan antarmuka fungsionalitas manajemen (dashboard admin) dirancang sangat efektif, minim beban kognitif ekstra, serta berhasil memenuhi kebutuhan penggunanya. Secara keseluruhan, platform telah memenuhi aspek usability dengan cukup baik pada kedua Role.
d. Kesimpulan Pengujian SUS
Berdasarkan hasil pengujian SUS yang melibatkan total 41 responden (35 Siswa dan 6 Admin), platform Tryout UTBK SNBT berbasis ITS memperoleh rata-rata skor keseluruhan sebesar 68,35, dengan rincian 62,93 pada Role Siswa dan 100,0 pada Role Admin. Hasil ini membuktikan sistem memiliki tingkat usability yang mumpuni. Fitur AI Tutor, Chancing Engine, dan Learning Analytics dinilai sangat interaktif dan representatif oleh responden, sedangkan beberapa kendala teknis (bug navigasi) menjadi fokus penyempurnaan utama untuk pengembangan berikutnya.
4.4.3 Penetration Testing menggunakan OWASP ZAP
Pengujian keamanan sistem dilakukan menggunakan metode Penetration Testing untuk mengetahui adanya potensi kerentanan (vulnerability) pada platform Tryout UTBK SNBT berbasis Intelligent Tutoring System (ITS). Pengujian ini dilakukan karena sistem menyimpan data pengguna dan informasi hasil pembelajaran, sehingga keamanan menjadi salah satu aspek yang perlu dipastikan sebelum sistem digunakan. Melalui pengujian ini, dapat diketahui apakah masih terdapat celah keamanan yang berpotensi dimanfaatkan oleh pihak yang tidak bertanggung jawab.
Pada tugas akhir ini, pengujian dilakukan menggunakan OWASP ZAP (Zed Attack Proxy), yaitu salah satu perangkat lunak open source yang banyak digunakan untuk menguji keamanan aplikasi berbasis web. OWASP ZAP dapat membantu mendeteksi berbagai potensi kerentanan, seperti kesalahan konfigurasi keamanan, missing security header, maupun kerentanan lain yang umum ditemukan pada aplikasi web.
Adapun lingkungan pengujian yang digunakan dapat dilihat pada Tabel 4.21.
Tabel 4.21 Lingkungan Pengujian Penetration Testing
Komponen	Spesifikasi
Target Aplikasi	Platform Tryout UTBK SNBT Berbasis ITS
URL Pengujian	http://127.0.0.1:3000
Framework Target	Next.js
Tools	OWASP ZAP Versi 2.17.0
Sistem Operasi	Lingkungan Pengembangan Lokal (Localhost)
Metode Pengujian	Manual Explore & Automated Scan
Pengujian dilakukan secara terpisah untuk setiap Role karena sistem memiliki dua modul utama dengan hak akses yang berbeda, yaitu modul Siswa dan modul Admin. Skenario pengujian dilakukan dengan mengakses seluruh fitur sesuai dengan Role masing-masing menggunakan browser yang terintegrasi dengan OWASP ZAP.
Hasil pengujian dikelompokkan berdasarkan tingkat risiko yang digunakan oleh OWASP ZAP, yaitu High, Medium, Low, dan Informational.
Tabel 4.22 Kategori Risiko OWASP ZAP
Tingkat Risiko	Keterangan
High	Menunjukkan kerentanan dengan tingkat risiko tinggi yang perlu segera diperbaiki karena berpotensi membahayakan keamanan sistem.
Medium	Menunjukkan kerentanan dengan tingkat risiko sedang yang dapat dimanfaatkan dalam kondisi tertentu sehingga perlu dilakukan perbaikan.
Low	Menunjukkan kerentanan dengan tingkat risiko rendah yang tidak memberikan dampak besar terhadap sistem, tetapi tetap disarankan untuk diperbaiki.
Informational	Menunjukkan informasi atau konfigurasi yang tidak termasuk kerentanan, namun dapat digunakan sebagai bahan evaluasi.
4.4.3.1 Hasil Penetration Testing Awal (Siklus 1)
Setelah seluruh tahap pengujian selesai dilakukan, OWASP ZAP menghasilkan laporan yang berisi daftar kerentanan. Berdasarkan hasil pemindaian awal, tidak ditemukan kerentanan dengan tingkat risiko High. Secara keseluruhan, pengujian pada modul Siswa mendeteksi 2 kerentanan Medium, 3 Low, dan 4 Informational. Sedangkan pada modul Admin terdeteksi 2 kerentanan Medium, 2 Low, dan 4 Informational. Ringkasan gabungan jenis kerentanan yang ditemukan dapat dilihat pada Tabel 4.23.
Tabel 4.23 Jenis Kerentanan yang Ditemukan (Siklus 1)
No	Jenis Kerentanan	Risk	Modul
1	Content Security Policy (CSP) Header Not Set	Medium	Siswa, Admin
2	Missing Anti-clickjacking Header	Medium	Siswa, Admin
3	Big Redirect Detected (Potential Sensitive Info Leak)	Low	Siswa
4	Server Leaks Information via "X-Powered-By"	Low	Siswa, Admin
5	X-Content-Type-Options Header Missing	Low	Siswa, Admin
Berdasarkan Tabel 4.23, kerentanan yang ada sebagian besar berkaitan dengan belum diterapkannya perlindungan security header pada aplikasi Next.js yang berjalan.
4.4.3.2 Evaluasi dan Perbaikan Keamanan Sistem
Pada pengujian keamanan pertama, ditemukan 2 alert dengan tingkat risiko Medium (Content Security Policy (CSP) Header Not Set dan Missing Anti-clickjacking Header). Temuan dengan tingkat risiko Medium menjadi fokus utama dalam proses evaluasi dan perbaikan karena memiliki tingkat risiko yang lebih tinggi dibandingkan dengan temuan Low dan Informational. Sementara itu, temuan dengan tingkat Low dan Informational tidak menjadi fokus utama, namun sebagian besar dapat diselesaikan bersamaan dengan perbaikan tingkat Medium melalui konfigurasi security header di berkas next.config.ts.
Langkah perbaikan yang dilakukan:
	Content Security Policy (CSP) Header Not Set: Diperbaiki dengan mendeklarasikan header CSP Content-Security-Policy untuk membatasi pemuatan skrip dan sumber daya.
	Missing Anti-clickjacking Header: Diperbaiki dengan mengimplementasikan mekanisme anti-clickjacking, dengan penambahan direktif frame-ancestors pada konfigurasi CSP atau header X-Frame-Options agar situs tidak dapat disisipkan ke dalam iframe oleh pihak eksternal.
	Low Alerts (X-Powered-By & X-Content-Type-Options): Diperbaiki secara bersamaan melalui konfigurasi bawaan pelenyapan header X-Powered-By di Next.js dan penerapan X-Content-Type-Options: nosniff.
Setelah perbaikan diimplementasikan, sistem dijalankan ulang dan dilakukan penetration testing tahap kedua (Siklus 2) untuk mengevaluasi efektivitas perbaikan.
4.4.3.3 Hasil Penetration Testing Setelah Perbaikan (Siklus 2)
Pengujian keamanan tahap lanjutan (Siklus 2) menggunakan ZAP menghasilkan laporan terbaru. Hasil pengujian ulang menunjukkan bahwa kerentanan lama terkait absennya Security Headers dasar (seperti ketiadaan CSP sama sekali, celah clickjacking karena hilangnya X-Frame-Options, kebocoran header X-Powered-By, dan absennya X-Content-Type-Options) berhasil dihilangkan secara sempurna (100% tuntas).
Namun, setelah Content Security Policy (CSP) diterapkan, sistem deteksi ZAP mulai memicu inspeksi strict dan menghasilkan peringatan baru. Laporan terakhir menstabilkan sisa temuan menjadi 5 alert dengan tingkat risiko Medium. Peningkatan jumlah peringatan ini murni merupakan imbas dari penerapan izin khusus di dalam konfigurasi CSP (seperti unsafe-inline dan unsafe-eval) yang terdeteksi oleh ZAP sebagai kelonggaran directive.
Tabel 4.24 Hasil Pengujian ZAP (Siklus 2)
No	Jenis Kerentanan	Risk	Status Perbaikan / Keterangan
1	Content Security Policy (CSP) Header Not Set	Medium	Tuntas (Siklus 1 Terselesaikan)
2	Missing Anti-clickjacking Header	Medium	Tuntas (Siklus 1 Terselesaikan)
3	Server Leaks Info (X-Powered-By)	Low	Tuntas (Siklus 1 Terselesaikan)
4	X-Content-Type-Options Missing	Low	Tuntas (Siklus 1 Terselesaikan)
5	CSP: Failure to Define Directive with No Fallback	Medium	Temuan Baru (Imbas Aturan CSP)
6	CSP: Wildcard Directive	Medium	Temuan Baru (Imbas Aturan CSP)
7	CSP: script-src unsafe-eval	Medium	Temuan Baru (Imbas Aturan CSP)
8	CSP: script-src unsafe-inline	Medium	Temuan Baru (Imbas Aturan CSP)
9	CSP: style-src unsafe-inline	Medium	Temuan Baru (Imbas Aturan CSP)
10	Big Redirect Detected	Low	Masih Ditemukan (Khusus Siswa)
4.4.3.4 Justifikasi Mitigasi dan Evaluasi Hasil (Expert Judgement)
Dalam pengujian keamanan berbasis Dynamic Application Security Testing (DAST) menggunakan OWASP ZAP, penulis menemukan perubahan dinamika alert antara Siklus 1 dan Siklus 2. Berikut adalah landasan teknis terkait tindakan mitigasi dan hasil yang didapatkan:
a. Alasan Dilakukannya Perbaikan (Mitigasi)
Pada Siklus 1, pemindaian mengidentifikasi ketiadaan pengamanan pada lapisan HTTP (Missing Security Headers). Mitigasi wajib dilakukan karena ketiadaan Content Security Policy (CSP) dan Anti-clickjacking (X-Frame-Options) membuka celah secara masif terhadap serangan eksploitasi klien seperti Cross-Site Scripting (XSS) dan penyusupan iframe berbahaya. Oleh karena itu, penulis melakukan injeksi Security Headers pada konfigurasi server utama (next.config.ts) sebagai bentuk implementasi security best practices yang disarankan oleh standar OWASP.
b. Alasan Mengapa Hasil (Alert) Bertambah di Siklus 2
Peningkatan jumlah kerentanan Medium Risk dari 2 menjadi 5 alert pada Siklus 2 bukan mengindikasikan penurunan tingkat keamanan aplikasi, melainkan perubahan parameter evaluasi oleh mesin scanner ZAP. Setelah header CSP diimplementasikan pada mitigasi pertama, ZAP mulai mengaktifkan modul inspeksi ketat (Strict CSP Checker). Pemindai mendeteksi bahwa aturan CSP yang diterapkan oleh penulis memberikan kelonggaran (izin) pada eksekusi perintah unsafe-inline dan unsafe-eval. ZAP, yang menggunakan standar pengujian web statis konvensional, secara otomatis melabeli kelonggaran ini sebagai kerentanan tingkat menengah (Medium Risk).
c. Alasan Temuan Dibiarkan (Status: Acceptable Risk / False Positive)
Kelima alert Medium terkait CSP pada Siklus 2 diputuskan untuk tidak diubah (dibiarkan) dan diklasifikasikan sebagai Acceptable Risk (risiko yang dapat diterima) serta False Positive berdasarkan pertimbangan arsitektur perangkat lunak. Aplikasi UTBK ini dikembangkan menggunakan arsitektur modern berbasis React dan Next.js (SPA - Single Page Application). Arsitektur ini memiliki karakteristik fundamental sebagai berikut:
	Client-Side Rendering & Hydration: React membutuhkan injeksi komponen secara langsung (DOM Manipulation) yang secara inheren membutuhkan izin unsafe-inline untuk memproses script dan sintaks styling (CSS) secara dinamis di sisi klien.
	Modern Bundler (Webpack/Turbopack): Fitur krusial seperti Hot Module Replacement (HMR) dan evaluasi kode di sisi klien (termasuk analytics) sangat bergantung pada instruksi unsafe-eval.
Jika pemaksaan standar ketat ZAP (menghilangkan izin unsafe-inline dan unsafe-eval) diterapkan, aplikasi Next.js akan mengalami malfungsi fatal (blank screen) karena framework kehilangan akses esensial untuk me-render antarmuka pengguna. Dengan demikian, konfigurasi CSP yang diterapkan saat ini merupakan titik optimal (trade-off) yang paling realistis antara penerapan keamanan HTTP dan pemenuhan spesifikasi kebutuhan operasional arsitektur Next.js.
4.4.4 Uji Beban (Stress Testing)
Pengujian beban (Stress Testing) dilakukan untuk mengukur batas ketahanan (resilience) peladen backend dan pangkalan data PostgreSQL ketika diakses oleh ratusan siswa yang mengumpulkan ujian (Submit Tryout) secara bersamaan. Pengujian ini difokuskan pada infrastruktur database karena proses pengumpulan ujian memicu transaksi data yang berat (heavy write transaction).
a. Skenario Uji Tanpa Connection Pooling (Titik Kegagalan)
Pada siklus uji pertama, sistem disimulasikan menerima 500 koneksi serentak (concurrent connections) menggunakan konfigurasi standar PostgreSQL. Hasilnya, tingkat keberhasilan (Success Rate) adalah 0%. Seluruh koneksi ditolak dengan pesan kesalahan sistem FATAL: sorry, too many clients already. Kegagalan ini terjadi karena ambang batas koneksi simultan bawaan PostgreSQL hanya berkisar 100 koneksi. Ketika 500 koneksi datang pada detik yang sama, server kehabisan memori untuk membuka sesi baru dan langsung mengalami Crash/Downtime.
b. Implementasi Middleware PgBouncer
Sebagai bentuk mitigasi arsitektur, penulis mengintegrasikan middleware Connection Pooling PgBouncer pada lapisan database. PgBouncer beroperasi dalam mode transaksi (Transaction Mode), di mana ia menyediakan sebuah "kolam" koneksi fisik ke server yang jumlahnya tetap stabil (misal 50 koneksi). Ketika 500 permintaan masuk, PgBouncer melakukan daur ulang (multiplexing) koneksi-koneksi tersebut dengan sangat cepat secara bergantian.
c. Skenario Uji dengan PgBouncer (Keberhasilan)
Pada siklus uji kedua, pengujian 500 koneksi serentak diulang kembali pada rute API yang mengarah ke direct connection (PgBouncer).
Hasil pengujian menunjukkan:
	Total Permintaan: 500 Requests (ditembakkan dalam 1 detik).
	Tingkat Keberhasilan: 100% (500/500).
	Rata-rata Waktu Respons: Stabil pada ≈10-25 ms.
	Integritas Data: Sempurna, tidak ada peristiwa data ganda (race conditions) atau deadlock.
Hasil ini memvalidasi bahwa peningkatan arsitektur sistem telah memenuhi Kebutuhan Non-Fungsional, khususnya stabilitas dalam menghadapi lonjakan lalu lintas ekstrem (spike traffic) saat pelaksanaan ujian serentak.

PUNYA TIARA
BAB IV.
HASIL DAN PEMBAHASAN
	Implementasi Tampilan Pengguna (User Interface)
	Bagian ini membahas hasil implementasi tampilan antarmuka yang terdapat pada platform Tryout Tes Kemampuan Akademik (TKA) SMA berbasis web yang telah dikembangkan. Setiap tampilan yang ditunjukkan merupakan halaman yang dapat diakses oleh pengguna sesuai dengan hak aksesnya, yaitu siswa  dan Admin. Selain menampilkan hasil implementasi antarmuka, bagian ini juga menjelaskan fungsi dari setiap halaman dan fitur yang tersedia untuk mendukung penggunaan sistem. Berikut merupakan hasil implementasi tampilan antarmuka pengguna pada sistem yang telah dikembangkan.
	Landing Page
 
Gambar 4. 1 Landing Page
Gambar 4.1 menampilkan antarmuka Landing Page yang berfungsi sebagai halaman utama sistem yang dapat diakses oleh pengguna umum sebelum melakukan autentikasi. Hal ini menjadi media untuk memperkenalkan fitur utama sistem Tryout. Pada bagian atas terdapat navigation bar yang menampilkan logo beserta tombol Masuk dan Daftar Gratis sebagai akses menuju proses autentikasi pengguna. Selanjutnya, bagian Hero Section yang menampilkan judul utama serta tombol Mulai Gratis untuk menggunakan aplikasi, di bawah Hero Section terdapat bagian Fitur yang menampilkan tiga keunggulan utama sistem, yaitu Materi Terstruktur, AI Tutor Cerdas, dan Simulasi Nyata, Ketiga fitur tersebut merepresentasikan fungsi utama sistem yang telah dirancang pada tugas akhir ini, yaitu menyediakan materi pembelajaran yang terorganisasi, memberikan bimbingan belajar berbasis ITS, serta cara kerja yang menjelaskan alur penggunaan sistem melalui tiga tahapan yaitu Evaluasi Awal, Intervensi AI, dan Simulasi & Sukses. Halaman ini juga memuat section ajakan berupa tombol Daftar Sekarang yang mengarahkan pengguna menuju halaman registrasi, dan diakhiri dengan bagian footer yang memuat identitas, tautan akses, serta informasi hak cipta. Keseluruhan antarmuka dirancang menggunakan konsep responsive web design sehingga dapat diakses dengan baik melalui berbagai ukuran perangkat.
	Halaman Autentikasi 
	Halaman Login
 
Gambar 4. 2 Halaman Login
Gambar 4.2 menampilkan antarmuka halaman login yang berfungsi sebagai proses autentikasi pengguna yang telah memiliki akun. Halaman ini dapat digunakan oleh seluruh pengguna yang telah memiliki akun, baik siswa maupun Admin, sesuai dengan mekanisme Role Based Access Control (RBAC) yang telah dirancang pada sistem. Antarmuka halaman login terbagi menjadi dua bagian, yaitu bagian kiri yang menampilkan ilustrasi sambutan "Welcome Back" beserta deskripsi singkat mengenai sistem, dan bagian kanan yang menampilkan formulir autentikasi yang berisi kolom alamat email dan password, opsi ingat saya, serta tautan lupa password. Sistem menyediakan dua mekanisme autentikasi, yaitu menggunakan kombinasi email dan password maupun menggunakan akun Google melalui fitur Google Sign-In. Setelah proses autentikasi berhasil dilakukan, sistem akan mengidentifikasi hak akses pengguna dan mengarahkan pengguna menuju dashboard sesuai dengan perannya.
	Halaman Daftar Akun
 
Gambar 4. 3 Halaman Daftar
Gambar 4.3 menampilkan antarmuka halaman Daftar yang berfungsi sebagai sarana registrasi bagi pengguna baru sebelum dapat mengakses seluruh fitur pada sistem. Halaman ini memungkinkan pengguna membuat akun baru menggunakan alamat email maupun melalui akun Google. Antarmuka halaman terbagi menjadi dua bagian, yaitu bagian kiri yang menampilkan ilustrasi "Unlock Potential" beserta deskripsi singkat ajakan untuk pengguna memulai perjalanan belajar, dan bagian kanan menampilkan formulir registrasi berisi kolom nama, email, password, dan konfirmasi password. Pengguna dapat melakukan registrasi dengan menekan tombol “Buat Akun” setelah seluruh data diisi dengan benar. Selain registrasi menggunakan email, sistem juga menyediakan fitur Google Sign-In sehingga proses pendaftaran dapat dilakukan dengan lebih cepat menggunakan akun Google. Setelah proses registrasi berhasil dilakukan, akun akan tersimpan pada basis data dan pengguna dapat melakukan autentikasi untuk mengakses sistem sesuai dengan hak akses yang dimiliki. Bagi pengguna yang telah memiliki akun, sistem menyediakan tautan Masuk untuk berpindah ke halaman login.
	Halaman Lupa Password
Fitur lupa password berfungsi untuk membantu pengguna memulihkan akses akun ketika tidak dapat mengingat password yang digunakan. Proses pemulihan akun terdiri atas tiga tahapan, yaitu pengajuan permintaan reset password melalui halaman lupa password, pengiriman tautan reset password melalui email pengguna yang telah terdaftar, serta proses penggantian password melalui halaman reset password menggunakan tautan yang telah diterima.
	Tahap permintaan Reset Password 
 
Gambar 4. 4 Halaman Lupa Password
Gambar 4.4 menampilkan antarmuka halaman lupa password yang berfungsi untuk mengajukan permintaan penggantian kata password. Pada halaman ini, pengguna diminta memasukkan alamat email yang telah terdaftar pada sistem. Setelah pengguna menekan tombol “Kirim Tautan Reset”, sistem akan melakukan validasi terhadap alamat email yang dimasukkan. Apabila email terdaftar, sistem akan menghasilkan tautan reset password yang bersifat unik kemudian mengirimkannya ke alamat email pengguna. Mekanisme ini bertujuan untuk memastikan bahwa proses penggantian password hanya dapat dilakukan oleh pemilik akun yang sah.
	Email Reset Password
 
Gambar 4. 5 Email Reset Password
Gambar 4.5 menunjukkan email yang dikirimkan sistem setelah permintaan reset password berhasil diproses. Email tersebut berisi informasi mengenai permintaan penggantian password beserta sebuah tautan reset password yang bersifat unik dan memiliki masa berlaku tertentu. Pengguna dapat menekan tautan tersebut untuk diarahkan menuju halaman penggantian password. Penggunaan tautan unik ini bertujuan untuk meningkatkan keamanan proses pemulihan akun sehingga tidak dapat digunakan oleh pihak yang tidak berwenang.
	Halaman Reset Password
 
Gambar 4. 6 Halaman Reset Password
Gambar 4.6 menampilkan antarmuka halaman Reset Password yang diakses melalui tautan yang dikirimkan ke email pengguna. Pada halaman ini, pengguna diminta memasukkan password baru beserta konfirmasi password untuk memastikan kesesuaian data yang diinputkan. Setelah seluruh data berhasil divalidasi, sistem akan memperbarui password pengguna pada basis data. Selanjutnya, pengguna dapat kembali melakukan proses login menggunakan password yang baru sehingga akses terhadap sistem dapat dipulihkan.
	Implementasi Tampilan Role Admin
	Halaman Dashboard Admin
 
Gambar 4. 7 Halaman Dashboard Admin
Gambar 4.7 Menampilkan antarmuka halaman Dashboard Admin yang berfungsi sebagai halaman utama bagi administrator untuk memantau kondisi sistem serta aktivitas pembelajaran secara keseluruhan. Halaman ini menyajikan berbagai informasi penting dalam bentuk ringkasan statistik dan visualisasi data sehingga memudahkan administrator dalam melakukan monitoring terhadap penggunaan sistem. Pada bagian atas halaman terdapat panel sambutan "Halo, Admin!" yang dilengkapi dengan indikator Aktivitas AI Tutor Hari Ini serta tiga tombol Quick Actions, yaitu Kelola Pengguna, Input Soal, dan Monitoring, sehingga administrator dapat mengakses fitur utama dengan lebih cepat. Di bawah panel sambutan, sistem menampilkan empat kartu statistik yang berisi informasi mengenai jumlah siswa yang belajar pada minggu berjalan, jumlah ujian yang telah diselesaikan, total bank soal, serta jumlah mata pelajaran yang tersedia pada sistem. Informasi tersebut diperbarui berdasarkan data yang tersimpan pada basis data sehingga administrator dapat memantau kondisi sistem secara real-time. Selain itu, halaman ini juga menyediakan visualisasi berupa grafik area Aktivitas Ujian (7 Hari Terakhir) yang menggambarkan tren pelaksanaan ujian selama satu minggu terakhir. Grafik tersebut membantu administrator dalam mengidentifikasi pola penggunaan sistem dan tingkat aktivitas pengguna dari waktu ke waktu.
	Halaman Kelola Data Mata Pelajaran
 
 
Gambar 4. 8 Halaman Kelola Mata Pelajaran
Gambar 4.8 menampilkan antarmuka Kelola Mata Pelajaran yang berfungsi sebagai pusat pengelolaan data mata pelajaran pada sistem. Melalui halaman ini, Admin dapat menambahkan, mengubah, maupun menghapus data mata pelajaran yang akan digunakan pada proses pembelajaran dan pelaksanaan Tryout.
Pada bagian atas halaman ditampilkan beberapa kartu statistik yang menyajikan informasi mengenai Total Mata Pelajaran, Kepadatan Subbab, dan Volume Bank Soal. Selain itu, sistem juga menyediakan visualisasi berupa grafik Distribusi Bank Soal serta Tingkat Kelengkapan Mata Pelajaran untuk membantu administrator memantau kesiapan materi pembelajaran. 
Untuk melakukan penambahan data, sistem menyediakan tombol Tambah Mata Pelajaran baru yang akan mengarahkan administrator menuju formulir penambahan mata pelajaran. Sementara itu, seluruh mata pelajaran yang telah tersimpan ditampilkan dalam bentuk cards pada bagian Direktori Mata Pelajaran. 
Setiap kartu menampilkan informasi berupa nama mata pelajaran, kurikulum yang digunakan, status mata pelajaran, jumlah topik, jumlah soal, serta indikator tingkat kelengkapan materi. Administrator juga dapat melakukan pengelolaan data melalui tombol Edit untuk memperbarui informasi mata pelajaran maupun tombol Delete untuk menghapus data mata pelajaran dari sistem.
	Halaman Kelola Topik Materi
 
 
Gambar 4. 9 Halaman Kelola Materi
Gambar 4.9 Menampilkan antarmuka Kelola Topik Materi yang berfungsi untuk mengelola seluruh topik atau subbab materi pembelajaran yang tersedia pada sistem. Halaman ini memungkinkan Admin mengatur struktur materi yang nantinya akan digunakan sebagai dasar penyusunan bank soal serta penyusunan jalur pembelajaran siswa. Pada bagian atas halaman, sistem menampilkan ringkasan statistik berupa Total Topik, Kepadatan Topik, dan Volume Bank Soal. Informasi tersebut didukung oleh grafik Volume Soal per Mata Pelajaran dan Top 10 Topik Terpadat yang memberikan gambaran mengenai distribusi soal pada setiap topik materi.
Admin dapat menambahkan topik baru melalui tombol Tambah Materi Baru yang tersedia pada bagian atas halaman. Selanjutnya, daftar seluruh topik materi ditampilkan dalam bentuk cards yang dilengkapi dengan fitur filter berdasarkan mata pelajaran sehingga memudahkan proses pencarian data.
Setiap kartu menampilkan informasi mengenai nama mata pelajaran, nama topik materi, jumlah soal yang tersedia, serta status kelengkapan materi. Sistem juga menyediakan tombol Edit untuk memperbarui data topik materi dan tombol Delete untuk menghapus topik yang sudah tidak digunakan.
	Halaman Kelola Data Bank Soal
	Halaman Utama Data Bank Soal
 
 
Gambar 4. 10 Halaman Kelola Bank Soal
Gambar 4.10 Menampilkan antarmuka halaman Kelola Bank Soal yang berfungsi sebagai pusat pengelolaan seluruh butir soal yang digunakan pada sistem. Melalui halaman ini, Admin dapat menambahkan, mengubah, menghapus, maupun mencari soal berdasarkan mata pelajaran dan paket soal sehingga proses pengelolaan bank soal menjadi lebih terstruktur. Pada bagian atas halaman ditampilkan ringkasan statistik yang meliputi Volume Bank Soal, Jumlah Paket Tersedia, dan Tipe Soal Dominan. Selain itu, sistem juga menyediakan visualisasi berupa grafik Distribusi Tipe Soal dan Penyebaran Soal per Mata Pelajaran untuk membantu administrator memantau komposisi bank soal yang tersedia.
Untuk menambahkan data soal, sistem menyediakan tombol Tambah Soal yang digunakan untuk memasukkan soal secara manual, serta tombol Template Excel yang digunakan sebagai acuan dalam proses impor soal secara massal. Selanjutnya, pada bagian bawah halaman tersedia Filter Direktori Soal yang memungkinkan administrator melakukan penyaringan berdasarkan paket soal maupun mata pelajaran sehingga proses pencarian data menjadi lebih mudah. Daftar soal ditampilkan dalam bentuk cards yang memuat informasi berupa isi pertanyaan, kategori paket soal, serta tipe soal. Pada setiap kartu juga tersedia tombol Edit untuk memperbarui isi soal dan tombol Delete untuk menghapus soal dari sistem.
	Halaman Tambah/ Preview Soal
 
 
Gambar 4. 11 Halaman Tambah Soal Massal
Gambar 4.11 menampilkan antarmuka Preview dan Edit Soal yang merupakan bagian dari fitur Ekstraksi Soal Massal. Halaman ini berfungsi sebagai tahap validasi hasil ekstraksi soal sebelum data disimpan ke dalam basis data. Pada bagian utama halaman, sistem menampilkan hasil ekstraksi soal yang telah diperoleh dari dokumen Excel dalam bentuk formulir yang dapat diedit. Setiap butir soal menampilkan teks pertanyaan, pilihan jawaban, kunci jawaban, serta informasi pendukung lainnya yang dapat diperiksa kembali oleh administrator. Setiap kolom pertanyaan maupun pilihan jawaban dilengkapi dengan Rich Text Editor sehingga administrator dapat memperbaiki format penulisan, menyesuaikan simbol matematika, maupun melakukan penyuntingan isi soal sebelum proses penyimpanan dilakukan. Pada bagian bawah halaman tersedia informasi mengenai jumlah soal yang berhasil diekstraksi beserta tombol Simpan ke Database untuk menyimpan seluruh soal yang telah diverifikasi, atau tombol Batal untuk membatalkan proses impor apabila masih diperlukan perbaikan.


	Halaman Edit Soal
 
Gambar 4. 12 Halaman Edit Soal
Gambar 4.12 menampilkan antarmuka Edit Soal yang digunakan untuk memperbarui data soal yang telah tersimpan pada sistem. Halaman ini memungkinkan Admin melakukan perubahan terhadap isi soal maupun atribut pendukung lainnya apabila ditemukan kesalahan atau diperlukan pembaruan. Antarmuka halaman dibagi menjadi dua bagian utama. Pada bagian kiri terdapat formulir Teks Pertanyaan yang dilengkapi dengan Rich Text Editor. Editor ini menyediakan berbagai fitur pemformatan seperti pengaturan teks, penyisipan gambar, video, simbol matematika apabila diperlukan.
Pada bagian kanan terdapat panel Pengaturan Soal yang digunakan untuk mengatur atribut soal, seperti tipe soal, mata pelajaran, topik materi, tingkat kesulitan, maupun informasi pendukung lainnya sesuai dengan kebutuhan sistem. Setelah seluruh perubahan selesai dilakukan, Admin dapat menyimpan hasil perubahan sehingga data soal pada basis data diperbarui.

	Halaman Monitoring Aktivitas Siswa
 
Gambar 4. 13 Halaman Monitoring Aktivitas Siswa
Gambar 4.13 menampilkan antarmuka Monitoring Aktivitas Siswa yang berfungsi sebagai media bagi Admin untuk memantau aktivitas belajar dan riwayat pengerjaan ujian siswa pada sistem. Halaman ini menyajikan informasi aktivitas secara terpusat sehingga Admin dapat melihat perkembangan penggunaan sistem oleh seluruh siswa.
Pada bagian atas halaman ditampilkan tombol Real-time Monitoring beserta ringkasan statistik yang meliputi Total Aktivitas, Jumlah Sesi Belajar, dan Jumlah Sesi Tryout yang telah dilakukan oleh siswa. Informasi tersebut memberikan gambaran umum mengenai tingkat penggunaan sistem.
Selanjutnya, sistem menampilkan visualisasi data berupa grafik Distribusi Mode Tryout dan Aktivitas per Mata Pelajaran untuk membantu administrator menganalisis pola penggunaan sistem berdasarkan jenis aktivitas maupun mata pelajaran yang dipelajari.
Pada bagian bawah halaman terdapat daftar Riwayat Aktivitas Siswa yang disajikan dalam bentuk kartu (cards). Setiap kartu menampilkan informasi seperti nama siswa, jenis aktivitas yang dilakukan, mata pelajaran, waktu pelaksanaan, serta skor yang diperoleh. Informasi tersebut membantu administrator melakukan pemantauan terhadap aktivitas pembelajaran siswa secara lebih mudah.
	Halaman Kelola Data Pengguna
 
Gambar 4. 14 Halaman Kelola Data Pengguna
Gambar 4.14 menampilkan antarmuka Kelola Data Pengguna yang berfungsi sebagai media bagi Admin untuk mengelola seluruh akun pengguna yang terdaftar pada sistem. Melalui halaman ini, Admin dapat menambahkan pengguna baru, mengubah data pengguna, mengatur hak akses, maupun menghapus akun yang tidak digunakan.
Pada bagian atas halaman ditampilkan ringkasan informasi mengenai jumlah pengguna berdasarkan masing-masing role yang tersedia pada sistem. Informasi tersebut membantu Admin memantau distribusi pengguna secara keseluruhan. Selanjutnya, daftar pengguna ditampilkan dalam bentuk cards yang memuat informasi identitas pengguna, seperti nama, alamat email, tanggal pendaftaran, dan peran (role) pengguna pada sistem. Pada setiap kartu tersedia beberapa aksi yang dapat dilakukan oleh Admin, yaitu Edit untuk memperbarui data pengguna, Delete untuk menghapus akun pengguna, serta Jadikan Admin untuk mengubah hak akses pengguna menjadi Admin apabila diperlukan. Dengan adanya fitur tersebut, proses pengelolaan akun pengguna dapat dilakukan secara lebih mudah dan terpusat.
	Implementasi Tampilan Role Siswa
	Halaman OnBoarding 
 
Gambar 4. 15 Halaman OnBoarding Siswa
Gambar 4.15 menampilkan antarmuka Halaman OnBoarding yang muncul saat siswa pertama kali menggunakan sistem. Halaman ini berfungsi sebagai tahap awal untuk mengumpulkan informasi mengenai target belajar dan kemampuan awal siswa sebelum memulai proses pembelajaran. Informasi yang diperoleh akan digunakan oleh sistem sebagai dasar dalam menyusun Personal Plan dan menentukan rekomendasi pembelajaran yang bersifat personal. Pada bagian kiri halaman terdapat formulir Preferensi Belajar yang digunakan siswa untuk menentukan target belajar harian serta menjelaskan kendala atau materi yang dirasakan paling sulit melalui kolom “Tantangan Terberat”. Informasi tersebut digunakan sebagai masukan tambahan bagi sistem dalam memberikan rekomendasi pembelajaran.
Pada bagian kanan tersedia formulir nilai Tryout dasar yang digunakan untuk memasukkan nilai awal masing-masing mata pelajaran. Nilai tersebut berfungsi sebagai data awal kemampuan siswa sebelum mengikuti proses pembelajaran pada sistem. Setelah seluruh data diisi, siswa dapat menekan tombol “Simpan & Mulai Belajar” untuk menyimpan preferensi belajar dan melanjutkan ke halaman Dashboard. Data yang telah tersimpan selanjutnya digunakan oleh sistem dalam menyusun Personal Plan dan rekomendasi pembelajaran yang sesuai dengan kondisi masing-masing siswa.
	Halaman Dashboard Siswa
 
Gambar 4. 16 Halaman Dashboard Siswa
Gambar 4.16 menampilkan antarmuka dashboard siswa yang berfungsi sebagai halaman utama setelah siswa berhasil masuk ke dalam sistem. Halaman ini menyajikan ringkasan perkembangan belajar, rekomendasi pembelajaran, serta informasi mengenai aktivitas belajar yang telah dilakukan. Pada bagian atas halaman ditampilkan panel sambutan yang berisi pesan motivasi dan rekomendasi belajar berdasarkan aktivitas siswa sebelumnya. Di sisi kanan panel terdapat tiga indikator yang menampilkan informasi mengenai Total Sesi, Rata-rata Nilai, dan Target Belajar yang telah dicapai siswa.
Selanjutnya sistem menampilkan bagian “Lanjutkan Aktivitas Terakhir” yang berisi riwayat sesi belajar terakhir sehingga siswa dapat melanjutkan pembelajaran yang belum selesai. Di bawahnya terdapat panel Rekomendasi AI Hari Ini yang menampilkan materi yang disarankan untuk dipelajari berdasarkan hasil analisis perkembangan belajar siswa. Pada sisi kanan halaman terdapat panel Personal Plan yang menampilkan progres target belajar harian beserta tombol untuk mengubah target belajar. Selain itu, tersedia panel AI Insights yang memberikan informasi mengenai mata pelajaran maupun topik yang masih perlu ditingkatkan berdasarkan hasil evaluasi pembelajaran sebelumnya.
	Halaman Menu Mode Belajar
 
Gambar 4. 17 Halaman Mode Belajar
Gambar 4.17 menampilkan antarmuka Menu Mode Belajar yang berfungsi sebagai halaman utama untuk memulai sesi pembelajaran ITS. Pada halaman ini, sistem menampilkan Personal Plan yang disusun berdasarkan hasil analisis kemampuan siswa sehingga materi yang dipelajari dapat disesuaikan dengan kebutuhan masing-masing pengguna. Pada bagian atas halaman ditampilkan panel target belajar yang memuat tujuan pembelajaran, target belajar harian, rata-rata skor yang telah diperoleh, serta target nilai yang ingin dicapai. Selain itu, sistem juga menampilkan informasi mengenai alasan penyusunan rekomendasi tersebut sehingga siswa dapat memahami prioritas pembelajaran yang diberikan. 
Selanjutnya, pada bagian bawah halaman ditampilkan daftar mata pelajaran beserta topik materi yang direkomendasikan untuk dipelajari. Penyusunan urutan materi dilakukan berdasarkan hasil analisis Mastery Tracking, Priority Score, dan Forgetting Curve, sehingga topik dengan tingkat penguasaan yang rendah maupun materi yang diperkirakan mulai terlupakan akan memperoleh prioritas lebih tinggi untuk dipelajari kembali. 
Setiap topik materi dilengkapi dengan indikator progres penguasaan serta label prioritas, seperti "Butuh Perhatian", yang membantu siswa mengidentifikasi materi yang perlu dipelajari terlebih dahulu. Melalui halaman ini, siswa dapat menentukan urutan pembelajaran sesuai rekomendasi yang dihasilkan oleh sistem sebelum memulai sesi Mode Belajar.
	Halaman menu Mode Tryout
 
Gambar 4. 18 Halaman Mode Tryout
Gambar 4.18 menampilkan antarmuka Mode Tryout yang berfungsi sebagai halaman persiapan sebelum siswa memulai simulasi ujian. Berbeda dengan Mode Belajar yang menerapkan pendekatan ITS, Mode Tryout dirancang sebagai sarana evaluasi kemampuan siswa secara mandiri tanpa intervensi AI selama proses pengerjaan soal. Pada bagian utama halaman, siswa diminta menentukan dua pengaturan sebelum memulai simulasi, yaitu memilih Mata Pelajaran serta Paket Soal yang akan digunakan. Pengaturan tersebut bertujuan agar sistem dapat menyiapkan soal sesuai dengan pilihan pengguna.
Setelah pengaturan selesai dilakukan, sistem menampilkan informasi bahwa selama sesi Tryout berlangsung fitur AI Tutor akan dinonaktifkan. Dengan demikian, seluruh jawaban yang diberikan siswa sepenuhnya mencerminkan kemampuan individu tanpa memperoleh bantuan berupa petunjuk maupun umpan balik dari AI. Ketentuan ini bertujuan agar hasil evaluasi yang diperoleh dapat digunakan sebagai gambaran kemampuan siswa secara objektif.
Setelah seluruh pengaturan selesai dilakukan, siswa dapat menekan tombol “Mulai Tryout Sekarang” untuk memulai simulasi ujian sesuai dengan mata pelajaran dan paket soal yang telah dipilih.
	Halaman pada Mode Belajar
Halaman ini berfungsi sebagai ruang pembelajaran interaktif yang menerapkan pendekatan ITS. Berbeda dengan Mode Tryout yang digunakan untuk mengevaluasi kemampuan siswa secara mandiri, pada Mode Belajar sistem memberikan pendampingan secara adaptif berdasarkan performa siswa selama mengerjakan soal. Pendampingan tersebut dilakukan melalui tiga tahapan pembelajaran, yaitu Pre-Test, Main-Test, dan Post-Test. 
Pada tahap Pre-Test, sistem mengukur kemampuan awal siswa tanpa memberikan bantuan dari AI Tutor. Hasil evaluasi awal tersebut digunakan sebagai salah satu masukan dalam proses pembelajaran selanjutnya. Selanjutnya, pada tahap Main-Test, AI Tutor mulai diaktifkan untuk memberikan pendampingan secara adaptif menggunakan mekanisme Rule-Based Strategy Selector. Strategi bantuan yang diberikan disesuaikan dengan jumlah percobaan menjawab serta tingkat penguasaan (mastery) siswa terhadap materi. Setelah seluruh proses pembelajaran selesai, siswa akan mengerjakan Post-Test sebagai evaluasi akhir untuk mengetahui perkembangan hasil pengerjaan setelah memperoleh bimbingan dari AI Tutor.
	Halaman Pre-Test
 
Gambar 4. 19 Halaman Pre-Test
Gambar 4.19 menampilkan antarmuka Pre-Test yang merupakan tahap awal pada Mode Belajar. Tahap ini bertujuan untuk mengukur kemampuan awal siswa terhadap topik yang akan dipelajari sebelum sistem memberikan intervensi pembelajaran. Pada bagian atas halaman ditampilkan indikator alur pembelajaran yang terdiri atas Pre-Test, Main-Test, dan Post-Test, sehingga siswa dapat mengetahui tahapan pembelajaran yang sedang dijalankan. Selain itu, sistem juga menampilkan informasi mengenai topik materi beserta nomor soal yang sedang dikerjakan.
Pada bagian utama halaman, sistem menampilkan soal beserta pilihan jawaban yang dapat dipilih oleh siswa. Sementara itu, pada sisi kanan terdapat panel “Penilaian Murni” yang memberikan informasi bahwa AI Tutor belum diaktifkan pada tahap ini. Dengan demikian, siswa mengerjakan seluruh soal berdasarkan kemampuan awal yang dimiliki tanpa memperoleh petunjuk maupun umpan balik dari AI. Jawaban yang diberikan siswa pada tahap Pre-Test selanjutnya digunakan sebagai salah satu dasar dalam proses analisis kemampuan awal sebelum siswa memasuki tahap Main-Test.
	Halaman Main-Test dengan kondisi siswa menjawab soal dengan salah 1x
 
Gambar 4. 20 Halaman Mode Belajar 1x Salah
Gambar 4.20 menampilkan antarmuka Main-Test ketika siswa memberikan jawaban yang salah pada percobaan pertama. Pada kondisi ini, sistem mulai mengaktifkan mekanisme ITS untuk memberikan pendampingan belajar secara adaptif tanpa langsung memberikan jawaban yang benar. Jawaban siswa yang belum tepat ditandai dengan sorotan berwarna merah pada pilihan jawaban. Selanjutnya, sistem menganalisis hasil jawaban menggunakan Rule-Based Strategy Selector dengan mempertimbangkan jumlah percobaan menjawab serta tingkat penguasaan (mastery) siswa terhadap materi yang sedang dipelajari. Berdasarkan hasil analisis tersebut, sistem menghasilkan strategi pembelajaran yang sesuai dan mengirimkan prompt ke LLM melalui Prompt Builder.
AI Tutor kemudian menampilkan Socratic Hint berupa petunjuk yang mengarahkan siswa untuk meninjau kembali konsep yang berkaitan dengan soal tanpa memberikan jawaban secara langsung. Pendekatan ini bertujuan untuk mendorong siswa menemukan jawabannya secara mandiri melalui proses berpikir.
Pada bagian bawah panel AI Tutor, sistem juga menampilkan informasi bahwa siswa masih memiliki satu kesempatan untuk memperbaiki jawabannya. Setelah mempelajari petunjuk yang diberikan, siswa dapat menekan tombol “Coba Jawab Lagi” untuk melakukan percobaan kedua.
	Halaman Main-Test dengan kondisi siswa menjawab soal dengan salah 2x
 
Gambar 4. 21 Halaman Mode Belajar 2x Salah
Gambar 4.21 menampilkan antarmuka Main-Test ketika siswa kembali memberikan jawaban yang salah pada percobaan kedua. Pada kondisi ini, batas maksimum percobaan menjawab telah tercapai sehingga siswa tidak dapat melakukan percobaan berikutnya pada soal yang sama. Sistem kembali melakukan analisis menggunakan Rule-Based Strategy Selector dan menentukan strategi pembelajaran berupa Step-by-Step Guidance. Melalui strategi ini, AI Tutor memberikan penjelasan langkah demi langkah mengenai konsep penyelesaian soal sehingga siswa dapat memahami proses berpikir yang benar tanpa hanya berfokus pada hasil akhir.
Selama proses tersebut, sistem tetap menerapkan mekanisme Blind Mode, sehingga LLM tidak menerima informasi mengenai kunci jawaban yang benar. AI Tutor hanya memperoleh informasi berupa soal, jawaban siswa, jumlah percobaan, serta tingkat penguasaan materi sebagai dasar dalam menghasilkan penjelasan. Dengan demikian, umpan balik yang diberikan tetap berfokus pada proses pembelajaran dan tidak sekadar mengungkapkan jawaban yang benar. Setelah mempelajari penjelasan yang diberikan AI Tutor, siswa dapat melanjutkan proses pembelajaran dengan menekan tombol “Lanjut ke Soal Berikutnya”.
	Halaman Main-Test dengan kondisi siswa menjawab soal dengan benar
 
Gambar 4. 22 Halaman Mode Belajar Jawaban Benar
Gambar 4.22 menampilkan antarmuka Main-Test ketika siswa berhasil memberikan jawaban yang benar. Keberhasilan tersebut ditandai dengan sorotan berwarna hijau pada pilihan jawaban serta notifikasi bahwa jawaban yang diberikan telah sesuai. Pada kondisi ini, AI Tutor tidak hanya memberikan konfirmasi bahwa jawaban siswa benar, tetapi juga menyajikan penjelasan singkat mengenai konsep yang digunakan dalam penyelesaian soal sebagai bentuk penguatan materi (reinforcement). Pendekatan ini bertujuan untuk memperkuat pemahaman siswa terhadap konsep yang telah dikuasai sehingga proses pembelajaran tidak berhenti pada keberhasilan menjawab soal. Setelah menerima umpan balik tersebut, siswa dapat melanjutkan ke soal berikutnya dengan menekan tombol “Lanjut ke Soal Berikutnya”.
	Halaman Post-Test
 
Gambar 4. 23 Halaman Post-Test
Gambar 4.23 menampilkan antarmuka Post-Test yang merupakan tahap akhir pada Mode Belajar. Tahap ini bertujuan untuk mengevaluasi kembali tingkat pemahaman siswa setelah menyelesaikan proses pembelajaran dan memperoleh pendampingan dari AI Tutor pada tahap Main-Test. Pada bagian atas halaman ditampilkan indikator tahapan pembelajaran yang menunjukkan bahwa siswa telah memasuki fase Post-Test. Selanjutnya, sistem menyajikan soal evaluasi beserta pilihan jawaban yang harus dikerjakan secara mandiri oleh siswa.
Sama seperti pada tahap Pre-Test, AI Tutor dinonaktifkan selama proses pengerjaan Post-Test sehingga siswa mengerjakan seluruh soal tanpa memperoleh petunjuk maupun umpan balik dari AI. Pendekatan ini dilakukan agar hasil evaluasi akhir dapat menggambarkan hasil pengerjaan siswa setelah mengikuti proses pembelajaran berbasis ITS.
Setelah seluruh soal selesai dikerjakan, siswa dapat menekan tombol “Kirim Jawaban” untuk mengakhiri sesi pembelajaran dan melanjutkan ke halaman hasil evaluasi.
	Halaman penyelesaian (Finish) pada Mode Belajar
Halaman ini merupakan tampilan akhir yang muncul setelah siswa menyelesaikan seluruh rangkaian pembelajaran pada Mode Belajar, mulai dari Pre-Test, Main-Test, hingga Post-Test. Halaman ini berfungsi sebagai pusat penyajian hasil evaluasi pembelajaran yang mengintegrasikan data performa siswa dengan analisis yang dihasilkan oleh ITS. 
Untuk menyajikan hasil pembelajaran secara komprehensif, sistem menyediakan tiga tab utama, yaitu Ringkasan Hasil, AI Study Report, dan Pembahasan Soal Latihan. Melalui ketiga tab tersebut, siswa tidak hanya memperoleh informasi mengenai nilai akhir, tetapi juga mendapatkan analisis perkembangan belajar, rekomendasi perbaikan, serta pembahasan terhadap setiap soal yang telah dikerjakan.
	Halaman Tab Ringkasan Hasil Mode Belajar
 
Gambar 4. 24 Halaman Tab Ringkasan Hasil Mode Belajar
Gambar 4.24 menampilkan halaman penyelesaian Mode Belajar pada tab Ringkasan Hasil. Halaman ini berfungsi sebagai dashboard evaluasi yang menyajikan ringkasan performa siswa setelah menyelesaikan seluruh tahapan pembelajaran. Pada bagian atas halaman, sistem menampilkan pesan motivasi yang disesuaikan dengan hasil belajar siswa beserta indikator skor akhir berbentuk lingkaran yang menggambarkan capaian pembelajaran secara keseluruhan. Selain itu, sistem juga menampilkan predikat hasil belajar sebagai bentuk interpretasi terhadap nilai yang diperoleh.
Di bawahnya terdapat beberapa kartu informasi yang menyajikan ringkasan hasil Pre-Test, Main-Test, dan Post-Test, sehingga siswa dapat melihat ringkasan hasil pengerjaan pada setiap tahapan pembelajaran. Ringkasan ini memberikan gambaran perkembangan hasil pengerjaan siswa pada tahapan Pre-Test, Main-Test, dan Post-Test selama mengikuti sesi pembelajaran berbasis ITS. Pada bagian bawah halaman tersedia tombol “Kembali ke Dashboard” serta “Ulangi Materi Ini” yang memungkinkan siswa mengulang materi apabila masih ingin memperdalam pemahaman terhadap topik materi tersebut.
	Halaman Tab AI Study Report pada Halaman Penyelesaian Mode Belajar
 
Gambar 4. 25 Halaman Tab AI Study Report pada Halaman Penyelesaian Mode Belajar
Gambar 4.25 menampilkan halaman penyelesaian Mode Belajar pada tab AI Study Report. Tab ini menyajikan laporan pembelajaran yang dihasilkan secara otomatis oleh AI Tutor berdasarkan riwayat pengerjaan soal selama satu sesi pembelajaran. Laporan yang ditampilkan memuat ringkasan performa siswa, konsep yang telah dikuasai, materi yang masih perlu ditingkatkan, serta rekomendasi pembelajaran yang disesuaikan dengan hasil evaluasi siswa. Dalam menghasilkan laporan tersebut, AI memanfaatkan data hasil pembelajaran tanpa mengungkapkan proses internal sistem maupun informasi kunci jawaban yang digunakan selama proses evaluasi.
Selain memberikan evaluasi terhadap hasil belajar, AI Tutor juga menyampaikan saran tindak lanjut yang dapat dijadikan acuan oleh siswa dalam menentukan materi yang perlu dipelajari pada sesi berikutnya. Dengan demikian, laporan ini berfungsi sebagai umpan balik yang bersifat personal untuk membantu siswa memahami perkembangan hasil pembelajaran dan menentukan topik materi yang perlu dipelajari kembali. Pada bagian bawah halaman tetap tersedia tombol “Kembali ke Dashboard” dan “Ulangi Materi Ini” sebagai navigasi lanjutan setelah siswa membaca hasil evaluasi.
	Halaman Tab Pembahasan Soal Latihan pada Halaman Penyelesaian Mode Belajar
 
Gambar 4. 26 Halaman Tab Pembahasan Soal Latihan pada Halaman Penyelesaian Mode Belajar
Gambar 4.26 menampilkan halaman penyelesaian Mode Belajar pada tab Pembahasan Soal Latihan. Halaman ini berfungsi sebagai media refleksi pembelajaran yang memungkinkan siswa meninjau kembali daftar soal yang dikerjakan pada fase Main-Test, yaitu tahap ketika AI Tutor memberikan pendampingan selama proses pembelajaran. Daftar soal ditampilkan secara berurutan disertai informasi mengenai status jawaban, jumlah percobaan yang dilakukan pada setiap soal, serta hasil akhir pengerjaan. Informasi tersebut membantu siswa mengidentifikasi soal-soal yang masih memerlukan perhatian lebih selama proses pembelajaran.
Selain menampilkan riwayat pengerjaan secara umum, sistem juga menyediakan akses pada setiap soal sehingga siswa dapat melihat detail pembahasan secara lebih mendalam. Dengan demikian, siswa dapat melakukan refleksi awal terhadap performa belajarnya sebelum meninjau riwayat percobaan dan umpan balik AI Tutor pada halaman pembahasan soal.
	Halaman Mode Tryout
 
Gambar 4. 27 Halaman Mode Tryout
Gambar 4.27 menampilkan antarmuka halaman pengerjaan soal pada Mode Tryout yang berfungsi sebagai sarana evaluasi kemampuan siswa melalui simulasi ujian berbatas waktu. Berbeda dengan Mode Belajar yang menerapkan pendampingan menggunakan ITS, pada Mode Tryout seluruh soal dikerjakan secara mandiri tanpa bantuan AI Tutor sehingga hasil yang diperoleh dapat menggambarkan kemampuan siswa secara objektif. Pada bagian atas halaman, sistem menampilkan informasi mata pelajaran yang sedang dikerjakan, indikator nomor soal, progress bar, serta countdown timer yang menunjukkan sisa waktu pengerjaan. Seluruh komponen tersebut membantu siswa memantau progres selama mengikuti simulasi ujian.
Pada bagian utama, sistem menampilkan soal beserta pilihan jawaban yang dapat dipilih oleh siswa. Jawaban yang dipilih akan diberikan penanda visual sehingga siswa dapat mengetahui pilihan yang sedang aktif sebelum berpindah ke soal berikutnya.
Berbeda dengan Mode Belajar, pada sisi kanan halaman tidak ditampilkan panel AI Tutor, melainkan panel Navigasi Soal yang berisi daftar nomor soal. Panel ini memudahkan siswa berpindah ke soal tertentu sekaligus menampilkan status pengerjaan setiap soal melalui indikator warna, yaitu hijau untuk soal yang telah dijawab, kuning untuk posisi soal yang sedang dikerjakan, dan abu-abu untuk soal yang belum dijawab. Setelah seluruh soal selesai dikerjakan atau waktu pengerjaan berakhir, sistem secara otomatis melakukan proses penilaian dan menampilkan hasil evaluasi yang selanjutnya digunakan sebagai bagian dari analisis perkembangan belajar siswa.
	Halaman Analitik Siswa
Halaman ini berfungsi sebagai dashboard analitik pembelajaran yang menyajikan hasil pengolahan data aktivitas belajar siswa. Melalui halaman ini, siswa dapat memantau perkembangan belajar, mengevaluasi performa pengerjaan soal, mengidentifikasi materi yang masih perlu ditingkatkan, serta melihat rekomendasi pembelajaran yang dihasilkan berdasarkan Learning Analytics.


	Halaman Ringkasan
 
Gambar 4. 28 Halaman Ringkasan Analitik
Gambar 4.28 menampilkan antarmuka halaman Analitik & Evaluasi pada tab Ringkasan. Halaman ini berfungsi menyajikan gambaran menyeluruh mengenai perkembangan belajar siswa berdasarkan data yang dikumpulkan selama menggunakan sistem. Pada bagian atas halaman, sistem menampilkan panel Insight Analisis Cerdas yang berisi ringkasan evaluasi dan rekomendasi pembelajaran yang dihasilkan AI Tutor berdasarkan aktivitas belajar siswa. Di bawahnya ditampilkan beberapa indikator performa, seperti Akurasi Keseluruhan, Kemandirian Belajar, dan Aktivitas Belajar Mingguan sebagai ringkasan perkembangan siswa.
Selanjutnya, sistem menampilkan panel Fokus Perbaikan (Titik Lemah) yang mengidentifikasi topik dengan tingkat penguasaan (mastery) terendah. Identifikasi tersebut dihasilkan melalui proses Mastery Tracking, sehingga sistem dapat menunjukkan materi yang perlu diprioritaskan untuk dipelajari kembali. Pada bagian bawah halaman, sistem menyajikan Pemetaan Penguasaan untuk setiap mata pelajaran beserta visualisasi Radar Kemampuan. Visualisasi ini membantu siswa membandingkan tingkat penguasaan antar mata pelajaran sehingga perkembangan belajar dapat dipahami dengan lebih mudah.
	Halaman Tren dan Grafik 
 
Gambar 4. 29 Halaman Tren dan Grafik
Gambar 4.29 menampilkan halaman Analitik & Evaluasi pada tab Tren & Grafik. Halaman ini berfungsi untuk memvisualisasikan perkembangan performa belajar siswa berdasarkan riwayat aktivitas yang tersimpan pada sistem. Pada bagian atas halaman, sistem menampilkan panel Perbandingan Mode yang menyajikan perbandingan performa siswa antara Mode Belajar dan Mode Tryout, meliputi rata-rata skor serta jumlah sesi yang telah diselesaikan pada masing-masing mode. Informasi ini membantu siswa memahami perbedaan capaian belajar selama memperoleh pendampingan AI Tutor maupun ketika mengerjakan evaluasi secara mandiri.
Selanjutnya, sistem menyajikan grafik Tren Skor Keseluruhan yang menampilkan perubahan nilai siswa dari waktu ke waktu berdasarkan riwayat pengerjaan. Visualisasi ini memungkinkan siswa mengamati pola perkembangan belajar, perubahan performa pada setiap sesi. Pada bagian kanan halaman, sistem juga menampilkan panel Aktivitas 7 Hari Terakhir yang merangkum intensitas aktivitas belajar siswa selama satu minggu terakhir. Data tersebut menjadi salah satu indikator untuk membantu siswa memantau konsistensi belajar sebagai bagian dari Learning Analytics yang diterapkan pada sistem.
	Halaman Evaluasi Soal
 
Gambar 4. 30 Halaman Evaluasi Soal
Gambar 4.30 menampilkan halaman Analitik & Evaluasi pada tab Evaluasi Soal. Halaman ini berfungsi sebagai pusat riwayat pengerjaan soal yang memungkinkan siswa meninjau kembali seluruh aktivitas evaluasi yang pernah dilakukan pada sistem. Pada bagian atas halaman, sistem menyediakan fitur penyaringan (filter) berdasarkan jenis mode, yaitu Mode Belajar, Mode Tryout, maupun seluruh riwayat pengerjaan. fitur ini memudahkan siswa dalam menemukan sesi evaluasi yang ingin ditinjau kembali.
Riwayat pengerjaan ditampilkan dalam bentuk kartu (cards) yang dikelompokkan berdasarkan mata pelajaran. Setiap kartu memuat informasi berupa tanggal pengerjaan, jenis mode, nama topik materi atau paket soal, skor akhir, serta tombol “Pembahasan” untuk melihat rincian hasil evaluasi. Melalui halaman ini, siswa dapat memilih salah satu sesi pembelajaran maupun Tryout untuk melihat pembahasan soal secara lebih rinci, sehingga proses evaluasi tidak hanya berfokus pada nilai akhir, tetapi juga pada proses memahami kembali materi yang telah dipelajari.
	Halaman Pembahasan Soal 
Halaman ini berfungsi sebagai media evaluasi lanjutan yang memungkinkan siswa meninjau kembali hasil pengerjaan soal setelah menyelesaikan sesi Mode Belajar maupun Mode Tryout. Sistem menyediakan tab filter untuk membedakan riwayat dari kedua mode tersebut sehingga siswa dapat memilih sesi yang ingin dipelajari kembali.
Setelah memilih salah satu mata pelajaran dan materi yang tersedia, siswa dapat mengakses halaman pembahasan secara rinci melalui tombol “Pembahasan”. Halaman ini menyajikan informasi yang berbeda antara Mode Belajar dan Mode Tryout sesuai dengan mekanisme pembelajaran yang diterapkan pada masing-masing mode.



	Halaman Detail Pembahasan Mode Belajar
 
Gambar 4. 31 Halaman Detail Pembahasan Mode Belajar
Gambar 4.31 menampilkan halaman Detail Pembahasan Mode Belajar yang berfungsi sebagai media evaluasi bagi siswa setelah menyelesaikan seluruh rangkaian Mode Belajar, yang terdiri atas fase Pre-Test, Main-Test, dan Post-Test. Pada halaman ini, sistem menampilkan daftar soal beserta riwayat jawaban pada setiap fase pembelajaran. Khusus pada fase Main-Test, sistem juga menyajikan riwayat percobaan menjawab beserta umpan balik yang diberikan oleh AI Tutor, seperti Socratic Hint dan Step-by-Step Guidance, sesuai dengan hasil pengerjaan siswa selama proses pembelajaran. Melalui halaman ini, siswa dapat meninjau kembali proses pengerjaan soal, membandingkan hasil pada setiap fase pembelajaran, serta memahami konsep yang telah dipelajari melalui pembahasan yang disediakan. Pada bagian kanan halaman, sistem menyediakan Navigasi Soal yang memudahkan siswa berpindah ke soal lain serta menampilkan status hasil pengerjaan setiap soal melalui indikator warna.
	Halaman Detail Pembahasan Mode Tryout
 
Gambar 4. 32 Halaman Pembahasan Mode Tryout
Gambar 4.32 menampilkan halaman Detail Pembahasan Mode Tryout yang berfungsi sebagai media evaluasi setelah siswa menyelesaikan sesi Mode Tryout. Pada halaman ini, sistem menampilkan daftar soal beserta riwayat jawaban dan pembahasan untuk setiap butir soal. Berbeda dengan Mode Belajar, setiap soal hanya memiliki satu riwayat jawaban karena selama proses Tryout siswa hanya diberikan satu kesempatan untuk menjawab tanpa pendampingan AI Tutor. Melalui halaman ini, siswa dapat meninjau kembali hasil pengerjaan, memahami pembahasan setiap soal, serta mengetahui jawaban yang benar sebagai bahan evaluasi setelah simulasi ujian selesai. Pada bagian kanan halaman, sistem menyediakan Navigasi Soal yang memudahkan siswa berpindah ke soal lain serta menampilkan status hasil pengerjaan setiap soal melalui indikator warna.


	Implementasi AI Tutor
Implementasi AI Tutor pada platform Tryout TKA berbasis ITS dilakukan untuk memberikan bantuan pembelajaran adaptif berdasarkan kondisi jawaban siswa. Sistem menentukan bentuk bantuan yang diberikan berdasarkan status jawaban dan jumlah percobaan siswa. AI Tutor memanfaatkan LLM untuk menghasilkan respons pembelajaran berdasarkan konteks soal, jawaban siswa, jumlah percobaan, dan hasil analisis sistem.
	Halaman tampilan soal dan jawaban siswa 
 
Gambar 4. 33 Halaman Tampilan Soal dan Jawaban Siswa
	Gambar 4.33 menunjukkan halaman pengerjaan soal pada Mode Belajar. Pada tahap ini siswa mengerjakan soal dan mengirimkan jawaban ke sistem. Setelah tombol “Kirim Jawaban” dipilih, sistem melakukan evaluasi terhadap jawaban siswa menggunakan mekanisme pemeriksaan jawaban yang telah diimplementasikan. Hasil evaluasi tersebut digunakan untuk menentukan status jawaban (benar atau salah), memperbarui data pembelajaran pada Student Model, serta menentukan strategi pendampingan yang akan diberikan oleh AI Tutor pada tahap berikutnya.

	Implementasi AI Tutor pada Jawaban Salah Pertama
 
Gambar 4. 34 Implementasi AI Tutor pada Percobaan Pertama (Jawaban Salah)
	Gambar 4.34 menampilkan log proses AI Tutor ketika siswa memberikan jawaban yang salah pada percobaan pertama. Setelah sistem mendeteksi jawaban belum benar, sistem mengambil informasi jumlah percobaan (attempt count) serta tingkat penguasaan materi (mastery) yang tersimpan pada Student Model. Berdasarkan data tersebut, Rule-Based Strategy Selector menentukan strategi pembelajaran yang sesuai. Pada contoh ini, siswa memiliki nilai mastery sebesar 50% sehingga termasuk kategori Pemula, sehingga sistem memilih strategi Socratic Hint. Selanjutnya, Prompt Builder menyusun prompt berdasarkan informasi soal, jawaban siswa, nilai mastery, dan strategi yang dipilih, kemudian mengirimkannya ke LLM melalui layanan AI. 
	Log pada Gambar 4.34 memperlihatkan proses penyusunan prompt, pengiriman permintaan ke LLM, serta respons yang dihasilkan. Respons tersebut kemudian ditampilkan kepada siswa dalam bentuk petunjuk yang mengarahkan siswa menemukan konsep penyelesaian tanpa memberikan jawaban akhir secara langsung sesuai mekanisme Blind Mode.
	Implementasi AI Tutor pada Jawaban Salah Kedua
 
Gambar 4. 35 Implementasi AI Tutor pada Percobaan Kedua
Gambar 4.35 menampilkan log proses AI Tutor ketika siswa kembali memberikan jawaban yang salah pada percobaan kedua. Sistem mendeteksi bahwa jumlah percobaan telah mencapai batas maksimum sehingga Rule-Based Strategy Selector mengubah strategi pembelajaran menjadi Step-by-Step Guidance. Selanjutnya Prompt Builder menyusun prompt berdasarkan strategi tersebut dan mengirimkannya ke LLM. Log pada gambar 4.35 memperlihatkan proses penyusunan prompt, pengiriman permintaan, serta respons yang dihasilkan oleh LLM. Respons kemudian ditampilkan kepada siswa dalam bentuk panduan penyelesaian secara bertahap untuk membantu memahami konsep penyelesaian soal. Setelah respons diberikan, sistem mengunci percobaan pada soal tersebut sehingga siswa tidak dapat melakukan percobaan kembali dan diarahkan untuk melanjutkan ke soal berikutnya.


	Implementasi AI Tutor pada Jawaban Benar
 
Gambar 4. 36 Implementasi AI Tutor pada Jawaban Benar
Gambar 4.36 menampilkan log proses AI Tutor ketika siswa berhasil memberikan jawaban yang benar. Setelah sistem memverifikasi bahwa jawaban sesuai dengan kunci jawaban, sistem tidak menjalankan strategi Instructional Scaffolding karena siswa telah berhasil menyelesaikan soal secara mandiri. Selanjutnya AI Tutor menghasilkan respons berupa feedback positif sebagai bentuk penguatan terhadap pemahaman siswa. Log pada gambar 4.36 menunjukkan proses penyusunan prompt, pengiriman permintaan ke LLM, serta respons yang dihasilkan sebelum ditampilkan kepada siswa. Setelah proses tersebut selesai, sistem memperbarui data pembelajaran, seperti nilai accuracy dan mastery, yang selanjutnya digunakan sebagai dasar pembaruan Learning Analytics dan Personal Plan pada sesi pembelajaran berikutnya.

	Implementasi Learning Analytics 
 
 
Gambar 4. 37 Pembaruan Learning Analytics dan Personal Plan setelah respons
Gambar 4.37 menampilkan proses pembaruan Learning Analytics dan Personal Plan setelah AI Tutor selesai memberikan respons kepada siswa. Setelah proses evaluasi jawaban selesai, sistem secara otomatis memperbarui data pembelajaran pada Student Model, termasuk nilai accuracy dan mastery berdasarkan hasil pengerjaan terbaru. 
Nilai mastery yang telah diperbarui selanjutnya digunakan sebagai salah satu dasar dalam proses penyusunan kembali rekomendasi pembelajaran pada fitur Personal Plan. Sistem menghitung kembali Priority Score setiap materi sehingga urutan rekomendasi belajar selalu menyesuaikan perkembangan kemampuan siswa. Selain itu, sistem juga mempertimbangkan waktu terakhir materi dipelajari melalui mekanisme Forgetting Curve sehingga materi yang telah lama tidak dipelajari dapat kembali diprioritaskan untuk dipelajari ulang.
Dengan mekanisme tersebut, Learning Analytics dapat menampilkan perkembangan kemampuan siswa secara berkelanjutan, sedangkan Personal Plan mampu menghasilkan rekomendasi materi yang lebih adaptif sesuai kondisi pembelajaran terkini.
