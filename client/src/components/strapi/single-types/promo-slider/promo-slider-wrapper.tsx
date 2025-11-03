import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';

import PromoSlider from './promo-slider';
import { PromoSliderResponse } from './types';
import { fetchAPI } from '@/lib/fetch-api';
import qs from 'qs';

interface PromoSliderProps {
  className?: string;
}
const query = qs.stringify(
  {
    populate: {
      sliderItems: {
        populate: {
          image: {
            fields: STRAPI_IMAGE_FIELDS,
          },
          mobileImage: {
            fields: STRAPI_IMAGE_FIELDS,
          },
          video: {
            fields: STRAPI_IMAGE_FIELDS,
          },
          actionLink: true,
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

async function fetchSlides() {
  const path = '/api/promo-slider';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = query;

  const res = await fetchAPI<PromoSliderResponse>(url.href, {
    method: 'GET',
    isAuth: false,
  });

  return res;
}

export default async function PromoSliderWrapper({
  className,
}: PromoSliderProps) {
  const response = await fetchSlides();
  if (response.error) {
    return null;
  }
  const slides = response?.data?.data.sliderItems || [];
  return <PromoSlider className={className} slides={slides} />;
}
