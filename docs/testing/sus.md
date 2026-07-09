# System Usability Scale (SUS) — Dokumentasi Pengujian Standar Internasional

## 1. Cover & Metadata

| Metadata | Nilai |
|----------|-------|
| **Judul Pengujian** | System Usability Scale (SUS) — Platform Lexica |
| **Aplikasi** | Lexica — Platform Persiapan UTBK-SNBT |
| **Versi Aplikasi** | v1.0 (Production) |
| **Tanggal Pelaksanaan** | [Diisi saat pelaksanaan] |
| **Evaluator** | [Diisi nama evaluator / tim riset] |
| **Tujuan Pengujian** | Mengukur persepsi kebergunaan sistem dari sisi pengguna akhir (STUDENT dan ADMIN) terhadap platform Lexica |
| **Standar Referensi** | Brooke, J. (1996). SUS: A "quick and dirty" usability scale. |
| **Metode Pengumpulan** | Survei online (Google Forms / form analog) |

---

## 2. Metodologi

### 2.1 Jumlah Responden

| Kelompok Responden | Jumlah Minimal | Jumlah Ideal | Sumber |
|--------------------|----------------|--------------|--------|
| STUDENT (siswa SMA / alumni) | 15 orang | 30+ orang | Nielsen (1993), Sauro & Lewis (2016) |
| ADMIN (pengelola platform) | 5 orang | 10+ orang | Opsional |

> **Catatan 1:** Jacob Nielsen merekomendasikan minimal 5 responden untuk menemukan 85% masalah usability. Namun untuk SUS scoring kuantitatif yang representatif dan dapat dilakukan uji statistik, direkomendasikan **minimal 15–20 responden** per kelompok (Sauro & Lewis, 2016).
>
> **Catatan 2:** Jika supervisor penelitian meminta uji statistik lanjutan (uji normalitas, t-test, ANOVA, dsb), **aim ke n ≥ 30 per kelompok**. Jumlah ini memenuhi asumsi Central Limit Theorem untuk uji parametrik, sehingga analisis statistik lebih robust. Untuk n = 15–20, gunakan uji non-parametrik (misal: Mann-Whitney U, Wilcoxon signed-rank).

### 2.2 Kriteria Responden

#### STUDENT:
- Siswa SMA kelas 12 atau alumni (Pejuang Gap Year)
- Berdomisili di Indonesia
- Sudah menggunakan platform Lexica minimal **30 menit** dan mengeksplorasi fitur utama
- Tidak memiliki latar belakang profesional di bidang educational technology (untuk menghindari bias)

#### ADMIN:
- Pengelola / tutor yang menggunakan panel admin Lexica
- Sudah menggunakan panel admin minimal **15 menit**
- Pernah melakukan minimal: tambah/edit soal, lihat statistik pengguna, menggunakan question scraper

### 2.3 Skenario Tugas Pre-Questionnaire

Responden diinstruksikan menyelesaikan skenario tugas berikut **sebelum** mengisi kuesioner SUS, agar interaksi dengan sistem terlebih dahulu terjadi dan persepsi kebergunaan terukur dengan akurat.

#### Skenario untuk STUDENT:

| No | Tugas | Estimasi Waktu |
|----|-------|----------------|
| 1 | Login ke platform Lexica | 2 menit |
| 2 | Menyelesaikan diagnostic tryout (minimal 10 soal) | 10 menit |
| 3 | Melihat Learning Path dan memahami progres bab | 3 menit |
| 4 | Mengerjakan latihan soal dengan bantuan AI Tutor | 8 menit |
| 5 | Melihat Analytics Radar dan Chancing Engine | 5 menit |
| 6 | Berinteraksi dengan Free Chat AI Tutor | 2 menit |
| **Total** | | **30 menit** |

#### Skenario untuk ADMIN:

