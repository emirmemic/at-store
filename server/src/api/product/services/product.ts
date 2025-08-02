import { factories } from '@strapi/strapi';
import { LoginResponse, ProductsResponse, StrapiProduct } from '../types';
import { findEntity, getStores, isSameProduct, makeLink } from '../utils';

export default factories.createCoreService('api::product.product', () => ({
  syncWebAccountProducts: async () => {
    /// Store all productVariantIds from Web Account API
    const allWebAccountProducts: string[] = [];
    /// Flag to track if all products were synced successfully
    /// If any product fails to sync, we set this to false
    let allProductsSynced = true;
    try {
      // Fetch products from Web Account API
      const loginCredentials = {
        username: process.env.WEB_ACCOUNT_USERNAME,
        password: process.env.WEB_ACCOUNT_PASSWORD,
      };

      const res = await fetch(`${process.env.WEB_ACCOUNT_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredentials),
      });

      const responseData = await res.json();
      if (!res.ok) {
        const { error } = responseData as { error: string };
        throw new Error('Failed to login to Web Account API, Error: ' + error);
      }
      const { token } = responseData as LoginResponse;
      let totalPages = 1;

      if (token) {
        for (let index = 1; index <= totalPages; index++) {
          console.log(
            `Fetching page ${index} of products from Web Account API...`
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
          const responseData = (await response.json()) as ProductsResponse;
          totalPages = responseData.pagination.total_pages;
          const { unique_products: webAccountProducts } = responseData;

          for (const webAccountProduct of webAccountProducts) {
            allWebAccountProducts.push(webAccountProduct.product_variant_id);
            // Check if product already exists
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

              // Check if the status in one of the orders is pending
              // If it is, we skip this product
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
                brand = await strapi.documents('api::brand.brand').create({
                  data: {
                    name: brandName,
                  },
                });
              }

              const modelName = webAccountProduct.model?.name ?? null;
              let model = await findEntity('model', modelName);
              if (!model && modelName) {
                model = await strapi.documents('api::model.model').create({
                  data: {
                    name: modelName,
                    displayName: modelName,
                  },
                });
              }

              const chipName =
                webAccountProduct.specifications.chip?.name ?? null;
              let chip = await findEntity('chip', chipName);
              if (!chip && chipName) {
                chip = await strapi.documents('api::chip.chip').create({
                  data: {
                    name: chipName,
                  },
                });
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
                memory = await strapi.documents('api::memory.memory').create({
                  data: {
                    value: memoryValue,
                    unit: memoryUnit,
                  },
                });
              }

              const materialName = webAccountProduct.material ?? null;
              let material = await findEntity('material', materialName);
              if (!material && materialName) {
                material = await strapi
                  .documents('api::material.material')
                  .create({
                    data: {
                      name: materialName,
                    },
                  });
              }
              let categoryName = webAccountProduct.category?.name || null;

              /// Sometimes webAccount returns "iPad Pro" as "ipad pro" or "iPad" as "ipad"
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

              // if category is "dodaci" then we set the subcategory to whatever `dodaci_type` is
              // otherwise we set it to the first two words of the model name
              const subCategoryName =
                categoryName.toLowerCase() === 'dodaci'
                  ? webAccountProduct.dodaci_type
                  : webAccountProduct.product_type_id || null;

              // Find  the category
              if (category) {
                const modelIds = category.models.map((model) => model.id) || [];
                // Check if the model already exists in the category
                // If the model is not in the category, add it
                if (model) {
                  if (!modelIds.includes(model.id)) {
                    modelIds.push(model.id);
                  }
                }

                // Check if the chip already exists in the category
                // If the chip is not in the category, add it
                const chipIds = category.chips.map((chip) => chip.id) || [];
                if (chip) {
                  if (!chipIds.includes(chip.id)) {
                    chipIds.push(chip.id);
                  }
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
                // Create a new category
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

              // Handle Stores relation (many-to-many)
              const stores = await getStores(webAccountProduct);

              // Create the product with all relations
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
                ram: webAccountProduct.specifications.ram[0],
                // cores: webAccountProduct.specifications.number_of_cores,
                releaseDate: webAccountProduct.specifications.release_date,
                deviceCompatibility:
                  webAccountProduct.device_compatibility || [],
                amountInStock: webAccountProduct.amount_in_stock,
                // Set relations
                brand: brand ? brand?.id : null,
                model: model ? model?.id : null,
                category: category ? category?.id : null,
                subCategory: subCategory ? subCategory?.id : null,
                stores: stores,
                color: color ? color?.id : null,
                memory: memory ? memory?.id : null,
                material: material ? material?.id : null,
                chip: chip ? chip.id : null,
              };

              if (existingProduct) {
                // Remove only undefined values from productData, keep nulls to allow disconnecting relations
                const sanitizedProductData = Object.fromEntries(
                  Object.entries(productData).filter(
                    ([_, value]) => value !== undefined
                  )
                );
                // If the product is already published, we update it directly
                if (isPublished) {
                  await strapi.documents('api::product.product').update({
                    documentId: existingProduct.documentId,
                    data: sanitizedProductData,
                    status: 'published',
                  });
                } else {
                  // If the product is in draft state, we only update it in the draft state without publishing
                  await strapi.documents('api::product.product').update({
                    documentId: existingProduct.documentId,
                    data: sanitizedProductData,
                  });
                }
              } else {
                // Create new product
                await strapi.documents('api::product.product').create({
                  data: productData,
                });
              }
            } catch (error) {
              allProductsSynced = false;
              strapi.log.error(
                `Error processing product ${webAccountProduct.product_variant_id}:`,
                error
              );
            }
          }
        }
        if (allProductsSynced) {
          /// After processing all products, we can delete products that are not in the Web Account API but exist in Strapi
          const draftProducts = await strapi
            .documents('api::product.product')
            .findMany({
              status: 'draft',
            });
          const publishedProducts = await strapi
            .documents('api::product.product')
            .findMany({
              status: 'published',
            });

          const allProducts = [...draftProducts, ...publishedProducts];
          const productsToDelete = allProducts
            .filter(
              (product) =>
                !allWebAccountProducts.includes(product.productVariantId)
            )
            .map((product) => product.documentId);

          let countOfDeletedProducts = 0;
          // Delete products that are not in the Web Account API
          for (const productId of productsToDelete) {
            await strapi.documents('api::product.product').delete({
              documentId: productId,
            });
            countOfDeletedProducts++;
          }
          console.log(`Deleted ${countOfDeletedProducts} products`);
        }
      }
    } catch (error) {
      strapi.log.error('Error syncing products from Web Account API:', error);
    }
  },
}));
