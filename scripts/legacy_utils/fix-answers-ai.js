const { Pool } = require('pg');
require('dotenv').config();

const API_KEY = process.env.OPENROUTER_API_KEY;
if (!API_KEY) {
  console.error("Missing OPENROUTER_API_KEY in .env");
  process.exit(1);
}

// OpenRouter usually has higher limits, but we still batch to avoid huge payloads
const BATCH_SIZE = 50;

const pool = new Pool({
  connectionString: 'postgresql://abdullahmaajid@localhost:5432/skripsiutbk?schema=public'
});

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log("Fetching questions to re-evaluate...");
  
  const query = `
    SELECT q.id as q_id, q.text, qo.id as opt_id, qo.label, qo.text as opt_text, qo."isCorrect"
    FROM "Question" q
    JOIN "QuestionOption" qo ON q.id = qo."questionId"
    WHERE q.id IN (
        SELECT q2.id
        FROM "Question" q2
        JOIN "QuestionOption" qo2 ON q2.id = qo2."questionId" AND qo2."isCorrect" = true
        GROUP BY q2.id
        HAVING COUNT(qo2.id) = 1 AND MAX(qo2.label) = 'A'
    )
    ORDER BY q.id, qo.label
  `;
  
  const { rows } = await pool.query(query);
  
  const questions = {};
  for (const r of rows) {
    const qid = r.q_id;
    if (!questions[qid]) {
      questions[qid] = { id: qid, text: r.text, options: [] };
    }
    questions[qid].options.push({
      id: r.opt_id,
      label: r.label,
      text: r.opt_text,
      isCorrect: r.isCorrect
    });
  }
  
  const qList = Object.values(questions);
  console.log(`Found ${qList.length} questions to review.`);
  
  let fixed = 0;
  
  for (let i = 0; i < qList.length; i += BATCH_SIZE) {
    const batch = qList.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${Math.floor(i/BATCH_SIZE) + 1} of ${Math.ceil(qList.length/BATCH_SIZE)}...`);
    
    let prompt = `You are an expert UTBK SNBT tutor. Below is a JSON array of questions. For each question, determine the correct option label (A, B, C, D, or E).
You must respond with ONLY a raw valid JSON array, strictly in this format: [{"id": "...", "answer": "A"}]. 
Do NOT include markdown formatting, backticks, or any other text before or after the JSON array.

Questions:
`;
    
    const cleanBatch = batch.map(q => ({
      id: q.id,
      text: q.text,
      options: q.options.map(o => ({ label: o.label, text: o.text }))
    }));
    
    prompt += JSON.stringify(cleanBatch);
    
    let success = false;
    let retries = 0;
    
    while (!success && retries < 5) {
      let resp;
      try {
        resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: 'POST',
          headers: { 
            "Authorization": `Bearer ${API_KEY}`, 
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "UTBK App Skripsi"
          },
          body: JSON.stringify({
            model: "google/gemini-2.0-flash-lite-preview-02-05:free", // A very fast and capable free model on OpenRouter
            messages: [{ role: "user", content: prompt }],
            temperature: 0.1
          })
        });
      } catch (err) {
        console.log(`Network error: ${err.message}. Retrying in 5s...`);
        await sleep(5000);
        retries++;
        continue;
      }
      
      if (resp.status === 429) {
        console.log(`Rate limit reached. Waiting 10 seconds before retry...`);
        await sleep(10000);
        retries++;
        continue;
      }
      
      if (!resp.ok) {
        console.log("API Error:", resp.status, await resp.text());
        break; 
      }
      
      try {
        const data = await resp.json();
        let content = data.choices[0].message.content.trim();
        if (content.startsWith('```json')) {
          content = content.replace(/```json/g, '').replace(/```/g, '').trim();
        }
        if (content.startsWith('```')) {
          content = content.replace(/```/g, '').trim();
        }
        
        const results = JSON.parse(content);
        if (!Array.isArray(results)) throw new Error("Result is not an array");

        for (const res of results) {
          if (['B', 'C', 'D', 'E'].includes(res.answer)) {
            const q = questions[res.id];
            if (q) {
              const oldOpt = q.options.find(o => o.label === 'A');
              const newOpt = q.options.find(o => o.label === res.answer);
              if (oldOpt && newOpt) {
                await pool.query('UPDATE "QuestionOption" SET "isCorrect" = false WHERE id = $1', [oldOpt.id]);
                await pool.query('UPDATE "QuestionOption" SET "isCorrect" = true WHERE id = $1', [newOpt.id]);
                fixed++;
              }
            }
          }
        }
        success = true;
      } catch (e) {
        console.log("Failed to parse batch:", e.message);
        retries++;
        await sleep(2000);
      }
    }
    
    if (success) {
      console.log(`Batch ${Math.floor(i/BATCH_SIZE) + 1} completed successfully.`);
      await sleep(2000); // Small cooldown between batches
    } else {
      console.log(`Batch ${Math.floor(i/BATCH_SIZE) + 1} skipped after max retries.`);
    }
  }
  
  console.log(`✅ AI review complete! Re-assigned ${fixed} questions to their true correct answers instead of defaulting to A.`);
  pool.end();
}

run().catch(e => { console.error(e); process.exit(1); });
