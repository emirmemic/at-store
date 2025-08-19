'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';

import IconCheckoutCheck from '@/components/icons/checkout-check';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { PAGE_NAMES } from '@/i18n/page-names';

import { TitleWithValue } from '../components/cart-section';
import { useCheckoutProvider } from '../providers/checkout-provider';

import { OrderDetails, SingleOrderItem } from './components';

export default function Page() {
  const t = useTranslations('checkoutPage');

  const { orderSuccessData, getDeliveryPrice } = useCheckoutProvider();

  if (!orderSuccessData) {
    redirect(PAGE_NAMES.CHECKOUT);
  }

  // Calculate delivery price based on order total and free delivery threshold
  const baseDeliveryPrice = getDeliveryPrice();
  const deliveryPrice =
    orderSuccessData.totalPrice >= 400 ? 0 : baseDeliveryPrice;

  // Calculate subtotal by removing delivery from total price
  const subtotal =
    orderSuccessData.deliveryMethod === 'delivery'
      ? orderSuccessData.totalPrice - deliveryPrice
      : orderSuccessData.totalPrice;

  const finalPrice = orderSuccessData.totalPrice;

  return (
    <div className="flex max-w-[526px] flex-col items-center justify-center gap-6 self-center rounded-2xl border border-grey-extra-light px-5 py-10 text-center shadow-standard-black">
      <IconCheckoutCheck size={150} />
      <h2 className="heading-3">
        {orderSuccessData.paymentMethod === 'card'
          ? t('paymentPage.paymentSuccessful')
          : t('paymentPage.orderCreated')}
      </h2>
      <p className="mb-6 paragraph-1">
        {t('paymentPage.paymentSuccessfulDescription')}
      </p>
      <div className="flex w-full flex-col gap-6 rounded-2xl border border-grey p-4 paragraph-2">
        <OrderDetails orderNumber={orderSuccessData.orderNumber} />
        <div className="w-full border-t border-grey" />
        <p className="heading-4">{t('paymentPage.order')}</p>
        {orderSuccessData.items.map((item, index) => (
          <SingleOrderItem key={index} {...item} />
        ))}

        <div className="w-full border-t border-grey" />
        <TitleWithValue title={t('toPay')} value={subtotal} />

        {orderSuccessData.deliveryMethod === 'delivery' && (
          <TitleWithValue title={t('delivery')} value={deliveryPrice} />
        )}
        <TitleWithValue title={t('total')} value={finalPrice} />
        {orderSuccessData.isGift && (
          <div>
            <Checkbox
              disabled
              checked={orderSuccessData.isGift}
              labelClassName="flex items-center gap-6"
              name="isGift"
            >
              {t('giftCheckbox')}
            </Checkbox>
          </div>
        )}
      </div>
      <Button asChild size={'xlg'} typography={'button1'} variant={'filled'}>
        <Link href={PAGE_NAMES.HOME}>{t('paymentPage.finish')}</Link>
      </Button>
    </div>
  );
}
