### BAB I
### PENDAHULUAN

**1.1 Latar Belakang**
Ujian Tulis Berbasis Komputer pada jalur Seleksi Nasional Berdasarkan Tes (UTBK SNBT) merupakan mekanisme seleksi utama bagi siswa SMA di Indonesia untuk meraih kursi di Perguruan Tinggi Negeri (PTN). Setiap tahunnya, lebih dari 700.000 peserta mendaftar dan bersaing dalam ujian ini dengan tingkat persaingan yang sangat tinggi. Berbeda dengan ujian kenaikan kelas yang bersifat kumulatif dan *mastery-oriented*, UTBK SNBT merupakan ujian *high-stakes* bersifat *one-shot* dengan batas waktu ketat yang menuntut kecepatan, ketepatan, dan strategi belajar yang efisien.

Dalam menghadapi ujian tersebut, banyak siswa mengandalkan platform *Tryout* daring sebagai sarana persiapan mandiri. Namun, berdasarkan observasi terhadap ekosistem yang tersedia saat ini, sebagian besar sistem masih bersifat satu arah. Sistem umumnya hanya menampilkan soal dan menghitung skor akhir berupa persentase benar atau salah, tanpa memberikan peta jalan tindakan (*actionable roadmap*) yang membantu siswa memahami letak kesalahan mereka secara spesifik. 

Kondisi ini diperparah oleh budaya "menyuapi" jawaban yang masih melekat pada banyak platform persiapan. Kunci jawaban beserta pembahasan lengkap diberikan secara instan setelah siswa menyelesaikan soal. Secara teoretis, pendekatan ini melatih siswa untuk menghafal langkah jawaban (*rote learning*) alih-alih memahami konsep dasarnya, sebuah praktik yang tidak mendorong pembentukan skema pengetahuan yang bermakna, sebagaimana ditekankan dalam prinsip *Cognitive Load Theory* (Sweller, 1988). 

Tidak adanya umpan balik yang bertahap dan kontekstual memunculkan permasalahan yang dikenal sebagai *feedback gap*. Menurut Hattie dan Timperley (2007), umpan balik formatif sebaiknya diberikan secara langsung di setiap tahap evaluasi agar siswa bisa segera menyadari kesalahan mereka. Salah satu pendekatan yang berpotensi mengatasi permasalahan tersebut adalah *Intelligent Tutoring System* (ITS). Berbeda dengan evaluasi konvensional, ITS mampu menganalisis jawaban siswa dan memberikan umpan balik yang relevan.

Peluang untuk membangun ITS yang dinamis semakin terbuka berkat kemajuan teknologi *Large Language Model* (LLM) (Kasneci dkk., 2023). Namun, penggunaan LLM secara langsung memiliki risiko mendorong siswa bergantung pada jawaban instan. Chang (2023) menunjukkan melalui sejumlah contoh bahwa teknik-teknik metode *Socratic* dapat diterapkan dalam penyusunan templat *prompt* untuk mengarahkan interaksi dengan LLM. Berangkat dari hal tersebut, tugas akhir ini menerapkan *prompt engineering* agar LLM menggunakan pendekatan *Socratic Scaffolding*, yakni membimbing melalui pertanyaan pemantik, bukan sekadar memberikan jawaban.

Selain aspek pembimbingan, sistem penilaian yang objektif juga menjadi kebutuhan krusial. Mayoritas *Tryout* masih menggunakan *Classical Test Theory* (CTT) yang menghitung skor berdasarkan persentase tanpa mempertimbangkan tingkat kesulitan butir soal. *Item Response Theory* (IRT) menawarkan solusi pengukuran yang lebih kuat dengan memodelkan probabilitas kebenaran jawaban berdasarkan interaksi antara kemampuan laten siswa ($\theta$) dan tingkat kesulitan parameter butir soal (Hambleton dkk., 1991). Di sisi lain, siswa juga membutuhkan model prediksi kelulusan (*Chancing Engine*) berbasis data untuk mengurangi kecemasan akademis terkait simpang-siurnya informasi *passing grade*.

Berdasarkan permasalahan tersebut, tugas akhir ini mengusulkan pengembangan platform persiapan UTBK SNBT yang mengintegrasikan *Intelligent Tutoring System* berbasis LLM, pemodelan kemampuan kognitif menggunakan *Item Response Theory* (IRT), simulasi prediksi kelulusan, serta rute belajar (*Learning Path*) yang adaptif secara visual guna mereduksi beban kognitif tambahan (*extraneous cognitive load*).

