import { factories } from '@strapi/strapi';
import { LoginResponse, ProductsResponse, StrapiProduct } from '../types';
import { findEntity, isSameProduct, makeLink } from '../utils';

export default factories.createCoreService('api::product.product', () => ({
  syncWebAccountProducts: async () => {
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
            // Check if product already exists
            try {
              const existingProduct: StrapiProduct = await strapi.db
                .query('api::product.product')
                .findOne({
                  where: {
                    productVariantId: webAccountProduct.product_variant_id,
                  },
                  populate: [
                    'brand',
                    'model',
                    'category',
                    'subCategory',
                    'stores',
                    'color',
                    'memory',
                    'material',
                    'chip',
                  ],
                });

              if (
                existingProduct &&
                isSameProduct(webAccountProduct, existingProduct)
              ) {
                continue;
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
                  : (modelName && modelName.split(' ').slice(0, 2).join(' ')) ||
                    null;

              // if the value of subCategoryName equal to the categoryName then we don't create a new subcategory
              const isSubCategoryMatch =
                categoryName.toLowerCase() === subCategoryName?.toLowerCase();

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

              if (!isSubCategoryMatch && category) {
                subCategory = await findEntity(
                  'sub-category',
                  subCategoryName,
                  null,
                  ['products', 'models']
                );
                if (!subCategory && subCategoryName && !isSubCategoryMatch) {
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

              // 4. Handle Stores relation (many-to-many)
              const storeIds = [];
              if (webAccountProduct.availability_by_store) {
                try {
                  const storePromises = Object.entries(
                    webAccountProduct.availability_by_store
                  )
                    .filter(([_, quantity]) => quantity > 0)
                    .map(async ([storeName]) => {
                      let store = await strapi.db
                        .query('api::store.store')
                        .findOne({
                          where: { name: storeName },
                        });

                      if (!store) {
                        store = await strapi
                          .documents('api::store.store')
                          .create({
                            data: { name: storeName },
                          });
                      }
                      return store.id;
                    });

                  storeIds.push(...(await Promise.all(storePromises)));
                } catch (error) {
                  console.error('Error processing stores:', error);
                }
              }

              // Create the product with all relations
              const articleName = webAccountProduct.naziv_artikla_webaccount;
              const productData = {
                name: articleName,
                productTypeId: webAccountProduct.product_type_id,
                productVariantId: webAccountProduct.product_variant_id,
                webAccountArticleName: articleName,
                productLink: `${makeLink(articleName)}-${webAccountProduct.product_variant_id}`,
                originalPrice: parseFloat(webAccountProduct.original_price),
                // Set relations
                brand: brand?.id,
                model: model?.id,
                category: category?.id,
                subCategory: subCategory?.id,
                stores: storeIds,
                color: color?.id,
                memory: memory?.id,
                material: material?.id,
                chip: chip?.id,
                ancModel: webAccountProduct.anc_model,
                keyboard: webAccountProduct.tipkovnica,
                wifiModel: webAccountProduct.wifi_model,
                accessoriesType: webAccountProduct.dodaci_type,
                braceletSize: webAccountProduct.narukvica_size.join(', '),
                screenSize: webAccountProduct.specifications.screen_size,
                ram: webAccountProduct.specifications.ram,
                cores: webAccountProduct.specifications.number_of_cores,
                releaseDate: webAccountProduct.specifications.release_date,
              };

              if (existingProduct) {
                // Remove undefined values from productData
                const sanitizedProductData = Object.fromEntries(
                  Object.entries(productData).filter(
                    ([_, value]) => value !== undefined
                  )
                );

                await strapi.documents('api::product.product').update({
                  documentId: existingProduct.documentId,
                  data: sanitizedProductData,
                });
              } else {
                // Create new product
                await strapi.documents('api::product.product').create({
                  data: productData,
                });
              }
            } catch (error) {
              console.error(
                `Error processing product ${webAccountProduct.product_variant_id}:`,
                error
              );
            }
          }
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  },
}));
