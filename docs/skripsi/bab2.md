# BAB II. TINJAUAN PUSTAKA DAN DASAR TEORI

## 2.1 Tinjauan Pustaka

Dalam pengembangan *platform* persiapan UTBK-SNBT berbasis web yang terintegrasi dengan *Intelligent Tutoring System*, penulis merujuk pada beberapa studi penelitian terdahulu yang mencakup penelitian berkaitan dengan *Intelligent Tutoring System* (ITS), sistem TryOut berbasis web, *Large Language Model* (LLM), *Item Response Theory* (IRT), serta *Cognitive Load Theory* yang mendukung perancangan antarmuka pengguna.

### 2.1.1 Penelitian Terkait Intelligent Tutoring System (ITS)

Dalam bidang *Intelligent Tutoring System* (ITS), beberapa penelitian menunjukkan bahwa sistem ini berperan penting dalam mendukung pembelajaran yang lebih personal dan adaptif. Puspita dkk. (2025) mengembangkan ITS berbasis *rule-based reasoning* yang diintegrasikan dengan *Large Language Model* (Gemini AI) untuk membantu siswa SMA dalam memahami materi kombinatorika. Hasil penelitian tersebut menunjukkan bahwa pemanfaatan kecerdasan buatan mampu meningkatkan pemberian penjelasan dan umpan balik otomatis, sehingga interaksi dalam proses belajar menjadi lebih aktif dan sesuai dengan kebutuhan siswa. Sementara itu, penelitian oleh Wiselee dkk. (2025) membahas pengembangan ITS berbasis web menggunakan *framework* Laravel dan MySQL untuk mendukung pembelajaran mandiri pada bidang *web development*. Sistem yang dikembangkan menyediakan materi terstruktur, latihan interaktif, serta umpan balik otomatis yang membantu meningkatkan kemandirian belajar siswa. Meskipun demikian, kedua penelitian tersebut masih berfokus pada pembelajaran materi tertentu dan belum diterapkan pada *platform* TryOut yang terintegrasi dengan proses evaluasi akademik serta belum memanfaatkan metode *scaffolding* bertingkat.

### 2.1.2 Penelitian Terkait Sistem TryOut Berbasis Web

Selain penelitian ITS, penelitian terkait TryOut atau sistem evaluasi pembelajaran digital menunjukkan bahwa *platform* seperti ini sudah cukup banyak dikembangkan untuk membantu siswa mempersiapkan diri menghadapi ujian masuk perguruan tinggi. Nugraha dan Hardiyanti (2025) mengembangkan sistem TryOut UTBK SNBT berbasis web yang tidak hanya digunakan untuk simulasi ujian tetapi juga dilengkapi fitur rekomendasi jurusan berdasarkan hasil pengerjaan siswa. Sementara itu, Affan dan Elhanafi (2025) mengembangkan aplikasi TryOut *online* yang terintegrasi dengan pengelolaan soal, pendaftaran peserta, penjadwalan ujian, dan penilaian otomatis. Kedua penelitian tersebut menunjukkan bahwa sistem TryOut berbasis web mampu meningkatkan efisiensi pelaksanaan ujian. Namun, sistem yang dikembangkan masih berfokus pada pelaksanaan dan pengelolaan ujian, serta belum menyediakan mekanisme pembelajaran adaptif, umpan balik interaktif berbasis AI selama proses pengerjaan soal, maupun penilaian berbasis IRT.

### 2.1.3 Penelitian Terkait Large Language Model (LLM) dalam Pendidikan

Penelitian mengenai *Large Language Model* (LLM) dalam bidang pendidikan menunjukkan bahwa teknologi ini memiliki peran yang cukup besar dalam mendukung proses pembelajaran modern. LLM banyak dimanfaatkan untuk berbagai kebutuhan seperti pembelajaran adaptif, sistem tutor pintar, hingga pemberian umpan balik otomatis kepada siswa (Kasneci dkk., 2023). Peláez-Sánchez dkk. (2024) menjelaskan bahwa penggunaan LLM dalam pendidikan dapat meningkatkan interaksi belajar karena sistem mampu memberikan penjelasan yang lebih kontekstual dan membantu siswa memahami materi secara lebih mandiri. Namun di sisi lain, LLM memiliki keterbatasan, terutama karena kecenderungannya memberikan jawaban secara langsung yang dapat mengurangi proses berpikir siswa jika tidak dikendalikan dengan baik, serta adanya risiko ketidakakuratan informasi dalam kondisi tertentu (Yan dkk., 2023). Oleh karena itu, dalam penerapannya di bidang pendidikan, LLM perlu diatur dengan pendekatan tertentu agar tetap berfungsi sebagai alat bantu belajar yang mendukung proses berpikir siswa, bukan sekadar memberikan jawaban instan.

### 2.1.4 Penelitian Terkait Item Response Theory (IRT)

Dalam bidang *Item Response Theory* (IRT), De Ayala (2009) memberikan landasan komprehensif mengenai teori dan praktik IRT, termasuk model 1-PL (Rasch), 2-PL, dan 3-PL yang sering digunakan dalam evaluasi pendidikan. Namun, penerapan IRT pada platform persiapan ujian umumnya masih terbatas pada mekanisme *Computerized Adaptive Testing* (CAT) tanpa menyediakan integrasi dengan *learning path*, *scaffolding* AI, atau prediksi peluang kelulusan.

