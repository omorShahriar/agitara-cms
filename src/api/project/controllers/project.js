"use strict";
var format = require("date-fns/format");
/**
 * project controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::project.project", ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    const nonExpiredProjects = await strapi
      .service("api::project.project")
      .find({
        ...query,
        filters: {
          ...query.filters,
          expiryDate: {
            $gt: format(new Date(), "yyyy-MM-dd"),
          },
        },
      });
    const sanitizedProjects = await this.sanitizeOutput(
      nonExpiredProjects,
      ctx
    );
    return this.transformResponse(sanitizedProjects);
  },

  async likeProject(ctx) {
    if (!ctx.state.user)
      return ctx.forbidden("only authenticated user can like projects.");
    const user = ctx.state.user;
    const projectId = ctx.params.id;
    const { query } = ctx;
    const updateProject = await strapi
      .service("api::project.project")
      .likeProject({
        projectId,
        userId: user.id,
        query,
      });
    const sanitizedEntity = await this.sanitizeOutput(updateProject, ctx);
    return this.transformResponse(sanitizedEntity);
  },
  async unlikeProject(ctx) {
    if (!ctx.state.user)
      return ctx.forbidden("only authenticated user can unlike projects.");
    const user = ctx.state.user;
    const projectId = ctx.params.id;
    const { query } = ctx;
    const updateProject = await strapi
      .service("api::project.project")
      .unlikeProject({
        projectId,
        userId: user.id,
        query,
      });
    const sanitizedEntity = await this.sanitizeOutput(updateProject, ctx);
    return this.transformResponse(sanitizedEntity);
  },
}));
