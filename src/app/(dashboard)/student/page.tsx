




import MyFormModal from "@/components/MyFormModal";
import SideClassList from "@/components/SideClassList";
import prisma from "@/lib/prisma";
import { format } from 'date-fns';
import { Prisma } from "@prisma/client";
import CalendarComponent from "@/components/CalendarComponent";

import { HomeDataEvent } from "@/lib/utils";

interface InputEvent {
  id: number,
  name: string,
  day: Date
  classId: number,
  dayPartId: number,
  subjectName: string,
  teacherName: string
}





const HomePage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

  const classes = await prisma.class.findMany();
  const classId = searchParams.classId || '1'; // Mặc định '1'
  const currentDate = searchParams.currentDate || format(new Date(), 'MM-dd-yy'); // Mặc định ngày hôm nay



  const getStartAndEndOfWeek = (date: string) => {
    // Clone the input date to avoid mutation
    const current = new Date(date);

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = current.getDay();

    // Calculate the start of the week (Sunday)
    const startDate = new Date(current);
    startDate.setDate(current.getDate() - dayOfWeek);
    // Set time to midnight

    // Calculate the end of the week (Saturday)
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);


    return { startDate, endDate };
  }


  const { startDate, endDate } = getStartAndEndOfWeek(currentDate)

  const homeDataEvents = await prisma.$queryRaw<HomeDataEvent[]>(
    Prisma.sql
      `SELECT
      e.id AS "id",
      e.name AS "name",
      e.day AS "day",
      e."classId" AS "classId",
      e."dayPartId" AS "dayPartId",
      e."mode" AS "mode",
      s.name AS "subjectName",
      t.name AS "teacherName"

    FROM "Event" AS e
    JOIN "SubjectAndTeacher" AS st ON e."subjectAndTeacherId" = st.id
    JOIN "Subject" AS s ON st."subjectId" = s.id
    JOIN "Teacher" AS t ON st."teacherId" = t.id
    WHERE e."classId" = ${Number(classId)}
      AND e."day" BETWEEN ${startDate} AND ${endDate}
    `
  )





  // Truy cập data từ Redux store


  return (
    <div className="flex border border-black justify-between">



      <div className="border   w-9/12  ">
        <CalendarComponent homeDataEvents={homeDataEvents} />
      </div>


      <div className="border h-[600px] border-red-800 w-3/12  overflow-y-auto ">
        <SideClassList data={classes} />
      </div>

    </div>
  );
}
export default HomePage;