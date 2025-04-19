import { PromoSliderItemResponse } from '@/lib/types';

export interface PromoSliderResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    sliderItems: PromoSliderItemResponse[];
  };
}
