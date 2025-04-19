import { InfoBlockResponse } from '@/lib/types';

export interface PromoPageResponseData {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    infoBlock: InfoBlockResponse | null;
  };
}
