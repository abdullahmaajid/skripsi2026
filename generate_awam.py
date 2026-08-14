import os

content = """# Alur Penggunaan Aplikasi Lexica UTBK (Versi Cerita Awam)

Dokumen ini menjelaskan alur cerita bagaimana setiap pihak berinteraksi di dalam platform Lexica UTBK sehari-hari. Kita akan melihat secara jelas apa yang dilakukan oleh **Siswa**, bagaimana **Sistem** merespons, dan kapan **AI Tutor** ikut campur membantu siswa. Seluruh 35 alur (Siswa & Admin) telah dijabarkan di bawah ini.

---

## 👨‍🎓 Bagian 1: Pengalaman Belajar Siswa (Student)

### 1. Masuk ke Aplikasi (Login & Lihat Learning Overview)
- **Siswa** membuka aplikasi, memasukkan email beserta kata sandi, lalu menekan tombol "Login".
- **Sistem** mengecek apakah data tersebut benar. Jika cocok, **Sistem** akan mengarahkan siswa ke halaman utama (Dashboard).
- Di halaman Dashboard, **Sistem** menyajikan ringkasan data, seperti nilai tryout sejauh ini dan progres belajar.
- **Siswa** kemudian melihat dan membaca ringkasan belajarnya tersebut.

### 2. Memilih Materi Belajar (Lihat Learning Path)
- **Siswa** mengeklik menu "Learning Path" di pinggir layar.
- **Sistem** memproses permintaan tersebut dan menampilkan peta jalan belajar siswa yang berisi daftar mata pelajaran dan bab-bab materi.
- **Siswa** melihat-lihat dan memilih bab mana yang ingin dipelajari hari ini.

### 3. Mengerjakan Latihan Bab
- **Siswa** memilih bab yang ingin dilatih.
- **Sistem** menampilkan lembar soal di layar utama dan memunculkan panel *AI Tutor* di sebelah kanan.
- **AI Tutor** bersiap-siap (*standby*) menunggu interaksi.
- **Siswa** (secara opsional) bisa bertanya di chat panel AI sebelum menebak jawaban. Jika ditanya, **AI Tutor** merespons dengan memberikan petunjuk tipis (*hint*) tanpa membocorkan kunci jawaban.
- **Siswa** memilih opsi A/B/C/D/E dan mengeklik tombol "Jawab".
- **Sistem** langsung mengecek kebenaran jawaban tersebut.
  - **Jika salah (Percobaan 1):** **Sistem** memunculkan peringatan kuning "Kesempatan Terakhir". **AI Tutor** otomatis mengirim chat: *"Hai! Jawabanmu masih kurang tepat. Butuh petunjuk?"* **Siswa** bisa langsung menebak ulang, atau membalas chat **AI Tutor** untuk berdiskusi dulu.
  - **Jika salah (Percobaan 2 / Habis):** **Sistem** mengubah status soal menjadi "Dilewati". **AI Tutor** otomatis mengirim chat: *"Sayang sekali, masih salah. Mari kita bedah bareng-bareng!"* **Siswa** tidak bisa menjawab lagi, namun bisa berdiskusi, lalu wajib mengeklik "Lanjut" ke soal berikutnya.
  - **Jika benar:** **Sistem** memunculkan notifikasi "Benar!" dan tombol "Lihat Pembahasan AI". **AI Tutor** otomatis mengirim chat: *"Hebat! Coba ceritakan kenapa kamu memilih jawaban itu."* **Siswa** bisa mengobrol santai atau klik lihat pembahasan. Setelah puas, **Siswa** mengeklik tombol "Lanjut".
- Setelah semua soal habis, **Sistem** menampilkan Layar Hasil Akhir yang berisi rekapitulasi nilai.

### 4. Lihat Pembahasan Dari Hasil Belajar
- Di layar hasil, **Siswa** mengeklik tombol "Lihat Pembahasan".
- **Sistem** menampilkan halaman evaluasi berisi navigasi daftar soal, status jawaban, dan kunci.
- **Siswa** memilih nomor soal mana yang ingin dilihat penjelasannya.
- **Sistem** menampilkan detail soal tersebut.
- **Siswa** mengeklik tombol "Tanya Pembahasan AI".
- **AI Tutor** merespons dengan memberikan penjabaran konsep langkah-demi-langkah.
- **Siswa** mengirim chat balasan, dan **AI Tutor** membalas secara interaktif (terus berulang).
- Setelah paham, **Siswa** mengeklik keluar dari halaman pembahasan.

### 5. Ulangi Latihan
- Di layar hasil, **Siswa** mengeklik tombol "Ulangi Latihan".
- **Sistem** segera menghapus/mereset riwayat sesi tadi dan memuat soal dari nomor 1 lagi.
- **Siswa** mulai mengerjakan soal dari awal lagi.

### 6. Pilih Subtes Lain (dari Sesi Selesai)
- Di layar hasil, **Siswa** mengeklik tombol "Pilih Subtes Lain".
- **Sistem** mengarahkan layar kembali ke halaman Learning Path.
- **Siswa** bebas memilih modul atau subtes pelajaran lainnya.

### 7. Lihat Paket Tryout
- **Siswa** membuka menu Try Out di sidebar.
- **Sistem** menarik data ujian dari server dan menampilkan daftar paket tryout SNBT yang bisa diikuti.
- **Siswa** melihat-lihat jadwal dan paket yang tersedia.

### 8. Mengerjakan Tryout
- **Siswa** memilih satu paket ujian, lalu mengeklik "Mulai".
- **Sistem** menyiapkan lembar soal simulasi dan mulai menjalankan hitung mundur waktu (timer).
- **Siswa** membaca soal, memilih jawaban, dan berpindah soal menggunakan tombol "Selanjutnya" (bisa juga mencentang status "Ragu-ragu").
- Setelah ujian selesai, **Siswa** mengeklik "Kumpulkan" (atau **Sistem** akan mengumpulkan otomatis jika waktu habis).
- **Sistem** memproses hasil menggunakan metode perhitungan rumus IRT yang kompleks untuk mengukur skor.
- **Sistem** menampilkan skor akhir ke layar.

### 9. Lihat Review Jawaban & Bahas dengan AI Tutor (Tryout)
- Dari layar hasil Tryout, **Siswa** mengeklik "Lihat Review Jawaban".
- **Sistem** menampilkan lembar review soal.
- **Siswa** mengeklik tombol "Bahas dengan AI Tutor".
- **AI Tutor** membuka panel chat dan masuk ke mode "Socratic" (menjadi guru yang memancing pemikiran siswa).
- **Siswa** merespons, dan **AI Tutor** akan menganalisis miskonsepsi (kesalahpahaman) siswa secara mendalam.

### 10A. Navigasi Fleksibel Modul Rapor & Evaluasi
- **Siswa** mengeklik menu "Rapor & Evaluasi".
- **Sistem** memuat halaman khusus (Analytics).
- **Siswa** bebas memilih untuk masuk ke tab "Rapor & Tren", "Evaluasi Soal", atau "Peluang Lolos".
- **Sistem** langsung mengubah tampilan layar sesuai tab yang dipilih oleh **Siswa**.

### 10B. Lihat Analisis Kemampuan (Rapor & Tren)
- **Siswa** mengeklik tab "Rapor & Tren".
- **Sistem** mengkalkulasi selisih nilai siswa dengan target kampusnya secara otomatis.
- **Sistem** menampilkan Diagram Radar (jaring laba-laba), grafik tren nilai Tryout naik/turun, dan rincian kelemahan per subtes.

### 11. Lihat Bank Soal Salah (Evaluasi Soal)
- **Siswa** mengeklik tab "Evaluasi Soal".
- **Sistem** mengumpulkan semua soal yang pernah dijawab salah atau ragu-ragu oleh siswa dari seluruh latihannya, lalu menampilkannya sebagai "Bank Soal Salah".
- **Siswa** meninjau kartu-kartu soal sulit tersebut.

### 12. Lihat Bahas Soal dari Bank Soal Salah
- **Siswa** mengeklik tombol "Bahas AI" pada salah satu kartu soal di Bank Soal Salah.
- **Sistem** membuka Panel AI.
- **AI Tutor** menyapa siswa dan memuat konteks soal tersebut.
- **Siswa** berdiskusi dengan **AI Tutor** hingga paham.

### 13. Lihat Peluang Lolos (Chancing Engine)
- **Siswa** mengeklik tab "Peluang Lolos".
- **Sistem** menjalankan mesin *Chancing Engine* untuk membandingkan skor siswa saat ini dengan rata-rata nilai masuk PTN sasaran.
- **AI Tutor** menganalisis angkanya dan memberikan rekomendasi jurusan alternatif jika target dinilai rawan.
- **Sistem** menyajikan persentase tingkat kelulusan di layar.

### 14. Lihat Detail Salah Satu Jurusan Target
- **Siswa** mengeklik kartu jurusan (Misalnya: Kedokteran UI).
- **Sistem** memunculkan jendela timbul (*popup*) yang berisi statistik kuota, jumlah peminat, serta prioritas bobot subtes yang perlu dikejar.
- **AI Tutor** memberikan saran strategi belajar khusus untuk menembus jurusan tersebut.

### 15. Bahas Soal Dalam Aplikasi (Ruang Tutor AI)
- **Siswa** mengeklik menu "Ruang Tutor AI".
- **Sistem** menampilkan arsip seluruh bank soal aplikasi (Katalog Soal).
- **Siswa** mengeklik tombol "Bahas" pada salah satu soal.
- **AI Tutor** langsung menyapa di panel chat.
- **Siswa** dan **AI Tutor** berdiskusi interaktif terkait soal arsip tersebut.

### 16. Bahas Soal Luar Aplikasi (Custom Input)
- Di dalam Ruang Tutor AI, **Siswa** mengetik bebas atau menempel (*copy-paste*) naskah soal dari luar aplikasi (seperti tugas sekolah) ke dalam kolom chat.
- **Siswa** mengeklik tombol "Kirim".
- **AI Tutor** secara cerdas menganalisis struktur pertanyaan liar tersebut, lalu membalas dengan langkah-langkah penjelasan serta kunci jawaban yang tepat.

### 17. Mengubah Pengaturan Profil & Target
- **Siswa** membuka menu "Pengaturan Profil & Target".
- **Sistem** menampilkan formulir berisi data diri dan 2 pilihan jurusan target UTBK.
- **Siswa** mengubah jurusan targetnya ke kampus lain, lalu mengeklik "Simpan Perubahan".
- **Sistem** memvalidasi dan menyimpan data tersebut ke dalam server.
- **Sistem** memunculkan notifikasi "Profil berhasil disimpan!".

### 18. Lihat Subtes (Practice / Quick Drill)
- **Siswa** mengeklik menu "Practice" (Latihan Cepat).
- **Sistem** memuat mode *Quick Drill* dan menyajikan kartu kategori subtes (misal: Literasi Bahasa Indonesia).
- **Siswa** meninjau kategori mana yang ingin dipakai pemanasan.

### 19. Mengerjakan Subtes (Practice / Quick Drill)
- **Siswa** mengeklik tombol "Drill Sekarang" di salah satu subtes.
- **Sistem** secara acak menyiapkan kumpulan soal dan langsung menampilkannya.
- Mulai dari sini, alurnya sama persis dengan Mengerjakan Latihan Bab (Nomor 3): **Sistem** mengecek 2 kesempatan, dan **AI Tutor** mendampingi sepanjang soal.

---

## 👨‍💻 Bagian 2: Pengalaman Administrator (Admin)

### 1. Login & Lihat Learning Overview (Admin Dashboard)
- **Admin** memasukkan email dan password di halaman login khusus, lalu menekan "Login".
- **Sistem** memverifikasi bahwa akun tersebut punya hak akses 'ADMIN'.
- **Sistem** lalu membuka Dashboard khusus admin yang menampilkan statistik tingkat tinggi (total pengguna, soal, rata-rata skor).

### 2. Lihat User (Manajemen User)
- **Admin** mengeklik menu "Kelola Pengguna".
- **Sistem** menarik data dari database dan menyajikannya dalam tabel berisi daftar seluruh siswa terdaftar.
- **Admin** memantau status keaktifan dan persebaran rata-rata nilai siswa secara global.

### 3. Lihat Daftar Soal (Bank Soal & Kurikulum)
- **Admin** mengeklik menu "Kelola Soal".
- **Sistem** menampilkan daftar ribuan soal utuh lengkap dengan tipe dan nilai bobot IRT-nya.
- **Admin** meninjau daftar pertanyaan-pertanyaan tersebut.

### 4. Lihat Daftar Bab (Chapters)
- **Admin** bergeser ke tab "Daftar Bab".
- **Sistem** menampilkan tabel daftar semua bab (misal: Pecahan, Silogisme, dll).
- **Admin** meninjau susunan materi bab.

### 5. Lihat Daftar Mata Pelajaran (Mapel)
- **Admin** bergeser ke tab "Mata Pelajaran".
- **Sistem** menampilkan tabel ketujuh subtes resmi UTBK.
- **Admin** meninjau pengelompokkan pelajarannya.

### 6. Tambah Soal
- **Admin** mengeklik tombol "Tambah Soal".
- **Sistem** memunculkan formulir isian panjang.
- **Admin** mengetik naskah pertanyaan, opsi jawaban A sampai E, menandai kunci jawaban, memberi bobot kesulitan, dan mengetik pembahasan teks. Kemudian mengeklik "Simpan".
- **Sistem** menyuntikkan data soal baru tersebut ke dalam server agar bisa langsung dikerjakan **Siswa**.

### 7. Tambah Bab
- **Admin** mengeklik tombol "Tambah Bab".
- **Admin** mengetikkan nama bab baru dan memilih masuk ke mapel apa.
- **Sistem** menyimpan daftar bab baru.

### 8. Tambah Mata Pelajaran
- **Admin** mengeklik tombol "Tambah Mata Pelajaran".
- **Admin** mengisi nama pelajaran (Jika suatu saat ada kurikulum baru).
- **Sistem** menyimpan matpel baru tersebut ke database.

### 9. Edit Soal
- **Admin** mengeklik ikon pensil (Edit) pada baris salah satu soal.
- **Sistem** memuat data soal lama ke dalam formulir.
- **Admin** merevisi pertanyaan yang keliru ketik, lalu menekan "Simpan".
- **Sistem** menimpa data lama dengan data baru yang sudah direvisi.

### 10. Edit Bab
- **Admin** mengeklik tombol edit di salah satu bab.
- **Admin** memperbaiki nama babnya.
- **Sistem** memperbarui namanya di database.

### 11. Edit Mata Pelajaran
- **Admin** mengeklik tombol edit di daftar mapel.
- **Admin** mengoreksi nama mapelnya.
- **Sistem** memperbaruinya.

### 12. Hapus Soal
- **Admin** mengeklik ikon tempat sampah pada baris soal.
- **Sistem** memunculkan peringatan pop-up "Yakin ingin menghapus?".
- **Admin** mengeklik "Ya, Hapus".
- **Sistem** melenyapkan soal tersebut selamanya dari aplikasi.

### 13. Hapus Bab
- **Admin** mengeklik ikon hapus pada bab.
- **Sistem** meminta konfirmasi. Setelah disetujui, **Sistem** menghapus bab tersebut.

### 14. Hapus Mata Pelajaran
- **Admin** mengeklik ikon hapus pada mapel.
- **Sistem** meminta konfirmasi. Setelah disetujui, **Sistem** menghapus mapel tersebut beserta segala hierarki di bawahnya.

### 15. Lihat Daftar Universitas (Kelola PTN/Prodi)
- **Admin** membuka menu "Kelola PTN/Prodi".
- **Sistem** menampilkan tabel besar berisi nama-nama kampus dari seluruh Indonesia.
- **Admin** memantau daftar tersebut.

### 16. Lihat Daftar Prodi (Kelola PTN/Prodi)
- **Admin** bergeser ke tab "Daftar Prodi".
- **Sistem** menampilkan ribuan daftar jurusan kuliah lengkap dengan skor batas amannya (*passing grade*).
- **Admin** memantau daftar jurusan.

### 17. Tambah Universitas
- **Admin** mengeklik tombol "Tambah Universitas".
- **Admin** memasukkan nama kampus baru (misalnya ITB), lalu klik Simpan.
- **Sistem** merekam data kampus baru tersebut ke database.

### 18. Tambah Prodi
- **Admin** mengeklik tombol "Tambah Prodi".
- **Admin** mengisi nama prodi (misalnya Ilmu Komputer), kuota tahun ini, jumlah saingan, dan menautkannya ke Universitas ITB. Lalu klik Simpan.
- **Sistem** menyimpan data jurusan baru tersebut untuk dipakai kalkulasi Chancing Engine.

### 19. Edit Universitas
- **Admin** mengedit nama kampus yang mungkin salah ketik.
- **Sistem** memperbaruinya di server.

### 20. Edit Prodi
- **Admin** mengedit data prodi (misal: memperbarui jumlah kuota mahasiswa yang berkurang di tahun ini).
- **Sistem** memperbarui data statistiknya di server.

### 21. Hapus Universitas
- **Admin** menekan hapus pada nama kampus, mengonfirmasi, dan **Sistem** menghapusnya secara permanen.

### 22. Hapus Prodi
- **Admin** menekan hapus pada nama jurusan, mengonfirmasi, dan **Sistem** menghapusnya dari daftar ketersediaan pendaftaran.

### 23. Lihat Daftar Tryout
- **Admin** membuka menu "Kelola Tryout".
- **Sistem** menampilkan jadwal dan kumpulan paket Tryout SNBT (dari gelombang 1 sampai gelombang terakhir).

### 24. Tambah Tryout
- **Admin** mengeklik tombol "Tambah Tryout Baru".
- **Admin** mengetikkan nama paket (misalnya "Tryout Akbar Maret") dan tanggal pelaksanaannya.
- **Sistem** membuat cangkang paket ujian baru yang masih kosong (belum ada soalnya).

### 25. Tambah Subtes Tryout
- Ke dalam cangkang ujian yang masih kosong, **Admin** mengeklik "Tambah Subtes" dan memilih blok soal apa saja yang akan masuk ke paket tersebut.
- **Sistem** merangkai blok-blok soal tersebut menjadi satu paket Tryout utuh.

### 26. Edit Tryout
- **Admin** mengeklik edit untuk memundurkan tanggal mulai Tryout.
- **Sistem** merevisi jadwalnya.

### 27. Edit Subtes Tryout
- **Admin** mengedit pengaturan subtes (misalnya mengganti susunan bab yang diujikan).
- **Sistem** merevisi kerangka ujiannya.

### 28. Hapus Tryout
- **Admin** menghapus sebuah paket Tryout secara utuh (mungkin karena sudah terlalu lawas).
- **Sistem** membersihkan data pelaksanaan Tryout tersebut dari layar **Siswa**.

### 29. Hapus Subtes Tryout
- **Admin** mencopot satu subtes dari dalam paket Tryout.
- **Sistem** melepaskan kaitan soal tersebut dari paket Tryout tanpa menghapus soalnya dari Bank Soal utama.

### 30. Lihat Statistik Ringkasan Platform
- **Admin** membuka halaman "Analytics Admin".
- **Sistem** merender bagan visual yang menunjukkan total aktivitas akses server secara real-time.

### 31. Lihat Statistik Evaluasi Ujian
- **Admin** berpindah ke tab "Ujian".
- **Sistem** merangkum sebaran nilai kurva normal (*bell curve*) dari seluruh nilai ujian peserta.
- **Admin** menganalisis apakah ujian bulan ini terlalu sulit atau terlalu gampang.

### 32. Lihat Statistik Target Siswa
- **Admin** berpindah ke tab "Target Siswa".
- **Sistem** menyortir data kampus apa yang paling difavoritkan oleh pengguna secara real-time.
- **Admin** melihat minat pengguna bulan ini.

### 33. Lihat Statistik Token & AI
- **Admin** berpindah ke tab "API & AI".
- **Sistem** melaporkan data pemakaian token *prompt* dari interaksi **AI Tutor** (berguna untuk pantauan biaya operasional ChatGPT API).

### 34. Lihat Pengaturan System Admin
- **Admin** mengeklik tombol "Pengaturan Situs".
- **Sistem** menampilkan panel kontrol konfigurasi (misalnya bobot perhitungan, sistem blokir, dan *toggle* batas token AI).

### 35. Ubah Pengaturan System Admin
- **Admin** menggeser tuas *toggle* dan mengubah pengaturan sistem.
- **Sistem** langsung memberlakukan aturan baru tersebut ke seluruh aplikasi Lexica UTBK pada detik itu juga.

"""

with open("/Users/abdullahmaajid/Downloads/polariusmain/projects/utbkapp/docs/skripsi/actdiagramawam.md", "w") as f:
    f.write(content)

print("Done")
