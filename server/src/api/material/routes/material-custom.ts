export default {
  routes: [
    {
      method: "GET",
      path: "/materials/by-category-name/:categoryName",
      handler: "api::material.material.getAvailableMaterials",
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
