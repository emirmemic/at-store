'use client';

import { useEffect, useState } from 'react';

import Store from './store';
import StoreMap from './store-map';
import { StoreType } from '../types';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-grey-almost-white py-16 md:py-20 lg:py-24">
        <div className="container-max-width">
          <h1 className="mb-4 text-center text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="text-center text-lg text-neutral-600 md:text-xl">
            {numberOfStores} {t('stores')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 container-max-width md:py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Store List */}
          <div className="w-full lg:w-[400px] xl:w-[460px]">
            <div className="space-y-3">
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

          {/* Map Section */}
          <div className="relative flex-1">
            <div className="absolute -top-24" id="map"></div>
            <div className="sticky top-4 overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
              <div className="h-[500px] lg:h-[600px]">
                <StoreMap
                  key={selectedStore.id}
                  src={selectedStore.embedLink}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
