const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GoogleAIFileManager } = require('@google/generative-ai/server');
const fs = require('fs');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

async function testFileAPI() {
  try {
    fs.writeFileSync('dummy.txt', 'Hello world, this is a test file.');
    console.log("Uploading file...");
    const uploadResult = await fileManager.uploadFile('dummy.txt', {
        mimeType: 'text/plain',
        displayName: 'dummy.txt',
    });
    console.log("Upload OK:", uploadResult.file.uri);

    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });
    const result = await model.generateContent([
        "What does this file say?",
        {
            fileData: {
                mimeType: uploadResult.file.mimeType,
                fileUri: uploadResult.file.uri
            }
        }
    ]);
    console.log(`✅ Success with File API:`, result.response.text());
  } catch (e) {
    console.error(`❌ Error with File API:`, e.message);
  }
}

testFileAPI();
