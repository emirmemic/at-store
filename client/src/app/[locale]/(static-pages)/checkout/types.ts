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
  paymentMethod: PaymentMethod;
  orderNumber: string;
  totalPrice: number;
  isGift: boolean;
}

export type PaymentMethod = 'card' | 'cash';
