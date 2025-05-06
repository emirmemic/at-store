export default ({ strapi }) => ({
  /**
   * Fetches product variants by slug, gets all the products of the same type and
   * organizes them by their attributes(color, memory etc.) and populates available options.
   * @param {string} slug - The slug of the product.
   * @returns {Promise<any>} - The product variants with unified response format and
   * available options.
   */
  async getProductVariantsBySlug(slug: string) {
    // Fetch the product by slug and get its productTypeId
    const product = await strapi.documents('api::product.product').findFirst({
      filters: { productLink: slug },
      status: 'published',
      fields: ['productTypeId'],
    });

    if (!product?.productTypeId) return null;
    const productTypeId = product.productTypeId;

    // Fetch all products of the same type and organize them by their attributes and populate available options
    const products = await strapi.documents('api::product.product').findMany({
      filters: { productTypeId },
      status: 'published',
      populate: {
        brand: true,
        category: true,
        model: true,
        stores: true,
        color: true,
        memory: true,
        images: {
          fields: ['url', 'alternativeText'],
        },
      },
      fields: ['*'],
    });

    // Create maps to store unique values
    const scalarMaps: Record<
      ScalarAttribute,
      Map<string, { value: string }>
    > = Object.fromEntries(
      scalarAttributes.map((attr) => [attr, new Map()])
    ) as any;

    const colorMap = new Map<number, any>();
    const memoryMap = new Map<number, any>();

    // Iterate through products to populate maps and create variants
    const variants = products.map((product) => {
      const {
        color,
        memory,
        keyboard,
        braceletSize,
        ancModel,
        screenSize,
        wifiModel,
      } = product;

      // Populate maps with unique values
      if (color) colorMap.set(color.id, color);
      if (memory) memoryMap.set(memory.id, memory);
      scalarAttributes.forEach((attr) => {
        const val = product[attr];
        if (val && !scalarMaps[attr].has(val)) {
          scalarMaps[attr].set(val, { value: val });
        }
      });

      return {
        ...product,
        color,
        memory,
        keyboard,
        braceletSize,
        ancModel,
        screenSize,
        wifiModel,
      };
    });

    return {
      productTypeId,
      attributes: {
        colors: formatColorOptions(colorMap),
        memories: formatMemoryOptions(memoryMap),
        keyboards: formatScalarOptions(scalarMaps.keyboard),
        braceletSizes: formatScalarOptions(scalarMaps.braceletSize),
        ancModels: formatScalarOptions(scalarMaps.ancModel),
        screenSizes: formatScalarOptions(scalarMaps.screenSize).map((size) => ({
          ...size,
          name: formatScreenSize(size.value),
          value: size.value,
        })),
        wifiModels: formatScalarOptions(scalarMaps.wifiModel),
      },
      variants: variants.map((variant) => ({
        ...variant,
        color: variant.color
          ? {
              name: variant.color.name,
              value: variant.color.name,
              hex: variant.color.hex,
            }
          : null,
        memory: variant.memory
          ? {
              name: `${variant.memory.value}${variant.memory.unit}`,
              value: `${variant.memory.value}${variant.memory.unit}`,
            }
          : null,
        ...Object.fromEntries(
          scalarAttributes.map((attr) => [
            attr,
            formatScalarValue(variant[attr]),
          ])
        ),
      })),
    };
  },
});

// HELPERS
const scalarAttributes = [
  'keyboard',
  'braceletSize',
  'ancModel',
  'screenSize',
  'wifiModel',
] as const;
type ScalarAttribute = (typeof scalarAttributes)[number];

const formatScalarOptions = (map: Map<string, { value: string }>) =>
  [...map.values()].map(({ value }) => ({ name: value, value }));
const formatScreenSize = (value: string) => {
  return `${parseFloat(value.replace(/[^0-9.]/g, ''))} inch`;
};

const formatColorOptions = (
  colorMap: Map<number, { name: string; hex: string }>
) =>
  [...colorMap.values()].map(({ name, hex }) => ({
    name,
    value: name,
    hex,
  }));

const formatMemoryOptions = (
  memoryMap: Map<number, { value: string; unit: string }>
) =>
  [...memoryMap.values()].map(({ value, unit }) => ({
    name: `${value}${unit}`,
    value: `${value}${unit}`,
  }));

const formatScalarValue = (value?: string | null) => {
  if (!value) return null;
  return {
    name: value,
    value,
  };
};
