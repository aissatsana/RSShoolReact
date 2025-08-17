import { useState, useEffect } from 'react';

export function useLocalStorageState(
  key: string,
  initialValue: string
): [string, (value: string) => void] {
  const [state, setState] = useState<string>(initialValue);

  useEffect(() => {
    const savedItem = localStorage.getItem(key);
    if (savedItem !== null) {
      setState(savedItem);
    }
  }, [key]);

  function setValue(value: string) {
    setState(value);
    localStorage.setItem(key, value);
  }

  return [state, setValue];
}
