import { getStrapiURL } from './utils/utils';

export const STRAPI_BASE_URL = getStrapiURL();
export const CURRENCY = 'KM';
export const STORE_NAMES = [
  'Sarajevo SCC',
  'Sarajevo Alta',
  'Banja Luka',
] as const;
