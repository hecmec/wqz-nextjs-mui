import { routing } from '@/i18n/routing';
import CurrentLayout from '@/layout';
import { ClientProviders } from '@/layout/components/ClientProviders';
import defaultTheme from '@/theme';
import { SimplePaletteColorOptions } from '@mui/material';
import { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';

const THEME_COLOR = (defaultTheme.palette?.primary as SimplePaletteColorOptions)?.main || '#FFFFFF';

export const viewport: Viewport = { themeColor: THEME_COLOR };

export const metadata: Metadata = {
  title: 'Hallo test title root',
  description: '_DESCRIPTION_',
  manifest: '/site.webmanifest',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  // Example: pass initialIsMobile = false here or detect again if needed; we keep it simple.
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ClientProviders initialIsMobile={false}>
            <CurrentLayout>{children}</CurrentLayout>
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};
export default LocaleLayout;