| No | Tugas | Estimasi Waktu |
|----|-------|----------------|
| 1 | Login ke panel admin Lexica | 1 menit |
| 2 | Menambahkan soal baru ke bank soal | 5 menit |
| 3 | Mengedit soal yang sudah ada | 3 menit |
| 4 | Melihat statistik pengguna | 3 menit |
| 5 | Menggunakan Question Scraper | 3 menit |
| **Total** | | **15 menit** |

### 2.4 Metode Pengumpulan Data

- **Media:** Google Forms (online) atau kuesioner cetak (paper-based)
- **Jenis:** Self-administered questionnaire (responden mengisi sendiri)
- **Waktu Pengisian:** ± 3 menit setelah menyelesaikan skenario tugas
- **Metode Moderasi:** Unmoderated (responden mengisi sendiri tanpa pengawas langsung) atau Moderated (dengan panduan singkat dari evaluator)
- **Lokasi:** Online (remote) atau Laboratorium usability (onsite)

---

## 3. Instrumen — 10 Pernyataan Standar SUS

Instrumen ini menggunakan 10 pernyataan standar SUS yang telah divalidasi secara internasional (Brooke, 1996). Pernyataan positif (ganjil) dan negatif (genap) berselang-seling untuk menghindari response bias.

**Skala Likert:**
- **1** = Sangat Tidak Setuju
- **2** = Tidak Setuju
- **3** = Netral
- **4** = Setuju
- **5** = Sangat Setuju

| No | Pernyataan | Arah |
|----|------------|------|
| 1 | Saya berpikir akan sering menggunakan aplikasi ini. | **Positif (Ganjil)** |
| 2 | Saya merasa aplikasi ini rumit untuk digunakan. | **Negatif (Genap)** |
| 3 | Saya merasa aplikasi ini mudah digunakan. | **Positif (Ganjil)** |
| 4 | Saya membutuhkan bantuan teknis untuk menggunakan aplikasi ini. | **Negatif (Genap)** |
| 5 | Saya merasa fitur-fitur aplikasi ini terintegrasi dengan baik. | **Positif (Ganjil)** |
| 6 | Saya merasa terlalu banyak inkonsistensi dalam aplikasi ini. | **Negatif (Genap)** |
| 7 | Saya merasa orang lain akan cepat mempelajari aplikasi ini. | **Positif (Ganjil)** |
| 8 | Saya merasa aplikasi ini sangat rumit untuk digunakan. | **Negatif (Genap)** |
| 9 | Saya merasa percaya diri menggunakan aplikasi ini. | **Positif (Ganjil)** |
| 10 | Saya perlu belajar banyak hal sebelum bisa menggunakan aplikasi ini. | **Negatif (Genap)** |

> **Catatan:** Untuk kelompok ADMIN, pernyataan di atas tetap dapat digunakan tanpa modifikasi, karena SUS dirancikan untuk mengukur usability sistem secara umum. Jika ingin lebih spesifik ke konteks admin, pernyataan dapat disesuaikan dengan tetap mempertahankan struktur positif-negatif yang berselang-seling.

---

## 4. Metode Skoring

### 4.1 Konversi Skor per Item

Setiap item dikonversi menjadi skor item (0–4) dengan rumus:

**Item Positif (ganjil: 1, 3, 5, 7, 9):**
```
skor_item = nilai_jawaban - 1
```

**Item Negatif (genap: 2, 4, 6, 8, 10):**
```
skor_item = 5 - nilai_jawaban
```

### 4.2 Contoh Perhitungan

Contoh respons responden:

