import { PAGE_NAMES } from '@/i18n/page-names';
import { CURRENCY, DELIVERY_FREE_MINIMUM } from '@/lib/constants';

export const getInfoBlocksData = (
  t: (
    key: string,
    options?: Record<string, string | number | boolean>
  ) => string
) => [
  {
    id: 1,
    title: t('productPage.favoritesTitle'),
    actionLink: {
      id: 1,
      linkUrl: PAGE_NAMES.ACCOUNT_FAVORITES,
    },
    isFavorites: true,
    description: t('productPage.favoritesDescription'),
  },
  {
    id: 2,
    title: t('productPage.paymentTitle'),
    description: t('productPage.paymentDescription'),
    actionLink: {
      id: 2,
      linkUrl: PAGE_NAMES.PAYMENT_METHODS,
    },
  },
  {
    id: 3,
    title: t('productPage.deliveryTitle'),
    description: t('productPage.deliveryDescription', {
      price: `${DELIVERY_FREE_MINIMUM} ${CURRENCY}`,
    }),
  },
];
