import { configureStore } from '@reduxjs/toolkit';
import eventsReducer, { EventsInitState } from './events-slice';
export interface RootState {
    events: EventsInitState;  // Kiểu của state liên quan đến slice event
}
const store = configureStore({
    reducer: {
        events: eventsReducer,
    },
});

export default store;