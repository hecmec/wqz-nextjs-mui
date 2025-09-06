import { headers } from 'next/headers';
import '../app/globals.css';
import type { ReactNode } from 'react';
import { pickLocale } from '@/i18n/routing';

export const metadata = {
  title: 'FOOBAR',
  description: '_DESCRIPTION_',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const h = await headers();
  const acceptLanguage = h.get('accept-language');
  const locale = pickLocale(acceptLanguage);
    
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}