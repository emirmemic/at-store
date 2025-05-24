import { InfoBlockResponse, ProductResponse } from '@/lib/types';

export interface PromoPageResponseData {
  data: {
    infoBlock: InfoBlockResponse | null;
    featuredProducts: {
      sectionTitle: string;
      products: ProductResponse[];
    } | null;
  };
}
