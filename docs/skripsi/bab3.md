# BAB III. METODE TUGAS AKHIR

## 3.1 Metode Penelitian
Pada platform Lexica ini, proses pengembangan sistem dilakukan menggunakan metode ADDIE (Analysis, Design, Development, Implementation, dan Evaluation). Metode ini dipilih karena memiliki tahapan yang sistematis sehingga memudahkan proses analisis, perancangan, pengembangan, implementasi, dan evaluasi sistem. Setiap tahapan dilakukan secara terstruktur sehingga hasil pengembangan dapat dievaluasi sebelum dilanjutkan ke tahap berikutnya. Dengan demikian, sistem yang dihasilkan diharapkan dapat berfungsi sesuai dengan tujuan penelitian.

Gambar 3. 1 Metode Pengembangan ADDIE

Berdasarkan gambar 3.1, tahapan yang dilakukan dalam pengembangan sistem adalah sebagai berikut:

1. **Analysis (Analisis Kebutuhan)**
Pada tahap ini, penulis menentukan fitur-fitur pada sistem sesuai dengan rumusan masalah yang telah ditentukan. Prosesnya meliputi pengumpulan data, analisis kebutuhan pengguna, serta penentuan kebutuhan sistem, baik kebutuhan fungsional, maupun kebutuhan non-fungsional. Tahapan analisis dilakukan secara menyeluruh agar sistem yang dikembangkan dapat berjalan sesuai dengan tujuan penelitian.
2. **Design System (Desain Sistem)**
Tahapan berikutnya merancang sistem yang akan dikembangkan. Perancangan ini dibuat menggunakan *Unified Modeling Language* (UML), seperti Use Case Diagram, Activity Diagram, dan Perancangan Basis Data. Perancangan ini dirancang untuk menggambarkan bagaimana pengguna (siswa dan Superadmin) dapat berinteraksi dengan sistem. Selain itu, dalam tahap ini juga merancang struktur basis data, serta tampilan antarmuka agar platform Lexica mudah digunakan.
3. **Development (Pengembangan)**
Pada tahapan ini, rancangan sistem yang telah dibuat sebelumnya diterapkan ke dalam bentuk kode program. Proses pengembangannya meliputi pembuatan logika di bagian *backend*, pengelolaan basis data menggunakan ORM, serta pembuatan *frontend* yang interaktif agar sistem dapat berjalan dengan baik dan sangat responsif.
4. **Implementation (Implementasi)**
Pada tahapan ini, sistem yang telah dikembangkan di-*deploy* ke layanan peladen awan (*cloud serverless*) dan digunakan sesuai dengan skenario yang telah dirancang. Selanjutnya dilakukan pengujian oleh responden sesuai dengan perannya, yaitu siswa dan superadmin, untuk memastikan seluruh fitur dapat digunakan dengan baik sebelum dilakukan evaluasi.
5. **Evaluation (Evaluasi)**
Pada tahap ini dilakukan evaluasi terhadap sistem yang telah dikembangkan melalui beberapa jenis pengujian, yaitu:

   **a. Black-Box & Performance Testing**
   Pengujian dilakukan untuk memastikan seluruh fungsi sistem berjalan sesuai dengan kebutuhan yang telah ditentukan. Pengujian mencakup fitur autentikasi, pengelolaan bank soal, Mode Belajar, Mode Ujian, AI Tutor, Learning Analytics, Learning Path, serta proses impor soal dari dokumen Excel. Selain itu, dilakukan *Stress Testing* (menggunakan *Autocannon*) untuk menguji ketahanan batas beban server (*throughput* dan *latency*).
   **b. System Usability Scale (SUS)**
   Pengujian dilakukan untuk mengukur tingkat kemudahan penggunaan (*usability*) sistem berdasarkan penilaian responden yang terdiri atas siswa dan SuperAdmin.
   **c. Penetration Testing**
   Pengujian keamanan dilakukan menggunakan OWASP ZAP untuk mengidentifikasi potensi kerentanan pada aplikasi web, seperti kesalahan konfigurasi keamanan, kelemahan autentikasi, *missing security headers*, serta potensi kerentanan lainnya. Hasil pengujian digunakan sebagai dasar evaluasi dan perbaikan keamanan sistem sebelum aplikasi digunakan.

---

## 3.2 Requirement Analysis
Analisis kebutuhan sistem dilakukan melalui studi literatur dan analisis terhadap platform persiapan UTBK sejenis yang telah tersedia. Hasil analisis tersebut digunakan sebagai dasar dalam menyusun kebutuhan fungsional dan non-fungsional yang akan diimplementasikan pada aplikasi sehingga sistem yang dikembangkan sesuai dengan tujuan penelitian.

