// Shared field/populate configuration for related product bundles.
export const RELATED_PRODUCT_FIELDS = [
  'id',
  'documentId',
  'name',
  'displayName',
  'productLink',
  'productVariantId',
  'productTypeId',
  'webAccountArticleName',
  'originalPrice',
  'discountedPrice',
] as const;

export const RELATED_PRODUCT_POPULATE = {
  images: {
    fields: ['url', 'alternativeText'],
  },
  category: {
    fields: ['id', 'link'],
  },
} as const;

const RELATED_GROUP_FIELDS = ['id', 'title'] as const;
const SUBCATEGORY_FIELDS = [
  'id',
  'documentId',
  'name',
  'displayName',
  'link',
] as const;

const normalizeFields = (fields: unknown): string[] => {
  if (!fields) {
    return [];
  }

  if (Array.isArray(fields)) {
    return fields.filter((field): field is string => typeof field === 'string');
  }

  if (typeof fields === 'string') {
    return [fields];
  }

  return [];
};

const mergeUniqueFields = (base: string[], extra: string[]): string[] => {
  const merged = new Set<string>();
  base.forEach((field) => merged.add(field));
  extra.forEach((field) => merged.add(field));
  return Array.from(merged);
};

export const createRelatedGroupPopulate = () => ({
  fields: [...RELATED_GROUP_FIELDS],
  populate: {
    products: {
      fields: RELATED_PRODUCT_FIELDS,
      populate: RELATED_PRODUCT_POPULATE,
    },
  },
});

export const createSubCategoryRelatedGroupPopulate = () => ({
  fields: [...SUBCATEGORY_FIELDS],
  populate: {
    related_group: createRelatedGroupPopulate(),
  },
});

export const RELATED_GROUP_POPULATE = {
  subCategory: createSubCategoryRelatedGroupPopulate(),
} as const;

export const getRelatedGroupFromProduct = (product: Record<string, any>) =>
  product?.subCategory?.related_group ?? null;

export const applyRelatedGroupPopulate = (query: Record<string, any>): void => {
  if (query.populate === '*') {
    return;
  }

  if (!query.populate || typeof query.populate !== 'object') {
    query.populate = {};
  }

  const requiredSubCategory = createSubCategoryRelatedGroupPopulate();
  const currentSubCategory = query.populate.subCategory;

  if (!currentSubCategory) {
    query.populate.subCategory = requiredSubCategory;
    return;
  }

  if (currentSubCategory === true || currentSubCategory === '*') {
    query.populate.subCategory = {
      populate: {
        ...(currentSubCategory === '*' ? { '*': true } : {}),
        related_group: requiredSubCategory.populate.related_group,
      },
    };
    return;
  }

  if (typeof currentSubCategory !== 'object') {
    query.populate.subCategory = requiredSubCategory;
    return;
  }

  const normalized = { ...currentSubCategory };
  const existingFields = normalizeFields(normalized.fields);
  const requiredFields = requiredSubCategory.fields ?? [];
  const mergedFields = mergeUniqueFields(requiredFields, existingFields);

  const existingPopulate =
    typeof normalized.populate === 'object' && normalized.populate
      ? { ...normalized.populate }
      : {};

  query.populate.subCategory = {
    ...normalized,
    ...(mergedFields.length ? { fields: mergedFields } : {}),
    populate: {
      ...existingPopulate,
      related_group: requiredSubCategory.populate.related_group,
    },
  };
};
