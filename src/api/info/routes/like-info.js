module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/infos/:id/like",
      handler: "api::info.info.likeInfo",
    },
    {
      method: "PUT",
      path: "/infos/:id/unlike",
      handler: "api::info.info.unlikeInfo",
    },
  ],
};
