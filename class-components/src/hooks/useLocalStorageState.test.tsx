import { renderHook, act } from '@testing-library/react';
import { useLocalStorageState } from './useLocalStorageState';

describe('useLocalStorageState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('uses the value from localStorage if present', () => {
    localStorage.setItem('testKey', 'fromStorage');
    const { result } = renderHook(() =>
      useLocalStorageState('testKey', 'init')
    );
    expect(result.current[0]).toBe('fromStorage');
  });

  it('uses the initial value if localStorage is empty', () => {
    const { result } = renderHook(() =>
      useLocalStorageState('testKey', 'init')
    );
    expect(result.current[0]).toBe('init');
  });

  it('updates localStorage when setValue is called', () => {
    const { result } = renderHook(() =>
      useLocalStorageState('testKey', 'init')
    );
    act(() => {
      result.current[1]('newValue');
    });
    expect(localStorage.getItem('testKey')).toBe('newValue');
    expect(result.current[0]).toBe('newValue');
  });
});
