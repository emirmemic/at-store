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
    <div className="flex flex-col gap-1.5 border-t border-neutral-200 pt-3">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'h-2 w-2 rounded-full',
            openNow ? 'bg-green-500' : 'bg-red-500'
          )}
        />
        <p
          className={cn(
            'text-sm font-medium',
            openNow ? 'text-green-700' : 'text-red-700'
          )}
        >
          {status}
        </p>
      </div>
      <p className="text-sm text-neutral-600">{statusText}</p>
    </div>
  ) : null;
}
