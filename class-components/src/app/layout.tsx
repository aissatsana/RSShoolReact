import type { Metadata } from 'next';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../index.css';
import ClientProviders from '../providers/ClientProviders/ClientProviders';

export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'Pantry based on the legendary series',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
