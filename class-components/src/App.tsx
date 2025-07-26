import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import './App.css';
import { API_URL, INIT_STATE } from './constants';
import { Header } from './components/Header';
import { CardList } from './components/CardList/CardList';
import { Loader } from './components/Loader';
import { useSearchParams } from 'react-router-dom';
import type { Character } from './types';
import { Pagination } from './components/Pagination';

const App = () => {
  const [inputValue, setInputValue] = useState<string>(INIT_STATE.inputValue);
  const [results, setResults] = useState<Character[]>(INIT_STATE.results);
  const [isLoading, setIsLoading] = useState<boolean>(INIT_STATE.isLoading);
  const [fetchError, setFetchError] = useState<Error | null>(
    INIT_STATE.fetchError
  );

  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );

  useEffect(() => {
    setSearchParams({ page: String(page) });
  }, [page, searchParams]);

  const fetchResults = useCallback(
    async (term: string = '', pageNum: number = 1) => {
      setIsLoading(true);

      try {
        const url = term
          ? `${API_URL}?name=${encodeURIComponent(term)}&page=${pageNum}`
          : `${API_URL}?page=${pageNum}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setResults(data.results);
        setTotalPages(data.info.pages);
      } catch (err) {
        setFetchError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const stored = localStorage.getItem('searchTerm') || '';
    setInputValue(stored);
    fetchResults(stored, page);
  }, [fetchResults, page]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = (): void => {
    const trimmed = inputValue.trim();
    localStorage.setItem('searchTerm', trimmed);
    fetchResults(trimmed, page);
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

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
      <main>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <CardList items={results} />
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </>
  );
};

export default App;
