import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

import { PaymentMethodResponse } from '../../types';

import { Content } from './components';

export default async function Page() {
  const res = await fetchAPI<{ data: PaymentMethodResponse[] }>(
    `${STRAPI_BASE_URL}/api/payment-methods`,
    {
      method: 'GET',
    }
  );

  const paymentMethods = res?.data?.data || [];

  return <Content paymentMethods={paymentMethods} />;
}
