"use strict";

/**
 * project service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::project.project", ({ strapi }) => ({
  async likeProject(args) {
    const { projectId, userId, query } = args;
    const projectToLike = await strapi.entityService.findOne(
      "api::project.project",
      projectId,
      {
        populate: ["likedBy"],
      }
    );
    const updatedProject = await strapi.entityService.update(
      "api::project.project",
      projectId,
      {
        data: {
          likedBy: [...projectToLike.likedBy, userId],
        },
        ...query,
      }
    );

    return updatedProject;
  },
  async unlikeProject(args) {
    const { projectId, userId, query } = args;

    const projectToUnlike = await strapi.entityService.findOne(
      "api::project.project",
      projectId,
      {
        populate: ["likedBy"],
      }
    );

    const updatedProject = await strapi.entityService.update(
      "api::project.project",
      projectId,
      {
        data: {
          likedBy: projectToUnlike.likedBy.filter(
            (liker) => liker.id !== userId
          ),
        },
        ...query,
      }
    );
    return updatedProject;
  },
}));
