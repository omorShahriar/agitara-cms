"use strict";
var format = require("date-fns/format");
/**
 * info controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::info.info", ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    const nonExpiredInfos = await strapi.service("api::info.info").find({
      ...query,
      filters: {
        ...query.filters,
        expiryDate: {
          $gt: format(new Date(), "yyyy-MM-dd"),
        },
      },
    });
    const sanitizedInfos = await this.sanitizeOutput(nonExpiredInfos, ctx);
    return this.transformResponse(sanitizedInfos);
  },

  async likeInfo(ctx) {
    if (!ctx.state.user)
      return ctx.forbidden("only authenticated user can like infos.");
    const user = ctx.state.user;
    const infoId = ctx.params.id;
    const { query } = ctx;
    const updateInfo = await strapi.service("api::info.info").likeInfo({
      infoId,
      userId: user.id,
      query,
    });
    const sanitizedEntity = await this.sanitizeOutput(updateInfo, ctx);
    return this.transformResponse(sanitizedEntity);
  },
  async unlikeInfo(ctx) {
    if (!ctx.state.user)
      return ctx.forbidden("only authenticated user can unlike infos.");
    const user = ctx.state.user;
    const infoId = ctx.params.id;
    const { query } = ctx;
    const updateInfo = await strapi.service("api::info.info").unlikeInfo({
      infoId,
      userId: user.id,
      query,
    });
    const sanitizedEntity = await this.sanitizeOutput(updateInfo, ctx);
    return this.transformResponse(sanitizedEntity);
  },
}));
