// redux/counterSlice.ts
import { AvaiSatByClassIdType, CalendarClassEvents } from '@/lib/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store, { RootState } from './store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Định nghĩa kiểu cho eventCnt
export type EventsInitState = {
    data: CalendarClassEvents[]
    avaiSatByClassIds: AvaiSatByClassIdType[]
}

const initialState: EventsInitState = {
    data: [],
    avaiSatByClassIds: []
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<CalendarClassEvents>) => {
            state.data.push(action.payload);
            console.log(action.payload)
        


        },

        setEvents: (state, action) => {
            state.data = (<CalendarClassEvents[]>action.payload);
        },

        setAvaiSatByClassIds: (state, action) => {
            state.avaiSatByClassIds = (<AvaiSatByClassIdType[]>action.payload);
        },


        addAvaiSatByClassId: (state, action) => {
            state.data.push(action.payload);

        


        },

    },
});

export const { addEvent, setEvents , setAvaiSatByClassIds} = eventsSlice.actions;
export default eventsSlice.reducer;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;