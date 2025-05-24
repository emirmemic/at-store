import type { MetadataRoute } from 'next';

import { PAGE_NAMES } from '@/i18n/page-names';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        PAGE_NAMES.CHECKOUT,
        PAGE_NAMES.CHECKOUT_PAYMENT,
        PAGE_NAMES.CHECKOUT_SUCCESS,
        PAGE_NAMES.ACCOUNT,
        PAGE_NAMES.ACCOUNT_DASHBOARD,
        PAGE_NAMES.ACCOUNT_ORDERS,
        PAGE_NAMES.ACCOUNT_DETAILS,
        PAGE_NAMES.ACCOUNT_FAVORITES,
        PAGE_NAMES.ACCOUNT_NEWSLETTER,
        PAGE_NAMES.NEWSLETTER_UNSUBSCRIBE,
        PAGE_NAMES.FORGOT_PASSWORD,
        PAGE_NAMES.RESET_PASSWORD,
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sitemap.xml`,
  };
}
