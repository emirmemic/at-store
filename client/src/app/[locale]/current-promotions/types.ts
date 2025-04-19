import { PromotionalFlipCardResponse } from '@/lib/types';

export interface CurrentPromotionsResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    sectionTitle: string;
    flipCards: PromotionalFlipCardResponse[];
  };
}
