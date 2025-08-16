import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './selectedItemsSlice';
import { baseApi } from '../../api/baseApi';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  selectedItems: selectedItemsReducer,
});
type RootState = ReturnType<typeof rootReducer>;

export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefault) => getDefault().concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;
