// IT APPEARS THAT BIG CALENDAR SHOWS THE LAST WEEK WHEN THE CURRENT DAY IS A WEEKEND.
// FOR THIS REASON WE'LL GET THE LAST WEEK AS THE REFERENCE WEEK.
// IN THE TUTORIAL WE'RE TAKING THE NEXT WEEK AS THE REFERENCE WEEK.

const getLatestMonday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const latestMonday = today;
  latestMonday.setDate(today.getDate() - daysSinceMonday);
  return latestMonday;
};

export const adjustScheduleToCurrentWeek = (
  lessons: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  const latestMonday = getLatestMonday();

  return lessons.map((lesson) => {
    const lessonDayOfWeek = lesson.start.getDay();

    const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;

    const adjustedStartDate = new Date(latestMonday);

    adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds()
    );
    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds()
    );

    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};


export const getPartStringOfDay = (hourTime: number): string => {
  if (hourTime >= 7 && hourTime < 12) return 'Sáng';
  if (hourTime >= 12 && hourTime < 17) return 'Chiều';
  if (hourTime >= 17 && hourTime < 22) return 'Tối';

  console.error("getPartStringOfDay(number) Daypart is not valid from  ");
  return ""

}


export const getPartIdOfDay = (hourTime: number): number => {
  if (hourTime >= 7 && hourTime < 12) return 1;
  if (hourTime >= 12 && hourTime < 17) return 2;
  if (hourTime >= 17 && hourTime < 22) return 3;
  console.error("getPartIdOfDay(number) Daypart is not valid from  ");
  return -1



}

// Định nghĩa kiểu cho eventCnt
export type AvaiSatByClassIdType = {

  eventCnt?: number;
  satId?: number;          // ID của sự kiện
  subjectId?: number;   // ID của môn học
  subjectName?: string; // Tên môn học
  subjectTotal?: number; // Tổng số môn học
  teacherId?: number;   // ID của giáo viên
  teacherName?: string; // Tên giáo viên
}

export type HomeDataEvent = {
  id?: number;             // ID của sự kiện   // Tên của sự kiện
  day?: string;            // Ngày (ISO 8601 format)
  classId?: number;        // ID của lớp học
  dayPartId?: number;      // ID của phần trong ngày (ví dụ: buổi sáng, chiều)
  mode?: "online" | "offline"; // Chế độ học (chỉ nhận "online" hoặc "offline")
  subjectName?: string;    // Tên môn học
  teacherName?: string;    // Tên giáo viên
  satId?: number
};

export const convertEvents = (inputEvents: InputEvent[] | any[]): any[] => {

  return inputEvents.map(item => {
    const start = new Date(item.day); // Chuyển `day` sang kiểu `Date`

    // Giả định thời gian bắt đầu và kết thúc
    // Ví dụ: Tự động thêm 1 giờ kết thúc
    const end = new Date(start);

    end.setHours(start.getHours() + 10);
    if (item.dayPartId == 1) {
      start.setHours(7)
      end.setHours(11)

    } else if (item.dayPartId == 2) {
      start.setHours(12)
      end.setHours(16)
    } else {
      start.setHours(17)
      end.setHours(21)
    }

    return { start, end, ...item };
  });
};