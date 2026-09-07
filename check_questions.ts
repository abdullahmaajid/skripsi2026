import { prisma } from './src/lib/prisma';

async function main() {
  const allQuestions = await prisma.question.findMany({
    include: {
      options: true,
    },
  });

  let noOptions = 0;
  let noCorrectOption = 0;
  let multipleCorrectOptions = 0;
  let emptyTextNoImage = 0;

  for (const q of allQuestions) {
    if (q.options.length === 0) {
      noOptions++;
    } else {
      const correctOptions = q.options.filter(o => o.isCorrect);
      if (correctOptions.length === 0) {
        noCorrectOption++;
      } else if (correctOptions.length > 1 && q.type === 'MULTIPLE_CHOICE') {
        multipleCorrectOptions++;
      }
    }

    if (!q.text && !q.imageUrl) {
      emptyTextNoImage++;
    }
  }

  console.log(`Total questions: ${allQuestions.length}`);
  console.log(`Questions with no options: ${noOptions}`);
  console.log(`Questions with no correct option: ${noCorrectOption}`);
  console.log(`Multiple choice questions with multiple correct options: ${multipleCorrectOptions}`);
  console.log(`Questions with empty text and no image: ${emptyTextNoImage}`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    if (prisma) await prisma.$disconnect();
  });