Pada tahap ini, kebutuhan sistem terbagi menjadi dua jenis, yaitu kebutuhan fungsional dan kebutuhan non-fungsional. Kebutuhan tersebut disusun berdasarkan fitur dan spesifikasi *Intelligent Tutoring System* (ITS) yang dikembangkan.

### 3.2.1 Kebutuhan Fungsional

**1. Aktor : Siswa**
Tabel 3.1 Kebutuhan Fungsional Siswa
| No. | Kebutuhan Fungsional |
|:---:|---|
| 1 | Siswa dapat melakukan registrasi dan login ke dalam sistem menggunakan kredensial email dan kata sandi. |
| 2 | Siswa dapat mengatur target nilai belajar dan target harian sebagai dasar perencanaan pembelajaran. |
| 3 | Siswa dapat melihat *personal plan* (Learning Path) dan prioritas materi berdasarkan hasil penguasaan materi yang tersimpan pada sistem. |
| 4 | Siswa dapat mengerjakan ujian melalui halaman ujian yang dilengkapi *timer* per subtes dan navigasi soal. |
| 5 | Siswa dapat memulai sesi Mode Belajar (Latihan Soal per Bab) dengan bantuan AI Tutor yang memberikan *scaffolding* bertingkat saat terjadi kesalahan. |
| 6 | Siswa dapat memulai sesi Mode Ujian (Try Out) tanpa bantuan AI Tutor. |
| 7 | Siswa dapat melihat *dashboard* analitik pembelajaran yang menampilkan statistik belajar, tren nilai, kalkulasi probabilitas lulus (*chancing*), dan rekomendasi belajar. |
| 8 | Siswa dapat melihat riwayat pembelajaran dari seluruh aktivitas pengerjaan ujian dan latihan yang pernah dilakukan. |
| 9 | Siswa dapat mengelola profil dan mengubah informasi akun melalui halaman Pengaturan. |

**2. Aktor : Superadmin**
Tabel 3.2 Kebutuhan Fungsional Superadmin
| No. | Kebutuhan Fungsional |
|:---:|---|
| 1 | Superadmin dapat login ke dalam sistem. |
| 2 | Superadmin dapat melihat dashboard admin menampilkan informasi mengenai jumlah siswa, mata pelajaran soal, dan ujian yang tersedia di dalam sistem. |
| 3 | Superadmin dapat mengelola data mata pelajaran dan materi bab. |
| 4 | Superadmin dapat mengelola bank soal, mengimpor soal dari file Excel, serta mengelola data Universitas dan Jurusan. |
| 5 | Superadmin dapat memantau hasil sesi belajar dan hasil ujian yang dikerjakan oleh siswa. |
| 6 | Superadmin dapat mengelola data pengguna serta mengatur peran pengguna sesuai dengan hak akses yang tersedia pada sistem. |

**3. Kebutuhan Fungsional Sistem**
Tabel 3.3 Kebutuhan Fungsional Sistem
| No. | Kebutuhan Fungsional |
|:---:|---|
| 1 | Sistem dapat memeriksa dan menilai jawaban pilihan ganda secara otomatis berdasarkan kunci jawaban yang tersedia. |
| 2 | Sistem dapat menampilkan simbol maupun rumus matematika menggunakan format LaTeX secara *real-time*. |
| 3 | Sistem dapat memberikan bantuan pembelajaran secara adaptif pada Mode Belajar, berupa *AI Hint*, *AI Feedback*, serta pembatasan jumlah percobaan menjawab (maksimal 2 kali percobaan). |
| 4 | Sistem dapat menghitung peluang kelulusan secara algoritmis berdasarkan nilai siswa dan tingkat keketatan program studi tujuan. |
| 5 | Sistem dapat menyusun Learning Path dan menentukan prioritas belajar berdasarkan hasil nilai yang diperoleh siswa. |
| 6 | Sistem dapat memperbarui tingkat penguasaan materi (*Mastery Tracking*) secara otomatis berdasarkan hasil pengerjaan siswa. |

### 3.2.2 Kebutuhan Non-Fungsional
Kebutuhan non-fungsional menggambarkan kualitas sistem secara keseluruhan dan tidak dikaitkan dengan aktor tertentu, seperti:

a. Sistem dirancang menggunakan arsitektur *Serverless* agar dapat melakukan penskalaan (*scaling*) otomatis dan melayani ratusan interaksi pengguna per detik (di atas 140 req/sec) tanpa kendala *timeout*.
b. Sistem memanfaatkan mekanisme *Edge Caching* untuk mendistribusikan data statis secara instan dengan waktu muat kurang dari 20 milidetik.
c. Sistem tetap dapat digunakan secara mandiri untuk berlatih meskipun terdapat kendala koneksi pada layanan eksternal *Artificial Intelligence* (melalui komponen antarmuka *Fallback Hint* pengganti *chat*).
d. Antarmuka sistem dibuat dengan memperhatikan kemudahan penggunaan (*user-friendly*) agar setiap pengguna dapat mengoperasikan sistem dengan lebih mudah.
e. Keamanan data dijaga dengan menerapkan enkripsi kata sandi menggunakan **bcryptjs** dan proteksi sesi menggunakan standar Auth.js.