### 2.1.5 Analisis Perbandingan Metode

Penelitian ini memilih empat metode utama yang dianggap optimal di bawah ini untuk menjawab keterbatasan penelitian terdahulu.

| Metode yang Dipilih | Dibandingkan Dengan | Alasan Pemilihan |
|---|---|---|
| **IRT 1-Parameter Logistic (1PL)** | *Classical Test Theory* (CTT) | Memperhitungkan tingkat kesulitan soal sehingga estimasi kemampuan lebih representatif dan tidak bergantung pada populasi spesifik tes. CTT hanya memberikan skor total tanpa memperhitungkan variasi kesulitan butir soal. |
| **Socratic Scaffolding** | *Direct Instruction* | Mendorong pemahaman konsep melalui bantuan bertahap, bukan pemberian jawaban instan. Pendekatan ini terbukti meningkatkan retensi jangka panjang dan mengurangi *rote learning*. |
| **Groq + Llama-3.1-8B** | GPT Proprietary (OpenAI) | Latensi lebih rendah, biaya inferensi lebih efisien untuk aplikasi edukasi skala besar, serta mendukung streaming respons yang meningkatkan interaktivitas. |
| **Analytics Route-Based** | Nested Tab Layout | Organisasi modul evaluasi sebagai route terpisah mengurangi beban kognitif siswa dengan meminimalkan elemen antarmuka yang tidak relevan dalam satu tampilan. |

#### 2.1.5.1 IRT 1PL vs Classical Test Theory

Classical Test Theory (CTT) merupakan pendekatan penilaian klasik yang mengandalkan skor mentah (jumlah jawaban benar) sebagai ukuran kemampuan siswa. Meskipun sederktor, CTT memiliki kelemahan fundamental: skor bergantung pada kesulitan spesifik soal yang digunakan dalam tes tertentu, sehingga tidak dapat dibandingkan lintas tes. Selain itu, CTT tidak memberikan informasi tentang tingkat kesulitan masing-masing butir soal. Sebaliknya, IRT 1PL (Rasch Model) memodelkan probabilitas jawaban benar sebagai fungsi kemampuan siswa (θ) dan kesulitan soal (b). Model ini menghasilkan estimasi kemampuan yang *invariant* terhadap populasi soal, memungkinkan perbandingan adil antar-siswa dan perpaduan soal lintas bank soal (Hambleton dkk., 1991). Parameter kesulitan soal (b) di penelitian ini ditetapkan melalui *expert judgment* dengan skala Mudah (-1.0), Sedang (0.0), dan Sulit (+1.0).

#### 2.1.5.2 Socratic Scaffolding vs Direct Instruction

*Direct Instruction* mempresentasikan materi melalui penjelasan langsung dan contoh yang sudah diselesaikan. Pendekatan ini cepat, namun sering kali melatih siswa menghafal langkah tanpa memahami konsep inti (*rote learning*). Sebaliknya, *Socratic Scaffolding* mengadaptasi prinsip *Zone of Proximal Development* (Vygotsky, 1978) dengan memberikan bantuan bertingkat: SOCRATIC (pertanyaan pemandu), HINT (petunjuk parsial), dan SOLUTION (penyelesaian lengkap). Pendekatan ini terbukti meningkatkan retensi jangka panjang karena memaksa siswa merefleksikan logika pemikirannya sendiri sebelum menerima jawaban (Paul & Elder, 2007).

#### 2.1.5.3 Groq + Llama-3.1 vs GPT Proprietary

Penggunaan model proprietary seperti GPT-4 menawarkan kualitas bahasa yang tinggi, namun memiliki kelemahan pada biaya inferensi yang mahal untuk aplikasi edukasi dengan ribuan pengguna simultan, serta latensi yang lebih tinggi. Groq mem-forward LLM (Llama-3.1-8B-instant) pada infrastruktur LPU (Language Processing Unit) yang dioptimalkan untuk inferensi, menghasilkan *time-to-first-token* (TTFT) di bawah 100 ms. Hal ini memungkinkan respons streaming yang terasa real-time pada panel AI Tutor, sebuah kebutuhan kritis untuk menjaga alur pemikiran siswa.

### 2.1.6 Ringkasan Kesenjangan Penelitian

Dari beberapa penelitian yang telah dikaji, ringkasan mengenai penelitian yang dilakukan direpresentasikan dalam Tabel 2.1 di bawah ini.

### Tabel 2.1 Tinjauan Pustaka

