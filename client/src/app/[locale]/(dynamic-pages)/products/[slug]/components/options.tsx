'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useProductVariants } from '@/app/providers';
import Installments from '@/components/ui/installments';
import Price from '@/components/ui/price';
import { InstallmentOption } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

import {
  AvailableOption,
  ProductTypeAttributes,
  SelectedOptionKey,
} from '../types';

import OptionsItem from './options-item';

interface SpecsProps {
  className?: string;
  finalPrice: number;
  options: ProductTypeAttributes;
}
export default function Options({
  className,
  finalPrice,
  options,
}: SpecsProps) {
  // Installment Logic
  const [selectedOption, setSelectedOption] =
    useState<InstallmentOption | null>(null);
  const t = useTranslations('');
  const installmentOptions = [
    { label: 'Bez rata', value: 0 },
    { label: '6 rata', value: 6 },
    { label: '12 rata', value: 12 },
    { label: '18 rata', value: 18 },
    { label: '24 rata', value: 24 },
  ];
  const handleSelect = (option: InstallmentOption) => {
    if (option.value === 0) {
      setSelectedOption(null);
      return;
    }
    setSelectedOption(option);
  };

  // Options Logic
  const { availableOptions } = useProductVariants();
  const {
    colors,
    memories,
    keyboards,
    screenSizes,
    ancModels,
    braceletSizes,
    wifiModels,
  } = options;
  const price =
    finalPrice /
    (selectedOption
      ? selectedOption.value
      : installmentOptions[installmentOptions.length - 1].value);

  interface Item {
    key: SelectedOptionKey;
    title: string;
    options: AvailableOption[] | undefined;
    availableOnes?: AvailableOption[];
  }
  const organizedOptions: Item[] = [
    {
      key: 'color',
      title: t('accessoriesPage.color'),
      options: colors,
      availableOnes: availableOptions.colors,
    },
    {
      key: 'memory',
      title: t('productPage.memory'),
      options: memories,
      availableOnes: availableOptions.memories,
    },
    {
      key: 'keyboard',
      title: t('productPage.keyboardType'),
      options: keyboards,
      availableOnes: availableOptions.keyboards,
    },
    {
      key: 'braceletSize',
      title: t('productPage.braceletSize'),
      options: braceletSizes,
      availableOnes: availableOptions.braceletSizes,
    },
    {
      key: 'screenSize',
      title: t('productPage.screenSize'),
      options: screenSizes,
      availableOnes: availableOptions.screenSizes,
    },
    {
      key: 'ancModel',
      title: t('productPage.model'),
      options: ancModels,
      availableOnes: availableOptions.ancModels,
    },
    {
      key: 'wifiModel',
      title: t('productPage.model'),
      options: wifiModels,
      availableOnes: availableOptions.wifiModels,
    },
  ];
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 pb-2">
          <p className="text-grey-darkest paragraph-2">
            {t('productPage.installmentPrice')}
          </p>
          <div className="flex items-center gap-6">
            <Price className="heading-4" value={price} />
            <Installments
              installmentOptions={installmentOptions}
              selectedOption={selectedOption}
              onSelectOption={handleSelect}
            />
          </div>
        </div>
        {organizedOptions.map(
          (option) =>
            option.options &&
            option.options.length > 0 && (
              <OptionsItem
                key={option.key}
                availableOnes={option.availableOnes ?? []}
                itemKey={option.key}
                options={option.options}
                title={option.title}
              />
            )
        )}
      </div>
    </div>
  );
}
