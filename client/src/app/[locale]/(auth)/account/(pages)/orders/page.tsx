'use client';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { UserContext } from '@/app/providers';
import { IconShoppingCart } from '@/components/icons';
import { Button } from '@/components/ui/button';

import { CardContainer } from '../../components';

import { OrderProductCard } from './components';

export default function Page() {
  const t = useTranslations();
  const userProvider = useContext(UserContext);
  const orders = userProvider?.user?.orders;

  return (
    <>
      {orders && orders.length === 0 && (
        <CardContainer className="flex h-full w-full flex-col items-center gap-14 bg-white py-8 md:py-12">
          <h2 className="bullet-heading-2">
            {t('accountPage.orders.noOrders')}
          </h2>
          <IconShoppingCart className="size-[160px] md:size-[180px] lg:size-[200px]" />
          <Button size={'lg'} typography={'button1'} variant={'filled'}>
            {t('common.buyNow')}
          </Button>
        </CardContainer>
      )}
      {orders &&
        orders.map((order) => (
          <div key={order.id} className="flex flex-col gap-6">
            {order.products.map((product) => (
              <OrderProductCard
                key={product.id}
                id={product.id}
                orderDate={order.orderDate}
                orderNumber={order.orderNumber}
                orderStatus={order.orderStatus}
                product={product}
              />
            ))}
          </div>
        ))}
    </>
  );
}
