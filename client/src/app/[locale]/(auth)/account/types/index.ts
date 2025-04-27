import { Pathname } from '@/i18n/routing';
import { Icon, ProductBase } from '@/lib/types';

interface AccountMenu {
  id: number;
  label: string;
  href: Pathname;
  Icon: Icon;
}

export type OrderStatusEnum = 'pending' | 'delivered' | 'canceled' | 'shipped';
interface OrderResponse {
  id: number;
  products: ProductBase[];
  orderStatus: OrderStatusEnum;
  orderNumber: number;
  orderDate: string;
}
interface PaymentMethodResponse {
  id: number;
  documentId: string;
  nameAndSurname: string;
  cardNumber: string;
  expirationDate: string;
}

export type { AccountMenu, OrderResponse, PaymentMethodResponse };
