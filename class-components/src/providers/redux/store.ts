import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './charactersSlice';
import characterDetailReducer from './characterDetailSlice';
import selectedItemsReducer from './selectedItemsSlice';
import { baseApi } from '../../api/baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    characters: charactersReducer,
    characterDetail: characterDetailReducer,
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
