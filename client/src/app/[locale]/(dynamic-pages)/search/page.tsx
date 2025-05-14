import { getTranslations } from 'next-intl/server';
import React from 'react';

import { getSearchResults } from '@/components/nav-bar/actions';
import { ProductListTitle, ProductsList } from '@/components/product-cards';

import NoResult from './no-result';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    query: string;
  }>;
}) {
  const { query } = await searchParams;
  const t = await getTranslations();
  const response = await getSearchResults(query);
  const products = response || [];
  return (
    <main className="flex min-h-screen-h-cutoff flex-col py-12 container-max-width">
      <ProductListTitle title={t('notFound.title')} />
      <div className="flex grow items-center justify-center py-16">
        {!products.length ? <NoResult /> : <ProductsList products={products} />}
      </div>
    </main>
  );
}
