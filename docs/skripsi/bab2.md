# BAB II. TINJAUAN PUSTAKA DAN DASAR TEORI

## 2.1 Tinjauan Pustaka

Dalam pengembangan platform persiapan UTBK-SNBT berbasis web yang terintegrasi dengan *Intelligent Tutoring System*, penulis merujuk pada beberapa studi penelitian terdahulu yang mencakup penelitian berkaitan dengan *Intelligent Tutoring System* (ITS), sistem *TryOut* berbasis web, *Large Language Model* (LLM), *Item Response Theory* (IRT), serta *Cognitive Load Theory* yang mendukung perancangan antarmuka pengguna.

Dalam bidang *Intelligent Tutoring System* (ITS), beberapa penelitian menunjukkan bahwa sistem ini berperan penting dalam mendukung pembelajaran yang lebih personal dan adaptif. Puspita dkk. (2025) mengembangkan ITS berbasis *rule-based reasoning* yang diintegrasikan dengan *Large Language Model* (Gemini AI) untuk membantu siswa SMA dalam memahami materi kombinatorika. Hasil penelitian tersebut menunjukkan bahwa pemanfaatan kecerdasan buatan mampu meningkatkan pemberian penjelasan dan umpan balik otomatis, sehingga interaksi dalam proses belajar menjadi lebih aktif dan sesuai dengan kebutuhan siswa. Sementara itu, penelitian oleh Wiselee dkk. (2025) membahas pengembangan ITS berbasis web menggunakan framework Laravel dan MySQL untuk mendukung pembelajaran mandiri pada bidang *web development*. Sistem yang dikembangkan menyediakan materi terstruktur, latihan interaktif, serta umpan balik otomatis yang membantu meningkatkan kemandirian belajar siswa. Meskipun demikian, kedua penelitian tersebut masih berfokus pada pembelajaran materi tertentu dan belum diterapkan pada platform *TryOut* yang terintegrasi dengan proses evaluasi akademik serta belum memanfaatkan metode *scaffolding* bertingkat.

Selain penelitian ITS, penelitian terkait *TryOut* atau sistem evaluasi pembelajaran digital menunjukkan bahwa platform seperti ini sudah cukup banyak dikembangkan untuk membantu siswa mempersiapkan diri menghadapi ujian masuk perguruan tinggi. Nugraha dan Hardiyanti (2025) mengembangkan sistem *TryOut* UTBK-SNBT berbasis web yang tidak hanya digunakan untuk simulasi ujian tetapi juga dilengkapi fitur rekomendasi jurusan berdasarkan hasil pengerjaan siswa. Sementara itu, Affan dan Elhanafi (2025) mengembangkan aplikasi *TryOut online* yang terintegrasi dengan pengelolaan soal, pendaftaran peserta, penjadwalan ujian, dan penilaian otomatis. Kedua penelitian tersebut menunjukkan bahwa sistem *TryOut* berbasis web mampu meningkatkan efisiensi pelaksanaan ujian. Namun, sistem yang dikembangkan masih berfokus pada pelaksanaan dan pengelolaan ujian, serta belum menyediakan mekanisme pembelajaran adaptif, umpan balik interaktif berbasis AI selama proses pengerjaan soal, maupun penilaian berbasis IRT.

