import { PromoCardItem } from '@/app/[locale]/(home-page)/components/promo-cards/types';
import { ActionLinkResponse } from '@/lib/types';

interface HeroSliderItem {
  id: number;
  media: {
    id: number;
    url: string;
    alternativeText?: string;
    mime: string;
  };
  placeholderImage?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  actionLink: ActionLinkResponse;
}
interface HeroSectionResponse {
  id: number;
  enableAutoplay: boolean;
  autoplayDelay: number;
  sliderItems: HeroSliderItem[];
}

interface HomepageResponse {
  data: {
    title: string;
    description?: string;
    promoCards: Array<PromoCardItem> | null;
    heroSection: HeroSectionResponse | null;
  };
}
export type { HomepageResponse, HeroSectionResponse, HeroSliderItem };
