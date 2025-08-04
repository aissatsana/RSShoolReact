import { ThemeToggle } from '../ThemeToggle';
import './style.css';

export const Header = () => (
  <header className="header">
    <h1>Rick and Morty</h1>
    <ThemeToggle />
  </header>
);
