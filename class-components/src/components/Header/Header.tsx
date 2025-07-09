import { Component, type ReactNode } from 'react';
import { Search } from '../Search';

interface HeaderProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export class Header extends Component<HeaderProps> {
  render(): ReactNode {
    const { inputValue, onInputChange, onSearch } = this.props;
    return (
      <>
        <header>
          <h1>Star Wars</h1>{' '}
          <Search
            value={inputValue}
            onChange={onInputChange}
            onSearch={onSearch}
          />
        </header>
      </>
    );
  }
}
