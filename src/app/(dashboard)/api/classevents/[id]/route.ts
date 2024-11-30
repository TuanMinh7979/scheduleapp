import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

import { Prisma } from "@prisma/client";

// API Route handler
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Lấy giá trị id từ URL
  console.log(id);

  try {
    const result = await prisma.$queryRaw<any[]>(
      Prisma.sql`
        SELECT
          sat."id",
          sat."subjectId",
          sat."teacherId",
          sub."name" AS "subjectName",
          tea."name" AS "teacherName",
          sub."total" AS "subjectTotal",
          COUNT(e."id") AS "eventCnt" 
        FROM
          "SubjectAndTeacher" sat
        LEFT JOIN "Event" e
          ON sat."id" = e."subjectAndTeacherId"
        LEFT JOIN "Subject" sub
          ON sat."subjectId" = sub."id"
        LEFT JOIN "Teacher" tea
          ON sat."teacherId" = tea."id"
        WHERE
          e."classId" = ${parseInt(id)}  -- Lọc theo classId
        GROUP BY
          sat."id", sat."subjectId", sat."teacherId","subjectName","teacherName","subjectTotal"

        UNION ALL
        
        SELECT
          sat."id",
          sat."subjectId",
          sat."teacherId",
          sub."name" AS "subjectName",
          tea."name" AS "teacherName",
          sub."total" AS "subjectTotal",
          0 AS "eventCnt" 
        FROM
          "SubjectAndTeacher" sat
        LEFT JOIN "Event" e
          ON sat."id" = e."subjectAndTeacherId"
        LEFT JOIN "Subject" sub
          ON sat."subjectId" = sub."id"
        LEFT JOIN "Teacher" tea
          ON sat."teacherId" = tea."id"
        WHERE
          e."classId" != ${parseInt(id)}  -- Lọc theo classId
        GROUP BY
          sat."id", sat."subjectId", sat."teacherId","subjectName","teacherName","subjectTotal"
      `
    );


  // Chuyển đổi BigInt thành Number
  const normalizedResult = result.map(row => ({
    ...row,
    eventCnt: Number(row.eventCnt) // Đảm bảo eventCnt là kiểu Number
  }));
    if (!result) {
      return Response.json({ message: 'not found' }, { status: 404 });
    }

    return Response.json(normalizedResult);
  } catch (error) {
    console.log(error);

    return Response.json({ message: error }, { status: 500 });
  }
}




  



