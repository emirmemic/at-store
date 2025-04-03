import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';

export default function ErrorPopup() {
  const t = useTranslations();
  return (
    <div className="flex max-w-[416px] flex-col items-center gap-12 rounded-2xl bg-blue-steel p-14 shadow-slider-drop-shadow">
      <svg
        fill="none"
        height="125"
        viewBox="0 0 178 125"
        width="178"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.221989 84.3586C0.221989 89.6033 1.255 94.7966 3.26205 99.642C5.2691 104.487 8.21087 108.89 11.9194 112.599C19.4091 120.088 29.5674 124.296 40.1595 124.296H146.659C154.522 124.31 162.098 121.342 167.858 115.99C173.619 110.638 177.135 103.301 177.698 95.4578C178.261 87.6151 175.829 79.8506 170.892 73.7307C165.955 67.6108 158.881 63.5908 151.097 62.4817C151.184 47.3833 145.769 32.77 135.865 21.3736C125.96 9.97714 112.245 2.57765 97.2819 0.55829C82.3188 -1.46107 67.1324 2.03792 54.5616 10.4012C41.9907 18.7645 32.8958 31.4196 28.977 46.0009C20.6784 48.4213 13.3892 53.4688 8.20416 60.3855C3.0191 67.3021 0.218147 75.7143 0.221989 84.3586Z"
          stroke="white"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M88.972 93.2336H89.0603V93.322H88.972V93.2336Z"
          stroke="white"
          strokeLinejoin="round"
          strokeWidth="2.25"
        />
        <path
          d="M88.972 62.1711V35.5461"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
      <p className="text-white paragraph-1">{t('errors.unexpectedError')}</p>
      <Button asChild className="px-12" size={'md'} variant={'filled'}>
        <Link href={PAGE_NAMES.HOME}>{t('common.home')}</Link>
      </Button>
    </div>
  );
}
