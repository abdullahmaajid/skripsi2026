# 💯 BANK SOAL SIDANG SKRIPSI + KUNCI JAWABAN (115 PERTANYAAN)

Soal-soal di bawah ini telah dikelompokkan secara murni berdasarkan Kategori/Fokus pertanyaan agar Anda bisa fokus mempelajari satu topik hingga tuntas sebelum pindah ke topik lain.

## KELOMPOK: [KONSEPTUAL]
1. **Apa latar belakang utama penelitian ini?**
   Jawaban: Kurangnya fitur pendampingan belajar pada tryout konvensional yang hanya fokus pada skor akhir dan kunci jawaban instan, tanpa memperbaiki pemahaman konsep siswa.
2. **Mengapa memilih UTBK SNBT?**
   Jawaban: Karena UTBK berfokus pada tes skolastik (penalaran) di mana pemahaman konsep jauh lebih penting daripada sekadar menghafal rumus.
3. **Apa kelemahan sistem tryout yang ada di pasaran?**
   Jawaban: Bersifat pasif; tidak ada *feedback* adaptif (scaffolding) saat siswa mengalami kebuntuan menjawab soal.
4. **Apa batasan masalah Anda?**
   Jawaban: Fokus hanya pada simulasi dan evaluasi UTBK, integrasi LLM sebagai tutor berbasis teks, dan menggunakan teori IRT untuk penilaian.
5. **Apa rumusan masalah utamanya?**
   Jawaban: Bagaimana merancang dan membangun platform Tryout UTBK berbasis web yang mengimplementasikan ITS dengan LLM dan IRT, serta menguji kelayakannya.
6. **Apakah tujuan penelitian sudah terjawab di Bab 4?**
   Jawaban: Sudah. Terbukti dari hasil Black-Box (100% fungsional), SUS (Usability layak), dan OWASP ZAP (Aman dari High-Risk).
7. **Apa manfaat bagi siswa?**
   Jawaban: Mendapat bimbingan layaknya tutor privat secara gratis kapan pun (*learning recovery*).
8. **Berapa lama waktu pengembangan sistem?**
   Jawaban: (Jawab sesuai kenyataan, misal: "Sekitar 3-4 bulan dari tahap desain database hingga implementasi dan *testing*").
9. **Apa hambatan terbesarnya?**
   Jawaban: Mengoptimasi respon *prompt* LLM agar konsisten tidak membocorkan jawaban, serta meracik rumus IRT ke dalam *backend*.
10. **Kenapa memilih *Web*, bukan *Mobile App*?**
   Jawaban: Karena simulasi UTBK SNBT sesungguhnya dilakukan di depan komputer/laptop, sehingga melatih siswa dengan antarmuka web jauh lebih realistis.
11. **Apa tolok ukur kesuksesannya?**
   Jawaban: 100% lulus fungsi (Blackbox), skor SUS di atas 60 (Acceptable), dan bebas kerentanan fatal (OWASP).
12. **Apa kebaruannya (Novelty)?**
   Jawaban: Penggabungan 3 elemen sekaligus: Evaluasi (IRT), Pendampingan (LLM/ITS), dan Prediksi Lulus (Chancing Engine).
13. **Apa itu Forgetting Curve?**
   Jawaban: Teori bahwa ingatan manusia menyusut eksponensial seiring berjalannya waktu jika tidak diulang.
14. **Implementasi Forgetting Curve?**
   Jawaban: Pada *Personal Plan*, materi yang sudah lama tidak dikerjakan mendapat prioritas tinggi untuk dipelajari ulang.
15. **Metode pengembangan *software* yang digunakan?**
   Jawaban: Agile/Iteratif, karena pengembangan *prompt* AI butuh banyak penyesuaian dinamis (tidak bisa linear/kaku seperti *Waterfall*).
16. **Mengapa tidak Waterfall?**
   Jawaban: *Waterfall* menolak perubahan spesifikasi di tengah jalan. AI itu penuh *trial-error*, sehingga butuh siklus yang *agile* (lincah).
17. **Ada berapa tabel di ERD?**
   Jawaban: (Sesuaikan dengan skema Anda, kira-kira ada `User`, `Question`, `Attempt`, `Evaluation`, dll).
