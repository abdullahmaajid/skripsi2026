#!/bin/bash

# Pastikan pindah ke direktori script ini berada
cd "$(dirname "$0")"

echo "========================================================="
echo "🚀 Memulai Automasi OWASP ZAP Security Audit (Tanpa Docker)"
echo "========================================================="
echo ""
echo "INFO: Pastikan aplikasi OWASP ZAP sudah terinstall di Mac kamu."
echo "Default path yang dicek: /Applications/ZAP.app/Contents/Java/zap.sh"
echo ""

# Mencari lokasi zap.sh di Mac
ZAP_PATH="/Applications/ZAP.app/Contents/Java/zap.sh"
ZAP_PATH_BREW="/Applications/OWASP ZAP.app/Contents/Java/zap.sh"

if [ ! -f "$ZAP_PATH" ]; then
    if [ -f "$ZAP_PATH_BREW" ]; then
        ZAP_PATH="$ZAP_PATH_BREW"
    elif command -v zap.sh >/dev/null 2>&1; then
        ZAP_PATH="zap.sh"
    else
        echo "❌ ERROR: File zap.sh tidak ditemukan!"
        echo "Pastikan kamu sudah menginstall OWASP ZAP (misalnya download dari website resminya atau lewat 'brew install --cask owasp-zap')."
        echo "Jika sudah diinstall di lokasi lain, tolong edit variabel ZAP_PATH di dalam file ini."
        exit 1
    fi
fi

# Mendapatkan absolute path dari direktori saat ini
WORK_DIR=$(pwd)

echo "✅ Menjalankan ZAP Scan untuk ADMIN..."

# Menjalankan ZAP untuk Admin menggunakan instalasi lokal
# -cmd : Menjalankan ZAP tanpa GUI (headless)
# -autorun : Menjalankan Automation Framework YAML
"$ZAP_PATH" -cmd -autorun "$WORK_DIR/zap-admin-scan.yaml"

echo "✅ Scan Admin Selesai. Laporan disimpan di folder zap/reports."
echo "---------------------------------------------------------"

echo "⏳ Menunggu 5 detik sebelum memulai scan Siswa..."
sleep 5

echo "✅ Menjalankan ZAP Scan untuk SISWA..."

# Menjalankan ZAP untuk Siswa
"$ZAP_PATH" -cmd -autorun "$WORK_DIR/zap-student-scan.yaml"

echo "✅ Scan Siswa Selesai. Laporan disimpan di folder zap/reports."
echo "========================================================="
echo "🎉 Semua test selesai! Buka folder zap/reports untuk melihat hasilnya."
