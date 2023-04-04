"use strict";

/**
 * article controller
 */
const { sanitize } = require("@strapi/utils");
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const query = {
      filters: { slug },
      ...ctx.query,
    };

    const article = await strapi.entityService.findMany(
      "api::article.article",
      query
    );
    const schema = strapi.getModel("api::article.article");
    const sanitizedEntity = await sanitize.contentAPI.output(article, schema);

    return this.transformResponse(sanitizedEntity[0]);
  },
}));
