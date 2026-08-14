### BAB II
### TINJAUAN PUSTAKA DAN DASAR TEORI

**2.1 Tinjauan Pustaka**

Dalam pengembangan platform persiapan UTBK SNBT berbasis web yang terintegrasi dengan *Intelligent Tutoring System*, penulis merujuk pada beberapa studi penelitian terdahulu yang mencakup penelitian berkaitan dengan *Intelligent Tutoring System* (ITS), sistem Tryout berbasis web, *Large Language Model* (LLM), *Item Response Theory* (IRT), serta *Cognitive Load Theory* yang mendukung perancangan antarmuka pengguna.

Dalam bidang *Intelligent Tutoring System* (ITS), penelitian menunjukkan bahwa sistem ini berperan krusial dalam mendukung pembelajaran yang personal dan adaptif. Puspita dkk. (2025) mengembangkan ITS berbasis *rule-based reasoning* yang diintegrasikan dengan kecerdasan buatan untuk membantu siswa SMA dalam memahami materi kombinatorika. Hasil penelitian tersebut menunjukkan bahwa pemanfaatan AI mampu mempercepat ketersediaan umpan balik otomatis. Sementara itu, penelitian oleh Wiselee dkk. (2025) membahas pengembangan ITS menggunakan arsitektur *client-server* standar untuk mendukung pembelajaran mandiri pada bidang *web development*. Meskipun demikian, kedua penelitian tersebut masih berfokus pada silabus materi spesifik dan belum diterapkan pada evaluasi akademik berskala besar seperti UTBK, serta belum memanfaatkan metode *scaffolding* bertingkat untuk mitigasi halusinasi AI.

Selain penelitian ITS, sistem evaluasi pembelajaran digital (*Tryout*) sudah banyak dikembangkan untuk membantu persiapan ujian masuk perguruan tinggi. Nugraha dan Hardiyanti (2025) mengembangkan sistem simulasi UTBK SNBT berbasis web yang dilengkapi fitur rekomendasi jurusan. Di sisi lain, Affan dan Elhanafi (2025) merancang aplikasi Tryout *online* yang terintegrasi dengan manajemen soal terpusat. Kedua penelitian ini berhasil membuktikan bahwa sistem berbasis web dapat menunjang skalabilitas pelaksanaan ujian. Namun, instrumen evaluasi tersebut masih bersifat uji administratif (fokus pada penilaian akhir), tanpa menyediakan mekanisme pembelajaran berkelanjutan berbasis *Learning Path*, umpan balik interaktif, maupun kalkulasi psikometri tingkat lanjut menggunakan IRT.

Penelitian mengenai *Large Language Model* (LLM) dalam bidang pendidikan menunjukkan bahwa teknologi *Transformer* ini memiliki penetrasi yang masif dalam proses pembelajaran modern. LLM banyak dimanfaatkan untuk pembelajaran adaptif hingga pemberian umpan balik otomatis (Kasneci dkk., 2023). Peláez-Sánchez dkk. (2024) menjelaskan bahwa penggunaan LLM dalam pendidikan dapat meningkatkan interaksi dialektis karena sistem mampu memproduksi narasi kontekstual. Namun di sisi lain, LLM memiliki bias inheren, terutama kecenderungannya melakukan *Direct Instruction* (memberikan jawaban instan) yang berpotensi melemahkan fungsi kognitif kritis siswa (Yan dkk., 2024). Oleh karena itu, pengontrolan prompot (*prompt tuning*) mutlak diperlukan agar LLM berfungsi eksklusif sebagai tutor fasilitator.

Dalam bidang pengukuran pendidikan, de Ayala (2009) melalui karyanya *The Theory and Practice of Item Response Theory* memberikan landasan komprehensif mengenai aplikasi psikometri modern. Akan tetapi, adopsi IRT pada platform persiapan ujian komersial atau prototipe akademis di Indonesia umumnya belum diintegrasikan secara holistik dengan ekosistem pelacakan pemahaman (*Mastery Learning*), bimbingan AI (*scaffolding*), maupun algoritma probabilistik peluang kelulusan (*Chancing Engine*) dalam satu *state management* yang berkesinambungan.

