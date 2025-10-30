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
  const { name, address, cityPostcode, phone } = store;
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
        'group relative flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 transition-all duration-200 ease-in-out hover:border-neutral-300 hover:shadow-md',
        isSelected && 'border-blue-500 bg-blue-50/30 shadow-md'
      )}
      href={{
        pathname: PAGE_NAMES.FIND_STORE,
        query: { store: store.id },
        hash: 'map',
      }}
      onClick={() => onClick(store)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="mb-1 text-xl font-semibold text-neutral-900">
            {name}
          </h3>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            Mono Apple Authorized Reseller
          </p>
        </div>
        {isSelected && (
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex items-start gap-2">
        <svg
          className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex-1">
          <p className="text-sm leading-relaxed text-neutral-700">
            {address}
            <br />
            {cityPostcode}
          </p>
        </div>
      </div>

      {phone && (
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 flex-shrink-0 text-neutral-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="text-sm text-neutral-700 hover:text-blue-600 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {phone}
          </a>
        </div>
      )}

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <StoreStatus
        openNow={openingHours?.open_now}
        periods={openingHours?.periods}
        weekdayText={openingHours?.weekday_text}
      />
    </Link>
  );
}
