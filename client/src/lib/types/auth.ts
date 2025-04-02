import { ProductBase } from './product';

interface AuthError {
  message: string;
  field?: string;
}

interface Order {
  id: number;
  products: ProductBase[];
  orderStatus: OrderStatusEnum;
  orderNumber: number;
  orderDate: string;
}

interface UserInformation {
  id: number;
  documentId: string;
  username: string;
  email: string;
  orders: Order[];
}

interface AuthResponse {
  jwt: string;
  user: UserInformation;
}

type OrderStatusEnum = 'pending' | 'delivered' | 'canceled' | 'shipped';

export type { AuthError, AuthResponse, UserInformation, OrderStatusEnum };