**Tabel 2.1 Ringkasan Tinjauan Pustaka**

| Peneliti (Tahun) | Fokus Penelitian | Teknologi Utama | Limitasi Terkait Penelitian Ini |
|---|---|---|---|
| Puspita dkk. (2025) | ITS untuk Pembelajaran Kombinatorika SMA | Rule-Based Reasoning, LLM | Berfokus pada 1 bab materi spesifik, belum ada *scaffolding* progresif maupun penilaian berbasis IRT. |
| Wiselee dkk. (2025) | *Independent Learning* dengan ITS | Web Framework Relasional | Tidak memanfaatkan LLM sebagai inferensi dialektis, tidak ada evaluasi simulasi ujian akademik. |
| Nugraha & Hardiyanti (2025) | Sistem Tryout UTBK SNBT dengan Rekomendasi | Arsitektur Client-Server Web | Tidak memiliki fitur intervensi ITS, umpan balik adaptif AI, maupun estimasi penskoran logistik (IRT). |
| Affan & Elhanafi (2025) | Aplikasi Tryout dengan Manajemen Terintegrasi | Sistem Manajemen Relasional | Fokus murni pada administrasi ujian (CRUD). Tidak mendukung rute pembelajaran adaptif. |
| Kasneci dkk. (2023) | Eksplorasi Peluang & Tantangan LLM di Pendidikan | Ekosistem LLM | Kajian pustaka teoretis, belum membahas integrasi model LLM ke dalam *state* aplikasi evaluasi secara riil. |

Berdasarkan Tabel 2.1, belum ditemukan purwarupa (*prototype*) akademik yang mengintegrasikan secara penuh instrumen evaluasi *high-stakes* (UTBK SNBT), mesin inferensi LLM dengan kerangka *Socratic Scaffolding*, psikometri *Item Response Theory* (IRT), kalkulasi logistik kelulusan (*Chancing Engine*), dan manajemen rute belajar (*Learning Path*) dalam satu arsitektur terpadu. Oleh karenanya, penelitian ini mengisi celah keilmuan (*gap*) tersebut.

---

**2.2 Dasar Teori**

**2.2.1 Intelligent Tutoring System (ITS)**
*Intelligent Tutoring System* (ITS) adalah cabang dari kecerdasan buatan di bidang pendidikan yang bertujuan menyediakan instruksi pembelajaran tanpa intervensi manusia secara langsung (Nwana, 1990). Arsitektur ITS standar terdiri dari empat pilar utama:
1. **Domain Model:** Merupakan basis data representasi pengetahuan pakar.
2. **Student Model:** Modul dinamis yang melacak *state* kognitif, riwayat evaluasi, dan pola kesalahan siswa.
3. **Tutoring Model:** Modul eksekutor yang menentukan strategi intervensi pedagogis (misal: memutuskan kapan harus memberi petunjuk atau jawaban penuh).
4. **User Interface Model:** Jembatan interaksi visual dan tekstual antara sistem kognitif mesin dan manusia.

**2.2.2 Scaffolding & Zone of Proximal Development (ZPD)**
Konsep *Scaffolding* berakar pada teori psikologi pendidikan *Zone of Proximal Development* (ZPD) gagasan Lev Vygotsky (1978). ZPD mendefinisikan jarak antara kemampuan mandiri seorang individu dalam memecahkan masalah dengan potensi kapasitas pengerjaannya jika didampingi oleh instruktur (Wood, Bruner, & Ross, 1976). Dalam komputasi ITS, *scaffolding* diimplementasikan melalui algoritma reduksi bantuan (*fading support*). Bantuan komputasional tidak disajikan sekaligus, melainkan diekspos secara sekuensial hanya ketika algoritma mendeteksi stagnasi kognitif pada *Student Model*.

**Tabel 2.2 Hierarki Socratic Scaffolding pada AI Tutor**

