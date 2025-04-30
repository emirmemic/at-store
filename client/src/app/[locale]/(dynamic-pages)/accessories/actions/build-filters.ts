interface BuildFiltersOptions {
  categoryName?: string;
  filters?: {
    [key: string]: string[]; // key is field name (color, brand, material), value is array of selected filters
  };
}

export function buildFilters({
  categoryName,
  filters = {},
}: BuildFiltersOptions) {
  const finalFilters: Record<string, unknown> = {};

  if (categoryName) {
    finalFilters.category = {
      name: {
        $eq: categoryName,
      },
    };
  }

  Object.entries(filters).forEach(([field, values]) => {
    if (values.length > 0) {
      finalFilters[field] = {
        name: {
          $in: values,
        },
      };
    }
  });

  return finalFilters;
}
