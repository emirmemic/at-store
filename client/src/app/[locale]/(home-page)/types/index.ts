import { ActionLinkResponse } from '@/lib/types';
import { PromoCardItem } from '@/app/[locale]/(home-page)/components/promo-cards/types';

interface HeroSliderItem {
  id: number;
  media: {
    id: number;
    url: string;
    alternativeText?: string;
    mime: string;
  };
  mobileMedia?: {
    id: number;
    url: string;
    alternativeText?: string;
    mime: string;
  } | null;
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

interface SpecialBannerResponse {
  id: number;
  image: {
    id: number;
    url: string;
    alternativeText: string | null;
  };
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
}

interface HomepageResponse {
  data: {
    title: string;
    description?: string;
    specialBanner: SpecialBannerResponse | null;
    promoCards: Array<PromoCardItem> | null;
    heroSection: HeroSectionResponse | null;
  };
}
export type {
  HomepageResponse,
  HeroSectionResponse,
  HeroSliderItem,
  SpecialBannerResponse,
};
