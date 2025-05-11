interface BuildFiltersOptions {
  categoryLink?: string; // The link of the category to filter by
  subCategoryLink?: string; // The link of the subcategory to filter by
  filters?: {
    [key: string]: string[]; // key is field name (color, brand, material), value is array of selected filters
  };
}
/**
 * Builds a set of filters for querying data based on category and selected filter values.
 *
 * @param options - The options for building filters.
 * @param options.categoryLink - The link of the category to filter by.
 * @param options.subCategoryLink - The link of the subcategory to filter by.
 * @param options.filters - An object where keys are field names (e.g., color, brand)
 * and values are arrays of selected filter values.
 * @returns A record containing the constructed filters.
 *
 * @example
 * const filters = buildFilters({
 *   categoryLink: 'dodaci',
 *   subCategoryLink: 'mac-dodaci',
 *   filters: {
 *     color: ['red', 'blue'],
 *     brand: ['Apple', 'Beats'],
 *   },
 * });
 * console.log(filters);
 * // Output:
 * // {
 * //   category: { name: { $eqi: 'Dodaci' } },
 * //   color: { name: { $in: ['red', 'blue'] } },
 * //   brand: { name: { $in: ['Apple', 'Beats'] } },
 * // }
 */
export function buildFilters({
  categoryLink,
  subCategoryLink,
  filters = {},
}: BuildFiltersOptions) {
  const finalFilters: Record<string, unknown> = {};

  if (categoryLink) {
    finalFilters.category = {
      link: {
        $eqi: categoryLink,
      },
    };
  }
  if (subCategoryLink) {
    finalFilters.subCategory = {
      link: {
        $eqi: subCategoryLink,
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
