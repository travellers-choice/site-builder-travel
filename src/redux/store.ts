import { configureStore } from '@reduxjs/toolkit';
import initialsReducer from './features/InitialSlice';
import userReducer from './features/UserSlice'
import attractionReducer from './features/attractionSlice'

export const store = configureStore({
  reducer: {
    initials: initialsReducer,
    user:userReducer,
    attractions:attractionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;