Penelitian mengenai *Large Language Model* (LLM) dalam bidang pendidikan menunjukkan bahwa teknologi ini memiliki peran yang cukup besar dalam mendukung proses pembelajaran modern. LLM banyak dimanfaatkan untuk berbagai kebutuhan seperti pembelajaran adaptif, sistem tutor pintar, hingga pemberian umpan balik otomatis kepada siswa (Kasneci dkk., 2023). Peláez-Sánchez dkk. (2024) menjelaskan bahwa penggunaan LLM dalam pendidikan dapat meningkatkan interaksi belajar karena sistem mampu memberikan penjelasan yang lebih kontekstual dan membantu siswa memahami materi secara lebih mandiri. Namun di sisi lain, LLM memiliki keterbatasan, terutama karena kecenderungannya memberikan jawaban secara langsung yang dapat mengurangi proses berpikir siswa jika tidak dikendalikan dengan baik, serta adanya risiko ketidakakuratan informasi dalam kondisi tertentu (Yan dkk., 2023). Oleh karena itu, dalam penerapannya di bidang pendidikan, LLM perlu diatur dengan pendekatan tertentu agar tetap berfungsi sebagai alat bantu belajar yang mendukung proses berpikir siswa, bukan sekadar memberikan jawaban instan.

Dalam bidang *Item Response Theory* (IRT), De Ayala (2009) memberikan landasan komprehensif mengenai teori dan praktik IRT, termasuk model 1-Parameter Logistic (Rasch), 2-Parameter Logistic, dan 3-Parameter Logistic yang sering digunakan dalam evaluasi pendidikan. Namun, penerapan IRT pada platform persiapan ujian umumnya masih terbatas pada mekanisme *Computerized Adaptive Testing* (CAT) tanpa menyediakan integrasi dengan *learning path*, *scaffolding* AI, atau prediksi peluang kelulusan.

Ringkasan mengenai penelitian terdahulu direpresentasikan dalam Tabel 2.1 di bawah ini.

**Tabel 2.1 Ringkasan Tinjauan Pustaka**

| Peneliti (Tahun) | Judul Penelitian | Model/Teknologi | Hasil Penelitian | Kekurangan Terkait Penelitian Ini |
|---|---|---|---|---|
| **Puspita dkk. (2025)** | Perancangan Website ITS Berbasis *Rule-Based Reasoning* menggunakan Gemini AI Untuk Pembelajaran Kombinatorika... | SDLC, ITS, *Rule-Based*, Gemini AI | Sistem memberikan penjelasan dan umpan balik otomatis secara interaktif. | Berfokus pada materi spesifik (kombinatorika), belum ada *scaffolding* bertingkat maupun penilaian IRT. |
| **Wiselee dkk. (2025)** | *Empowering Independent Learning in Web Development Using Intelligent Tutoring Systems* | ITS berbasis Laravel & MySQL | Membantu pembelajaran mandiri dengan materi dan latihan interaktif. | Terbatas pada *web development*, tidak memanfaatkan LLM secara luas, tidak ada evaluasi *TryOut* akademik. |
| **Nugraha & Hardiyanti (2025)** | Rancang Bangun Sistem Tryout UTBK SNBT Berbasis Web dengan Fitur Rekomendasi Jurusan | Web-based Tryout System | Sistem menyediakan *tryout* dan rekomendasi jurusan dari hasil tes. | Tidak memiliki fitur ITS, umpan balik adaptif AI, maupun estimasi penskoran berbasis IRT. |
| **Affan & Elhanafi (2025)** | Perancangan Aplikasi Tryout Online Berbasis Web dengan Fitur Manajemen Soal Terintegrasi | Sistem Tryout Terintegrasi | Mampu mengelola *tryout* secara terpusat (soal, jadwal, pendaftaran). | Fokus murni pada administrasi ujian. Tidak mendukung pembelajaran adaptif (*Learning Path*). |
| **Kasneci dkk. (2023)** | *ChatGPT for good? On opportunities and challenges of large language models for education* | LLM, AI in Education | LLM mendukung pembelajaran interaktif, namun berisiko memberi jawaban instan. | Bersifat kajian pustaka (*literature review*), tidak membahas implementasi teknis pada sistem *TryOut*. |
| **Peláez-Sánchez dkk. (2024)** | *The impact of large language models on higher education* | LLM, *Higher Education* | LLM meningkatkan personalisasi belajar, namun butuh kontrol. | Fokus pada pendidikan tinggi, tidak mencakup sistem simulasi UTBK dan *Chancing Engine*. |

