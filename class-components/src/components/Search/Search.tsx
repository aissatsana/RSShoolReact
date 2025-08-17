import { type ChangeEvent, type FC } from 'react';
import styles from './Search.module.css';
import { useTranslations } from 'next-intl';

interface SearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export const Search: FC<SearchProps> = ({ value, onChange, onSearch }) => {
  const t = useTranslations('Search');
  return (
    <div className={styles.search}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        name="search"
        className={styles.search__input}
      ></input>
      <button
        type="button"
        onClick={onSearch}
        className={styles.search__button}
      >
        {t('Search')}
      </button>
    </div>
  );
};
