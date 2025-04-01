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
    label: t('accountPage.dashboard.title'),
    href: PAGE_NAMES.ACCOUNT_DASHBOARD,
    Icon: IconHome,
  },
  {
    id: 2,
    label: t('accountPage.orders.title'),
    href: PAGE_NAMES.ACCOUNT_ORDERS,
    Icon: IconShoppingCart,
  },
  {
    id: 3,
    label: t('accountPage.details.title'),
    href: PAGE_NAMES.ACCOUNT_DETAILS,
    Icon: IconSettings,
  },
  {
    id: 4,
    label: t('accountPage.paymentMethods.title'),
    href: PAGE_NAMES.ACCOUNT_PAYMENT_METHODS,
    Icon: IconWallet,
  },
  {
    id: 5,
    label: t('accountPage.favorites.title'),
    href: PAGE_NAMES.ACCOUNT_FAVORITES,
    Icon: IconHeart,
  },
  {
    id: 6,
    label: t('accountPage.newsletter.title'),
    href: PAGE_NAMES.ACCOUNT_NEWSLETTER,
    Icon: IconNews,
  },
];

export { getMenuItems };