Berdasarkan tinjauan pustaka dalam Tabel 2.1, penelitian terkait ITS umumnya berfokus pada pemberian umpan balik pada materi spesifik, sedangkan sistem *TryOut* menitikberatkan pada simulasi ujian. Meskipun penelitian mengenai LLM dan IRT menunjukkan potensi besar, belum ditemukan sistem yang **mengintegrasikan secara utuh** simulasi UTBK-SNBT, *Intelligent Tutoring System* berbasis LLM dengan *Socratic Scaffolding*, penilaian *Item Response Theory* (IRT), prediksi kelulusan (*Chancing Engine*), dan rute belajar personal (*Learning Path*). Oleh karena itu, penelitian ini mengembangkan sebuah platform web modern untuk menjembatani celah (*gap*) tersebut.

---

## 2.2 Dasar Teori

### 2.2.1 UTBK-SNBT (Ujian Tulis Berbasis Komputer – Seleksi Nasional Berdasarkan Tes)

Berdasarkan pedoman resmi BP3 SNPMB (2024), UTBK-SNBT merupakan jalur seleksi masuk Perguruan Tinggi Negeri (PTN) yang menggunakan *Computer-Based Test* (CBT). Ujian ini bersifat *performance-oriented*, di mana siswa diuji dalam batas waktu ketat yang tidak dapat diulang (*one-shot*). 

**Tabel 2.2 Struktur Subtes UTBK-SNBT (BP3 SNPMB, 2024)**

| Komponen | Subtes | Jumlah Soal | Alokasi Waktu |
|---|---|---|---|
| **TPS** | Penalaran Umum (PU) | 30 | 30 menit |
| **TPS** | Pengetahuan & Pemahaman Umum (PPU) | 20 | 15 menit |
| **TPS** | Pemahaman Bacaan & Menulis (PBM) | 20 | 25 menit |
| **TPS** | Pengetahuan Kuantitatif (PK) | 20 | 20 menit |
| **Literasi** | Literasi Bahasa Indonesia | 30 | 42,5 menit |
| **Literasi** | Literasi Bahasa Inggris | 20 | 20 menit |
| **Literasi** | Penalaran Matematika | 20 | 42,5 menit |
| **TOTAL** | **7 Subtes** | **160 Soal** | **195 Menit** |

### 2.2.2 Intelligent Tutoring System (ITS)

*Intelligent Tutoring System* (ITS) adalah perangkat lunak pembelajaran yang mensimulasikan peran tutor manusia dengan memberikan bimbingan, umpan balik, dan materi yang disesuaikan secara adaptif terhadap kemampuan masing-masing siswa.

**Tabel 2.3 Komponen Utama ITS**

| Komponen | Definisi & Fungsi Sistem |
|---|---|
| **Domain Model** | Basis pengetahuan (materi/subtes UTBK) yang terstruktur dari topik ke subtopik. |
| **Student Model** | Representasi profil, kelemahan, dan perkembangan kemampuan siswa. |
| **Tutoring Model** | Mesin pengambil keputusan yang menentukan kapan dan bagaimana (*scaffolding*) AI memberikan bantuan. |
| **User Interface** | Antarmuka tempat siswa berinteraksi (contoh: ruang obrolan AI yang minimalis). |

Keempat komponen ini saling berinteraksi secara siklikal. *Student Model* terus diperbarui ketika siswa mengerjakan soal, dan *Tutoring Model* menggunakan data tersebut untuk menyesuaikan respons yang ditampilkan melalui *User Interface*.

### 2.2.3 Scaffolding

Dalam ITS, *Scaffolding* adalah metode pemberian bantuan terukur yang secara progresif dikurangi seiring meningkatnya kemandirian pemahaman siswa, berdasarkan teori *Zone of Proximal Development* (Vygotsky, 1978).

