import re

with open('/Users/abdullahmaajid/Downloads/polariusmain/projects/utbkapp/docs/skripsi/bab4.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the new content chunks
new_demographics = """**Tabel 4.15 Karakteristik Responden Pengujian SUS (Siswa)**
| No | Usia | Jumlah Responden | Persentase |
|---|---|---|---|
| 1 | Tidak Mengisi | 4 | 11,4% |
| 2 | 16 Tahun | 4 | 11,4% |
| 3 | 17 Tahun | 19 | 54,3% |
| 4 | 18 Tahun | 6 | 17,2% |
| 5 | 20 Tahun | 2 | 5,7% |
| **Total** | | **35** | **100%** |"""

# Replacing the whole Siswa SUS block
new_siswa_sus = """**Tabel 4.16 Hasil Pengolahan Data SUS Siswa**
| No | Responden | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Skor Konversi | Skor SUS |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | R1 | 4 | 1 | 3 | 2 | 3 | 2 | 4 | 2 | 5 | 3 | 29 | 72.5 |
| 2 | R2 | 4 | 2 | 3 | 4 | 4 | 2 | 3 | 2 | 4 | 1 | 27 | 67.5 |
| 3 | R3 | 3 | 2 | 3 | 2 | 5 | 3 | 5 | 3 | 5 | 4 | 27 | 67.5 |
| 4 | R4 | 5 | 3 | 5 | 5 | 4 | 2 | 3 | 2 | 4 | 4 | 25 | 62.5 |
| 5 | R5 | 3 | 5 | 5 | 4 | 4 | 3 | 5 | 3 | 5 | 4 | 23 | 57.5 |
| 6 | R6 | 4 | 3 | 4 | 3 | 3 | 2 | 4 | 1 | 3 | 2 | 27 | 67.5 |
| 7 | R7 | 1 | 3 | 5 | 2 | 1 | 2 | 4 | 3 | 3 | 1 | 23 | 57.5 |
| 8 | R8 | 4 | 4 | 4 | 3 | 3 | 2 | 3 | 1 | 3 | 1 | 26 | 65.0 |
| 9 | R9 | 4 | 3 | 4 | 3 | 5 | 1 | 4 | 2 | 3 | 3 | 28 | 70.0 |
| 10 | R10 | 5 | 2 | 4 | 3 | 4 | 2 | 3 | 2 | 4 | 3 | 28 | 70.0 |
| 11 | R11 | 3 | 2 | 2 | 1 | 2 | 2 | 5 | 5 | 3 | 1 | 24 | 60.0 |
| 12 | R12 | 4 | 2 | 5 | 3 | 4 | 3 | 5 | 2 | 4 | 4 | 28 | 70.0 |
| 13 | R13 | 4 | 2 | 2 | 2 | 5 | 2 | 4 | 1 | 4 | 3 | 29 | 72.5 |
| 14 | R14 | 4 | 2 | 4 | 2 | 5 | 1 | 1 | 2 | 3 | 3 | 27 | 67.5 |
| 15 | R15 | 4 | 3 | 4 | 1 | 2 | 2 | 5 | 3 | 3 | 2 | 27 | 67.5 |
| 16 | R16 | 3 | 2 | 2 | 4 | 4 | 2 | 3 | 2 | 3 | 3 | 22 | 55.0 |
| 17 | R17 | 4 | 2 | 3 | 2 | 3 | 4 | 2 | 1 | 3 | 4 | 22 | 55.0 |
| 18 | R18 | 4 | 3 | 5 | 3 | 3 | 2 | 4 | 2 | 4 | 2 | 28 | 70.0 |
| 19 | R19 | 4 | 2 | 3 | 3 | 4 | 3 | 4 | 1 | 4 | 3 | 27 | 67.5 |
| 20 | R20 | 4 | 3 | 4 | 2 | 3 | 2 | 5 | 1 | 4 | 5 | 27 | 67.5 |
| 21 | R21 | 4 | 3 | 4 | 2 | 4 | 2 | 4 | 1 | 5 | 3 | 30 | 75.0 |
| 22 | R22 | 2 | 2 | 3 | 3 | 3 | 2 | 5 | 4 | 3 | 5 | 20 | 50.0 |
| 23 | R23 | 3 | 2 | 4 | 3 | 4 | 3 | 4 | 2 | 5 | 4 | 26 | 65.0 |
| 24 | R24 | 3 | 2 | 4 | 1 | 3 | 3 | 4 | 2 | 4 | 5 | 25 | 62.5 |
| 25 | R25 | 4 | 2 | 1 | 3 | 3 | 3 | 4 | 2 | 3 | 5 | 20 | 50.0 |
| 26 | R26 | 3 | 2 | 4 | 2 | 4 | 4 | 4 | 2 | 4 | 2 | 27 | 67.5 |
| 27 | R27 | 4 | 3 | 4 | 2 | 4 | 4 | 5 | 1 | 4 | 2 | 29 | 72.5 |
| 28 | R28 | 3 | 2 | 4 | 3 | 4 | 2 | 4 | 2 | 3 | 4 | 25 | 62.5 |
| 29 | R29 | 4 | 3 | 3 | 2 | 4 | 3 | 4 | 1 | 3 | 3 | 26 | 65.0 |
| 30 | R30 | 4 | 3 | 4 | 3 | 1 | 3 | 4 | 4 | 3 | 4 | 19 | 47.5 |
| 31 | R31 | 2 | 2 | 4 | 2 | 4 | 2 | 1 | 2 | 3 | 3 | 23 | 57.5 |
| 32 | R32 | 2 | 3 | 3 | 2 | 4 | 3 | 1 | 2 | 4 | 5 | 19 | 47.5 |
| 33 | R33 | 4 | 2 | 4 | 5 | 4 | 2 | 3 | 2 | 3 | 3 | 24 | 60.0 |
| 34 | R34 | 4 | 3 | 4 | 3 | 4 | 5 | 4 | 2 | 2 | 5 | 20 | 50.0 |
| 35 | R35 | 4 | 3 | 4 | 4 | 4 | 3 | 4 | 3 | 4 | 3 | 24 | 60.0 |
| **Rata-Rata Keseluruhan (35 Responden)** | | | | | | | | | | | | | **62,93** |

Berdasarkan hasil perhitungan pada Tabel 4.16, diperoleh rata-rata skor SUS sebesar 62,93. Berdasarkan *Adjective Rating* menurut Bangor et al. (2008), nilai tersebut termasuk kategori **OK / Good**, yang menunjukkan bahwa platform telah memiliki tingkat *usability* yang cukup baik dan dapat digunakan oleh siswa, meskipun masih terdapat beberapa aspek antarmuka dan pengalaman pengguna yang dapat dikembangkan.

Sebagian besar responden memberikan penilaian pada rentang skor 55–75, yang menunjukkan bahwa sistem telah dapat digunakan dengan baik. Namun, terdapat beberapa responden yang memberikan skor relatif rendah sehingga memengaruhi nilai rata-rata keseluruhan.

Selain penilaian kuantitatif berupa skor SUS, kuesioner juga mengumpulkan evaluasi kualitatif berupa ulasan positif dan saran perbaikan dari responden. Ringkasan ulasan positif dapat dilihat pada Tabel 4.17, sedangkan saran perbaikan dirangkum pada Tabel 4.18.

**Tabel 4.17 Ulasan Positif Responden terhadap Sistem**
| No | Kategori | Ringkasan Ulasan Positif |
|---|---|---|
| 1 | AI Tutor & Penilaian | Kehadiran AI Tutor sangat membantu memberikan penjelasan detail secara *real-time* (bukan hanya jawaban instan) serta sistem penilaian probabilitas kelulusan yang dinilai akurat dan mirip aplikasi bimbingan belajar profesional. |
| 2 | Tampilan & Antarmuka | Tampilan UI yang menarik, elegan, sederhana, serta animasi responsif (tidak *delay*) membuat pengalaman pengguna menjadi lebih nyaman. |
| 3 | Fitur Latihan UTBK | Fitur latihan dan Tryout dinilai sangat bermanfaat untuk mengasah kemampuan diri dengan adanya statistik jawaban benar/salah, pembahasan soal, dan kesempatan menjawab ulang. |
| 4 | Kemudahan Penggunaan | Sistem sangat mudah digunakan dan *user-friendly*, tidak membingungkan bahkan bagi pengguna di kalangan usia senior (Admin/Tutor) dalam membantu mempercepat proses rekapitulasi data harian. |

**Tabel 4.18 Feedback Responden Siswa**
| No | Kategori | Ringkasan Feedback |
|---|---|---|
| 1 | Fitur Navigasi Soal | Menginginkan fitur yang memudahkan kembali ke nomor awal atau soal yang belum dijawab dengan lebih mudah dan fungsi pengiriman jawaban (submit) diperbaiki. |
| 2 | Materi dan Bank Soal | Menambahkan fitur penjelasan letak spesifik jawaban benar/salah, lebih banyak latihan soal, dan penjelasan/tata bahasa di *hint* lebih diperbaiki. |
| 3 | Pilihan Fakultas / Jurusan | Mengelompokkan pilihan jurusan berdasarkan letak universitas atau memperbanyak database rekomendasi prodi yang dapat dipilih di Chancing Engine. |
| 4 | Stabilitas Aplikasi (Bugs) | Memperbaiki masalah elemen UI yang terkadang tidak dapat diklik atau mengharuskan pengisian ulang dari awal, serta meminimalisir *bugs*. |
| 5 | Petunjuk Penggunaan (Onboarding) | Menambahkan tangkapan layar (screenshot) atau demo singkat, membuat laman FAQ untuk menjelaskan prediksi IRT hanyalah estimasi, dan membuat halaman bantuan/kontak. |

Berdasarkan *feedback* tersebut, dapat disimpulkan bahwa sebagian besar responden memberikan tanggapan positif terhadap UI aplikasi, *Real-time Socratic AI Tutor*, serta sistem penilaian skor yang realistis. Saran yang diberikan berfokus pada penyelesaian bug teknis minor, penambahan basis data materi dan soal, serta pembenahan panduan pengguna (FAQ/Demo)."""

new_admin_sus = """**Tabel 4.19 Hasil Pengolahan Data SUS Admin**
| No | Responden | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Skor Konversi | Skor SUS |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | R1 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 40 | 100.0 |
| 2 | R2 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 40 | 100.0 |
| 3 | R3 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 40 | 100.0 |
| 4 | R4 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 40 | 100.0 |
| 5 | R5 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 40 | 100.0 |
| 6 | R6 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 40 | 100.0 |
| **Rata-Rata Keseluruhan (6 Responden)** | | | | | | | | | | | | | **100,0** |

Berdasarkan hasil perhitungan pada Tabel 4.19, diperoleh rata-rata skor SUS sebesar 100,0. Berdasarkan *Adjective Rating* menurut Bangor et al. (2008), nilai tersebut termasuk kategori **Best Imaginable** (karena bernilai lebih dari 85), yang menunjukkan bahwa sistem sangat mudah dan intuitif digunakan oleh pengguna dengan hak akses Admin. Hal ini didukung oleh evaluasi kualitatif dari responden (tutor/bapak-bapak) yang menyatakan bahwa aplikasi ini mempercepat pengerjaan rekapitulasi data, tidak membingungkan, dan sangat membantu pekerjaan operasional harian mereka.

**c. Rekapitulasi Hasil Pengujian SUS**

**Tabel 4.20 Rekapitulasi Hasil Pengujian SUS**
| No | Role | Jumlah Responden | Rata-Rata SUS | Adjective Rating |
|---|---|---|---|---|
| 1 | Siswa | 35 | 62,93 | OK |
| 2 | Admin | 6 | 100,0 | Best Imaginable |

Berdasarkan rekapitulasi hasil pengujian SUS pada Tabel 4.20, Role Admin memperoleh rata-rata skor SUS sebesar 100,0, sedangkan Role Siswa memperoleh rata-rata sebesar 62,93. Perbedaan ini menunjukkan antarmuka fungsionalitas manajemen (*dashboard admin*) dirancang sangat efektif, minim beban kognitif ekstra, serta berhasil memenuhi kebutuhan penggunanya. Secara keseluruhan, platform telah memenuhi aspek *usability* dengan cukup baik pada kedua *Role*.

**d. Kesimpulan Pengujian SUS**
Berdasarkan hasil pengujian SUS yang melibatkan total 41 responden (35 Siswa dan 6 Admin), platform *Tryout* UTBK SNBT berbasis ITS memperoleh rata-rata skor keseluruhan sebesar 68,35, dengan rincian 62,93 pada Role Siswa dan 100,0 pada Role Admin. Hasil ini membuktikan sistem memiliki tingkat *usability* yang mumpuni. Fitur AI Tutor, *Chancing Engine*, dan *Learning Analytics* dinilai sangat interaktif dan representatif oleh responden, sedangkan beberapa kendala teknis (bug navigasi) menjadi fokus penyempurnaan utama untuk pengembangan berikutnya."""

# Let's replace Tabel 4.15
content = re.sub(
    r'\*\*Tabel 4\.15 Karakteristik Responden Pengujian SUS \(Siswa\)\*\*.*?\*\*Total\*\* \| \| \*\*35\*\* \| \*\*100%\*\* \|',
    new_demographics,
    content,
    flags=re.DOTALL
)

# Let's replace Tabel 4.16 - 4.18
content = re.sub(
    r'\*\*Tabel 4\.16 Hasil Pengolahan Data SUS Siswa\*\*.*?(?=\*\*b\. Pengujian SUS Role Admin\*\*)',
    new_siswa_sus + '\n\n',
    content,
    flags=re.DOTALL
)

# Let's replace Tabel 4.19 - end of d. Kesimpulan
content = re.sub(
    r'\*\*Tabel 4\.19 Hasil Pengolahan Data SUS Admin\*\*.*?(?=### 4\.4\.3 Penetration Testing menggunakan OWASP ZAP)',
    new_admin_sus + '\n\n',
    content,
    flags=re.DOTALL
)

with open('/Users/abdullahmaajid/Downloads/polariusmain/projects/utbkapp/docs/skripsi/bab4.md', 'w', encoding='utf-8') as f:
    f.write(content)

