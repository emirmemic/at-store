export interface LoginResponse {
  token: string;
}

export interface ProductsResponse {
  unique_products: WebAccountProduct[];
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
  product_type_id: string;
  product_variant_id: string;
  naziv_artikla_webaccount: string;
  original_price: string;
  availability_by_store: {
    "AT Store (DELTA)": number;
    "AT Store (SCC)": number;
    "AT Store (ALTA)": number;
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
