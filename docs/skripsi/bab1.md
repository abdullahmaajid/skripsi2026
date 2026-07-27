# BAB I. PENDAHULUAN

## 1.1 Latar Belakang

Ujian Tulis Berbasis Komputer – Seleksi Nasional Berdasarkan Tes (UTBK-SNBT) merupakan mekanisme seleksi utama bagi siswa SMA di Indonesia untuk meraih kursi di Perguruan Tinggi Negeri (PTN). Setiap tahunnya, lebih dari 700.000 peserta mendaftar dan bersaing dalam ujian ini dengan tingkat persaingan yang sangat tinggi. Berbeda dengan ujian kenaikan kelas yang bersifat kumulatif dan *mastery-oriented*, UTBK-SNBT merupakan ujian *high-stakes* bersifat *one-shot* dengan batas waktu ketat yang menuntut kecepatan, ketepatan, dan strategi belajar yang efisien.

Dalam menghadapi ujian tersebut, banyak siswa mengandalkan platform *TryOut* daring sebagai sarana persiapan mandiri. Namun, berdasarkan observasi terhadap ekosistem platform yang tersedia saat ini, sebagian besar sistem masih bersifat satu arah. Sistem umumnya hanya menampilkan soal, menghitung skor akhir berupa persentase benar atau salah, tanpa memberikan peta jalan tindakan (*actionable roadmap*) yang membantu siswa memahami letak kesalahan mereka secara spesifik. Siswa mengetahui bahwa mereka lemah pada satu subtes, tetapi tidak memperoleh informasi mengenai bab mana yang harus dipelajari kembali.

Kondisi ini diperparah oleh budaya "menyuapi" jawaban yang masih melekat pada banyak platform persiapan. Kunci jawaban beserta pembahasan lengkap diberikan secara instan setelah siswa menyelesaikan soal. Secara teoretis, pendekatan ini melatih siswa untuk menghafal langkah jawaban (*rote learning*) alih-alih memahami konsep dasarnya, sebuah praktik yang tidak mendorong pembentukan skema pengetahuan yang bermakna, sebagaimana ditekankan dalam prinsip *Cognitive Load Theory* (Sweller, 1988). Ketika tipe soal dimodifikasi sedikit pada ujian yang sebenarnya, siswa kesulitan menjawab karena tidak memiliki pemahaman konseptual yang mendalam.

Tidak adanya umpan balik yang bertahap dan kontekstual pada platform *TryOut* memunculkan permasalahan yang dikenal sebagai *feedback gap*. Menurut Prayoga dkk. (2025), umpan balik formatif sebaiknya diberikan secara langsung di setiap tahap evaluasi agar siswa bisa segera menyadari kesalahan mereka dan memperbaikinya. Jika siswa tidak mengetahui letak kesalahan secara *real-time*, proses pembentukan pemahaman konsep akan terhambat, yang pada akhirnya menurunkan kemandirian belajar dan motivasi siswa (Firmanul, 2023).

Salah satu pendekatan yang berpotensi mengatasi permasalahan tersebut adalah *Intelligent Tutoring System* (ITS). ITS merupakan sistem pembelajaran cerdas yang dirancang untuk memberikan bimbingan yang disesuaikan dengan kondisi dan kebutuhan masing-masing siswa, menyerupai peran tutor manusia. Berbeda dengan sistem evaluasi konvensional, ITS mampu menganalisis jawaban siswa dan memberikan umpan balik yang relevan secara *real-time*.

Peluang untuk membangun ITS yang lebih canggih semakin terbuka berkat kemajuan teknologi *Large Language Model* (LLM) (Kasneci dkk., 2023). LLM memiliki kemampuan memahami konteks bahasa alami dan menghasilkan respons yang menyerupai interaksi manusia, sehingga ITS dapat memberikan petunjuk dan penjelasan yang lebih fleksibel dibandingkan pendekatan berbasis aturan (*rule-based*) pada sistem tradisional. Namun, penggunaan LLM secara langsung juga memiliki risiko mendorong siswa bergantung pada jawaban instan. Oleh karena itu, diperlukan mekanisme pengendalian melalui *prompt engineering* agar LLM berperan sebagai tutor yang membimbing, bukan sekadar pemberi jawaban (Yan dkk., 2023).

