'use client';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useCartProvider } from '@/app/providers';
import { ProductCartTableItem } from '@/components/product-cards';
import { Collapsible, CollapsibleContent } from '@radix-ui/react-collapsible';
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

  const { getTotalPrice, cart, updateCart } = useCartProvider();

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
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_480px]">
        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm md:sticky md:top-20">
          {finalPrice > 0 && (
            <Collapsible open>
              <h2 className="mb-4 hidden text-xl font-semibold text-gray-900 md:block">
                {t('inTheCart')}
              </h2>
              <div className="divide-y divide-grey-light overflow-hidden rounded-lg border border-grey-light">
                <TitleWithValue title={t('toPay')} value={getTotalPrice()} />
                <TitleWithValue title={t('delivery')} value={deliveryPrice} />
                <TitleWithValue title={t('total')} value={finalPrice} />
              </div>
              <CollapsibleContent className="overflow-hidden transition-all duration-500 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                {cart.map((item) => (
                  <ProductCartTableItem
                    key={item.id}
                    cartItem={item}
                    isDesktop={false}
                    onQuantityChange={updateCart}
                    onRemove={updateCart}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
          <div className="mt-6 flex justify-center gap-4 opacity-70">
            <img src="/assets/images/visa.svg" alt="Visa" className="h-6" />
            <img
              src="/assets/images/mastercard1.svg"
              alt="Mastercard"
              className="h-6"
            />
          </div>
        </div>
        <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
          <p className="mb-10 heading-4">{t('info')}</p>
          {selectedStore && (
            <p className="text-grey-darker paragraph-2">
              {`${t('pickupFormTitle')} ${selectedStore}`}
            </p>
          )}
          <div className="flex w-full flex-col gap-4 border-b border-black pb-4">
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
            <p className="mt-2 text-sm text-gray-500">
              Odaberite ovu opciju za besplatno poklon-pakovanje
            </p>
          </div>
          <p className="border-t border-black pt-4 heading-4">
            {t('paymentPage.title')}
          </p>
          {paymentMethods.map((method) => (
            <div key={method.method}>
              <Checkbox
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
              {method.method === 'card' && (
                <p className="mt-2 text-sm text-gray-500">
                  Ukoliko želite platiti na rate, moguće je jedino ukoliko
                  koristite UniCredit Shopping karticu i da je narudžba preko
                  399 KM.
                </p>
              )}
            </div>
          ))}
          {paymentMethod === 'cash' && <PaymentOnDelivery />}
          {paymentMethod === 'card' && (
            <div className="w-full rounded-2xl border border-black px-4 py-10">
              <PaymentWithCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
