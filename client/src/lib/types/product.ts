import { ImageProps } from '@/lib/types/base';

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
  promotional_tagline?: string;
  is_favorite: boolean;
  tag?: string | null;
  chip: {
    id: number;
    name: string;
  } | null;
}

export type { ProductBase };
