const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const API_KEY = process.env.GROQ_API_KEY;
const BATCH_SIZE = 40;

const pool = new Pool({
  connectionString: 'postgresql://abdullahmaajid@localhost:5432/skripsiutbk?schema=public'
});

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
    
    let prompt = "You are an expert UTBK SNBT tutor. Below is a JSON array of questions. For each question, determine the correct option label (A, B, C, D, or E).\nReturn ONLY a valid JSON array of objects with 'id' and 'answer' (e.g. [{\"id\": \"cuid1\", \"answer\": \"B\"}]). DO NOT return markdown or explanation.\n\nQuestions:\n";
    
    const cleanBatch = batch.map(q => ({
      id: q.id,
      text: q.text,
      options: q.options.map(o => ({ label: o.label, text: o.text }))
    }));
    
    prompt += JSON.stringify(cleanBatch);
    
    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: 'POST',
      headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.1
      })
    });
    
    if (!resp.ok) {
      console.log("API Error:", resp.status, await resp.text());
      continue;
    }
    
    try {
      const data = await resp.json();
      let content = data.choices[0].message.content.trim();
      if (content.startsWith('```json')) {
        content = content.replace(/```json/g, '').replace(/```/g, '').trim();
      }
      
      const results = JSON.parse(content);
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
    } catch (e) {
      console.log("Failed batch:", e.message);
    }
    
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log(`✅ AI review complete! Re-assigned ${fixed} questions to their true correct answers instead of defaulting to A.`);
  pool.end();
}

run().catch(e => { console.error(e); process.exit(1); });
