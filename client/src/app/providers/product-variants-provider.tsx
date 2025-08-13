'use client';

import {
  AvailableOption,
  OPTION_FAMILIES,
  ProductTypeAttributes,
  ProductVariant,
  SelectedOptionKey,
  SelectedOptions,
} from '@/app/[locale]/(dynamic-pages)/products/[category]/[productTypeId]/[productLink]/types';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import { ProductResponse } from '@/lib/types';
import { makeProductLink } from '@/lib/utils/link-helpers';

export type ProductVariantContextType = {
  variants: ProductVariant[];
  productOptions: ProductTypeAttributes;
  selectedVariant: ProductVariant;
  selectedOptions: SelectedOptions;
  relatedProducts: ProductResponse[];
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
  relatedProducts,
  productOptions,
}: {
  children: ReactNode;
  variants: ProductVariant[];
  relatedProducts: ProductResponse[];
  productOptions: ProductTypeAttributes;
}) {
  // Initialize router and params
  const router = useRouter();
  const { productLink } = useParams();
  if (!productLink) {
    notFound();
  }
  const searchParams = useSearchParams();
  const searchKey = searchParams.get('key') as SelectedOptionKey | 'color';
  const initialVariant = variants.find((v) => v.productLink === productLink);
  if (!initialVariant) {
    notFound();
  }

  /* States */
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant>(initialVariant);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    () => initializeSelectedOptions(initialVariant) as SelectedOptions
  );

  // Find the first available key from the variant dynamically
  const defaultKey: SelectedOptionKey =
    (searchKey && initialVariant[searchKey]?.value
      ? searchKey
      : (OPTION_FAMILIES.find(
          (key) => initialVariant[key]?.value
        ) as SelectedOptionKey)) ?? '';

  // Get the corresponding value
  const defaultValue = defaultKey
    ? initialVariant[defaultKey]?.value || ''
    : '';

  const [latestClicked, setLatestClicked] = useState<{
    key: SelectedOptionKey;
    value: string;
  }>({
    key: defaultKey,
    value: defaultValue,
  });

  const [availableOptions, setAvailableOptions] =
    useState<ProductTypeAttributes>(
      deriveAvailableOptions(variants, latestClicked)
    );

  // Methods
  const selectVariantFromUrl = (slug: string) => {
    const variant = variants.find((v) => v.productLink === slug);
    if (!variant) return notFound();

    const key: SelectedOptionKey =
      searchKey && variant[searchKey]?.value
        ? searchKey
        : (OPTION_FAMILIES.find(
            (key) => !!variant[key]?.value
          ) as SelectedOptionKey) || 'color';

    const value = variant[key]?.value || '';

    setSelectedVariant(variant);
    setSelectedOptions(initializeSelectedOptions(variant));
    setLatestClicked({ key, value });
    setAvailableOptions(deriveAvailableOptions(variants, { key, value }));
  };

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
      router.push(makeRouteLink(exactMatch, type), { scroll: false });
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
      router.push(makeRouteLink(closestMatch, type), { scroll: false });
    } else {
      setAvailableOptions(
        deriveAvailableOptions(variants, { key: type, value })
      );
      setSelectedOptions(initializeSelectedOptions(selectedVariant));
      router.push(makeRouteLink(selectedVariant, type), { scroll: false });
    }
  };

  // Lifecycle methods
  // Check if url changed
  useEffect(() => {
    if (!productLink) return;

    const variant = variants.find((v) => v.productLink === productLink);
    if (!variant) {
      notFound();
    }

    if (productLink) {
      if (typeof productLink === 'string') {
        selectVariantFromUrl(productLink);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productLink, variants]);

  return (
    <ProductContext.Provider
      value={{
        variants,
        relatedProducts,
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

// HELPERS
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
  const rams = new Map<string, AvailableOption>();
  const keyboards = new Map<string, AvailableOption>();
  const braceletSizes = new Map<string, AvailableOption>();
  const ancModels = new Map<string, AvailableOption>();
  const screenSizes = new Map<string, AvailableOption>();
  const wifiModels = new Map<string, AvailableOption>();

  narrowed.forEach((variant) => {
    if (variant.color) colors.set(variant.color.name, variant.color);
    if (variant.memory) memories.set(variant.memory.name, variant.memory);
    if (variant.ram) rams.set(variant.ram.name, variant.ram);
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
    rams: Array.from(rams.values()),
    keyboards: Array.from(keyboards.values()),
    braceletSizes: Array.from(braceletSizes.values()),
    ancModels: Array.from(ancModels.values()),
    screenSizes: Array.from(screenSizes.values()),
    wifiModels: Array.from(wifiModels.values()),
  };
}

// Make a route link based on the selected option
const makeRouteLink = (product: ProductVariant, type: SelectedOptionKey) => {
  const productLink = makeProductLink(
    product.category?.link || '',
    product.productTypeId,
    product.productLink || ''
  );
  return `${productLink}?key=${type}`;
};
