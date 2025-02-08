// redux/counterSlice.ts
import { AvaiSatByClassIdType } from '@/lib/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store, { RootState } from './store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { CalendarClassEvent } from '@/app/(dashboard)/types';

// Định nghĩa kiểu cho eventCnt
export type EventsInitState = {
    data: CalendarClassEvent[]
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


        setEvents: (state, action) => {
            state.data = (<CalendarClassEvent[]>action.payload);
        },

        setAvaiSatByClassIds: (state, action) => {
            state.avaiSatByClassIds = (<AvaiSatByClassIdType[]>action.payload);
        },




    },
});

export const { setEvents, setAvaiSatByClassIds } = eventsSlice.actions;
export default eventsSlice.reducer;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;