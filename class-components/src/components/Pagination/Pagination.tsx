import type { FC } from 'react';
import styles from './Pagination.module.css';

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
  return (
    <div className={styles.pagination}>
      <ul className={styles.pagination__list}>
        <li className={styles.pagination__item}>
          <button
            className={styles.pagination__button}
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Back
          </button>
        </li>
        <li className={styles.pagination__item}>
          <button
            className={styles.pagination__button}
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            Forward
          </button>
        </li>
      </ul>
      <p className={styles.pagination__total}>
        Page {page} of {totalPages}
      </p>
    </div>
  );
};
