import { prisma } from './src/lib/prisma';

async function main() {
  const allQuestions = await prisma.question.findMany({
    include: {
      options: true,
    },
  });

  let emptyOptionsCount = 0;
  
  for (const q of allQuestions) {
    if (q.options.some(o => !o.text && !o.imageUrl)) {
      emptyOptionsCount++;
    }
  }

  console.log(`Questions with empty options (no text, no image): ${emptyOptionsCount}`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    if (prisma) await prisma.$disconnect();
  });
