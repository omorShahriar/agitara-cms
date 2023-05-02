module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/projects/:id/like",
      handler: "api::project.project.likeProject",
    },
    {
      method: "PUT",
      path: "/projects/:id/unlike",
      handler: "api::project.project.unlikeProject",
    },
  ],
};
