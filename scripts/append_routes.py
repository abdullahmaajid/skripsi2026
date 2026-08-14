import re

file_path = '/Users/abdullahmaajid/Downloads/polariusmain/projects/utbkapp/docs/skripsi/bab4.md'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

route_map = {
    "Landing Page": "/",
    "Halaman Login": "/auth/login",
    "Halaman Daftar": "/auth/register",
    "Halaman Lupa Password": "Modal / Fitur Eksternal",
    "Email Reset Password": "Notifikasi Email",
    "Halaman Reset Password": "Modal / Tautan Dinamis",
    "Dashboard Admin": "/admin",
    "Kelola Mata Pelajaran": "/admin/tryouts (Tab/Modul Mapel)",
    "Kelola Materi": "/admin/tryouts (Tab/Modul Materi)",
    "Kelola Bank Soal": "/admin/questions",
    "Tambah Soal Massal": "/admin/scraper",
    "Edit Soal": "/admin/questions (Modal/Dialog)",
    "Monitoring Aktivitas Siswa": "/admin/stats",
    "Kelola Data Pengguna": "/admin/users",
    "OnBoarding Siswa": "/onboarding",
    "Dashboard Siswa": "/dashboard",
    "Halaman Mode Belajar": "/practice",
    "Detail Topik Mode Belajar": "/practice/[subjectId]",
    "Pengerjaan Soal Mode Belajar": "/tutor/[[...attemptId]]",
    "Pembahasan Bantuan Bertahap": "/tutor/[[...attemptId]]",
    "Pembahasan Salah dan Evaluasi": "/tutor/[[...attemptId]]",
    "Ringkasan Evaluasi Belajar": "/analytics/evaluation",
    "Halaman Analytics": "/analytics",
    "Peluang Lolos": "/analytics/chancing",
    "Detail Rekomendasi Jurusan": "/analytics/chancing/[majorId]",
    "Rute Belajar": "/learning-path",
    "Daftar Tryout": "/tryout/list",
    "Persiapan Tryout": "/tryout/list (Modal Persiapan)",
    "Mode Tryout": "/tryout/[id]",
    "Ringkasan Mode Tryout": "/tryout/[id] (Modal Selesai)",
    "Halaman Peringatan": "/tryout/[id] (Peringatan Sistem)",
    "Detail Pembahasan Mode Tryout": "/tryout/[id]/review",
    "Halaman Tampilan Soal dan Jawaban Siswa": "/tutor/[[...attemptId]]",
    "Modal Pilih Opsi Bantuan": "/tutor/[[...attemptId]] (Drawer/Modal)",
    "Umpan Balik Bertahap AI Tutor": "/tutor/[[...attemptId]]",
    "Tampilan Chancing Engine": "/analytics/chancing",
    "Rekomendasi Strategi Belajar": "/learning-path"
}

new_lines = []
for line in lines:
    if "*(Placeholder: Masukkan Gambar" in line:
        # Find which key matches
        matched = False
        for key, route in route_map.items():
            if key.lower() in line.lower():
                # Append route
                # Replace the trailing ")*" with " | Route: " + route + ")*"
                # Check if it already has route
                if "| Route" not in line:
                    line = line.replace(")*", f" | Route URL: `{route}`)*")
                matched = True
                break
        if not matched:
            # Fallback if not specifically mapped
            line = line.replace(")*", " | Route URL: `Dinamis/Modal`)*")
    new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Done appending routes to placeholders in bab4.md")
