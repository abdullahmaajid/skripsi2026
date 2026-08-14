### BAB I
### PENDAHULUAN

**1.1 Latar Belakang**
Ujian Tulis Berbasis Komputer pada jalur Seleksi Nasional Berdasarkan Tes (UTBK SNBT) merupakan mekanisme seleksi utama bagi siswa SMA di Indonesia untuk meraih kursi di Perguruan Tinggi Negeri (PTN). Setiap tahunnya, lebih dari 700.000 peserta mendaftar dan bersaing dalam ujian ini dengan tingkat persaingan yang sangat tinggi. Berbeda dengan ujian kenaikan kelas yang bersifat kumulatif dan *mastery-oriented*, UTBK SNBT merupakan ujian *high-stakes* bersifat *one-shot* dengan batas waktu ketat yang menuntut kecepatan, ketepatan, dan strategi belajar yang efisien.

Dalam menghadapi ujian tersebut, banyak siswa mengandalkan platform Tryout daring sebagai sarana persiapan mandiri. Namun, berdasarkan observasi terhadap ekosistem yang tersedia saat ini, sebagian besar sistem masih bersifat satu arah. Sistem umumnya hanya menampilkan soal dan menghitung skor akhir berupa persentase benar atau salah, tanpa memberikan peta jalan tindakan (*actionable roadmap*) yang membantu siswa memahami letak kesalahan mereka secara spesifik. 

Kondisi ini diperparah oleh budaya "menyuapi" jawaban yang masih melekat pada banyak platform persiapan. Kunci jawaban beserta pembahasan lengkap diberikan secara instan setelah siswa menyelesaikan soal. Secara teoretis, pendekatan ini melatih siswa untuk menghafal langkah jawaban (*rote learning*) alih-alih memahami konsep dasarnya, sebuah praktik yang tidak mendorong pembentukan skema pengetahuan yang bermakna, sebagaimana ditekankan dalam prinsip *Cognitive Load Theory* (Sweller, 1988). 

Tidak adanya umpan balik yang bertahap dan kontekstual memunculkan permasalahan yang dikenal sebagai *feedback gap*. Menurut Hattie & Timperley (2007), umpan balik formatif sebaiknya diberikan secara langsung di setiap tahap evaluasi agar siswa bisa segera menyadari kesalahan mereka. Salah satu pendekatan yang berpotensi mengatasi permasalahan tersebut adalah *Intelligent Tutoring System* (ITS). Berbeda dengan evaluasi konvensional, ITS mampu menganalisis jawaban siswa dan memberikan umpan balik yang relevan.

Peluang untuk membangun ITS yang dinamis semakin terbuka berkat kemajuan teknologi *Large Language Model* (LLM) (Kasneci dkk., 2023). Namun, penggunaan LLM secara langsung memiliki risiko mendorong siswa bergantung pada jawaban instan. Oleh karena itu, diperlukan intervensi pedagogis melalui *prompt engineering* agar LLM bertindak menggunakan pendekatan *Socratic Scaffolding*, yakni membimbing melalui pertanyaan pemantik, bukan sekadar memberikan jawaban (Yan dkk., 2024).

Selain aspek pembimbingan, sistem penilaian yang objektif juga menjadi kebutuhan krusial. Mayoritas Tryout masih menggunakan *Classical Test Theory* (CTT) yang menghitung skor berdasarkan persentase tanpa mempertimbangkan tingkat kesulitan butir soal. *Item Response Theory* (IRT) menawarkan solusi pengukuran yang lebih kuat dengan memodelkan probabilitas kebenaran jawaban berdasarkan interaksi antara kemampuan laten siswa ($\theta$) dan tingkat kesulitan parameter butir soal (Hambleton dkk., 1991). Di sisi lain, siswa juga membutuhkan model prediksi kelulusan (*Chancing Engine*) berbasis data untuk mengurangi kecemasan akademis terkait simpang-siurnya informasi *passing grade*.

Berdasarkan permasalahan tersebut, penelitian ini mengusulkan pengembangan platform persiapan UTBK SNBT yang mengintegrasikan *Intelligent Tutoring System* berbasis LLM, pemodelan kemampuan kognitif menggunakan *Item Response Theory* (IRT), simulasi prediksi kelulusan, serta rute belajar (*Learning Path*) yang adaptif secara visual guna mereduksi beban kognitif tambahan (*extraneous cognitive load*).

**1.2 Rumusan Masalah**
Berdasarkan latar belakang di atas, rumusan masalah dalam penelitian ini adalah sebagai berikut:
1. Bagaimana mengintegrasikan *Intelligent Tutoring System* (ITS) berbasis *Large Language Model* (LLM) dengan pendekatan *Socratic Scaffolding* untuk memberikan umpan balik yang kontekstual dan bertahap selama proses pengerjaan soal latihan?
2. Bagaimana memodelkan estimasi kemampuan siswa secara lebih akurat dan objektif dengan memperhitungkan tingkat kesulitan butir soal menggunakan pendekatan *Item Response Theory* (IRT)?
3. Bagaimana merancang model prediksi peluang kelulusan pada program studi target berdasarkan hasil estimasi kemampuan siswa dan parameter seleksi publik?
4. Bagaimana merancang skema rute belajar (*Learning Path*) yang adaptif berdasarkan pemetaan kelemahan spesifik individu guna meningkatkan efisiensi persiapan belajar siswa?

