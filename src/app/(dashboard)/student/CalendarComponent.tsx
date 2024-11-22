"use client"; // Force client-side rendering for Next.js compatibility

import { Calendar, DateCellWrapperProps, dateFnsLocalizer, momentLocalizer, SlotInfo, View, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Children, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { getISOWeek } from 'date-fns/fp/getISOWeek';
import moment from 'moment';
import MyFormModal from '@/components/MyFormModal';
import React from 'react';



interface IProps {

    events: any[];  // Mảng các sự kiện
}

interface ColoredDateCellWrapperProps {
    children: ReactElement;
    value: Date;
}

const ColoredDateCellWrapper: React.FC<ColoredDateCellWrapperProps> = ({ children, value }) => {
   

    return React.cloneElement(
        Children.only(children),
        {
            style: {
                ...children.props.style,
                backgroundColor:  'yellow' ,
            },
        }
    );
};

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
        if (hour >= 17 && hour < 22) return 'Tối';
        return '';
    };




    const [openTrigger, setOpenTrigger] = useState(false)
    const [eventItemData, setEventItemData] = useState({})

    return (
        <div>

            <Calendar
                components={{
                    dateCellWrapper: ColoredDateCellWrapper,
                }}
                views={['work_week', 'week']}
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
                onSelectSlot={(a) => { console.log("-------------->>>>>"); setOpenTrigger(true); setEventItemData(a) }} // Gọi hàm khi click vào slot
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
