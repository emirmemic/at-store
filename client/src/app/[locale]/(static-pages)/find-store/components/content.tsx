'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { StoreType } from '../types';

import Store from './store';
import StoreMap from './store-map';

export default function Content({ stores }: { stores: StoreType[] }) {
  const t = useTranslations('findStorePage');
  const searchParams = useSearchParams();
  const [selectedStore, setSelectedStore] = useState<StoreType>(stores[0]);
  const numberOfStores = stores.length;

  // Read query parameter on page load and set the selected store accordingly
  // If the store is not found in the list, fallback to the first store
  useEffect(() => {
    const storeId = searchParams.get('store') as string;
    const store = stores.find((s) => s.id === storeId);
    setSelectedStore(store || stores[0]);
  }, [searchParams, stores]);

  return (
    <>
      <h1 className="mb-12 heading-2 md:heading-1">{t('title')}</h1>
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[400px_1fr]">
        <div>
          <p className="mb-10 paragraph-1">{`${numberOfStores} ${t('stores')}`}</p>
          <div className="flex flex-col gap-2">
            {stores.map((store) => (
              <Store
                key={store.id}
                isSelected={store.id === selectedStore.id}
                store={store}
                onClick={() => setSelectedStore(store)}
              />
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-24" id="map"></div>
          <StoreMap src={selectedStore.embedLink} />
        </div>
      </div>
    </>
  );
}
