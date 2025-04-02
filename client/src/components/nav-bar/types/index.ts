import { StaticImageData } from 'next/image';

import { Pathname } from '@/i18n/routing';

interface NavSubLinkItem {
  id: number;
  label: string;
  logo?: StaticImageData;
  href: Pathname;
}
interface NavMenuItem {
  id: number;
  label: string;
  href: Pathname;
  subLinks?: NavSubLinkItem[];
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const POPUP_TYPES = ['none', 'menu', 'search'] as const;
type PopupType = (typeof POPUP_TYPES)[number];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MOBILE_MENU_TYPES = ['list', 'sub-list', 'search'] as const;
type MobileMenuType = (typeof MOBILE_MENU_TYPES)[number];

export type { NavMenuItem, NavSubLinkItem, PopupType, MobileMenuType };