---

## 3.3 Desain Sistem
Bagian ini menjelaskan perancangan sistem yang akan dikembangkan berdasarkan hasil analisis kebutuhan yang telah dilakukan sebelumnya. Perancangan ini bertujuan untuk memberikan gambaran mengenai bagaimana sistem akan bekerja, baik dari sisi proses, pengelolaan data, maupun tampilan antarmuka yang digunakan oleh pengguna. Dalam penelitian, perancangan sistem dibagi menjadi beberapa pendekatan utama, yaitu:

### 3.3.1 Pemodelan Sistem dengan Unified Modeling Language (UML)
Pada tahapan perancangan, penulis menggunakan pendekatan berbasis objek menggunakan *Unified Modeling Language* (UML). UML dipakai untuk menggambarkan dan mendokumentasikan alur kerja *Intelligent Tutoring System* (ITS) ini berjalan. Beberapa diagram UML yang digunakan antara lain:
- **Use Case Diagram** — digunakan untuk menggambarkan hubungan antara pengguna dengan sistem yang dibuat. Use Case Diagram ini menunjukkan fitur-fitur yang dapat digunakan oleh pengguna serta interaksi yang terjadi di dalam sistem.
- **Activity Diagram** — digunakan untuk menjelaskan alur proses yang berjalan di dalam sistem. Diagram ini membantu menggambarkan urutan aktivitas pengguna, mulai dari awal hingga akhir proses. Dalam penelitian ini, Activity Diagram digunakan untuk menggambarkan proses Login, proses pengerjaan soal, hingga proses sistem memberikan hasil evaluasi kepada pengguna.

### 3.3.2 Pendekatan Database Diagram
Perancangan Database dilakukan untuk menentukan struktur penyimpanan data pada sistem. Database dirancang agar data pengguna, data soal, hasil pengerjaan siswa, serta data pembelajaran dapat tersimpan dengan baik dan terorganisir.

### 3.3.3 Arsitektur Sistem
Arsitektur sistem digunakan untuk menggambarkan hubungan antar komponen utama yang membangun aplikasi. Pada penelitian ini, sistem dikembangkan menggunakan arsitektur berbasis web modern dengan **Next.js (App Router)** sebagai *Framework full-stack* utama, **Prisma ORM** sebagai penghubung basis data, dan **PostgreSQL (Neon Serverless DB)** sebagai penyimpanan data utama. Layanan autentikasi menggunakan standar keamanan Auth.js dengan enkripsi *bcryptjs*.

Selain itu, sistem juga terintegrasi dengan layanan **Groq API** sebagai penyedia *Large Language Model* (LLM) untuk memproses logika *Socratic Scaffolding*. Pemrosesan instruksi sistem (*system prompt*) dilakukan di sisi *backend* (API Route) agar *API Key* Groq tetap aman dan tidak terekspos ke klien.

Gambar 3. 30 Arsitektur Sistem

Berdasarkan Gambar 3.30, arsitektur sistem menggambarkan alur komunikasi antar komponen utama pada platform Lexica. Pengguna terdiri dari siswa dan SuperAdmin yang membuka aplikasi melalui *browser*. Seluruh permintaan pengguna dikirim *browser* ke server Next.js, kemudian server mengembalikan hasil kepada pengguna. Next.js berkomunikasi dengan PostgreSQL (Neon DB) melalui Prisma ORM untuk menyimpan dan mengambil data yang tersimpan. Kemudian Next.js mengirimkan *Prompt* ke Groq API untuk menjalankan fitur AI Tutor. Apabila layanan Groq API tidak tersedia, sistem menampilkan komponen *Fallback Hint* di antarmuka agar siswa tetap dapat melanjutkan evaluasi.

### 3.3.4 Perancangan AI Tutor
Perancangan AI Tutor dilakukan untuk menjelaskan mekanisme kerja komponen ITS yang digunakan pada Mode Belajar. Pada bagian ini dijelaskan bagaimana AI Tutor memproses jawaban siswa, menentukan strategi bimbingan berdasarkan jumlah percobaan (*attempt count*), serta menyusun *prompt* sebelum dikirimkan ke LLM. Selain itu, bagian ini juga membahas komponen pendukung seperti *Prompt Builder*, *Rule-Based Strategy Selector*, *Zero-Friction Context Injection*, *Mastery Tracking*, dan *Learning Path* yang bekerja bersama untuk menghasilkan pengalaman belajar yang adaptif sesuai dengan kemampuan masing-masing siswa.