18. **Relasi tabel `User` dan `Answer`?**
   Jawaban: *One-to-Many* (Satu user bisa punya banyak riwayat jawaban).
19. **Fungsi *Priority Score*?**
   Jawaban: Mengurutkan rekomendasi bab mana yang harus dipelajari siswa hari ini (berdasarkan skor ujian terendah dan *forgetting curve*).
20. **Alur otentikasi NextAuth?**
   Jawaban: Masukkan kredensial -> NextAuth cek hash ke DB -> Jika cocok, buatkan sesi (JWT) -> Simpan di Cookie HTTPOnly.
21. **Membaca grafik Learning Analytics?**
   Jawaban: Sumbu Y adalah nilai (Theta), sumbu X adalah jumlah ujian (Sesi). Semakin menanjak berarti proses *Learning Recovery* sukses.
22. **Simulasi redirect ilegal?**
   Jawaban: *Copy* URL `/admin`, lalu di jendela Incognito login pakai akun siswa, *paste* URL tersebut. Sistem otomatis melempar Anda ke `/auth/login`.
23. **Tantangan teknis tersulit?**
   Jawaban: Mengatasi interupsi koneksi Vercel saat AI memberikan respons panjang (AI *streaming timeout*).
24. **Fitur pembeda utama?**
   Jawaban: Eksistensi *Floating AI Tutor* di samping layar yang mengikuti konteks (jawaban siswa sebelumnya terekam untuk analisis).
25. **Kesimpulan akhir penelitian?**
   Jawaban: Sistem berhasil dibangun, 100% fungsional, layak digunakan (SUS OK), aman (ZAP), dan secara teknis mampu menyediakan ekosistem pendampingan pedagogis mutakhir.
26. **Apakah siap dikomersialkan?**
   Jawaban: Secara arsitektur iya (aman dan terskala). Secara biaya, butuh evaluasi bisnis langganan API LLM.
27. **Kekurangan (*limitation*) utama?**
   Jawaban: Ketergantungan *latency* (keterlambatan respon) murni pada server API AI eksternal (OpenRouter).
28. **Mengapa SLM disarankan di Bab 5?**
   Jawaban: Karena tugasnya hanya "tutor", tidak butuh AI sebesar ChatGPT (GPT-4), sehingga menghemat biaya server dan lebih cepat.
29. **Cara *backend* ambil soal dari DB?**
   Jawaban: `prisma.question.findMany({ where: { subjectId: ... } })`
30. **Chrome siswa mati di tengah jalan?**
   Jawaban: Aman, *Zustand Persist* telah menyimpan centangan terakhir di `localStorage`. Buka Chrome lagi, datanya kembali utuh.
31. **Pesan terpenting skripsi ini?**
   Jawaban: "Masa depan Tryout bukan tentang siapa yang tercepat mengeluarkan kunci jawaban, melainkan siapa yang terbaik dalam menemani proses berpikir siswa (Scaffolding)."

## KELOMPOK: [TEORI PENDIDIKAN]
32. **Apa manfaat bagi lembaga pendidikan/sekolah?**
   Jawaban: Bisa dipakai untuk memantau analitik kemampuan siswa (Learning Path & Chancing Engine) tanpa harus membayar mahal pihak ketiga.
33. **Apa definisi ITS?**
   Jawaban: Sistem komputer yang menyimulasikan cara kerja tutor manusia dalam memberikan pendampingan adaptif.
34. **Jelaskan konsep ZPD!**
   Jawaban: Jarak pemisah antara kemampuan siswa menjawab sendiri vs saat dibimbing. Area inilah yang diisi oleh AI Tutor.
35. **Implementasi ZPD di kodingan?**
   Jawaban: Jika siswa menjawab benar, sistem diam (kemampuan mandiri). Jika salah, tombol AI Tutor muncul (memberi bimbingan).
36. **Apa itu Socratic Scaffolding?**
   Jawaban: Teknik mengajar gaya Socrates, yaitu bertanya balik atau memberi petunjuk bertahap agar murid menemukan jawabannya sendiri.
