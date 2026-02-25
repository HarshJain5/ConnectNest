const mongoose = require("mongoose");

const familyMemberSchema = new mongoose.Schema(
  {
    residentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    relation: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FamilyMember", familyMemberSchema);
