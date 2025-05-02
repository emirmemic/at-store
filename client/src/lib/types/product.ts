import { BlocksContent } from '@strapi/blocks-react-renderer';

import { OrderResponse } from '@/app/[locale]/(auth)/account/types';
import { Pathname } from '@/i18n/routing';
import { STORE_NAMES } from '@/lib/constants';
import { ImageProps } from '@/lib/types';

import { UserInformation } from './auth';

type StoreName = (typeof STORE_NAMES)[number];

interface ProductResponse {
  id: number;
  documentId: string;
  productVariantId: string;
  productTypeId: string;
  name: string;
  productLink: string;
  webAccountArticleName: string;
  description?: string;
  images: ImageProps[] | null;
  order: OrderResponse;
  originalPrice: number;
  discountedPrice: number | null;
  tag?: string | null;
  favoritedBy?: UserInformation[];
  brand?: IdentificationResponse;
  category?: CategoryItem;
  model?: IdentificationResponse;
  stores: StoreResponse[];
  color?: ColorResponse;
  memory?: MemoryResponse;
  material?: string;
  ancModel?: string;
  keyboard?: string;
  wifiModel?: string;
  accessoriesType?: string;
  braceletSize?: string;
  details?: BlocksContent;
}

interface StoreResponse extends IdentificationResponse {
  products: number;
}

interface IdentificationResponse {
  id: number;
  name: string;
}

interface ColorResponse {
  id: number;
  name: string;
  hex: string;
}

interface MemoryResponse {
  id: number;
  value: number;
  unit: string;
}

interface ProductBase {
  id: number;
  documentId: string;
  productVariantId: string;
  productTypeId: string;
  name: string;
  originalPrice: number;
  discountedPrice: number | null;
  images?: ImageProps[];
  specifications?: string[];
  productLink: string;
  description?: string;
  tag?: string | null;
  availabilityByStore: Record<StoreName, number>;
  favoritedBy?: UserInformation[];
  details?: string;
  // TODO: WebAccount needs to return this!
  chip: {
    id: number;
    name: string;
  } | null;
}

interface ShoppingCartItem extends ProductBase {
  quantityInCart: number;
}

interface InstallmentOption {
  label: string;
  value: number;
}
interface CategoryItem {
  id: string;
  documentId: string;
  name: string;
  displayName: string;
  link: Pathname;
  startingPrice: number;
  image: ImageProps | null;
}
interface SubCategoryItem extends CategoryItem {
  shortDescription: string | null;
  tag: string | null;
  navbarIcon: ImageProps | null;
}

interface AccessorySliderItem {
  id: string;
  tagline?: string;
  title: string;
  description: string;
  priceText: string;
  image: ImageProps;
  actionLink: Pathname;
}

interface BestSellerItem extends ProductBase {
  tagline: string;
}

export type {
  ProductBase,
  ShoppingCartItem,
  CategoryItem,
  SubCategoryItem,
  AccessorySliderItem,
  BestSellerItem,
  InstallmentOption,
  ProductResponse,
  ColorResponse,
  IdentificationResponse,
};
