'use client';

import { useTranslations } from 'next-intl';

import {
  CartSection,
  DeliveryForm,
  DeliveryMethodButton,
  PickupForm,
} from './components';
import { useCheckoutProvider } from './providers/checkout-provider';

export type DeliveryMethod = 'delivery' | 'pickup';

export default function CheckoutPage() {
  const { deliveryMethod, setDeliveryMethod } = useCheckoutProvider();

  const t = useTranslations('checkoutPage');
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_480px]">
        <div className="rounded-3xl border border-gray-300 bg-white p-6 shadow-sm md:sticky md:top-20">
          <CartSection />
          <div className="mt-6 flex justify-center gap-4 opacity-70">
            <img src="assets/images/visa.svg" alt="Visa" className="h-6" />
            <img
              src="assets/images/mastercard1.svg"
              alt="Mastercard"
              className="h-6"
            />
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-md">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
            {t('deliveryMethods')}
          </h2>
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <DeliveryMethodButton
              isActive={deliveryMethod === 'delivery'}
              title={t('delivery')}
              onClick={() => setDeliveryMethod('delivery')}
            />
            <DeliveryMethodButton
              isActive={deliveryMethod === 'pickup'}
              title={t('branchOffice')}
              onClick={() => setDeliveryMethod('pickup')}
            />
          </div>
          {deliveryMethod === 'pickup' && <PickupForm />}
          <DeliveryForm />
        </div>
      </div>
    </div>
  );
}
