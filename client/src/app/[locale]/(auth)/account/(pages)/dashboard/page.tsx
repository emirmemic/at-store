import { getTranslations } from 'next-intl/server';
import qs from 'qs';

import { MonoAppleBlock } from '@/components';
import { CURRENCY, STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

import { OrderProductCard } from '../../components';
import { OrderResponse } from '../../types';

import { Card } from './components';

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
  const t = await getTranslations('accountPage.dashboard');

  const ordersCount = orders?.length ?? 0;
  const validOrders = orders?.filter(
    (order) => order.orderStatus !== 'canceled'
  );
  const allProducts = validOrders?.flatMap((order) => order.products) || [];
  const totalSpent = allProducts.reduce((orderTotal, product) => {
    const price =
      Number(product.discountedPrice) || Number(product.originalPrice) || 0;
    return orderTotal + price;
  }, 0);
  const lastOrder = orders?.sort(
    (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  )[0];

  const cardStyling =
    'h-[174px] w-[174px] md:w-[210px] md:h-[170px] lg:h-[206px] lg:w-[244px]';

  return (
    <div className="flex flex-col gap-9">
      <div className="flex justify-center gap-4 md:justify-start md:gap-11 lg:gap-12">
        <Card
          className={cardStyling}
          count={ordersCount}
          subtitle={t('orders')}
          title={t('youHad')}
        />
        <Card
          className={cardStyling}
          count={totalSpent}
          subtitle={CURRENCY}
          title={t('totalSpent')}
        />
      </div>
      {lastOrder && (
        <div>
          <p className="pb-3 heading-5 md:bullet-heading-2 lg:heading-4">
            {t('lastOrderYouMade')}
          </p>
          {lastOrder && (
            <div className="flex flex-col gap-6">
              {lastOrder.products.map((product) => (
                <OrderProductCard
                  key={product.id}
                  id={product.id}
                  orderDate={lastOrder.orderDate}
                  orderNumber={lastOrder.orderNumber}
                  orderStatus={lastOrder.orderStatus}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <MonoAppleBlock />
    </div>
  );
}
