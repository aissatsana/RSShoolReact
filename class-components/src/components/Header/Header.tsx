import { ThemeToggle } from '../ThemeToggle';
import styles from './Header.module.css';

export const Header = () => (
  <header className={styles.header}>
    <h1>Rick and Morty</h1>
    <ThemeToggle />
  </header>
);
