# Alur Penggunaan Aplikasi Lexica UTBK (Versi Cerita Awam)

Dokumen ini menjelaskan alur cerita bagaimana setiap pihak berinteraksi di dalam platform Lexica UTBK sehari-hari. Kita akan melihat secara jelas apa yang dilakukan oleh **Siswa**, bagaimana **Sistem** merespons, dan kapan **AI Tutor** ikut campur membantu siswa. Jika ada percabangan alur, pilihan akan dijabarkan menggunakan format "Opsi" dan "Konektor". Seluruh 55 alur diagram (19 untuk Siswa & 35 untuk Admin) telah dijabarkan di bawah ini.

---

## 👨‍🎓 Bagian 1: Pengalaman Belajar Siswa (Student)

### 1. Masuk ke Aplikasi (Login & Lihat Learning Overview)
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Siswa** membuka aplikasi, memasukkan email beserta kata sandi, lalu menekan tombol "Login".
- **Sistem** mengecek apakah data tersebut benar. Jika cocok, **Sistem** akan mengarahkan siswa ke halaman utama (Dashboard).
- Di halaman Dashboard, **Sistem** menyajikan ringkasan data, seperti nilai tryout sejauh ini dan progres belajar.
- **Siswa** kemudian melihat dan membaca ringkasan belajarnya tersebut.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 2. Memilih Materi Belajar (Lihat Learning Path)
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Siswa** mengeklik menu "Learning Path" di pinggir layar.
- **Sistem** memproses permintaan tersebut dan menampilkan peta jalan belajar siswa yang berisi daftar mata pelajaran dan bab-bab materi.
- **Siswa** melihat-lihat dan memilih bab mana yang ingin dipelajari hari ini.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 3. Mengerjakan Latihan Bab
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Siswa** memilih bab yang ingin dilatih.
- **Sistem** menampilkan lembar soal di layar utama dan memunculkan panel *AI Tutor* di sebelah kanan.
- **AI Tutor** bersiap-siap (*standby*) menunggu interaksi.
- **Siswa** memiliki cabang pilihan awal:
  - **Opsi 1 (Opsional):** Bertanya di chat panel AI sebelum menebak jawaban $ightarrow$ (**AI Tutor** merespons dengan memberikan petunjuk tipis/*hint*, lalu siswa kembali ke pilihan menebak).
  - **Opsi 2 (Wajib):** Memilih opsi A/B/C/D/E dan mengeklik tombol "Jawab" $ightarrow$ (Melangkah ke proses pengecekan jawaban oleh **Sistem**).
- **Sistem** langsung mengecek kebenaran jawaban tersebut.
  - **Jika salah (Percobaan 1):** **Sistem** memunculkan peringatan kuning "Kesempatan Terakhir". **AI Tutor** otomatis mengirim chat (*hint*). **Siswa** memiliki cabang pilihan:
    - **Opsi 1:** Langsung menjawab ulang $ightarrow$ (Kembali ke proses pengecekan jawaban oleh **Sistem**).
    - **Opsi 2:** Membalas chat **AI Tutor** untuk berdiskusi dulu $ightarrow$ (Siswa berdiskusi dengan AI dan tetap berada di soal ini, sebelum akhirnya menebak ulang).
  - **Jika salah (Percobaan 2 / Habis):** **Sistem** mengubah status soal menjadi "Dilewati". **AI Tutor** otomatis mengirim chat evaluasi. **Siswa** memiliki cabang pilihan:
    - **Opsi 1:** Berdiskusi dengan **AI Tutor** untuk mencari tahu kesalahannya $ightarrow$ (Siswa tertahan berdiskusi di soal ini).
    - **Opsi 2:** Langsung mengeklik "Lanjut" $ightarrow$ (Sistem berpindah dan memuat lembar soal berikutnya).
  - **Jika benar:** **Sistem** memunculkan notifikasi "Benar!" dan tombol "Lihat Pembahasan AI". **AI Tutor** otomatis mengirim chat apresiasi. **Siswa** memiliki cabang pilihan:
    - **Opsi 1:** Mengobrol dengan **AI Tutor** $ightarrow$ (Siswa tertahan berdiskusi di soal ini).
    - **Opsi 2:** Mengeklik tombol "Lihat Pembahasan AI" $ightarrow$ (Siswa tertahan membaca pembahasan di soal ini).
    - **Opsi 3 (Wajib):** Mengeklik tombol "Lanjut" $ightarrow$ (Sistem berpindah dan memuat lembar soal berikutnya).
- Setelah semua soal habis (atau di-Next sampai soal terakhir), **Sistem** menampilkan Layar Hasil Akhir yang berisi rekapitulasi nilai.
- **Siswa** dihadapkan pada 3 percabangan aksi akhir:
  - **Opsi 1:** Mengeklik "Ulangi Latihan" $ightarrow$ **(Konektor A)** mengarah ke *Alur Nomor 5*.
  - **Opsi 2:** Mengeklik "Lihat Pembahasan" $ightarrow$ **(Konektor B)** mengarah ke *Alur Nomor 4*.
  - **Opsi 3:** Mengeklik "Pilih Subtes Lain" $ightarrow$ **(Konektor C)** mengarah ke *Alur Nomor 6*.
- **Status Akhir Alur:** [Konektor A / B / C (Lanjut ke Alur Lain)]

### 4. Lihat Pembahasan Dari Hasil Belajar
- **Status Awal Alur:** [Konektor B (Lanjutan dari Alur Nomor 3)]
- Di layar hasil, **Siswa** mengeklik tombol "Lihat Pembahasan".
- **Sistem** menampilkan halaman evaluasi berisi navigasi daftar soal, status jawaban, dan kunci.
- **Siswa** dihadapkan pada percabangan interaksi yang akan terus me-loop (berputar):
  - **Opsi 1:** Memilih nomor soal lain di navigasi $ightarrow$ (Sistem memuat detail soal baru tersebut dan siswa bebas berinteraksi lagi).
  - **Opsi 2:** Mengeklik tombol "Tanya Pembahasan AI" $ightarrow$ (**AI Tutor** memberikan penjabaran konsep dan siswa tetap di soal ini).
  - **Opsi 3:** Mengirim chat balasan bebas $ightarrow$ (**AI Tutor** membalas secara interaktif dan siswa tetap di soal ini).
  - **Opsi 4:** Mengeklik "Keluar/Kembali" dari halaman pembahasan $ightarrow$ (Menutup mode review dan mengakhiri alur ini).
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 5. Ulangi Latihan
- **Status Awal Alur:** [Konektor A (Lanjutan dari Alur Nomor 3)]
- Di layar hasil, **Siswa** mengeklik tombol "Ulangi Latihan".
- **Sistem** segera menghapus/mereset riwayat sesi tadi dan memuat soal dari nomor 1 lagi.
- **Siswa** mulai mengerjakan soal dari awal lagi.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 6. Pilih Subtes Lain (dari Sesi Selesai)
- **Status Awal Alur:** [Konektor C (Lanjutan dari Alur Nomor 3)]
- Di layar hasil, **Siswa** mengeklik tombol "Pilih Subtes Lain".
- **Sistem** mengarahkan layar kembali ke halaman Learning Path.
- **Siswa** bebas memilih modul atau subtes pelajaran lainnya.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 7. Lihat Paket Tryout
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Siswa** membuka menu Try Out di sidebar.
- **Sistem** menarik data ujian dari server dan menampilkan daftar paket tryout SNBT yang bisa diikuti.
- **Siswa** melihat-lihat jadwal dan paket yang tersedia.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 8. Mengerjakan Tryout
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Siswa** memilih satu paket ujian, lalu mengeklik "Mulai".
- **Sistem** menyiapkan lembar soal simulasi dan mulai menjalankan hitung mundur waktu (timer).
- **Siswa** membaca soal dan dihadapkan pada aksi navigasi:
  - **Opsi 1:** Memilih jawaban dan mengeklik "Selanjutnya" $ightarrow$ (Sistem menyimpan jawaban dan berpindah ke soal berikutnya).
  - **Opsi 2:** Mengeklik "Sebelumnya" $ightarrow$ (Sistem berpindah mundur ke soal sebelumnya).
  - **Opsi 3:** Mencentang kotak "Ragu-ragu" $ightarrow$ (Sistem memberi tanda peringatan kuning pada nomor navigasi soal tersebut).
- Setelah ujian selesai, **Siswa** mengeklik "Kumpulkan" (atau **Sistem** akan mengumpulkan otomatis jika waktu habis).
- **Sistem** memproses hasil menggunakan metode perhitungan rumus IRT yang kompleks untuk mengukur skor.
- **Sistem** menampilkan skor akhir ke layar.
- **Siswa** dihadapkan pada 2 percabangan aksi akhir:
  - **Opsi 1:** Mengeklik "Lihat Review Jawaban" $ightarrow$ **(Konektor A)** mengarah ke *Alur Nomor 9 (Mode Tampilan)*.
  - **Opsi 2:** Mengeklik "Bahas dengan AI Tutor" $ightarrow$ **(Konektor B)** mengarah ke *Alur Nomor 9 (Mode Chat Socratic)*.
- **Status Akhir Alur:** [Konektor A / B (Lanjut ke Alur Lain)]

### 9. Lihat Review Jawaban & Bahas dengan AI Tutor (Tryout)
- **Status Awal Alur:** [Konektor A & B (Lanjutan dari Alur Nomor 8)]
- **Siswa** masuk ke halaman Review Tryout.
- **Sistem** menampilkan lembar review soal.
- **Siswa** mengeklik tombol "Bahas dengan AI Tutor".
- **AI Tutor** membuka panel chat dan masuk ke mode "Socratic" (menjadi guru yang memancing pemikiran siswa).
- **Siswa** merespons, dan **AI Tutor** akan menganalisis miskonsepsi (kesalahpahaman) siswa secara mendalam.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 10A. Navigasi Fleksibel Modul Rapor & Evaluasi
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Siswa** mengeklik menu "Rapor & Evaluasi".
- **Sistem** memuat halaman khusus (Analytics).
- **Siswa** dihadapkan pada 3 percabangan tab yang bisa dipindah kapan saja secara bebas:
  - **Opsi 1:** Tab "Rapor & Tren" $ightarrow$ **(Konektor A)** mengarah ke *Alur Nomor 10B*.
  - **Opsi 2:** Tab "Evaluasi Soal" $ightarrow$ **(Konektor B)** mengarah ke *Alur Nomor 11*.
  - **Opsi 3:** Tab "Peluang Lolos" $ightarrow$ **(Konektor C)** mengarah ke *Alur Nomor 13*.
- **Sistem** langsung mengubah tampilan layar sesuai tab yang dipilih oleh **Siswa**.
- **Status Akhir Alur:** [Konektor A / B / C (Lanjut ke Alur Lain)]

### 10B. Lihat Analisis Kemampuan (Rapor & Tren)
- **Status Awal Alur:** [Konektor A (Lanjutan dari Alur Nomor 10A)]
- **Siswa** berada di tab "Rapor & Tren".
- **Sistem** mengkalkulasi selisih nilai siswa dengan target kampusnya secara otomatis.
- **Sistem** menampilkan Diagram Radar (jaring laba-laba), grafik tren nilai Tryout naik/turun, dan rincian kelemahan per subtes.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 11. Lihat Bank Soal Salah (Evaluasi Soal)
- **Status Awal Alur:** [Konektor B (Lanjutan dari Alur Nomor 10A)]
- **Siswa** berada di tab "Evaluasi Soal".
- **Sistem** mengumpulkan semua soal yang pernah dijawab salah atau ragu-ragu oleh siswa dari seluruh latihannya, lalu menampilkannya sebagai "Bank Soal Salah".
- **Siswa** meninjau kartu-kartu soal sulit tersebut.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 12. Lihat Bahas Soal dari Bank Soal Salah
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Siswa** mengeklik tombol "Bahas AI" pada salah satu kartu soal di Bank Soal Salah.
- **Sistem** membuka Panel AI.
- **AI Tutor** menyapa siswa dan memuat konteks soal tersebut.
- **Siswa** berdiskusi dengan **AI Tutor** hingga paham.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 13. Lihat Peluang Lolos (Chancing Engine)
- **Status Awal Alur:** [Konektor C (Lanjutan dari Alur Nomor 10A)]
- **Siswa** berada di tab "Peluang Lolos".
- **Sistem** menjalankan mesin *Chancing Engine* untuk membandingkan skor siswa saat ini dengan rata-rata nilai masuk PTN sasaran.
- **AI Tutor** menganalisis angkanya dan memberikan rekomendasi jurusan alternatif jika target dinilai rawan.
- **Sistem** menyajikan persentase tingkat kelulusan di layar.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 14. Lihat Detail Salah Satu Jurusan Target
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Siswa** mengeklik kartu jurusan (Misalnya: Kedokteran UI).
- **Sistem** memunculkan jendela timbul (*popup*) yang berisi statistik kuota, jumlah peminat, serta prioritas bobot subtes yang perlu dikejar.
- **AI Tutor** memberikan saran strategi belajar khusus untuk menembus jurusan tersebut.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 15. Bahas Soal Dalam Aplikasi (Ruang Tutor AI)
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Siswa** mengeklik menu "Ruang Tutor AI".
- **Sistem** menampilkan arsip seluruh bank soal aplikasi (Katalog Soal).
- **Siswa** mengeklik tombol "Bahas" pada salah satu soal.
- **AI Tutor** langsung menyapa di panel chat.
- **Siswa** dan **AI Tutor** berdiskusi interaktif terkait soal arsip tersebut.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 16. Bahas Soal Luar Aplikasi (Custom Input)
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- Di dalam Ruang Tutor AI, **Siswa** mengetik bebas atau menempel (*copy-paste*) naskah soal dari luar aplikasi (seperti tugas sekolah) ke dalam kolom chat.
- **Siswa** mengeklik tombol "Kirim".
- **AI Tutor** secara cerdas menganalisis struktur pertanyaan liar tersebut, lalu membalas dengan langkah-langkah penjelasan serta kunci jawaban yang tepat.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 17. Mengubah Pengaturan Profil & Target
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Siswa** membuka menu "Pengaturan Profil & Target".
- **Sistem** menampilkan formulir berisi data diri dan 2 pilihan jurusan target UTBK.
- **Siswa** mengubah jurusan targetnya ke kampus lain, lalu mengeklik "Simpan Perubahan".
- **Sistem** memvalidasi dan menyimpan data tersebut ke dalam server.
- **Sistem** memunculkan notifikasi "Profil berhasil disimpan!".
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 18. Lihat Subtes (Practice / Quick Drill)
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Siswa** mengeklik menu "Practice" (Latihan Cepat).
- **Sistem** memuat mode *Quick Drill* dan menyajikan kartu kategori subtes (misal: Literasi Bahasa Indonesia).
- **Siswa** meninjau kategori mana yang ingin dipakai pemanasan.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 19. Mengerjakan Subtes (Practice / Quick Drill)
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Siswa** mengeklik tombol "Drill Sekarang" di salah satu subtes.
- **Sistem** secara acak menyiapkan kumpulan soal dan langsung menampilkannya.
- Mulai dari sini, alurnya sama persis dengan Mengerjakan Latihan Bab (Nomor 3): **Sistem** mengecek 2 kesempatan, dan **AI Tutor** mendampingi sepanjang soal. Di akhir sesi, **Siswa** juga akan menemui percabangan Konektor A, B, dan C.
- **Status Akhir Alur:** [Konektor A / B / C (Lanjut ke Alur Lain)]

---

## 👨‍💻 Bagian 2: Pengalaman Administrator (Admin)

### 1. Login & Lihat Learning Overview (Admin Dashboard)
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** memasukkan email dan password di halaman login khusus, lalu menekan "Login".
- **Sistem** memverifikasi bahwa akun tersebut punya hak akses 'ADMIN'.
- **Sistem** lalu membuka Dashboard khusus admin yang menampilkan statistik tingkat tinggi (total pengguna, soal, rata-rata skor).
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 2. Lihat User (Manajemen User)
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik menu "Kelola Pengguna".
- **Sistem** menarik data dari database dan menyajikannya dalam tabel berisi daftar seluruh siswa terdaftar.
- **Admin** memantau status keaktifan dan persebaran rata-rata nilai siswa secara global.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 3. Lihat Daftar Soal (Bank Soal & Kurikulum)
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik menu "Kelola Soal".
- **Sistem** menampilkan daftar ribuan soal utuh lengkap dengan tipe dan nilai bobot IRT-nya.
- **Admin** meninjau daftar pertanyaan-pertanyaan tersebut.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 4. Lihat Daftar Bab (Chapters)
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** bergeser ke tab "Daftar Bab".
- **Sistem** menampilkan tabel daftar semua bab (misal: Pecahan, Silogisme, dll).
- **Admin** meninjau susunan materi bab.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 5. Lihat Daftar Mata Pelajaran (Mapel)
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** bergeser ke tab "Mata Pelajaran".
- **Sistem** menampilkan tabel ketujuh subtes resmi UTBK.
- **Admin** meninjau pengelompokkan pelajarannya.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 6. Tambah Soal
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik tombol "Tambah Soal".
- **Sistem** memunculkan formulir isian panjang.
- **Admin** mengetik naskah pertanyaan, opsi jawaban A sampai E, menandai kunci jawaban, memberi bobot kesulitan, dan mengetik pembahasan teks. Kemudian mengeklik "Simpan".
- **Sistem** menyuntikkan data soal baru tersebut ke dalam server agar bisa langsung dikerjakan **Siswa**.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 7. Tambah Bab
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik tombol "Tambah Bab".
- **Admin** mengetikkan nama bab baru dan memilih masuk ke mapel apa.
- **Sistem** menyimpan daftar bab baru.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 8. Tambah Mata Pelajaran
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik tombol "Tambah Mata Pelajaran".
- **Admin** mengisi nama pelajaran (Jika suatu saat ada kurikulum baru).
- **Sistem** menyimpan matpel baru tersebut ke database.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 9. Edit Soal
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik ikon pensil (Edit) pada baris salah satu soal.
- **Sistem** memuat data soal lama ke dalam formulir.
- **Admin** merevisi pertanyaan yang keliru ketik, lalu menekan "Simpan".
- **Sistem** menimpa data lama dengan data baru yang sudah direvisi.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 10. Edit Bab
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik tombol edit di salah satu bab.
- **Admin** memperbaiki nama babnya.
- **Sistem** memperbarui namanya di database.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 11. Edit Mata Pelajaran
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik tombol edit di daftar mapel.
- **Admin** mengoreksi nama mapelnya.
- **Sistem** memperbaruinya.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 12. Hapus Soal
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik ikon tempat sampah pada baris soal.
- **Sistem** memunculkan peringatan pop-up "Yakin ingin menghapus?".
- **Admin** mengeklik "Ya, Hapus".
- **Sistem** melenyapkan soal tersebut selamanya dari aplikasi.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 13. Hapus Bab
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik ikon hapus pada bab.
- **Sistem** meminta konfirmasi. Setelah disetujui, **Sistem** menghapus bab tersebut.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 14. Hapus Mata Pelajaran
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik ikon hapus pada mapel.
- **Sistem** meminta konfirmasi. Setelah disetujui, **Sistem** menghapus mapel tersebut beserta segala hierarki di bawahnya.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 15. Lihat Daftar Universitas (Kelola PTN/Prodi)
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** membuka menu "Kelola PTN/Prodi".
- **Sistem** menampilkan tabel besar berisi nama-nama kampus dari seluruh Indonesia.
- **Admin** memantau daftar tersebut.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 16. Lihat Daftar Prodi (Kelola PTN/Prodi)
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** bergeser ke tab "Daftar Prodi".
- **Sistem** menampilkan ribuan daftar jurusan kuliah lengkap dengan skor batas amannya (*passing grade*).
- **Admin** memantau daftar jurusan.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 17. Tambah Universitas
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik tombol "Tambah Universitas".
- **Admin** memasukkan nama kampus baru (misalnya ITB), lalu klik Simpan.
- **Sistem** merekam data kampus baru tersebut ke database.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 18. Tambah Prodi
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik tombol "Tambah Prodi".
- **Admin** mengisi nama prodi (misalnya Ilmu Komputer), kuota tahun ini, jumlah saingan, dan menautkannya ke Universitas ITB. Lalu klik Simpan.
- **Sistem** menyimpan data jurusan baru tersebut untuk dipakai kalkulasi Chancing Engine.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 19. Edit Universitas
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengedit nama kampus yang mungkin salah ketik.
- **Sistem** memperbaruinya di server.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 20. Edit Prodi
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengedit data prodi (misal: memperbarui jumlah kuota mahasiswa yang berkurang di tahun ini).
- **Sistem** memperbarui data statistiknya di server.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 21. Hapus Universitas
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** menekan hapus pada nama kampus, mengonfirmasi, dan **Sistem** menghapusnya secara permanen.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 22. Hapus Prodi
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** menekan hapus pada nama jurusan, mengonfirmasi, dan **Sistem** menghapusnya dari daftar ketersediaan pendaftaran.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 23. Lihat Daftar Tryout
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** membuka menu "Kelola Tryout".
- **Sistem** menampilkan jadwal dan kumpulan paket Tryout SNBT (dari gelombang 1 sampai gelombang terakhir).
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 24. Tambah Tryout
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik tombol "Tambah Tryout Baru".
- **Admin** mengetikkan nama paket (misalnya "Tryout Akbar Maret") dan tanggal pelaksanaannya.
- **Sistem** membuat cangkang paket ujian baru yang masih kosong (belum ada soalnya).
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 25. Tambah Subtes Tryout
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- Ke dalam cangkang ujian yang masih kosong, **Admin** mengeklik "Tambah Subtes" dan memilih blok soal apa saja yang akan masuk ke paket tersebut.
- **Sistem** merangkai blok-blok soal tersebut menjadi satu paket Tryout utuh.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 26. Edit Tryout
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik edit untuk memundurkan tanggal mulai Tryout.
- **Sistem** merevisi jadwalnya.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 27. Edit Subtes Tryout
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengedit pengaturan subtes (misalnya mengganti susunan bab yang diujikan).
- **Sistem** merevisi kerangka ujiannya.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 28. Hapus Tryout
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** menghapus sebuah paket Tryout secara utuh (mungkin karena sudah terlalu lawas).
- **Sistem** membersihkan data pelaksanaan Tryout tersebut dari layar **Siswa**.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 29. Hapus Subtes Tryout
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mencopot satu subtes dari dalam paket Tryout.
- **Sistem** melepaskan kaitan soal tersebut dari paket Tryout tanpa menghapus soalnya dari Bank Soal utama.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 30. Lihat Statistik Ringkasan Platform
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** membuka halaman "Analytics Admin".
- **Sistem** merender bagan visual yang menunjukkan total aktivitas akses server secara real-time.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 31. Lihat Statistik Evaluasi Ujian
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** berpindah ke tab "Ujian".
- **Sistem** merangkum sebaran nilai kurva normal (*bell curve*) dari seluruh nilai ujian peserta.
- **Admin** menganalisis apakah ujian bulan ini terlalu sulit atau terlalu gampang.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 32. Lihat Statistik Target Siswa
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** berpindah ke tab "Target Siswa".
- **Sistem** menyortir data kampus apa yang paling difavoritkan oleh pengguna secara real-time.
- **Admin** melihat minat pengguna bulan ini.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 33. Lihat Statistik Token & AI
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** berpindah ke tab "API & AI".
- **Sistem** melaporkan data pemakaian token *prompt* dari interaksi **AI Tutor** (berguna untuk pantauan biaya operasional ChatGPT API).
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 34. Lihat Pengaturan System Admin
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** mengeklik tombol "Pengaturan Situs".
- **Sistem** menampilkan panel kontrol konfigurasi (misalnya bobot perhitungan, sistem blokir, dan *toggle* batas token AI).
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]

### 35. Ubah Pengaturan System Admin
- **Status Awal Alur:** [Lingkaran Hitam Penuh (Mulai Baru)]
- **Admin** menggeser tuas *toggle* dan mengubah pengaturan sistem.
- **Sistem** langsung memberlakukan aturan baru tersebut ke seluruh aplikasi Lexica UTBK pada detik itu juga.
- **Status Akhir Alur:** [Lingkaran Hitam Sempurna (Selesai)]
