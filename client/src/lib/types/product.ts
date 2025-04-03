import { ImageProps } from '@/lib/types/base';

export const STORE_NAMES = [
  'Sarajevo SCC',
  'Sarajevo Alta',
  'Banja Luka',
] as const;
type StoreName = (typeof STORE_NAMES)[number];

interface ProductBase {
  id: number;
  product_variant_id: string;
  product_type_id: string;
  name: string;
  original_price: number;
  discounted_price: number | null;
  image: ImageProps;
  specifications?: string[];
  product_link?: string;
  description?: string;
  is_favorite: boolean;
  tag?: string | null;
  final_price: number;
  chip: {
    id: number;
    name: string;
  } | null;
  availability_by_store: Record<StoreName, number>;
}

interface ShoppingCartItem extends ProductBase {
  quantity_in_cart: number;
}

export type { ProductBase, ShoppingCartItem };
