import re

with open('docs/skripsi/bab4.md', 'r') as f:
    content = f.read()

replacement = """## 4.2 Implementasi AI Tutor
Implementasi AI Tutor pada platform *Tryout* UTBK SNBT berbasis ITS dilakukan untuk memberikan bantuan pembelajaran adaptif berdasarkan kondisi jawaban siswa. Sistem menentukan bentuk bantuan yang diberikan berdasarkan status jawaban dan jumlah percobaan siswa. AI Tutor memanfaatkan LLM untuk menghasilkan respons pembelajaran berdasarkan konteks soal, jawaban siswa, jumlah percobaan, dan hasil analisis sistem. Secara keseluruhan, sistem mengelola empat kondisi (*states*) respons AI yang berbeda.

#### 1. Halaman Tampilan Soal dan Jawaban Siswa
Gambar 4.33 Halaman Tampilan Soal dan Jawaban Siswa
*(Placeholder: Masukkan Gambar 4.33 Halaman Tampilan Soal dan Jawaban Siswa di sini | Route URL: `/practice/[subjectId]`)*

Gambar 4.33 menunjukkan halaman pengerjaan soal pada Mode Belajar. Pada tahap ini siswa mengerjakan soal dan mengirimkan jawaban ke sistem. Setelah tombol "Kirim Jawaban" dipilih, sistem melakukan evaluasi terhadap jawaban siswa menggunakan mekanisme pemeriksaan jawaban yang telah diimplementasikan. Hasil evaluasi tersebut digunakan untuk menentukan status jawaban (benar atau salah), memperbarui data pembelajaran pada *Student Model*, serta menentukan strategi pendampingan yang akan diberikan oleh AI Tutor pada tahap berikutnya.

#### 2. Implementasi AI Tutor pada Jawaban Salah Pertama (*Socratic Hint*)
Gambar 4.34 *Log* Proses AI Tutor pada Percobaan Pertama (Jawaban Salah)
*(Placeholder: Masukkan Gambar 4.34 Log Console AI Tutor pada Percobaan Pertama di sini | Route URL: Console Output)*

Gambar 4.34 menampilkan *log* proses AI Tutor ketika siswa memberikan jawaban yang salah pada percobaan pertama. Setelah sistem mendeteksi jawaban belum benar, sistem mengambil informasi jumlah percobaan (*attempt count*) serta tingkat penguasaan materi (*mastery*) yang tersimpan pada *Student Model*. Berdasarkan data tersebut, *Rule-Based Strategy Selector* menentukan level *scaffolding* `SOCRATIC`. Selanjutnya, AI meracik *prompt* yang berisi aturan mutlak mekanisme *Blind Mode* agar AI tidak memberikan jawaban akhir, melainkan membalas dengan pertanyaan pancingan. *Log* ini memperlihatkan 3 tahapan utama secara berurutan: proses penyusunan *prompt*, pengiriman ke LLM melalui OpenRouter API, dan penerimaan respons.

#### 3. Implementasi AI Tutor pada Jawaban Salah Kedua (*Step-by-Step Guidance*)
Gambar 4.35 *Log* Proses AI Tutor pada Percobaan Kedua (Batas Maksimal)
*(Placeholder: Masukkan Gambar 4.35 Log Console AI Tutor pada Percobaan Kedua di sini | Route URL: Console Output)*

Apabila siswa kembali menjawab salah pada kesempatan kedua, sistem akan mendeteksi bahwa batas maksimal percobaan telah tercapai. Gambar 4.35 memperlihatkan perubahan penanganan oleh sistem di mana level *scaffolding* diturunkan menjadi `HINT` (Strategi *Step-by-Step Guidance*). Pada tahap ini, instruksi *prompt* yang dikirimkan ke LLM diarahkan untuk membimbing siswa langkah demi langkah tanpa harus bertanya balik secara terus-menerus, mengingat kesempatan menjawab siswa pada soal tersebut sudah habis.

#### 4. Implementasi AI Tutor pada Jawaban Benar (*Positive Reinforcement*)
Gambar 4.36 *Log* Proses AI Tutor pada Jawaban Benar
*(Placeholder: Masukkan Gambar 4.36 Log Console AI Tutor pada Jawaban Benar di sini | Route URL: Console Output)*

Gambar 4.36 menampilkan *log* ketika siswa berhasil memberikan jawaban yang benar (baik pada percobaan pertama maupun kedua). Sistem akan mengubah level *scaffolding* menjadi `SOLUTION` (Strategi *Positive Reinforcement*). *Prompt* yang dikirimkan ke LLM bertujuan untuk memberikan validasi positif dan apresiasi terhadap penyelesaian siswa. Selain itu, sistem juga mempersiapkan penjelasan (*solution*) secara penuh apabila siswa meminta penjabaran lebih lanjut, karena batasan *Blind Mode* sudah dilepas.

#### 5. Implementasi AI Tutor pada Ruang Diskusi Bebas (*Free Chat* / *Post-Test*)
Gambar 4.37 *Log* Proses AI Tutor pada Mode *Free Chat* / Pembahasan
*(Placeholder: Masukkan Gambar 4.37 Log Console AI Tutor pada Mode Free Chat di sini | Route URL: Console Output)*

Di luar dari pengerjaan soal (*Mode Belajar*), siswa memiliki akses ke ruang diskusi bebas dan halaman pembahasan setelah menyelesaikan ujian (*Post-Test Review*). Gambar 4.37 mengilustrasikan proses AI Tutor dalam menangani *request* dengan mode `FREE_CHAT`. Pada kondisi ini, sistem tidak membatasi respons AI dengan strategi instruksional *scaffolding* tertentu, melainkan membebaskan AI untuk menjawab dan menjelaskan materi selayaknya tutor personal secara langsung berdasarkan riwayat percakapan.

#### 6. Antarmuka Panel *Chat* AI Tutor
Gambar 4.38 Antarmuka AI Tutor
*(Placeholder: Masukkan Gambar 4.38 Antarmuka AI Tutor di sini | Route URL: `/practice/[subjectId]` Panel Kanan)*

Gambar 4.38 menampilkan antarmuka panel samping *AI Tutor* yang dapat diakses oleh siswa setelah menjawab soal pada Mode Belajar. Antarmuka ini dirancang menyerupai aplikasi *chatting* untuk memberikan pengalaman bimbingan yang interaktif dan familiar. Teks respons yang dihasilkan oleh *log* pada proses-proses sebelumnya diteruskan ke antarmuka ini secara asinkron. Setiap *bubble chat* mendukung perenderan persamaan matematika berformat LaTeX secara dinamis berkat modul `remark-math` dan `rehype-katex`."""

pattern = r"## 4\.2 Implementasi AI Tutor.*?Gambar 4\.35 menampilkan antarmuka \*AI Tutor\* yang dapat diakses oleh siswa setelah menyelesaikan latihan pada Mode Belajar.*?rehype-katex`\."
content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('docs/skripsi/bab4.md', 'w') as f:
    f.write(content)

print("Updated bab4.md")
