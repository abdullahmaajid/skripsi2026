# BAB I. PENDAHULUAN

## 1.1. Latar Belakang

Ujian Tulis Berbasis Komputer – Seleksi Nasional Berdasarkan Tes (UTBK-SNBT) merupakan mekanisme seleksi utama bagi siswa SMA di Indonesia untuk meraih kursi di Perguruan Tinggi Negeri (PTN). Setiap tahunnya, lebih dari 700.000 peserta mendaftar dan bersaing dalam ujian ini dengan tingkat persaingan yang sangat tinggi. Berbeda dengan ujian kenaikan kelas yang bersifat kumulatif dan *mastery-oriented*, UTBK-SNBT merupakan ujian *high-stakes* bersifat *one-shot* dengan batas waktu ketat yang menuntut kecepatan, ketepatan, dan strategi belajar yang efisien.

Dalam menghadapi ujian tersebut, banyak siswa mengandalkan *platform* TryOut daring sebagai sarana persiapan mandiri. Namun, berdasarkan observasi terhadap ekosistem *platform* yang tersedia saat ini, sebagian besar sistem masih bersifat satu arah. Sistem umumnya hanya menampilkan soal, menghitung skor akhir berupa persentase benar atau salah, tanpa memberikan peta jalan tindakan (*actionable roadmap*) yang membantu siswa memahami letak kesalahan mereka secara spesifik. Siswa mengetahui bahwa mereka lemah pada satu subtes, tetapi tidak memperoleh informasi mengenai bab mana yang harus dipelajari kembali.

Kondisi ini diperparah oleh budaya "menyuapi" jawaban yang masih melekat pada banyak *platform* persiapan. Kunci jawaban beserta pembahasan lengkap diberikan secara instan setelah siswa menyelesaikan soal. Secara teoretis, pendekatan ini melatih siswa untuk menghafal langkah jawaban (*rote learning*) alih-alih memahami konsep dasarnya, sebuah praktik yang tidak mendorong pembentukan skema pengetahuan yang bermakna, sebagaimana ditekankan dalam prinsip *Cognitive Load Theory* (Sweller, 1988). Ketika tipe soal dimodifikasi sedikit pada ujian yang sebenarnya, siswa kesulitan menjawab karena tidak memiliki pemahaman konseptual yang mendalam.

Tidak adanya umpan balik yang bertahap dan kontekstual pada *platform* TryOut memunculkan permasalahan yang dikenal sebagai *feedback gap*. Umpan balik formatif seharusnya diberikan secara langsung di setiap tahap evaluasi agar siswa dapat segera menyadari dan memperbaiki kesalahannya. Jika siswa tidak mengetahui letak kesalahan secara *real-time*, proses pembentukan pemahaman konsep akan terhambat, yang pada akhirnya menurunkan kemandirian belajar dan motivasi siswa.

Salah satu pendekatan yang berpotensi mengatasi permasalahan tersebut adalah Intelligent Tutoring System (ITS). ITS merupakan sistem pembelajaran cerdas yang dirancang untuk memberikan bimbingan yang disesuaikan dengan kondisi dan kebutuhan masing-masing siswa, menyerupai peran tutor manusia. Berbeda dengan sistem evaluasi konvensional, ITS mampu menganalisis jawaban siswa dan memberikan umpan balik terhadap proses belajar mereka.

Peluang untuk membangun ITS dengan umpan balik yang lebih kontekstual dan real-time semakin terbuka berkat kemajuan teknologi Large Language Model (LLM) (Kasneci dkk., 2023). LLM memiliki kemampuan memahami konteks bahasa alami dan menghasilkan respons yang menyerupai interaksi manusia, sehingga ITS dapat memberikan petunjuk dan penjelasan yang lebih fleksibel dibandingkan pendekatan berbasis aturan (rule-based) pada sistem tradisional. Namun, penggunaan LLM secara langsung juga memiliki risiko mendorong siswa bergantung pada jawaban instan. Oleh karena itu, diperlukan mekanisme pengendalian melalui prompt engineering agar LLM berperan sebagai tutor yang membimbing, bukan sekadar pemberi jawaban (Yan dkk., 2023).

