import { ImageProps, ProductResponse } from '@/lib/types';

// Metadata Type
interface MetadataResponse {
  title: string;
  description: string;
  images: ImageProps[];
}

// Product Type and Variant Types
interface ProductTypeResponse {
  productTypeId: string;
  variants: ProductVariant[];
  attributes: ProductTypeAttributes;
}
interface ProductTypeAttributes {
  colors?: AvailableOption[];
  memories?: AvailableOption[];
  keyboards?: AvailableOption[];
  braceletSizes?: AvailableOption[];
  ancModels?: AvailableOption[];
  screenSizes?: AvailableOption[];
  wifiModels?: AvailableOption[];
}
type AvailableOption = {
  value: string;
  name: string;
  hex?: string;
};
const OPTION_FAMILIES = [
  'color',
  'memory',
  'keyboard',
  'braceletSize',
  'ancModel',
  'screenSize',
  'wifiModel',
] as const;

type OptionFamily = (typeof OPTION_FAMILIES)[number];

type ProductVariant = Omit<
  ProductResponse,
  | 'color'
  | 'memory'
  | 'keyboard'
  | 'screenSize'
  | 'wifiModel'
  | 'ancModel'
  | 'braceletSize'
> & {
  color: AvailableOption | null;
  memory: AvailableOption | null;
  keyboard: AvailableOption | null;
  screenSize: AvailableOption | null;
  wifiModel: AvailableOption | null;
  ancModel: AvailableOption | null;
  braceletSize: AvailableOption | null;
};

interface SelectedOptions {
  color: string;
  memory: string;
  keyboard: string;
  screenSize: string;
  braceletSize: string;
  ancModel: string;
  wifiModel: string;
}
type SelectedOptionKey = keyof SelectedOptions;

export type {
  MetadataResponse,
  ProductTypeResponse,
  ProductTypeAttributes,
  ProductVariant,
  AvailableOption,
  SelectedOptions,
  SelectedOptionKey,
  OptionFamily,
};
export { OPTION_FAMILIES };
