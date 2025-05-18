import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL;
}

function getMonriUrl() {
  const isProduction = process.env.NODE_ENV === 'production';
  return isProduction ? 'https://ipg.monri.com' : 'https://ipgtest.monri.com';
}

export { cn, getStrapiURL, getMonriUrl };
