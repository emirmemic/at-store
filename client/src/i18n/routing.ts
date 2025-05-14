import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { DYNAMIC_PAGES, PAGE_NAMES } from './page-names';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['bs'],
  defaultLocale: 'bs',
  localePrefix: 'as-needed',
  pathnames: {
    [PAGE_NAMES.HOME]: {
      bs: '/',
    },
    [PAGE_NAMES.ABOUT]: {
      bs: '/o-nama',
    },
    [PAGE_NAMES.ACCESSORIES]: {
      bs: '/dodaci',
    },
    [PAGE_NAMES.ACCOUNT]: {
      bs: '/racun',
    },
    [PAGE_NAMES.ACCOUNT_DASHBOARD]: {
      bs: '/racun/pocetna',
    },
    [PAGE_NAMES.ACCOUNT_ORDERS]: {
      bs: '/racun/narudzbe',
    },
    [PAGE_NAMES.ACCOUNT_DETAILS]: {
      bs: '/racun/podaci',
    },
    [PAGE_NAMES.ACCOUNT_PAYMENT_METHODS]: {
      bs: '/racun/nacini-placanja',
    },
    [PAGE_NAMES.ACCOUNT_FAVORITES]: {
      bs: '/racun/omiljeni',
    },
    [PAGE_NAMES.ACCOUNT_NEWSLETTER]: {
      bs: '/racun/newsletter',
    },
    [PAGE_NAMES.AIRPODS]: {
      bs: '/airpods',
    },
    [PAGE_NAMES.AT_SOFT]: {
      bs: '/at-soft',
    },
    [PAGE_NAMES.B2B]: {
      bs: '/b2b',
    },
    [PAGE_NAMES.CART]: {
      bs: '/korpa',
    },
    [PAGE_NAMES.CHECKOUT]: {
      bs: '/checkout',
    },
    [PAGE_NAMES.LOGIN_OR_GUEST]: {
      bs: '/prijava-ili-gost',
    },
    [PAGE_NAMES.CAREERS]: {
      bs: '/karijera',
    },
    [PAGE_NAMES.CATEGORIES]: {
      bs: '/kategorija',
    },
    [PAGE_NAMES.COMPLAINTS]: {
      bs: '/reklamacije',
    },
    [PAGE_NAMES.CONTACT_US]: {
      bs: '/kontaktirajte-nas',
    },
    [PAGE_NAMES.COOKIE_POLICY]: {
      bs: '/politika-kolacica',
    },
    [PAGE_NAMES.DELIVERY]: {
      bs: '/dostava',
    },
    [PAGE_NAMES.EDUCATIONAL_DISCOUNT]: {
      bs: '/obrazovni-popust',
    },
    [PAGE_NAMES.FIND_STORE]: {
      bs: '/pronadi-store',
    },
    [PAGE_NAMES.GLOBAL_COMPONENTS]: {
      bs: '/global-components',
    },
    [PAGE_NAMES.ICONS]: {
      bs: '/icons-page',
    },
    [PAGE_NAMES.LOGIN]: {
      bs: '/prijava',
    },
    [PAGE_NAMES.MAC]: {
      bs: '/mac',
    },
    [PAGE_NAMES.MIKROFIN_INVOICE]: {
      bs: '/mikrofin-predracun',
    },
    [PAGE_NAMES.NEWSLETTER]: {
      bs: '/newsletter',
    },
    [PAGE_NAMES.NEWSLETTER_UNSUBSCRIBE]: {
      bs: '/newsletter/odjava',
    },
    [PAGE_NAMES.NEWS]: {
      bs: '/novosti',
    },
    [PAGE_NAMES.ORDER_CANCELLATION]: {
      bs: '/otkazivanje-narudzbe',
    },
    [PAGE_NAMES.PAYMENT]: {
      bs: '/placanje',
    },
    [PAGE_NAMES.PAYMENT_METHODS]: {
      bs: '/nacini-placanja',
    },
    [PAGE_NAMES.PRIVACY_POLICY]: {
      bs: '/politika-privatnosti',
    },
    [PAGE_NAMES.PROMO]: {
      bs: '/promo',
    },
    [PAGE_NAMES.PRODUCTS]: {
      bs: '/proizvodi',
    },
    [PAGE_NAMES.REGISTER]: {
      bs: '/registracija',
    },
    [PAGE_NAMES.RESET_PASSWORD]: {
      bs: '/reset-sifru',
    },
    [PAGE_NAMES.FORGOT_PASSWORD]: {
      bs: '/zaboravio-sifru',
    },
    [PAGE_NAMES.SEARCH]: {
      bs: '/pretraga',
    },
    [PAGE_NAMES.SUPPORT]: {
      bs: '/podrska',
    },
    [PAGE_NAMES.TERMS_OF_PURCHASE]: {
      bs: '/uslovi-kupovine',
    },
    [PAGE_NAMES.WATCH]: {
      bs: '/watch',
    },
    [PAGE_NAMES.WHY_MAC]: {
      bs: '/zasto-mac',
    },
    [DYNAMIC_PAGES.ACCESSORIES_SUBCATEGORY]: {
      bs: '/dodaci/[subcategory]',
    },
    [DYNAMIC_PAGES.CATEGORY_PAGE]: {
      bs: '/kategorije/[category]',
    },
    [DYNAMIC_PAGES.GROUPED_SUBCATEGORY]: {
      bs: '/kategorije/[category]/[groupedSubCategory]',
    },
    [DYNAMIC_PAGES.PRODUCT_DETAILS]: {
      bs: '/proizvodi/[category]/[productTypeId]/[productLink]',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;

// Lightweight wrappers around Next.js' navigation APIs that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
