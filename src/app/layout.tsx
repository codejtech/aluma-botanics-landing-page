import type { Metadata } from 'next';
import './globals.css';
import { SITE_NAME } from './lib/constants';

export const metadata: Metadata = {
  title: `${SITE_NAME} | Coming Soon`,
  description:
    'A softer ritual. A fresh botanical glow. Join the Aluma Botanics launch list.',
    icons: {
      icon: [
        {
          url: 'aluma-botanics-favicon.svg', type: 'image/svg+xml',
        },
      ]

    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-black antialiased">{children}</body>
    </html>
  );
}