#### 3.3.4.1 Arsitektur AI Tutor
AI Tutor dirancang sebagai komponen utama dalam *Intelligent Tutoring System* (ITS) yang bertugas memberikan bimbingan kepada siswa selama proses pembelajaran. Ketika siswa mengirimkan jawaban, sistem terlebih dahulu mengumpulkan informasi yang dibutuhkan, seperti soal, jawaban siswa, jumlah percobaan (*attempt count*), serta kunci jawaban yang benar. Selanjutnya jumlah percobaan digunakan oleh *Rule-Based Strategy Selector* untuk menentukan strategi bimbingan yang akan diberikan. Setelah itu, *Prompt Builder* menyusun *prompt* yang dikirimkan ke LLM melalui Groq API. Apabila layanan Groq API tidak dapat digunakan, sistem secara otomatis menampilkan komponen antarmuka `FallbackHint` sebagai pengganti respons AI sehingga proses pembelajaran tetap dapat berlangsung. Respons yang dihasilkan oleh LLM selanjutnya ditampilkan kepada siswa dalam bentuk *AI Hint* atau *AI Feedback* sesuai dengan kebutuhan pembelajaran.

Gambar 3. 31 Arsitektur AI

#### 3.3.4.2 Prompt Builder
*Prompt Builder* merupakan komponen yang bertugas menyusun instruksi (*prompt*) berdasarkan kondisi pembelajaran siswa. Informasi yang dimasukkan ke dalam *prompt* meliputi soal, jawaban siswa, jawaban benar, serta strategi bimbingan yang telah dipilih oleh sistem. *Prompt* kemudian dikirimkan ke LLM agar menghasilkan respons yang sesuai dengan kondisi siswa. Untuk mendukung proses pembelajaran yang berpusat pada siswa, *Prompt Builder* menerapkan mekanisme **Zero-Friction Context Injection**. Pada mekanisme ini, seluruh konteks soal termasuk jawaban yang dipilih siswa dan kunci jawaban yang benar dikirimkan ke LLM agar AI mampu memberikan umpan balik yang sangat kontekstual dan spesifik. Pada antarmuka (*UI*) mode latihan, meskipun data kunci jawaban dikirim ke klien dari basis data untuk kebutuhan evaluasi instan, tampilannya secara visual di-*masking* menjadi `???` sehingga siswa tidak melihatnya secara langsung sebelum batas percobaan habis. Mekanisme ini mengeliminasi *extraneous cognitive load* karena siswa tidak perlu mengetik ulang soal untuk berdiskusi dengan AI.

Selain itu, *Prompt Builder* juga menerima data program studi tujuan utama siswa (`targetMajor1`) dan menyisipkannya ke dalam konteks *prompt* sebagai motivasi makro, agar AI sesekali menghubungkan relevansi soal dengan cita-cita jurusan siswa.

#### 3.3.4.3 Rule-Based Strategy Selector
*Rule-Based Strategy Selector* merupakan salah satu komponen pada AI Tutor yang berfungsi menentukan strategi bimbingan bertingkat (dikelola melalui *state* `useTutorChatStore`) sebelum permintaan dikirimkan ke LLM. Komponen ini menerapkan pendekatan *Rule-Based System* dengan menggunakan jumlah percobaan sebagai dasar pengambilan keputusan.

Tabel 3.4 Aturan Pemilihan Strategi Bimbingan AI Tutor
| Jumlah Percobaan | Level Scaffold | Strategi Bimbingan |
|:---:|:---:|---|
| Salah 1x | **SOCRATIC** | AI memberikan pertanyaan pemandu (*Socratic question*) untuk memicu pemikiran kritis. Jawaban akhir tidak diberikan. |
| Salah 2x (batas percobaan habis) | **HINT** | AI memberikan petunjuk spesifik (*partial hint*) berupa konsep atau rumus yang relevan, namun belum menyelesaikan soal secara langsung. |
| Melebihi toleransi / diminta oleh siswa | **SOLUTION** | AI memberikan pembahasan komprehensif yang terstruktur. |

Berdasarkan Tabel 3.4, sistem menentukan strategi bimbingan berdasarkan jumlah percobaan yang dilakukan siswa. Apabila siswa melakukan kesalahan pada percobaan pertama, AI Tutor memberikan **SOCRATIC** (pertanyaan pemandu) sebagai petunjuk awal tanpa langsung memberikan jawaban. Jika siswa masih belum berhasil menjawab dengan benar setelah percobaan kedua, sistem mengubah level ke **HINT** (petunjuk parsial). Apabila siswa telah melampaui batas toleransi atau secara aktif meminta pembahasan, diberikan **SOLUTION** komprehensif. Pergantian level ini merupakan penerapan *Instructional Scaffolding*, yaitu pemberian bantuan yang disesuaikan dengan kondisi belajar siswa.

