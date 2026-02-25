const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: "" }, // resident uploaded image
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    residentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    communityId: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },

    // admin response section
    adminResponse: {
      text: { type: String, default: "" },
      imageUrl: { type: String, default: "" },
      respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      respondedAt: { type: Date },
    },
    //ai
    aiAnalysis: {
  isDuplicate: { type: Boolean, default: false },
  relatedComplaintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Complaint",
    default: null
  },
  similarityScore: { type: Number, default: 0 }
},
duplicateCount: {
  type: Number,
  default: 1
},
reportedResidents: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}],


  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
