import { ImageProps } from '@/lib/types/base';

interface ProductType {
  product_variant_id: string;
  product_type_id: string;
  name: string;
  original_price: number;
  discounted_price: number | null;
  image: ImageProps;
  specifications?: string[];
  product_link: string;
  description?: string;
  promotional_tagline?: string;
  is_favorite: boolean;
  tag?: string | null;
}

export type { ProductType };