**1.3 Batasan Masalah**
Untuk menjaga fokus penelitian, batasan masalah ditetapkan murni pada ruang lingkup akademik sebagai berikut:
1. Subjek penelitian dibatasi pada siswa SMA/MA/SMK dan alumni (*gap year*) yang sedang mempersiapkan diri menghadapi UTBK SNBT.
2. Domain pengetahuan yang dievaluasi difokuskan secara spesifik pada cakupan materi yang diujikan dalam UTBK SNBT, tanpa mencakup evaluasi kurikulum pendidikan menengah secara umum.
3. Metode intervensi pedagogis (bimbingan belajar) dibatasi pada pemberian umpan balik formatif berbasis teks menggunakan pendekatan *Socratic Scaffolding*, tanpa melibatkan pemrosesan multimedia (gambar atau suara).
4. Pengukuran kemampuan kognitif subjek dibatasi pada penggunaan pendekatan *Item Response Theory* (IRT) model logistik 1-parameter (Model Rasch), dengan kalibrasi parameter tingkat kesulitan butir soal ($b$) ditetapkan berdasarkan tinjauan kepakaran.
5. Pemodelan estimasi peluang kelulusan dibatasi menggunakan variabel daya tampung dan rasio keketatan program studi yang bersumber dari data sekunder publik.
6. Bentuk instrumen pengujian dibatasi pada evaluasi berformat linier (statis), bukan pengujian yang bersifat adaptif secara instan terhadap butir soal.
7. Pelaksanaan intervensi bimbingan formatif dibatasi hanya berlaku pada fase latihan, dan tidak dilibatkan pada fase evaluasi (ujian) guna menjaga validitas hasil pengukuran kemampuan subjek secara mandiri.

**1.4 Tujuan Penelitian**
Tujuan penelitian ini adalah mengembangkan model pembelajaran adaptif untuk persiapan UTBK SNBT guna memberikan pengalaman belajar yang terukur dan personal. Secara lebih rinci, tujuan utama tersebut dicapai melalui penjabaran fokus berikut:
a. Mengintegrasikan *Large Language Model* (LLM) dengan metode *Socratic Scaffolding* untuk memfasilitasi penalaran kritis melalui bimbingan yang kontekstual.
b. Menerapkan pemodelan *Item Response Theory* (IRT) logistik 1-parameter guna menghasilkan estimasi kemampuan laten siswa ($\theta$) yang terkalibrasi secara objektif.
c. Membangun formulasi prediksi peluang kelulusan program studi target berbasis penggabungan data probabilitas kognitif subjek dan rasio keketatan seleksi.
d. Merancang mekanisme rute pembelajaran (*Learning Path*) yang divisualisasikan berdasarkan profil kemampuan spesifik individu guna mereduksi beban kognitif selama masa persiapan belajar.

**1.5 Manfaat Penelitian**
Penelitian ini diharapkan memberikan manfaat sebagai berikut:

**Bagi Praktis (Siswa/Pengguna):**
1. Membantu memahami letak kesalahan secara bertahap melalui umpan balik yang memberikan pertanyaan pemantik dan petunjuk, sehingga mendorong kemandirian berpikir tanpa langsung menerima kunci jawaban.
2. Memberikan estimasi kemampuan yang lebih presisi melalui metode penilaian IRT, serta menyediakan simulasi prediksi kelulusan untuk mengurangi kecemasan akademis.
3. Mendapatkan rute belajar personal sehingga alokasi waktu persiapan menjadi sangat efisien dan terarah.

**Bagi Teoretis (Bidang Keilmuan / Peneliti):**
1. Memberikan kontribusi kajian empiris terkait implementasi *Large Language Model* dengan pendekatan *Socratic Scaffolding* pada evaluasi pengujian *high-stakes* di Indonesia.
2. Menyediakan referensi arsitektur konseptual yang mengintegrasikan model pengujian IRT, prediksi probabilistik kelulusan, rute belajar adaptif, dan ekosistem pendampingan virtual ke dalam satu lingkungan pembelajaran terpadu.

**1.6 Sistematika Penulisan**
Sistematika pada penulisan ini dibagi menjadi 5 bab, yaitu:
* **BAB I. PENDAHULUAN** 
Berisi latar belakang, rumusan masalah, batasan masalah, tujuan penelitian, manfaat penelitian, serta sistematika penulisan.
* **BAB II. TINJAUAN PUSTAKA DAN DASAR TEORI** 
Berisi tinjauan terhadap penelitian terdahulu yang berkaitan dengan *Intelligent Tutoring System*, *Item Response Theory*, penggunaan LLM dalam pendidikan, serta *Cognitive Load Theory*.
* **BAB III. METODOLOGI PENELITIAN** 
Berisi perancangan sistem yang mencakup kerangka pemikiran, desain arsitektur, pemodelan basis data, dan desain algoritma utama (IRT, *Scaffolding*, *Chancing Engine*).
* **BAB IV. HASIL DAN PEMBAHASAN** 
Berisi analisis implementasi antarmuka, integrasi LLM, dan pengujian sistem meliputi validasi fungsional (*Black-Box Testing*), pengujian kebergunaan (*System Usability Scale*), serta kesesuaian operasional sistem yang dikembangkan dengan tujuan penelitian.
* **BAB V. KESIMPULAN DAN SARAN** 
Berisi kesimpulan menyeluruh dari penelitian dan rekomendasi untuk pengembangan sistem di masa mendatang.