Selain aspek pembimbingan, sistem penilaian yang adil juga menjadi kebutuhan krusial. Mayoritas *platform* TryOut masih menggunakan *Classical Test Theory* (CTT) yang menghitung skor berdasarkan persentase jawaban benar tanpa mempertimbangkan tingkat kesulitan butir soal. Pendekatan ini menghasilkan skor yang tidak invariant terhadap populasi tes dan tidak dapat memisahkan kemampuan siswa dari kesulitan item. *Item Response Theory* (IRT) menawarkan solusi yang lebih adil dengan memodelkan hubungan antara kemampuan laten siswa (θ) dan probabilitas menjawab benar suatu butir soal berdasarkan tingkat kesulitannya (Hambleton dkk., 1991).

Di sisi lain, siswa UTBK juga menghadapi kecemasan akademis terkait informasi kelulusan yang simpang siur. Banyak klaim tidak berdasar mengenai batas nilai kelulusan (*passing grade*) yang beredar di kalangan siswa, menyebabkan kecemasan berlebih atau rasa percaya diri yang semu. Diperlukan simulator yang mampu memberikan estimasi peluang kelulusan berbasis data yang lebih terukur.

Berdasarkan permasalahan tersebut, penelitian ini mengusulkan pengembangan *platform* persiapan UTBK-SNBT berbasis web bernama **Lexica** yang mengintegrasikan *Intelligent Tutoring System* berbasis *Large Language Model* Llama-3.1 melalui Groq API. Sistem dirancang tidak hanya sebagai alat evaluasi, tetapi juga sebagai tutor virtual yang mendampingi siswa selama proses pembelajaran dengan pendekatan *Socratic Scaffolding* bertingkat.

Pada mode latihan soal, sistem menerapkan mekanisme *Second Chance* dengan tiga level scaffolding. Pada percobaan pertama yang salah, AI Tutor memberikan pertanyaan pemandu (*Socratic*) untuk memicu pemikiran kritis. Pada percobaan kedua yang salah, AI memberikan petunjuk (*Hint*) yang lebih langsung. Pada percobaan ketiga yang salah atau saat batas toleransi frustrasi kognitif tercapai, sistem secara otomatis memberikan pembahasan lengkap (*Solution*). Pendekatan ini didasarkan pada prinsip *Cognitive Load Theory* (Sweller, 1988) yang membedakan antara *extraneous cognitive load* (beban yang harus diminimalkan) dan *intrinsic cognitive load* (beban yang harus difokuskan).

Keunggulan utama Lexica terletak pada fitur *Zero-Friction Context Injection*, yaitu saat siswa menjawab salah, metadata soal (teks soal, pilihan siswa, dan kunci jawaban) otomatis diinjeksi ke konteks AI tanpa siswa harus mengetik ulang soal. Kunci jawaban disembunyikan di antarmuka pengguna menggunakan masking `???` agar tidak bocor, namun AI di *backend* menerima data utuh untuk memberikan respons yang kontekstual. Mekanisme ini mengeliminasi *extraneous cognitive load* sehingga kapasitas *working memory* siswa sepenuhnya difokuskan pada pemahaman konsep.

Sistem juga dilengkapi dengan penilaian berbasis IRT 1-Parameter Logistic (Rasch Model) yang memberikan skor kemampuan (θ) yang adil, *Chancing Engine* untuk estimasi peluang kelulusan pada program studi target, *Learning Path* personal berbasis analisis kelemahan per bab, dan dasbor analitik terpadu yang mengkonsolidasikan grafik radar penguasaan 7 subtes, tren perkembangan skor, bank soal salah (*active recall*), dan prediksi peluang kelulusan dalam modul terpisah berbasis route (`/analytics/radar`, `/analytics/trend`, `/analytics/evaluation`, `/analytics/chancing`, `/analytics/explorer`, `/analytics/subject/[id]`) tanpa sistem tab *nested layout*.

