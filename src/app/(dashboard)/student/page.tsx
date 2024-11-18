
"use client";
import { eventsData } from "@/lib/data";
import CalendarComponent from "./CalendarComponent";
import MyFormContainer from "@/components/MyFormContainer";
import MyFormModal from "@/components/MyFormModal";


export const calendarEvents = [
  {
    id:1 ,
    title: "Math Class",
    allDay: false,
    startDate: new Date(2024, 10, 28, 8, 0), // month is 0-indexed in JavaScript Date
    endDate: new Date(2024, 10, 28, 8, 45),
  },
  {
    id:2 ,
    title: "Science Class",
    allDay: false,
    startDate: new Date(2024, 10, 29, 9, 0),
    endDate: new Date(2024, 10, 29, 10, 0),
  },
];



export default function HomePage() {
  return (
    <div>
      {/* <h1>My Calendar</h1> */}
      <CalendarComponent  events={eventsData} />
      {/* <MyFormContainer table="schedule" type="update" data={{}} /> */}

    </div>
  );
}
