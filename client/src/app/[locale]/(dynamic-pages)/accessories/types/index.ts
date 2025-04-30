import {
  ColorResponse,
  IdentificationResponse,
  ProductResponse,
} from '@/lib/types';

export interface AccessoriesResponse {
  data: ProductResponse[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ColorsResponse {
  data: ColorResponse[];
}
export interface IdentificationsResponse {
  data: IdentificationResponse[];
}
