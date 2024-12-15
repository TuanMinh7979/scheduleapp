"use client"; // Force client-side rendering for Next.js compatibility
import { Calendar, dateFnsLocalizer, EventProps, momentLocalizer, SlotInfo, View, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Children, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import MyFormModal from '@/components/MyFormModal';
import React from 'react';
import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { convertEvents, getPartIdOfDay, getPartStringOfDay } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents, useAppDispatch, useAppSelector } from '@/store/events-slice';
import { RootState } from '@/store/store';





interface IProps {

    homeDataEvents: any[];  // Mảng các sự kiện
}

const CustomEvent: React.FC<EventProps<any>> = ({ event }) => {


    return (
        <div
            className='event-custom-content'
            style={{
                height: "100%",
                backgroundColor: 'lightblue'
            }}
        >
            <p>1{event.teacherName}</p>
            <br />
            <p>2{event.subjectName}</p>
            <br />
            <strong>3{event.mode}</strong>

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

        router.push(`/student?classId=${searchParams.get("classId")}&currentDate=${format(newDate, 'MM-dd-yy')}`, undefined);
    };

    const customTimeGutterFormat = (date: Date): string => {
        const hour = date.getHours();
        return getPartStringOfDay(hour);
    };




    const [openTrigger, setOpenTrigger] = useState(false)
    const [eventsByClassId, setEventsByClassId] = useState({})
    const [choosedCell, setChoosedCell] = useState({})
    const dispatch = useAppDispatch();
    const eventsRedux = useAppSelector((state: RootState) => state.events); // Truy cập data từ Redux store
    useEffect(() => {
        dispatch(setEvents(props.homeDataEvents));
    }, [dispatch, props.homeDataEvents]);

    useEffect(() => {
        // Fetch dữ liệu từ API khi classId thay đổi
        const fetchFormData = async () => {
            try {
                const response = await fetch(`/api/subjectandteachers-by_class/${searchParams.get("classId")}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result: any = await response.json();
                console.log(result)
                dispatch(setEvents(props.homeDataEvents))
                setEventsByClassId(result)
            } catch (error) {
                console.log(error)
            }
        };

        fetchFormData();
    }, [searchParams.get("classId")]); // Chạy lại khi classId thay đổi
    console.log(props.homeDataEvents)



  

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
                events={convertEvents(eventsRedux.data)}
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
                onSelectSlot={(a) => {

                    setOpenTrigger(true);
                    const currentDateTime = new Date(a.start)
                    const currentDate = format(new Date(a.start), 'MM-dd-yy')
                    const currentTime = currentDateTime.getHours();
                    setChoosedCell(
                        {
                            day: currentDate,
                            dayPartId: getPartIdOfDay(currentTime)
                        }

                    )

                }} // Gọi hàm khi click vào slot
            />
            <MyFormModal
                setOpenTrigger={setOpenTrigger}
                openTrigger={openTrigger}
                table="schedule"
                type="update"
                data={{
                    eventsByClassId, choosedCell
                }}

            />
        </div>
    );
}


export default CalendarComponent;
