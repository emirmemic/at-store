'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, ReactNode, useContext, useState } from 'react';

import {
  AvailableOption,
  OPTION_FAMILIES,
  ProductTypeAttributes,
  ProductVariant,
  SelectedOptionKey,
  SelectedOptions,
} from '@/app/[locale]/(dynamic-pages)/products/[slug]/types';

// Dynamically initialize selected options from a variant
function initializeSelectedOptions(variant: ProductVariant): SelectedOptions {
  return OPTION_FAMILIES.reduce((acc, key) => {
    acc[key] = variant[key]?.value || '';
    return acc;
  }, {} as SelectedOptions);
}

// Derive available options based on the latest clicked option
function deriveAvailableOptions(
  variants: ProductVariant[],
  latestClicked: { key: SelectedOptionKey; value: string }
) {
  const narrowed = variants.filter(
    (variant) => variant[latestClicked.key]?.value === latestClicked.value
  );

  const colors = new Map<string, AvailableOption>();
  const memories = new Map<string, AvailableOption>();
  const keyboards = new Map<string, AvailableOption>();
  const braceletSizes = new Map<string, AvailableOption>();
  const ancModels = new Map<string, AvailableOption>();
  const screenSizes = new Map<string, AvailableOption>();
  const wifiModels = new Map<string, AvailableOption>();

  narrowed.forEach((variant) => {
    if (variant.color) colors.set(variant.color.name, variant.color);
    if (variant.memory) memories.set(variant.memory.name, variant.memory);
    if (variant.keyboard)
      keyboards.set(variant.keyboard.name, variant.keyboard);
    if (variant.braceletSize)
      braceletSizes.set(variant.braceletSize.name, variant.braceletSize);
    if (variant.ancModel)
      ancModels.set(variant.ancModel.name, variant.ancModel);
    if (variant.screenSize)
      screenSizes.set(variant.screenSize.name, variant.screenSize);
    if (variant.wifiModel)
      wifiModels.set(variant.wifiModel.name, variant.wifiModel);
  });

  // return available options as arrays
  return {
    colors: Array.from(colors.values()),
    memories: Array.from(memories.values()),
    keyboards: Array.from(keyboards.values()),
    braceletSizes: Array.from(braceletSizes.values()),
    ancModels: Array.from(ancModels.values()),
    screenSizes: Array.from(screenSizes.values()),
    wifiModels: Array.from(wifiModels.values()),
  };
}
export type ProductVariantContextType = {
  variants: ProductVariant[];
  productOptions: ProductTypeAttributes;
  selectedVariant: ProductVariant;
  selectedOptions: SelectedOptions;
  selectOption: (type: SelectedOptionKey, value: string) => void;
  availableOptions: ProductTypeAttributes;
  latestClicked: { key: SelectedOptionKey; value: string } | null;
};
export const ProductContext = createContext<ProductVariantContextType>(
  {} as ProductVariantContextType
);

export default function ProductVariantsProvider({
  children,
  variants,
  productOptions,
  initialVariant,
}: {
  children: ReactNode;
  variants: ProductVariant[];
  productOptions: ProductTypeAttributes;
  initialVariant: ProductVariant;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchKey = searchParams.get('key') as SelectedOptionKey | 'color';
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant>(initialVariant);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    () => initializeSelectedOptions(initialVariant) as SelectedOptions
  );
  const [latestClicked, setLatestClicked] = useState<{
    key: SelectedOptionKey;
    value: string;
  }>({
    key: searchKey || 'color',
    value: initialVariant[searchKey || 'color']?.name || '',
  });

  const [availableOptions, setAvailableOptions] =
    useState<ProductTypeAttributes>(
      deriveAvailableOptions(variants, latestClicked)
    );

  const selectOption = (type: SelectedOptionKey, value: string) => {
    const newSelectedOptions: SelectedOptions = {
      ...selectedOptions,
      [type]: value,
    };
    setSelectedOptions(newSelectedOptions);
    setLatestClicked({ key: type, value });

    // Try to find an exact match
    const exactMatch = variants.find((variant) => {
      return Object.entries(newSelectedOptions).every(([key, val]) => {
        return variant[key as SelectedOptionKey]?.value === val;
      });
    });

    if (exactMatch) {
      setSelectedVariant(exactMatch);
      setAvailableOptions(
        deriveAvailableOptions(variants, { key: type, value })
      );
      router.push(`/products/${exactMatch.productLink}?key=${type}`);
      return;
    }

    // Find the closest match that at least includes the latest selected value
    const closestMatch = variants
      .map((variant) => {
        let score = 0;
        for (const [key, val] of Object.entries(newSelectedOptions)) {
          if (variant[key as SelectedOptionKey]?.value === val) {
            score += 1;
          }
        }
        return { variant, score };
      })
      .filter(({ variant }) => {
        return variant[type]?.value === value;
      })
      .sort((a, b) => b.score - a.score)[0]?.variant;

    if (closestMatch) {
      setSelectedVariant(closestMatch);
      setAvailableOptions(
        deriveAvailableOptions(variants, { key: type, value })
      );
      const newSelectedOptions = initializeSelectedOptions(closestMatch);
      setSelectedOptions(newSelectedOptions);
      router.push(`/products/${closestMatch.productLink}?key=${type}`);
    } else {
      setAvailableOptions(
        deriveAvailableOptions(variants, { key: type, value })
      );
      setSelectedOptions(initializeSelectedOptions(selectedVariant));
    }
  };

  return (
    <ProductContext.Provider
      value={{
        variants,
        productOptions,
        selectedVariant,
        selectOption,
        availableOptions,
        latestClicked,
        selectedOptions,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductVariants() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      'useProductVariants must be used within ProductVariantsProvider'
    );
  }
  return context;
}
