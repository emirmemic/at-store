import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { PAGE_NAMES } from './page-names';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['bs'],
  defaultLocale: 'bs',
  localePrefix: 'as-needed',
  pathnames: {
    '/': {
      bs: '/',
    },
    [PAGE_NAMES.GLOBAL_COMPONENTS]: {
      bs: '/global-components',
    },
    [PAGE_NAMES.LOGIN]: {
      bs: '/prijava',
    },
    [PAGE_NAMES.REGISTER]: {
      bs: '/registracija',
    },
    [PAGE_NAMES.ACCOUNT]: {
      bs: '/racun',
    },
    [PAGE_NAMES.RESET_PASSWORD]: {
      bs: '/reset-lozinke',
    },
    [PAGE_NAMES.MAC]: {
      bs: '/mac',
    },
    [PAGE_NAMES.IPAD]: {
      bs: '/ipad',
    },
    [PAGE_NAMES.IPHONE]: {
      bs: '/iphone',
    },
    [PAGE_NAMES.WATCH]: {
      bs: '/watch',
    },
    [PAGE_NAMES.AIRPODS]: {
      bs: '/airpods',
    },
    [PAGE_NAMES.ACCESSORIES]: {
      bs: '/dodaci',
    },
    [PAGE_NAMES.SUPPORT]: {
      bs: '/podrska',
    },
    [PAGE_NAMES.B2B]: {
      bs: '/b2b',
    },
    [PAGE_NAMES.MICROFIN_INVOICE]: {
      bs: '/mikrofin-predracun',
    },
    [PAGE_NAMES.COMPLAINTS]: {
      bs: '/reklamacije',
    },
    [PAGE_NAMES.EDUCATIONAL_DISCOUNT]: {
      bs: '/obrazovni-popust',
    },
    [PAGE_NAMES.ABOUT]: {
      bs: '/o-nama',
    },
    [PAGE_NAMES.FIND_STORE]: {
      bs: '/pronadi-store',
    },
    [PAGE_NAMES.CAREERS]: {
      bs: '/karijera',
    },
    [PAGE_NAMES.NEWS]: {
      bs: '/novosti',
    },
    [PAGE_NAMES.PROMO]: {
      bs: '/promo',
    },
    [PAGE_NAMES.PRIVACY_POLICY]: {
      bs: '/politika-privatnosti',
    },
    [PAGE_NAMES.DELIVERY]: {
      bs: '/dostava',
    },
    [PAGE_NAMES.NEWSLETTER]: {
      bs: '/newsletter',
    },
    [PAGE_NAMES.PAYMENT_METHODS]: {
      bs: '/nacini-placanja',
    },
    [PAGE_NAMES.ORDER_CANCELLATION]: {
      bs: '/otkazivanje-narudzbe',
    },
    [PAGE_NAMES.CONTACT_US]: {
      bs: '/kontaktirajte-nas',
    },
    [PAGE_NAMES.TERMS_OF_PURCHASE]: {
      bs: '/uslovi-kupovine',
    },
    [PAGE_NAMES.COOKIE_POLICY]: {
      bs: '/Politika kolačića',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;

// Lightweight wrappers around Next.js' navigation APIs that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
