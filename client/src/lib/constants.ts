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
export const DELIVERY_FREE_MINIMUM = 399;
export const STORE_NAMES = [
  'Sarajevo SCC',
  'Sarajevo Alta',
  'Banja Luka',
] as const;
export const CONTACT_NUMBERS = {
  complaintsNumber: '+387 33 956 188',
};

export const CONTACT_EMAILS = {
  complaintsEmail: 'reklamacije@atstore.ba',
};
