const twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

async function sendSMS(to, message) {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE, // twilio number
      to: to
    });
    console.log("✅ SMS sent to", to);
  } catch (err) {
    console.error("❌ SMS error:", err.message);
  }
}

module.exports = sendSMS;
