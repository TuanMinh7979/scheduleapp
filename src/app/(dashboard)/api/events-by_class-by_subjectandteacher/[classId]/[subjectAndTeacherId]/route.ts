import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

import { Prisma } from "@prisma/client";

// API Route handler
export async function GET(
  request: Request,
  { params }: { params: { classId: string, subjectAndTeacherId: string } }
) {
  const { classId, subjectAndTeacherId } = params; // Lấy giá trị id từ URL


  try {
    const result: any = await prisma.$queryRaw<any[]>(
      Prisma.sql`
        SELECT
        *
        FROM
          "Event" eve 
        WHERE
          eve."classId" = ${parseInt(classId)} 
          AND eve."subjectAndTeacherId" = ${parseInt(subjectAndTeacherId)}
       
      `
    );


    // Chuyển đổi BigInt thành Number

    if (!result) {
      return Response.json({ message: 'not found' }, { status: 404 });
    }

    return Response.json(result);
  } catch (error) {
    console.log(error);

    return Response.json({ message: error }, { status: 500 });
  }
}








