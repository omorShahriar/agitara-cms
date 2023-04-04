module.exports = {
  routes: [
    {
      method: "GET",
      path: "/pages/find-by-slug/:slug",
      handler: "api::page.page.findBySlug",
      config: {
        auth: false,
      },
    },
  ],
};