Untuk mendukung pengembangan tersebut, *framework* **Next.js 16.2.6 (React 19)** dengan App Router dipilih karena mendukung *server-side rendering*, *streaming*, dan *nested layout* yang memungkinkan perpindahan tab analitik tanpa *full-page reload*. Manajemen *state* menggunakan **Zustand (v5)** untuk mengelola konteks soal, timer, dan riwayat *chat* AI secara efisien.

Dengan integrasi antara Next.js, LLM, IRT, dan konsep ITS berbasis *Socratic Scaffolding*, penelitian ini bertujuan untuk mengembangkan *platform* persiapan UTBK-SNBT yang tidak hanya menjadi alat evaluasi, tetapi juga sebagai sistem pembelajaran adaptif yang mampu mendampingi siswa secara efisien, terukur, dan personal sesuai dengan karakteristik ujian *high-stakes* yang bersifat *performance-oriented*.

---

## 1.2. Rumusan Masalah

Rumusan masalah dalam penelitian ini adalah sebagai berikut:

1. Siswa masih mengalami kesulitan dalam memahami letak kesalahan dan konsep yang mendasarinya secara mandiri karena *platform* TryOut UTBK yang tersedia umumnya hanya menampilkan skor akhir tanpa memberikan umpan balik yang kontekstual, bertahap, dan *real-time* selama proses pengerjaan soal.
2. Sistem penilaian pada *platform* TryOut yang tersedia masih menggunakan skor persentase mentah (*Classical Test Theory*) yang tidak memperhitungkan tingkat kesulitan butir soal, sehingga estimasi kemampuan siswa menjadi kurang akurat dan tidak adil.
3. Siswa tidak memiliki gambaran yang terukur mengenai peluang kelulusan pada program studi target karena informasi *passing grade* yang beredar bersifat tidak resmi dan simpang siur.
4. Rute belajar siswa masih bersifat generik dan tidak disesuaikan dengan kelemahan spesifik individu, sehingga proses persiapan menjadi kurang efisien.

---

## 1.3. Batasan Masalah

Batasan masalah dalam penelitian ini adalah sebagai berikut:

1. Penelitian ini dibatasi pada persiapan UTBK-SNBT untuk siswa SMA/MA/SMK dan alumni (gap year), dengan dua jenis pengguna utama, yaitu Siswa dan Admin.
2. Ruang lingkup penelitian mencakup simulasi ujian komputer, latihan soal per bab, prediksi peluang kelulusan, dan analitik perkembangan belajar.
3. Pembelajaran adaptif menggunakan kecerdasan buatan dibatasi pada pendekatan bimbingan bertingkat.
4. Penilaian kemampuan siswa menggunakan model IRT 1-Parameter Logistic (Rasch Model). Parameter kesulitan butir soal ($b$) ditentukan melalui penilaian ahli, bukan melalui kalibrasi empiris berskala besar.
5. Data program studi, daya tampung, jumlah peminat, dan estimasi skor aman bersumber dari data sekunder publik, bukan data resmi yang diterbitkan oleh SNPMB/BP3.
6. Pemodelan IRT digunakan pada skema TryOut linear konvensional untuk estimasi skor kemampuan (θ), bukan untuk pemilihan butir soal adaptif secara dinamis (*Computerized Adaptive Testing* / CAT).
7. Penelitian ini tidak mencakup fitur manajemen kelas, forum diskusi, atau presensi kehadiran.

---

## 1.4. Tujuan Penelitian

Tujuan utama penelitian ini adalah mengembangkan platform persiapan UTBK-SNBT berbasis web yang mengintegrasikan Intelligent Tutoring System berbasis Large Language Model untuk memberikan pembelajaran adaptif dan personal.