| No | Pernyataan | Nilai Jawaban | Arah | Skor Item |
|----|------------|---------------|------|-----------|
| 1 | Saya berpikir akan sering menggunakan aplikasi ini. | 5 | Positif | 4 |
| 2 | Saya merasa aplikasi ini rumit untuk digunakan. | 2 | Negatif | 3 |
| 3 | Saya merasa aplikasi ini mudah digunakan. | 4 | Positif | 3 |
| 4 | Saya membutuhkan bantuan teknis untuk menggunakan aplikasi ini. | 2 | Negatif | 3 |
| 5 | Saya merasa fitur-fitur aplikasi ini terintegrasi dengan baik. | 4 | Positif | 3 |
| 6 | Saya merasa terlalu banyak inkonsistensi dalam aplikasi ini. | 2 | Negatif | 3 |
| 7 | Saya merasa orang lain akan cepat mempelajari aplikasi ini. | 4 | Positif | 3 |
| 8 | Saya merasa aplikasi ini sangat rumit untuk digunakan. | 1 | Negatif | 4 |
| 9 | Saya merasa percaya diri menggunakan aplikasi ini. | 4 | Positif | 3 |
| 10 | Saya perlu belajar banyak hal sebelum bisa menggunakan aplikasi ini. | 2 | Negatif | 3 |
| | | | **Total** | **32** |

**Skor SUS:**
```
SUS Score = Total Skor Item × 2.5
SUS Score = 32 × 2.5 = 80
```

### 4.3 Skor Akhir

- Rentang skor: **0 – 100**
- Skor dihitung per responden
- Skor akhir penelitian = **rata-rata skor SUS seluruh responden**

---

## 5. Interpretasi Hasil

### 5.1 Kriteria Acceptability (Brooke, 1996; Sauro & Lewis, 2016)

| Rentang Skor | Kategori | Keterangan |
|--------------|----------|------------|
| < 50 | Not Acceptable | Kebergunaan di bawah rata-rata, perlu perbaikan signifikan |
| 50 – 68 | Marginal | Cukup, namun perlu perbaikan |
| ≥ 68 | Acceptable | Kebergunaan memadai untuk digunakan |
| ≥ 80 | Excellent | Kebergunaan sangat baik |

> **Target penelitian:** Skor SUS ≥ 68 (*acceptable*)

### 5.2 Adjective Rating Scale (Sauro & Lewis, 2016)

| Skor SUS | Adjective Rating |
|----------|------------------|
| ≤ 25 | Worst Imaginable |
| 25.1 – 38.9 | Terrible |
| 39 – 51.9 | Poor |
| 52 – 62.9 | OK |
| 63 – 71.9 | Good |
| 72 – 80.9 | Excellent |
| 81 – 100 | Best Imaginable |

### 5.3 Bangor et al. Grading Scale (A–F)

| Skor SUS | Grade | Keterangan |
|----------|-------|------------|
| ≥ 84 | A | Excellent |
| 68 – 83.9 | B | Good |
| 51 – 67.9 | C | OK / Fair |
| 36 – 50.9 | D | Poor |
| ≤ 35.9 | F | Terrible |

> **Catatan:** Tabel di atas merupakan **adaptasi simplifikasi** dari grading scale Bangor et al. (2008). Versi asli dari paper Bangor menggunakan rentang yang lebih granular dengan perbedaan skor minimal 0.1 poin (misal: A- = 78.9–80.7, B+ = 77.2–78.8, dst). Versi yang disajikan di sini disederhanakan untuk memudahkan interpretasi dalam konteks penelitian skripsi. Jika reviewer akademis meminta presisi penuh, gunakan tabel granular asli dari paper Bangor et al. (2008).

### 5.4 Benchmark Industri

- **Rata-rata SUS produk software secara umum:** 68
- **Aplikasi pendidikan (ed-tech):** biasanya 65–75
- **Target Lexica:** ≥ 68 (mencapai rata-rata industri atau di atasnya)

---

## 6. Analisis Tambahan

### 6.1 Uji Reliabilitas Instrumen — Cronbach's Alpha

Untuk memastikan 10 item SUS konsisten mengukur konstruk usability yang sama, hitung **Cronbach's Alpha** menggunakan rumus berbasis varians (konsisten dengan output SPSS/JASP):

```
α = (k / (k - 1)) × (1 - Σσᵢ² / σₓ²)
```

*Di mana:*
- `k` = jumlah item (10)
- `σᵢ²` = varians masing-masing item
- `σₓ²` = varians total skor SUS seluruh item

