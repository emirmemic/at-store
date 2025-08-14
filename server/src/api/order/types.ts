import { StrapiProduct } from '../product/types';

export type StoreCode =
  | 'AT Store (SCC)'
  | 'AT Store (ALTA)'
  | 'AT Store (DELTA)';

export interface Order {
  orderNumber: string;
  address: {
    name: string;
    surname: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    phoneNumber: string;
    country: string;
    note?: string;
  };
  totalPrice: number;
  isGift: boolean;
  deliveryMethod: 'pickup' | 'delivery';
  deliveryPrice: number;
  paymentMethod: 'card' | 'cash';
  selectedStore: StoreCode | null;
  items: {
    productVariantId: string;
    productDocumentId: string;
    quantity: number;
    name: string;
  }[];
}
export interface OrderPopulated extends Omit<Order, 'items'> {
  createdAt: string;
  items: {
    product: StrapiProduct;
    quantity: number;
  }[];
}
