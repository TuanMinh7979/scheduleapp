"use client"; // Force client-side rendering for Next.js compatibility

import { Calendar, dateFnsLocalizer, momentLocalizer, SlotInfo, View, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getISOWeek } from 'date-fns/fp/getISOWeek';
import moment from 'moment';

// Define the type for event data
type Event = {
    title: string;
    allDay?: boolean;
    start: Date;
    end: Date;
};

const localizer = momentLocalizer(moment);

const calendarEvents: Event[] = [
    {
        title: "Math Class",
        allDay: false,
        start: new Date(2024, 10, 28, 8, 0),
        end: new Date(2024, 10, 28, 8, 45),
    },
    {
        title: "Science Class",
        allDay: false,
        start: new Date(2024, 10, 29, 9, 0),
        end: new Date(2024, 10, 29, 10, 0),
    },
];

const CanlendarComponent: React.FC = () => {
    const [date, setDate] = useState(new Date());
    const [wnum, setWNum] = useState(1);
    const [view, setView] = useState<View>(Views.WORK_WEEK);

    const handleOnChangeView = (selectedView: View) => {
        setView(selectedView);
    };


    const handleNavigate = (newDate: Date, view: View) => {
        setDate(newDate); // Update the current date

        // Only update the week number in "work_week" view
        if (view === "work_week") {
            const newWeekNumber = getISOWeek(newDate);
            setWNum(newWeekNumber)

            console.log(`Navigated to week number: ${newWeekNumber}`);
        }
    };

    const customTimeGutterFormat = (date: Date): string => {
        const hour = date.getHours();
        if (hour >= 7 && hour < 12) return 'Sáng';
        if (hour >= 12 && hour < 17) return 'Chiều';
        if (hour >= 17 && hour < 21) return 'Tối';
        return '';
    };

    // Sử dụng `useCallback` và định nghĩa kiểu `slotInfo` để đảm bảo type-safety
    const onSelectSlot =(slotInfo: SlotInfo) => {

        console.log("--------------------")

        window.alert(buildMessage(slotInfo));
  
    };
  
    // Hàm này là ví dụ, định nghĩa nó theo nhu cầu của bạn
    const buildMessage = (slotInfo: SlotInfo): string => {
      return `Selected slot from ${slotInfo.start.toLocaleString()} to ${slotInfo.end.toLocaleString()}`;
    };

    return (
        <div>
            {wnum}
            <Calendar
                views={["month", "work_week", "day"]}
                view={view}
                min={new Date(2025, 1, 0, 7, 0, 0)}
                max={new Date(2025, 1, 0, 21, 0, 0)}
                onView={handleOnChangeView}
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                date={date} // Set the current view date
                onNavigate={handleNavigate} // Update date on navigation
                step={60} //  số phút 1 ô
                timeslots={5} // mỗi ô có 5 step
                formats={{
                    timeGutterFormat: (date, culture, localizer) => customTimeGutterFormat(date),

                }}
                selectable
                onSelectSlot={onSelectSlot} // Gọi hàm khi click vào slot
            />
        </div>
    );
}


export default CanlendarComponent;