| Peneliti (Tahun) | Judul Penelitian | Model | Hasil Penelitian | Kekurangan Penelitian |
|---|---|---|---|---|
| Puspita dkk. (2025) | Perancangan *Website* ITS Berbasis *Rule-Based Reasoning* menggunakan Gemini AI Untuk Pembelajaran Kombinatorika Pada Siswa SMA Kelas 12 | SDLC, ITS dan *Rule-Based Reasoning*, Gemini AI | Sistem mampu memberikan penjelasan dan umpan balik otomatis secara interaktif. | Masih berfokus pada pembelajaran materi kombinatorika dan belum diterapkan pada sistem TryOut. Belum ada *scaffolding* bertingkat maupun penilaian IRT. |
| Wiselee dkk. (2025) | *Empowering Independent Learning in Web Development Using Intelligent Tutoring Systems* | SDLC, ITS berbasis Laravel & MySQL | Sistem membantu pembelajaran mandiri dengan materi dan latihan interaktif. | Pembelajaran terbatas pada bidang *web development*, belum memanfaatkan LLM dan belum menyediakan fitur evaluasi TryOut maupun analitik pembelajaran. |
| Nugraha & Hardiyanti (2025) | Rancang Bangun Sistem Tryout UTBK SNBT Berbasis Web dengan Fitur Rekomendasi Jurusan | *Waterfall*, *Web-based Tryout System* | Sistem menyediakan tryout dan rekomendasi jurusan berdasarkan hasil tes. | Belum memiliki fitur ITS, umpan balik adaptif, penilaian IRT, maupun integrasi LLM selama proses pengerjaan soal. |
| Affan & Elhanafi (2025) | Perancangan dan Implementasi Aplikasi Tryout *Online* Berbasis Web dengan Fitur Manajemen Soal dan Pendaftaran Terintegrasi | *Waterfall*, Sistem Tryout Terintegrasi | Sistem mampu mengelola tryout secara terpusat (soal, pendaftaran, jadwal). | Berfokus pada administrasi ujian. Belum mendukung pembelajaran adaptif, ITS, IRT, maupun analitik pembelajaran. |
| Kasneci dkk. (2023) | *ChatGPT for good? On opportunities and challenges of large language models for education* | LLM, NLP, AI in Education | LLM dapat mendukung pembelajaran adaptif dan interaktif, namun berisiko memberikan jawaban instan. | Masih bersifat *literature review* dan tidak membahas implementasi LLM pada sistem TryOut maupun ITS secara spesifik. |
| Yan dkk. (2023) | *Practical and Ethical Challenges of Large Language Models in Education: A Systematic Scoping Review* | LLM, *Systematic Review* | LLM memiliki potensi besar dalam pendidikan, tetapi memiliki tantangan pada akurasi, etika, dan kontrol respons. | Fokus pada kajian pustaka sehingga tidak menghasilkan implementasi sistem pembelajaran yang dapat digunakan langsung. |
| Peláez-Sánchez dkk. (2024) | *The impact of large language models on higher education* | LLM, *Higher Education*, AI *Learning System* | LLM meningkatkan interaksi pembelajaran dan personalisasi, namun memerlukan kontrol. | Fokus pada pendidikan tinggi dan belum membahas integrasi LLM pada sistem TryOut UTBK maupun *Chancing Engine*. |

Berdasarkan tinjauan pustaka dalam Tabel 2.1 dapat diketahui bahwa penelitian terkait ITS umumnya berfokus pada pemberian umpan balik dan pembelajaran adaptif pada materi tertentu, sedangkan penelitian mengenai sistem TryOut lebih menitikberatkan pada simulasi ujian dan pengelolaan evaluasi. Di sisi lain, penelitian terkait LLM menunjukkan potensi besar dalam meningkatkan kualitas interaksi pembelajaran, dan penelitian IRT menunjukkan keunggulan dalam estimasi kemampuan yang lebih adil. [PERLU KONFIRMASI PAK JOKO]

Meskipun berbagai penelitian telah membahas komponen-komponen tersebut secara terpisah, **belum ditemukan penelitian yang mengintegrasikan simulasi TryOut UTBK-SNBT, *Intelligent Tutoring System* berbasis LLM dengan *Socratic Scaffolding* bertingkat, penilaian *Item Response Theory*, *Chancing Engine* untuk prediksi peluang kelulusan, *Learning Path* personal, dan dasbor analitik terpadu dalam satu *platform* yang terintegrasi.**

Oleh karena itu, penelitian ini mengembangkan *platform* persiapan UTBK-SNBT berbasis web bernama Lexica yang mengintegrasikan seluruh komponen tersebut. Dengan adanya integrasi ini, sistem diharapkan dapat mendukung proses evaluasi dan pembelajaran secara lebih efektif bagi siswa yang mempersiapkan ujian *high-stakes*.

---

## 2.2 Dasar Teori

### 2.2.1 Ujian Tulis Berbasis Komputer – Seleksi Nasional Berdasarkan Tes (UTBK-SNBT)

Berdasarkan pedoman resmi dari instansi terkait yang menangani seleksi nasional penerimaan mahasiswa baru di Indonesia, UTBK-SNBT merupakan jalur seleksi masuk Perguruan Tinggi Negeri (PTN) yang diselenggarakan menggunakan sistem *Computer-Based Test* (CBT) dengan pengalokasian waktu spesifik per subtes. Secara konseptual, sistem pengujian seperti ini bersifat *performance-oriented*, yaitu ujian satu waktu (*one-shot*) dengan batas waktu ketat yang menuntut peserta tidak hanya memahami konsep, tetapi juga mampu menerapkannya secara efisien di bawah tekanan waktu. Pendekatan persiapan untuk ujian berkarakteristik ini umumnya difokuskan pada manajemen waktu dan keandalan kognitif dalam menyelesaikan soal terstruktur.

**Tabel 2.2** — Struktur Subtes UTBK-SNBT

