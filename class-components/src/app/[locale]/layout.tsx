import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import ClientProviders from '../../providers/ClientProviders/ClientProviders';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import '../../index.css';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <ClientProviders>
        <Header />
        <main>{children}</main>
        <Footer />
      </ClientProviders>
    </NextIntlClientProvider>
  );
}
