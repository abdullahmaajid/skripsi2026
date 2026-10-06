import re

with open('docs/skripsi/bab4.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Normalize all "Tabel 4.XX" to placeholders so we don't accidentally double-replace
mapping = [
    ("Pengujian Black-Box Fitur Autentikasi", 1),
    ("Pengujian Black-Box Fitur Pengaturan Profil", 2),
    ("Pengujian Black-Box Mode Belajar", 3),
    ("Pengujian Black-Box Mode Tryout", 4),
    ("Pengujian Black-Box Rapor & Evaluasi", 5),
    ("Pengujian Black-Box Ruang AI Tutor", 6),
    ("Pengujian Black-Box Practice (Quick Drill)", 7),
    ("Pengujian Black-Box Admin (Dashboard & CRUD Dasar)", 8),
    ("Pengujian Black-Box Admin (Kelola PTN/Prodi)", 9),
    ("Pengujian Black-Box Admin (Kelola Tryout)", 10),
    ("Pengujian Black-Box Admin (Analytics & Pengaturan)", 11),
    ("Skala Likert Kuesioner SUS", 12),
    ("Instrumen Pernyataan Kuesioner SUS", 13),
    ("Adjective Rating", 14),
    ("Karakteristik Responden Pengujian SUS (Siswa)", 15),
    ("Hasil Pengolahan Data SUS Siswa", 16),
    ("Hasil Pengolahan Data SUS Admin", 17),
    ("Ulasan Positif Responden terhadap Sistem", 18),
    ("Feedback Responden Siswa", 19),
    ("Rekapitulasi Hasil Pengujian SUS", 20),
    ("Lingkungan Pengujian Penetration Testing", 21),
    ("Kategori Risiko OWASP ZAP", 22),
    ("Jenis Kerentanan yang Ditemukan (Siklus 1)", 23),
    ("Hasil Pengujian ZAP (Siklus 2)", 24)
]

# 1. Update the definitions (lines starting with Tabel 4.X <Title>)
for title, num in mapping:
    # Match any "Tabel 4.XX Title" regardless of the number it currently has
    pattern = re.compile(rf"Tabel 4\.\d+\s+{re.escape(title)}")
    content = pattern.sub(f"Tabel 4.{num} {title}", content)

# 2. Update text references.
# "seperti pada Tabel 4.12 berikut." -> Skala Likert
content = re.sub(r"pada Tabel 4\.\d+ berikut\.", "pada Tabel 4.X berikut.", content)
# We know the specific text references from context:
content = content.replace("seperti pada Tabel 4.X berikut.", "seperti pada Tabel 4.12 berikut.", 1) # Skala Likert
content = content.replace("ditunjukkan pada Tabel 4.X berikut.", "ditunjukkan pada Tabel 4.13 berikut.", 1) # Instrumen
content = content.replace("ditunjukkan pada Tabel 4.X berikut.", "ditunjukkan pada Tabel 4.14 berikut.", 1) # Adjective Rating
content = content.replace("ditunjukkan pada Tabel 4.X berikut.", "ditunjukkan pada Tabel 4.15 berikut.", 1) # Karakteristik

content = re.sub(r"Berdasarkan hasil perhitungan pada Tabel 4\.\d+", "Berdasarkan hasil perhitungan pada Tabel 4.Y", content)
content = content.replace("Berdasarkan hasil perhitungan pada Tabel 4.Y", "Berdasarkan hasil perhitungan pada Tabel 4.16", 1) # Siswa
content = content.replace("Berdasarkan hasil perhitungan pada Tabel 4.Y", "Berdasarkan hasil perhitungan pada Tabel 4.17", 1) # Admin

content = re.sub(r"dilihat pada Tabel 4\.\d+, sedangkan saran perbaikan dirangkum pada Tabel 4\.\d+\.", 
                 "dilihat pada Tabel 4.18, sedangkan saran perbaikan dirangkum pada Tabel 4.19.", content)

content = re.sub(r"Berdasarkan rekapitulasi hasil pengujian SUS pada Tabel 4\.\d+", "Berdasarkan rekapitulasi hasil pengujian SUS pada Tabel 4.20", content)

content = re.sub(r"dapat dilihat pada Tabel 4\.\d+\.", "dapat dilihat pada Tabel 4.21.", content) # Lingkungan
# But wait, there is another "dapat dilihat pada Tabel 4.X." for Jenis Kerentanan!
# Let's be more specific:
content = content.replace("Adapun lingkungan pengujian yang digunakan dapat dilihat pada Tabel 4.21.", "Adapun lingkungan pengujian yang digunakan dapat dilihat pada Tabel 4.21.")
content = re.sub(r"Ringkasan gabungan jenis kerentanan yang ditemukan dapat dilihat pada Tabel 4\.\d+\.", "Ringkasan gabungan jenis kerentanan yang ditemukan dapat dilihat pada Tabel 4.23.", content)

content = re.sub(r"Berdasarkan Tabel 4\.\d+, kerentanan", "Berdasarkan Tabel 4.23, kerentanan", content)

with open('docs/skripsi/bab4.md', 'w', encoding='utf-8') as f:
    f.write(content)