> **Catatan:** Rumus di atas adalah versi standard yang digunakan oleh software statistik umum (SPSS, JASP, R). Ada juga versi standardized alpha yang menggunakan rata-rata korelasi antar item: α = (k × r̄) / (1 + (k - 1) × r̄). Kedua rumus valid secara teori, tapi hasilnya bisa berbeda sedikit. Untuk konsistensi dengan tools analisis yang umum dipakai, gunakan rumus berbasis varians di atas.

**Kriteria reliabilitas (Nunally & Bernstein, 1994):**

| Nilai α | Kriteria |
|---------|----------|
| α ≥ 0.90 | Sangat Baik (Excellent) |
| 0.80 – 0.89 | Baik (Good) |
| 0.70 – 0.79 | Cukup (Acceptable) |
| 0.60 – 0.69 | Marginal |
| < 0.60 | Tidak Dapat Diterima |

> **Target penelitian:** Cronbach's Alpha ≥ 0.70 (minimal acceptable untuk penelitian skripsi)

### 6.2 Margin of Error — Confidence Interval (CI)

Selain mean skor SUS, laporkan **Confidence Interval 95%** untuk memberikan estimasi margin of error:

```
CI = mean ± (t × (s / √n))
```

*Di mana:*
- `t` = nilai t-distribution untuk df = n-1 pada α = 0.05 (biasanya ~1.96 untuk n ≥ 30)
- `s` = standar deviasi skor SUS
- `n` = jumlah responden
- `√n` = akar kuadrat jumlah responden

**Contoh interpretasi:**
- Mean SUS = 75
- CI 95% = [70, 80]
- Artinya: dengan 95% keyakinan, skor SUS populasi berada antara 70–80

> **Catatan:** CI menunjukkan presisi estimasi. Semakin kecil jarak antara lower dan upper bound, semakin tepat estimasi mean SUS.

### 6.3 Uji Normalitas — Shapiro-Wilk

Sebelum memilih uji statistik parametrik atau non-parametrik, lakukan **uji normalitas** pada data skor SUS:

- **Uji yang digunakan:** Shapiro-Wilk Test (rekomendasi untuk n ≤ 50)
- **Hipotesis:**
  - H₀: Data berdistribusi normal
  - H₁: Data tidak berdistribusi normal
- **Kriteria:** Jika p-value > 0.05, terima H₀ (data normal); jika p-value ≤ 0.05, tolak H₀ (data tidak normal)

**Pemilihan uji statistik:**

| Kondisi | Uji yang Digunakan |
|---------|--------------------|
| Data normal & n ≥ 30 | Parametrik: Independent t-test, Paired t-test, ANOVA |
| Data tidak normal atau n < 30 | Non-parametrik: Mann-Whitney U, Wilcoxon signed-rank, Kruskal-Wallis |

### 6.4 Segmentasi Responden (Opsional)

Analisis SUS dapat dipecah berdasarkan karakteristik responden:

| Segmentasi | Variabel |
|------------|----------|
| Usia | 15–17 tahun (siswa SMA) vs 18–22 tahun (alumni) |
| Familiaritas teknologi | Beginner vs Intermediate vs Advanced |
| Peran | STUDENT vs ADMIN |
| Metode pembelajaran | Self-paced vs Bimbingan formal |

### 6.3 Korelasi dengan Feedback Kualitatif

Tambahkan **1 pertanyaan terbuka** di akhir kuesioner untuk melengkapi SUS:

> "Apa yang paling Anda sukai dari aplikasi ini? Apa yang perlu diperbaiki?"

Hasil kualitatif dapat dikaitkan dengan skor SUS untuk mengidentifikasi:
- Fitur yang berkontribusi pada skor tinggi
- Area yang menjadi pemicu skor rendah

### 6.4 Analisis Per Item (Item Analysis)

Untuk setiap item, hitung **mean dan standar deviasi** untuk mengidentifikasi item yang paling kontributif atau bermasalah:

