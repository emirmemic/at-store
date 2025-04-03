import {
  airPodsPro2,
  display,
  iMac,
  iphone13,
  iphone13ClearCase,
  macBookAir,
  macBookAirM3,
  macBookPro,
  macMini,
} from '@/assets/placeholder-images';
import { NavMenuItem } from '@/components/nav-bar/types';
import { PAGE_NAMES } from '@/i18n/page-names';
import { ShoppingCartItem, ProductBase } from '@/lib/types';

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
        logo: macBookAir,
        href: PAGE_NAMES.MAC,
      },
      {
        id: 2,
        label: 'MacBook Pro',
        logo: macBookPro,
        href: PAGE_NAMES.MAC,
      },
      {
        id: 3,
        label: 'Mac Mini',
        logo: macMini,
        href: PAGE_NAMES.MAC,
      },
      {
        id: 4,
        label: 'iMac',
        logo: iMac,
        href: PAGE_NAMES.MAC,
      },
      {
        id: 5,
        label: 'Studio Display',
        logo: display,
        href: PAGE_NAMES.MAC,
      },
      {
        id: 6,
        label: 'Zašto Mac?',
        href: PAGE_NAMES.MAC,
      },
      {
        id: 7,
        label: 'Pogledaj sve Mac',
        href: PAGE_NAMES.MAC,
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
      {
        id: 4,
        label: 'Pogledaj sve iPad',
        href: PAGE_NAMES.IPAD,
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
      {
        id: 5,
        label: 'Pogledaj sve iPhone',
        href: PAGE_NAMES.IPHONE,
      },
    ],
  },
  {
    id: 4,
    label: 'Watch',
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
      {
        id: 5,
        label: 'Pogledaj sve Apple Watch',
        href: PAGE_NAMES.WATCH,
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
      {
        id: 5,
        label: 'Pogledaj sve AirPods',
        href: PAGE_NAMES.AIRPODS,
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
        href: PAGE_NAMES.ACCESSORIES,
      },
      {
        id: 2,
        label: 'Futrole',
        logo: placeholderImage2,
        href: PAGE_NAMES.ACCESSORIES,
      },
      {
        id: 3,
        label: 'iPad dodaci',
        logo: placeholderImage,
        href: PAGE_NAMES.ACCESSORIES,
      },
      {
        id: 4,
        label: 'Apple Watch dodaci',
        logo: placeholderImage2,
        href: PAGE_NAMES.ACCESSORIES,
      },
      {
        id: 5,
        label: 'Apple TV',
        logo: placeholderImage,
        href: PAGE_NAMES.ACCESSORIES,
      },
      {
        id: 7,
        label: 'Pogledaj sve dodatke',
        href: PAGE_NAMES.ACCESSORIES,
      },
    ],
  },
  {
    id: 7,
    label: 'Podrška',
    href: PAGE_NAMES.SUPPORT,
  },
];

