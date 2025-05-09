import { StrapiProduct, WebAccountProduct } from './types';

export async function findEntity(
  entityType: string,
  entityName: string | null | undefined,
  customWhere?: Record<string, any>,
  populate: string[] = []
) {
  if (!entityName && !customWhere) {
    return null;
  }

  let entity = await strapi.db
    .query(`api::${entityType}.${entityType}`)
    .findOne({
      where: customWhere || {
        name: entityName,
      },
      populate: populate,
    });

  return entity;
}

/**
 * Convert an arbitrary label into a value that matches
 *  /^(?!\/)[a-zA-Z0-9\-\/_]+$/
 *
 * 1.  Lower‑case
 * 2.  Strip accents (é → e)
 * 3.  Replace whitespace with “‑”
 * 4.  Remove every char that isn’t 0‑9 a‑z - _ /
 * 5.  Collapse multiple dashes
 * 6.  No leading dash/slash
 * 7.  No trailing dash
 */
export const makeLink = (raw: string): string =>
  raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Strip accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace whitespace with -
    .replace(/\//g, '-') // Replace slashes with -
    .replace(/[^a-z0-9\-_]+/g, '') // Remove anything not 0-9, a-z, -, _
    .replace(/-+/g, '-') // Collapse multiple dashes
    .replace(/^[-]+/, '')
    .replace(/-+$/, '');

/**
 * TODO: Not comparing the following fields:
 * Compare two products and log their differences
 * @param webAccountProduct - The product from Web Account
 * @param existingProduct - The product from Strapi
 * @returns boolean indicating if products are identical
 */
export function isSameProduct(
  webAccountProduct: WebAccountProduct,
  existingProduct: StrapiProduct
): boolean {
  let categoryName = webAccountProduct.category?.name || null;
  const subCategoryName =
    categoryName.toLowerCase() === 'dodaci'
      ? webAccountProduct.dodaci_type
      : webAccountProduct.product_type_id || null;

  const comparisons = [
    {
      field: 'Brand',
      web: webAccountProduct?.brand?.name ?? null,
      strapi: existingProduct?.brand?.name ?? null,
    },
    {
      field: 'Model',
      web: webAccountProduct?.model?.name ?? null,
      strapi: existingProduct?.model?.name ?? null,
    },
    {
      field: 'Category',
      web: webAccountProduct?.category?.name || null,
      strapi: existingProduct?.category?.name || null,
    },
    {
      field: 'Sub Category',
      web: subCategoryName,
      strapi: existingProduct?.subCategory?.name || null,
    },
    {
      field: 'Article Name',
      web: webAccountProduct?.naziv_artikla_webaccount ?? null,
      strapi: existingProduct?.webAccountArticleName ?? null,
    },
    {
      field: 'RAM Unit',
      web: webAccountProduct?.specifications?.ram?.unit ?? null,
      strapi: existingProduct?.ram?.unit ?? null,
    },
    {
      field: 'RAM Value',
      web: webAccountProduct?.specifications?.ram?.value ?? null,
      strapi: existingProduct?.ram?.value ?? null,
    },
    {
      field: 'Chip',
      web: webAccountProduct?.specifications?.chip?.name ?? null,
      strapi: existingProduct?.chip?.name ?? null,
    },
    {
      field: 'Screen Size',
      web: webAccountProduct?.specifications?.screen_size ?? null,
      strapi: existingProduct?.screenSize ?? null,
    },
    {
      field: 'Release Date',
      web: webAccountProduct?.specifications?.release_date ?? null,
      strapi: existingProduct?.releaseDate ?? null,
    },
    {
      field: 'Cores',
      web: webAccountProduct?.specifications?.number_of_cores ?? null,
      strapi: existingProduct?.cores ?? null,
    },
    {
      field: 'Product Type ID',
      web: webAccountProduct?.product_type_id,
      strapi: existingProduct?.productTypeId,
    },
    {
      field: 'Product Variant ID',
      web: webAccountProduct?.product_variant_id,
      strapi: existingProduct?.productVariantId,
    },
    {
      field: 'Original Price',
      web: parseFloat(webAccountProduct?.original_price).toString(),
      strapi: existingProduct?.originalPrice.toString(),
    },
    {
      field: 'Color Name',
      web: webAccountProduct?.color?.name ?? null,
      strapi: existingProduct?.color?.name ?? null,
    },
    {
      field: 'Memory Value',
      web: Number(webAccountProduct?.memory?.value) || null,
      strapi: existingProduct?.memory?.value ?? null,
    },
    {
      field: 'Memory Unit',
      web: webAccountProduct?.memory?.unit ?? null,
      strapi: existingProduct?.memory?.unit ?? null,
    },
    {
      field: 'Material',
      web: webAccountProduct?.material ?? null,
      strapi: existingProduct?.material?.name ?? null,
    },
    {
      field: 'Bracelet Size',
      web: webAccountProduct?.narukvica_size?.join(', '),
      strapi: existingProduct?.braceletSize ?? null,
    },
    {
      field: 'Keyboard',
      web: webAccountProduct?.tipkovnica ?? null,
      strapi: existingProduct?.keyboard ?? null,
    },
    {
      field: 'ANC Model',
      web: webAccountProduct?.anc_model ?? null,
      strapi: existingProduct?.ancModel ?? null,
    },
    {
      field: 'WiFi Model',
      web: webAccountProduct?.wifi_model ?? null,
      strapi: existingProduct?.wifiModel ?? null,
    },
    {
      field: 'Accessories Type',
      web: webAccountProduct?.dodaci_type ?? null,
      strapi: existingProduct?.accessoriesType ?? null,
    },
    {
      field: 'Amount In Stock',
      web: webAccountProduct?.amount_in_stock || 0,
      strapi: existingProduct?.amountInStock || 0,
    },
  ];
  let isIdentical: boolean = true;

  const webStores = webAccountProduct.availability_by_store || null;
  const strapiStores = existingProduct.stores || null;
  isIdentical = compareStoresValues(
    webStores,
    strapiStores,
    existingProduct.productVariantId
  );

  if (!isIdentical) {
    return isIdentical;
  }

  const strapiDeviceCompatibility = existingProduct.deviceCompatibility?.length
    ? existingProduct.deviceCompatibility
    : null;
  const webDeviceCompatibility = webAccountProduct.device_compatibility?.length
    ? webAccountProduct.device_compatibility
    : null;

  isIdentical = compareDeviceCompatibility(
    webDeviceCompatibility,
    strapiDeviceCompatibility,
    webAccountProduct.product_variant_id
  );

  if (!isIdentical) {
    return isIdentical;
  }

  comparisons.forEach(({ field, web, strapi }) => {
    /// Sometimes webAccount returns "iPad Pro" as "ipad pro" or "iPad" as "ipad"
    if (typeof web === 'string' && web.toLowerCase() === 'ipad pro') {
      web = 'iPad Pro';
    } else if (typeof web === 'string' && web.toLowerCase() === 'ipad') {
      web = 'iPad';
    }

    if (typeof web === 'number' || typeof strapi === 'number') {
      if (Number(web) !== Number(strapi)) {
        isIdentical = false;
        logDifferences(
          field,
          web,
          strapi,
          webAccountProduct.product_variant_id
        );
        // go to the next comparison
        return;
      }
    }

    if (web !== strapi) {
      isIdentical = false;
      logDifferences(field, web, strapi, webAccountProduct.product_variant_id);
    }
  });

  return isIdentical;
}

/**
 * Compare device compatibility arrays and log differences if any.
 * @returns boolean indicating if device compatibility is identical
 */
function compareDeviceCompatibility(
  webDeviceCompatibility: string[] | null,
  strapiDeviceCompatibility: string[] | null,
  productVariantId: string
): boolean {
  if (!strapiDeviceCompatibility && !webDeviceCompatibility) {
    return true;
  } else if (webDeviceCompatibility && strapiDeviceCompatibility) {
    const webSet = new Set(webDeviceCompatibility);
    const strapiSet = new Set(strapiDeviceCompatibility);
    if (
      webSet.size === strapiSet.size &&
      [...webSet].every((item) => strapiSet.has(item))
    ) {
      return true;
    } else {
      logDifferences(
        'Device Compatibility',
        webDeviceCompatibility,
        strapiDeviceCompatibility,
        productVariantId
      );
      return false;
    }
  } else {
    return false;
  }
}

/**
 * Compare stores values and log differences if any.
 * @returns boolean indicating if stores values are identical
 */
function compareStoresValues(
  web: {
    [key: string]: number;
  },
  strapi: {
    quantity: number;
    store: {
      id: number;
      name: string;
    };
  }[],
  productVariantId: string
): boolean {
  if (!web && !strapi) {
    return true;
  } else if (web && strapi) {
    const webStoreNames = Object.keys(web);
    const strapiStoreNames = strapi.map((store) => store.store.name);

    const sameStores =
      webStoreNames.length === strapiStoreNames.length &&
      webStoreNames.every(
        (name) =>
          strapiStoreNames.includes(name) &&
          web[name] == strapi.find((s) => s.store.name === name)?.quantity
      );

    if (!sameStores) {
      logDifferences('Stores', web, strapi, productVariantId);
      return false;
    }
    return true;
  } else {
    return false;
  }
}

/**
 * Log differences between web and Strapi values
 * @param field - The field name that differs
 * @param webValue - The value from Web Account
 * @param strapiValue - The value from Strapi
 * @param productVariantId - The product variant ID
 */
function logDifferences(
  field: string,
  webValue: any,
  strapiValue: any,
  productVariantId: string
) {
  console.log(`\n${field} differs`);
  console.log(`  Product Variant : ${productVariantId}`);
  console.log(`  Web Account: ${webValue}`);
  console.log(`  Strapi: ${strapiValue}`);
}

/**
 * Get stores from webAccountProduct and create them in Strapi if they don't exist
 * @param webAccountProduct - The product from Web Account
 * @returns array of stores with their IDs and quantities
 */
export async function getStores(webAccountProduct: WebAccountProduct) {
  const stores: { store: number; quantity: number }[] = [];
  if (webAccountProduct.availability_by_store) {
    try {
      // Get all available store names with quantity > 0
      const activeStores = Object.entries(
        webAccountProduct.availability_by_store
      );

      if (activeStores.length === 0) {
        return [];
      }

      // Fetch all stores in one query
      const storeNames = activeStores.map(([name]) => name);
      const existingStores = await strapi.db
        .query('api::store.store')
        .findMany({
          where: { name: { $in: storeNames } },
        });

      // Create map for quick lookups
      const storeMap = new Map(
        existingStores.map((store) => [store.name, store])
      );

      // Process stores
      for (const [storeName, quantity] of activeStores) {
        let store = storeMap.get(storeName);

        if (!store) {
          store = await strapi.documents('api::store.store').create({
            data: { name: storeName },
          });
        }

        stores.push({
          store: store.id,
          quantity,
        });
      }
    } catch (error) {
      strapi.log.error(
        `Error processing stores for product ${webAccountProduct.product_variant_id}:`,
        error
      );
    }
  }
  return stores;
}
