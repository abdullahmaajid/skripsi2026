import { prisma } from './src/lib/prisma';

async function main() {
  const allQuestions = await prisma.question.findMany({
    include: {
      options: true,
    },
  });

  const toDeleteIds: string[] = [];

  for (const q of allQuestions) {
    let shouldDelete = false;

    // 1. Multiple choice but > 1 correct option
    if (q.type === 'MULTIPLE_CHOICE') {
      const correctOptions = q.options.filter(o => o.isCorrect);
      if (correctOptions.length > 1) {
        shouldDelete = true;
      }
    }

    // 2. Options with no text and no image
    if (q.options.some(o => !o.text && !o.imageUrl)) {
      shouldDelete = true;
    }

    if (shouldDelete) {
      toDeleteIds.push(q.id);
    }
  }

  if (toDeleteIds.length > 0) {
    const res = await prisma.question.deleteMany({
      where: {
        id: {
          in: toDeleteIds,
        },
      },
    });
    console.log(`Deleted ${res.count} broken questions.`);
  } else {
    console.log('No broken questions found to delete.');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    if (prisma) await prisma.$disconnect();
  });
