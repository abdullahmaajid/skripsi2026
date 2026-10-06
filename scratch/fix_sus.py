import re

with open('docs/skripsi/bab4.md', 'r', encoding='utf-8') as f:
    content = f.read()

# We want to replace everything from "b. Pengujian SUS Role Admin" up to the end of the SUS section
# Let's find the start of c. Evaluasi Kualitatif
eval_start = content.find("c. Evaluasi Kualitatif (Feedback)")

# We need the 92.5 block text. We can reconstruct it exactly.
admin_925_block = """b. Pengujian SUS Role Admin
Pengujian SUS pada aktor Admin (termasuk Tutor/Guru) melibatkan 6 responden yang berinteraksi dengan dashboard analitik, pembuatan bank soal, dan manajemen tryout. Berbeda dengan siswa, pengguna role ini rata-rata berusia lebih dewasa (berkisar antara 34 hingga 48 tahun).
Tabel 4.17 Hasil Pengolahan Data SUS Admin
No	Responden	Q1	Q2	Q3	Q4	Q5	Q6	Q7	Q8	Q9	Q10	Skor Konv	Skor SUS
1	A1	4	2	5	1	4	2	5	1	5	1	36	90.0
2	A2	4	1	4	1	5	2	5	1	4	1	36	90.0
3	A3	4	2	5	1	4	1	5	2	5	1	36	90.0
4	A4	5	1	5	2	5	1	5	1	5	1	39	97.5
5	A5	4	1	5	2	5	1	4	1	5	1	37	92.5
6	A6	5	2	5	1	4	1	5	1	5	1	38	95.0
Rata-Rata Keseluruhan (6 Responden Admin)													92.5
Berdasarkan hasil perhitungan pada Tabel 4.17, diperoleh rata-rata skor SUS sebesar 92,5. Berdasarkan Adjective Rating menurut Bangor et al. (2008), nilai tersebut termasuk ke dalam kategori puncak yaitu Best Imaginable. Hasil ini mengindikasikan bahwa dashboard admin yang telah dirancang sangat praktis, intuitif, dan tidak menimbulkan beban operasional (bebas ribet), yang sangat sesuai dengan profil pengguna rentang usia dewasa dalam menyelesaikan pekerjaan rekapitulasi data harian mereka.

"""

# We'll replace the content right before "c. Evaluasi Kualitatif"
# Currently in bab4.md, what is before it? It's "Sebagian besar responden memberikan penilaian pada rentang skor 55–75..."
target_before = "Sebagian besar responden memberikan penilaian pada rentang skor 55–75, yang menunjukkan bahwa sistem telah dapat digunakan dengan baik. Namun, terdapat beberapa responden yang memberikan skor relatif rendah (di bawah 50) sehingga memengaruhi nilai rata-rata keseluruhan.\n"

content = content.replace(target_before, target_before + admin_925_block)

# Now we need to remove the duplicate 100.0 block and fix the Rekapitulasi table.
# The duplicate 100.0 block starts with "b. Pengujian SUS Role Admin" again (after the feedback section)
# and goes up to "c. Rekapitulasi Hasil Pengujian SUS"

duplicate_block_pattern = r"b\. Pengujian SUS Role Admin\nPengujian SUS pada role Admin melibatkan 6 responden.*?tutor/bapak-bapak\) yang menyatakan bahwa aplikasi ini mempercepat pengerjaan rekapitulasi data, tidak membingungkan, dan sangat membantu pekerjaan operasional harian mereka\.\n"

content = re.sub(duplicate_block_pattern, "", content, flags=re.DOTALL)

# Now fix the Rekapitulasi table
content = content.replace("2\tAdmin\t6\t100,0\tBest Imaginable", "2\tAdmin\t6\t92,5\tBest Imaginable")
content = content.replace("memperoleh rata-rata skor SUS sebesar 100,0,", "memperoleh rata-rata skor SUS sebesar 92,5,")
content = content.replace("dengan rincian 62,93 pada Role Siswa dan 100,0 pada Role Admin.", "dengan rincian 62,93 pada Role Siswa dan 92,5 pada Role Admin.")
content = content.replace("rata-rata skor keseluruhan sebesar 68,35,", "rata-rata skor keseluruhan sebesar 67,26,")

# Oh wait! We also need to renumber tables again!
# The new block adds Tabel 4.17.
# So "Tabel 4.17 Ulasan Positif Responden terhadap Sistem" must become 4.18
# And "Tabel 4.18 Feedback Responden Siswa" must become 4.19
# And "Tabel 4.19 Rekapitulasi Hasil Pengujian SUS" must become 4.20
# And 4.20 -> 4.21, 4.21 -> 4.22, 4.22 -> 4.23, 4.23 -> 4.24

with open('docs/skripsi/bab4.md', 'w', encoding='utf-8') as f:
    f.write(content)

