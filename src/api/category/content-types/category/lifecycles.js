let slugify = require("slugify");
const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
  async beforeCreate(event) {
    await generateSlug(event);
  },

  async beforeUpdate(event) {
    await generateSlug(event);
  },
};

const generateSlug = async (event) => {
  const DEFAULT_LOCALE = "en";
  const { data } = event.params;
  const id = event.params?.where?.id ?? null;
  const locale = !id ? "en" : await getLocale(id);

  //Generate slug for en locale only
  if (!data.slug && data.title && locale == DEFAULT_LOCALE) {
    data.slug = slugify(data.title, { lower: true });
  }
};

const getLocale = async (id) => {
  const res = await strapi.service("api::category.category").findOne(id);

  return res?.locale ?? "not found";
};