| Level Intervensi | Tipe Instruksi | Representasi Output LLM |
|---|---|---|
| **Level 1: Pemandu (*Socratic*)** | Promosikan Berpikir Mandiri | Pertanyaan retoris atau reflektif (Contoh: *"Coba perhatikan variabel X, apa hubungannya dengan Y?"*) tanpa mengekspos formula pasti. |
| **Level 2: Petunjuk (*Hint*)** | Panduan Parsial Eksplisit | Penyediaan blok pembangun logika seperti injeksi formula matematika (Contoh: *"Ingat rumus kecepatan $v = s/t$."*) namun belum memberikan hasil kalkulasi. |
| **Level 3: Solusi (*Solution*)** | Intervensi Penuh (*Full Support*) | Penjabaran sistematis langkah-demi-langkah hingga mencapai konklusi absolut (resolusi jawaban diungkapkan). |

**2.2.3 Cognitive Load Theory (CLT)**
Teori Beban Kognitif atau *Cognitive Load Theory* diperkenalkan oleh John Sweller. Sweller berpostulat bahwa memori kerja manusia (*working memory*) memiliki keterbatasan kuantitatif dalam memproses informasi serentak (Sweller, 1988). 
Dalam perancangan rekayasa perangkat lunak pendidikan, beban ekstra (*Extraneous Load*) yang diakibatkan oleh kerumitan antarmuka pengguna (seperti fitur yang tidak relevan, navigasi membingungkan, atau keharusan menyalin soal secara manual ke kolom *chat*) harus dieliminasi. Penghapusan beban ekstra ini memungkinkan memori kerja berfokus penuh pada *Germane Load* (beban esensial untuk memahami pola/logika materi).

**2.2.4 Item Response Theory (IRT) & Model Rasch (1-PL)**
*Item Response Theory* (IRT) adalah paradigma evaluasi probabilitas psikometri. Berbeda dengan teori klasik (skor mentah), IRT mengkalibrasi parameter butir soal secara independen dari populasi uji (Hambleton dkk., 1991).
Model Logistik 1-Parameter (Rasch Model) memfokuskan fungsi distribusinya pada satu parameter butir, yakni tingkat kesulitan ($b$). Model ini merumuskan probabilitas teoretis seorang peserta dengan kemampuan kognitif ($\theta$) untuk menjawab benar pada butir soal ke-$i$ melalui formula logistik eksponensial:

$$ P_i(\theta) = \frac{1}{1 + e^{-(\theta - b_i)}} $$

Dengan batasan nilai asimtotik antara 0 dan 1. Formula ini menjamin bahwa estimasi kemampuan laten siswa bersifat *invariant* (tidak terpengaruh oleh jumlah soal yang dikerjakan).

**2.2.5 Estimasi Kemampuan ($\theta$) dengan Algoritma Newton-Raphson**
Di dalam komputasi IRT, nilai kemampuan akhir ($\theta$) dicari melalui optimasi iteratif *Maximum Likelihood Estimation* (MLE) menggunakan kalkulus numerik Newton-Raphson (Baker, 2001). Proses komputasi *server* akan menjalankan perulangan matematis (*loop*) berlandaskan turunan pertama dan *Fisher Information* (turunan kedua) hingga mencapai titik ekuilibrium (konvergen).

$$ \theta_{n+1} = \theta_n + \frac{\sum_{i=1}^k [u_i - P_i(\theta_n)]}{\sum_{i=1}^k P_i(\theta_n)[1 - P_i(\theta_n)]} $$

Dimana nilai $u_i$ merepresentasikan biner (*Boolean*) dari jawaban subjek (1 = benar, 0 = salah), sedangkan $\sum P_i(\theta_n)[1 - P_i(\theta_n)]$ bertindak sebagai penyebut varians yang memandu laju konvergensi (delta) agar tidak melampaui batas toleransi limit (*convergent tolerance*).

