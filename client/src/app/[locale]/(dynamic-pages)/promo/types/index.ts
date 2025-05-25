import { FeaturedProductsResponse, InfoBlockResponse } from '@/lib/types';

export interface PromoPageResponseData {
  data: {
    infoBlock: InfoBlockResponse | null;
    featuredProducts: FeaturedProductsResponse | null;
  };
}
