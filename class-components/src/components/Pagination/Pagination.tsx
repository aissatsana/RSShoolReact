import type { FC } from 'react';
import './style.css';

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
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item">
          <button
            className="pagination__button"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Back
          </button>
        </li>
        <li className="pagination__item">
          <button
            className="pagination__button"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            Forward
          </button>
        </li>
      </ul>
      <span className="pagination__total">
        Page {page} of {totalPages}
      </span>
    </div>
  );
};
