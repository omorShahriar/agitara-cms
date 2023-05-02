let slugify = require("slugify");
const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
  async beforeCreate(event) {
    await generateSlug(event);
  },

  async beforeUpdate(event) {
    await updateSlug(event);
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
const updateSlug = async (event) => {
  const DEFAULT_LOCALE = "en";
  const { data } = event.params;
  const id = event.params?.where?.id ?? null;
  const locale = !id ? "en" : await getLocale(id);

  if (data.title && locale == DEFAULT_LOCALE) {
    data.slug = slugify(data.title, { lower: true });
  }
};

const getLocale = async (id) => {
  const res = await strapi.service("api::project.project").findOne(id);

  return res?.locale;
};
