import re

with open('docs/skripsi/bab4.md', 'r') as f:
    content = f.read()

# Fix image numbering for 4.3
content = content.replace("Gambar 4.37 Pembaruan Learning Analytics", "Gambar 4.39 Antarmuka Learning Analytics dan Learning Path")
content = content.replace("Gambar 4.37 menampilkan proses pembaruan", "Gambar 4.39 menampilkan proses pembaruan")
content = content.replace("*(Placeholder: Masukkan Gambar 4.37 Pembaruan Learning Analytics dan Learning Path di sini | Route URL: `Dinamis/Modal`)*", 
"*(Placeholder: Masukkan Gambar 4.39 (Gabungan Screenshot) halaman Rapor & Evaluasi dan halaman Learning Path di sini | Route URL: `/analytics` & `/learning-path`)*")

with open('docs/skripsi/bab4.md', 'w') as f:
    f.write(content)

print("Updated numbering")
