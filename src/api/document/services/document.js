"use strict";

/**
 * document service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::document.document", ({ strapi }) => ({
  async likeDocument(args) {
    const { documentId, userId, query } = args;
    const documentToLike = await strapi.entityService.findOne(
      "api::document.document",
      documentId,
      {
        populate: ["likedBy"],
      }
    );
    const updatedDocument = await strapi.entityService.update(
      "api::document.document",
      documentId,
      {
        data: {
          likedBy: [...documentToLike.likedBy, userId],
        },
        ...query,
      }
    );

    return updatedDocument;
  },
  async unlikeDocument(args) {
    const { documentId, userId, query } = args;

    const documentToUnlike = await strapi.entityService.findOne(
      "api::document.document",
      documentId,
      {
        populate: ["likedBy"],
      }
    );

    const updatedDocument = await strapi.entityService.update(
      "api::document.document",
      documentId,
      {
        data: {
          likedBy: documentToUnlike.likedBy.filter(
            (liker) => liker.id !== userId
          ),
        },
        ...query,
      }
    );
    return updatedDocument;
  },
}));
