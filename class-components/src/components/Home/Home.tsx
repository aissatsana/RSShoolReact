import { useEffect, useState, type ChangeEvent } from 'react';
import { CardList } from '../CardList/CardList';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import { useSearchParams } from 'react-router-dom';
import { INIT_STATE } from './constants';
import { Header } from '../Header';
import { Detail } from '../Detail';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { getCharacters } from '../../redux/charactersSlice';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { results, isLoading, fetchError, totalPages } = useAppSelector(
    (state) => state.characters
  );

  const [inputValue, setInputValue] = useLocalStorageState(
    'searchTerm',
    INIT_STATE.inputValue
  );
  const [searchValue, setSearchValue] = useState<string>(inputValue);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const detailsId = searchParams.get('detailsId')
    ? Number(searchParams.get('detailsId'))
    : undefined;

  useEffect(() => {
    dispatch(getCharacters({ term: searchValue, page }));
  }, [searchValue, page]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = (): void => {
    setSearchParams({ page: '1' });
    setPage(1);
    setSearchValue(inputValue.trim());
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
    setPage(newPage);
  };

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
