"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { calendarEvents } from "@/lib/data";

const localizer = momentLocalizer(moment);

const BigCalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };
  const localizer = momentLocalizer(moment) // or globalizeLocalizer

  return (


    // <Calendar
    //   date={calendarEvents[0].start} // cập nhật ngày hiển thị
    //   localizer={localizer}
    //   events={calendarEvents}
    //   startAccessor="start"
    //   endAccessor="end"
    //   views={["month", "work_week", "day", "week", "agenda"]}
    //   view={view}
    //   style={{ width: "1000px", height: "1000px" }}
    //   onView={handleOnChangeView}
    //   min={new Date(2024, 1, 0, 8, 0, 0)}
    //   max={new Date(2024, 1, 0, 17, 0, 0)}
    // />

    <Calendar
      localizer={localizer}
      events={calendarEvents}

      views={["month", "work_week", "day", "week", "agenda"]}

      // onView={handleOnChangeView}
      showMultiDayTimes

    />


    //   <Calendar

    //   events={events}
    //   localizer={djLocalizer}
    //   max={max}
    //   showMultiDayTimes
    //   step={60}
    //   views={Object.keys(Views).map((k) => Views[k])}
    // />
  );
};

export default BigCalendar;
