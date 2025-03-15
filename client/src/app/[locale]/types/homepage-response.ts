import { PromoCardProps } from '@/app/components/promo-card';

export interface HomepageResponse {
  data: {
    title: string;
    description?: string;
    promo_cards: Array<PromoCardProps> | null;
  };
}
