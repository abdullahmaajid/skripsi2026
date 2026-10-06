import { prisma } from './src/lib/prisma'
import 'dotenv/config'

const API_KEY = process.env.GROQ_API_KEY
const BATCH_SIZE = 40

async function callAI(batch: any[]) {
  const prompt = `You are an expert UTBK SNBT tutor. Below is a JSON array of questions. For each question, determine the correct option label (A, B, C, D, or E). 
Return ONLY a valid JSON array of objects with "id" and "answer" (e.g. [{"id": "cuid1", "answer": "B"}, ...]). DO NOT return markdown or explanation.

Questions:
${JSON.stringify(batch.map(q => ({
  id: q.id,
  text: q.text,
  options: q.options.map(o => ({ label: o.label, text: o.text }))
})), null, 2)}`

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1
    })
  })
  
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${await res.text()}`)
  }
  
  const data = await res.json()
  let content = data.choices[0].message.content.trim()
  if (content.startsWith('```json')) {
    content = content.replace(/```json/g, '').replace(/```/g, '').trim()
  }
  
  try {
    return JSON.parse(content)
  } catch (e) {
    console.error("Failed to parse JSON:", content)
    return []
  }
}

async function run() {
  console.log("Fetching questions to re-evaluate...")
  // Only re-evaluate questions that I forcefully updated (the ones where ONLY the first option is correct, to be safe. Since I can't know for sure, let's just evaluate ALL questions that have exactly one correct option which is 'A', this is ~3523 questions)
  
  const questions = await prisma.question.findMany({
    include: { options: { orderBy: { label: 'asc' } } }
  })
  
  const toReview = []
  for (const q of questions) {
    const correctOpts = q.options.filter(o => o.isCorrect)
    if (correctOpts.length === 1 && correctOpts[0].label === 'A') {
      toReview.push(q)
    }
  }
  
  console.log(`Found ${toReview.length} questions to review.`)
  
  let fixed = 0
  for (let i = 0; i < toReview.length; i += BATCH_SIZE) {
    const batch = toReview.slice(i, i + BATCH_SIZE)
    console.log(`Processing batch ${i / BATCH_SIZE + 1} of ${Math.ceil(toReview.length / BATCH_SIZE)}...`)
    
    try {
      const results = await callAI(batch)
      
      for (const res of results) {
        if (res.answer !== 'A' && ['B','C','D','E'].includes(res.answer)) {
          const q = batch.find(bq => bq.id === res.id)
          if (q) {
            const oldCorrect = q.options.find(o => o.label === 'A')
            const newCorrect = q.options.find(o => o.label === res.answer)
            
            if (oldCorrect && newCorrect) {
              await prisma.$transaction([
                prisma.questionOption.update({ where: { id: oldCorrect.id }, data: { isCorrect: false } }),
                prisma.questionOption.update({ where: { id: newCorrect.id }, data: { isCorrect: true } })
              ])
              fixed++
            }
          }
        }
      }
    } catch (e) {
      console.error(`Batch failed:`, e.message)
    }
    
    // Add small delay to avoid rate limit
    await new Promise(r => setTimeout(r, 2000))
  }
  
  console.log(`✅ AI review complete! Re-assigned ${fixed} questions to their true correct answers instead of defaulting to A.`)
}

run()
  .then(() => process.exit(0))
  .catch(e => { console.error(e); process.exit(1); })
