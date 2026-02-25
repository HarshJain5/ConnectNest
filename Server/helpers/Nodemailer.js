
const nodemailer = require("nodemailer");

const sendMail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_ID,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
