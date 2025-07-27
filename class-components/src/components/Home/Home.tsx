import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { CardList } from '../CardList/CardList';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import { useSearchParams } from 'react-router-dom';
import { API_URL, INIT_STATE } from './constants';
import type { Character } from '../../types';
import { Header } from '../Header';
import { Detail } from '../Detail';

export const Home = () => {
  const [inputValue, setInputValue] = useState<string>(INIT_STATE.inputValue);
  const [results, setResults] = useState<Character[]>(INIT_STATE.results);
  const [isLoading, setIsLoading] = useState<boolean>(INIT_STATE.isLoading);
  const [fetchError, setFetchError] = useState<Error | null>(
    INIT_STATE.fetchError
  );

  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const detailsId = searchParams.get('detailsId')
    ? Number(searchParams.get('detailsId'))
    : undefined;

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
        setFetchError(err instanceof Error ? err : new Error(String(err)));
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

  const handlePageChange = (newPage: number) =>
    setSearchParams({ page: String(newPage) });

  const handleSelect = (id: number) => {
    setSearchParams({
      page: String(page),
      detailsId: String(id),
    });
  };

  const handleCloseDetail = () => {
    setSearchParams({
      page: String(page),
    });
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CardList
            items={results}
            onSelect={handleSelect}
            selectedId={detailsId}
          />
          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {detailsId && <Detail id={detailsId} onClose={handleCloseDetail} />}
    </>
  );
};
