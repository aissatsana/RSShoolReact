import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './charactersSlice';
import characterDetailReducer from './characterDetailSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    characterDetail: characterDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
