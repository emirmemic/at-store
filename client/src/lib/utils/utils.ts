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

function generateIdFromDate() {
  const now = new Date();

  const pad = (n: number) => n.toString().padStart(2, '0');

  const year = now.getFullYear().toString().slice(-2); // Last 2 digits
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hour = pad(now.getHours());
  const minute = pad(now.getMinutes());
  const randomPart = Math.floor(100 + Math.random() * 900);
  return `${year}${month}${day}-${hour}${minute}-${randomPart}`;
}

export { cn, getStrapiURL, getMonriUrl, generateIdFromDate };
