// models/community.model.js
const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },

  type: {
    type: String,
    enum: ["Apartment", "Society", "Township", "Gated Community"],
    required: true
  },

  unit: { type: String },
  address: { type: String },

  state: {
    type: String,
    enum: [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
      "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
      "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
      "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
      "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
      "Uttarakhand", "West Bengal"
    ]
  },

  city: { type: String },
  pincode: { type: String },

  communityCode: { type: String, unique: true }, // auto-generated from name
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Community", communitySchema);
