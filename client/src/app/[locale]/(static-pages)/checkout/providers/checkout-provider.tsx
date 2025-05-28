'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

import { useCartProvider } from '@/app/providers';
import {
  DELIVERY_COST,
  MINIMUM_AMOUNT_FREE_DELIVERY,
  StoreCode,
} from '@/lib/constants';
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
  getDeliveryPrice: () => number;
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
  getDeliveryPrice: () => {
    return 0;
  },
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
  const { getTotalPrice } = useCartProvider();

  function getDeliveryPrice() {
    const isPickup = deliveryMethod === 'pickup';
    if (isPickup) {
      return 0;
    } else if (
      deliveryMethod === 'delivery' &&
      getTotalPrice() > MINIMUM_AMOUNT_FREE_DELIVERY
    ) {
      return 0;
    } else {
      return DELIVERY_COST;
    }
  }

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
        getDeliveryPrice,
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
