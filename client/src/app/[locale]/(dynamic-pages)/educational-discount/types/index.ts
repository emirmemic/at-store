import { ActionLinkResponse, ImageProps, ProductResponse } from '@/lib/types';

export interface EducationalPageResponse {
  data: {
    product1: ProductResponse | null;
    product2: ProductResponse | null;
    product3: ProductResponse | null;
    chooseYourMac: ChooseYourMac | null;
  };
}

export interface ChooseYourMac {
  title: string;
  productImage: ImageProps | null;
  id: number;
  caption: string;
  actionLink?: ActionLinkResponse | null;
}
