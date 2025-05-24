import { ProductResponse } from '@/lib/types';

export interface WhyMacPageResponse {
  data: {
    featuredProducts: {
      sectionTitle: string;
      products: ProductResponse[];
    } | null;
  };
}