#### 3.3.4.4 Struktur Penjelasan Level SOLUTION
Untuk menjamin kualitas pemahaman, LLM diinstruksikan melalui *Prompt Builder* agar memberikan respons terstruktur pada level SOLUTION dalam format berikut:
1. **Konsep yang Diuji** — identifikasi konsep atau teori inti di balik soal.
2. **Langkah Penyelesaian** — penjelasan langkah demi langkah pemecahan soal secara logis.
3. **Kesalahan Umum** — mengidentifikasi jebakan soal yang sering mengecoh siswa.
4. **Soal Latihan Serupa** — satu soal buatan AI yang serupa untuk memperkuat pemahaman (*active recall*).

#### 3.3.4.5 AI Hint dan AI Feedback
AI Tutor menghasilkan dua jenis keluaran yang digunakan untuk mendukung proses pembelajaran, yaitu *AI Hint* dan *AI Feedback*. *AI Hint* diberikan ketika siswa masih mengalami kesulitan dalam menjawab soal pada Mode Belajar. Bentuk bantuan yang diberikan disesuaikan dengan level *scaffold* yang telah dipilih oleh *Rule-Based Strategy Selector*, yaitu berupa pertanyaan pemandu (*SOCRATIC*), petunjuk parsial (*HINT*), atau pembahasan lengkap (*SOLUTION*).

*AI Feedback* diberikan setelah siswa menyelesaikan suatu soal. Umpan balik ini berisi penjelasan mengenai jawaban siswa, konsep yang digunakan, serta alasan mengapa jawaban tersebut benar atau kurang tepat sehingga siswa dapat memahami letak kesalahannya.

#### 3.3.4.6 Mastery Tracking
*Mastery Tracking* merupakan komponen pada sistem yang berfungsi memantau tingkat penguasaan materi setiap siswa secara spesifik per bab. Sistem menggunakan tabel `ChapterProgress` pada basis data untuk mencatat status penguasaan tiap bab dengan label: *Dikuasai* (mastery ≥ 70%), *Sedang Dipelajari* (mastery > 0% tetapi < 70%), dan *Belum Mulai* (belum ada aktivitas). Nilai *mastery* dihitung berdasarkan akumulasi hasil pengerjaan siswa dengan persamaan berikut:

$$\text{Mastery} = \frac{\text{Total Jawaban Benar}}{\text{Total Soal}} \times 100\%$$

Nilai *mastery* diperbarui secara otomatis setelah siswa menyelesaikan sesi latihan bab, sehingga nilai yang digunakan pada sesi berikutnya merupakan hasil akumulasi pembelajaran sebelumnya. Fitur ini terintegrasi langsung dengan *Learning Path* untuk menyusun prioritas belajar.

#### 3.3.4.7 Learning Path (Rute Belajar Personal)
*Learning Path* merupakan fitur yang memberikan rekomendasi materi belajar berdasarkan hasil *Mastery Tracking*. Tujuan dari fitur ini adalah membantu siswa memfokuskan proses belajar pada materi yang masih memerlukan penguatan sehingga pembelajaran menjadi lebih terarah dan sesuai dengan kebutuhan masing-masing siswa.

Untuk menentukan urutan prioritas, sistem melakukan pengurutan (*sorting*) berdasarkan dua tingkat:
1. **Tingkat Mata Pelajaran:** Mata pelajaran dengan rata-rata penguasaan (*average mastery*) terendah ditempatkan di urutan teratas.
2. **Tingkat Bab:** Di dalam setiap mata pelajaran, bab diurutkan berdasarkan status: *Sedang Dipelajari* (prioritas 1), *Belum Mulai* (prioritas 2), kemudian *Dikuasai* (prioritas 3).

Dengan mekanisme ini, materi yang paling membutuhkan penguatan akan ditampilkan di urutan teratas, sehingga rute belajar menjadi efisien dan adaptif sesuai kelemahan individu siswa.

### 3.3.5 Use Case Diagram

Gambar 3. 2 Use Case Diagram

Berdasarkan Gambar 3.2 menjelaskan Use Case Diagram yang menggambarkan fungsionalitas pada platform Lexica berbasis *Intelligent Tutoring System* (ITS). Diagram ini menunjukkan aktor yang berinteraksi dengan sistem beserta fungsi-fungsi yang dapat diakses sesuai dengan hak akses masing-masing.

**1. Aktor Utama (Pengguna Sistem)**
Terdapat 2 aktor utama yang berinteraksi dengan sistem, yakni sebagai berikut:

