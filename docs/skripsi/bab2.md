### BAB II
### TINJAUAN PUSTAKA DAN DASAR TEORI

**2.1 Tinjauan Pustaka**

Dalam pengembangan platform persiapan UTBK SNBT berbasis web yang terintegrasi dengan *Intelligent Tutoring System*, penulis merujuk pada beberapa penelitian terdahulu yang berkaitan dengan *Intelligent Tutoring System* (ITS), sistem Tryout berbasis web, *Large Language Model* (LLM), *Item Response Theory* (IRT), serta *Cognitive Load Theory* yang mendukung perancangan antarmuka pengguna.

Dalam bidang *Intelligent Tutoring System* (ITS), penelitian terdahulu menunjukkan bahwa sistem ini dapat mendukung pembelajaran yang personal dan adaptif. Wiselee dkk. (2025) mengembangkan ITS berbasis *framework* Laravel dan basis data MySQL untuk mendukung pembelajaran mandiri mahasiswa pada mata kuliah dasar *web development*, dengan konten dan asesmen yang dikurasi oleh instruktur. Meskipun demikian, penelitian tersebut berfokus pada materi spesifik dan belum diterapkan pada evaluasi akademik berskala besar seperti UTBK.

Selain penelitian ITS, sistem evaluasi pembelajaran digital (*Tryout*) sudah banyak dikembangkan untuk membantu persiapan ujian masuk perguruan tinggi. Nugraha dan Hardiyanti (2025) mengembangkan sistem *tryout* UTBK SNBT berbasis web menggunakan *framework* Laravel untuk lembaga Integral Education, dilengkapi *payment gateway* Midtrans dan fitur rekomendasi jurusan menggunakan metode *Simple Additive Weighting* (SAW). Sistem tersebut memperoleh tingkat penerimaan sebesar 96% dari admin dan 98,28% dari siswa berdasarkan *user acceptance testing*. Namun, sistem tersebut berfokus pada pengelolaan dan pelaksanaan *tryout* serta rekomendasi jurusan, dan tidak dirancang sebagai ITS yang menyediakan *Learning Path*, umpan balik interaktif berbasis AI, maupun penilaian berbasis IRT.

Kajian mengenai *Large Language Model* (LLM) dalam bidang pendidikan membahas berbagai peluang sekaligus tantangan pemanfaatan teknologi ini dalam pembelajaran (Kasneci dkk., 2023). Melalui tinjauan literatur sistematis terhadap 83 artikel, Peláez-Sánchez dkk. (2024) menyimpulkan bahwa LLM berpotensi besar memperkaya pendidikan tinggi dan selaras dengan pendekatan *Education 4.0* melalui pembelajaran yang lebih mandiri, kolaboratif, dan interaktif, namun tetap memerlukan pengawasan manusia untuk menjamin kualitas dan akurasi konten yang dihasilkan AI. Di sisi lain, Chang (2023) menunjukkan bahwa teknik-teknik metode *Socratic*, seperti definisi, *elenchus*, dialektika, dan *maieutics*, dapat diterapkan dalam penyusunan templat *prompt* untuk mengarahkan interaksi dengan LLM. Berangkat dari hal tersebut, tugas akhir ini menyusun instruksi sistem yang mengarahkan LLM agar memandu siswa melalui pertanyaan pemantik alih-alih memberikan jawaban secara langsung.

Dalam bidang pengukuran pendidikan, de Ayala (2009) melalui karyanya *The Theory and Practice of Item Response Theory* memberikan landasan komprehensif mengenai aplikasi psikometri modern. Akan tetapi, adopsi IRT pada platform persiapan ujian komersial atau prototipe akademis di Indonesia umumnya belum diintegrasikan secara holistik dengan ekosistem pelacakan pemahaman (*Mastery Learning*), bimbingan AI (*scaffolding*), maupun algoritma probabilistik peluang kelulusan (*Chancing Engine*) dalam satu *state management* yang berkesinambungan.

**Tabel 2.1 Ringkasan Tinjauan Pustaka**

