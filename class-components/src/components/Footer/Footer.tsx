'use client';

import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';
import { Link } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const linkCls = (href: string) =>
    `${styles.link}${pathname === href ? ` ${styles.linkActive}` : ''}`;

  return (
    <footer className={styles.footer}>
      <Link href="/" className={linkCls('/')}>
        {t('Home')}
      </Link>
      <Link href="/about" className={linkCls('/about')}>
        {t('About app')}
      </Link>
    </footer>
  );
}
