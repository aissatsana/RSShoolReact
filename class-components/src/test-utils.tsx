import { type ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './providers/redux/store';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeContext/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';

export const renderWithProviders = (ui: ReactElement) => {
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
