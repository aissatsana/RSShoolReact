import { useTranslations } from 'next-intl';
import styles from './About.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  const t = useTranslations('About');
  return (
    <h3 className={styles.about}>
      {t('The application was made by')}
      <a
        className={styles.about__link}
        href="https://github.com/aissatsana"
        target="_blank"
        rel="noreferrer noopener"
      >
        aissatsana
      </a>
      {t('as part of the')}
      <a
        className={styles.about__link}
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer noopener"
      >
        RS School React
      </a>
      {t('course')}
    </h3>
  );
}
