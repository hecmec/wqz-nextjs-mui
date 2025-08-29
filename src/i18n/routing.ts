import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['fr', 'en', 'de'],

  // Used when no locale matches
  defaultLocale: 'fr',

  localePrefix: 'always',

  // https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/i18n/routing.ts
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      fr: '/a-propos',
      de: '/über-uns',
    },
    '/auth/login': {
      en: '/auth/login',
      fr: '/auth/login',
      de: '/auth/login',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

/**
 * Picks the best matching locale from the `Accept-Language` HTTP header.
 * @param acceptLanguage The value of the `Accept-Language` HTTP header
 * @returns The best matching locale
 */
export function pickLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return routing.defaultLocale;
  // Very small parser: split by comma, strip weights
  const requested = acceptLanguage
    .split(',')
    .map(p => p.split(';')[0].trim().toLowerCase());

  for (const r of requested as Locale[]) {
    // Match full code
    if (routing.locales.includes(r)) return r;
    // Match primary subtag (e.g. en-US -> en)
    const primary = r.split('-')[0] as Locale;
    if (routing.locales.includes(primary)) return primary;
  }

  return routing.defaultLocale;
}
