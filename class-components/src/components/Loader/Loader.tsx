import { useTranslations } from 'next-intl';
import styles from './Loader.module.css';

export const Loader = () => {
  const t = useTranslations('Loader');
  return (
    <div className={styles.loader}>
      <div className={styles.loader__spinner}></div>
      <p className={styles.loader__text}>{t('Loading')}...</p>
    </div>
  );
};