**2.2.6 Large Language Model (LLM) & Prompt Engineering**
LLM adalah arsitektur *deep learning* berlapis *Transformer* (Vaswani dkk., 2017) yang mensintesis data tekstual dengan probabilitas sekuensial. Keunggulan LLM dalam ITS adalah kemampuannya mempertahankan konteks sesi memori secara dinamis (*context window*). 
Agar LLM mematuhi batasan *scaffolding*, digunakan rekayasa *Prompt Engineering*. Pendekatan ini menyuntikkan instruksi heuristik permanen (*system instructions*) yang disembunyikan dari pengguna, yang berfungsi sebagai pembatas absolut (*guardrails*) untuk memastikan kecerdasan buatan beroperasi secara deterministik dan etis (tidak membocorkan kunci jawaban secara sporadis).

**2.2.7 Mastery Learning & Rute Belajar (Learning Path)**
*Mastery Learning* berfokus pada penguasaan kognitif prasyarat secara tuntas sebelum mengizinkan subjek maju ke kurikulum berikutnya (Bloom, 1968). Dalam rekayasa sistem terdistribusi, teori ini dieksekusi melalui algoritma *Learning Path* (Rute Belajar), di mana basis data melacak histori interaksi soal per-bab dan mengklasifikasikan kompetensi siswa ke dalam kluster parameter ketuntasan (umumnya divisualisasikan dalam bentuk antarmuka indikator kemajuan/*progress ring*).

**Tabel 2.3 Standarisasi Klasifikasi Status Learning Path**

| Klasifikasi *State* | Persyaratan Kondisi Sistem | Indikasi Kognitif |
|---|---|---|
| **NOT_STARTED** | Tidak ada rekaman entitas pada relasi *database* sesi (*0 attempts*). | Subjek sama sekali belum terpapar oleh materi ini. |
| **IN_PROGRESS** | *Threshold* komparasi kalkulasi kesuksesan ($< 70\%$) dari total percobaan. | Subjek dalam fase retensi memori aktif namun presisi akurasi masih rentan. |
| **COMPLETED** | Akumulasi probabilitas *Exam Readiness* memvalidasi skor stabil di atas $\ge 70\%$. | Subjek telah mencapai penguasaan fondasi (*Mastery*). |

**2.2.8 Application Programming Interface (API)**
API merupakan spesifikasi arsitektur perangkat lunak yang bertindak sebagai makelar komputasi. Menggunakan pola arsitektur REST (*Representational State Transfer*), API memfasilitasi komunikasi transfer data terstruktur (biasanya dalam sintaks JSON) antara peramban web (*Client-Side*) dengan peladen (*Server-Side*) (Fielding, 2000). Desain API memastikan pemisahan fungsi (*Separation of Concerns*), sehingga logika kalkulasi probabilitas berat tetap terisolasi dengan aman di sisi server.

**2.2.9 Layanan Cloud Inference LLM (Groq API)**
Memproses LLM secara mandiri (*self-hosting*) membutuhkan memori GPU tingkat tinggi. Sebagai substitusi terkelola, ekosistem menggunakan layanan pihak ketiga, salah satunya Groq API (Groq, 2024). Berbeda dengan eksekusi GPU standar, Groq mendemonstrasikan arsitektur *Language Processing Unit* (LPU) sirkuit terintegrasi (ASIC) yang dioptimasi eksklusif untuk mengeksekusi komputasi bahasa *Transformer* tanpa interupsi komunikasi antar inti. Kecepatan baca (*tokens per second*) ekstrem pada LPU memitigasi isu latensi yang menghambat ilusi interaksi "*real-time*" dalam simulasi dialog ITS.

**Tabel 2.4 Profil Teknologi Groq API**

| Spesifikasi | Keterangan |
|---|---|
| **Pengembang** | Groq Inc. |
| **Tipe Layanan** | Cloud Inference untuk LLM (Language Processing Unit) |
| **Tautan Resmi** | https://groq.com |
| **Dokumentasi** | https://console.groq.com/docs |



**2.2.10 Algoritma Prediksi Kelulusan (Chancing Engine)**
Seleksi akademik komersial tidak menetapkan *passing grade* mutlak. Penentu penerimaan bertumpu pada hukum persaingan probabilitas. *Chancing Engine* diformulasikan sebagai mesin kalkulasi probabilitas distribusi logistik (kurva *Sigmoid*) komputasional (Hosmer & Lemeshow, 2013). Algoritma ini menarik *input* skor $\theta$ subjek yang sudah dikonversi (skala 200-800), kemudian memetakan selisih (*deficit*) margin berbanding skor aman historis (*estimated score*) program studi target.
Kurva ini kemudian dimodifikasi derajat kemiringannya (*steepness*) menggunakan parameter koefisien daya tampung rasio keketatan (*competitiveness index*). Hasil keluaran (skala 0% hingga 100%) diparsing menjadi variabel klasifikasi linguistik: Aman, Bersaing, Peluang Cukup, Sulit, atau Sangat Sulit.

**2.2.11 Kerangka Kerja Web Modern (Next.js)**
Next.js (Vercel, 2024) merupakan kerangka pengembangan aplikasi web modern berbasis pustaka komponen *React*. Next.js menghadirkan evolusi perenderan topologi yang dikenal sebagai *Server Components*. Komponen spesifik dirender mutlak pada lingkungan tertutup peladen (Node.js runtime), dan hanya mentransmisikan *payload* HTML yang sudah difinalisasi (*de-hydrated*) kepada peramban (*browser*) siswa. Ini mengamankan rahasia *Environment Variables* (seperti *API keys* AI Tutor) dari paparan peretas di sisi klien, sekaligus menekan beban unduhan berkas JavaScript secara eksponensial.

**Tabel 2.5 Profil Teknologi Next.js**

| Spesifikasi | Keterangan |
|---|---|
| **Pengembang** | Vercel |
| **Tipe Kerangka Kerja** | React Framework untuk Produksi |
| **Lisensi** | MIT License (Open-source) |
| **Tautan Resmi** | https://nextjs.org |
| **Dokumentasi** | https://nextjs.org/docs |



**2.2.12 Manajemen State Global (Zustand)**
Zustand (Poimandres, 2024) diadopsi sebagai metode penyimpanan variabel *state global* minimalis. Dalam arsitektur aplikasi simulasi CBT berlapis yang rumit (seperti pewaktu mundur persisten dan matriks jawaban antar nomor soal), penggunaan *props-drilling* konvensional akan menciptakan siklus perenderan ulang (*re-rendering waterfall*) yang melumpuhkan *framerate* peramban. Zustand memecahkan masalah ini dengan skema pembaruan temporal *hooks* selektif, mengizinkan waktu pengerjaan soal dan obrolan AI (*chat history*) tetap sinkron seketika saat subjek berganti rute direktori.

**Tabel 2.6 Profil Teknologi Zustand**

| Spesifikasi | Keterangan |
|---|---|
| **Pengembang** | Poimandres (PMNDRS) |
| **Tipe Pustaka** | State Management untuk React |
| **Lisensi** | MIT License |
| **Tautan Repositori** | https://github.com/pmndrs/zustand |
| **Perintah Instalasi** | `npm install zustand` |



**2.2.13 Sistem Basis Data Relasional (PostgreSQL)**
PostgreSQL (PostgreSQL Global Development Group, 2024) adalah *Relational Database Management System* (RDBMS) berorientasi objek tingkat komersial. Reputasinya dibangun di atas fondasi kepatuhan arsitektur operasional ACID (*Atomicity, Consistency, Isolation, Durability*). Sifat absolut ACID ini wajib diimplementasikan pada skema pangkalan data ITS untuk mencegah insiden *race condition* atau korupsi rekam jejak presisi matriks jawaban subjek (0 dan 1) ketika subjek mengklik serangkaian input jawaban pada detik-detik terakhir (*high concurrency payload*) dalam mode pengujian simulasi UTBK.

**Tabel 2.7 Profil Teknologi PostgreSQL**

| Spesifikasi | Keterangan |
|---|---|
| **Pengembang** | PostgreSQL Global Development Group |
| **Tipe Sistem** | Relational Database Management System (RDBMS) |
| **Lisensi** | PostgreSQL License (Open-source) |
| **Tautan Resmi** | https://www.postgresql.org |
| **Dokumentasi** | https://www.postgresql.org/docs/ |



**2.2.14 Pengujian Perangkat Lunak (Black-Box Testing)**
*Black-Box Testing* merupakan metodologi verifikasi perangkat lunak empiris yang dijalankan dengan memeriksa luaran (*output*) fungsi sistem berdasarkan variasi parameter masukan (*input*), tanpa mengevaluasi atau membedah logika kode internal (*source code*) (Nidhra & Dondeti, 2012). Pengujian ini bertujuan untuk memastikan bahwa setiap fitur dapat beroperasi selaras dengan spesifikasi kebutuhan perangkat lunak. Pada metode ini, penguji berfokus secara eksklusif pada bagaimana sistem merespons interaksi pengguna akhir. Jika keluaran yang dihasilkan pada antarmuka sesuai dengan harapan komputasional, maka fungsi tersebut divalidasi berhasil. Metodologi ini memastikan integrasi antar fungsi eksternal (seperti navigasi soal dan respons kelulusan API) bertingkah stabil sesuai skenario *edge-case* yang ditetapkan.

**2.2.15 System Usability Scale (SUS)**
*System Usability Scale* (SUS) yang dikembangkan oleh John Brooke pada 1996 (Brooke, 1996) merupakan instrumen evaluasi ergonomi perangkat lunak untuk mengukur tingkat kemudahan penggunaan (*usability*) berdasarkan persepsi pengguna. Konsep ini mendayagunakan sepuluh proporsi butir pertanyaan afirmatif dan negatif secara bolak-balik menggunakan kerangka skala persetujuan lima tingkat (*Likert-scale*). Formulasi matematika dari kuesioner ini mengonversi bobot jawaban menjadi skor akhir dengan rentang 0 hingga 100. Semakin tinggi skor yang terakumulasi, semakin baik tingkat penerimaan sistem tersebut. Standarisasi metrik ini secara luas diandalkan untuk mengevaluasi kualitas interaksi antarmuka dan pengalaman pengguna (*user experience*) secara objektif.

**2.2.16 Pengujian Keamanan (Penetration Testing)**
*Penetration Testing* (Uji Penetrasi) merupakan metode pengujian keamanan agresif yang dieksekusi dengan cara mensimulasikan serangan siber terhadap suatu arsitektur sistem secara legal dan terkontrol (OWASP, 2024a). Pengujian ini didesain untuk mengidentifikasi celah kerentanan (*vulnerability*) pada infrastruktur jaringan maupun level aplikasi yang berpotensi dieksploitasi oleh entitas ancaman (*threat actor*). Berbeda dengan *Black-Box Testing* yang memvalidasi integritas fungsi, *Penetration Testing* difokuskan secara eksklusif untuk mengevaluasi tingkat ketahanan (*resilience*) dan postur keamanan sistem terhadap berbagai vektor serangan siber modern.

**2.2.17 Otomatisasi Pemindaian Keamanan (OWASP ZAP)**
*Zed Attack Proxy* (ZAP) merupakan perangkat lunak *open-source* yang dipelihara oleh *Open Web Application Security Project* (OWASP, 2024b) untuk memfasilitasi proses *Penetration Testing* pada aplikasi berbasis web. OWASP ZAP beroperasi dengan mencegat lalu lintas komunikasi sebagai proksi *man-in-the-middle* antara peramban klien dan peladen aplikasi. Melalui interseptor ini, sistem dapat memantau muatan data (*payload*) secara langsung serta menjalankan rutinitas pemindaian otomatis guna mendeteksi berbagai potensi kerentanan keamanan, seperti injeksi kode lintas-situs (*Cross-Site Scripting* / XSS), manipulasi basis data (*SQL Injection*), ketiadaan tajuk keamanan (*Missing Security Headers*), serta anomali konfigurasi server.

**Tabel 2.8 Profil Alat Keamanan OWASP ZAP**

| Spesifikasi | Keterangan |
|---|---|
| **Pengembang** | Open Web Application Security Project (OWASP) |
| **Fungsi** | Web Application Security Scanner / Intercepting Proxy |
| **Lisensi** | Apache License 2.0 |
| **Tautan Resmi** | https://www.zaproxy.org |
| **Dokumentasi** | https://www.zaproxy.org/docs/ |


