"use client"; // Force client-side rendering for Next.js compatibility

import { Calendar, dateFnsLocalizer, momentLocalizer, SlotInfo, View, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getISOWeek } from 'date-fns/fp/getISOWeek';
import moment from 'moment';

type CalendarEvent = {
    id: number,
    title: string,
    class: string,
    date: Date,
    startTime: Date,
    endTime: Date,
}

interface IProps {
    onSelectSlot: (slotInfo: { start: Date; end: Date }) => void; // Hàm để xử lý sự kiện chọn slot
    events: CalendarEvent[];  // Mảng các sự kiện
}
const localizer = momentLocalizer(moment);
const CalendarComponent = (props: IProps) => {
    const [date, setDate] = useState(new Date());
    const [wnum, setWNum] = useState(1);
    const [view, setView] = useState<View>(Views.WORK_WEEK);

    const handleOnChangeView = (selectedView: View) => {
        setView(selectedView);
    };


    const handleNavigate = (newDate: Date, view: View) => {
        window.alert(newDate);
        setDate(newDate);
        const newWeekNumber = getISOWeek(newDate);
        setWNum(newWeekNumber)


    };

    const customTimeGutterFormat = (date: Date): string => {
        const hour = date.getHours();
        if (hour >= 7 && hour < 12) return 'Sáng';
        if (hour >= 12 && hour < 17) return 'Chiều';
        if (hour >= 17 && hour < 21) return 'Tối';
        return '';
    };



    // Hàm này là ví dụ, định nghĩa nó theo nhu cầu của bạn
    const buildMessage = (slotInfo: SlotInfo): string => {
        return `Selected slot from ${slotInfo.start.toLocaleString()} to ${slotInfo.end.toLocaleString()}`;
    };

    return (
        <div>
            <span>Num of week : {wnum}</span>
            <Calendar
                views={['work_week', 'month', 'week', 'day', 'agenda']}
                view={view}
                min={new Date(2025, 1, 0, 7, 0, 0)}
                max={new Date(2025, 1, 0, 21, 0, 0)}
                onView={handleOnChangeView}
                localizer={localizer}
                events={props.events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                date={date}
                onNavigate={handleNavigate} // Update date on navigation
                step={60} //  số phút 1 ô
                timeslots={5} // mỗi ô có 5 step
                formats={{
                    timeGutterFormat: (date, culture, localizer) => customTimeGutterFormat(date),

                }}
                selectable
                onSelectSlot={props.onSelectSlot} // Gọi hàm khi click vào slot
            />
        </div>
    );
}


export default CalendarComponent;
