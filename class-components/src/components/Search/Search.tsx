import { Component, type ChangeEvent, type ReactNode } from 'react';

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
        <input type="text" value={value} onChange={onChange}></input>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </>
    );
  }
}