37. **Kenapa disebut "Socratic Scaffolding"? Siapa itu Socrates?**
   Jawaban: Socrates adalah filsuf Yunani Kuno yang tidak pernah langsung menjawab pertanyaan muridnya, melainkan membalasnya dengan pertanyaan baru yang menuntun muridnya berpikir. AI di sistem ini diprogram meniru gaya mengajar Socrates tersebut.

## KELOMPOK: [TEORI EVALUASI]
38. **Kenapa evaluasi saja tidak cukup?**
   Jawaban: Evaluasi hanya memberitahu "Kamu salah", tapi *scaffolding* memberitahu "Ini cara berpikir yang benar agar ke depan kamu tidak salah lagi".
39. **Apa itu Item Response Theory (IRT)?**
   Jawaban: Teori pengukuran berbasis probabilitas. IRT tidak sekadar melihat "jumlah benar", melainkan memodelkan peluang siswa menjawab benar lewat fungsi logistik matematika yang mempertimbangkan karakteristik per butir soal.
40. **Beda IRT dan CTT (Skor Klasik)?**
   Jawaban: CTT (Skor Klasik) menghargai semua soal sama rata. IRT lebih presisi karena menghitung kemampuan laten siswa ($\theta$) di mana jawaban benar pada soal sulit dihargai jauh lebih tinggi daripada soal mudah.
41. **Coba jelaskan rumus IRT Model Rasch (1-PL) yang Anda pakai!**
   Jawaban: Rumusnya adalah probabilitas $P_i(\theta) = \frac{1}{1 + e^{-(\theta - b_i)}}$. Di mana $\theta$ (Theta) adalah skor kemampuan siswa, $b_i$ adalah bobot kesulitan soal ke-$i$, dan $e$ adalah konstanta eksponensial.
42. **Bagaimana cara *backend* Anda menghitung nilai akhir ($\theta$)?**
   Jawaban: Menggunakan *Maximum Likelihood Estimation* (MLE) melalui algoritma komputasi numerik **Newton-Raphson**. Sistem akan melakukan perulangan turunan pertama dan *Fisher Information* (negatif turunan kedua) hingga nilai $\theta$ konvergen.
43. **Setelah nilai $\theta$ ketemu (misal: 1.5), bagaimana mengubahnya jadi skor UTBK 200-800?**
   Jawaban: Menggunakan transformasi linear skala standar. Rumusnya: `Skor = (Theta × 100) + 500`. Jika melampaui batas, nilainya di-*cap* maksimal 800 dan minimal 200.
44. **Lalu bagaimana Regresi Logistik dipakai di *Chancing Engine*?**
   Jawaban: Regresi logistik menggunakan skor akhir tadi sebagai input *variabel independen* untuk menghasilkan kurva Sigmoid. Hasilnya berupa output probabilitas (0% sampai 100%) lolos ke PTN incaran.
45. **Berapa rata-rata skor SUS?**
   Jawaban: Keseluruhan 67,26.
46. **Kenapa skor SUS Admin tinggi (92,5)?**
   Jawaban: Karena halaman Admin sangat simpel (hanya tabel Data CRUD), sehingga *cognitive load* (beban kognitif) pengguna sangat minim.
47. **Kenapa skor SUS Siswa 62,93?**
   Jawaban: Karena siswa menghadapi simulasi ujian (*cognitive load* tinggi) dan masih beradaptasi dengan fitur AI baru, sehingga penilaian *usability* cenderung konservatif.
48. **Apakah skor 62,93 berarti gagal?**
   Jawaban: Tidak, berdasarkan skala Bangor (2008) skor tersebut masih tergolong *Marginal High (Acceptable/Bisa diterima)*.
49. **Lokasi rumus IRT?**
   Jawaban: Terletak pada layanan kalkulasi akhir (`evaluate-answers.ts` atau semacamnya di *backend/utils*).
50. **Di codebase ada fitur "Chancing Engine". Kenapa dinamakan demikian, bukan "Kalkulator Kelulusan"?**
   Jawaban: "Chancing Engine" adalah istilah industri standar di dunia EdTech (seperti di Ivy League) untuk mendeskripsikan mesin probabilitas probabilistik, bukan sebuah kalkulator statis. Ia menghitung "peluang" (chances) berdasarkan model regresi statistik.
