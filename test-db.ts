import { prisma } from "./src/lib/prisma";

async function run() {
  const attempt = await prisma.examAttempt.findFirst({
    orderBy: { startedAt: "desc" }
  });
  console.log("Latest attempt:", attempt);
  
  if (attempt) {
    const responses = await prisma.questionResponse.findMany({
      where: { attemptId: attempt.id }
    });
    console.log(`Found ${responses.length} responses for this attempt.`);
    
    let correctCount = 0;
    for (const r of responses) {
      if (r.isCorrect) correctCount++;
    }
    console.log(`Correct: ${correctCount}`);
  }
}
run();
