module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/documents/:id/like",
      handler: "api::document.document.likeDocument",
    },
    {
      method: "PUT",
      path: "/documents/:id/unlike",
      handler: "api::document.document.unlikeDocument",
    },
  ],
};
