import re

with open('docs/skripsi/bab4.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace specific tables and their text references
content = content.replace("Tabel 4.23 Jenis Kerentanan", "Tabel 4.24 Jenis Kerentanan")
content = content.replace("pada Tabel 4.23", "pada Tabel 4.24")
content = content.replace("Berdasarkan Tabel 4.23", "Berdasarkan Tabel 4.24")

content = content.replace("Tabel 4.22 Kategori Risiko", "Tabel 4.23 Kategori Risiko")

content = content.replace("Tabel 4.21 Lingkungan Pengujian", "Tabel 4.22 Lingkungan Pengujian")
content = content.replace("pada Tabel 4.21", "pada Tabel 4.22")

content = content.replace("Tabel 4.20 Rekapitulasi", "Tabel 4.21 Rekapitulasi")
content = content.replace("pada Tabel 4.20", "pada Tabel 4.21")

content = content.replace("Tabel 4.19 Rekapitulasi", "Tabel 4.20 Rekapitulasi")
content = content.replace("pada Tabel 4.19", "pada Tabel 4.20")

content = content.replace("Tabel 4.18 Feedback", "Tabel 4.19 Feedback")
content = content.replace("pada Tabel 4.18", "pada Tabel 4.19")

content = content.replace("Tabel 4.17 Ulasan Positif", "Tabel 4.18 Ulasan Positif")
content = content.replace("pada Tabel 4.17, sedangkan", "pada Tabel 4.18, sedangkan")

with open('docs/skripsi/bab4.md', 'w', encoding='utf-8') as f:
    f.write(content)

