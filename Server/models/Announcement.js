// models/Announcement.js
const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    status: { type: String, enum: ["published", "unpublished"], default: "unpublished" },
    communityId: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
