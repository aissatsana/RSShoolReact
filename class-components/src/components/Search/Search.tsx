import { Component, type ChangeEvent, type ReactNode } from 'react';
import './style.css';

interface SearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export class Search extends Component<SearchProps> {
  render(): ReactNode {
    const { value, onChange, onSearch } = this.props;
    return (
      <>
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
      </>
    );
  }
}
