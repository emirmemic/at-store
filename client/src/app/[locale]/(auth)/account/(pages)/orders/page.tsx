import { getTranslations } from 'next-intl/server';
import qs from 'qs';

import { redirectToPromoPage } from '@/app/actions';
import { IconShoppingCart } from '@/components/icons';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

import { EmptyContent, OrderProductCard } from '../../components';
import { OrderResponse } from '../../types';

const ordersQuery = {
  populate: {
    products: {
      populate: {
        image: {
          fields: ['url', 'alternativeText'],
        },
      },
    },
  },
} as const;

export default async function Page() {
  const res = await fetchAPI<{ data: OrderResponse[] }>(
    `${STRAPI_BASE_URL}/api/orders?${qs.stringify(ordersQuery)}`,
    {
      method: 'GET',
    }
  );

  const orders = res?.data?.data;
  const t = await getTranslations();

  return !orders || orders.length === 0 ? (
    <EmptyContent
      Icon={IconShoppingCart}
      buttonAction={redirectToPromoPage}
      buttonText={t('common.buyNow')}
      emptyText={t('accountPage.orders.noOrders')}
    />
  ) : (
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
    ))
  );
}