**1.2 Rumusan Masalah**
Berdasarkan latar belakang di atas, rumusan masalah dalam tugas akhir ini adalah sebagai berikut:
1. Bagaimana mengintegrasikan *Intelligent Tutoring System* (ITS) berbasis *Large Language Model* (LLM) dengan pendekatan *Socratic Scaffolding* untuk memberikan umpan balik yang kontekstual dan bertahap selama proses pengerjaan soal latihan?
2. Bagaimana memodelkan estimasi kemampuan siswa secara lebih akurat dan objektif dengan memperhitungkan tingkat kesulitan butir soal menggunakan pendekatan *Item Response Theory* (IRT)?
3. Bagaimana merancang model prediksi peluang kelulusan pada program studi target berdasarkan hasil estimasi kemampuan siswa dan parameter seleksi publik?
4. Bagaimana merancang skema rute belajar (*Learning Path*) yang adaptif berdasarkan pemetaan kelemahan spesifik individu guna meningkatkan efisiensi persiapan belajar siswa?
**1.3 Batasan Masalah**
Untuk menjaga fokus tugas akhir, batasan masalah ditetapkan pada ruang lingkup metodologi dan teknis sistem sebagai berikut:
1. **Subjek & Domain:** Subjek tugas akhir dibatasi pada siswa SMA/sederajat dan alumni (*gap year*). Domain evaluasi difokuskan secara spesifik pada cakupan materi UTBK SNBT, tanpa mencakup evaluasi kurikulum pendidikan menengah secara umum.
2. **Fungsionalitas Sistem:** Platform dikembangkan berbasis *web* dengan dua hak akses pengguna, yaitu Admin dan Siswa. Sistem difokuskan pada simulasi pengujian (*Computer-Based Test*) dan pembelajaran mandiri, serta tidak mencakup fitur *Learning Management System* (LMS) seperti kelas virtual, absensi, atau forum diskusi.
3. **Mode Evaluasi & Instrumen:** Pelaksanaan sistem dibatasi pada dua alur utama: Mode *Tryout* (evaluasi) dan Mode Belajar (latihan). Bentuk instrumen pengujian bersifat linier (statis), bukan sistem pengujian adaptif (CAT). Pemasukan instrumen soal pada sistem dilakukan secara manual menggunakan format teks *Markdown* dan KaTeX.
4. **Metode Intervensi (AI Tutor):** Intervensi bimbingan formatif dibatasi hanya berlaku pada Mode Belajar. Intervensi dikendalikan oleh *Rule-Based System* (berjalan di atas *framework* Next.js) dan *Generative AI* (OpenRouter API). Metode pedagogis dibatasi pada pendekatan *Socratic Scaffolding* murni berbasis teks, di mana AI dibatasi mutlak untuk memberikan petunjuk (*hint*) tanpa menyuapi opsi jawaban.
5. **Model Pengukuran Kognitif:** Pengukuran skor pada Mode *Tryout* dibatasi menggunakan *Item Response Theory* (IRT) model logistik 1-parameter (Model Rasch), dengan kalibrasi tingkat kesulitan butir soal ($b$) ditetapkan di awal berdasarkan tinjauan kepakaran.
6. **Pemodelan Prediksi (Chancing Engine):** Estimasi peluang kelulusan dibatasi menggunakan perhitungan probabilistik berdasarkan data daya tampung dan tingkat keketatan (persaingan). Mengingat tidak adanya data resmi yang dirilis secara terbuka oleh pihak penyelenggara, data yang digunakan merupakan hasil estimasi dari sumber publik (non-resmi), sehingga hasil prediksi bersifat simulasi indikatif dan bukan jaminan kelulusan mutlak.

**1.4 Tujuan Tugas Akhir**
Tujuan utama dari tugas akhir ini adalah mengembangkan platform simulasi UTBK SNBT tingkat SMA berbasis *web* yang adaptif guna memberikan pengalaman belajar yang terukur dan personal. Secara spesifik, tujuan tersebut dijabarkan ke dalam poin-poin berikut:
1. Mengintegrasikan *Intelligent Tutoring System* (ITS) berbasis *Large Language Model* (LLM) menggunakan pendekatan *Socratic Scaffolding* untuk memfasilitasi penalaran kritis siswa melalui pemberian umpan balik formatif yang kontekstual dan bertahap.
2. Menerapkan pemodelan *Item Response Theory* (IRT) model logistik 1-parameter guna menghasilkan estimasi kemampuan laten siswa ($\theta$) yang terkalibrasi secara lebih akurat dan objektif pada Mode *Tryout*.
3. Membangun formulasi prediksi peluang kelulusan (*Chancing Engine*) pada program studi target berbasis penggabungan data probabilitas kognitif subjek dan parameter rasio keketatan seleksi.
4. Merancang mekanisme rute pembelajaran (*Learning Path*) dan *Learning Analytics* adaptif yang divisualisasikan berdasarkan pemetaan kelemahan (*Mastery Level*) spesifik individu guna mereduksi beban kognitif selama masa persiapan belajar.

