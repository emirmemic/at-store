import { Pathname } from '@/i18n/routing';
import { Icon, ProductResponse } from '@/lib/types';

interface AccountMenu {
  id: number;
  label: string;
  href: Pathname;
  Icon: Icon;
}

export type OrderStatusEnum = 'pending' | 'canceled' | 'completed';

interface OrderResponse {
  id: number;
  products: ProductResponse[];
  orderStatus: OrderStatusEnum;
  orderNumber: string;
  createdAt: string;
}

export type { AccountMenu, OrderResponse };