| Peneliti (Tahun) | Fokus Tugas Akhir | Teknologi Utama | Limitasi Terkait Tugas Akhir Ini |
|---|---|---|---|
| Wiselee dkk. (2025) | ITS untuk Pembelajaran Mandiri *Web Development* | Laravel, MySQL | Konten dan asesmen dikurasi instruktur untuk satu mata kuliah; bukan simulasi ujian akademik. |
| Nugraha & Hardiyanti (2025) | Tryout UTBK SNBT Berbasis Web \u0026 Fitur Rekomendasi Jurusan | Laravel, SAW | Berfokus pada sistem rekomendasi (SAW), bukan *Intelligent Tutoring System* adaptif. |
| Kasneci dkk. (2023) | Eksplorasi Peluang & Tantangan LLM di Pendidikan | Ekosistem LLM | Kajian pustaka teoretis, belum membahas integrasi model LLM ke dalam *state* aplikasi evaluasi secara riil. |

Berdasarkan tinjauan pustaka pada Tabel 2.1, dapat disimpulkan bahwa literatur terkait ITS umumnya berfokus pada pemberian umpan balik materi secara statis, sedangkan sistem *Tryout* konvensional lebih menitikberatkan pada fungsi administratif simulasi ujian semata. Di sisi lain, kajian mengenai pemanfaatan *Large Language Model* (LLM) menyoroti potensi besar kecerdasan buatan dalam pendidikan, sekaligus memperingatkan risiko fatal jika AI dibiarkan memberikan jawaban instan (*Direct Instruction*) yang dapat melemahkan nalar kritis siswa. Meskipun berbagai studi telah membahas *Tryout*, ITS, dan LLM secara terpisah, belum ditemukan purwarupa (*prototype*) akademik yang mengintegrasikan secara komprehensif instrumen evaluasi *high-stakes* (UTBK SNBT), mesin inferensi LLM dengan kerangka *Socratic Scaffolding*, psikometri *Item Response Theory* (IRT), kalkulasi probabilistik kelulusan (*Chancing Engine*), serta manajemen rute belajar (*Learning Path*) dalam satu arsitektur terpadu.

Oleh karena itu, tugas akhir ini dikembangkan untuk mengisi celah keilmuan (*gap*) tersebut dengan merancang platform persiapan UTBK SNBT berbasis web yang komprehensif. Tugas akhir ini mengintegrasikan simulasi *Tryout* berbasis penskoran IRT, sistem bimbingan ITS berbasis LLM pada Mode Belajar, dan *Learning Analytics* secara *real-time*. Platform ini memfasilitasi Siswa dengan rute pembelajaran (*Learning Path*) berbasis *Mastery Level*, sekaligus menyediakan *dashboard* pemantauan agregat dan tata kelola bank soal modern berbasis *Markdown* dan *LaTeX* bagi Admin. Berlandaskan mekanisme *Role-Based Access Control* (Siswa dan Admin), arsitektur terpadu ini diharapkan mampu menyajikan pengalaman evaluasi dan pemecahan masalah yang jauh lebih adaptif, presisi, dan terarah.

---

**2.2 Dasar Teori**

**2.2.1 Intelligent Tutoring System (ITS)**
Intelligent Tutoring System (ITS) merupakan cabang kecerdasan buatan di bidang pendidikan yang bertujuan menyediakan instruksi pembelajaran tanpa intervensi manusia secara langsung (Nwana, 1990). Arsitektur ITS standar terdiri atas empat pilar utama:
1. **Domain Model:** basis data yang merepresentasikan pengetahuan pakar.
2. **Student Model:** modul dinamis yang melacak *state* kognitif, riwayat evaluasi, dan pola kesalahan siswa.
3. **Tutoring Model:** modul eksekutor yang menentukan strategi intervensi pedagogis (misalnya, memutuskan kapan harus memberikan petunjuk atau ulasan).
4. **User Interface Model:** jembatan interaksi visual dan tekstual antara sistem dan pengguna.

**2.2.2 Scaffolding dan Zone of Proximal Development (ZPD)**
Istilah *scaffolding* diperkenalkan oleh Wood dkk. (1976) untuk menggambarkan proses ketika seorang tutor membantu peserta didik menyelesaikan tugas yang belum dapat diselesaikannya secara mandiri. Konsep ini erat kaitannya dengan *Zone of Proximal Development* (ZPD) yang digagas oleh Vygotsky (1978), yaitu jarak antara tingkat perkembangan aktual yang ditentukan melalui pemecahan masalah secara mandiri dan tingkat perkembangan potensial yang ditentukan melalui pemecahan masalah dengan bimbingan orang dewasa atau teman sebaya yang lebih mampu. Dalam komputasi ITS, *scaffolding* diimplementasikan melalui algoritma pengurangan bantuan (*fading support*). Bantuan tidak disajikan sekaligus, melainkan ditampilkan secara sekuensial hanya ketika algoritma mendeteksi stagnasi kognitif pada Student Model.

