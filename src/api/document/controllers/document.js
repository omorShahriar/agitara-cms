"use strict";
var format = require("date-fns/format");
/**
 * document controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::document.document",
  ({ strapi }) => ({
    async find(ctx) {
      const { query } = ctx;
      const nonExpiredDocuments = await strapi
        .service("api::document.document")
        .find({
          ...query,
          filters: {
            ...query.filters,
            expiryDate: {
              $gt: format(new Date(), "yyyy-MM-dd"),
            },
          },
        });
      const sanitizedDocuments = await this.sanitizeOutput(
        nonExpiredDocuments,
        ctx
      );
      return this.transformResponse(sanitizedDocuments);
    },

    async likeDocument(ctx) {
      if (!ctx.state.user)
        return ctx.forbidden("only authenticated user can like documents.");
      const user = ctx.state.user;
      const documentId = ctx.params.id;
      const { query } = ctx;
      const updateDocument = await strapi
        .service("api::document.document")
        .likeDocument({
          documentId,
          userId: user.id,
          query,
        });
      const sanitizedEntity = await this.sanitizeOutput(updateDocument, ctx);
      return this.transformResponse(sanitizedEntity);
    },
    async unlikeDocument(ctx) {
      if (!ctx.state.user)
        return ctx.forbidden("only authenticated user can unlike documents.");
      const user = ctx.state.user;
      const documentId = ctx.params.id;
      const { query } = ctx;
      const updateDocument = await strapi
        .service("api::document.document")
        .unlikeDocument({
          documentId,
          userId: user.id,
          query,
        });
      const sanitizedEntity = await this.sanitizeOutput(updateDocument, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  })
);
