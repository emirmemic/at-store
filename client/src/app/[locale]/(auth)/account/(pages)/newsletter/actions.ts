'use server';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

const toggleSubscription = async () => {
  const path = `${STRAPI_BASE_URL}/api/newsletter/toggle-subscription`;
  const res = await fetchAPI(path, {
    method: 'PATCH',
    body: {},
  });
  return res;
};
export default toggleSubscription;
