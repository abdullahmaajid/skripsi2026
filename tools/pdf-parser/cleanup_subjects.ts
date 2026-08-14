import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const subjects = await prisma.subject.findMany({
    include: {
      chapters: {
        include: { _count: { select: { questions: true } } }
      }
    }
  });

  console.log(`Found ${subjects.length} subjects in total.`);
  let deletedCount = 0;

  // Find valid (new) subjects and old subjects
  const validSubjects = subjects.filter(s => s.name.includes('(') && s.name.includes(')'));
  const oldSubjects = subjects.filter(s => !s.name.includes('('));

  for (const oldS of oldSubjects) {
    // Find matching new subject
    const newS = validSubjects.find(v => v.name.toLowerCase().includes(oldS.name.toLowerCase()) || oldS.name.toLowerCase().includes(v.name.toLowerCase().split('(')[0].trim()));
    
    if (newS) {
      console.log(`Migrating sections from '${oldS.name}' to '${newS.name}'`);
      await prisma.examSection.updateMany({
        where: { subjectId: oldS.id },
        data: { subjectId: newS.id }
      });
      // also update Chapter? Wait, we deleted all old questions, but let's reassign chapters just in case
      await prisma.chapter.updateMany({
        where: { subjectId: oldS.id },
        data: { subjectId: newS.id }
      });
    }

    console.log(`Deleting old subject: ${oldS.name}`);
    try {
      await prisma.subject.delete({ where: { id: oldS.id } });
      deletedCount++;
    } catch (e) {
      console.error(`Failed to delete ${oldS.name}: ${e}`);
    }
  }

  console.log(`\n✅ Migrated and deleted ${deletedCount} old subjects.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