**Tabel 2.2 Hierarki Socratic Scaffolding pada AI Tutor**

| Level Intervensi | Tipe Instruksi | Representasi Output LLM |
|---|---|---|
| **Level 1: Pemandu (*Socratic*)** | Mendorong berpikir mandiri | Pertanyaan reflektif (contoh: "Coba perhatikan variabel X, apa hubungannya dengan Y?") tanpa mengungkap formula pasti. |
| **Level 2: Petunjuk (*Hint*)** | Panduan parsial eksplisit | Penyediaan blok pembangun logika, seperti pemberian formula matematika (contoh: "Ingat rumus kecepatan v = s/t"), tetapi belum memberikan hasil kalkulasi. |
| **Level 3: Ulasan Solusi (*Review*)** | Konfirmasi dan ulasan pasca-kesuksesan | Memberikan apresiasi (*positive reinforcement*) dan penjabaran solusi utuh **hanya setelah** siswa berhasil menjawab benar secara mandiri. |

**2.2.3 Socratic Questioning**
*Socratic Questioning* merupakan teknik pembelajaran yang menggunakan serangkaian pertanyaan terarah untuk membantu peserta didik membangun pemahamannya sendiri melalui proses berpikir. Berbeda dengan pemberian jawaban secara langsung, pendekatan ini mendorong peserta didik untuk mengklarifikasi pemahaman, mengevaluasi alasan dan bukti, serta menarik kesimpulan berdasarkan hasil pemikirannya (Paul & Elder, 2006). Dalam penerapannya, pendekatan ini dilakukan melalui jenis pertanyaan pemantik, seperti *clarification questions* dan *questions that probe reasons and evidence*.

**2.2.4 Rule-Based System**
*Rule-Based System* merupakan metode pengambilan keputusan yang bekerja berdasarkan aturan yang telah ditentukan sebelumnya dalam bentuk IF-THEN. Pendekatan ini menghasilkan keputusan yang konsisten, mudah dipahami, dan tidak memerlukan proses pelatihan data seperti pada *machine learning*. Pada tugas akhir ini, *Rule-Based System* digunakan untuk menentukan strategi bimbingan yang diberikan oleh AI Tutor berdasarkan jumlah percobaan (*attempt count*) siswa dalam menjawab soal pada Mode Belajar.

**Tabel 2.3 Aturan Rule-Based Strategy**

| Kondisi | Keputusan Sistem |
|---|---|
| Jawaban salah pada percobaan pertama | AI Tutor mengaplikasikan **Level 1: Pemandu (*Socratic*)** untuk memancing pemikiran mandiri tanpa membocorkan jawaban. |
| Jawaban salah pada percobaan kedua | AI Tutor mengaplikasikan **Level 2: Petunjuk (*Hint*)** berupa panduan parsial eksplisit (rumus/konsep), tanpa memberikan hasil akhir. |
| Jawaban benar | AI Tutor mengaplikasikan **Level 3: Ulasan Solusi (*Review*)** berupa *positive reinforcement* dan penjabaran solusi utuh. |

**2.2.5 Cognitive Load Theory (CLT)**
Teori Beban Kognitif atau *Cognitive Load Theory* (CLT) diperkenalkan oleh John Sweller. Sweller mempostulatkan bahwa memori kerja (*working memory*) manusia memiliki keterbatasan kapasitas dalam memproses informasi secara bersamaan (Sweller, 1988). Dalam perancangan perangkat lunak pendidikan, beban ekstra (*extraneous load*) yang diakibatkan oleh kerumitan antarmuka pengguna, seperti fitur yang tidak relevan, navigasi yang membingungkan, atau keharusan menyalin soal secara manual ke kolom *chat*, harus dieliminasi. Penghapusan beban ekstra ini memungkinkan memori kerja berfokus penuh pada *germane load*, yaitu beban esensial untuk memahami pola dan logika materi.

