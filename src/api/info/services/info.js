"use strict";

/**
 * info service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::info.info", ({ strapi }) => ({
  async likeInfo(args) {
    const { infoId, userId, query } = args;
    const infoToLike = await strapi.entityService.findOne(
      "api::info.info",
      infoId,
      {
        populate: ["likedBy"],
      }
    );
    const updatedInfo = await strapi.entityService.update(
      "api::info.info",
      infoId,
      {
        data: {
          likedBy: [...infoToLike.likedBy, userId],
        },
        ...query,
      }
    );
    return updatedInfo;
  },
  async unlikeInfo(args) {
    const { infoId, userId, query } = args;
    const infoToUnlike = await strapi.entityService.findOne(
      "api::info.info",
      infoId,
      {
        populate: ["likedBy"],
      }
    );
    const updatedInfo = await strapi.entityService.update(
      "api::info.info",
      infoId,
      {
        data: {
          likedBy: infoToUnlike.likedBy.filter((liker) => liker !== userId),
        },
        ...query,
      }
    );
    return updatedInfo;
  },
}));
