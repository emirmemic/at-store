import { DeliveryMethod } from './page';
import { ImageProps } from '@/lib/types';

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
  orderToken: string;
  totalPrice: number;
  isGift: boolean;
}

export type PaymentMethod = 'card' | 'cash' | 'virman';
