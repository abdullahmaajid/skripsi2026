import sys

def main():
    with open('docs/skripsi/bab3.md', 'r') as f:
        lines = f.readlines()
        
    start_idx = -1
    end_idx = -1
    
    for i, line in enumerate(lines):
        if line.startswith('**b. Fungsionalitas Admin**'):
            admin_start_idx = i
        if line.startswith('### 3.3.2 Activity Diagram'):
            start_idx = i
        elif line.startswith('### 3.3.3 Perancangan Basis Data'):
            end_idx = i
            break
            
    if start_idx == -1 or end_idx == -1:
        print("Could not find sections.")
        return

    # Create new Use Case Admin
    use_case_admin = """**b. Fungsionalitas Admin**
Setelah berhasil *login*, Admin memiliki hak akses penuh untuk melakukan pengelolaan (*Create, Read, Update, Delete* / CRUD) terhadap entitas sistem, meliputi:
- Kelola Pengguna (Tambah, Lihat, Perbarui, Hapus).
- Kelola Daftar Soal (Tambah, Lihat, Perbarui, Hapus).
- Kelola Daftar Bab (Tambah, Lihat, Perbarui, Hapus).
- Kelola Mata Pelajaran (Tambah, Lihat, Perbarui, Hapus).
- Kelola Paket Tryout (Tambah, Lihat, Perbarui, Hapus).
- Kelola Subtes (Tambah, Lihat, Perbarui, Hapus).
- Pantau Ringkasan Platform, Analitik & Evaluasi Ujian, Target Siswa, serta Penggunaan Token AI.
- Kelola Daftar Universitas dan Program Studi (Tambah, Lihat, Perbarui, Hapus).
- Kelola Pengaturan dan Peraturan Sistem.
- Logout.

"""

    # Create new Activity Diagram
    activity_diagram = """### 3.3.2 Activity Diagram

Dokumen ini menjelaskan alur cerita bagaimana setiap pihak berinteraksi di dalam platform Lexica UTBK sehari-hari. Alur menggambarkan apa yang dilakukan oleh Siswa, bagaimana Sistem merespons, dan kapan AI Tutor ikut membantu siswa. Apabila terdapat percabangan alur, pilihan dijabarkan menggunakan format Opsi dan Konektor. Seluruh 55 alur diagram, terdiri atas 19 alur untuk Siswa dan 35 alur untuk Admin, dijabarkan sebagai berikut.
 
**1. Activity Diagram Siswa dan Admin**
a. Login
b. Register

**2. Activity Diagram Admin**
a. Tambah Pengguna
b. Memperbarui Pengguna
c. Melihat Pengguna
d. Menghapus Pengguna
e. Tambah Daftar Soal
f. Memperbarui Daftar Soal
g. Melihat Daftar Soal
h. Menghapus Daftar Soal
i. Tambah Daftar Bab
j. Memperbarui Daftar Bab
k. Melihat Daftar Bab
l. Menghapus Daftar Bab
m. Tambah Mata Pelajaran
n. Memperbarui Mata Pelajaran
o. Melihat Mata Pelajaran
p. Menghapus Mata Pelajaran
q. Tambah Paket Tryout
r. Memperbarui Paket Tryout
s. Melihat Paket Tryout
t. Menghapus Paket Tryout
u. Tambah Subtes
v. Memperbarui Subtes
w. Menghapus Subtes
x. Menampilkan Tab Ringkasan Platform
y. Melihat Ringkasan Platform
z. Melihat Evaluasi Ujian
aa. Melihat Target & Siswa
bb. Melihat Token & AI
cc. Menampilkan Tab Daftar Universitas
dd. Melihat Daftar Program Studi
ee. Tambah Program Studi
ff. Memperbarui Program Studi
gg. Menghapus Program Studi
hh. Melihat Daftar Universitas
ii. Tambah Data Universitas
jj. Memperbarui Data Universitas
kk. Menghapus Data Universitas
ll. Melihat Pengaturan Sistem
mm. Memperbarui Peraturan Sistem

"""

    new_lines = lines[:admin_start_idx] + [use_case_admin] + [activity_diagram] + lines[end_idx:]
    
    with open('docs/skripsi/bab3.md', 'w') as f:
        f.writelines(new_lines)
        
    print("Done")

if __name__ == '__main__':
    main()
