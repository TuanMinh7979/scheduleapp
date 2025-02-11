import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
type EventData = {
  name: string;
  start: Date;
  end: Date;
  classId: number;
  subjectAndTeacherId: number;
  mode: string;
};
async function main() {
  // Seed Admins
  await prisma.admin.createMany({
    data: [
      { username: 'admin1' },
      { username: 'admin2' },
    ],
  });

  // Seed Classes
  await prisma.class.createMany({
    data: [
      { name: 'Class 1' },
      { name: 'Class 2' },
    ],
  });

  // Seed Subjects
  await prisma.subject.createMany({
    data: [
      { name: 'Math', total: 10 },
      { name: 'Physics', total: 15 },
    ],
  });

  // Seed Teachers
  await prisma.teacher.createMany({
    data: [
      { name: 'John Doe', sex: 'MALE' },
      { name: 'Jane Smith', sex: 'FEMALE' },
    ],
  });

  // Seed SubjectAndTeacher
  await prisma.subjectAndTeacher.createMany({
    data: [
      { subjectId: 1, teacherId: 1 },
      { subjectId: 2, teacherId: 2 },
    ],
  });

  // Seed Events
  const eventData: EventData[] = [
    {
      name: 'Math Class Event',
      start: new Date('2025-02-09T07:00:00.000Z'),
      end: new Date('2025-02-09T11:00:00.000Z'),
      classId: 1,
      subjectAndTeacherId: 1,
      mode: 'online',
    },
    {
      name: 'Physics Class Event',
      start: new Date('2025-02-09T12:00:00.000Z'),
      end: new Date('2025-02-09T16:00:00.000Z'),
      classId: 2,
      subjectAndTeacherId: 2,
      mode: 'offline',
    },
  ];

  await prisma.event.createMany({
    data: eventData,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });