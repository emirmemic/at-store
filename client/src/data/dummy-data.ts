import {
  macBookAirM3,
  iphone13,
  airPodsPro2,
  iphone14,
  macBookAir,
  iMac,
  iphone13ClearCase,
} from '@/assets/placeholder-images';
import { NavMenuItem, CartItem } from '@/components/nav-bar/types';
import { PAGE_NAMES } from '@/i18n/page-names';
import { ProductBase } from '@/lib/types';

const placeholderImage = macBookAir;
const placeholderImage2 = iMac;
const placeholderPage = PAGE_NAMES.PLACEHOLDER_CATEGORY_PAGE;
const navMenu: NavMenuItem[] = [
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
    image: macBookAirM3,
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
    image: airPodsPro2,
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
    image: macBookAirM3,
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
    image: airPodsPro2,
  },
];

const dummyProducts: ProductBase[] = [
  {
    product_variant_id: 'macbook-air-m3-256gb-13inch',
    product_type_id: 'laptop',
    name: 'MacBook Air M3',
    original_price: 3199,
    discounted_price: 2969,
    image: {
      id: 1,
      documentId: 'macbook-air-m3-256gb-13inch-image',
      url: macBookAirM3.src,
      alternativeText: 'MacBook Air M3 13-inch',
    },
    specifications: ['13-inch', '256GB', '8GB unified', '8C CPU, 8C GPU'],
    promotional_tagline: 'Novo',
    is_favorite: false,
    tag: 'Akcija',
    product_link: '/mac/macbook-air-m3',
  },
  {
    product_variant_id: 'iphone-13-128gb-white',
    product_type_id: 'smartphone',
    name: 'iPhone 13',
    original_price: 2699,
    discounted_price: 1239,
    image: {
      id: 2,
      documentId: 'iphone-13-128gb-white-image',
      url: iphone13.src,
      alternativeText: 'iPhone 13 128GB White',
    },
    specifications: [
      '128GB',
      '6.1-inch',
      'A15 Bionic chip',
      'Dual 12MP camera system',
      'Face ID',
      'Ceramic Shield',
      '5G capable',
    ],
    promotional_tagline: 'Akcija - 35% popusta',
    is_favorite: true,
    tag: null,
    product_link: '/mac/iphone-13',
  },
  {
    product_variant_id: 'iphone13ClearCase',
    product_type_id: 'accessory',
    name: 'iPhone 13 Clear Case',
    original_price: 199,
    discounted_price: 139,
    image: {
      id: 3,
      documentId: 'iphone-13-clear-case-image',
      url: iphone13ClearCase.src,
      alternativeText: 'iPhone 13 Clear Case',
    },
    specifications: ['iPhone 13', 'Futrola', 'Clear case', 'Apple'],
    promotional_tagline: 'Zaštitite svoj iPhone 13',
    is_favorite: false,
    tag: 'Novo',
    product_link: '/dodaci/iphone-13-clear-case',
  },
];

export { placeholderCart, navMenu, dummyProducts };