- **Siswa** — Siswa dapat melakukan autentikasi, mengatur profil dan target jurusan, mengerjakan simulasi pada Mode Belajar (didampingi AI Tutor) maupun Mode Ujian (tanpa AI), mengakses halaman analitik personal (radar, tren, evaluasi, chancing), serta mengakses halaman riwayat pembelajaran dan Learning Path.
- **Superadmin** — Superadmin memiliki kendali penuh terhadap manajemen seluruh mata pelajaran, bank soal global, monitoring aktivitas seluruh pengguna, serta pengelolaan data universitas, jurusan, dan hak akses akun.

**2. Relasi include dan extend**
- **Relasi include:** Sebagian besar *use case* memiliki relasi *include* terhadap Login. Hal ini menunjukkan bahwa pengguna harus melakukan autentikasi terlebih dahulu sebelum dapat mengakses seluruh fitur yang tersedia pada sistem.
- **Relasi extend:** *Use-case* Logout memiliki relasi *extend* terhadap Login, yang menunjukkan bahwa pengguna dapat mengakhiri sesi penggunaan sistem setelah berhasil melakukan login.

**3. Fungsionalitas Berdasarkan Aktor**

*Fungsionalitas Siswa:*
Setelah berhasil login, siswa dapat mengakses beberapa fitur utama, yaitu:
- Mengatur target belajar (Onboarding & Target Jurusan PTN).
- Melihat dashboard siswa yang menampilkan ringkasan aktivitas belajar.
- Memulai Mode Belajar (Latihan Soal per Bab) yang dilengkapi dengan AI Tutor.
- Memulai Mode Ujian (Try Out) tanpa bantuan AI.
- Melihat analitik pembelajaran (Learning Analytics) sebagai evaluasi hasil belajar.
- Mengubah informasi akun melalui fitur Pengaturan.

*Fungsionalitas SuperAdmin:*
Setelah berhasil login, SuperAdmin dapat mengakses fitur administrasi sistem, yaitu:
- Melihat dashboard admin.
- Mengelola data mata pelajaran dan bab.
- Mengelola bank soal beserta media pendukung.
- Mengimpor soal dari file Excel.
- Memantau hasil belajar siswa.
- Mengelola data pengguna beserta hak aksesnya.
- Mengelola data Universitas dan Jurusan.

### 3.3.6 Activity Diagram

#### 3.3.6.1 Activity Diagram Siswa dan SuperAdmin

**Login**

Gambar 3. 3 Activity Diagram Login

Gambar 3.3 menjelaskan proses login pengguna ke dalam sistem. Proses dimulai ketika pengguna membuka halaman login, kemudian memasukkan email dan kata sandi untuk proses autentikasi. Selanjutnya, sistem akan memverifikasi data yang dimasukkan menggunakan Auth.js. Apabila proses autentikasi berhasil, sistem akan mengarahkan pengguna (Siswa dan Superadmin) ke dashboard sesuai dengan peran (*role*) yang dimiliki. Jika autentikasi gagal, sistem akan menampilkan pesan kesalahan dan mengarahkan kembali ke halaman login.

**Memperbarui Profil**

Gambar 3. 5 Activity Diagram Memperbarui Profil

Gambar 3.5 menggambarkan proses pengguna dalam memperbarui informasi akun melalui halaman Pengaturan. Proses dimulai ketika pengguna memilih menu Pengaturan, kemudian sistem menampilkan formulir profil yang berisi nama, sekolah, tahun kelulusan, dan target jurusan PTN. Selanjutnya, pengguna mengubah data yang diperlukan dan menekan tombol Simpan Perubahan. Sistem kemudian menyimpan data yang telah diperbarui ke dalam *database* sehingga informasi profil pengguna berhasil diperbarui.

#### 3.3.6.2 Activity Diagram Siswa

**Personal Plan (Onboarding)**

Gambar 3. 6 Activity Diagram Personal Plan

Gambar 3.6 menunjukkan alur yang dilalui siswa saat pertama kali menggunakan aplikasi. Setelah berhasil login, sistem akan memeriksa apakah pengguna merupakan siswa baru atau pengguna lama. Jika pengguna merupakan siswa baru, sistem akan mengarahkan siswa untuk mengisi data profil terlebih dahulu (sekolah, tahun kelulusan, target jurusan PTN pilihan 1 dan pilihan 2). Setelah data disimpan ke dalam *database*, sistem akan mengarahkan siswa untuk mengerjakan *Diagnostic Try Out* sebagai *baseline* kemampuan awal. Sementara itu, jika pengguna merupakan pengguna lama, sistem akan langsung mengarahkan ke halaman dashboard.

**Mode Belajar (Latihan Soal)**

