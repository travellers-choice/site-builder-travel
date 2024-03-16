import { configureStore } from '@reduxjs/toolkit';
import initialsReducer from './features/InitialSlice';

export const store = configureStore({
  reducer: {
    initials: initialsReducer,
   
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;