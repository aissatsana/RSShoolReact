import { useState } from 'react';

export function useLocalStorageState<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  function setValue(value: T) {
    setState(value);
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }

  return [state, setValue];
}