Gambar 3. 7 Activity Diagram Mode Belajar

Gambar 3.7 menunjukkan alur pembelajaran pada fitur Mode Belajar yang memanfaatkan AI sebagai tutor pribadi. Proses dimulai ketika siswa memilih bab materi yang ingin dipelajari melalui halaman Learning Path, kemudian sistem menyajikan 10 soal latihan dari bank soal bab tersebut. Selama mengerjakan soal, sistem akan mengevaluasi jawaban siswa. Jika jawaban benar, sistem akan memberikan umpan balik positif dan melanjutkan ke soal berikutnya. Namun, jika jawaban salah pada percobaan pertama, AI Tutor akan memberikan pertanyaan pemandu (*SOCRATIC*) melalui panel AI di sisi kanan layar dan siswa mendapat **Kesempatan Kedua** untuk menjawab ulang (dengan opsi salah sebelumnya dinonaktifkan). Jika percobaan kedua juga salah, sistem akan menampilkan jawaban benar dan menyediakan tombol pembahasan lengkap AI (*SOLUTION*). Setelah seluruh soal selesai dikerjakan, sistem menampilkan ringkasan hasil berupa jumlah benar, salah, dan akurasi, serta memperbarui *Mastery Tracking* per bab.

**Mode Ujian (Try Out)**

Gambar 3. 8 Activity Diagram Mode Ujian

Gambar 3.8 menjelaskan proses pelaksanaan Mode Ujian dalam sistem. Mode ini dirancang untuk simulasi ujian tanpa ada bantuan AI Tutor selama proses pengerjaan (panel AI Tutor dikunci dan menampilkan pesan "*Fokus Mode Ujian*"). Dimulai dari siswa memilih paket Try Out yang tersedia, kemudian sistem akan menyiapkan sesi dan menyajikan soal yang dilengkapi oleh *timer* per subtes (*section block-timer*) dan navigasi soal interaktif. Siswa hanya dapat mengerjakan soal dalam subtes yang sedang aktif (*Section Locking*). Setelah siswa menjawab seluruh soal dan menekan tombol "Kumpulkan Ujian", sistem akan mengevaluasi seluruh jawaban menggunakan algoritma IRT dan menampilkan skor akhir (jumlah benar, θ IRT, dan skor SNBT 200-800) kepada siswa.

**Melihat Analitik Siswa**

Gambar 3. 9 Activity Diagram Analitik Siswa

Gambar 3.9 menggambarkan proses sistem ketika menampilkan data analitik. Diawali dengan siswa membuka menu analitik, kemudian sistem akan menampilkan modul-modul yang tersedia (Radar Kemampuan, Tren Skor, Bank Soal Salah, Prediksi Peluang Kelulusan, dan Explorer). Siswa memilih salah satu modul, dan sistem mengambil data pembelajaran secara keseluruhan lalu mengolahnya menjadi informasi visual (grafik, tabel, dan *insight*) yang mudah dipahami oleh siswa.

**Melihat Riwayat Pembelajaran**

Gambar 3. 10 Activity Diagram Riwayat Pembelajaran

Gambar 3.10 menggambarkan proses siswa dalam melihat riwayat pembelajaran. Diawali dengan siswa membuka panel AI Tutor dan memilih salah satu riwayat Try Out, sistem akan menampilkan daftar soal beserta jawaban siswa. Siswa dapat memilih soal tertentu dan menekan tombol "Tanya Pembahasan AI Tutor" untuk mendapatkan pembahasan lengkap dari AI.

#### 3.3.6.3 Activity Diagram Superadmin

**Mengelola Mata Pelajaran dan Materi Bab**

Gambar 3. 11–14 Activity Diagram CRUD Mata Pelajaran

Superadmin dapat melakukan operasi *Create*, *Read*, *Update*, dan *Delete* pada data mata pelajaran dan materi bab. Proses dimulai dari memilih menu mata pelajaran, mengisi formulir, dan menekan tombol Simpan. Sistem memvalidasi isian data; apabila data valid, sistem menyimpan ke dalam *database* dan menampilkan pesan sukses. Apabila tidak valid, sistem menampilkan pesan *error* dan meminta superadmin memperbaiki isian formulir.

**Mengelola Bank Soal**

Gambar 3. 23–27 Activity Diagram CRUD Bank Soal

Superadmin dapat menambah soal secara manual maupun melalui impor file Excel. Proses impor dimulai dari Superadmin mengunggah file Excel, sistem membaca dan menampilkan *preview* soal. Setelah dikonfirmasi, sistem menyimpan data ke *database*. Superadmin juga dapat mengedit dan menghapus soal yang telah tersimpan.

**Monitoring Aktivitas Pengguna (Manajemen User)**

Gambar 3. 28 Activity Diagram Manajemen User

