import { getStrapiURL } from './utils/utils';

/* Strapi */
export const STRAPI_BASE_URL = getStrapiURL();
// Fields to populate from Strapi when fetching an image.
export const STRAPI_IMAGE_FIELDS = [
  'documentId',
  'alternativeText',
  'url',
  'name',
];

/* Frontend */
export const CURRENCY = 'KM';
export const CURRENCY_ISO = 'BAM';

export const MINIMUM_AMOUNT_FREE_DELIVERY = 400;
export const DELIVERY_COST = 0.1;

export const STORES = [
  { code: 'AT Store (SCC)', name: 'Sarajevo SCC' },
  { code: 'AT Store (ALTA)', name: 'Sarajevo Alta' },
  { code: 'AT Store (DELTA)', name: 'Banja Luka' },
] as const;

export type Store = (typeof STORES)[number];
export type StoreCode = Store['code'];
export type StoreName = Store['name'];

export const CONTACT_NUMBERS = {
  complaintsNumber: '+387 33 956 188',
};

export const CONTACT_EMAILS = {
  complaintsEmail: 'reklamacije@atstore.ba',
};

// The Google Maps API can return names and addresses using placeId, but the results don't match the design.
// They are hardcoded to match the design.
export const GOOGLE_MAPS_LOCATIONS = {
  SARAJEVO_ALTA: {
    placeId: 'ChIJH9KzTN_IWEcRuRRjxwD6vCc',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.998657953327!2d18.40413792653904!3d43.85585648929949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8df4cb3d21f%3A0x27bcfa00c76314b9!2sAT%20Store%20I%20Mono%20Apple%20Authorised%20Reseller%20-%20Alta!5e0!3m2!1sen!2sba!4v1744555667024!5m2!1sen!2sba',
    storeName: 'AT Store Alta',
    storeAddress: 'Franca Lehara 2, Sarajevo',
    storePostCode: '71000',
  },
  SARAJEVO_SCC: {
    placeId: 'ChIJIzR7EADJWEcRbc1hkL7OXmI',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.998657953327!2d18.40413792653904!3d43.85585648929949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c900107b3423%3A0x625ecebe9061cd6d!2sAT%20Store%20I%20Mono%20Apple%20Authorised%20Reseller%20-%20SCC!5e0!3m2!1sen!2sba!4v1744555723780!5m2!1sen!2sba',
    storeName: 'AT Store SCC',
    storeAddress: 'Vrbanja 1, Sarajevo',
    storePostCode: '71000',
  },
  BANJA_LUKA_DELTA: {
    placeId: 'ChIJyVPuVkYDXkcRHEpveWmgqN4',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.037585521767!2d17.204256776577544!3d44.78003907882575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475e034656ee53c9%3A0xdea8a069796f4a1c!2sAT%20Store%2C%20Delta%20Planet!5e0!3m2!1sen!2sba!4v1744555743654!5m2!1sen!2sba',
    storeName: 'AT Store Delta',
    storeAddress: 'Bulevar srpske vojske 8, Banja Luka',
    storePostCode: '78000',
  },
} as const;

// Organization Pre-invoice Related
export const AT_STORE_INFO = {
  logoUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/assets/images/logo-black.png`,
  name: 'AT STORE d.o.o.',
  address: 'Franca Lehara 2, 71000 Sarajevo',
  id: '4201813620006',
  pdv: '201813620006',
  registry: '065-0-Reg13-002173',
  website: 'www.atstore.ba',
  email: 'at@atstore.ba',
  phone: '+387 33 956 618',
  businessEmail: 'business@atstore.ba',
  bankAccounts: [
    { bank: 'Raiffeisen Bank', account: '1610000103890018' },
    { bank: 'ProCredit Bank', account: '1941410317500185' },
    { bank: 'UniCredit Bank', account: '3386902268310195' },
  ],
};

// Product Related
// The name of the category in the Strapi database, used for fetching products.It is the unique identifier for the category.
export const ACCESSORY_CATEGORY_NAME = 'dodaci';
export const ACCESSORY_CATEGORY_LINK = 'dodaci';
export const CART_KEY = 'cart';