**2.2.6 Item Response Theory (IRT) dan Model Rasch (1-PL)**
*Item Response Theory* (IRT) adalah paradigma evaluasi psikometri berbasis probabilitas. Berbeda dengan teori klasik yang bertumpu pada skor mentah, IRT melakukan kalibrasi terhadap parameter butir soal secara independen dari populasi uji (Hambleton dkk., 1991). Model logistik 1-parameter (*Rasch model*) memfokuskan fungsinya pada satu parameter butir, yaitu tingkat kesulitan ($b$). Model ini merumuskan probabilitas teoretis seorang peserta dengan kemampuan kognitif $\theta$ untuk menjawab benar butir soal ke-$i$ melalui fungsi logistik berikut:

$$ P_i(\theta) = \frac{1}{1 + e^{-(\theta - b_i)}} $$

dengan $P_i(\theta)$ sebagai probabilitas menjawab benar butir ke-$i$ dan $b_i$ sebagai tingkat kesulitan butir ke-$i$. Fungsi ini memiliki nilai asimtotik antara 0 dan 1. Model ini menjadikan estimasi kemampuan laten siswa bersifat invarian, yaitu tidak bergantung pada himpunan butir soal tertentu yang dikerjakan.

**2.2.7 Estimasi Kemampuan ($\theta$) dengan Algoritma Newton-Raphson**
Dalam komputasi IRT, nilai kemampuan akhir ($\theta$) dicari melalui optimasi iteratif *Maximum Likelihood Estimation* (MLE) menggunakan metode numerik Newton-Raphson (Baker, 2001). Proses komputasi pada peladen (*server*) menjalankan perulangan (*loop*) berdasarkan turunan pertama dan *Fisher Information* (negatif turunan kedua) hingga mencapai titik konvergen:

$$ \theta_{n+1} = \theta_n + \frac{\sum_{i=1}^{k} \left[u_i - P_i(\theta_n)\right]}{\sum_{i=1}^{k} P_i(\theta_n)\left[1 - P_i(\theta_n)\right]} $$

dengan $k$ sebagai jumlah butir soal yang dikerjakan dan $u_i$ sebagai nilai biner dari jawaban siswa ($u_i=1$ jika benar dan $u_i=0$ jika salah). Penyebut pada persamaan tersebut merupakan *Fisher Information* yang memandu laju konvergensi. Iterasi berhenti ketika selisih antara $\theta_{n+1}$ dan $\theta_n$ lebih kecil daripada batas toleransi konvergensi (*convergence tolerance*).

**2.2.8 Large Language Model (LLM) dan Prompt Engineering**
LLM adalah arsitektur *deep learning* berbasis *Transformer* (Vaswani dkk., 2017) yang mensintesis data tekstual dengan probabilitas sekuensial. Keunggulan LLM dalam ITS adalah kemampuannya mempertahankan konteks sesi secara dinamis (*context window*). Agar LLM mematuhi batasan *scaffolding*, digunakan rekayasa *prompt engineering*. Pendekatan ini menyuntikkan instruksi heuristik permanen (*system instructions*) yang disembunyikan dari pengguna dan berfungsi sebagai pembatas (*guardrails*) agar kecerdasan buatan beroperasi secara konsisten dan etis, yaitu tidak membocorkan kunci jawaban secara sporadis.

**2.2.9 Mastery Learning dan Rute Belajar (Learning Path)**
*Mastery Learning* berfokus pada penguasaan kompetensi prasyarat secara tuntas sebelum siswa maju ke materi berikutnya (Bloom, 1968). Dalam rekayasa sistem, teori ini diwujudkan melalui algoritma *Learning Path* (rute belajar), di mana basis data melacak riwayat interaksi soal per bab dan mengklasifikasikan kompetensi siswa ke dalam kluster ketuntasan. Klasifikasi ini umumnya divisualisasikan dalam bentuk indikator kemajuan (*progress ring*).

**Tabel 2.4 Standar Klasifikasi Status Learning Path**

| Status | Persyaratan Kondisi Sistem | Indikasi Kognitif |
|---|---|---|
| **NOT_STARTED** | Tidak ada rekaman pada relasi basis data sesi (0 percobaan). | Siswa sama sekali belum terpapar materi ini. |
| **IN_PROGRESS** | Tingkat keberhasilan $< 70\%$ dari total percobaan. | Siswa berada pada fase retensi memori aktif, tetapi akurasinya masih rentan. |
| **COMPLETED** | Akumulasi probabilitas *Exam Readiness* menunjukkan skor stabil $\ge 70\%$. | Siswa telah mencapai penguasaan fondasi (*mastery*). |

