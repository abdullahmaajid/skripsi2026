import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("❌ [FATAL] GEMINI_API_KEY tidak ditemukan di .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);
const inputDir = path.join(process.cwd(), 'tools/pdf-parser/input');
const outputDir = path.join(process.cwd(), 'tools/pdf-parser/output');

// Helper function to delay execution
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper for retry logic
async function generateContentWithRetry(model: any, promptParams: any[], maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await model.generateContent(promptParams);
        } catch (error: any) {
            const isRateLimit = error.status === 429 || (error.message && error.message.includes("429"));
            const isQuotaExceeded = error.message && error.message.includes("Quota exceeded");
            
            if (isQuotaExceeded) {
                throw error;
            } else if (isRateLimit && attempt < maxRetries) {
                console.log(`\n   ⚠️ [RATE LIMIT TERDETEKSI] Google API menyuruh kita istirahat.`);
                console.log(`   ⏳ Menunggu 60 detik sebelum mencoba lagi (Percobaan ${attempt}/${maxRetries})...`);
                await sleep(60000); // Wait 60 seconds
                console.log(`   🔁 Melanjutkan percobaan ulang...`);
            } else {
                throw error; // Throw error if not rate limit or max retries reached
            }
        }
    }
}

async function processSinglePDF(filePath: string) {
    const filename = path.basename(filePath);
    console.log(`\n===============================================================`);
    console.log(`📄 [MULAI] Memproses Dokumen: ${filename}`);

    const existingPdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const totalPages = pdfDoc.getPageCount();
    
    const CHUNK_SIZE = 5; 
    let currentChunk = 1;
    let allExtractedQuestions: any[] = [];
    let successChunks = 0;
    let failedChunks = 0;
    
    console.log(`📊 Total Halaman: ${totalPages} | Dibagi per ${CHUNK_SIZE} halaman | Estimasi: ${Math.ceil(totalPages/CHUNK_SIZE)} Potongan`);

    for (let i = 0; i < totalPages; i += CHUNK_SIZE) {
        console.log(`\n   ----------------------------------------------------`);
        console.log(`   🔄 [PROSES] Membedah Bagian ${currentChunk} (Halaman ${i + 1} - ${Math.min(i + CHUNK_SIZE, totalPages)})`);
        
        // 1. Create Chunk
        const tempPdfDoc = await PDFDocument.create();
        const pagesToCopy = await tempPdfDoc.copyPages(
            pdfDoc, 
            Array.from({ length: Math.min(CHUNK_SIZE, totalPages - i) }, (_, idx) => i + idx)
        );
        pagesToCopy.forEach((page) => tempPdfDoc.addPage(page));
        
        const tempPdfBytes = await tempPdfDoc.save();
        const tempFilePath = path.join(inputDir, `temp_chunk_${currentChunk}_${Date.now()}.pdf`);
        fs.writeFileSync(tempFilePath, tempPdfBytes);
        
        let uploadResult;
        try {
            // 2. Upload
            process.stdout.write(`   📤 Mengunggah potongan ke server... `);
            uploadResult = await fileManager.uploadFile(tempFilePath, {
                mimeType: "application/pdf",
                displayName: `chunk_${currentChunk}_${filename}`,
            });
            console.log(`[OK]`);
            
            // 3. AI Extraction
            process.stdout.write(`   🧠 AI sedang mengekstrak JSON & LaTeX... `);
            const model = genAI.getGenerativeModel({
                model: "gemini-3.5-flash-lite",
                generationConfig: {
                    temperature: 0.1,
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: SchemaType.OBJECT,
                        properties: {
                            questions: {
                                type: SchemaType.ARRAY,
                                items: {
                                    type: SchemaType.OBJECT,
                                    properties: {
                                        text: { type: SchemaType.STRING },
                                        options: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                                        correctAnswer: { type: SchemaType.STRING, nullable: true },
                                        explanation: { type: SchemaType.STRING, nullable: true }
                                    },
                                    required: ["text", "options"]
                                }
                            }
                        },
                        required: ["questions"]
                    }
                }
            });

            const prompt = `Ekstrak semua soal ujian secara terstruktur. Aturan:\n1. Ubah rumus matematika ke LaTeX murni.\n2. Rapikan tabel/kolom yang menyatu.\n3. Buang teks tidak penting (header/watermark).\n4. Pisahkan 5 Opsi (A,B,C,D,E) tanpa huruf prefix-nya.`;

            const result = await generateContentWithRetry(model, [
                { fileData: { mimeType: "application/pdf", fileUri: uploadResult.file.uri } },
                { text: prompt }
            ]);

            console.log(`[SELESAI]`);
            
            const rawText = result.response?.text();
            if (!rawText) throw new Error("Respons AI kosong.");

            const parsedData = JSON.parse(rawText);
            
            if (parsedData.questions && Array.isArray(parsedData.questions)) {
                allExtractedQuestions.push(...parsedData.questions);
                successChunks++;
                console.log(`   ✅ Ditemukan: ${parsedData.questions.length} soal di bagian ini.`);
            } else {
                throw new Error("Format JSON tidak sesuai skema.");
            }

        } catch (err: any) {
            failedChunks++;
            console.error(`\n   ❌ [GAGAL] Terjadi kesalahan fatal di Bagian ${currentChunk}: ${err.message}`);
            
            if (err.message && err.message.includes("Quota exceeded")) {
                console.error(`\n🚨 [FATAL] Kuota Harian API Gemini Anda Habis!`);
                console.error(`🛑 Membatalkan seluruh antrean secara paksa agar tidak membuang waktu...`);
                // Cleanup before exit
                if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
                if (uploadResult) {
                    try { await fileManager.deleteFile(uploadResult.file.name); } 
                    catch (e) { /* ignore cleanup error */ }
                }
                process.exit(1);
            }
        } finally {
            // 4. Cleanup
            if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
            if (uploadResult) {
                try { await fileManager.deleteFile(uploadResult.file.name); } 
                catch (e) { /* ignore cleanup error */ }
            }
        }
        
        currentChunk++;
        
        // 5. Normal Delay
        if (i + CHUNK_SIZE < totalPages) {
            console.log(`   ⏸️ Jeda aman 8 detik sebelum bagian selanjutnya...`);
            await sleep(8000);
        }
    }

    // 6. Summary
    console.log(`\n   📈 [REKAPITULASI ${filename}]`);
    console.log(`   - Total Soal Didapat: ${allExtractedQuestions.length}`);
    console.log(`   - Rate Success Chunk: ${successChunks} Berhasil / ${failedChunks} Gagal`);
    
    if (allExtractedQuestions.length > 0) {
        const outputFilename = `${filename.replace('.pdf', '')}_complete.json`;
        const outputPath = path.join(outputDir, outputFilename);
        fs.writeFileSync(outputPath, JSON.stringify({ questions: allExtractedQuestions }, null, 2), 'utf-8');
        console.log(`   💾 Tersimpan di: ${outputPath}`);
    } else {
        console.log(`   ⚠️ Tidak ada JSON yang disimpan karena 0 soal terekstrak.`);
    }
}

