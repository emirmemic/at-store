import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStrapiURL() {
  return process.env.NODE_ENV === "production"
    ? process.env.STRAPI_API_URL
    : "http://localhost:1337";
}
