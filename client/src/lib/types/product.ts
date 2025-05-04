import { BlocksContent } from '@strapi/blocks-react-renderer';

import { OrderResponse } from '@/app/[locale]/(auth)/account/types';
import { ImageProps } from '@/lib/types';

import { UserInformation } from './auth';

interface ProductResponse {
  id: number;
  documentId: string;
  productVariantId: string;
  productTypeId: string;
  name: string;
  productLink: string;
  webAccountArticleName: string;
  description?: string | null;
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
  screenSize?: string;
  accessoriesType?: string;
  braceletSize?: string;
  details?: BlocksContent;
  ram?: MemoryResponse | null;
  chip?: IdentificationResponse | null;
  numberOfCores?: number | null;
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

interface ShoppingCartItem extends ProductResponse {
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
  link: string;
  startingPrice: number;
  image: ImageProps | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
}
interface SubCategoryItem extends CategoryItem {
  shortDescription: string | null;
  tag: string | null;
  navbarIcon: ImageProps | null;
}

interface BestSellerItem extends ProductResponse {
  tagline: string;
}

export type {
  ShoppingCartItem,
  CategoryItem,
  SubCategoryItem,
  BestSellerItem,
  InstallmentOption,
  ProductResponse,
  ColorResponse,
  MemoryResponse,
  IdentificationResponse,
};