Selain aspek pembimbingan, sistem penilaian yang adil juga menjadi kebutuhan krusial. Mayoritas platform *TryOut* masih menggunakan *Classical Test Theory* (CTT) yang menghitung skor berdasarkan persentase jawaban benar tanpa mempertimbangkan tingkat kesulitan butir soal. Pendekatan ini menghasilkan skor yang tidak invariant terhadap populasi tes dan tidak dapat memisahkan kemampuan siswa dari kesulitan item. *Item Response Theory* (IRT) menawarkan solusi yang lebih adil dengan memodelkan hubungan antara kemampuan laten siswa (θ) dan probabilitas menjawab benar suatu butir soal berdasarkan tingkat kesulitannya (Hambleton dkk., 1991).

Di sisi lain, siswa UTBK juga menghadapi kecemasan akademis terkait informasi kelulusan yang simpang siur. Banyak klaim tidak berdasar mengenai batas nilai kelulusan (*passing grade*) yang beredar di kalangan siswa, menyebabkan kecemasan berlebih atau rasa percaya diri yang semu. Diperlukan simulator yang mampu memberikan estimasi peluang kelulusan berbasis data yang lebih terukur.

Berdasarkan permasalahan tersebut, penelitian ini mengusulkan pengembangan platform persiapan UTBK-SNBT berbasis *web* yang mengintegrasikan *Intelligent Tutoring System* berbasis *Large Language Model*. Sistem dirancang tidak hanya sebagai alat evaluasi, tetapi juga sebagai tutor virtual yang mendampingi siswa selama proses pembelajaran dengan pendekatan *Socratic Scaffolding* bertingkat.

Pada mode latihan soal, sistem menerapkan mekanisme pembimbingan bertingkat (*scaffolding*) yang memberi siswa kesempatan berpikir ulang secara progresif sebelum jawaban lengkap ditampilkan—dimulai dari pertanyaan pemandu yang memicu pemikiran kritis, dilanjutkan dengan petunjuk yang lebih terarah apabila siswa masih belum tepat, hingga pembahasan lengkap sebagai bentuk dukungan penuh. 

Keunggulan platform ini terletak pada kemampuannya menyediakan konteks soal secara otomatis kepada AI Tutor ketika siswa menjawab salah, tanpa mengharuskan siswa mengetik ulang atau menyalin soal secara manual. Selain itu, antarmuka (*User Interface*) dirancang dengan prinsip meminimalkan distraksi visual guna mengeliminasi beban kognitif tambahan (*extraneous cognitive load*), sehingga kapasitas berpikir siswa dapat sepenuhnya difokuskan pada proses penalaran dan pemahaman konsep.

Sistem juga dilengkapi dengan penilaian berbasis *Item Response Theory* (IRT) yang memberikan estimasi kemampuan siswa secara lebih adil, simulasi untuk estimasi peluang kelulusan pada program studi target, rute belajar (*Learning Path*) adaptif berbasis pembobotan jurusan, dasbor analitik kompetitif dengan fitur *leaderboard*, serta komponen *chat* AI modular yang dapat diakses secara persisten di berbagai halaman.

Untuk mendukung seluruh fitur tersebut, sistem dibangun menggunakan arsitektur web modern yang menunjang interaktivitas tinggi, sehingga interaksi antara siswa dan sistem dapat berlangsung secara elegan, responsif, dan koheren.

