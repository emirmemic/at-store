import { InfoBlockResponse, ProductResponse } from '@/lib/types';

export interface PromoPageResponseData {
  data: {
    infoBlock: InfoBlockResponse | null;
    products: ProductResponse[] | null;
  };
}
