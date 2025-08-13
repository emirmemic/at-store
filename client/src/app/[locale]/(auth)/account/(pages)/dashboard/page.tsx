import { getTranslations } from 'next-intl/server';
import qs from 'qs';
import Link from 'next/link';

import { MonoAppleBlock } from '@/components';
import {
  CURRENCY,
  STRAPI_BASE_URL,
  STRAPI_IMAGE_FIELDS,
} from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

import { OrderProductCard } from '../../components';
import { OrderResponse } from '../../types';

import { Card } from './components';

const ordersQuery = {
  populate: {
    products: {
      populate: {
        images: {
          fields: STRAPI_IMAGE_FIELDS,
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
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];

  const cardStyling =
    'h-[174px] w-[380px] md:w-[560px] md:h-[170px] lg:h-[206px] lg:w-[1000px]';

  return (
    <div className="flex flex-col gap-9">
      <div className="flex justify-center gap-4 md:justify-start md:gap-11 lg:gap-12"></div>
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
                  orderDate={lastOrder.createdAt}
                  orderNumber={lastOrder.orderNumber}
                  orderStatus={lastOrder.orderStatus}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <div className="mt-12 flex flex-col items-center gap-6">
        <p className="text-center text-lg font-semibold">
          Pronađite najbližu AT Store poslovnicu i posjetite nas uživo.
        </p>
        <p className="max-w-2xl text-center text-sm text-gray-600">
          Naše poslovnice se nalaze u Sarajevu i Banjoj Luci – dođite,
          isprobajte uređaje uživo i zatražite savjet od našeg stručnog osoblja.
        </p>
        <Link
          href="/find-store"
          className="inline-block rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          Pogledajte lokacije
        </Link>
      </div>
    </div>
  );
}
