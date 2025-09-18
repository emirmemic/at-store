'use client';

import { cn } from '@/lib/utils/utils';
import { useTranslations } from 'next-intl';

interface StoreStatusProps {
  openNow: boolean;
  periods: {
    open: { day: number; time: string };
    close: { day: number; time: string };
  }[];
  weekdayText: string[];
}

export default function StoreStatus({
  openNow,
  periods,
  weekdayText,
}: StoreStatusProps) {
  const t = useTranslations('findStorePage');

  const now = new Date();
  const today = now.getDay();

  const todayPeriod = periods.find((p) => p.open.day === today);

  let statusText: string | null = null;
  const status = openNow ? t('open') : t('closed');

  if (openNow && todayPeriod) {
    const closingTime = todayPeriod.close.time;
    const hour = closingTime.slice(0, 2);
    const minute = closingTime.slice(2);

    statusText = `${t('closesAt')} ${hour}:${minute}`;
  } else {
    const daysAhead = [...Array(7).keys()].map((i) => (today + i) % 7);
    const nextOpening = daysAhead
      .map((day) => periods.find((p) => p.open.day === day))
      .filter(Boolean)[0];

    if (nextOpening) {
      const day = nextOpening.open.day;
      const weekdayTextIndex = (day + 6) % 7; // Google returns Sunday=0, weekdayText starts with Monday
      const time = nextOpening.open.time;
      const hour = time.slice(0, 2);
      const minute = time.slice(2);
      const dayName = weekdayText[weekdayTextIndex]?.split(':')[0];

      statusText = `${t('opensAt')} ${dayName}, ${hour}:${minute}`;
    }
  }

  return statusText ? (
    <div className="flex items-center gap-16">
      <p
        className={cn('paragraph-2', openNow ? 'text-green' : 'text-red-deep')}
      >
        {status}
      </p>
      <p className="text-grey-darker paragraph-2">{statusText}</p>
    </div>
  ) : null;
}