const dummyProducts: ProductBase[] = [
  {
    id: 1,
    product_variant_id: 'macbook-air-m3-256gb-13inch',
    product_type_id: 'laptop',
    name: 'MacBook Air',
    original_price: 3199,
    discounted_price: 2969,
    final_price: 2969,
    image: {
      id: 1,
      documentId: 'macbook-air-m3-256gb-13inch-image',
      url: macBookAirM3.src,
      alternativeText: 'MacBook Air M3 13-inch',
    },
    specifications: ['13-inch', '256GB', '8GB unified', '8C CPU, 8C GPU'],
    is_favorite: false,
    tag: 'Akcija',
    chip: {
      id: 1,
      name: 'M3',
    },
    availability_by_store: {
      'Sarajevo SCC': 5,
      'Sarajevo Alta': 3,
      'Banja Luka': 2,
    },
  },
  {
    id: 2,
    product_variant_id: 'iphone-13-128gb-white',
    product_type_id: 'smartphone',
    name: 'iPhone 13',
    original_price: 2699,
    discounted_price: 1239,
    final_price: 1239,
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
    is_favorite: true,
    tag: null,
    chip: null,
    availability_by_store: {
      'Sarajevo SCC': 10,
      'Sarajevo Alta': 8,
      'Banja Luka': 5,
    },
    details: `
    <p><strong>Zaslon:</strong> Super Retina XDR</p>
    <p><strong>Kapaciteti:</strong> 128 GB, 256 GB, 512 GB</p>
    <p><strong>Čip:</strong> A15 Bionic</p>

    <h3>Boja</h3>
    <ul>
      <li>(PRODUCT)RED</li>
      <li>Zvjezdano bijela</li>
      <li>Ponoćno crna</li>
      <li>Plava</li>
      <li>Ružičasta</li>
      <li>Zelena</li>
    </ul>

    <h3>Specifikacije</h3>
    <ol>
      <li>6,1-inčni (dijagonalno) OLED zaslon od ruba do ruba</li>
      <li>Sustav s dvije kamere od 12 MP</li>
      <li>6-jezgreni procesor (2 performanse + 4 učinkovitost)</li>
      <li>Dugi vijek trajanja baterije</li>
      <li>iOS podrška s redovitim ažuriranjima</li>
    </ol>`,
  },
  {
    id: 3,
    product_variant_id: 'iphone13ClearCase',
    product_type_id: 'accessory',
    name: 'iPhone 13 Clear Case',
    original_price: 199,
    discounted_price: 139,
    final_price: 139,
    image: {
      id: 3,
      documentId: 'iphone-13-clear-case-image',
      url: iphone13ClearCase.src,
      alternativeText: 'iPhone 13 Clear Case',
    },
    specifications: ['iPhone 13', 'Futrola', 'Clear case', 'Apple'],
    is_favorite: false,
    tag: 'Novo',
    chip: null,
    availability_by_store: {
      'Sarajevo SCC': 0,
      'Sarajevo Alta': 1,
      'Banja Luka': 0,
    },
  },
];
const dummyMacProducts: ProductBase[] = [
  {
    id: 1,
    product_variant_id: 'macbook-air-m2-512gb-15inch',
    product_type_id: 'laptop',
    name: 'MacBook Air M2',
    original_price: 3799,
    discounted_price: 3499,
    final_price: 3499,
    image: {
      id: 1,
      documentId: 'macbook-air-m2-512gb-15inch-image',
      url: macBookAirM3.src,
      alternativeText: 'MacBook Air M2 15-inch',
    },
    specifications: ['15-inch', '512GB', '8GB unified', '8C CPU, 10C GPU'],
    is_favorite: true,
    tag: 'Novo',
    chip: {
      id: 1,
      name: 'M2',
    },
    availability_by_store: {
      'Sarajevo SCC': 5,
      'Sarajevo Alta': 3,
      'Banja Luka': 2,
    },
  },
  {
    id: 2,
    product_variant_id: 'macbook-pro-m3max-1tb-16inch',
    product_type_id: 'laptop',
    name: 'MacBook Pro M3 Max',
    original_price: 7999,
    discounted_price: 7499,
    final_price: 7499,
    image: {
      id: 2,
      documentId: 'macbook-pro-m3max-1tb-16inch-image',
      url: macBookAirM3.src,
      alternativeText: 'MacBook Pro M3 Max 16-inch',
    },
    specifications: ['16-inch', '1TB', '36GB unified', '12C CPU, 38C GPU'],
    is_favorite: false,
    tag: 'Akcija',
    chip: {
      id: 2,
      name: 'M3 Max',
    },
    availability_by_store: {
      'Sarajevo SCC': 0,
      'Sarajevo Alta': 1,
      'Banja Luka': 0,
    },
  },
  {
    id: 3,
    product_variant_id: 'mac-mini-m2-512gb',
    product_type_id: 'desktop',
    name: 'Mac Mini M2',
    original_price: 1899,
    discounted_price: 1599,
    final_price: 1599,
    image: {
      id: 3,
      documentId: 'mac-mini-m2-512gb-image',
      url: macBookAirM3.src,
      alternativeText: 'Mac Mini M2',
    },
    specifications: ['512GB', '8C CPU, 10C GPU', '16GB unified'],
    is_favorite: false,
    tag: 'Novo',
    chip: {
      id: 1,
      name: 'M2',
    },
    availability_by_store: {
      'Sarajevo SCC': 3,
      'Sarajevo Alta': 2,
      'Banja Luka': 1,
    },
  },
  {
    id: 4,
    product_variant_id: 'macbook-pro-m2-1tb-14inch',
    product_type_id: 'laptop',
    name: 'MacBook Pro M2',
    original_price: 2499,
    discounted_price: 2299,
    final_price: 2299,
    image: {
      id: 4,
      documentId: 'macbook-pro-m2-1tb-14inch-image',
      url: macBookAirM3.src,
      alternativeText: 'MacBook Pro M2 14-inch',
    },
    specifications: ['14-inch', '1TB', '16GB unified', '8C CPU, 14C GPU'],
    is_favorite: true,
    tag: 'Novo',
    chip: {
      id: 2,
      name: 'M2',
    },
    availability_by_store: {
      'Sarajevo SCC': 2,
      'Sarajevo Alta': 1,
      'Banja Luka': 0,
    },
  },
  {
    id: 5,
    product_variant_id: 'imac-m2-24inch',
    product_type_id: 'desktop',
    name: 'iMac M2',
    original_price: 2499,
    discounted_price: 2299,
    final_price: 2299,
    image: {
      id: 5,
      documentId: 'imac-m2-24inch-image',
      url: macBookAirM3.src,
      alternativeText: 'iMac M2 24-inch',
    },
    specifications: ['24-inch', '8C CPU, 10C GPU', '16GB unified'],
    is_favorite: false,
    tag: null,
    chip: {
      id: 1,
      name: 'M2',
    },
    availability_by_store: {
      'Sarajevo SCC': 4,
      'Sarajevo Alta': 3,
      'Banja Luka': 2,
    },
  },
  {
    id: 6,
    product_variant_id: 'studio-display-27inch',
    product_type_id: 'monitor',
    name: 'Studio Display',
    original_price: 1799,
    discounted_price: 1599,
    final_price: 1599,
    image: {
      id: 6,
      documentId: 'studio-display-27inch-image',
      url: macBookAirM3.src,
      alternativeText: 'Studio Display 27-inch',
    },
    specifications: ['27-inch', '5K Retina', 'P3 wide color'],
    is_favorite: false,
    tag: null,
    chip: null,
    availability_by_store: {
      'Sarajevo SCC': 1,
      'Sarajevo Alta': 0,
      'Banja Luka': 0,
    },
  },
  {
    id: 7,
    product_variant_id: 'new-product-id',
    product_type_id: 'new-type',
    name: 'New Product Name',
    original_price: 999,
    discounted_price: 899,
    final_price: 899,
    image: {
      id: 7,
      documentId: 'new-product-image',
      url: macBookAirM3.src,
      alternativeText: 'New Product',
    },
    specifications: ['New Spec 1', 'New Spec 2'],
    is_favorite: false,
    tag: 'Novo',
    chip: {
      id: 3,
      name: 'M3',
    },
    availability_by_store: {
      'Sarajevo SCC': 5,
      'Sarajevo Alta': 3,
      'Banja Luka': 2,
    },
  },
  {
    id: 8,
    product_variant_id: 'macbook-pro-m2-1tb-16inch',
    product_type_id: 'laptop',
    name: 'MacBook Pro M2',
    original_price: 2999,
    discounted_price: 2799,
    final_price: 2799,
    image: {
      id: 8,
      documentId: 'macbook-pro-m2-1tb-16inch-image',
      url: macBookAirM3.src,
      alternativeText: 'MacBook Pro M2 16-inch',
    },
    specifications: ['16-inch', '1TB', '32GB unified', '10C CPU, 16C GPU'],
    is_favorite: false,
    tag: null,
    chip: {
      id: 2,
      name: 'M2',
    },
    availability_by_store: {
      'Sarajevo SCC': 2,
      'Sarajevo Alta': 1,
      'Banja Luka': 0,
    },
  },
];
const dummyAccessories: ProductBase[] = [
  {
    id: 1,
    product_variant_id: 'airpods-pro-2',
    product_type_id: 'accessory',
    name: 'AirPods Pro 2',
    original_price: 649,
    discounted_price: 589,
    final_price: 589,
    image: {
      id: 9,
      documentId: 'airpods-pro-2-image',
      url: airPodsPro2.src,
      alternativeText: 'AirPods Pro 2',
    },
    specifications: [
      'Active Noise Cancellation',
      'Transparency mode',
      'Spatial audio',
      'Apple',
    ],
    is_favorite: false,
    tag: null,
    chip: {
      id: 1,
      name: 'M2',
    },
    availability_by_store: {
      'Sarajevo SCC': 5,
      'Sarajevo Alta': 3,
      'Banja Luka': 2,
    },
  },
  {
    id: 2,
    product_variant_id: 'iphone-14-clear-case',
    product_type_id: 'accessory',
    name: 'iPhone 14 Clear Case',
    original_price: 199,
    discounted_price: 139,
    final_price: 139,
    image: {
      id: 10,
      documentId: 'iphone-14-clear-case-image',
      url: iphone13ClearCase.src,
      alternativeText: 'iPhone 14 Clear Case',
    },
    specifications: ['iPhone 14', 'Futrola', 'Clear case', 'Apple'],
    is_favorite: false,
    tag: null,
    chip: null,
    availability_by_store: {
      'Sarajevo SCC': 0,
      'Sarajevo Alta': 1,
      'Banja Luka': 0,
    },
  },
  {
    id: 3,
    product_variant_id: 'airpods-max',
    product_type_id: 'accessory',
    name: 'AirPods Max',
    original_price: 649,
    discounted_price: 589,
    final_price: 589,
    image: {
      id: 11,
      documentId: 'airpods-max-image',
      url: airPodsPro2.src,
      alternativeText: 'AirPods Max',
    },
    specifications: [
      'Active Noise Cancellation',
      'Transparency mode',
      'Spatial audio',
      'Apple',
    ],
    is_favorite: false,
    tag: null,
    chip: {
      id: 1,
      name: 'M2',
    },
    availability_by_store: {
      'Sarajevo SCC': 5,
      'Sarajevo Alta': 3,
      'Banja Luka': 2,
    },
  },
  {
    id: 4,
    product_variant_id: 'iphone-14-case',
    product_type_id: 'accessory',
    name: 'iPhone 14 Case',
    original_price: 199,
    discounted_price: 139,
    final_price: 139,
    image: {
      id: 12,
      documentId: 'iphone-14-case-image',
      url: iphone13ClearCase.src,
      alternativeText: 'iPhone 14 Case',
    },
    specifications: ['iPhone 14', 'Futrola', 'Apple'],
    is_favorite: false,
    tag: null,
    chip: null,
    availability_by_store: {
      'Sarajevo SCC': 0,
      'Sarajevo Alta': 1,
      'Banja Luka': 0,
    },
  },
  {
    id: 5,
    product_variant_id: 'macbook-air-case',
    product_type_id: 'accessory',
    name: 'MacBook Air Case',
    original_price: 199,
    discounted_price: 139,
    final_price: 139,
    image: {
      id: 13,
      documentId: 'macbook-air-case-image',
      url: macBookAir.src,
      alternativeText: 'MacBook Air Case',
    },
    specifications: ['MacBook Air', 'Futrola', 'Apple'],
    is_favorite: false,
    tag: null,
    chip: null,
    availability_by_store: {
      'Sarajevo SCC': 0,
      'Sarajevo Alta': 1,
      'Banja Luka': 0,
    },
  },
  {
    id: 6,
    product_variant_id: 'macbook-pro-case',
    product_type_id: 'accessory',
    name: 'MacBook Pro Case',
    original_price: 199,
    discounted_price: 139,
    final_price: 139,
    image: {
      id: 14,
      documentId: 'macbook-pro-case-image',
      url: macBookPro.src,
      alternativeText: 'MacBook Pro Case',
    },
    specifications: ['MacBook Pro', 'Futrola', 'Apple'],
    is_favorite: false,
    tag: null,
    chip: null,
    availability_by_store: {
      'Sarajevo SCC': 0,
      'Sarajevo Alta': 1,
      'Banja Luka': 0,
    },
  },
];
const placeholderCart: ShoppingCartItem[] = [
  {
    ...dummyProducts[0],
    quantity_in_cart: 1,
  },
  {
    ...dummyProducts[1],
    quantity_in_cart: 2,
  },
  {
    ...dummyProducts[2],
    quantity_in_cart: 1,
  },
  {
    ...dummyAccessories[2],
    quantity_in_cart: 1,
  },
];

export {
  dummyAccessories,
  dummyMacProducts,
  dummyProducts,
  navMenu,
  placeholderCart,
};
