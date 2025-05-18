'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

import { StoreCode } from '@/lib/constants';
import { DeliveryForm } from '@/lib/schemas/checkout';

import { DeliveryMethod } from '../page';
import { OrderSuccessData } from '../types';

export type CheckoutContextType = {
  setSelectedStore: (store: StoreCode | null) => void;
  selectedStore: StoreCode | null;
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  setDeliveryForm: (form: DeliveryForm | null) => void;
  deliveryForm: DeliveryForm | null;
  orderSuccessData: OrderSuccessData | null;
  setOrderSuccessData: (data: OrderSuccessData | null) => void;
};

export const CheckoutContext = createContext<CheckoutContextType>({
  setSelectedStore: () => {},
  selectedStore: null,
  deliveryMethod: 'delivery',
  setDeliveryMethod: () => {},
  setDeliveryForm: () => {},
  setOrderSuccessData: () => {},
  deliveryForm: null,
  orderSuccessData: null,
});

export default function CheckoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedStore, setSelectedStore] = useState<StoreCode | null>(null);
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>('delivery');
  const [deliveryForm, setDeliveryForm] = useState<DeliveryForm | null>(null);
  const [orderSuccessData, setOrderSuccessData] =
    useState<OrderSuccessData | null>(null);

  return (
    <CheckoutContext.Provider
      value={{
        setSelectedStore,
        selectedStore,
        deliveryMethod,
        setDeliveryMethod,
        setDeliveryForm,
        deliveryForm,
        orderSuccessData,
        setOrderSuccessData,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckoutProvider() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckoutProvider must be used within CheckoutProvider');
  }
  return context;
}
