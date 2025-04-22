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
        for (let index = 2; index < 6; index++) {
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
            // 1. Handle Brand relation
            let brand;
            if (webAccountProduct.brand && webAccountProduct.brand.name) {
              // Find or create the brand
              brand = await strapi.db.query("api::brand.brand").findOne({
                where: { name: webAccountProduct.brand.name },
              });
              if (!brand) {
                brand = await strapi.documents("api::brand.brand").create({
                  data: { name: webAccountProduct.brand.name },
                });
              }
            }

            // 2. Handle Model relation
            let model;
            if (webAccountProduct.model && webAccountProduct.model.name) {
              // Find or create the model
              model = await strapi.db.query("api::model.model").findOne({
                where: { name: webAccountProduct.model.name },
              });

              if (!model) {
                model = await strapi.documents("api::model.model").create({
                  data: { name: webAccountProduct.model.name },
                });
              }
            }

            // 3. Handle Category relation
            let category;
            if (webAccountProduct.category && webAccountProduct.category.name) {
              // Find or create the category
              category = await strapi.db
                .query("api::category.category")
                .findOne({
                  where: { name: webAccountProduct.category.name },
                });

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
                category = await strapi
                  .documents("api::category.category")
                  .update({
                    documentId: category.documentId,
                    data: {
                      ...category,
                      startingPrice: startingPrice,
                    },
                  });
              } else {
                const startingPrice = calculateCategoryStartingPrice(
                  webAccountProducts,
                  webAccountProduct.category.name
                );
                category = await strapi
                  .documents("api::category.category")
                  .create({
                    data: {
                      name: webAccountProduct.category.name,
                      link: webAccountProduct.category.name
                        .toLowerCase()
                        .replace(/\s+/g, "-"),
                      startingPrice,
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
                      .query("api::store.store")
                      .findOne({
                        where: { name: storeName },
                      });

                    if (!store) {
                      store = await strapi
                        .documents("api::store.store")
                        .create({
                          data: { name: storeName },
                        });
                    }
                    return store.id;
                  });

                storeIds.push(...(await Promise.all(storePromises)));
              } catch (error) {
                console.error("Error processing stores:", error);
              }
            }

            const sanitizeForUrl = (str: string) => {
              return str
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, "-") // Replace any non-alphanumeric chars with hyphen
                .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
                .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
            };

            // 6. Create the product with all relations
            const productData = {
              name:
                webAccountProduct.product_name ??
                webAccountProduct.naziv_artikla_webaccount,
              productTypeId: webAccountProduct.product_type_id,
              productVariantId: webAccountProduct.product_variant_id,
              webAccountArticleName: webAccountProduct.naziv_artikla_webaccount,
              productLink: `${sanitizeForUrl(webAccountProduct.naziv_artikla_webaccount)}-${webAccountProduct.product_variant_id}`,
              originalPrice: parseFloat(webAccountProduct.original_price),
              // Set relations
              brand: brand?.id,
              model: model?.id,
              category: category?.id,
              stores: storeIds,
              // Set components
              color: webAccountProduct.color,
              memory: webAccountProduct.memory,
              // Set publish state
              publishedAt: new Date(),
              material: webAccountProduct.material,
              ancModel: webAccountProduct.anc_model,
              keyboard: webAccountProduct.tipkovnica,
              wifiModel: webAccountProduct.wifi_model,
              accessoriesType: webAccountProduct.dodaci_type,
              braceletSize: webAccountProduct.narukvica_size.join(", "),
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
      console.error("Error syncing external products:", error);
    }
  },
}));

const calculateCategoryStartingPrice = (
  products: any[],
  categoryName: string
): number => {
  const categoryPrices = products
    .filter((product) => product.category.name === categoryName)
    .map((product) => parseFloat(product.original_price));
  return Math.min(...categoryPrices);
};
