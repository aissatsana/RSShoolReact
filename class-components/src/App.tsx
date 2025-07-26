import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import './App.css';
import { API_URL, INIT_STATE } from './constants';
import { Header } from './components/Header';
import { CardList } from './components/CardList/CardList';
import { Loader } from './components/Loader';

const App = () => {
  const [inputValue, setInputValue] = useState(INIT_STATE.inputValue);
  const [results, setResults] = useState(INIT_STATE.results);
  const [isLoading, setIsLoading] = useState(INIT_STATE.isLoading);
  const [fetchError, setFetchError] = useState<Error | null>(
    INIT_STATE.fetchError
  );

  const fetchResults = useCallback(async (term: string = '') => {
    setIsLoading(true);

    try {
      const url = term
        ? `${API_URL}?name=${encodeURIComponent(term)}&page=1`
        : `${API_URL}?page=1`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      setFetchError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('searchTerm') || '';
    setInputValue(stored);
    fetchResults(stored);
  }, [fetchResults]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = (): void => {
    const trimmed = inputValue.trim();
    localStorage.setItem('searchTerm', trimmed);
    fetchResults(trimmed);
  };

  if (fetchError) {
    throw fetchError;
  }

  return (
    <>
      <Header
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onSearch={handleSearchClick}
      />
      <main>{isLoading ? <Loader /> : <CardList items={results} />}</main>
    </>
  );
};

export default App;