| No | Komponen | Subtes | Fokus Pengukuran | Jumlah Soal | Durasi |
|:---:|---|---|---|:---:|:---:|
| 1 | TPS | Penalaran Umum (PU) | Penalaran deduktif, induktif, dan kuantitatif | 30 | 30 menit |
| 2 | TPS | Pengetahuan & Pemahaman Umum (PPU) | Wawasan umum dan kosakata kontekstual | 20 | 15 menit |
| 3 | TPS | Pemahaman Bacaan & Menulis (PBM) | Pemahaman wacana tertulis dan kaidah menulis | 20 | 25 menit |
| 4 | TPS | Pengetahuan Kuantitatif (PK) | Kemampuan numerik dan matematika dasar | 20 | 20 menit |
| 5 | Literasi | Literasi Bahasa Indonesia | Pemahaman wacana panjang Bahasa Indonesia | 30 | 42,5 menit |
| 6 | Literasi | Literasi Bahasa Inggris | *Reading literacy* Bahasa Inggris | 20 | 20 menit |
| 7 | Literasi | Penalaran Matematika | Penalaran matematis tingkat lanjut | 20 | 42,5 menit |
| | | | **Total** | **160 soal** | **195 menit** |

**Keterkaitan dengan Penelitian**
UTBK-SNBT menjadi konteks domain utama dalam penelitian ini. Struktur subtes, alokasi waktu per blok, dan format butir soal menjadi rujukan utama dalam perancangan simulasi ujian berbasis komputer.

### 2.2.2 Computer Based Test (CBT)

*Computer-Based Test* (CBT) merupakan metode pelaksanaan ujian dengan media komputer yang menggantikan sistem kertas dan pensil (*paper-based test*). CBT menawarkan kemudahan penjadwalan, pengamanan integritas jawaban, dan efisiensi pengukuran—terutama untuk ujian berskala nasional dengan ratusan ribu peserta. Dalam konteks UTBK-SNBT, platform CBT menyediakan *timer* ketat per subtes, penguncian navigasi antar blok soal, serta skor otomatis berbasis IRT (Hambleton dkk., 1991).

**Tabel 2.3** — Karakteristik CBT pada UTBK

| Karakteristik | Deskripsi |
|---|---|
| *Timer* per Subtes | Batas waktu ketat per blok soal untuk melatih manajemen waktu ujian |
| Penguncian Navigasi | Siswa tidak dapat kembali ke subtes sebelumnya, meniru aturan resmi BP3/SNPMB |
| Skor Otomatis | Penilaian langsung berbasis kunci jawaban dan parameter kesulitan soal |
| Layout Grid Soal | Navigasi visual status soal (terjawab, ragu, kosong) untuk memudahkan strategi pengerjaan |

**Keterkaitan dengan Penelitian**
Konsep CBT dengan timer per subtes dan penguncian navigasi menjadi dasar perancangan modul simulasi ujian pada penelitian ini.

### 2.2.3 Learning Analytics

*Learning Analytics* merupakan integrasi dari sains data dan edukasi yang secara konseptual bermakna sebagai proses pengukuran, pengumpulan, analisis, dan pelaporan data yang berkaitan dengan peserta didik dengan tujuan memahami dan mengoptimasi ekosistem pembelajaran (Siemens & Baker, 2012). Dengan analisis riwayat belajar, instrumen evaluasi dapat menyajikan ringkasan diagnostik kuantitatif. Bentuk representasi visual seperti grafik radial (*radar chart*) ataupun deret waktu (*time-series graph*) membantu pengguna melakukan refleksi mandiri (*self-regulated learning*) terhadap fluktuasi skor penguasaannya.

**Tabel 2.4** — Bentuk Visualisasi dalam *Learning Analytics*

| Jenis Visualisasi | Fokus Analisis |
|---|---|
| Grafik Radial (*Radar Chart*) | Pemetaan komparatif penguasaan antar beberapa domain secara bersamaan |
| Deret Waktu (*Time-Series*) | Pelacakan tren fluktuasi skor evaluasi melintasi poros waktu historis |
| Repositori Kesalahan | Agregasi riwayat pertanyaan evaluasi yang gagal diselesaikan dengan benar |
| *Scatter* Plot Performa | Hubungan antara akurasi dan kecepatan pengerjaan |

**Keterkaitan dengan Penelitian**
Konsep *Learning Analytics* digunakan sebagai dasar pengembangan fitur diagnostik pembelajaran untuk menyajikan perkembangan kemampuan siswa.

### 2.2.4 Personalized Learning Path

*Personalized Learning* merujuk pada kerangka instruksional yang menyelaraskan ritme, pendekatan, dan urutan materi dengan kebutuhan kognitif serta profil performa dari masing-masing pembelajar. Dalam sistem digital, personalisasi sering kali diejawantahkan melalui penyesuaian rute pembelajaran (*learning path*).

Rute pembelajaran yang dinamis dihitung melalui analisis data asinkron dari berbagai sumber evaluasi. Prioritas penyajian modul umumnya berbanding terbalik dengan metrik penguasaan, di mana topik dengan nilai pencapaian terendah akan ditempatkan pada urutan teratas untuk mendorong fokus perbaikan (*remedial focus*). Untuk memastikan penguasaan berkesinambungan, sistem *e-learning* juga dapat menerapkan restriksi berbasis syarat (prasyarat kelulusan modul) guna mencegah perpindahan materi secara prematur.

**Tabel 2.5** — Status Penguasaan Modul

| Status | Arti |
|---|---|
| *Not Started* | Bab belum pernah dipelajari |
| *In Progress* | Sedang dipelajari |
| *Completed* | Sudah selesai dan lulus ambang kelulusan |

