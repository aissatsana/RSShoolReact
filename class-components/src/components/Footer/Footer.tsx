'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

export function Footer() {
  const pathname = usePathname();
  const linkCls = (href: string) =>
    `${styles.link}${pathname === href ? ` ${styles.linkActive}` : ''}`;

  return (
    <footer className={styles.footer}>
      <Link href="/" className={linkCls('/')}>
        Home
      </Link>
      <Link href="/about" className={linkCls('/about')}>
        About app
      </Link>
    </footer>
  );
}
