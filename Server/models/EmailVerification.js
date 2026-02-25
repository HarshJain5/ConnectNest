const mongoose = require("mongoose");

const emailVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("EmailVerification", emailVerificationSchema);