**2.2.10 Formative dan Summative Assessment**
Evaluasi formatif dan evaluasi sumatif memiliki tujuan serta waktu pelaksanaan yang berbeda dalam proses pendidikan (Black & Wiliam, 1998):
1. **Evaluasi Formatif:** dilakukan selama proses pembelajaran berlangsung. Tujuannya bukan sekadar memberikan nilai akhir, melainkan memantau perkembangan dan memberikan umpan balik agar siswa dapat segera memperbaiki kesalahan (diterapkan pada Mode Belajar).
2. **Evaluasi Sumatif:** dilakukan di akhir periode pembelajaran. Tujuannya mengukur pencapaian belajar siswa secara keseluruhan untuk memastikan kompetensi yang ditargetkan (diterapkan pada Mode Tryout).

**2.2.11 Learning Analytics**
*Learning Analytics* merupakan proses pengumpulan, pengolahan, dan analisis data pembelajaran untuk memperoleh informasi mengenai perkembangan belajar peserta didik. Data yang dianalisis berupa tingkat keberhasilan maupun metrik probabilitas kelulusan. Informasi yang dihasilkan disajikan dalam dasbor (*dashboard*) dan dimanfaatkan untuk memantau perkembangan belajar siswa serta mengidentifikasi materi yang masih sulit dipahami. Melalui tinjauan sistematis terhadap dasbor *learning analytics* yang ditujukan bagi mahasiswa, Paulsen dan Lindsay (2024) menemukan adanya kecenderungan pergeseran menuju dasbor yang berlandaskan kerangka teori pembelajaran dan dirancang untuk mendukung proses belajar siswa, tidak semata-mata menampilkan hasil analitik.

**2.2.12 Algoritma Prediksi Kelulusan (Chancing Engine)**
Seleksi masuk perguruan tinggi negeri tidak menetapkan *passing grade* yang mutlak, sehingga penerimaan bertumpu pada persaingan probabilistik. *Chancing Engine* diformulasikan sebagai mesin kalkulasi probabilitas berbasis distribusi logistik (kurva *sigmoid*) (Hosmer dkk., 2013). Algoritma ini dirumuskan melalui fungsi eksponensial berikut:

$$ P(S) = \frac{1}{1 + e^{-k(S - E - s)}} $$

dengan deskripsi parameter:
* $P(S)$ merupakan keluaran probabilitas kelulusan siswa.
* $S$ merupakan skor kemampuan akhir (*student score*) yang telah dikonversi ke skala IRT UTBK (200-800).
* $E$ merupakan estimasi skor aman minimum (*estimated score*) dari program studi target.
* $s$ merupakan *midpoint shift*, yaitu konstanta bias untuk menyesuaikan peluang ekuilibrium, yang dihitung menggunakan persamaan: $s = 0.02 \cdot E$.
* $k$ merupakan kemiringan kurva (*steepness factor*) yang dipengaruhi oleh rasio keketatan persaingan ($C$). Parameter ini dijabarkan melalui persamaan: $k = 0.04 \cdot [1 + 0.5 \cdot \log_{10}(\max(1, C))]$.

Hasil keluaran ($P(S)$ berskala 0% hingga 100%) diklasifikasikan secara linguistik ke dalam rentang rasio: Aman, Bersaing, Peluang Cukup, Sulit, atau Sangat Sulit.

**2.2.13 Application Programming Interface (API)**
*Application Programming Interface* (API) merupakan spesifikasi arsitektur perangkat lunak yang berperan sebagai perantara komputasi. Dengan pola arsitektur *Representational State Transfer* (REST), API memfasilitasi pertukaran data terstruktur (umumnya dalam format JSON) antara peramban web (*client-side*) dan peladen (*server-side*) (Fielding, 2000). Desain API memastikan pemisahan fungsi (*Separation of Concerns*), sehingga logika kalkulasi probabilitas yang berat tetap terisolasi dengan aman di sisi peladen.

**2.2.14 Layanan Cloud Inference LLM (OpenRouter API)**
Menjalankan LLM secara mandiri (*self-hosting*) membutuhkan memori GPU tingkat tinggi. Sebagai alternatif terkelola, sistem ini menggunakan layanan agregator pihak ketiga, salah satunya OpenRouter API. Berbeda dengan penyedia tunggal, OpenRouter memfasilitasi akses terpadu ke berbagai model bahasa mutakhir dengan mengabstraksi kompleksitas autentikasi. Pemilihan agregator ini memitigasi isu *rate limit* yang sering terjadi pada penyedia tunggal, sehingga menjaga stabilitas dialog ITS secara *real-time*.

