'use client';

import { OpeningHours, StoreType } from '../types';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { PAGE_NAMES } from '@/i18n/page-names';
import StoreStatus from './store-status';
import { cn } from '@/lib/utils/utils';
import { getPlaceDetails } from '../actions';

interface StoreProps {
  store: StoreType;
  isSelected?: boolean;
  onClick: (store: StoreType) => void;
}

export default function Store({ store, isSelected, onClick }: StoreProps) {
  const t = useTranslations('findStorePage');
  const { name, address, cityPostcode } = store;
  const [openingHours, setOpeningHours] = useState<OpeningHours>({
    open_now: false,
    periods: [],
    weekday_text: [],
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const locale = useLocale();

  async function fetchOpeningHours() {
    try {
      const data = await getPlaceDetails(store.placeId, locale);
      if (data && 'error' in data) {
        setErrorMessage(data.error || t('errorOpeningHours'));
        return;
      }
      if (data && 'opening_hours' in data.result) {
        setOpeningHours(data.result.opening_hours as OpeningHours);
      }
    } catch {
      setErrorMessage(t('errorOpeningHours'));
    }
  }

  useEffect(() => {
    fetchOpeningHours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.placeId, locale]);

  return (
    <Link
      className={cn(
        'flex flex-col gap-2 rounded-lg p-3 transition-colors duration-200 ease-in-out hover:bg-grey-almost-white',
        isSelected && 'bg-grey-almost-white/50'
      )}
      href={{
        pathname: PAGE_NAMES.FIND_STORE,
        query: { store: store.id },
        hash: 'map',
      }}
      onClick={() => onClick(store)}
    >
      <p className="mb-1 heading-4">{name}</p>
      <p className="text-grey-darker paragraph-2">
        <span>{address}</span>
        <br />
        <span>{cityPostcode}</span>
      </p>
      {errorMessage && (
        <p className="text-pink-soft paragraph-5">{errorMessage}</p>
      )}
      <StoreStatus
        openNow={openingHours?.open_now}
        periods={openingHours?.periods}
        weekdayText={openingHours?.weekday_text}
      />
    </Link>
  );
}
