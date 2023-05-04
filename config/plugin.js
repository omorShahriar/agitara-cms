module.exports = ({ env }) => ({
  "strapi-plugin-populate-deep": {
    config: {
      defaultDepth: 3, // Default is 5
    },
  },
  "import-export-entries": {
    enabled: true,
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "agitara.panda-group.de"),
        port: env("SMTP_PORT", 465),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
        secure: true,
      },
      settings: {
        defaultFrom: "noreply@agitara.panda-group.de",
        defaultReplyTo: "noreply@agitara.panda-group.de",
      },
    },
  },
});
