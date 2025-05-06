export interface LoginResponse {
  token: string;
}

export interface ProductsResponse {
  unique_products: WebAccountProduct[];
  pagination: {
    total_pages: number;
    total_unique_products: number;
  };
}

export interface WebAccountProduct {
  brand: {
    name: string;
  };
  model: {
    name: string | null;
  };
  category: {
    name: string | null;
  };
  product_name: string;
  specifications: {
    ram: {
      value: number | null;
      unit: string | null;
    };
    chip: {
      name: string | null;
    };
    screen_size: string | null;
    release_date: string | null;
    number_of_cores: number | null;
  };
  product_type_id: string;
  product_variant_id: string;
  naziv_artikla_webaccount: string;
  original_price: string;
  availability_by_store: {
    'AT Store (DELTA)': number;
    'AT Store (SCC)': number;
    'AT Store (ALTA)': number;
  };
  amount_in_stock: number;
  color: {
    name: string;
    hex: string;
  };
  memory: {
    value: number;
    unit: string;
  };
  material?: string | null;
  anc_model?: string | null;
  tipkovnica?: string | null;
  wifi_model?: string | null;
  dodaci_type?: string | null;
  narukvica_size: string[];
  // TODO: Currently Web Account is always returning this as null, so need to check this when we are able to see how the object looks like
  device_compatibility: {
    name: string;
  }[];
}

export interface StrapiProduct {
  id: number;
  documentId: string;
  name: string;
  productTypeId: string;
  productVariantId: string;
  webAccountArticleName: string;
  productLink: string;
  originalPrice: number;
  brand?: {
    id: number;
    name: string;
  } | null;
  model?: {
    id: number;
    name: string;
  };
  category?: {
    id: number;
    name: string;
  };
  subCategory?: {
    id: number;
    name: string;
  };
  stores?: {
    id: number;
    name: string;
  }[];
  color?: {
    id: number;
    name: string;
    hex: string;
  };
  memory?: {
    id: number;
    value: number;
    unit: string;
  };
  material?: {
    id: number;
    name: string;
  };
  chip?: {
    id: number;
    name: string;
  };
  ancModel?: string | null;
  keyboard?: string | null;
  wifiModel?: string | null;
  accessoriesType?: string | null;
  braceletSize?: string | null;
  screenSize?: string | null;
  ram?: {
    value: number | null;
    unit: string | null;
  };
  cores?: number | null;
  releaseDate?: string | null;
  publishedAt?: Date | null;
}
