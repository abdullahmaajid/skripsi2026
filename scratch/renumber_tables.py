import re
import sys

def main():
    with open('docs/skripsi/bab4.md', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We will replace them in reverse order to avoid overlapping replacements
    # 4.18 -> 4.17
    # 4.19 (first) -> 4.18
    # 4.19 (second) -> 4.19
    
    # Let's do explicit replace for the table titles and text references
    
    # 1. Update text references first (since they match Tabel 4.18, etc.)
    content = content.replace("Tabel 4.18", "TEMP_4_17")
    
    # 2. The first Tabel 4.19 is "Feedback Responden Siswa". We'll replace it specifically.
    content = content.replace("Tabel 4.19 Feedback Responden", "TEMP_4_18 Feedback Responden")
    
    # The text reference: "sedangkan saran perbaikan dirangkum pada Tabel 4.19"
    content = content.replace("dirangkum pada Tabel 4.19", "dirangkum pada TEMP_4_18")
    
    # 3. The second Tabel 4.19 is "Hasil Pengolahan Data SUS Admin". We leave it as 4.19.
    # Text reference: "Berdasarkan hasil perhitungan pada Tabel 4.19, diperoleh rata-rata skor SUS sebesar 100,0"
    # (Leaves it as 4.19)
    
    # Now restore the TEMPs
    content = content.replace("TEMP_4_17", "Tabel 4.17")
    content = content.replace("TEMP_4_18", "Tabel 4.18")
    
    with open('docs/skripsi/bab4.md', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    main()
