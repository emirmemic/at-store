'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

import { IconChevron } from '@/components/icons';
import { useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils/utils';

export default function Container({
  children,
  className = '',
  onBack,
}: {
  children: React.ReactNode;
  className?: string;
  onBack?: () => void;
}) {
  const router = useRouter();
  const t = useTranslations('common');

  return (
    <div
      className={cn(
        'relative flex w-full max-w-[842px] flex-col items-center justify-center gap-3 rounded-2xl bg-black bg-white p-9 text-black text-white md:p-12',
        className
      )}
    >
      <button
        className="hover:black absolute left-6 top-6 flex items-center gap-6 text-black"
        type="button"
        onClick={onBack ?? router.back}
      >
        <IconChevron className="rotate-90" />
        <span className="paragraph-2">{t('back')}</span>
      </button>
      {children}
    </div>
  );
}