Gambar 3.28 menggambarkan proses Superadmin dalam memantau aktivitas pengguna. Setelah membuka menu Manajemen User, sistem menampilkan daftar seluruh pengguna beserta atribut akun, role, nilai rata-rata IRT (θ), dan jumlah Try Out yang telah diselesaikan. Superadmin juga dapat melakukan pencarian, penyaringan berdasarkan role, serta mengubah data akun atau menghapus pengguna jika diperlukan.

### 3.3.7 Database Entity Relationship Diagram

Gambar 3. 29 Entity Relationship Diagram

Berdasarkan Gambar 3.29 yang menggambarkan struktur basis data sistem beserta hubungan antar entitasnya. Relasi tersebut mencakup data pengguna (`User`, `StudentProfile`), bank soal (`Subject`, `Chapter`, `Question`, `QuestionOption`), proses pengerjaan Try Out (`ExamTemplate`, `ExamSection`, `ExamAttempt`, `QuestionResponse`), penyimpanan skor per subtes (`SubjectScore`), sesi bimbingan AI (`TutoringSession`, `TutoringMessage`), perkembangan *mastery learning* per bab (`ChapterProgress`), serta data universitas dan jurusan (`University`, `Major`). Rancangan basis data ini menjadi dasar penyimpanan dan pengelolaan data agar seluruh fitur sistem dapat saling terintegrasi dengan baik.

---

## 3.4 Alat dan Bahan Tugas Akhir
Alat yang digunakan dalam proses pengembangan platform Lexica ini dapat dilihat di tabel sebagai berikut:

### 3.4.1 Perangkat Keras (Hardware)
| Spesifikasi Minimum | Spesifikasi yang Digunakan |
|---|---|
| OS: Windows 10 (64-bit) | Jenis Laptop: ASUS TUF Gaming F15 |
| Processor: Intel Core i3 2.0 GHz | OS: Windows 11 (64-bit) |
| RAM: 4GB | Processor: Intel Core i5-10300H @2.50GHz |
| Penyimpanan Internal minimal 256GB | RAM: 16GB |
| | Penyimpanan Internal SSD: 512GB |

### 3.4.2 Perangkat Lunak (Software)
- **Visual Studio Code**: Sebagai *Integrated Development Environment* (IDE).
- **Node.js & npm**: *Runtime environment* dan pengelola paket.
- **Next.js (App Router)**: *Framework full-stack* utama pembangun aplikasi.
- **Prisma ORM**: Sebagai *Object-Relational Mapper* untuk efisiensi *query database*.
- **PostgreSQL (Neon DB)**: Sebagai sistem manajemen basis data *serverless*.
- **Vercel**: Sebagai platform *cloud hosting* dan *Edge Network*.
- **Zustand**: Sebagai pustaka *state management* untuk mengelola konteks soal, timer, dan riwayat *chat* AI.
- **KaTeX**: Sebagai *library* render rumus matematika LaTeX secara *real-time* di sisi klien.

### 3.4.3 Layanan Kecerdasan Buatan (AI)
Layanan Kecerdasan Buatan (AI) yang digunakan adalah **Groq API** dengan memanfaatkan model *llama-3.1-8b-instant* yang berfungsi sebagai *engine* AI utama. Groq API dipilih karena kemampuannya menghasilkan pemrosesan bahasa (LPU) secara sangat cepat (*real-time*), yang esensial untuk membimbing siswa tanpa adanya jeda (latensi) yang panjang pada mode latihan. Untuk mitigasi kegagalan jaringan API, antarmuka menyediakan komponen `FallbackHint` agar siswa tetap bisa melanjutkan evaluasi.

### 3.4.4 Dataset Pihak Ketiga & Pertama

**Dataset Pihak Ketiga:**
Dataset dari pihak lain yang digunakan dalam tugas akhir ini berupa kumpulan soal latihan, seperti soal TKA dari tahun sebelumnya yang diperoleh dari buku dan sumber publik lainnya. Selain itu, dataset publik mengenai daftar Perguruan Tinggi Negeri (PTN), program studi, daya tampung, jumlah peminat, dan tingkat keketatan juga digunakan sebagai basis data referensi untuk fitur *Chancing Engine*. Dataset ini digunakan sebagai referensi utama dalam penyusunan soal dan data pada sistem.

**Dataset Pihak Pertama:**
Selain menggunakan dataset dari pihak lain, penulis menyusun dataset mandiri untuk melengkapi kebutuhan sistem. Dataset ini berupa kumpulan soal yang diketik dan diolah ke dalam format Excel (.xlsx) agar dapat terbaca dan diproses otomatis oleh sistem melalui fitur *Bulk Import*. Dataset yang telah disusun dipakai sebagai bank soal utama dalam sistem.