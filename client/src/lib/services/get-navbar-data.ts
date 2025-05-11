import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { NavbarResponseData } from '@/lib/types';

export async function getNavbarData() {
  const path = '/api/navbar/published';
  const url = new URL(path, STRAPI_BASE_URL);

  try {
    const response = await fetchAPI<NavbarResponseData>(url.href, {
      method: 'GET',
      next: { revalidate: 60 },
    });
    const finalData = response.data?.categories || [];
    return finalData;
  } catch {
    return null;
  }
}
