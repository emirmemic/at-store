'use client';
import { useContext } from 'react';

import { UserContext } from '@/app/providers';

import { OrderProductCard } from './components';

export default function Page() {
  const userProvider = useContext(UserContext);
  const orders = userProvider?.user?.orders;

  return (
    <>
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
