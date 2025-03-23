import { StaticImageData } from 'next/image';

import { Pathname } from '@/i18n/routing';

interface NavMenuSubLink {
  id: number;
  label: string;
  logo: string;
  href: Pathname;
}
interface NavMenu {
  id: number;
  label: string;
  href: Pathname;
  subLinks?: NavMenuSubLink[];
}
const POPUP_TYPES = ['none', 'menu', 'search'] as const;
type PopupType = (typeof POPUP_TYPES)[number];

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: StaticImageData;
}

export type { NavMenu, NavMenuSubLink, CartItem, PopupType };
