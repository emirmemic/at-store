/**
 * Client-side TypeScript types for Order data
 * These types mirror the server-side order response structure
 */

export type OrderStatus = 'pending' | 'canceled' | 'completed';
export type DeliveryMethod = 'pickup' | 'delivery';
export type PaymentMethod = 'card' | 'cash' | 'virman';
export type StoreCode =
  | 'AT Store (SCC)'
  | 'AT Store (ALTA)'
  | 'AT Store (DELTA)';

/**
 * Order address information
 */
export interface OrderAddress {
  name: string;
  surname: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  country: string;
  note?: string;
}

/**
 * Product image structure
 */
export interface ProductImage {
  id: number;
  url: string;
  name: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

/**
 * Product brand information
 */
export interface ProductBrand {
  id: number;
  name: string;
}

/**
 * Product model information
 */
export interface ProductModel {
  id: number;
  name: string;
}

/**
 * Product category information
 */
export interface ProductCategory {
  id: number;
  name: string;
  link?: string;
}

/**
 * Product color information
 */
export interface ProductColor {
  id: number;
  name: string;
  hex: string;
}

/**
 * Product memory information
 */
export interface ProductMemory {
  id: number;
  value: number;
  unit: string;
}

/**
 * Product chip information
 */
export interface ProductChip {
  id: number;
  name: string;
}

/**
 * Complete product details within an order item
 */
export interface OrderProduct {
  id: number;
  documentId: string;
  name: string;
  productVariantId: string;
  productTypeId: string;
  productLink: string;
  originalPrice: number;
  discountedPrice?: number | null;
  images?: ProductImage[];
  brand?: ProductBrand | null;
  model?: ProductModel | null;
  category?: ProductCategory | null;
  color?: ProductColor | null;
  memory?: ProductMemory | null;
  chip?: ProductChip | null;
}

/**
 * Individual order item with product details
 */
export interface OrderItem {
  id: number;
  quantity: number;
  product: OrderProduct;
}

/**
 * User information associated with an order
 */
export interface OrderUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
}

/**
 * Complete order details response from API
 */
export interface OrderDetail {
  id: number;
  documentId: string;
  orderNumber: string;
  orderStatus: OrderStatus;
  address: OrderAddress;
  totalPrice: number;
  deliveryPrice: number;
  isGift: boolean;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  selectedStore: StoreCode | null;
  createdAt: string;
  updatedAt: string;
  publicToken?: string | null;
  user?: OrderUser | null;
  items: OrderItem[];
}

/**
 * API response structure for order retrieval endpoint
 */
export interface OrderDetailAPIResponse {
  status: 'success';
  message: string;
  data: OrderDetail;
}
