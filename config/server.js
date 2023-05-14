module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  // url: "http://89.163.209.153:1339",
  app: {
    keys: env.array("APP_KEYS"),
  },
});
