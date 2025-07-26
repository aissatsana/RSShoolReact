import { type ChangeEvent, type FC } from 'react';
import './style.css';

interface SearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export const Search: FC<SearchProps> = ({ value, onChange, onSearch }) => (
  <div className="search">
    <input
      type="text"
      value={value}
      onChange={onChange}
      name="search"
      className="search__input"
    ></input>
    <button type="button" onClick={onSearch} className="search__button">
      Search
    </button>
  </div>
);
