
const nodemailer = require("nodemailer");

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
const sendMail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // very important
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});

  // ✅ ADD THIS FOR DEBUG
  await transporter.verify();
  console.log("SMTP connected successfully");

  const mailOptions = {
    from: process.env.MAIL_ID,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