51. **Kenapa ada istilah "Theta" (θ) dalam rumus penilaian Anda di Bab 2?**
   Jawaban: Dalam statistik pengukuran psikometri, simbol Yunani Theta (θ) adalah standar internasional baku yang digunakan untuk melambangkan *Laten Trait* (tingkat kemampuan kognitif tak kasat mata dari seorang peserta ujian).

## KELOMPOK: [AI & LLM]
52. **Bagaimana peran AI di sini?**
   Jawaban: Bertindak sebagai *Intelligent Tutoring System* (ITS) yang memberikan petunjuk (*hint*) secara bertahap saat siswa salah menjawab.
53. **Bagaimana memastikan AI tidak disalahgunakan untuk mencontek?**
   Jawaban: Lewat *Blind Mode Architecture*; AI dikunci (*system prompt*) agar tidak pernah memberikan kunci jawaban (A/B/C/D), hanya pancingan berpikir.
54. **Apakah sistem ini dapat digunakan untuk ujian selain UTBK?**
   Jawaban: Bisa, karena arsitektur database-nya modular (bisa ditambah *Subject* baru seperti CPNS atau Ujian Mandiri).
55. **Bagaimana mem-program LLM menjadi Socrates?**
   Jawaban: Menggunakan *Prompt Engineering* yang spesifik (*"You are a strict Socratic tutor..."*).
56. **Jelaskan arsitektur LLM!**
   Jawaban: Model jaringan saraf tiruan (Transformer) berukuran masif yang dilatih dari miliaran teks untuk memprediksi kata selanjutnya secara akurat.
57. **Kenapa pakai OpenRouter?**
   Jawaban: Bertindak sebagai agregator; kita bisa berganti-ganti AI (Gemini, Llama, Qwen) tanpa perlu mengubah struktur kode berulang kali.
58. **Kenapa SSR lebih baik?**
   Jawaban: *Load* awal lebih cepat, aman untuk SEO, dan bisa menyembunyikan API kunci AI di *server*.
59. **Alur *Activity Diagram* saat AI dipanggil?**
   Jawaban: Siswa jawab salah -> klik AI -> Frontend kirim histori ke API Route -> Route sisipkan sistem prompt -> OpenRouter memproses -> *Streaming text* ke UI siswa.
60. **Mengapa pakai JWT daripada simpan *Session* di DB?**
   Jawaban: Karena *stateless*, tidak membebani database setiap kali *user* berganti halaman.
61. **Bagaimana pengaturan Role (RBAC)?**
   Jawaban: Dicek di tingkat *Middleware* Next.js. Jika URL berawalan `/admin` diakses pengguna ber-role `USER`, sistem menolaknya (redirect).
62. **Bagaimana soal diacak?**
   Jawaban: Menggunakan query *random* atau algoritma di tingkat *backend* sebelum dikirim ke siswa.
63. **Bagaimana *Zustand* menjaga data jawaban?**
   Jawaban: Data disimpan di memori *state* dan di-sinkronisasi lewat mekanisme *persist* (seperti `localStorage`), sehingga aman dari *refresh*.
64. **Kelebihan Tailwind CSS?**
   Jawaban: *Utility-first CSS*, kodingan *style* menyatu di HTML, mempercepat *development* tanpa harus bolak-balik buka *file* CSS eksternal.
65. **Kenapa pakai TypeScript?**
   Jawaban: Agar kode tahan banting (aman dari *bug typo* tipe data) dibanding JavaScript biasa (*type-safety*).
66. **Letak kode *Blind Mode*?**
   Jawaban: Ada di direktori `app/api/chat/route.ts` atau file terkait, pada blok `SystemMessage`.
67. **Cara lepas dari ketergantungan API LLM luar?**
   Jawaban: Menjalankan model AI ukuran kecil (*Small Language Models* seperti Llama 3 8B) di server lokal (On-Premise GPU).
68. **Lokasi *Prompt Builder*?**
   Jawaban: Di dalam *Route Handlers* API (`/app/api/...`), karena wajib dieksekusi di *Server*.
