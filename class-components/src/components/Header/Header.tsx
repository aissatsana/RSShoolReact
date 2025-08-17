import { useTranslations } from 'next-intl';
import { ThemeToggle } from '../ThemeToggle';
import styles from './Header.module.css';

export const Header = () => {
  const t = useTranslations('utils');
  return (
    <header className={styles.header}>
      <h1>{t('Rick and Morty')}</h1>
      <ThemeToggle />
    </header>
  );
};
