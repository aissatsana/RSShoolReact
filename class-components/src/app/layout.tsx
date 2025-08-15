import type { Metadata } from 'next';

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
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
