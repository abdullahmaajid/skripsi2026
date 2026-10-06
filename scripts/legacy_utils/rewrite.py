def main():
    content = """### 3.3.2 Activity Diagram

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

"""
    import re
    with open('/Users/abdullahmaajid/Downloads/polariusmain/projects/utbkapp/docs/skripsi/bab3.md', 'r') as f:
        lines = f.readlines()
        
    start_idx = -1
    end_idx = -1
    for i, line in enumerate(lines):
        if line.startswith('### 3.3.2 Activity Diagram'):
            start_idx = i
        elif line.startswith('### 3.3.3 Perancangan Basis Data'):
            end_idx = i
            break
            
    if start_idx != -1 and end_idx != -1:
        tail = lines[end_idx:]
        tail_text = ''.join(tail)
        tail_text = re.sub(r'Gambar 3\.66\b', 'Gambar 3.66', tail_text)
        tail_text = re.sub(r'Gambar 3\.65\b', 'Gambar 3.65', tail_text)
        tail_text = re.sub(r'Gambar 3\.64\b', 'Gambar 3.64', tail_text)
        
        new_lines = lines[:start_idx] + [content, '\n\n'] + [tail_text]
        with open('/Users/abdullahmaajid/Downloads/polariusmain/projects/utbkapp/docs/skripsi/bab3.md', 'w') as f:
            f.writelines(new_lines)
        print("Success")
    else:
        print("Could not find boundaries")

if __name__ == '__main__':
    main()
