
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },

  email: { type: String, required: true, unique: true },
  mobile: { type: String },

  password: { type: String, required: true }, // bcrypt hashed

  role: {
    type: String,
    enum: ["superadmin", "admin", "resident"],
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true
  },


  // For residents
  flatNumber: { type: String },         // e.g., A-101
  totalFamilyMembers: { type: Number }, // optional, can be calculated later

  profileImage: String,

  // Password reset
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);

