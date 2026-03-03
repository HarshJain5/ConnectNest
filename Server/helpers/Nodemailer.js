
// const nodemailer = require("nodemailer");

// const sendMail = async (to, subject, html) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MAIL_ID,
//       pass: process.env.MAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.MAIL_ID,
//     to,
//     subject,
//     html,
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = { sendMail };

const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendMail = async (to, subject, html) => {
  try {
    const client = SibApiV3Sdk.ApiClient.instance;

    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
      email: process.env.MAIL_ID, // verified sender email in Brevo
      name: "ConnectNest",
    };

    const receivers = [{ email: to }];

    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject,
      htmlContent: html,
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email error:", error.response?.body || error.message);
  }
};

module.exports = { sendMail };