Untuk mencapai tujuan utama tersebut, penelitian ini memiliki tujuan spesifik sebagai berikut:
- Mengimplementasikan *Large Language Model* (LLM) sebagai *Intelligent Tutoring System* (ITS) dengan metode *Socratic Scaffolding* bertingkat untuk memberikan bimbingan pembelajaran secara kontekstual dan bertahap.
- Mengimplementasikan algoritma *Item Response Theory* (IRT) 1-Parameter Logistic (Rasch Model) untuk memberikan estimasi kemampuan siswa (θ) yang lebih adil dibandingkan skor persentase mentah, serta mengonversinya ke skala skor UTBK (200–800).
- Mengembangkan *Chancing Engine* yang mampu memberikan estimasi peluang kelulusan pada program studi target berdasarkan skor IRT siswa, rasio keketatan, dan data daya tampung.
- Merancang antarmuka pengguna yang meminimalkan *extraneous cognitive load* berdasarkan prinsip *Cognitive Load Theory* melalui konsolidasi navigasi, *zero-friction context injection*, dan mekanisme *auto-trigger* pembahasan AI.

---

## 1.5. Manfaat Tugas Akhir

Manfaat tugas akhir dari penelitian ini adalah sebagai berikut:

**1. Bagi Siswa (Pengguna Utama):**
- Membantu siswa memahami kesalahan secara bertahap melalui AI Tutor yang memberikan *Socratic questions* dan petunjuk sebelum menampilkan solusi lengkap, sehingga mendorong kemandirian berpikir.
- Memberikan estimasi kemampuan yang lebih akurat melalui penilaian IRT yang mempertimbangkan tingkat kesulitan butir soal.
- Menyediakan simulasi prediksi peluang kelulusan pada program studi target untuk mengurangi kecemasan akademis dan membantu pengambilan keputusan yang lebih realistis.
- Menyusun rute belajar personal berdasarkan kelemahan spesifik individu sehingga proses persiapan UTBK menjadi lebih terarah dan efisien.

**2. Bagi Pengembang dan Peneliti:**
- Memberikan kontribusi implementasi konkret penggunaan LLM sebagai ITS dengan mekanisme *scaffolding* bertingkat dan *zero-friction context injection* pada konteks persiapan ujian *high-stakes* di Indonesia.
- Menyediakan arsitektur referensi untuk integrasi IRT, *Chancing Engine*, dan AI Tutor dalam satu *platform* terpadu.

---

## 1.6. Sistematika Penulisan

Sistematika pada penulisan ini dibagi menjadi 5 bab, yaitu:

**BAB I. PENDAHULUAN**
Berisi latar belakang, rumusan masalah, batasan masalah, tujuan dan manfaat penelitian, serta sistematika penulisan.

**BAB II. TINJAUAN PUSTAKA DAN LANDASAN TEORI**
Berisi tinjauan terhadap penelitian-penelitian terdahulu yang berkaitan dengan *Intelligent Tutoring System*, *Item Response Theory*, *Large Language Model* dalam pendidikan, serta landasan teori yang menjadi dasar pengembangan sistem.

**BAB III. METODOLOGI PENELITIAN**
Berisi metodologi pengembangan sistem yang mencakup kerangka pemikiran, arsitektur sistem, perancangan basis data, perancangan antarmuka, dan algoritma yang digunakan.

**BAB IV. HASIL DAN PEMBAHASAN**
Berisi analisis hasil implementasi dan pengujian sistem, meliputi pengujian fungsional (*Black-Box Testing*), pengujian kebergunaan (*System Usability Scale*), serta pembahasan kesesuaian sistem dengan tujuan penelitian.

**BAB V. KESIMPULAN DAN SARAN**
Berisi kesimpulan dari hasil penelitian dan rekomendasi untuk pengembangan di masa mendatang.