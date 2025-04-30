interface BuildFiltersOptions {
  categoryName?: string;
  filters?: {
    [key: string]: string[]; // key is field name (color, brand, material), value is array of selected filters
  };
}
/**
 * Builds a set of filters for querying data based on category and selected filter values.
 *
 * @param options - The options for building filters.
 * @param options.categoryName - The name of the category to filter by.
 * @param options.filters - An object where keys are field names (e.g., color, brand)
 * and values are arrays of selected filter values.
 * @returns A record containing the constructed filters.
 *
 * @example
 * const filters = buildFilters({
 *   categoryName: 'Accessories',
 *   filters: {
 *     color: ['red', 'blue'],
 *     brand: ['Apple', 'Beats'],
 *   },
 * });
 * console.log(filters);
 * // Output:
 * // {
 * //   category: { name: { $eq: 'Accessories' } },
 * //   color: { name: { $in: ['red', 'blue'] } },
 * //   brand: { name: { $in: ['Apple', 'Beats'] } },
 * // }
 */
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