**Tabel 2.6** — Mekanisme *Mastery Locking*

| Mekanisme | Fungsi |
|---|---|
| Prasyarat Bab | Bab lanjutan terkunci hingga bab sebelumnya selesai |
| Ambang Kelulusan | Skor minimum untuk menandai *Completed* |
| Re-Assessment | Ulangan otomatis pada bab yang belum dikuasai |

**Keterkaitan dengan Penelitian**
Konsep *Personalized Learning Path* dan *Mastery Learning* digunakan sebagai dasar penentuan rute belajar adaptif berdasarkan hasil evaluasi siswa dalam penelitian ini.

---

### 2.2.5 Artificial Intelligence dalam Pendidikan

Kecerdasan Buatan (AI) dalam pendidikan mengacu pada sistem komputasi yang mampu menirukan fungsi kognitif manusia—seperti pemahaman bahasa alami, penalaran, dan pembelajaran—untuk tujuan instruksional. Penerapan AI di bidang pendidikan tidak bertujuan mengganti peran guru, melainkan memperkuat proses pembelajaran dengan menyediakan umpan balik yang konsisten, adaptif, dan tersedia kapan saja (*anytime, anywhere*). 

Beberapa pilar utama AI dalam pendidikan meliputi: (1) **Sistem Tutor Pintar (ITS)** yang mereplikasi bimbingan personal; (2) **Analitik Prediktif** yang mengidentifikasi risiko kegagalan sejak dini; (3) **Pembelajaran Adaptif** yang menyesuaikan konten dengan profil kognitif siswa; serta (4) **Asisten Percakapan (Conversational AI)** yang memfasilitasi explorasi mandiri. 

**Tabel 2.7** — Pilar Utama AI dalam Pendidikan

| Pilar | Definisi |
|---|---|
| ITS | Sistem yang mereplikasi bimbingan tutor manusia secara adaptif |
| Adaptive Learning | Penyesuaian ritme dan urutan materi berdasarkan profil siswa |
| Predictive Analytics | Proyeksi risiko atau peluang berdasarkan data historis |
| Conversational AI | Agen percakapan untuk eksplorasi mandiri |

**Keterkaitan dengan Penelitian**
AI dalam pendidikan menjadi landasan penggunaan kecerdasan buatan untuk sistem tutor adaptif dalam penelitian ini.

### 2.2.6 Large Language Model (LLM)

*Large Language Model* (LLM) merupakan model komputasi kecerdasan buatan berbasis arsitektur *deep learning*, khususnya *transformer*, yang dilatih pada himpunan data teks (*corpus*) dalam skala sangat masif. Pelatihan tersebut memungkinkan model memetakan probabilitas transisi distribusi kata dan merangkai probabilitas tersebut untuk menghasilkan keluaran teks dalam bahasa alami yang memiliki tata bahasa, konteks, serta kelogisan semantik yang tinggi (Brown dkk., 2020).

**Tabel 2.8** — Karakteristik LLM untuk Edukasi

| Karakteristik | Deskripsi |
|---|---|
| Konteks Panjang | Kemampuan memori jangka panjang dalam percakapan |
| *Reasoning* | Kemampuan menelusuri langkah logika |
| Instruksi Khusus (*Instruction Following*) | Kepatuhan terhadap aturan prompt |
| Streaming Output | Respons bertahap (*token-by-token*) |

**Keterkaitan dengan Penelitian**
LLM digunakan sebagai dasar pengembangan sistem tutor cerdas yang mampu memberikan umpan balik kontekstual dalam penelitian ini.

### 2.2.7 Socratic Scaffolding

*Scaffolding* merupakan metode instruksional berupa pemberian dukungan belajar secara bertahap yang kemudian dikurangi secara perlahan (*fading*) seiring dengan meningkatnya kompetensi peserta didik. Konsep ini berakar pada teori *Zone of Proximal Development* (ZPD) dari Vygotsky (1978), yang mendeskripsikan ruang antara kemampuan aktual siswa (ketika belajar mandiri) dan kemampuan potensialnya (ketika belajar dengan bimbingan fasilitator).


**Tabel 2.9** — Level *Scaffolding* dalam Pembelajaran Adaptif

| Level | Fungsi | Contoh Pendekatan |
|---|---|---|
| SOCRATIC | Pertanyaan pemandu untuk memicu pemikiran kritis | "Apa yang terjadi jika kita balik kedua ruas?" |
| HINT | Petunjuk parsial yang mengarahkan ke konsep yang benar | "Perhatikan aturan distribusi pada soal nomor 5." |
| SOLUTION | Pembahasan lengkap dengan Konsep, Langkah, Kesalahan Umum, dan Soal Latihan | "Konsep yang diuji adalah ... Langkah 1: ..." |

**Keterkaitan dengan Penelitian**
Socratic Scaffolding menjadi kerangka pedagogis pilihan untuk sistem tutor adaptif dalam penelitian ini, menggantikan pemberian jawaban instan dengan bantuan bertingkat yang mendorong pemikiran kritis siswa.

### 2.2.8 Item Response Theory (IRT)

*Item Response Theory* (IRT) merupakan paradigma psikometrik yang memodelkan probabilitas peserta tes menjawab benar suatu butir soal sebagai fungsi matematis dari kemampuan laten peserta (dilambangkan dengan $\theta$) dan karakteristik butir soal tersebut. Pendekatan ini memberikan estimasi yang bersifat *invariant* terhadap populasi, sehingga metrik kemampuan siswa tidak semata-mata bergantung pada jumlah jawaban benar, melainkan juga memperhitungkan parameter kesulitan masing-masing soal (Hambleton dkk., 1991).

