import { PromotionalFlipCardResponse } from '@/lib/types';

export interface CurrentPromotionsResponse {
  data: {
    sectionTitle: string;
    flipCards: PromotionalFlipCardResponse[];
  };
}