*Gambar 2.1 Konsep Zone of Proximal Development (ZPD) (Sumber: Vygotsky, 1978)*
![Konsep ZPD](https://dummyimage.com/600x300/e0e0e0/000000.png&text=Ilustrasi+Zone+of+Proximal+Development)

### 2.2.4 Socratic Questioning

Dalam sistem kecerdasan buatan, scaffolding sering diintegrasikan dengan metode *Socratic Questioning*, di mana AI tidak memberikan jawaban, melainkan mengajukan pertanyaan pemantik.

**Tabel 2.4 Tingkatan Scaffolding pada Tutor Virtual**

| Level | Tujuan Instruksional | Karakteristik Bantuan |
|---|---|---|
| **Level 1: Pemandu** | Mendorong berpikir mandiri | Pertanyaan reflektif untuk memancing penalaran awal tanpa informasi eksplisit. |
| **Level 2: Petunjuk Parsial** | Memberi arah penyelesaian | Bantuan berupa rumus terkait atau eliminasi opsi yang salah, tanpa mengungkap kunci jawaban. |
| **Level 3: Penjelasan Penuh** | Memastikan pemahaman akhir | Penjelasan langkah-demi-langkah beserta justifikasi lengkap (kunci jawaban dibuka). |

*Gambar 2.2 Alur Keputusan Socratic Questioning pada AI*
![Alur Socratic](https://dummyimage.com/600x400/e0e0e0/000000.png&text=Flowchart+Socratic+Scaffolding)

### 2.2.5 Cognitive Load Theory (CLT)

*Cognitive Load Theory* (Sweller, 1988) menegaskan bahwa kapasitas memori kerja (*working memory*) manusia sangat terbatas. Jika desain antarmuka belajar terlalu rumit, memori kerja akan terkuras untuk memproses hal yang tidak penting.

* **Intrinsic Load:** Kompleksitas asli dari soal UTBK.
* **Germane Load:** Beban mental produktif untuk memahami konsep dan rumus.
* **Extraneous Load:** Beban kognitif negatif akibat UI yang berantakan, navigasi rumit, atau fitur tidak penting (seperti terlalu banyak tombol dan menu).

Dalam perancangan platform evaluasi, *extraneous load* harus ditekan semaksimal mungkin, misalnya dengan menyediakan antarmuka obrolan tutor yang murni teks tanpa fitur-fitur distraksi visual.

### 2.2.6 Item Response Theory (IRT)

*Item Response Theory* (IRT) adalah teori psikometri modern yang mengestimasi kemampuan (θ) siswa bukan dari seberapa banyak soal yang dijawab benar, melainkan **soal mana yang dijawab benar** berdasarkan bobot tingkat kesulitannya ($b$). 

### 2.2.7 Model Rasch (1-Parameter Logistic)

Model 1-Parameter Logistic (Rasch Model) adalah turunan IRT yang berfokus murni pada tingkat kesulitan soal. Model Rasch menyatakan bahwa probabilitas seorang peserta menjawab benar suatu butir soal dipengaruhi oleh selisih antara kemampuan peserta ($\theta$) dan tingkat kesulitan butir soal ($b_i$). Semakin tinggi kemampuan peserta dibandingkan tingkat kesulitan soal, semakin besar probabilitas peserta menjawab benar.

Probabilitas tersebut dinyatakan dalam formula logistik:
$$ P_i(\theta) = \frac{1}{1 + e^{-(\theta - b_i)}} $$

dengan keterangan:
* $P_i(\theta)$ = probabilitas peserta menjawab benar pada butir ke-$i$
* $\theta$ = kemampuan laten peserta
* $b_i$ = parameter tingkat kesulitan butir ke-$i$
* $e$ = konstanta Euler ($\approx$ 2,71828)

Apabila kemampuan peserta sama dengan tingkat kesulitan butir soal ($\theta = b_i$), maka probabilitas menjawab benar adalah 0,5.

### 2.2.8 Estimasi Kemampuan ($\theta$) dengan Newton-Raphson

Dalam IRT, kemampuan peserta ($\theta$) tidak dihitung dari total benar, melainkan diestimasi menggunakan metode *Maximum Likelihood Estimation* (MLE). Karena fungsi probabilitas ini tidak linier, estimasi dilakukan secara iteratif menggunakan metode Newton–Raphson hingga mencapai titik konvergen. Persamaan iteratifnya adalah:

$$ \theta^{(k+1)} = \theta^{(k)} + \frac{\sum_{i=1}^n ( U_i - P_i )}{\sum_{i=1}^n P_i (1-P_i)} $$

dengan keterangan:
* $\theta^{(k)}$ = estimasi kemampuan pada iterasi ke-$k$
* $\theta^{(k+1)}$ = estimasi kemampuan pada iterasi ke-$k+1$
* $U_i$ = respons aktual peserta (1 jika benar, 0 jika salah)
* $P_i$ = probabilitas menjawab benar pada iterasi saat ini
* $n$ = jumlah soal

Penyebut pada persamaan tersebut, yaitu $\sum P_i (1-P_i)$, dikenal sebagai *Fisher Information* (besaran informasi yang diberikan soal terhadap kemampuan peserta). Iterasi berhenti saat perubahan nilai ($\Delta\theta$) sangat kecil.

**Tabel 2.6 Contoh Ilustrasi Iterasi Newton-Raphson**
*(Misal peserta menjawab $U = [1, 1, 0, 1, 0]$ untuk 5 soal dengan kesulitan $b$ bervariasi)*

| Iterasi ($k$) | $\theta_k$ | $\sum P_i (1-P_i)$ | $\sum (U_i - P_i)$ | $\Delta\theta$ | $\theta_{k+1}$ |
|---|---|---|---|---|---|
| 1 | 0,0000 | 1,0898 | 0,7311 | 0,6707 | 0,6707 |
| 2 | 0,6707 | 1,0680 | −0,0017 | −0,0016 | 0,6691 |
| 3 | 0,6691 | — | — | < 0,001 | Konvergen |

### 2.2.9 Computerized Adaptive Testing (CAT)

*Computerized Adaptive Testing* (CAT) merupakan bentuk pengujian adaptif berbasis komputer yang menyesuaikan tingkat kesulitan soal dengan kemampuan (*ability*) peserta secara dinamis (*real-time*). Dalam kerangka IRT, jika siswa menjawab benar, soal berikutnya akan lebih sulit (parameter $b$ tinggi); jika salah, soal berikutnya akan lebih mudah. Evaluasi CAT dapat mengukur estimasi kemampuan siswa secara lebih presisi, efisien, dan komprehensif meskipun dengan jumlah butir soal yang lebih sedikit dibandingkan *try out* linear konvensional.

### 2.2.10 Large Language Model (LLM)

Model AI berbasis arsitektur *Transformer* yang dilatih menggunakan miliaran parameter teks sehingga mampu memahami konteks, logika, dan mensintesis respons selayaknya manusia. Dalam pendidikan, LLM digunakan sebagai otak utama (*inference engine*) dari *Tutoring Model*.

### 2.2.11 Prompt Engineering

Teknik mendesain sistem instruksi awal (sistem *prompt*) agar perilaku LLM terkendali. Tanpa *prompt engineering*, LLM cenderung langsung memberikan kunci jawaban (*Direct Instruction*). Melalui *prompt engineering*, LLM dikondisikan untuk bertindak tegas sebagai "Tutor Socratic" yang melarang pemberian jawaban instan.

### 2.2.12 Mastery Learning

*Mastery Learning* menuntut siswa untuk mencapai standar pemahaman minimum pada satu bab sebelum melangkah ke bab berikutnya secara terstruktur.

### 2.2.13 Learning Path

Dalam ekosistem digital, konsep *Mastery Learning* diimplementasikan melalui *Learning Path* (rute belajar), di mana sistem manajemen pembelajaran memetakan perkembangan kognitif siswa per topik materi secara otomatis.

Untuk memfasilitasi pemantauan diri (*self-monitoring*), platform pembelajaran modern umumnya memanfaatkan indikator visual guna mengomunikasikan status penguasaan materi kepada pengguna. Sebagai contoh visualisasi, platform *e-learning* sering merepresentasikan rute ini dalam antarmuka berbasis kartu (*card*) atau peta (*roadmap*).

*Gambar 2.3 Contoh Ilustrasi Antarmuka Learning Path*
![Ilustrasi Learning Path](https://dummyimage.com/800x400/e0e0e0/000000.png&text=Visualisasi+UI+Learning+Path)

Pengklasifikasian status penguasaan ini dapat direpresentasikan seperti pada Tabel 2.7.

**Tabel 2.7 Klasifikasi Status Penguasaan Materi (*Mastery Learning*)**

| Status Topik | Konvensi Visual | Deskripsi Teoretis |
|---|---|---|
| **Belum Dimulai (*Not Started*)** | Indikator pasif (cth: warna abu-abu/terkunci) | Materi belum pernah diakses atau dievaluasi oleh sistem. |
| **Dalam Proses (*In Progress*)** | Bar progres kuantitatif | Siswa sedang dalam tahap pembelajaran, namun belum mencapai ambang batas ketuntasan minimum. |
| **Tuntas (*Completed*)** | Indikator afirmatif (cth: ikon centang/hijau) | Siswa telah memenuhi kriteria ketuntasan materi secara konsisten. |

### 2.2.14 Application Programming Interface (API)

*Application Programming Interface* (API) adalah sekumpulan protokol komunikasi yang bertindak sebagai jembatan pertukaran data antar sistem perangkat lunak yang berbeda. Dalam arsitektur *web* modern, API—khususnya tipe RESTful (*Representational State Transfer*)—digunakan secara ekstensif untuk menghubungkan bagian antarmuka pengguna (*Frontend*) dengan server logika bisnis (*Backend*), serta berkomunikasi dengan *database*. Format data yang paling umum ditransmisikan melalui API adalah JSON (*JavaScript Object Notation*).

### 2.2.15 Layanan Cloud Inference LLM (Groq API)

Dalam arsitektur perangkat lunak cerdas, layanan *Cloud Inference* merupakan infrastruktur eksternal yang khusus dirancang untuk mengeksekusi model kecerdasan buatan dengan kecepatan pemrosesan tinggi. Salah satu contoh layanan ini adalah Groq API. 

Infrastruktur seperti Groq tidak menggunakan unit pemrosesan grafis konvensional (GPU), melainkan arsitektur perangkat keras khusus yang disebut LPU (*Language Processing Unit*). LPU dirancang secara spesifik untuk memecahkan masalah komputasi sekuensial yang menjadi hambatan utama pada *Large Language Model*. 

Dalam konteks pengembangan *Intelligent Tutoring System*, pemanfaatan layanan *inference* berkinerja tinggi memberikan dua keuntungan teknis yang signifikan:
1. **Low Latency:** Meminimalkan waktu jeda komputasi (*delay*) antara input pengguna dan output model.
2. **Token Streaming:** Memungkinkan respons teks dikirim secara parsial (kata-per-kata) ke sisi klien selama proses komputasi berlangsung, yang secara psikologis meningkatkan persepsi kealamian interaksi (*natural interaction*).

Untuk mempelajari lebih lanjut mengenai spesifikasi teknis LPU dan pengujian *benchmark* latensinya, dokumentasi resmi dapat diakses melalui tautan berikut: [Dokumentasi Resmi Groq API](https://console.groq.com/docs/quickstart).

*Gambar 2.4 Perbandingan Arsitektur GPU Konvensional dan Groq LPU*
![Arsitektur LPU](https://dummyimage.com/700x350/e0e0e0/000000.png&text=Diagram+Arsitektur+Groq+LPU)

### 2.2.16 Prediksi Kelulusan (Chancing Engine)

Dalam penerimaan PTN, lolos atau tidaknya seorang siswa tidak diukur dari standar nilai mutlak, melainkan dari kompetisi (*ranking*) pada program studi yang dituju. *Chancing Engine* adalah algoritma pemodelan probabilistik yang mengalkulasi skor kemampuan siswa (hasil IRT) dikalikan dengan bobot rasio keketatan (daya tampung berbanding jumlah peminat) historis untuk memberikan estimasi presentase kelulusan yang rasional.

### 2.2.17 Kerangka Kerja Web Modern (Next.js)

Next.js merupakan kerangka kerja (*framework*) berbasis React yang mendukung arsitektur rendering modern seperti *Server-Side Rendering* (SSR) dan *Static Site Generation* (SSG). Pendekatan *App Router* pada kerangka kerja ini mengintegrasikan konsep *Server Components*, yang memungkinkan eksekusi logika berat dan akses basis data dilakukan secara eksklusif di sisi server. Pendekatan ini meminimalkan pengiriman bundel *JavaScript* ke klien, sehingga meningkatkan kinerja dan keamanan aplikasi web secara keseluruhan.

Tinjauan lebih dalam terkait implementasi *Server Components* dan sistem perutean (*routing*) berbasis direktori (*file-system based router*) pada ekosistem web modern dapat dirujuk melalui [Dokumentasi Resmi Next.js](https://nextjs.org/docs/app).

### 2.2.18 Manajemen State Global pada Antarmuka (Zustand)

Dalam aplikasi web modern yang kompleks, data antarmuka (*state*) seringkali perlu diakses dan dimodifikasi dari berbagai komponen secara bersamaan. *Zustand* adalah sebuah pustaka manajemen *state* minimalis dan reaktif untuk React yang memungkinkan penyediaan *state* secara global. Dengan pustaka ini, antarmuka aplikasi dapat mempertahankan data persisten (seperti riwayat obrolan AI Tutor atau pewaktu ujian) secara mulus melintasi perpindahan rute antar halaman, menjadikan komponen bersifat modular.

### 2.2.19 Sistem Basis Data Relasional (PostgreSQL)

PostgreSQL merupakan sistem manajemen basis data relasional (*Relational Database Management System*/RDBMS) sumber terbuka tingkat lanjut. Sistem ini dirancang untuk menangani beban kerja data yang tinggi, mendukung arsitektur struktur tabel (*schema*) yang kompleks, serta menjamin integritas data melalui prinsip ACID (*Atomicity, Consistency, Isolation, Durability*). Sifat keandalan ini menjadikan PostgreSQL sering diadopsi dalam pengembangan platform evaluasi akademik skala besar.

### 2.2.20 Pengujian Black-Box (Black-Box Testing)

Pengujian *Black-Box* merupakan metode validasi perangkat lunak yang murni menitikberatkan pada kesesuaian fungsional sistem berdasarkan spesifikasi kebutuhan masukan (*input*) dan keluaran (*output*), tanpa menganalisis atau mengevaluasi struktur kode internal perangkat lunak tersebut. Pengujian ini memastikan bahwa setiap fungsionalitas antarmuka beroperasi sesuai dengan skenario penggunaan yang diharapkan pengguna akhir.

### 2.2.21 System Usability Scale (SUS)

Kuesioner standar global berbasis skala Likert (1 hingga 5) yang terdiri dari 10 pertanyaan (5 positif, 5 negatif) untuk mengukur tingkat kebergunaan (kemudahan pakai) suatu sistem dari kacamata responden asli (*end-user*). Skor SUS di atas 68 mengindikasikan bahwa sistem dapat diterima (*acceptable*) dengan baik oleh pengguna.