Dengan integrasi antara kerangka kerja web modern, LLM, IRT, dan konsep ITS berbasis *Socratic Scaffolding*, penelitian ini bertujuan untuk mengembangkan platform persiapan UTBK-SNBT yang tidak hanya menjadi alat evaluasi, tetapi juga sebagai sistem pembelajaran adaptif yang mampu mendampingi siswa secara efisien, terukur, dan personal.

---

## 1.2 Rumusan Masalah 

Rumusan masalah dalam penelitian ini adalah sebagai berikut:

1. Siswa masih mengalami kesulitan dalam memahami letak kesalahan dan konsep yang mendasarinya secara mandiri karena platform *TryOut* UTBK yang tersedia umumnya hanya menampilkan skor akhir tanpa memberikan umpan balik yang kontekstual, bertahap, dan *real-time* selama proses pengerjaan soal.
2. Sistem penilaian pada platform *TryOut* yang tersedia masih menggunakan skor persentase mentah (*Classical Test Theory*) yang tidak memperhitungkan tingkat kesulitan butir soal, sehingga estimasi kemampuan siswa menjadi kurang akurat dan tidak adil.
3. Siswa tidak memiliki gambaran yang terukur mengenai peluang kelulusan pada program studi target karena informasi *passing grade* yang beredar bersifat tidak resmi dan simpang siur.
4. Rute belajar siswa masih bersifat generik dan tidak disesuaikan dengan kelemahan spesifik individu, sehingga proses persiapan menjadi kurang efisien.

---

## 1.3 Batasan Masalah 

Batasan masalah dalam penelitian ini adalah sebagai berikut:

1. Subjek penelitian dibatasi pada siswa SMA/MA/SMK dan alumni (*gap year*) yang sedang melakukan persiapan menghadapi UTBK-SNBT.
2. Domain evaluasi dan pembelajaran difokuskan secara spesifik pada materi-materi yang diujikan dalam UTBK-SNBT, tanpa mencakup evaluasi kurikulum sekolah secara umum.
3. Bimbingan belajar adaptif yang dieksplorasi dalam penelitian ini dibatasi pada interaksi pedagogis berbasis teks menggunakan pendekatan *Socratic Scaffolding*, tanpa melibatkan analisis masukan berupa gambar atau multimedia.
4. Pemodelan evaluasi kemampuan siswa dibatasi pada pendekatan *Item Response Theory* (IRT) model 1-Parameter Logistic (Rasch Model) dengan estimasi parameter kesulitan butir soal ($b$) yang ditetapkan berdasarkan tinjauan kepakaran, bukan kalibrasi empiris skala besar.
5. Prediksi estimasi peluang kelulusan (*Chancing Engine*) menggunakan parameter daya tampung dan tingkat keketatan program studi yang bersumber dari data sekunder publik, bukan data internal penyelenggara ujian resmi.
6. Skema evaluasi mencakup Uji Diagnostik awal, *Try Out* linear standar, dan *Try Out* adaptif dinamis yang terkalibrasi untuk mengukur estimasi kemampuan kognitif siswa.
7. Bimbingan AI Tutor disediakan sebagai komponen antarmuka yang bersifat modular dan global yang dapat diakses secara persisten dari berbagai halaman, namun dinonaktifkan secara otomatis pada saat pengerjaan Mode Ujian (*Try Out*).

---

## 1.4 Tujuan Penelitian 

Tujuan penelitian ini adalah mengembangkan model platform persiapan UTBK-SNBT yang mengintegrasikan *Intelligent Tutoring System* berbasis *Large Language Model* guna memberikan pengalaman pembelajaran adaptif dan personal, dengan penjabaran capaian spesifik meliputi:

