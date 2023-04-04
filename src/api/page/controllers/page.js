"use strict";

/**
 * page controller
 */
const { sanitize } = require("@strapi/utils");
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::page.page", ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const query = {
      filters: { slug },
      ...ctx.query,
    };

    const page = await strapi.entityService.findMany("api::page.page", query);
    const schema = strapi.getModel("api::page.page");
    const sanitizedEntity = await sanitize.contentAPI.output(page, schema);

    return this.transformResponse(sanitizedEntity[0]);
  },
}));
