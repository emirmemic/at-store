import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL;
}

export { cn, getStrapiURL };
