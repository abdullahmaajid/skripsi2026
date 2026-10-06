# BAB V
KESIMPULAN DAN SARAN

5.1 Kesimpulan
Berdasarkan hasil perancangan, implementasi, dan pengujian sistem Tryout Ujian Tulis Berbasis Komputer - Seleksi Nasional Berdasarkan Tes (UTBK SNBT) berbasis web menggunakan framework Next.js dengan integrasi Large Language Model (LLM) sebagai Intelligent Tutoring System (ITS) serta pemodelan Item Response Theory (IRT), maka dapat diperoleh beberapa kesimpulan sebagai berikut.

1. Tugas Akhir ini berhasil mengembangkan aplikasi Tryout UTBK SNBT berbasis web menggunakan arsitektur modern Next.js dengan menerapkan konsep Intelligent Tutoring System (ITS). Sistem menyediakan dua mode, yaitu Mode Belajar yang dilengkapi AI Tutor sebagai pendamping belajar interaktif, serta Mode Tryout yang dirancang sebagai simulasi ujian mandiri dengan sistem *Secure CBT Mode* (Anti-Cheat) tanpa bantuan AI.
2. AI Tutor berhasil diimplementasikan melalui beberapa komponen utama, yaitu Prompt Builder, Rule-Based Strategy Selector, Guardrail Prompting, serta integrasi LLM melalui OpenRouter API. Melalui mekanisme tersebut, AI mampu memberikan bantuan pembelajaran adaptif berupa Socratic Hint dan Step-by-Step Guidance sesuai dengan kemampuan siswa (Zone of Proximal Development) tanpa membocorkan jawaban akhir secara langsung.
3. Sistem berhasil menerapkan mekanisme *Learning Analytics* terpadu dengan pemodelan *Item Response Theory* (IRT) dan *Chancing Engine*. Integrasi ini tidak hanya memantau tingkat penguasaan (Mastery Tracking) dan menyusun rute belajar (*Personal Plan*), tetapi juga mampu mengestimasi kemampuan kognitif siswa untuk memberikan visualisasi probabilitas kelulusan terhadap program studi dan universitas yang dituju.
4. Berdasarkan hasil Black-Box Testing, seluruh fungsi utama sistem berhasil berjalan 100% sesuai dengan kebutuhan fungsional yang telah dirancang melalui pengujian terhadap 54 *Test Case* (19 modul Siswa dan 35 modul Admin). Pengujian tersebut meliputi sistem autentikasi, Mode Belajar, Mode Tryout, AI Tutor, *Learning Path*, manajemen bank soal, hingga pengelolaan data universitas.
5. Berdasarkan hasil pengujian System Usability Scale (SUS), sistem memperoleh rata-rata skor sebesar 62,93 pada Role Siswa (kategori OK) dan 92,5 pada Role Admin (kategori Best Imaginable). Hasil tersebut menunjukkan bahwa sistem memiliki tingkat usability yang baik, di mana fitur pendampingan AI Tutor dinilai sangat membantu siswa dalam membedah konsep soal secara bertahap.
6. Berdasarkan hasil pengujian keamanan menggunakan OWASP ZAP, tidak ditemukan kerentanan dengan tingkat risiko High pada sistem. Temuan dengan tingkat risiko Medium (terkait *Content Security Policy*) telah dikategorikan sebagai *Acceptable Risk* guna mempertahankan stabilitas fitur *React Hydration* bawaan Next.js. Selain itu, optimalisasi *Connection Pooling* menggunakan PgBouncer juga terbukti berhasil mempertahankan stabilitas database saat menerima beban 500 koneksi serentak tanpa kendala.

5.2 Saran
Berdasarkan hasil pengujian dan masukan yang diperoleh dari responden selama penyusunan tugas akhir, terdapat beberapa saran yang dapat dipertimbangkan untuk pengembangan sistem pada tahap selanjutnya:

5.2.1 Saran Pengembangan Sistem
1. Mengembangkan fungsionalitas AI Tutor agar mendukung mode interaksi multimodal (seperti pemrosesan suara/audio dan pengenalan gambar) sehingga siswa dapat berkonsultasi mengenai soal yang berbasis grafik atau kurva dengan lebih intuitif.
2. Membangun fitur gamifikasi lanjutan, seperti papan peringkat klasemen (Leaderboard) nasional secara real-time dan sistem penghargaan (Achievement Badges), untuk meningkatkan motivasi belajar ekstrinsik siswa.
3. Menambahkan materi pembelajaran pendukung di luar latihan soal, seperti ringkasan konsep maupun video pembelajaran singkat, untuk membantu siswa memperkuat pemahaman teori dasar.
4. Menyediakan opsi tema antarmuka visual (seperti Light Mode) yang lebih dinamis untuk mengakomodasi preferensi kenyamanan visual pengguna.
5. Mempertimbangkan migrasi mesin inferensi AI menuju implementasi Small Language Models (SLM) yang di-host secara lokal (seperti Llama 3 8B) guna mereduksi ketergantungan pada *rate limit* pihak ketiga serta memangkas biaya operasional sistem.

5.2.2 Saran Tugas Akhir Lanjutan
1. Melibatkan populasi responden yang jauh lebih banyak dan memiliki sebaran asal sekolah yang lebih merata sehingga hasil evaluasi sistem (*usability*) menjadi lebih representatif pada skala nasional.
2. Melakukan penelitian eksperimental mengenai efektivitas AI Tutor Socratic terhadap peningkatan nyata skor SNBT siswa melalui pengukuran Pre-Test dan Post-Test dalam jangka waktu yang lebih panjang.
3. Membandingkan efektivitas proses pembelajaran antara kelompok siswa yang menggunakan platform AI Tutor (berbasis *Scaffolding*) dengan kelompok yang belajar mandiri tanpa bantuan AI untuk memperoleh margin signifikansi kontribusi ITS secara objektif.
4. Mengembangkan algoritma *Chancing Engine* dengan mempertimbangkan faktor prediksi tambahan, seperti bobot indeks sekolah asal siswa dan portofolio sertifikat prestasi (sebagai basis prediksi integrasi jalur SNBP).
5. Melakukan uji penetrasi keamanan (*periodic security testing*) tingkat lanjut yang mencakup lapisan API eksternal pihak ketiga seiring dengan peningkatan kompleksitas fitur, guna memastikan perlindungan mutlak terhadap data pengguna.
