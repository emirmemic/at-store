import { HeartIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import qs from 'qs';

import { Button } from '@/components/ui/button';
import { fetchAPI } from '@/lib/fetch-api';
import { globalRenderer } from '@/lib/global-renderer';
import { Global } from '@/lib/types/global';
import { getStrapiURL } from '@/lib/utils/utils';

import { HomepageResponse } from './types/homepage-response';

const homePageQuery = qs.stringify({
  populate: {
    buttons: {
      on: {
        'global.button': true,
      },
    },
    button: true,
  },
});

async function loader() {
  const BASE_URL = getStrapiURL();
  const path = '/api/home-page';
  const url = new URL(path, BASE_URL);
  url.search = homePageQuery;

  const res = await fetchAPI<HomepageResponse>(url.href, {
    method: 'GET',
  });

  if (!res.data) notFound();
  const data = res?.data?.data;
  return data;
}

export default async function Page() {
  const data = await loader();
  const { buttons, title, button } = data;

  return (
    <>
      <h1 className="p-10">{title}</h1>
      <div className="flex gap-4">
        {buttons.map((block: Global) => globalRenderer(block))}
      </div>
      {button && (
        <Button
          size={button.size}
          transparentVariant={button.transparentVariant}
          typography={button.typography}
          variant={button.variant}
        >
          <HeartIcon size={30} />
          {button.label}
        </Button>
      )}
    </>
  );
}