**1.5 Manfaat Tugas Akhir**
Tugas akhir ini diharapkan memberikan manfaat secara praktis maupun teoretis sebagai berikut:

**1. Manfaat Praktis**
Manfaat praktis dari sistem yang dikembangkan ditujukan kepada pengguna aplikasi, yaitu:
**a. Bagi Siswa (Pengguna Utama):**
1. Membantu memahami letak kelemahan secara bertahap melalui bimbingan AI (*Socratic Scaffolding*) yang merangsang kemandirian berpikir tanpa langsung menyuapi kunci jawaban.
2. Memberikan estimasi skor yang presisi melalui metode penilaian *Item Response Theory* (IRT) serta simulasi prediksi peluang kelulusan (*Chancing Engine*) guna mereduksi kecemasan akademis.
3. Memperoleh rute belajar personal (*Learning Path*) berdasarkan *Mastery Level*, sehingga alokasi waktu persiapan ujian menjadi sangat efisien dan terarah.

**b. Bagi Admin (Pengelola Sistem):**
1. Mempermudah proses manajemen bank soal (mendukung format *Markdown* dan KaTeX) serta perakitan paket *Tryout* secara terpusat melalui panel tata kelola (*dashboard*).
2. Menyediakan visualisasi *Learning Analytics* secara *real-time* untuk memantau tren perkembangan skor, rasio penyelesaian ujian, dan statistik target jurusan pengguna secara agregat.

**2. Manfaat Teoretis**
Manfaat teoretis dari tugas akhir ini ditujukan untuk perkembangan bidang keilmuan, yaitu:
**a. Bagi Peneliti:**
1. Menjadi sarana implementasi dan validasi keilmuan Rekayasa Perangkat Lunak, khususnya dalam praktik pengintegrasian *Large Language Model* (LLM) pada infrastruktur aplikasi *web* modern (Next.js).

**b. Bagi Peneliti Selanjutnya:**
1. Menyediakan referensi arsitektur konseptual yang komprehensif terkait penggabungan model psikometri IRT, prediksi probabilistik kelulusan, dan *Intelligent Tutoring System* (ITS) ke dalam satu ekosistem *Computer-Based Test* (CBT).
2. Menjadi landasan kajian empiris untuk pengembangan lebih lanjut, khususnya yang berkaitan dengan optimalisasi *prompt engineering* pada platform pembelajaran adaptif berstandar UTBK SNBT di Indonesia.

**1.6 Sistematika Penulisan**
Sistematika pada penulisan ini dibagi menjadi 5 bab, yaitu:
1. **BAB I PENDAHULUAN** 
Berisi latar belakang, rumusan masalah, batasan masalah, tujuan tugas akhir, manfaat tugas akhir, serta sistematika penulisan.
2. **BAB II TINJAUAN PUSTAKA DAN DASAR TEORI** 
Berisi tinjauan pustaka yang memuat tugas akhir terdahulu sebagai referensi serta landasan teori pendukung, meliputi konsep *Intelligent Tutoring System* (ITS), *Item Response Theory* (IRT), penggunaan *Large Language Model* (LLM) dalam pendidikan, serta *Cognitive Load Theory*.
3. **BAB III METODOLOGI TUGAS AKHIR** 
Berisi penjabaran tahapan metodologi, analisis kebutuhan sistem, perancangan arsitektur dan pemodelan basis data, desain antarmuka, serta perancangan algoritma utama penyusun aplikasi (kalkulasi nilai IRT, *Rule-Based System* & *LLM Scaffolding*, serta *Chancing Engine*).
4. **BAB IV HASIL DAN PEMBAHASAN** 
Berisi analisis implementasi sistem, integrasi layanan LLM, serta penjabaran hasil pengujian yang mencakup *Black-Box Testing* (fungsional), *System Usability Scale* / SUS (kebergunaan), dan *Penetration Testing* (keamanan), guna memastikan sistem berjalan sesuai tujuan tugas akhir.
5. **BAB V KESIMPULAN DAN SARAN** 
Berisi kesimpulan menyeluruh yang menjawab rumusan masalah dari tugas akhir beserta rekomendasi pengembangan platform untuk tugas akhir di masa mendatang.