interface ProductTypeResponse {
  productTypeId: string;
  availableColors?: AvailableColor[];
  availableMemories?: AvailableMemory[];
  availableKeyboards?: AvailableOption[];
  availableBraceletSizes?: AvailableOption[];
  availableAncModels?: AvailableOption[];
  availableScreenSizes?: AvailableOption[];
  availableWifiModels?: AvailableOption[];
}
interface DefaultProduct {
  id: number;
  productLink: string;
  name: string;
}

interface AvailableColor {
  id: number;
  name: string;
  hex: string;
  defaultProduct: DefaultProduct;
}
interface AvailableMemory extends AvailableOption {
  id: number;
  unit: string;
}

interface AvailableModel {
  id: number;
  name: string;
  defaultProduct: DefaultProduct;
}

type AvailableOption = {
  value: string;
  defaultProduct: DefaultProduct;
};

export type {
  ProductTypeResponse,
  AvailableColor,
  AvailableMemory,
  AvailableModel,
  AvailableOption,
};
