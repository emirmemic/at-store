'use client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';

import IconCheckoutCheck from '@/components/icons/checkout-check';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { DELIVERY_COST, MINIMUM_AMOUNT_FREE_DELIVERY } from '@/lib/constants';

import { TitleWithValue } from '../components/cart-section';
import { useCheckoutProvider } from '../providers/checkout-provider';

import { OrderDetails, SingleOrderItem } from './components';

export default function Page() {
  const t = useTranslations('checkoutPage');

  const { orderSuccessData } = useCheckoutProvider();

  if (!orderSuccessData) {
    redirect(PAGE_NAMES.CHECKOUT);
  }
  const deliveryPrice =
    orderSuccessData.totalPrice > MINIMUM_AMOUNT_FREE_DELIVERY
      ? 0
      : DELIVERY_COST;
  const finalPrice = orderSuccessData.totalPrice + deliveryPrice;

  return (
    <div className="flex max-w-[526px] flex-col items-center justify-center gap-6 self-center rounded-2xl border border-grey-extra-light px-5 py-10 text-center shadow-standard-black">
      <IconCheckoutCheck size={150} />
      <h2 className="heading-3">{t('paymentPage.paymentSuccessful')}</h2>
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
        <TitleWithValue
          title={t('toPay')}
          value={orderSuccessData.totalPrice}
        />

        {orderSuccessData.deliveryMethod === 'delivery' && (
          <TitleWithValue title={t('delivery')} value={deliveryPrice} />
        )}
        <TitleWithValue title={t('total')} value={finalPrice} />
      </div>
      <Button asChild size={'xlg'} typography={'button1'} variant={'filled'}>
        <Link href={PAGE_NAMES.HOME}>{t('paymentPage.finish')}</Link>
      </Button>
    </div>
  );
}
