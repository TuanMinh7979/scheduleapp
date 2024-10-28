// import CalendarComponent from '../components/CalendarComponent';

import CanlendarComponent from "./CanlendarComponent";

export const calendarEvents = [
  {
    title: "Math Class",
    allDay: false,
    start: new Date(2024, 10, 28, 8, 0), // month is 0-indexed in JavaScript Date
    end: new Date(2024, 10, 28, 8, 45),
  },
  {
    title: "Science Class",
    allDay: false,
    start: new Date(2024, 10, 29, 9, 0),
    end: new Date(2024, 10, 29, 10, 0),
  },
];

export default function HomePage() {
  return (
    <div>
      {/* <h1>My Calendar</h1> */}
      <CanlendarComponent />
    </div>
  );
}
