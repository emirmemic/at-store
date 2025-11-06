import { LoginResponse, ProductsResponse, StrapiProduct } from '../types';
import { findEntity, getStores, isSameProduct, makeLink } from '../utils';

import { factories } from '@strapi/strapi';

// Helper function to introduce a delay between API requests to prevent rate-limiting.
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default factories.createCoreService('api::product.product', () => ({
  syncWebAccountProducts: async () => {
    let currentPage = 1;
    const allWebAccountProducts: string[] = [];
    let allProductsSynced = true;

    try {
      // STEP 1: LOGIN TO THE WEB ACCOUNT API
      strapi.log.info('Logging into Web Account API...');
      const loginCredentials = {
        username: process.env.WEB_ACCOUNT_USERNAME,
        password: process.env.WEB_ACCOUNT_PASSWORD,
      };

      const loginRes = await fetch(`${process.env.WEB_ACCOUNT_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredentials),
      });

      // CORRECTED SECTION: Handle login error with proper typing
      if (!loginRes.ok) {
        // We cast the unknown JSON object to a specific type we expect for an error.
        const errorData = (await loginRes.json()) as { error?: string };
        throw new Error(
          `Failed to login. Status: ${loginRes.status}, Error: ${errorData.error || 'Unknown error response'}`
        );
      }

      const { token } = (await loginRes.json()) as LoginResponse;
      if (!token) {
        throw new Error('Login successful, but no token was returned.');
      }

      let totalPages = 1;

      // STEP 2: PAGINATE THROUGH ALL PRODUCT PAGES
      for (let index = 1; index <= totalPages; index++) {
        currentPage = index;

        // This is the main try/catch block for fetching and processing each page.
        try {
          strapi.log.info(
            `Fetching page ${index} of ${totalPages} of products from Web Account API...`
          );

          const response = await fetch(
            `${process.env.WEB_ACCOUNT_API_URL}/products/unique?page=${index}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // CRITICAL: Check if the request was successful (e.g., status 200).
          if (!response.ok) {
            // If not successful (e.g., 429, 500), read the body as TEXT to see the HTML error page.
            const errorText = await response.text();
            // Throw a new, informative error that will be caught by the catch block below.
            throw new Error(
              `API request failed with status ${response.status}: ${errorText}`
            );
          }

          // If the response is OK, we can now safely parse it as JSON.
          const responseData = (await response.json()) as ProductsResponse;
          totalPages = responseData.pagination.total_pages;
          const { unique_products: webAccountProducts } = responseData;

          // STEP 3: PROCESS EACH PRODUCT ON THE CURRENT PAGE
          for (const webAccountProduct of webAccountProducts) {
            allWebAccountProducts.push(webAccountProduct.product_variant_id);

            // This inner try/catch handles errors for a single product, allowing the sync to continue with the next one.
            try {
              // First, try to find the published product
              let existingProduct = await strapi
                .documents('api::product.product')
                .findFirst({
                  filters: {
                    productVariantId: webAccountProduct.product_variant_id,
                  },
                  status: 'published',
                  populate: [
                    'brand',
                    'model',
                    'category',
                    'subCategory',
                    'stores.store',
                    'color',
                    'memory',
                    'material',
                    'chip',
                    'orders',
                  ],
                });

              let isPublished = !!existingProduct;

              if (!existingProduct) {
                // If not found, try to find the draft product
                existingProduct = await strapi
                  .documents('api::product.product')
                  .findFirst({
                    filters: {
                      productVariantId: webAccountProduct.product_variant_id,
                    },
                    status: 'draft',
                    populate: [
                      'brand',
                      'model',
                      'category',
                      'subCategory',
                      'stores.store',
                      'color',
                      'memory',
                      'material',
                      'chip',
                      'orders',
                    ],
                  });
                isPublished = false;
              }

              if (
                existingProduct &&
                isSameProduct(
                  webAccountProduct,
                  existingProduct as StrapiProduct,
                  index
                )
              ) {
                continue;
              }

              if (existingProduct && existingProduct.orders.length > 0) {
                const hasPendingOrder = existingProduct.orders.some(
                  (order) => order.orderStatus === 'pending'
                );
                if (hasPendingOrder) {
                  strapi.log.info(
                    `Product ${webAccountProduct.product_variant_id} is in pending order, skipping...`
                  );
                  continue;
                }
              }

              const brandName = webAccountProduct.brand?.name ?? null;
              let brand = await findEntity('brand', brandName);
              if (!brand && brandName) {
                brand = await strapi
                  .documents('api::brand.brand')
                  .create({ data: { name: brandName } });
              }

              const modelName = webAccountProduct.model?.name ?? null;
              let model = await findEntity('model', modelName);
              if (!model && modelName) {
                model = await strapi.documents('api::model.model').create({
                  data: { name: modelName, displayName: modelName },
                });
              }

              const chipName =
                webAccountProduct.specifications.chip?.name ?? null;
              let chip = await findEntity('chip', chipName);
              if (!chip && chipName) {
                chip = await strapi
                  .documents('api::chip.chip')
                  .create({ data: { name: chipName } });
              }

              const colorName = webAccountProduct.color?.name || null;
              let color = await findEntity('color', colorName);
              if (!color && colorName) {
                color = await strapi.documents('api::color.color').create({
                  data: {
                    name: colorName,
                    hex: webAccountProduct.color?.hex,
                  },
                });
              }

              const memoryValue = webAccountProduct.memory?.value ?? null;
              const memoryUnit = webAccountProduct.memory?.unit ?? null;
              let memory = await findEntity('memory', null, {
                value: memoryValue,
                unit: memoryUnit,
              });
              if (!memory && memoryUnit && memoryValue !== null) {
                memory = await strapi
                  .documents('api::memory.memory')
                  .create({ data: { value: memoryValue, unit: memoryUnit } });
              }

              const materialName = webAccountProduct.material ?? null;
              let material = await findEntity('material', materialName);
              if (!material && materialName) {
                material = await strapi
                  .documents('api::material.material')
                  .create({ data: { name: materialName } });
              }

              let categoryName = webAccountProduct.category?.name || null;
              if (categoryName?.toLowerCase() === 'ipad pro') {
                categoryName = 'iPad Pro';
              } else if (categoryName?.toLowerCase() === 'ipad') {
                categoryName = 'iPad';
              }

              let category = await findEntity('category', categoryName, null, [
                'subCategories',
                'models',
                'chips',
              ]);
              const subCategoryName =
                categoryName?.toLowerCase() === 'dodaci'
                  ? webAccountProduct.dodaci_type
                  : webAccountProduct.product_type_id || null;

              if (category) {
                const modelIds = category.models.map((model) => model.id) || [];
                if (model && !modelIds.includes(model.id)) {
                  modelIds.push(model.id);
                }
                const chipIds = category.chips.map((chip) => chip.id) || [];
                if (chip && !chipIds.includes(chip.id)) {
                  chipIds.push(chip.id);
                }
                category = await strapi
                  .documents('api::category.category')
                  .update({
                    documentId: category.documentId,
                    data: {
                      ...category,
                      startingPrice: 0,
                      models: modelIds,
                      chips: chipIds,
                    },
                  });
              } else if (!category && categoryName) {
                category = await strapi
                  .documents('api::category.category')
                  .create({
                    data: {
                      name: categoryName,
                      link: makeLink(categoryName),
                      startingPrice: 0,
                      models: model ? [model.id] : [],
                      chips: chip ? [chip.id] : [],
                      displayName: categoryName,
                    },
                  });
              }

              let subCategory;
              if (category) {
                subCategory = await findEntity(
                  'sub-category',
                  subCategoryName,
                  null,
                  ['products', 'models']
                );
                if (!subCategory && subCategoryName) {
                  subCategory = await strapi
                    .documents('api::sub-category.sub-category')
                    .create({
                      data: {
                        name: subCategoryName,
                        link: makeLink(subCategoryName),
                        startingPrice: 0,
                        models: model ? [model.id] : [],
                        category: category?.id,
                        displayName: subCategoryName,
                      },
                    });
                }
              }

              const stores = await getStores(webAccountProduct);
              const articleName = webAccountProduct.naziv_artikla_webaccount;
              const productData = {
                name: articleName,
                displayName: articleName,
                productTypeId: webAccountProduct.product_type_id,
                productVariantId: webAccountProduct.product_variant_id,
                webAccountArticleName: articleName,
                productLink: `${makeLink(articleName)}-${webAccountProduct.product_variant_id}`,
                originalPrice: parseFloat(webAccountProduct.original_price),
                ancModel: webAccountProduct.anc_model,
                keyboard: webAccountProduct.tipkovnica,
                wifiModel: webAccountProduct.wifi_model,
                accessoriesType: webAccountProduct.dodaci_type,
                braceletSize: webAccountProduct.narukvica_size.join(', '),
                screenSize: webAccountProduct.specifications.screen_size,
                ram:
                  webAccountProduct.ram_variant_selected ??
                  webAccountProduct.specifications.ram[0],
                releaseDate: webAccountProduct.specifications.release_date,
                deviceCompatibility:
                  webAccountProduct.device_compatibility || [],
                amountInStock: webAccountProduct.amount_in_stock,
                brand: brand ? brand.id : null,
                model: model ? model.id : null,
                category: category ? category.id : null,
                subCategory: subCategory ? subCategory.id : null,
                stores: stores,
                color: color ? color.id : null,
                memory: memory ? memory.id : null,
                material: material ? material.id : null,
                chip: chip ? chip.id : null,
              };

              if (existingProduct) {
                const sanitizedProductData = Object.fromEntries(
                  Object.entries(productData).filter(
                    ([_, value]) => value !== undefined
                  )
                );
                if (isPublished) {
                  await strapi.documents('api::product.product').update({
                    documentId: existingProduct.documentId,
                    data: sanitizedProductData,
                    status: 'published',
                  });
                } else {
                  await strapi.documents('api::product.product').update({
                    documentId: existingProduct.documentId,
                    data: sanitizedProductData,
                  });
                }
              } else {
                await strapi
                  .documents('api::product.product')
                  .create({ data: productData });
              }
            } catch (error) {
              allProductsSynced = false;
              strapi.log.error(
                `Error processing product ${webAccountProduct.product_variant_id}:`,
                error
              );
            }
          }
          // ADDED: A 250ms delay after each successful page fetch to avoid rate-limiting.
          strapi.log.info(`Finished page ${index}. Waiting for 250ms...`);
          await sleep(250);
        } catch (error) {
          allProductsSynced = false;
          strapi.log.error(
            `An error occurred while processing page ${currentPage}. Halting sync.`
          );
          // This will now log the actual error, including the full HTML response from the server.
          strapi.log.error(error);
          // Exit the loop because we can't continue if a page fetch fails.
          break;
        }
      }

      // STEP 4: DELETE OBSOLETE PRODUCTS (only if the entire sync was successful)
      if (allProductsSynced) {
        strapi.log.info(
          'Sync complete. Checking for obsolete products to delete...'
        );
        const draftProducts = await strapi
          .documents('api::product.product')
          .findMany({ status: 'draft' });
        const publishedProducts = await strapi
          .documents('api::product.product')
          .findMany({ status: 'published' });
        const allProducts = [...draftProducts, ...publishedProducts];
        const productsToDelete = allProducts
          .filter(
            (product) =>
              !allWebAccountProducts.includes(product.productVariantId)
          )
          .map((product) => product.documentId);

        let countOfDeletedProducts = 0;
        for (const productId of productsToDelete) {
          await strapi
            .documents('api::product.product')
            .delete({ documentId: productId });
          countOfDeletedProducts++;
        }
        strapi.log.info(`Deleted ${countOfDeletedProducts} products.`);
      } else {
        strapi.log.warn(
          'Sync failed or was interrupted. Skipping deletion of obsolete products to prevent data loss.'
        );
      }
    } catch (error) {
      strapi.log.error(
        'A critical error occurred during the product sync process.'
      );
      strapi.log.error(error);
    }
  },
}));
