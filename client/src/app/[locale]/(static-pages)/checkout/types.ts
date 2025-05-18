import { ImageProps } from '@/lib/types';

import { DeliveryMethod } from './page';

export interface OrderSuccessData {
  items: {
    name: string;
    image: ImageProps | null;
    price: number;
    quantity: number;
  }[];
  deliveryMethod: DeliveryMethod;
  orderNumber: string;
  totalPrice: number;
}
