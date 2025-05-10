import { ActionLinkResponse, ImageProps } from '@/lib/types';

export interface NewsPageResponse {
  data: {
    latestProducts: ProductItem[] | null;
    hotItem: HotItem | null;
  };
}
export interface ProductItem {
  title: string;
  description: string;
  image: ImageProps | null;
  index: number;
  id: number;
}
export interface HotItem {
  title: string;
  productImage: ImageProps | null;
  id: number;
  caption: string;
  actionLink?: ActionLinkResponse | null;
}
