import { Component, type ReactNode } from 'react';

interface HeaderProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export default class Header extends Component<HeaderProps> {
  render(): ReactNode {
    // const { inputValue, onInputChange, onSearch } = this.props;
    return (
      <>
        <header>
          <h1>Star Wars</h1>{' '}
          {/* <Search
            value={inputValue}
            onChange={onInputChange}
            onSearch={onSearch}
          /> */}
        </header>
      </>
    );
  }
}
