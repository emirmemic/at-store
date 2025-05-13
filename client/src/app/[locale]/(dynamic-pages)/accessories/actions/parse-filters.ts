/**
 * Parses filter and pagination parameters from a URLSearchParams object.
 *
 * @param params - The URLSearchParams object containing query parameters.
 * @returns An object with parsed filter arrays, page number, and sort order.
 */
export function parseFiltersFromSearchParams(params: URLSearchParams) {
  return {
    colorFilters: params.get('color')?.split(',').filter(Boolean) || [],
    brandFilters: params.get('brand')?.split(',').filter(Boolean) || [],
    materialFilters: params.get('material')?.split(',').filter(Boolean) || [],
    page: parseInt(params.get('page') || '1', 10),
    sort: params.get('sort') || 'latest',
    modelId: params.get('model') || undefined,
  };
}