69. **Bug siswa tidak dapat nilai?**
   Jawaban: Saya akan mengecek *Log Vercel Serverless* dan melihat *query* Prisma yang gagal menyisipkan tabel `Evaluation`.
70. **Kenapa ga pakai Moodle aja?**
   Jawaban: Moodle berbasis PHP monolitik dan butuh puluhan *plugin* eksternal untuk menginjeksi arsitektur *streaming* AI serta rumus kompleks IRT (yang sangat kaku di Moodle).
71. **Apakah dosen bisa pakai tanpa manual?**
   Jawaban: Tentu, apalagi Role Admin skor SUS-nya mencapai *Best Imaginable* (92,5), artinya interfacenya setara kemudahan aplikasi populer.
72. **Di arsitektur, kenapa menggunakan nama "Blind Mode"? Memangnya AI-nya buta?**
   Jawaban: Ya, AI-nya sengaja "dibutakan" (disembunyikan) dari kunci jawaban akhir (A/B/C/D/E) pada prompt *backend*. Jika AI tahu jawabannya A, ia berpotensi keceplosan. Dengan *Blind Mode*, AI dipaksa menganalisis langkah penyelesaiannya saja.

## KELOMPOK: [FILOSOFI/TERMINOLOGI]
73. **Kenapa repository dan nama proyeknya "Lexica UTBK"? (lexica_utbkapp)**
   Jawaban: Lexica berasal dari kata *Lexicon* yang berarti kamus atau perbendaharaan pengetahuan. Nama ini melambangkan sistem yang kaya akan ilmu penalaran layaknya perpustakaan cerdas bagi siswa UTBK.
74. **Apa maksud dari penamaan "Priority Score" pada fitur Learning Path?**
   Jawaban: Karena sistem tidak sekadar mengurutkan materi dari Bab 1 ke Bab 2. Sistem menghitung "Skor Prioritas" menggunakan rumus; bab yang skor uijiannya paling hancur dan paling lama tidak dibuka akan mendapat "Priority Score" tertinggi untuk dipelajari hari ini.

## KELOMPOK: [KODING/FRONTEND]
75. **Apa beda Next.js dan React?**
   Jawaban: React itu murni berjalan di browser (CSR). Next.js punya *backend* bawaan sehingga mendukung perenderan di sisi peladen (SSR).
76. **Apa itu Prisma ORM?**
   Jawaban: Alat (jembatan) pemetaan dari basis data rasional SQL menjadi objek JavaScript/TypeScript yang mudah diketik.
77. **Fungsi Middleware Next.js?**
   Jawaban: Penjaga gerbang (*gatekeeper*) sebelum *request* mencapai halaman tertentu (untuk otentikasi & proteksi URL).
78. **Di mana kodingan dieksekusi saat *deploy*?**
   Jawaban: Di Vercel (sebagai penyedia *Serverless Functions*).
79. **Fungsi `prisma.schema`?**
   Jawaban: Sebagai denah (cetak biru) struktur tabel dan tipe data database. Dari sinilah SQL dijalankan.
80. **Skala 1-10 untuk kepuasan kodingan?**
   Jawaban: (Jawab diplomatis: "9, karena secara objektif *stack* Next.js, Prisma, dan LLM adalah *best practice* industri saat ini, meski UI/UX bisa terus dipoles").
81. **Di codebase, kenapa menggunakan library bernama "Zustand"? Apa artinya?**
   Jawaban: Zustand adalah bahasa Jerman yang berarti "State" (Keadaan/Kondisi). Sesuai namanya, library ini bertugas menjaga *state* (kondisi memori) agar jawaban siswa tidak hilang saat browser me-refresh halaman.
82. **Kenapa nama frameworknya Next.js? Apa "Next" di sana?**
   Jawaban: Dinamakan "Next" karena framework ini dirancang untuk menjadi generasi lanjutan (*the next evolution*) dari React.js, yang menutup kelemahan React (yaitu ketiadaan Server-Side Rendering dan kerentanan keamanan API).
