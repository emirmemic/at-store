import { FeaturedProductsResponse } from '@/lib/types';

export interface WhyMacPageResponse {
  data: {
    featuredProducts: FeaturedProductsResponse | null;
  };
}
