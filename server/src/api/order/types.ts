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
  paymentMethod: 'card' | 'cash' | 'virman';
  selectedStore: StoreCode | null;
  publicToken?: string | null;
  items: {
    productVariantId: string;
    productDocumentId: string;
    quantity: number;
    name: string;
  }[];
}
export interface OrderPopulated extends Omit<Order, 'items'> {
  createdAt: string;
  publicToken?: string | null;
  items: {
    product: StrapiProduct;
    quantity: number;
  }[];
}

/**
 * Complete order details returned by the /narudzba/:orderId endpoint
 * Includes all populated relations for order confirmation display
 */
export interface OrderDetailResponse {
  id: number;
  documentId: string;
  orderNumber: string;
  orderStatus: 'pending' | 'canceled' | 'completed';
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
  deliveryPrice: number;
  isGift: boolean;
  deliveryMethod: 'pickup' | 'delivery';
  paymentMethod: 'card' | 'cash' | 'virman';
  selectedStore: StoreCode | null;
  createdAt: string;
  updatedAt: string;
  publicToken?: string | null;
  user?: {
    id: number;
    documentId: string;
    username: string;
    email: string;
  } | null;
  items: {
    id: number;
    quantity: number;
    product: {
      id: number;
      documentId: string;
      name: string;
      productVariantId: string;
      productTypeId: string;
      productLink: string;
      originalPrice: number;
      discountedPrice?: number | null;
      images?: {
        id: number;
        url: string;
        name: string;
        alternativeText?: string;
        width?: number;
        height?: number;
      }[];
      brand?: {
        id: number;
        name: string;
      } | null;
      model?: {
        id: number;
        name: string;
      } | null;
      category?: {
        id: number;
        name: string;
        link?: string;
      } | null;
      color?: {
        id: number;
        name: string;
        hex: string;
      } | null;
      memory?: {
        id: number;
        value: number;
        unit: string;
      } | null;
      chip?: {
        id: number;
        name: string;
      } | null;
    };
  }[];
}
