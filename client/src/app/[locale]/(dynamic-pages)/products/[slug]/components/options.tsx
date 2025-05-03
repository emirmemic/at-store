'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Installments from '@/components/ui/installments';
import Price from '@/components/ui/price';
import {
  InstallmentOption,
  ProductResponse,
  ProductTypeResponse,
} from '@/lib/types';
import { cn } from '@/lib/utils/utils';

import ColorOptions from './color-options';
import GeneralOptions from './general-options';
import MemoryOptions from './memory-options';

interface SpecsProps {
  className?: string;
  finalPrice: number;
  options: ProductTypeResponse;
  productData: ProductResponse;
}
export default function Options({
  className,
  finalPrice,
  options,
  productData,
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
  const {
    availableColors,
    availableMemories,
    availableKeyboards,
    availableScreenSizes,
    availableAncModels,
    availableBraceletSizes,
    availableWifiModels,
  } = options;
  const price =
    finalPrice /
    (selectedOption
      ? selectedOption.value
      : installmentOptions[installmentOptions.length - 1].value);

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
        {availableColors && availableColors.length > 0 && (
          <ColorOptions
            availableColors={availableColors}
            productColorId={productData?.color?.id ?? 0}
          />
        )}
        {availableMemories && availableMemories.length > 0 && (
          <MemoryOptions
            availableMemories={availableMemories}
            productMemoryId={productData?.memory?.id ?? 0}
          />
        )}
        {availableKeyboards && availableKeyboards.length > 0 && (
          <GeneralOptions
            options={availableKeyboards}
            productOptionValue={productData?.keyboard ?? ''}
            title={t('productPage.keyboardType')}
          />
        )}
        {availableBraceletSizes && availableBraceletSizes.length > 0 && (
          <GeneralOptions
            options={availableBraceletSizes}
            productOptionValue={productData?.braceletSize ?? ''}
            title={t('productPage.braceletSize')}
          />
        )}
        {availableScreenSizes && availableScreenSizes.length > 0 && (
          <GeneralOptions
            options={availableScreenSizes}
            productOptionValue={productData?.screenSize ?? ''}
            title={t('productPage.screenSize')}
          />
        )}
        {availableAncModels && availableAncModels.length > 0 && (
          <GeneralOptions
            options={availableAncModels}
            productOptionValue={productData?.ancModel ?? ''}
            title={t('productPage.model')}
          />
        )}
        {availableWifiModels && availableWifiModels.length > 0 && (
          <GeneralOptions
            options={availableWifiModels}
            productOptionValue={productData?.wifiModel ?? ''}
            title={t('productPage.model')}
          />
        )}
      </div>
    </div>
  );
}
