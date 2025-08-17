import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <div>
      <h1>404</h1>
      <p>{t('Oops, there is nothing, probably Rick deleted this page')}</p>
      <Link href="/">{t('Go home')}</Link>
    </div>
  );
}
