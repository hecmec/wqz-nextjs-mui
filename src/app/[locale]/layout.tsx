import CurrentLayout from '@/layout';
import { AppStoreProvider } from '@/store';
import defaultTheme, { ThemeProvider } from '@/theme';
import { SimplePaletteColorOptions } from '@mui/material';
import { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';

const THEME_COLOR = (defaultTheme.palette?.primary as SimplePaletteColorOptions)?.main || '#FFFFFF';

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export const metadata: Metadata = {
  title: 'Hallo test title root',
  description: '_DESCRIPTION_',
  manifest: '/site.webmanifest',
  // TODO: Add Open Graph metadata
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppStoreProvider>
            <ThemeProvider>
              <CurrentLayout>{children}</CurrentLayout>
            </ThemeProvider>
          </AppStoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