async function main() {
    console.log(`🚀 [START] UTBK AI PDF PARSER V2.0\n`);
    
    if (!fs.existsSync(inputDir)) fs.mkdirSync(inputDir, { recursive: true });
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const files = fs.readdirSync(inputDir).filter(f => f.toLowerCase().endsWith('.pdf'));
    
    if (files.length === 0) {
        console.log(`ℹ️ Tidak ada file PDF ditemukan di folder: ${inputDir}`);
        console.log(`   Silakan masukkan file PDF soal UTBK Anda ke folder tersebut terlebih dahulu.`);
        process.exit(0);
    }

    console.log(`📂 Ditemukan ${files.length} file PDF dalam antrean.`);
    
    for (let i = 0; i < files.length; i++) {
        const filename = files[i];
        const outputFilename = `${filename.replace('.pdf', '')}_complete.json`;
        const outputPath = path.join(outputDir, outputFilename);
        
        if (fs.existsSync(outputPath)) {
            console.log(`⏭️  [SKIPPED] ${filename} sudah pernah diproses. Melanjutkan ke dokumen berikutnya...`);
            continue;
        }

        const filePath = path.join(inputDir, filename);
        await processSinglePDF(filePath);
        
        if (i < files.length - 1) {
            console.log(`\n⏳ Pindah ke dokumen PDF berikutnya dalam 10 detik...`);
            await sleep(10000);
        }
    }
    
    console.log(`\n🎉 [ALL CLEAR] Semua file PDF telah selesai diproses! Silakan periksa folder output/.`);
}

main();