**Tabel 2.5 Profil Teknologi OpenRouter API**

| Komponen | Keterangan |
|---|---|
| **Pengembang** | OpenRouter Inc. |
| **Versi/API** | v1 (*endpoint* kompatibel dengan OpenAI) |
| **Tautan Resmi** | https://openrouter.ai |
| **Dokumentasi** | https://openrouter.ai/docs |

**2.2.15 Kerangka Kerja Web Modern (Next.js)**
Next.js (Vercel, 2024) merupakan kerangka pengembangan aplikasi web modern berbasis pustaka komponen *React*. Next.js menghadirkan pendekatan *rendering* yang dikenal sebagai *Server Components*. Komponen tertentu dirender sepenuhnya di lingkungan peladen (Node.js *runtime*) dan hanya hasil renderisasi finalnya yang dikirimkan ke peramban (*browser*) siswa. Pendekatan ini mengamankan rahasia *environment variables* dari paparan peretas di sisi klien sekaligus menekan beban unduhan berkas JavaScript.

**Tabel 2.6 Profil Teknologi Next.js**

| Spesifikasi | Keterangan |
|---|---|
| **Pengembang** | Vercel |
| **Tipe Kerangka Kerja** | React Framework untuk produksi |
| **Lisensi** | MIT License (*open-source*) |
| **Tautan Resmi** | https://nextjs.org |
| **Dokumentasi** | https://nextjs.org/docs |

**2.2.16 Manajemen State Global (Zustand)**
Zustand (Poimandres, 2024) diadopsi sebagai pustaka penyimpanan *state* global yang minimalis. Pada arsitektur aplikasi simulasi *Computer-Based Test* (CBT) yang kompleks, seperti pewaktu mundur yang persisten dan matriks jawaban, penggunaan *props drilling* konvensional dapat memicu rangkaian *re-rendering* berulang yang menurunkan kinerja peramban. Zustand mengatasi masalah ini melalui mekanisme pembaruan *state* selektif berbasis *hooks*, sehingga waktu pengerjaan soal dan obrolan AI tetap sinkron seketika ketika siswa berpindah halaman.

**Tabel 2.7 Profil Teknologi Zustand**

| Spesifikasi | Keterangan |
|---|---|
| **Pengembang** | Poimandres (PMNDRS) |
| **Tipe Pustaka** | State management untuk React |
| **Lisensi** | MIT License |
| **Tautan Repositori** | https://github.com/pmndrs/zustand |
| **Perintah Instalasi** | `npm install zustand` |

**2.2.17 Sistem Basis Data Relasional (PostgreSQL)**
PostgreSQL (PostgreSQL Global Development Group, 2024) adalah *Relational Database Management System* (RDBMS) berorientasi objek yang berskala *enterprise*. Reputasinya dibangun di atas kepatuhan terhadap prinsip ACID (*Atomicity, Consistency, Isolation, Durability*). Prinsip ini penting diterapkan pada skema basis data ITS untuk mencegah *race condition* atau kerusakan rekam jejak jawaban siswa ketika siswa mengeklik serangkaian jawaban pada detik-detik terakhir (*high concurrency*).

**Tabel 2.8 Profil Teknologi PostgreSQL**

| Spesifikasi | Keterangan |
|---|---|
| **Pengembang** | PostgreSQL Global Development Group |
| **Tipe Sistem** | Relational Database Management System (RDBMS) |
| **Lisensi** | PostgreSQL License (*open-source*) |
| **Tautan Resmi** | https://www.postgresql.org |
| **Dokumentasi** | https://www.postgresql.org/docs/ |

**2.2.18 Connection Pooling (PgBouncer)**
Batas bawaan koneksi simultan pada PostgreSQL umumnya sekitar 100 koneksi untuk mencegah kehabisan memori peladen (*Out of Memory*). Pada aplikasi dengan lalu lintas tinggi, membiarkan peramban klien membuka koneksi baru setiap saat akan memicu penolakan koneksi (*crash*). *Connection pooling* mengatasi masalah ini dengan menyediakan lapisan *middleware* (contohnya PgBouncer) di depan basis data. PgBouncer berfungsi sebagai perantara yang mendaur ulang (*recycle*) koneksi yang sedang *idle* agar dapat dipakai bergantian oleh ribuan permintaan klien (*multiplexing*) (PgBouncer, n.d.).

