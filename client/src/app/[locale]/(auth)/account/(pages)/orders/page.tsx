'use client';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { UserContext } from '@/app/providers';
import { IconShoppingCart } from '@/components/icons';

import { EmptyContent, OrderProductCard } from '../../components';

export default function Page() {
  const t = useTranslations();
  const userProvider = useContext(UserContext);
  const orders = userProvider?.user?.orders;

  return (
    <>
      {orders && orders.length === 0 && (
        <EmptyContent
          Icon={IconShoppingCart}
          buttonAction={() => {
            // TODO: Implement the button action
          }}
          buttonText={t('common.buyNow')}
          emptyText={t('accountPage.orders.noOrders')}
        />
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
