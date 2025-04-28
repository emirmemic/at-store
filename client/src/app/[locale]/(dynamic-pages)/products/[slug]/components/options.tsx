'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import Installments from '@/components/ui/installments';
import Price from '@/components/ui/price';
import { InstallmentOption } from '@/lib/types';
import { cn } from '@/lib/utils/utils';
interface SpecsProps {
  className?: string;
  finalPrice: number;
}
export default function Options({ className, finalPrice }: SpecsProps) {
  const [selectedOption, setSelectedOption] =
    useState<InstallmentOption | null>(null);
  const t = useTranslations('productPage');
  const installmentOptions = [
    { label: '6 rata', value: 6 },
    { label: '12 rata', value: 12 },
    { label: '18 rata', value: 18 },
    { label: '24 rata', value: 24 },
  ];
  const price = finalPrice / (selectedOption ? selectedOption.value : 1);
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 pb-2">
          <p className="text-grey-darkest paragraph-2">
            {t('installmentPrice')}
          </p>
          <div className="flex items-center gap-6">
            <Price className="heading-4" value={price} />
            <Installments
              installmentOptions={installmentOptions}
              selectedOption={selectedOption}
              onSelectOption={setSelectedOption}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 pb-2">
          <Button
            isSelected
            className="bg-yellow-300"
            size={'color'}
            variant={'color'}
          />
          <Button className="bg-blue" size={'color'} variant={'color'} />
        </div>
        <div className="flex items-center gap-2 pb-2">
          <Button
            size={'md'}
            transparentVariant="black"
            variant={'transparent'}
          >
            128GB
          </Button>
          <Button
            size={'md'}
            transparentVariant="black"
            variant={'transparent'}
          >
            256GB
          </Button>
        </div>
      </div>
    </div>
  );
}