| No | Pernyataan | Mean | SD |
|----|------------|------|-----|
| 1 | Saya berpikir akan sering menggunakan aplikasi ini. | — | — |
| 2 | Saya merasa aplikasi ini rumit untuk digunakan. | — | — |
| ... | ... | ... | ... |
| 10 | Saya perlu belajar banyak hal sebelum bisa menggunakan aplikasi ini. | — | — |

Item dengan mean sangat rendah (untuk item positif) atau sangat tinggi (untuk item negatif) menunjukkan area yang perlu diperbaiki.

---

## 7. Rencana Pelaksanaan Pengujian

### 7.1 Tahap Persiapan

- [ ] Menyusun kuesioner SUS dalam format Google Forms / survei online
- [ ] Menyusun skenario tugas yang harus dikerjakan responden sebelum mengisi kuesioner
- [ ] Menyiapkan informed consent form (untuk penelitian skripsi)
- [ ] Melakukan *pilot test* pada 5–10 orang untuk validasi kuesioner dan perhitungan Cronbach's Alpha
- [ ] Menyiapkan rekruitmen responden (minimal 15–20 STUDENT, 5–10 ADMIN opsional)

### 7.2 Tahap Distribusi

#### Untuk Responden STUDENT:
1. Briefing singkat tentang tujuan penelitian (5 menit)
2. Responden menandatangani informed consent
3. Responden menyelesaikan skenario tugas (30 menit)
4. Responden mengisi kuesioner SUS (3 menit)
5. Responden mengisi feedback kualitatif tambahan (2 menit)

#### Untuk Responden ADMIN (opsional):
1. Briefing singkat tentang tujuan penelitian (3 menit)
2. Responden menandatangani informed consent
3. Responden menggunakan panel admin sesuai skenario (15 menit)
4. Responden mengisi kuesioner SUS (3 menit)
5. Responden mengisi feedback kualitatif tambahan (2 menit)

### 7.3 Tahap Analisis

1. Memeriksa kelengkapan data (tidak ada yang kosong)
2. Menghitung skor SUS per responden
3. Menghitung rata-rata, median, dan standar deviasi skor SUS
4. Menghitung Cronbach's Alpha untuk reliabilitas instrumen
5. Melakukan segmentasi analisis (jika diperlukan)
6. Mengidentifikasi item dengan mean terendah/tertinggi
7. Mengkorelasi dengan feedback kualitatif
8. Membandingkan dengan benchmark industri (68)
9. Menyusun laporan hasil pengujian

---

## 8. Kriteria Kelayakan

### 8.1 Kriteria untuk STUDENT

