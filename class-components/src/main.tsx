import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './providers/redux/store.ts';
import { ThemeProvider } from './providers/ThemeContext/ThemeContext.tsx';
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('No root element');
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
