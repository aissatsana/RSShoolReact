import { useState } from 'react';

export function useLocalStorageState(
  key: string,
  initialValue: string
): [string, (value: string) => void] {
  const [state, setState] = useState<string>(() => {
    const item = localStorage.getItem(key);
    return item !== null ? item : initialValue;
  });

  function setValue(value: string) {
    setState(value);
    localStorage.setItem(key, value);
  }

  return [state, setValue];
}
