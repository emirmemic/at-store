import {
  IconHeart,
  IconHome,
  IconNews,
  IconSettings,
  IconShoppingCart,
  IconWallet,
} from '@/components/icons';
import { PAGE_NAMES } from '@/i18n/page-names';
import { LocalizationKey } from '@/lib/types';

import { AccountMenu } from './types';

const getMenuItems = (t: LocalizationKey): AccountMenu[] => [
  {
    id: 1,
    label: t('dashboard.title'),
    href: PAGE_NAMES.ACCOUNT_DASHBOARD,
    Icon: IconHome,
  },
  {
    id: 2,
    label: t('orders.title'),
    href: PAGE_NAMES.ACCOUNT_ORDERS,
    Icon: IconShoppingCart,
  },
  {
    id: 3,
    label: t('details.title'),
    href: PAGE_NAMES.ACCOUNT_DETAILS,
    Icon: IconSettings,
  },
  {
    id: 4,
    label: t('paymentMethods.title'),
    href: PAGE_NAMES.ACCOUNT_PAYMENT_METHODS,
    Icon: IconWallet,
  },
  {
    id: 5,
    label: t('favorites.title'),
    href: PAGE_NAMES.ACCOUNT_FAVORITES,
    Icon: IconHeart,
  },
  {
    id: 6,
    label: t('newsletter.title'),
    href: PAGE_NAMES.ACCOUNT_NEWSLETTER,
    Icon: IconNews,
  },
];

export { getMenuItems };
