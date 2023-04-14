module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: env("SMTP_PORT", 465),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
        secure: true,
      },
      settings: {
        defaultFrom: "omor.shahriar2000@gmail.com",
        defaultReplyTo: "omor.shahriar2000@gmail.com",
      },
    },
  },
});
