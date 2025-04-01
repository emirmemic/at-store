'use client';
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';

interface PropType {
  options: {
    id: string;
    name: string;
  }[];
  onSelectInch?: (id: string) => void;
}
export default function InchSelectionTab({ options, onSelectInch }: PropType) {
  const t = useTranslations('common');

  return (
    <div className="rounded-2xl bg-grey-almost-white px-5 py-4 shadow-popup-black md:px-6 lg:px-8">
      {options.map((option) => (
        <div
          key={option.id}
          className="border-grey-line flex justify-between gap-4 border-b border-grey-darker py-3 last:border-none"
        >
          <p className="heading-4">{option.name}</p>
          <Button
            className="w-fit"
            size={'md'}
            variant={'filled'}
            onClick={() => onSelectInch?.(option.id)}
          >
            {t('choose')}
          </Button>
        </div>
      ))}
    </div>
  );
}
