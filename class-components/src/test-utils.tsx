import { type ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeContext/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import selectedItemsReducer from './providers/redux/selectedItemsSlice';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  selectedItems: selectedItemsReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export const renderWithProviders = (
  ui: ReactElement,
  { preloadedState }: { preloadedState?: Partial<RootState> } = {}
) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
    middleware: (getDefault) => getDefault().concat(baseApi.middleware),
  });

  const mockApp = render(
    <MemoryRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>{ui}</ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </MemoryRouter>
  );

  return { store, ...mockApp };
};