83. **Apa arti dari nama "Prisma ORM" di database Anda?**
   Jawaban: Prisma dinamakan demikian karena layaknya kaca prisma yang mengubah satu cahaya putih menjadi berbagai spektrum warna; Prisma mengubah kode database SQL yang kaku menjadi berbagai objek TypeScript yang fleksibel dan mudah dibaca (ORM).

## KELOMPOK: [BACKEND/INFRASTRUKTUR]
84. **Kelebihan PostgreSQL?**
   Jawaban: Sangat tangguh untuk relasi kompleks, mendukung integritas relasional penuh, dan andal menahan koneksi massal.
85. **Apa fungsi PgBouncer?**
   Jawaban: *Connection pooling*. Mencegah database *crash* ketika banyak aplikasi (Prisma) mencoba membuka koneksi database secara bersamaan.
86. **Mengapa API Key ada di `.env`?**
   Jawaban: Agar tidak ikut terunggah (terbaca publik) saat kode dipush ke GitHub/GitLab (mengamankan kredensial).
87. **Peran GitLab?**
   Jawaban: Sebagai pengontrol versi kode (*Version Control System*) dan tempat kolaborasi serta arsip proyek secara *cloud*.
88. **Load Testing (PgBouncer)?**
   Jawaban: Diuji hingga 500 koneksi serentak dan server database bertahan tanpa memori tumpah (*crash*).
89. **Alur deploy ke Vercel?**
   Jawaban: Hubungkan akun Vercel dengan GitLab UMY; setiap ada *Push/Commit* ke *branch main*, Vercel otomatis me-rebuild ulang aplikasi (*Auto Deploy*).
90. **Apa istilah update otomatis dari Git ke Vercel itu?**
   Jawaban: CI/CD (*Continuous Integration & Continuous Deployment*).
91. **Isi file `.env`?**
   Jawaban: Berisi URL Database PostgreSQL, kunci JWT rahasia (*NextAuth Secret*), dan kunci API OpenRouter.
92. **Apa arti penamaan "PgBouncer" di arsitektur Anda?**
   Jawaban: "Pg" singkatan dari PostgreSQL, dan "Bouncer" berarti "Tukang Pukul/Penjaga Pintu" di klub malam. Fungsinya persis seperti *bouncer*: menjaga pintu masuk database agar tidak semua koneksi masuk berdesakan yang bisa membuat server *down*.

## KELOMPOK: [PENGUJIAN]
93. **Apa itu OWASP ZAP?**
   Jawaban: Aplikasi pemindai keamanan (*Dynamic Application Security Testing*) untuk mengotomatisasi pencarian kerentanan web.
94. **Cara kerja System Usability Scale (SUS)?**
   Jawaban: Memberikan 10 pernyataan (ganjil positif, genap negatif) kepada pengguna, lalu nilainya dikonversi ke skala 0-100 menggunakan rumus khusus.
95. **Siapa respondennya?**
   Jawaban: 35 orang untuk *role* siswa, dan 6 orang untuk *role* admin (total 41).
96. **Pentingnya Black-Box testing?**
   Jawaban: Untuk menjamin bahwa sistem merespons klik/tombol sesuai harapan manusia (validasi fungsional).
97. **Berapa test case Black-Box?**
   Jawaban: 54 *test cases* (termasuk positif & negatif) dan 100% lulus.
98. **Cara menguji Black-Box otomatis?**
   Jawaban: Saya menggunakan skrip *Puppeteer* Node.js yang memanggil *headless browser* untuk mensimulasikan login salah.
99. **Kerentanan tertinggi temuan ZAP?**
   Jawaban: Tidak ada *High Risk* (0 temuan tingkat tinggi).
100. **Apa itu CSP di *alert* ZAP?**
   Jawaban: Peringatan bahwa *Content Security Policy* kurang ketat (risiko bawaan *default* lingkungan *dev* Next.js).
101. **Mitigasi peringatan CSP?**
   Jawaban: Sudah ditoleransi (*Acceptable Risk*) atau dengan menambah *header security* khusus di `next.config.ts`.

## KELOMPOK: [PRAKTEK/DEMO]
102. **Cara demo *Blind Mode*?**
   Jawaban: Coba ketik di chat AI: *"Jawaban nomer 3 apa?"* AI akan menolak.

