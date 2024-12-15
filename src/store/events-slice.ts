// redux/counterSlice.ts
import { HomeDataEvent } from '@/lib/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store, { RootState } from './store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Định nghĩa kiểu cho eventCnt
export type EventsInitState = {
    data: HomeDataEvent[]
}

const initialState: EventsInitState = {
    data: []
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<HomeDataEvent>) => {
            state.data.push(action.payload);
        },

        setEvents: (state, action) => {
            state.data = (<HomeDataEvent[]>action.payload);
        },

    },
});

export const { addEvent, setEvents } = eventsSlice.actions;
export default eventsSlice.reducer;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;