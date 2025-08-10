import { type ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeContext/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import selectedItemsReducer from './providers/redux/selectedItemsSlice';

export const renderWithProviders = (ui: ReactElement) => {
  const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      selectedItems: selectedItemsReducer,
    },
    middleware: (getDefault) => getDefault().concat(baseApi.middleware),
  });

  return render(
    <MemoryRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>{ui}</ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </MemoryRouter>
  );
};
