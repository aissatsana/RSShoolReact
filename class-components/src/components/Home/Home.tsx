'use client';

import { useState, type ChangeEvent } from 'react';
import { CardList } from '../CardList/CardList';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import { INIT_STATE } from './constants';
import { Detail } from '../Detail';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { SelectedFlyout } from '../SelectedFlyout';
import { Search } from '../Search';
import { characterApi, useGetCharactersQuery } from '../../api/characterApi';
import { useAppDispatch } from '../../hooks/reduxHook';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const Home = () => {
  const t = useTranslations('utils');
  const [inputValue, setInputValue] = useLocalStorageState(
    'searchTerm',
    INIT_STATE.inputValue
  );
  const [searchValue, setSearchValue] = useState<string>(inputValue);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get('page') || '1');
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

  const setQs = (updates: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === '') params.delete(key);
      else params.set(key, String(value));
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = (): void => {
    setQs({ page: 1 });
    setSearchValue(inputValue.trim());
  };

  const handlePageChange = (newPage: number) => {
    setQs({ page: newPage });
  };

  const handleSelect = (id: number) => {
    setQs({ page, detailsId: String(id) });
  };

  const handleCloseDetail = () => {
    setQs({ page, detailsId: undefined });
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
          <p>{t('No characters found')}</p>
          <button onClick={() => refetch()}>{t('Retry')}</button>
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
        {t('Refresh')}
      </button>

      {detailsId && <Detail id={detailsId} onClose={handleCloseDetail} />}
      <SelectedFlyout items={results} />
    </>
  );
};
