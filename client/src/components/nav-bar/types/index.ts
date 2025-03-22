import { StaticImageData } from 'next/image';

import { Pathname } from '@/i18n/routing';

interface LinkProps {
  id: number;
  label: string;
  href: Pathname;
  isExternal: boolean;
  subLinks?: Array<LinkProps>;
}

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

enum PopupType {
  NONE = 'none',
  MENU = 'menu',
  SEARCH = 'search',
}
interface CartItem {
  id: number;
  name: string;
  price: string;
  image: StaticImageData;
}

export type { LinkProps, NavMenu, NavMenuSubLink, CartItem };
export { PopupType };
