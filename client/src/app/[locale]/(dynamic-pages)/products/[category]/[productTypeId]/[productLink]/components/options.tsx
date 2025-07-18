'use client';

import {
  AvailableOption,
  ProductTypeAttributes,
  SelectedOptionKey,
} from '../types';

import OptionsItem from './options-item';
import { cn } from '@/lib/utils/utils';
import { useProductVariants } from '@/app/providers';
import { useTranslations } from 'next-intl';

interface SpecsProps {
  className?: string;
  finalPrice: number;
  options: ProductTypeAttributes;
}
export default function Options({ className, options }: SpecsProps) {
  const t = useTranslations('');

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
      key: 'ram',
      title: t('productPage.ram'),
      options: options.rams,
      availableOnes: availableOptions.rams,
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
        {organizedOptions.map(
          (option) =>
            option.options &&
            option.options.length > 1 && (
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
