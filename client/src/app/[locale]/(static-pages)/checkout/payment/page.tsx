'use client';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useCartProvider } from '@/app/providers';
import { Checkbox } from '@/components/ui/checkbox';
import { PAGE_NAMES } from '@/i18n/page-names';

import { TitleWithValue } from '../components/cart-section';
import { useCheckoutProvider } from '../providers/checkout-provider';
import { PaymentMethod } from '../types';

import { PaymentOnDelivery, PaymentWithCard } from './components';

export default function CheckoutPaymentPage() {
  const t = useTranslations('checkoutPage');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const { deliveryForm, selectedStore, getDeliveryPrice, isGift, setIsGift } =
    useCheckoutProvider();

  if (!deliveryForm) {
    redirect(PAGE_NAMES.CHECKOUT);
  }

  const { getTotalPrice } = useCartProvider();

  const deliveryPrice = getDeliveryPrice();
  const finalPrice = getTotalPrice() + deliveryPrice;

  const { name, surname, city, postalCode, ...deliveryFormValues } =
    deliveryForm || {};
  const deliveryFormItems: string[] = Object.values(deliveryFormValues || {});

  // Add name and surname to the delivery form items in the second position
  deliveryFormItems.splice(1, 0, [name, surname].join(' '));
  // Add to the fourth position the city and postal code
  deliveryFormItems.splice(3, 0, [city, postalCode].join(' '));

  const paymentMethods: { method: PaymentMethod; title: string }[] = [
    { method: 'cash', title: t('paymentPage.payOnDelivery') },
    { method: 'card', title: t('paymentPage.payWithCard') },
  ];

  return (
    <div className="flex flex-col justify-between gap-9 md:flex-row">
      {finalPrice > 0 && (
        <div className="w-full md:order-2 md:max-w-[420px]">
          <h2 className="mb-4 hidden heading-4 md:block">{t('inTheCart')}</h2>
          <TitleWithValue title={t('toPay')} value={getTotalPrice()} />
          <TitleWithValue title={t('delivery')} value={deliveryPrice} />
          <TitleWithValue title={t('total')} value={finalPrice} />
        </div>
      )}
      <div className="h-[1px] w-full border-b border-grey-dark md:hidden" />
      <section className="flex w-full flex-col gap-4 md:order-1 md:max-w-[420px]">
        <p className="mb-10 heading-4">{t('info')}</p>
        {selectedStore && (
          <p className="text-grey-darker paragraph-2">
            {`${t('pickupFormTitle')} ${selectedStore}`}
          </p>
        )}
        <div className="flex w-full flex-col gap-4 border-b border-black">
          {deliveryFormItems &&
            deliveryFormItems.length > 0 &&
            deliveryFormItems.map((value, index) => (
              <p key={index} className="text-grey-darker paragraph-2">
                {value}
              </p>
            ))}
        </div>
        <div className="w-full py-6">
          <Checkbox
            checked={isGift}
            className="bg-white"
            id="isGift"
            labelClassName="flex items-center gap-2 cursor-pointer hover:text-grey-dark transition-colors duration-300"
            name="isGift"
            onCheckedChange={(checked) => setIsGift(Boolean(checked))}
          >
            <span>{t('giftCheckbox')}</span>
          </Checkbox>
        </div>
        <p className="border-t border-black pt-4 heading-4">
          {t('paymentPage.title')}
        </p>
        {paymentMethods.map((method) => (
          <Checkbox
            key={method.method}
            checked={paymentMethod === method.method}
            className="bg-white"
            defaultChecked={paymentMethod === method.method}
            labelClassName="flex items-center gap-6 cursor-pointer hover:text-grey-dark transition-colors duration-300"
            name={method.method}
            onCheckedChange={() =>
              setPaymentMethod(
                paymentMethod === method.method ? null : method.method
              )
            }
          >
            <span>{method.title}</span>
          </Checkbox>
        ))}
        {paymentMethod === 'cash' && <PaymentOnDelivery />}
        {paymentMethod === 'card' && (
          <div className="w-full rounded-2xl border border-black px-4 py-10">
            <PaymentWithCard />
          </div>
        )}
      </section>
    </div>
  );
}