* Implementasi *Large Language Model* (LLM) sebagai *Intelligent Tutoring System* (ITS) yang menggunakan metode *Socratic Scaffolding* bertingkat untuk memberikan bimbingan evaluasi secara kontekstual.
* Penggunaan algoritma *Item Response Theory* (IRT) 1-Parameter Logistic (Rasch Model) untuk menghasilkan estimasi kemampuan siswa (θ) yang lebih objektif dibandingkan sistem persentase mentah.
* Penyediaan model kalkulasi estimasi kelulusan pada program studi target yang didasarkan pada skor IRT siswa, rasio keketatan, dan data daya tampung publik.
* Perancangan lingkungan interaksi belajar yang terfokus pada pengurangan beban kognitif tambahan (*extraneous cognitive load*) melalui penyediaan rute belajar (*Learning Path*) yang adaptif secara visual dan terstruktur.
* Implementasi antarmuka *chat* AI Tutor yang modular dan global untuk memfasilitasi kelangsungan diskusi interaktif tanpa batas konteks halaman bagi siswa, yang diisolasi selama mode ujian berlangsung.

---

## 1.5 Manfaat Tugas Akhir

Manfaat Tugas Akhir dari penelitian ini adalah sebagai berikut:

1. **Bagi Siswa (Pengguna Utama):**
   * Membantu siswa memahami kesalahan secara bertahap melalui AI Tutor yang memberikan pertanyaan pemantik (*Socratic questions*) dan petunjuk sebelum menampilkan solusi lengkap, sehingga mendorong kemandirian berpikir.
   * Memberikan estimasi kemampuan yang lebih akurat melalui penilaian IRT yang mempertimbangkan tingkat kesulitan butir soal.
   * Menyediakan simulasi prediksi peluang kelulusan pada program studi target untuk mengurangi kecemasan akademis dan membantu pengambilan keputusan yang lebih realistis.
   * Menyusun rute belajar personal (*Learning Path*) berdasarkan kelemahan spesifik individu sehingga proses persiapan UTBK menjadi lebih terarah dan sangat efisien.

2. **Bagi Pengembang dan Peneliti:**
   * Memberikan kontribusi implementasi konkret penggunaan LLM sebagai ITS dengan mekanisme *scaffolding* bertingkat dan *zero-friction context injection* pada konteks persiapan ujian *high-stakes* di Indonesia.
   * Menyediakan referensi model integrasi antara sistem penilaian berbasis IRT, simulasi kelulusan, *Learning Path* adaptif, dan *Intelligent Tutoring System* ke dalam satu platform pembelajaran terpadu.

---

## 1.6 Sistematika Penulisan

Sistematika pada penulisan ini dibagi menjadi 5 bab, yaitu:

* **BAB I. PENDAHULUAN** 
  Berisi latar belakang, rumusan masalah, batasan masalah, tujuan dan manfaat penelitian, serta sistematika penulisan.
* **BAB II. TINJAUAN PUSTAKA DAN DASAR TEORI** 
  Berisi tinjauan terhadap penelitian-penelitian terdahulu yang berkaitan dengan *Intelligent Tutoring System*, *Item Response Theory*, *Large Language Model* dalam pendidikan, *Cognitive Load Theory*, serta dasar teori pengembangan sistem web modern.
* **BAB III. METODOLOGI PENELITIAN** 
  Berisi metodologi pengembangan sistem yang mencakup kerangka pemikiran, arsitektur sistem (*Tech Stack*), perancangan basis data, perancangan antarmuka, dan desain algoritma (*Scaffolding*, IRT, *Chancing Engine*).
* **BAB IV. HASIL DAN PEMBAHASAN** 
  Berisi analisis hasil implementasi antarmuka, integrasi LLM, dan pengujian sistem yang meliputi pengujian fungsional (*Black-Box Testing*), pengujian kebergunaan (*System Usability Scale*), serta pembahasan kesesuaian fitur aplikasi Lexica dengan tujuan penelitian.
* **BAB V. KESIMPULAN DAN SARAN** 
  Berisi kesimpulan menyeluruh dari hasil penelitian dan rekomendasi untuk pengembangkan fitur (*future work*) di masa mendatang.