import type { FC } from 'react';
import styles from './Pagination.module.css';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const t = useTranslations('Pagination');
  return (
    <div className={styles.pagination}>
      <ul className={styles.pagination__list}>
        <li className={styles.pagination__item}>
          <button
            className={styles.pagination__button}
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            {t('Back')}
          </button>
        </li>
        <li className={styles.pagination__item}>
          <button
            className={styles.pagination__button}
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            {t('Forward')}
          </button>
        </li>
      </ul>
      <p className={styles.pagination__total}>
        {t('Page')} {page} {t('of')} {totalPages}
      </p>
    </div>
  );
};