**Model 1-Parameter Logistic (Rasch Model)**
Pada model paling dasar ini, parameter butir soal yang diestimasi hanyalah tingkat kesulitan ($b$). Probabilitas seorang siswa dengan kemampuan $\theta$ untuk menjawab benar soal dengan tingkat kesulitan $b$ dihitung dengan fungsi logistik:

$$P(\theta) = \frac{1}{1 + e^{-(\theta - b)}}$$

Nilai kemampuan siswa diperoleh melalui iterasi *Maximum Likelihood Estimation* (MLE) dengan pembaruan:

$$\theta_{k+1} = \theta_k + \frac{\sum (U_i - P_i)}{\sum P_i (1 - P_i)}$$

Konvergensi dicapai jika $|\Delta \theta| < 0.001$ atau iterasi mencapai 50. Nilai $\theta$ kemudian dikonversi ke skala SNBT (200–800):

$$\text{Skor SNBT} = 500 + (\theta \times 100)$$

**Tabel 2.10** — Pemetaan Kategori Kesulitan ke Parameter $b$

| Nilai $b$ | Tingkat | Interpretasi |
|---|---|---|
| -1.0 | Mudah | P(θ) tinggi untuk siswa dengan kemampuan rata-rata (θ = 0) |
| 0.0 | Sedang | P(θ) ≈ 50% untuk siswa dengan kemampuan rata-rata |
| +1.0 | Sulit | P(θ) rendah untuk siswa dengan kemampuan rata-rata |

**Keterkaitan dengan Penelitian**
IRT 1PL digunakan sebagai metode penilaian utama untuk menghasilkan estimasi kemampuan siswa yang lebih representatif dibanding skor mentah.

### 2.2.9 Chancing Prediction (Prediksi Peluang Kelulusan)

Metodologi prediksi kelulusan ujian seleksi bergantung pada persilangan antara nilai komposit kemampuan peserta dan standar daya tampung serta tingkat popularitas suatu program. Pada penelitian ini, *Chancing Engine* menggunakan pendekatan **fungsi logistik (sigmoid)** yang dipusatkan pada estimasi skor aman jurusan, dengan kecuraman kurva ($k$) yang dipengaruhi tingkat keketatan kompetisi:

$$P(x) = \frac{1}{1 + e^{-k(\text{SkorSiswa} - \text{SkorEstimasi} - \delta)}}$$

Pendekatan ini dipilih karena menghasilkan transisi probabilitas yang lebih halus dan realistis dibandingkan pendekatan bucket linear sederhana, serta menghindari klaim peluang ekstrem 0% atau 100%. Parameter $\delta$ (midpoint shift) memastikan bahwa meraih skor tepat di ambang estimasi menghasilkan peluang sekitar 40% (bukan 50%), mencerminkan ketidakpastian inheren dalam proses seleksi. Label hasil dikategorikan berdasarkan persentase akhir: **AMAN** ($\ge65\%$), **BERSAING** ($\ge45\%$), **PELUANG_CUKUP** ($\ge30\%$), **SULIT** ($\ge15\%$), dan **SANGAT_SULIT** ($<15\%$).

**Keterkaitan dengan Penelitian**
Prediksi peluang kelulusan (*chancing*) digunakan untuk memberikan evaluasi kelayakan jurusan berbasis data kemampuan siswa dalam penelitian ini.

---

### 2.2.10 Framework Next.js

Next.js adalah *framework* React untuk produksi yang menyediakan struktur proyek terstandarisasi, routing berbasis file sistem, optimasi gambar, serta penanganan *middleware* untuk autentikasi dan penulisan ulang URL. Versi yang digunakan dalam penelitian ini adalah versi 16, yang mengadopsi arsitektur **App Router** sebagai model navigasi utama.

**Tabel 2.11** — Mode Rendering Next.js

| Mode | Fungsi |
|---|---|
| **SSR** | *Server-Side Rendering* — render penuh di server per-request |
| **CSR** | *Client-Side Rendering* — render di browser setelah JS dimuat |
| **Streaming** | Render bertahap (streaming HTML) |

**Referensi:**
Next.js, Inc. (2025). *Next.js 16 Documentation*. Diakses dari https://nextjs.org/docs

**Keterkaitan dengan Penelitian**
Framework ini dipilih karena arsitektur App Router yang mendukung SSR dan Streaming, sesuai dengan kebutuhan sistem web modern yang dibangun dalam penelitian ini.

### 2.2.11 REST API

*Application Programming Interface* (API) adalah antarmuka abstrak yang memungkinkan dua sistem terpisah saling bertukar perintah dan data. Dalam arsitektur web modern, REST (*Representational State Transfer*) menjadi gaya arsitektur yang dominan untuk merancang API karena kesederhanaannya, skalabilitasnya, dan kemampuannya bekerja di atas protokol HTTP stateless.

**Tabel 2.12** — Metode HTTP

| Method | Fungsi |
|---|---|
| **GET** | Mengambil data tanpa mengubah state |
| **POST** | Menambah data atau memicu aksi |
| **PUT** | Memperbarui data yang ada |
| **DELETE** | Menghapus data |

