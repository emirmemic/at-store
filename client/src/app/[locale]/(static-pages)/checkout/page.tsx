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
    <div className="flex flex-col justify-between gap-9 md:flex-row">
      <CartSection />
      <div className="h-[1px] w-full border-b border-grey-dark md:hidden" />
      <section className="flex w-full flex-col gap-4 md:order-1 md:max-w-[420px]">
        <h2 className="heading-4">{t('deliveryMethods')}</h2>
        <div className="flex justify-between gap-4">
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
      </section>
    </div>
  );
}
