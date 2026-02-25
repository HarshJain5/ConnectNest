const express = require("express");
const crypto = require("crypto");
const razorpay = require("../helpers/razorpay");
const MaintenanceBill = require("../models/MaintenanceBill");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Create Razorpay Order
router.post("/create-order/:billId", authMiddleware(["resident"]), async (req, res) => {
  const bill = await MaintenanceBill.findById(req.params.billId);

  if (!bill || bill.status === "Paid") {
    return res.status(400).json({ error: "Invalid bill" });
  }

  const order = await razorpay.orders.create({
    amount: bill.amount * 100, // paise
    currency: "INR",
    receipt: `bill_${bill._id}`,
  });

  res.json({
    orderId: order.id,
    amount: bill.amount,
    key: process.env.RAZORPAY_KEY_ID,
  });
});

router.post("/verify-payment", authMiddleware(["resident"]), async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, billId } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSign !== razorpay_signature) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  // ✅ Mark Bill Paid
  await MaintenanceBill.findByIdAndUpdate(billId, {
    status: "Paid",
    paidAt: new Date(),
    paymentMode: "Online",
  });

  res.json({ message: "Payment verified & bill paid" });
});

module.exports = router;