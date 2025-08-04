import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './charactersSlice';
import characterDetailReducer from './characterDetailSlice';
import selectedItemsReducer from './selectedItemsSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    characterDetail: characterDetailReducer,
    selectedItems: selectedItemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
