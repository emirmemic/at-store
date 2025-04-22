import { ProductBase } from './product';

interface AuthError {
  message: string;
  field?: string;
}

interface OrderResponse {
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
  orders: OrderResponse[];
  favoriteProducts: ProductBase[];
}

interface AuthResponse {
  jwt: string;
  user: UserInformation;
}

type OrderStatusEnum = 'pending' | 'delivered' | 'canceled' | 'shipped';
type OAuthProvider = 'google' | 'facebook' | 'apple';

export type {
  AuthError,
  AuthResponse,
  OAuthProvider,
  OrderStatusEnum,
  UserInformation,
  OrderResponse,
};