## KELOMPOK: [STUDI KASUS]
103. **Jika internet mati, apakah jalan?**
   Jawaban: Tidak, karena aplikasi butuh akses real-time ke OpenRouter API dan database PostgreSQL di *cloud*.
104. **Jika PgBouncer mati?**
   Jawaban: Limit koneksi PostgreSQL akan habis, dan pengguna akan terkena layar *Timeout/Error 500* saat mengumpulkan ujian.
105. **Mitigasi jika AI OpenRouter *down*?**
   Jawaban: (Misal: Aplikasi otomatis *fallback* me-return pesan *error graceful* "Layanan AI sedang sibuk", tanpa membuat tryout ikut gagal).
106. **Respons Chancing Engine jika selalu salah?**
   Jawaban: Prediksi probabilitas lolos PTN akan menyusut mendekati 0% (berwarna merah muda).
107. **Respons sistem jika *timer* habis?**
   Jawaban: *Backend* akan otomatis mem-*force submit* data jawaban terakhir dari *Zustand* menuju database.
108. **Fitur impian jika ada waktu 6 bulan lagi?**
   Jawaban: Pembacaan suara (Voice-to-Text AI) atau analisis gambar diagram agar siswa bisa menanyakan soal gambar.
109. **Kalau AI halusinasi teori?**
   Jawaban: *Prompt* saya menyertakan konteks materi (RAG sederhana), namun ini tetap batasan generatif AI. Solusinya, tombol *Refresh AI* atau *Report Flag*.

## KELOMPOK: [JEBAKAN]
110. **Apa bedanya dengan ChatGPT?**
   Jawaban: ChatGPT pasif (menunggu perintah) dan mau memberi kunci jawaban. AI sistem ini proaktif dan dilarang keras membocorkan kunci jawaban (*Blind Mode*).
111. **Kenapa istilahnya harus "Scaffolding"? Kenapa tidak disebut "Bantuan", "Hint", atau "Tips" saja?**
   Jawaban: Karena dalam dunia akademik (psikologi pendidikan), kata "Bantuan/Hint" bermakna pasif dan satu arah. "Scaffolding" secara harfiah berarti "perancah/steger" (kerangka besi penyangga saat membangun gedung). Artinya, bantuan AI ini sifatnya sementara sebagai penyangga; ketika fondasi pemahaman siswa sudah kuat, bantuan AI akan dilepas agar siswa mandiri.
112. **Kenapa disebut "Intelligent Tutoring System (ITS)", kenapa tidak disebut "E-Learning" biasa?**
   Jawaban: E-Learning (seperti Google Classroom/Moodle) sifatnya pasif (guru menaruh materi, siswa membaca). ITS adalah sistem cerdas yang aktif berinteraksi dan mengadaptasi gaya belajarnya sesuai respons *real-time* siswa layaknya tutor sungguhan.
113. **Kenapa dinamakan "Forgetting Curve"? Kenapa tidak "Kurva Belajar" saja?**
   Jawaban: Karena ini mengacu pada hukum *Ebbinghaus Forgetting Curve*, sebuah fakta medis bahwa ingatan otak manusia akan merosot tajam (lupa) dalam hitungan hari jika tidak ada pengulangan (*spaced repetition*).
114. **Apa arti "Item Response Theory"? Kenapa tidak disebut "Teori Bobot Soal"?**
   Jawaban: Kata "Item" merujuk pada "Butir Soal", dan "Response" merujuk pada "Pola Jawaban Siswa". Teori ini tidak sekadar membobot soal, tetapi melihat interaksi (respon) antara seberapa pintar siswa melawan seberapa sulit item tersebut.
115. **Di codebase ada nama `evaluate-answers.ts`. Kenapa menamainya dalam bahasa Inggris, kenapa tidak `hitung-nilai.ts`?**
   Jawaban: Menggunakan bahasa Inggris adalah *best practice* (standar industri) dalam penulisan *Software Engineering*. Ini memastikan kode dapat dibaca, dikelola (*maintainable*), dan di-*review* oleh *developer* manapun secara global.
