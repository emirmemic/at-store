import { factories } from "@strapi/strapi";
import { LoginResponse, ProductsResponse } from "../../../../types/webaccount";

export default factories.createCoreService("api::product.product", () => ({
  syncWebAccountProducts: async () => {
    try {
      // Fetch products from Web Account API
      const loginCredentials = {
        username: process.env.WEB_ACCOUNT_USERNAME,
        password: process.env.WEB_ACCOUNT_PASSWORD,
      };
      const res = await fetch("https://web.webaccount.ba/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentials),
      });
      const responseData = await res.json();
      if (!res.ok) {
        const { error } = responseData as { error: string };
        throw new Error("Failed to login to Web Account API, Error: " + error);
      }
      const { token } = responseData as LoginResponse;

      if (token) {
        // 1-10 is fine
        for (let index = 11; index <= 40; index++) {
          const response = await fetch(
            `https://web.webaccount.ba/api/products/unique?page=${index}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const responseData = (await response.json()) as ProductsResponse;
          const { unique_products: webAccountProducts } = responseData;

          for (const webAccountProduct of webAccountProducts) {
            const brandName = webAccountProduct.brand?.name ?? null;
            let brand = await findEntity("brand", brandName);
            if (!brand && brandName) {
              brand = await strapi.documents("api::brand.brand").create({
                data: {
                  name: brandName,
                },
              });
            }

            const modelName = webAccountProduct.model?.name ?? null;
            let model = await findEntity("model", modelName);
            if (!model && modelName) {
              model = await strapi.documents("api::model.model").create({
                data: {
                  name: modelName,
                },
              });
            }

            const chipName =
              webAccountProduct.specifications.chip?.name ?? null;
            let chip = await findEntity("chip", chipName);
            if (!chip && chipName) {
              chip = await strapi.documents("api::chip.chip").create({
                data: {
                  name: chipName,
                },
              });
            }

            const colorName = webAccountProduct.color?.name || null;
            let color = await findEntity("color", colorName);

            if (!color && colorName) {
              color = await strapi.documents("api::color.color").create({
                data: {
                  name: colorName,
                  hex: webAccountProduct.color?.hex,
                },
              });
            }

            const memoryUnit = webAccountProduct.memory?.unit || null;
            let memory = await findEntity(
              "memory",
              memoryUnit,
              { unit: memoryUnit } // custom where clause for memory
            );

            if (!memory && memoryUnit) {
              memory = await strapi.documents("api::memory.memory").create({
                data: {
                  value: webAccountProduct.memory?.value,
                  unit: memoryUnit,
                },
              });
            }

            const materialName = webAccountProduct.material ?? null;
            let material = await findEntity("material", materialName);
            if (!material && materialName) {
              material = await strapi
                .documents("api::material.material")
                .create({
                  data: {
                    name: materialName,
                  },
                });
            }

            const accessoriesType = webAccountProduct.dodaci_type
              ? "Accessories"
              : null;
            let categoryName =
              webAccountProduct.category.name || accessoriesType;

            if (categoryName?.toLowerCase() === "ipad pro") {
              categoryName = "iPad Pro";
            } else if (categoryName?.toLowerCase() === "ipad") {
              categoryName = "iPad";
            }

            let category = await findEntity("category", categoryName, null, [
              "subCategories",
              "models",
              "chips",
            ]);

            // if category is "accessories" then we set the subcategory to whatever `dodaci_type` is
            // otherwise we set it to the first two words of the model name
            const subCategoryName =
              categoryName === "Accessories"
                ? webAccountProduct.dodaci_type
                : (modelName && modelName.split(" ").slice(0, 2).join(" ")) ||
                  null;

            // if the value of subCategoryName equal to the categoryName then we don't create a new subcategory
            const isSubCategoryMatch = categoryName === subCategoryName;

            // Find or create the category
            if (category) {
              let startingPrice = 0;
              if (
                parseFloat(webAccountProduct.original_price) <
                parseFloat(category.startingPrice)
              ) {
                startingPrice = parseFloat(webAccountProduct.original_price);
              } else {
                startingPrice = parseFloat(category.startingPrice);
              }
              const modelIds = category.models.map((model) => model.id) || [];
              if (model) {
                if (!modelIds.includes(model.id)) {
                  modelIds.push(model.id);
                }
              }
              // same logic for chips as the subcategory
              let chipIds = category.chips.map((chip) => chip.id) || [];
              if (chipName) {
                if (!chipIds.includes(chip?.id)) {
                  const existingChip = await findEntity("chip", chipName);
                  if (existingChip) {
                    chipIds.push(existingChip.id);
                  } else {
                    const newChip = await strapi
                      .documents("api::chip.chip")
                      .create({
                        data: {
                          name: chipName,
                        },
                      });
                    chipIds.push(newChip.id);
                  }
                }
              }
              category = await strapi
                .documents("api::category.category")
                .update({
                  documentId: category.documentId,
                  data: {
                    ...category,
                    startingPrice: startingPrice,
                    models: modelIds,
                    chips: chipIds,
                  },
                });
            } else if (!category && categoryName) {
              const startingPrice = calculateCategoryStartingPrice(
                webAccountProducts,
                categoryName
              );

              // Create a new category
              category = await strapi
                .documents("api::category.category")
                .create({
                  data: {
                    name: categoryName,
                    link: categoryName.toLowerCase().replace(/\s+/g, "-"),
                    startingPrice,
                    models: model ? [model.id] : [],
                    chips: chip ? [chip.id] : [],
                  },
                });
            }

            let subCategory;
            if (!isSubCategoryMatch) {
              subCategory = await findEntity("sub-category", subCategoryName);
              if (!subCategory && subCategoryName) {
                subCategory = await strapi
                  .documents("api::sub-category.sub-category")
                  .create({
                    data: {
                      name: subCategoryName,
                      link: subCategoryName.toLowerCase().replace(/\s+/g, "-"),
                      startingPrice: 0,
                      models: model ? [model.id] : [],
                      category: category?.id,
                    },
                  });
              }
            }

            // 4. Handle Stores relation (many-to-many)
            const storeIds = await handleStoreRelations(
              webAccountProduct.availability_by_store
            );

            const sanitizeForUrl = (str: string) =>
              str
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, "-") // Replace any non-alphanumeric chars with hyphen
                .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
                .replace(/^-|-$/g, ""); /* Remove leading/trailing hyphens*/

            // 6. Create the product with all relations
            const articleName = webAccountProduct.naziv_artikla_webaccount;
            const productData = {
              name: articleName,
              productTypeId: webAccountProduct.product_type_id,
              productVariantId: webAccountProduct.product_variant_id,
              webAccountArticleName: articleName,
              productLink: `${sanitizeForUrl(articleName)}-${webAccountProduct.product_variant_id}`,
              originalPrice: parseFloat(webAccountProduct.original_price),
              // Set relations
              brand: brand?.id,
              model: model?.id,
              category: category?.id,
              subCategory: subCategory?.id,
              stores: storeIds,
              // color: color?.id,
              memory: memory?.id,
              material: material?.id,
              chip: chip?.id,
              // Set publish state
              publishedAt: new Date(),
              ancModel: webAccountProduct.anc_model,
              keyboard: webAccountProduct.tipkovnica,
              wifiModel: webAccountProduct.wifi_model,
              accessoriesType: webAccountProduct.dodaci_type,
              braceletSize: webAccountProduct.narukvica_size.join(", "),
              screenSize: webAccountProduct.specifications.screen_size,
              ram: webAccountProduct.specifications.ram,
              cores: webAccountProduct.specifications.number_of_cores,
              releaseDate: webAccountProduct.specifications.release_date,
            };

            // Check if product already exists
            const existingProduct = await strapi.db
              .query("api::product.product")
              .findOne({
                where: {
                  productVariantId: webAccountProduct.product_variant_id,
                },
              });

            if (existingProduct) {
              // Update existing product
              await strapi.documents("api::product.product").update({
                documentId: existingProduct.documentId,
                data: productData,
              });
            } else {
              // Create new product
              await strapi.documents("api::product.product").create({
                data: productData,
              });
            }
          }
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  },
}));

async function findEntity(
  entityType: string,
  entityName: string | null | undefined,
  customWhere?: Record<string, any>,
  populate: string[] = []
) {
  if (!entityName) {
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

const calculateCategoryStartingPrice = (
  products: any[],
  categoryName: string
): number => {
  if (categoryName === "Accessories") {
    const categoryPrices = products
      .filter((product) => product.dodaci_type !== null)
      .map((product) => parseFloat(product.original_price));
    return Math.min(...categoryPrices);
  } else {
    const categoryPrices = products
      .filter((product) => product.category?.name === categoryName)
      .map((product) => parseFloat(product.original_price));
    return Math.min(...categoryPrices);
  }
};

interface AvailabilityByStore {
  [key: string]: number;
}

async function handleStoreRelations(
  availabilityByStore: AvailabilityByStore | null
): Promise<number[]> {
  if (!availabilityByStore) {
    return [];
  }
  const storePromises = Object.entries(availabilityByStore)
    .filter(([_, quantity]) => quantity > 0)
    .map(async ([storeName]) => {
      const store = await findEntity("store", storeName);
      return store?.id;
    });

  const storeIds = (await Promise.all(storePromises)).filter(
    (id): id is number => id !== null && id !== undefined
  );

  return storeIds;
}
