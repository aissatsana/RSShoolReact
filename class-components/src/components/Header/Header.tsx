import { type FC } from 'react';
import { Search } from '../Search';

interface HeaderProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export const Header: FC<HeaderProps> = ({
  inputValue,
  onInputChange,
  onSearch,
}) => (
  <header>
    <h1>Rick and Morty</h1>{' '}
    <Search value={inputValue} onChange={onInputChange} onSearch={onSearch} />
  </header>
);
