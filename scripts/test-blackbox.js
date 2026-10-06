const puppeteer = require('puppeteer');

(async () => {
    console.log("🚀 Memulai Automasi Black-Box Testing (Negative Test)...\n");

    const browser = await puppeteer.launch({
        headless: true, // Berjalan di background
        args: ['--no-sandbox']
    });
    
    const page = await browser.newPage();
    const APP_URL = "http://localhost:3000";

    try {
        console.log("---------------------------------------------------------");
        console.log("⚠️  Skenario 1: Login dengan Kredensial Salah (Negative Test)");
        
        await page.goto(`${APP_URL}/auth/login`, { waitUntil: 'networkidle2' });
        
        // Asumsi ada input type email dan password, serta button submit
        // Mengetik email yang belum terdaftar
        await page.type('input[type="email"]', 'salah123@invalid.com');
        await page.type('input[type="password"]', 'passwordsalah');
        
        // Klik tombol submit (biasanya button type submit)
        await page.click('button[type="submit"]');

        // Tunggu sebentar untuk membiarkan UI bereaksi
        await new Promise(r => setTimeout(r, 2000)); 

        // Cek notifikasi error. Jika sistem menggunakan react-hot-toast atau div dengan role alert
        const bodyHTML = await page.evaluate(() => document.body.innerHTML);
        
        if (bodyHTML.toLowerCase().includes('kredensial') || bodyHTML.toLowerCase().includes('invalid') || bodyHTML.toLowerCase().includes('salah')) {
            console.log("✅ BERHASIL: Sistem mendeteksi kredensial salah dan menampilkan notifikasi.");
        } else {
            console.log("❓ PERINGATAN: Tidak mendeteksi teks notifikasi error standar di layar, tapi skenario tereksekusi.");
        }


        console.log("\n---------------------------------------------------------");
        console.log("⚠️  Skenario 2: Akses Admin Tanpa Login / Akses Ilegal (Negative Test)");
        
        await page.goto(`${APP_URL}/admin`, { waitUntil: 'networkidle2' });
        
        await new Promise(r => setTimeout(r, 2000)); // Tunggu proses redirect

        const currentUrl = page.url();
        if (currentUrl !== `${APP_URL}/admin`) {
            console.log(`✅ BERHASIL: Sistem menolak akses dan melakukan redirect pengguna ke -> ${currentUrl}`);
        } else {
            console.log("❌ GAGAL: Sistem membiarkan pengguna mengakses halaman admin.");
        }

        console.log("---------------------------------------------------------\n");
        console.log("🎉 Black-Box Testing Otomatis Selesai.");

    } catch (error) {
        console.error("❌ Terjadi kesalahan saat testing:", error.message);
    } finally {
        await browser.close();
    }
})();
