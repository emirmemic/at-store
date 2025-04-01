import { ProductBase } from './product';

interface AuthError {
  message: string;
  field?: string;
}

interface Order {
  id: number;
  products: ProductBase[];
  orderStatus: string;
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

export type { AuthError, AuthResponse, UserInformation };