**Referensi:**
Fielding, R. T. (2000). *Architectural Styles and the Design of Network-based Software Architectures*. Diakses dari https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm

**Keterkaitan dengan Penelitian**
REST API digunakan sebagai antarmuka komunikasi antar komponen dalam sistem yang dibangun dalam penelitian ini.

### 2.2.12 Groq API

Groq adalah penyedia layanan inferensi LLM berbasis *hardware* LPU (*Language Processing Unit*) yang dioptimalkan untuk latensi mikro-detik. Berbeda dengan GPU konvensional, arsitektur Groq memungkinkan *time-to-first-token* (TTFT) di bawah 100 ms, menjadikannya layanan ideal untuk aplikasi yang membutuhkan respons *real-time* (Groq, Inc., 2025).

**Referensi:**
Groq, Inc. (2025). *Groq Console Documentation*. Diakses dari https://console.groq.com/docs

**Keterkaitan dengan Penelitian**
Layanan inferensi LLM berbasis *hardware* LPU digunakan sebagai mesin inti sistem tutor adaptif dalam penelitian ini karena kemampuannya menghasilkan respons dengan latensi mikro-detik.

### 2.2.13 Prisma ORM

Prisma adalah *Object-Relational Mapper* (ORM) Next-generation untuk bahasa TypeScript dan Node.js yang menyediakan cara deklaratif untuk mendefinisikan skema basis data dan berinteraksi dengannya. Prisma mengubah tabel database menjadi model objek yang strongly-typed, sehingga proses CRUD (*Create, Read, Update, Delete*) dapat dilakukan dengan *type-safety* penuh (*end-to-end type safety*).

**Tabel 2.13** — Fitur Utama ORM

| Fitur | Fungsi |
|---|---|
| *Schema-first* | Skema didefinisikan sebelum migrasi |
| *Migrations* | Versi kontrol perubahan skema |
| *Type-Safe Query* | Menghasilkan tipe otomatis dari skema |
| *Database Studio* | GUI untuk inspeksi dan edit data |

**Referensi:**
Prisma (2025). *Prisma Documentation*. Diakses dari https://www.prisma.io/docs

**Keterkaitan dengan Penelitian**
ORM digunakan sebagai lapisan abstraksi untuk mengelola operasi basis data relasional dalam penelitian ini.

### 2.2.14 PostgreSQL

PostgreSQL adalah sistem manajemen basis data relasional (RDBMS) *open-source* yang mendukung ekstensi SQL/JSON, integritas transaksional ACID, serta konkuensi tinggi. RDBMS memungkinkan penanganan data relasi yang kompleks—misalnya relasi banyak-ke-banyak antara entitas ujian, soal, dan respons siswa—serta dukungan indexing yang memadai untuk analitik pembelajaran.

**Tabel 2.14** — Karakteristik RDBMS

| Kriteria | Nilai |
|---|---|
| ACID Compliance | Penuh, menjamin konsistensi data transaksional |
| Relasi Kompleks | Mendukung *foreign key* dan *junction table* |
| JSON/JSONB | Kolom JSON untuk metadata fleksibel |
| *Connection Pooling* | Efisien untuk menangani permintaan simultan |

**Referensi:**
PostgreSQL Global Development Group. (2025). *PostgreSQL 17 Documentation*. Diakses dari https://www.postgresql.org/docs/

**Keterkaitan dengan Penelitian**
Sistem manajemen basis data relasional digunakan untuk menampung seluruh data persistensi dengan jaminan integritas transaksional dalam penelitian ini.

### 2.2.15 Zustand

Zustand adalah pustaka manajemen *state* global untuk React yang berbasis *hook* dengan API minimalis dan tanpa *boilerplate* ekstrem. Berbeda dengan konteks React bawaan atau Redux, Zustand memungkinkan pembaruan state selektif tanpa memicu *re-render* komponen yang tidak bergantung pada data yang berubah (Poimandres, 2025).

**Tabel 2.15** — Perbandingan State Management

| Solusi | Ukuran Bundle | Kerumitan |
|---|---|---|
| Context API | Bundled React | Rendah |
| Redux Toolkit | ~15 kB | Sedang |
| **Zustand** | ~1 kB | Sangat Rendah |

**Referensi:**
Poimandres. (2025). *Zustand Documentation*. Diakses dari https://zustand-demo.pmnd.rs

**Keterkaitan dengan Penelitian**
Pustaka manajemen *state* global digunakan untuk mengelola variabel aplikasi yang memerlukan sinkronisasi lintas komponen dalam penelitian ini.

### 2.2.16 React Markdown + KaTeX

`react-markdown` adalah pustaka untuk merender konten Markdown menjadi elemen React, sedangkan KaTeX adalah pustaka rendering matematika LaTeX yang cepat dan *web-friendly*. Kombinasi keduanya memungkinkan penampilan rumus matematika kompleks dalam konten pembelajaran tanpa mengorbankan performa.

**Tabel 2.16** — Library Rendering Markdown dan Matematika

| Library | Fungsi |
|---|---|
| `react-markdown` | Parse Markdown ke elemen React |
| `remark-math` | Deteksi sintaks `$...$` dan `$$...$$` |
| `rehype-katex` | Render LaTeX ke HTML + CSS |

