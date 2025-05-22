import { BlocksContent } from '@strapi/blocks-react-renderer';

import { OrderResponse } from '@/app/[locale]/(auth)/account/types';
import { ImageProps } from '@/lib/types';

import { StoreCode } from '../constants';

import { UserInformation } from './auth';

interface ProductResponse {
  id: number;
  documentId: string;
  productVariantId: string;
  productTypeId: string;
  name: string;
  displayName: string;
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
  subCategory?: SubCategoryItem;
  model?: ModelResponse;
  stores: StoreResponse[];
  amountInStock: number;
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
  updatedAt?: string | null;
}

interface StoreResponse {
  id: number;
  store: {
    id: number;
    name: StoreCode;
    documentId: string;
  };
  quantity: number;
}

interface IdentificationResponse {
  id: number;
  name: string;
}
interface ModelResponse {
  id: number;
  name: string;
  displayName?: string;
  icon?: ImageProps | null;
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

export interface CartResponse {
  items: ShoppingCartItem[];
}

interface ShoppingCartItem {
  id: number;
  product: ProductResponse;
  quantity: number;
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
  products?: ProductResponse[];
  subCategories?: SubCategoryItem[] | null;
  models?: ModelResponse[] | null;
  groupedSubCategories?: GroupedSubCategoryItem[] | null;
  updatedAt?: string | null;
}
interface SubCategoryItem extends CategoryItem {
  shortDescription: string | null;
  tag: string | null;
  navbarIcon: ImageProps | null;
}
interface GroupedSubCategoryItem {
  id: string;
  displayName: string;
  slug: string;
  sliderImages?: ImageProps[] | null;
  navbarIcon: ImageProps | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  category?: CategoryItem;
  subCategories?: SubCategoryItem[] | null;
  updatedAt?: string | null;
}

interface BestSellerItem {
  id: number;
  tagline: string;
  product: ProductResponse;
}

interface ProductStockResponse {
  productVariantId: string;
  amountInStock: number;
}

export type {
  BestSellerItem,
  CategoryItem,
  ColorResponse,
  ModelResponse,
  IdentificationResponse,
  InstallmentOption,
  MemoryResponse,
  ProductResponse,
  ShoppingCartItem,
  SubCategoryItem,
  GroupedSubCategoryItem,
  StoreResponse,
  ProductStockResponse,
};
