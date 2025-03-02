import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['bs', 'en'],
  defaultLocale: 'bs',
  localePrefix: 'as-needed',
  pathnames: {
    '/login': {
      en: '/login',
      bs: '/prijava',
    },
    '/register': {
      en: '/register',
      bs: '/registracija',
    },
    '/account': {
      en: '/account',
      bs: '/racun',
    },
    '/reset-password': {
      en: '/reset-password',
      bs: '/reset-lozinke',
    },
    '/about': {
      en: '/about',
      bs: '/o-nama',
    },
    '/': {
      en: '/',
      bs: '/',
    },
  },
});

export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
