"use strict";

/**
 * product controller
 */
const { sanitize } = require("@strapi/utils");
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const query = {
      filters: { slug },
      ...ctx.query,
    };

    const product = await strapi.entityService.findMany(
      "api::product.product",
      query
    );
    const schema = strapi.getModel("api::product.product");
    const sanitizedEntity = await sanitize.contentAPI.output(product, schema);

    return this.transformResponse(sanitizedEntity[0]);
  },
}));
