import { StaticImageData } from 'next/image';

import { Pathname } from '@/i18n/routing';

interface NavSubLinkItem {
  id: number;
  label: string;
  logo: StaticImageData;
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

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: StaticImageData;
}

export type { NavMenuItem, NavSubLinkItem, CartItem, PopupType };
