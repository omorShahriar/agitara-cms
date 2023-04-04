module.exports = ({ env }) => ({
  "strapi-plugin-populate-deep": {
    config: {
      defaultDepth: 3, // Default is 5
    },
  },
  email: {
    config: {
      provider: "strapi-provider-email-smtp",
      providerOptions: {
        host: "smtp.gmail.com", //SMTP Host
        port: 465, //SMTP Port
        secure: true,
        username: "omor.shahriar2000@gmail.com",
        password: "Riseabovehate22",
        rejectUnauthorized: true,
        requireTLS: true,
        connectionTimeout: 1,
      },
    },
    settings: {
      defaultFrom: "omor.shahriar2000@gmail.com",
      defaultReplyTo: "mahfuz1931004@stud.kuet.ac.bd",
    },
  },
});
