import {
  ActionLinkResponse,
  FeaturedProductsResponse,
  ImageProps,
} from '@/lib/types';

export interface EducationalPageResponse {
  data: {
    featuredProducts: FeaturedProductsResponse | null;
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
