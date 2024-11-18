import { PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
 // Tạo 3 bản ghi cho bảng DayPart
 await prisma.dayPart.createMany({
  data: [
    { name: 'morning' },
    { name: 'afternoon' },
    { name: 'evening' },
  ],
});

// Tạo 5 bản ghi cho bảng Admin
await prisma.admin.createMany({
  data: [
    { username: 'admin1' },
    { username: 'admin2' },
    { username: 'admin3' },
    { username: 'admin4' },
    { username: 'admin5' },
  ],
});

// Tạo 3 bản ghi cho bảng Teacher
await prisma.teacher.createMany({
  data: [
    { name: 'John Doe', sex: UserSex.MALE },
    { name: 'Jane Smith', sex: UserSex.FEMALE },
    { name: 'Alex Johnson', sex: UserSex.MALE },
  ],
});

// Tạo 3 bản ghi cho bảng Class
await prisma.class.createMany({
  data: [
    { name: 'Class A' },
    { name: 'Class B' },
    { name: 'Class C' },
  ],
});

// Tạo 3 bản ghi cho bảng Subject
await prisma.subject.createMany({
  data: [
    { name: 'Mathematics' },
    { name: 'History' },
    { name: 'Physics' },
  ],
});

// Tạo 3 bản ghi cho bảng SubjectAndTeacher
await prisma.subjectAndTeacher.createMany({
  data: [
    { subjectId: 1, teacherId: 1 },
    { subjectId: 2, teacherId: 2 },
    { subjectId: 3, teacherId: 3 },
  ],
});

// Tạo 3 bản ghi cho bảng Event
await prisma.event.createMany({
  data: [
    {
      name: 'Math Class Event',
      day: new Date(),
      classId: 1,
      subjectAndTeacherId: 1,
      dayPartId: 1, // morning
    },
    {
      name: 'History Class Event',
      day: new Date(),
      classId: 2,
      subjectAndTeacherId: 2,
      dayPartId: 2, // afternoon
    },
    {
      name: 'Physics Class Event',
      day: new Date(),
      classId: 3,
      subjectAndTeacherId: 3,
      dayPartId: 3, // evening
    },
  ],
});
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
