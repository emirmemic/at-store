import { PromoCardProps } from '@/app/components';

export interface HomepageResponse {
  data: {
    title: string;
    description?: string;
    promo_cards: Array<PromoCardProps> | null;
  };
}
