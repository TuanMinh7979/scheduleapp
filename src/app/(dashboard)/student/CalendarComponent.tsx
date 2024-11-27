"use client"; // Force client-side rendering for Next.js compatibility
import { Calendar, dateFnsLocalizer, EventProps, momentLocalizer, SlotInfo, View, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Children, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import MyFormModal from '@/components/MyFormModal';
import React from 'react';
import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';




interface IProps {

    events: any[];  // Mảng các sự kiện
}





const CustomEvent: React.FC<EventProps<any>> = ({ event }) => {


    return (
        <div
            className='event-custom-content'
            style={{
                height: "100%"
            }}
        >
            <p>{event.teacherName}</p>
            <br />
            <p>{event.subjetName}</p>
            <strong>{event.mode}</strong>

        </div>
    );
};

const localizer = momentLocalizer(moment);
const CalendarComponent = (props: IProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [date, setDate] = useState(new Date());

    const [view, setView] = useState<View>(Views.WEEK);

    const handleOnChangeView = (selectedView: View) => {
        setView(selectedView);
    };


    const handleNavigate = (newDate: Date, view: View) => {
        setDate(newDate);
        console.log("--------", date)
        router.push(`/student?classId=${searchParams.get("classId")}&currentDate=${format(newDate, 'MM-dd-yy')}`, undefined);
    };

    const customTimeGutterFormat = (date: Date): string => {
        const hour = date.getHours();
        if (hour >= 7 && hour < 12) return 'Sáng';
        if (hour >= 12 && hour < 17) return 'Chiều';
        if (hour >= 17 && hour < 22) return 'Tối';
        return '';
    };




    const [openTrigger, setOpenTrigger] = useState(false)
    const [eventItemData, setEventItemData] = useState({})


    console.log(props.events)


    return (
        <div>

            <Calendar


                components={{
                    event: CustomEvent, // Gắn custom component vào đây
                }}
                views={['work_week', 'week', 'day', 'agenda']}
                view={view}
                min={new Date(2025, 1, 0, 7, 0, 0)}
                max={new Date(2025, 1, 0, 22, 0, 0)}
                onView={handleOnChangeView}
                localizer={localizer}
                events={props.events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                date={date}
                onNavigate={handleNavigate} // Update date on navigation
                step={300} //  số phút 1 ô
                timeslots={1} // mỗi ô có 5 step
                formats={{
                    timeGutterFormat: (date, culture, localizer) => customTimeGutterFormat(date),


                }}
                selectable
                onSelectSlot={(a) => { setOpenTrigger(true); setEventItemData(a) }} // Gọi hàm khi click vào slot
            />
            <MyFormModal
                setOpenTrigger={setOpenTrigger}
                openTrigger={openTrigger}
                table="schedule"
                type="update"
                data={eventItemData}

            />
        </div>
    );
}


export default CalendarComponent;
