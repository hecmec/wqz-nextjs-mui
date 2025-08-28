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
