"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {
    strapi.config.set("plugin.email", {
      provider: "nodemailer",
      providerOptions: {
        host: "agitara.panda-group.de", //SMTP Host
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
        secure: true,
        port: 465,
      },
      settings: {
        defaultFrom: `noreply@agitara.panda-group.de`,
        defaultReplyTo: `noreply@agitara.panda-group.de`,
        host: process.env.STRAPI_HOST,
        port: process.env.STRAPI_PORT,
      },
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
