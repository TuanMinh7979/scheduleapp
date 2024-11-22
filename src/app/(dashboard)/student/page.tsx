

import { eventsData } from "@/lib/data";
import CalendarComponent from "./CalendarComponent";
import MyFormContainer from "@/components/MyFormContainer";
import MyFormModal from "@/components/MyFormModal";
import SideClassList from "@/components/SideClassList";
import prisma from "@/lib/prisma";
interface InputEvent {
  id: number;
  name: string;
  day: string | Date; // `day` có thể là kiểu Date hoặc ISO string
  classId: number;
  subjectAndTeacherId: number;
  dayPartId: number;
}

interface OutputEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
}
const convertEvents = (inputEvents: InputEvent[]): OutputEvent[] => {
  return inputEvents.map(event => {
    const start = new Date(event.day); // Chuyển `day` sang kiểu `Date`

    // Giả định thời gian bắt đầu và kết thúc
    // Ví dụ: Tự động thêm 1 giờ kết thúc
    const end = new Date(start);
    console.log("=======================>>>>>>> start", start.toLocaleString("vi-VN"))
    end.setHours(start.getHours() + 10);
    if (event.dayPartId == 1) {
      start.setHours(7)
      end.setHours(11)

    } else if (event.dayPartId == 2) {
      start.setHours(12)
      end.setHours(16)
    } else {
      start.setHours(17)
      end.setHours(21)
    }

    return {
      id: event.id,
      title: event.name,
      start: start,
      end: end,
    };
  });
};


const HomePage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const classes = await prisma.class.findMany();
  console.log(searchParams)
  const classId = searchParams.classId;

  const eventsData = classId
    ? await prisma.event.findMany({
      where: { classId: Number(classId) },
    })
    : [];



  console.log("---------->", eventsData)

  return (
    <div className="flex border border-black justify-between">



      <div className="border  border-green w-9/12  ">
        <CalendarComponent events={convertEvents(eventsData)} />
      </div>


      <div className="border h-[600px] border-red-800 w-3/12  overflow-y-auto ">
        <SideClassList data={classes} />
      </div>

    </div>
  );
}
export default HomePage;