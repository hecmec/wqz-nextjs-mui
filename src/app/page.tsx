import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { pickLocale } from '@/i18n/routing';


// This page only renders when the app is built statically (output: 'export')
export default async function RootPage() {
  const h = await headers();
  const acceptLanguage = h.get('accept-language');
  const locale = pickLocale(acceptLanguage);
  redirect(`/${locale}`);
}