| Kriteria | Target | Metode Pengukuran |
|----------|--------|-------------------|
| Kebergunaan (SUS) | ≥ 68 | Rata-rata skor SUS siswa |
| Reliabilitas instrumen (Cronbach's α) | ≥ 0.70 | Perhitungan statistik |
| Jumlah responden | ≥ 15 orang (minimal), 30+ (ideal) | Count data survei |
| Tingkat kelulusan | ≥ 80% responden | Proporsi skor individual ≥ 68 |

### 8.2 Kriteria untuk ADMIN (opsional)

| Kriteria | Target | Metode Pengukuran |
|----------|--------|-------------------|
| Kebergunaan (SUS) | ≥ 68 | Rata-rata skor SUS admin |
| Jumlah responden | ≥ 5 orang (minimal), 10+ (ideal) | Count data survei admin |

---

## 9. Referensi

- Brooke, J. (1996). SUS: A "quick and dirty' usability scale. Diakses dari https://uiuxdesign.ninja/sus/
- Sauro, J., & Lewis, J. R. (2016). *Quantifying the User Experience: Practical Statistics for User Research*. Diakses dari https://measuringu.com/sus/
- Bangor, A., Kortum, P. T., & Miller, J. T. (2008). An empirical evaluation of the System Usability Scale. *International Journal of Human-Computer Interaction*, 24(6), 574–594.
- Nielsen, J. (1993). *Usability Engineering*. Boston: Academic Press.
- Nunally, J. C., & Bernstein, I. H. (1994). *Psychometric Theory* (3rd ed.). New York: McGraw-Hill.

---

## 10. Rujukan Dokumen Lain

- `docs/research.md` — Kerangka penelitian dan instrumen
- `docs/skripsi/bab3.md` — Rencana pengujian sistem
- `docs/skripsi/bab2.md` — Dasar teori SUS
- `docs/aboutapp.md` — Deskripsi fitur dan arsitektur sistem

---

## 11. Lampiran

### Lampiran A — Template Informed Consent Form

**FORM PERSETUJUAN UNTUK MENJADI RESPONDEN PENELITIAN**

---

**Judul Penelitian:** Pengembangan Platform Persiapan UTBK-SNBT Berbasis AI dengan Pendekatan Socratic Scaffolding

**Evaluator/Tim Peneliti:** [Nama peneliti / tim riset]

**Institusi:** [Nama institusi / universitas]

---

**Tujuan Penelitian**
Penelitian ini bertujuan untuk mengembangkan dan mengevaluasi platform persiapan UTBK-SNBT yang integrating AI Tutor berbasis Socratic Scaffolding. Anda diundang untuk menjadi responden dalam pengujian usability sistem ini.

**Prosedur**
1. Anda akan menggunakan platform Lexica selama ±30 menit
2. Anda akan mengisi kuesioner System Usability Scale (SUS) (±3 menit)
3. Semua data yang dikumpulkan bersifat anonim dan hanya digunakan untuk keperluan akademis

**Hak Responden**
- Anda berhak untuk berhenti kapan saja tanpa konsekuensi
- Anda berhak untuk tidak menjawab pertanyaan tertentu
- Data Anda akan dijaga kerahasiaannya

**Manfaat**
- Kontribusi terhadap pengembangan sistem pendidikan berbasis AI
- Pengalaman menggunakan teknologi pembelajaran adaptif terbaru

**Kontak**
Jika ada pertanyaan, hubungi: [email peneliti]

---

**Persetujuan**

Dengan menandatangani form ini, saya menyatakan:
- Saya telah membaca dan memahami informasi di atas
- Saya bersedia menjadi responden secara sukarela
- Saya memahami hak saya untuk berhenti kapan saja

| | |
|---|---|
| Nama Responden (tidak wajib diisi jika anonim): | _________________________ |
| Tanggal: | _________________________ |
| Tanda Tangan: | _________________________ |

---

### Lampiran B — Template Raw Data SUS (Contoh Format)

| Responden ID | Role | Item 1 | Item 2 | Item 3 | Item 4 | Item 5 | Item 6 | Item 7 | Item 8 | Item 9 | Item 10 | Skor Mentah | Skor SUS (0-100) |
|--------------|------|--------|--------|--------|--------|--------|--------|--------|--------|--------|---------|-------------|------------------|
| R001 | STUDENT | 5 | 2 | 4 | 2 | 4 | 2 | 4 | 1 | 4 | 2 | 32 | 80 |
| R002 | STUDENT | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |

> **Catatan:** Skor Mentah = jumlah skor item (0-40), Skor SUS = Skor Mentah × 2.5

---

### Lampiran C — Checklist Pilot Test

Sebelum pelaksanaan SUS testing utama, lakukan pilot test untuk memastikan:

- [ ] Semua responden pilot memahami skenario tugas
- [ ] Kuesioner SUS tidak ada pertanyaan yang ambigu
- [ ] Waktu pengisian kuesioner sesuai estimasi (±3 menit)
- [ ] Perhitungan skor SUS sudah benar (validasi manual)
- [ ] Cronbach's Alpha dari data pilot ≥ 0.70 (jika memungkinkan)
- [ ] Tidak ada technical issue saat pengumpulan data
