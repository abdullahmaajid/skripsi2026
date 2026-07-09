# Research Framework & Metodologi Penelitian Lexica

## BAB I: Pendekatan Penelitian

### Metodologi yang Digunakan
Penelitian ini menggunakan pendekatan **Design Science Research (DSR)** yang bertujuan menghasilkan artefak (platform perangkat lunak) yang dapat menyelesaikan masalah nyata.

**Tahapan DSR:**
1. **Identifikasi Masalah** - Analisis gap pada platform TryOut konvensional
2. **Kajian Literatur** - Tinjauan ITS, IRT, LLM dalam pendidikan
3. **Desain Solusi** - Arsitektur sistem dan algoritma
4. **Implementasi** - Pengembangan platform Lexica
5. **Evaluasi** - Black-box testing dan SUS survey
6. **Komunikasi Hasil** - Dokumentasi dan validasi

---

## BAB II: Desain Penelitian

### 2.1 Variabel Penelitian
| Variabel | Definisi | Implementasi |
|----------|----------|--------------|
| Independent | Intervensi AI Tutor (Scaffolding Level) | SOCRATIC, HINT, SOLUTION |
| Dependent | Pemahaman konsep siswa | Skor IRT θ improvement |
| Control | Faktor keketatan prodi | Competitiveness ratio |

### 2.2 Subjek Penelitian
- **Target**: Siswa SMA kelas 12, Pejuang Gap Year
- **Responden Uji Coba**: Minimal 30 orang siswa SMA
- **Kriteria**: Pengguna platform Lexica untuk evaluasi SUS

### 2.3 Rancangan Eksperimen
**Studi Kuantitatif:**
- Pre-test: Tryout awal untuk estimasi baseline θ
- Treatment: Latihan dengan AI Tutor scaffolding
- Post-test: Tryout akhir untuk mengukur improvement

**Studi Kualitatif:**
- Analisis log interaksi AI Tutor
- Wawancara singkat dengan pengguna tentang UX

---

## BAB III: Instrument Penelitian

### 3.1 Black-Box Testing Matrix
| Fungsi | Input | Expected Output | Status |
|--------|-------|-----------------|--------|
| Login/Logout | Email, password | Session aktif/nonaktif | - |
| Tryout CBT | Soal 7 subtes | Skor IRT + chancing | - |
| AI Tutor | Soal + jawaban salah | Scaffolding response | - |
| Learning Path | Hasil tryout | Rute belajar personal | - |
| Analytics | Data tryout | Radar chart + tren | - |

### 3.2 System Usability Scale (SUS) Questionnaire
1. Saya menganggap sistem ini mudah digunakan.
2. Saya menganggap sistem ini rumit untuk digunakan.
3. Saya merasa sistem ini "user friendly".
4. Saya merasa perlu banyak usaha belajar untuk menggunakan sistem ini.
5. Saya merasa sangat percaya diri menggunakan sistem ini.
6. Saya merasa cukup takut untuk menggunakan sistem ini.
7. Saya merasa mudah untuk mengerti penggunaan sistem ini.
8. Saya merasa cara kerja sistem ini sangat tidak konsisten.
9. Saya merasa ada banyak konflik dalam penggunaan sistem ini.
10. Saya merasa ini akan membantu orang yang belajar dengan cara yang sama seperti saya.

**Skala:** 1 (Sangat Tidak Setuju) - 5 (Sangat Setuju)

---

## BAB IV: Analisis Data

### 4.1 Analisis IRT
- **Metode**: Newton-Raphson MLE
- **Kriteria Konvergen**: |Δθ| < 0.001
- **Iterasi Maksimal**: 50 kali
- **Range Output**: [-3, 3] logit

### 4.2 Analisis Chancing
- **Ratio Analysis**: studentScore/majorEstimated
- **Adjustment Factor**: Berdasarkan competitiveness
- **Output**: Persentase peluang (5% - 95%)

### 4.3 Analisis SUS
- **Skor Minimum Acceptable**: 68
- **Skor Interpretation**:
  - < 50: Not Acceptable
  - 50-68: Marginal
  - ≥ 68: Acceptable
  - ≥ 80: Excellent

---

## BAB V: Validasi & Verifikasi

### 5.1 Validasi Teknis
- [ ] API Groq terhubung dengan baik
- [ ] Estimasi IRT konvergen sesuai harapan
- [ ] Chancing Engine menghitung ratio dengan benar
- [ ] Scaffolding level bertransisi sesuai urutan

### 5.2 Validasi Non-teknis
- [ ] UX sesuai prinsip Cognitive Load Theory
- [ ] Learning Path terpersonalisasi dengan baik
- [ ] Bank soal salah terintegrasi dengan evaluasi
- [ ] Navigasi 5-menu user-friendly

---

## BAB VI: Rencana Analisis Hasil

### 6.1 Metrics Utama
| Metric | Formula | Target |
|--------|---------|--------|
| SUS Score | Σ(respon × bobot) - 25 | ≥ 68 |
| IRT Improvement | θ_post - θ_pre | > 0.5 |
| Completion Rate | Soal selesai / Soal total | ≥ 80% |
| Response Time | Average AI response | ≤ 3 detik |

### 6.2 Analisis Kualitatif
- Feedback pengguna tentang AI Tutor
- Observasi penggunaan Learning Path
- Insight tentang kegunaan chancing simulator

---