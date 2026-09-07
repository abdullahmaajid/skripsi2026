import { prisma } from "./src/lib/prisma";
import { estimateTheta } from "./src/lib/irt/scoring";

async function run() {
  const attempt = await prisma.examAttempt.findFirst({
    orderBy: { startedAt: "desc" }
  });
  
  if (attempt) {
    const responses = await prisma.questionResponse.findMany({
      where: { attemptId: attempt.id },
      include: { question: true }
    });
    
    const irtInputs = responses.map(r => ({
      difficulty: r.question.difficulty,
      correct: r.isCorrect
    }));
    
    console.log(JSON.stringify(irtInputs, null, 2));
    console.log("Calculated Theta:", estimateTheta(irtInputs));
  }
}
run();
