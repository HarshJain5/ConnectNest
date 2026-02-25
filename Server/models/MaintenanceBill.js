const mongoose = require("mongoose");

const MaintenanceBillSchema = new mongoose.Schema({
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true }, // ✅ Add this
  flatNumber: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  paidAt: { type: Date },
  paymentMode: { type: String, enum: ["Online", "Cash"], default: "Online" } // optional
}, { timestamps: true });

module.exports = mongoose.model("MaintenanceBill", MaintenanceBillSchema);

