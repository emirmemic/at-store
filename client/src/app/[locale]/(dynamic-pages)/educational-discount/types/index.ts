import { ActionLinkResponse, ImageProps, ProductResponse } from '@/lib/types';

export interface EducationalPageResponse {
  data: {
    featuredProducts: {
      sectionTitle: string;
      products: ProductResponse[];
    } | null;
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
