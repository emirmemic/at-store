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
    city: string;
    postalCode: string;
    phoneNumber: string;
    country: string;
    note?: string;
  };
  deliveryMethod: 'pickup' | 'delivery';
  paymentMethod: 'card' | 'cash';
  selectedStore: StoreCode | null;
  items: {
    productVariantId: string;
    productDocumentId: string;
    quantity: number;
  }[];
}
