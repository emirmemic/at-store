import {
  macbookAirM3,
  iphone13,
  airpodsPro2,
  iphone14,
  macbookAir,
  iMac,
} from '@/assets/placeholder-images';
import { NavMenu, CartItem } from '@/components/nav-bar/types';
import { PAGE_NAMES } from '@/i18n/page-names';

const placeholderImage = macbookAir;
const placeholderImage2 = iMac;
const placeholderPage = PAGE_NAMES.PLACEHOLDER_CATEGORY_PAGE;
const navMenu: NavMenu[] = [
  {
    id: 1,
    label: 'Mac',
    href: PAGE_NAMES.MAC,
    subLinks: [
      {
        id: 1,
        label: 'MacBook Air',
        logo: placeholderImage,
        href: placeholderPage,
      },
      {
        id: 2,
        label: 'MacBook Pro',
        logo: placeholderImage2,
        href: placeholderPage,
      },
      {
        id: 3,
        label: 'iMac',
        logo: placeholderImage,
        href: placeholderPage,
      },
      {
        id: 4,
        label: 'Studio Display',
        logo: placeholderImage2,
        href: placeholderPage,
      },
      {
        id: 5,
        label: 'Mac Studio',
        logo: placeholderImage,
        href: placeholderPage,
      },
      {
        id: 6,
        label: 'Zašto Mac?',
        logo: placeholderImage2,
        href: placeholderPage,
      },
    ],
  },
  {
    id: 2,
    label: 'iPad',
    href: PAGE_NAMES.IPAD,
    subLinks: [
      {
        id: 1,
        label: 'iPad Pro',
        logo: placeholderImage2,
        href: placeholderPage,
      },
      {
        id: 2,
        label: 'iPad Air',
        logo: placeholderImage,
        href: placeholderPage,
      },
      {
        id: 3,
        label: 'iPad Mini',
        logo: placeholderImage2,
        href: placeholderPage,
      },
    ],
  },
  {
    id: 3,
    label: 'iPhone',
    href: PAGE_NAMES.IPHONE,
    subLinks: [
      {
        id: 1,
        label: 'iPhone 15 Pro',
        logo: placeholderImage,
        href: placeholderPage,
      },
      {
        id: 2,
        label: 'iPhone 15',
        logo: placeholderImage2,
        href: placeholderPage,
      },
      {
        id: 3,
        label: 'iPhone 14',
        logo: placeholderImage,
        href: placeholderPage,
      },
    ],
  },
  {
    id: 4,
    label: 'Apple Watch',
    href: PAGE_NAMES.WATCH,
    subLinks: [
      {
        id: 1,
        label: 'Apple Watch Series 8',
        logo: placeholderImage2,
        href: placeholderPage,
      },
      {
        id: 2,
        label: 'Apple Watch Ultra',
        logo: placeholderImage,
        href: placeholderPage,
      },
      {
        id: 3,
        label: 'Apple Watch SE',
        logo: placeholderImage,
        href: placeholderPage,
      },
    ],
  },
  {
    id: 5,
    label: 'AirPods',
    href: PAGE_NAMES.AIRPODS,
    subLinks: [
      {
        id: 1,
        label: 'AirPods Pro',
        logo: placeholderImage,
        href: placeholderPage,
      },
      {
        id: 2,
        label: 'AirPods Max',
        logo: placeholderImage2,
        href: placeholderPage,
      },
      {
        id: 3,
        label: 'AirPods Pro',
        logo: placeholderImage,
        href: placeholderPage,
      },
    ],
  },
  {
    id: 6,
    label: 'Dodaci',
    href: PAGE_NAMES.ACCESSORIES,
    subLinks: [
      {
        id: 1,
        label: 'Iphone dodaci',
        logo: placeholderImage,
        href: placeholderPage,
      },
      {
        id: 2,
        label: 'Futrole',
        logo: placeholderImage2,
        href: placeholderPage,
      },
      {
        id: 3,
        label: 'iPad dodaci',
        logo: placeholderImage,
        href: placeholderPage,
      },
      {
        id: 4,
        label: 'Apple Watch dodaci',
        logo: placeholderImage2,
        href: placeholderPage,
      },
      {
        id: 5,
        label: 'Apple TV',
        logo: placeholderImage,
        href: placeholderPage,
      },
    ],
  },
  {
    id: 7,
    label: 'Podrška',
    href: PAGE_NAMES.ACCESSORIES,
  },
];
const placeholderCart: CartItem[] = [
  {
    id: 1,
    name: 'iPhone 13',
    price: '1239 KM',
    image: iphone13,
  },
  {
    id: 2,
    name: 'MacBook Air M3',
    price: '2969 KM',
    image: macbookAirM3,
  },
  {
    id: 3,
    name: 'iPhone 14',
    price: '1469 KM',
    image: iphone14,
  },
  {
    id: 4,
    name: 'AirPods Pro 2',
    price: '589 KM',
    image: airpodsPro2,
  },
  {
    id: 5,
    name: 'iPhone 13',
    price: '1239 KM',
    image: iphone13,
  },
  {
    id: 6,
    name: 'MacBook Air M3',
    price: '2969 KM',
    image: macbookAirM3,
  },
  {
    id: 7,
    name: 'iPhone 14',
    price: '1469 KM',
    image: iphone14,
  },
  {
    id: 8,
    name: 'AirPods Pro 2',
    price: '589 KM',
    image: airpodsPro2,
  },
];

export { placeholderCart, navMenu };
