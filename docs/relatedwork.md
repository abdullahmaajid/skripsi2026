# Related Work: Penelitian Terdahulu dalam Pengembangan Lexica

## 1. Intelligent Tutoring Systems (ITS)

### 1.1 ITS Berbasis Rule-Based (Puspita et al., 2025)
- **Implementasi**: ITS kombinatorika dengan Gemini AI
- **Metode**: Rule-based reasoning + LLM
- **Keterbatasan**: Belum untuk ujian TryOut, tidak ada scaffolding bertingkat, tidak ada IRT
- **Gap yang Diisi Lexica**: Integrasi ITS dengan scaffolding 3-level dan IRT scoring

### 1.2 ITS untuk Web Development (Wiselee et al., 2025)
- **Implementasi**: Laravel + MySQL untuk pembelajaran mandiri
- **Metode**: SDLC tradisional
- **Keterbatasan**: Domain web development, belum ada LLM, belum ada TryOut
- **Gap yang Diisi Lexica**: Fokus ke UTBK dengan LLM Llama-3.3

---

## 2. Sistem TryOut Web-based

### 2.1 TryOut UTBK dengan Rekomendasi Jurusan (Nugraha & Hardiyanti, 2025)
- **Implementasi**: PHP + MySQL
- **Metode**: Waterfall
- **Keterbatasan**: Belum ada AI Tutor, belum ada IRT, belum ada learning path
- **Gap yang Diisi Lexica**: Integrasi serat AI Tutor + IRT + Learning Path

### 2.2 TryOut dengan Manajemen Soal Terintegrasi (Affan & Elhanafi, 2025)
- **Implementasi**: Web-based dengan fitur administrasi
- **Metode**: Waterfall
- **Keterbatasan**: Fokus administrasi, belum ada fitur pembelajaran adaptif
- **Gap yang Diisi Lexica**: Fokus pada pembelajaran, bukan administrasi

---

## 3. Large Language Models dalam Pendidikan

### 3.1 ChatGPT untuk Pendidikan (Kasneci et al., 2023)
- **Temuan**: LLM dapat mendukung pembelajaran adaptif
- **Tantangan**: Risiko jawaban instan, hallucination
- **Gap yang Diisi Lexica**: Scaffolding bertingkat untuk kontrol kualitas

### 3.2 Tantangan Etis LLM di Pendidikan (Yan et al., 2023)
- **Temuan**: Konsistensi dan akurasi masalah
- **Solusi**: Prompt engineering dan kontrol output
- **Implementasi Lexica**: Prompt terstruktur untuk tiap level scaffolding

---

## 4. Item Response Theory (IRT)

### 4.1 Pendampingan Teori IRT (De Ayala, 2009)
- **Model**: Rasch (1-PL), 2-PL, 3-PL
- **Keuntungan**: Invarian item, skor adil
- **Implementasi Lexica**: IRT 1-PL dengan estimasi Newton-Raphson

### 4.2 CAT vs Linear Testing
- **CAT**: Pemilihan soal dinamis
- **Lexica**: Tryout linear konvensional dengan IRT scoring
- **Alasan**: Implementasi CAT lebih kompleks, linear sudah cukup untuk keperluan

---

## 5. Cognitive Load Theory (CLT)

### 5.1 Implementasi CLT (Sweller, 1988)
- **Intrinsic Load**: Kompleksitas materi (tidak bisa dikurangi)
- **Extraneous Load**: Harus diminimalkan via desain
- **Germane Load**: Harus dimaksimalkan
- **Aplikasi Lexica**: Zero-friction injection, navigasi 5-menu, nested layout

---

## 6. Ringkasan Gap Research

| Penelitian | ITS | LLM | IRT | TryOut | Learning Path | Chancing |
|-----------|-----|-----|-----|--------|---------------|----------|
| Puspita (2025) | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Wiselee (2025) | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Nugraha (2025) | ✗ | ✗ | ✗ | ✓ | Partial | ✗ |
| Affan (2025) | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ |
| Kasneci (2023) | ✗ | Literature | ✗ | ✗ | ✗ | ✗ |
| **Lexica** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## 7. Novelty Lexica

1. **Integrasi End-to-End**: CBT + IRT + AI Scaffolding + Chancing + Learning Path
2. **Free Chat Mode**: AI Tutor langsung untuk materi/umum
3. **Zero-Friction Context Injection**: Soal otomatis di-injeksi ke AI tanpa copy-paste
4. **Target Major Injection**: Konteks jurusan target untuk motivasi personal
5. **Lokalisasi UTBK**: Skala 200-800, kluster Saintek/Soshum, 7 subtes

---