**Referensi:**
- remarkjs. (2025). *react-markdown*. Diakses dari https://github.com/remarkjs/react-markdown
- KaTeX Contributors. (2025). *KaTeX*. Diakses dari https://katex.org

**Keterkaitan dengan Penelitian**
Pustaka rendering markdown dan matematika digunakan untuk menampilkan konten teks dan rumus dalam modul pembelajaran penelitian ini.

### 2.2.17 Recharts

Recharts adalah pustaka visualisasi data berbasis D3.js yang dibangun sebagai komponen React deklaratif. Recharts menyediakan *chart* responsif (Radar, Line, Bar, Area) dengan dukungan *tooltip*, *legend*, dan *animation* bawaan tanpa konfigurasi berulang (Recharts, 2025).

**Tabel 2.17** — Jenis Grafik pada Visualisasi Data

| Grafik | Digunakan Untuk |
|---|---|
| *Radar Chart* | Profil kemampuan multidomain |
| *Area Chart* | Tren skor dari waktu ke waktu |
| *Bar Chart* | Perbandingan nilai per kategori |
| *Treemap / Pie* | Komposisi hasil |

**Referensi:**
Recharts. (2025). *Recharts Documentation*. Diakses dari https://recharts.org

**Keterkaitan dengan Penelitian**
Pustaka visualisasi data digunakan untuk menyajikan hasil analitik pembelajaran dalam bentuk grafik interaktif dalam penelitian ini.

---

### 2.2.18 Black-Box Testing

*Black-Box Testing* merupakan metodologi pemastian mutu (*quality assurance*) instrumen perangkat lunak yang secara harfiah mengabaikan logika internal atau kode sumber dari komponen bersangkutan. Penguji memberikan kumpulan masukan acak maupun terstruktur pada antarmuka sistem, kemudian mengevaluasi akurasi dari keluaran mekanis berdasarkan prasyarat fungsi yang terdokumentasi (*spesifikasi kebutuhan*). Teknik ini vital untuk mengevaluasi fungsionalitas murni dari perspektif pengalaman akhir operasional (Nidhra & Dondeti, 2012).

**Referensi:**
Nidhra, S., & Dondeti, J. (2012). Black box testing. *International Journal of Computer Science and Network Security, 12*(2), 87–90.

**Keterkaitan dengan Penelitian**
Metodologi *Black-Box Testing* digunakan untuk menguji fungsionalitas sistem tanpa mempertimbangkan struktur internal kode dalam penelitian ini.

### 2.2.19 System Usability Scale (SUS)

*System Usability Scale* (SUS) diposisikan sebagai instrumen kuesioner standar dan tervalidasi yang diakui secara global untuk mengukur persepsi kebergunaan suatu produk atau sistem (Brooke, 1996). Instrumen ini terdiri dari 10 pernyataan dengan skala Likert 5 poin dan dihitung dengan rumus khusus untuk menghasilkan skor 0–100, di mana nilai ≥ 68 dianggap *acceptable* (Sauro & Lewis, 2016).

**Tabel 2.18** — Tema Pernyataan Standar SUS

| Kelompok Pernyataan | Fokus Penilaian Evaluatif | Arah Penilaian |
|---|---|---|
| Item 1 & 3 | Hasrat penggunaan jangka panjang dan kemudahan operasional secara makro | Positif |
| Item 2 & 8 | Persepsi atas tingkat kerumitan dan kerepotan instruksional sistem | Negatif |
| Item 4 & 10 | Kebergantungan pada dukungan fasilitator atau pelatihan eksternal pratugas | Negatif |
| Item 5 & 6 | Konsistensi antarmuka dan keterpaduan interaksi ragam fungsi di dalam ekosistem | Positif / Negatif |
| Item 7 & 9 | Kurva pembelajaran (*learning curve*) bagi pengguna baru dan rasa percaya diri pengguna | Positif |

**Referensi:**
- Brooke, J. (1996). SUS: A "quick and dirty' usability scale. Diakses dari https://uiuxdesign.ninja/sus/
- Sauro, J., & Lewis, J. R. (2016). *Quantifying the User Experience: Practical Statistics for User Research*. Diakses dari https://measuringu.com/sus/

**Keterkaitan dengan Penelitian**
*System Usability Scale* (SUS) digunakan untuk mengukur persepsi kebergunaan sistem dari sisi pengguna akhir dalam penelitian ini.

---

## 2.2.20 Analisis Perbandingan Metode (Rangkuman)

Penelitian ini mengadopsi strategi banding yang melibatkan tiga metode utama yang dianggap memberikan nilai tambah signifikan dibanding alternatif konvensional.

### Tabel 2.19 — Ringkasan Perbandingan Metodologis

| Metode | Dasar Teori | Alternatif yang Ditinggalkan | Keunggulan yang Dieksploitasi |
|---|---|---|---|
| **IRT 1PL** | Psikometri (Hambleton dkk., 1991) | CTT | Invariansi soal, estimase kemampuan yang adil |
| **Socratic Scaffolding** | Konstruktivisme (Vygotsky, 1978; Paul & Elder, 2007) | Direct Instruction | Retensi jangka panjang, minimasi *rote learning* |
| **Route-Based Analytics** | Pembelajaran Berbasis Data (Siemens & Baker, 2012) | Nested Tab Layout | Beban kognitif minimal, kesesuaian navigasi |

---

*Dokumen ini merefleksikan status penelitian pada tanggal 13 Juli 2026.*
