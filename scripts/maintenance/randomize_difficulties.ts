import 'dotenv/config'
import { prisma } from '../../src/lib/prisma'

// Standard normal distribution (Box-Muller transform)
function randomNormal(mean = 0, stdDev = 1) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return randomNormal(mean, stdDev); // resample between 0 and 1
  return (num - 0.5) * 10.0 * stdDev + mean; // Stretch and translate
}

async function main() {
  console.log("Mulai merandomisasi bobot (difficulty) soal...")
  
  const questions = await prisma.question.findMany({
    select: { id: true }
  })
  
  console.log(`Ditemukan ${questions.length} soal.`)
  
  let easy = 0
  let medium = 0
  let hard = 0

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i]
    // Generate IRT difficulty roughly between -3.0 and +3.0
    // We'll use a normal distribution centered at 0 with stdDev of 1.2
    let diff = randomNormal(0, 1.2)
    
    // Cap at -3.0 and +3.0
    diff = Math.max(-3.0, Math.min(3.0, diff))
    
    // Round to 2 decimal places
    diff = Math.round(diff * 100) / 100

    if (diff < -1.0) easy++
    else if (diff > 1.0) hard++
    else medium++

    await prisma.question.update({
      where: { id: q.id },
      data: { difficulty: diff }
    })

    if ((i + 1) % 500 === 0) {
      console.log(`Progress: ${i + 1} / ${questions.length} soal terupdate...`)
    }
  }

  console.log("\nSelesai merandomisasi bobot!")
  console.log(`Statistik Distribusi Soal:`)
  console.log(`- Gampang (b < -1.0): ${easy} soal`)
  console.log(`- Menengah (-1.0 <= b <= 1.0): ${medium} soal`)
  console.log(`- Susah (b > 1.0): ${hard} soal`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
