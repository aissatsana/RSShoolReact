import { useState, type ChangeEvent } from 'react';
import { CardList } from '../CardList/CardList';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import { useSearchParams } from 'react-router-dom';
import { INIT_STATE } from './constants';
import { Detail } from '../Detail';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { SelectedFlyout } from '../SelectedFlyout';
import { Search } from '../Search';
import { characterApi, useGetCharactersQuery } from '../../api/characterApi';
import { useAppDispatch } from '../../hooks/reduxHook';

export const Home = () => {
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

  const listArgs = searchValue.trim()
    ? { page, name: searchValue.trim() }
    : { page };

  const { data, isLoading, isError, refetch } = useGetCharactersQuery(listArgs);
  const results = data?.results ?? [];
  const totalPages = data?.info.pages ?? 1;

  const dispatch = useAppDispatch();

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

  return (
    <>
      <Search
        value={inputValue}
        onChange={handleInputChange}
        onSearch={handleSearchClick}
      />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <>
          <p>Sorry, there are no such characters</p>
          <button onClick={() => refetch()}>Retry</button>
        </>
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

      <button
        type="button"
        onClick={() => dispatch(characterApi.util.resetApiState())}
      >
        Refresh
      </button>

      {detailsId && <Detail id={detailsId} onClose={handleCloseDetail} />}
      <SelectedFlyout items={results} />
    </>
  );
};
