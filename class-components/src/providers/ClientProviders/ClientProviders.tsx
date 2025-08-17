'use client';

import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { makeStore } from '../redux/store';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ThemeProvider } from '../ThemeContext/ThemeContext';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef(makeStore());

  useEffect(() => {
    const teardown = setupListeners(storeRef.current.dispatch);
    return teardown;
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={storeRef.current}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
