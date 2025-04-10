import { STORE_NAMES } from '@/lib/constants';
import { ImageProps } from '@/lib/types/base';

import { UserInformation } from './auth';

type StoreName = (typeof STORE_NAMES)[number];

interface ProductBase {
  id: number;
  product_variant_id: string;
  product_type_id: string;
  name: string;
  original_price: number;
  discounted_price: number | null;
  image: ImageProps | null;
  specifications?: string[];
  product_link?: string;
  description?: string;
  tag?: string | null;
  final_price: number;
  chip: {
    id: number;
    name: string;
  } | null;
  availability_by_store: Record<StoreName, number>;
  details?: string;
  favorited_by?: UserInformation[];
}

interface ShoppingCartItem extends ProductBase {
  quantity_in_cart: number;
}

export type { ProductBase, ShoppingCartItem };