**2.2.19 Role-Based Access Control (RBAC)**
*Role-Based Access Control* (RBAC) merupakan metode pengelolaan hak akses yang membatasi penggunaan sumber daya sistem berdasarkan peran (*role*) yang dimiliki pengguna. Melalui pendekatan ini, setiap pengguna hanya dapat mengakses fitur sesuai dengan hak akses yang diberikan. Penerapan RBAC meningkatkan keamanan sistem dengan memisahkan wewenang antara Admin (pengelola bank soal) dan Siswa (peserta simulasi ujian).

**2.2.20 Pengujian Perangkat Lunak (Black-Box Testing)**
*Black-Box Testing* merupakan metode verifikasi perangkat lunak yang dijalankan dengan memeriksa luaran (*output*) fungsi sistem berdasarkan variasi masukan, tanpa mengevaluasi logika kode internal (*source code*) (Nidhra & Dondeti, 2012). Pada metode ini, penguji berfokus pada bagaimana sistem merespons interaksi pengguna akhir. Metode ini memastikan integrasi antarfungsi eksternal (seperti navigasi soal dan respons API) berjalan stabil sesuai skenario *edge case* yang ditetapkan.

**2.2.21 System Usability Scale (SUS)**
*System Usability Scale* (SUS) yang dikembangkan oleh Brooke (1996) merupakan instrumen evaluasi ergonomi perangkat lunak untuk mengukur tingkat kemudahan penggunaan berdasarkan persepsi pengguna. Instrumen ini menggunakan sepuluh butir pernyataan positif dan negatif yang disusun secara bergantian dengan skala persetujuan lima tingkat (*Likert scale*). Semakin tinggi skor yang diperoleh, semakin baik tingkat penerimaan sistem tersebut.

**2.2.22 Pengujian Keamanan (Penetration Testing)**
*Penetration Testing* (uji penetrasi) merupakan metode pengujian keamanan yang dilakukan dengan mensimulasikan serangan siber terhadap suatu arsitektur sistem secara legal dan terkontrol (OWASP, 2024a). Pengujian ini bertujuan mengidentifikasi celah kerentanan (*vulnerability*) pada infrastruktur yang berpotensi dieksploitasi oleh pelaku ancaman (*threat actor*).

**2.2.23 Otomatisasi Pemindaian Keamanan (OWASP ZAP)**
*Zed Attack Proxy* (ZAP) merupakan perangkat lunak *open-source* (OWASP, 2024b) yang digunakan untuk memfasilitasi proses *Penetration Testing*. OWASP ZAP beroperasi dengan mencegat lalu lintas komunikasi sebagai proksi *man-in-the-middle* antara peramban klien dan peladen aplikasi untuk mendeteksi potensi kerentanan keamanan, seperti injeksi kode lintas situs (*Cross-Site Scripting*/XSS).

**Tabel 2.9 Profil Alat Keamanan OWASP ZAP**

| Spesifikasi | Keterangan |
|---|---|
| **Pengembang** | Open Web Application Security Project (OWASP) |
| **Fungsi** | Web application security scanner / intercepting proxy |
| **Lisensi** | Apache License 2.0 |
| **Tautan Resmi** | https://www.zaproxy.org |
| **Dokumentasi** | https://www.zaproxy.org/docs/ |

**2.2.24 Browser Security APIs dan Kiosk Mode**
*Kiosk Mode* adalah istilah yang merujuk pada penguncian antarmuka aplikasi untuk mencegah pengguna berinteraksi dengan aplikasi lain. Pada aplikasi ujian berbasis web (CBT), teknik ini direplikasi menggunakan kombinasi *Browser APIs* berikut:
1. **Fullscreen API:** menyembunyikan bilah tugas (*taskbar*) sistem operasi dan tab lain.
2. **Page Visibility API (`visibilitychange`):** mendeteksi kapan sebuah tab peramban diminimalkan atau disembunyikan.
3. **Focus Events (`blur` dan `focus`):** mengidentifikasi perpindahan kursor ke luar bingkai DOM aplikasi.
4. **requestAnimationFrame:** eksekusinya dihentikan sementara oleh peramban jika elemen tidak terlihat (misalnya, digeser ke *virtual desktop* lain), sehingga andal digunakan sebagai *heartbeat monitor* untuk mendeteksi perpindahan tab.
