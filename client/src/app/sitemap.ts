import type { MetadataRoute } from 'next';

import { PAGE_NAMES } from '@/i18n/pageNames';
import { routing, Pathname } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';

  // Extract all supported locales
  const locales = routing.locales;

  // Generate the sitemap entries dynamically
  const sitemapEntries: MetadataRoute.Sitemap = Object.values(
    PAGE_NAMES
  ).flatMap((path) => {
    return locales.map((locale) => {
      const localizedPath =
        routing.pathnames[path as Pathname]?.[locale] || path;

      return {
        url: `${siteUrl}${localizedPath}`,
        priority: path === '/' ? 1 : 0.8,
      };
    });
  });

  return sitemapEntries;
}
