const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Community = require('../models/Community');
const { sendMail  } = require("../helpers/Nodemailer");
const frontendurl=process.env.FRONTEND_URL || "http://localhost:3000";

router.get('/pending-admins', async (req, res) => {
  try {
    const pendingAdmins = await User.find({ role: "admin", status: "pending" }).populate("communityId");
    res.json(pendingAdmins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching pending admins" });
  }
});



router.put('/approve/:id', async (req, res) => { 
  try {
    const admin = await User.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    ).populate('communityId');

    if (!admin) return res.status(404).json({ error: "Admin not found" });

    // 👉 Send approval email
    await sendMail(
  admin.email,
  "🎉 Your Admin Access is Approved - ConnectNest",
  `
  <div style="font-family: Arial, sans-serif; background:#f4f7f9; padding:20px;">
    
    <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.1);">

      <div style="background:#2C3E50; color:white; padding:20px; text-align:center;">
        <h2 style="margin:0;">ConnectNest</h2>
        <p style="margin:5px 0;">Smart Community Management</p>
      </div>

      <div style="padding:25px; color:#333;">
        <h3>🎉 Congratulations, ${admin.firstName}!</h3>

        <p>Your admin registration has been <strong style="color:green;">approved</strong>.</p>

        <div style="background:#f8f9fa; padding:15px; border-radius:8px; margin:20px 0;">
          <p><strong>Login ID:</strong> ${admin.email}</p>
          <p><strong>Password:</strong> (Use the password you created)</p>
          <p><strong>Community ID:</strong> ${admin.communityId.communityCode}</p>
        </div>

        <p>You can now manage your society dashboard.</p>

        <div style="text-align:center; margin-top:25px;">
          <a href="${frontendurl}/admin-login"
            style="background:#2C3E50; color:white; padding:12px 25px; border-radius:30px; text-decoration:none;">
            Login to Dashboard
          </a>
        </div>
      </div>

      <div style="background:#f1f1f1; padding:15px; text-align:center; font-size:12px;">
        © ${new Date().getFullYear()} ConnectNest. All rights reserved.
      </div>

    </div>
  </div>
  `
);

    res.json({ message: "Admin approved and email sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.put('/reject/:id', async (req, res) => {
  try {
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ error: "Rejection reason required" });
    }

    const admin = await User.findById(req.params.id).populate('communityId');
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    // 👉 Send rejection email
    await sendMail(
  admin.email,
  "⚠️ Admin Registration Rejected - ConnectNest",
  `
  <div style="font-family: Arial, sans-serif; background:#f4f7f9; padding:20px;">
    
    <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.1);">

      <div style="background:#e74c3c; color:white; padding:20px; text-align:center;">
        <h2 style="margin:0;">ConnectNest</h2>
        <p style="margin:5px 0;">Registration Update</p>
      </div>

      <div style="padding:25px; color:#333;">
        <h3>⚠️ Hello ${admin.firstName},</h3>

        <p>Your admin registration has been <strong style="color:red;">rejected</strong>.</p>

        <div style="background:#fff3f3; padding:15px; border-radius:8px; margin:20px 0;">
          <p><strong>Reason:</strong></p>
          <p style="color:#e74c3c;">${reason}</p>
        </div>

        <p>If you think this was a mistake, feel free to contact support or try registering again.</p>

        <div style="text-align:center; margin-top:25px;">
          <a href="${frontendurl}"
            style="background:#2C3E50; color:white; padding:12px 25px; border-radius:30px; text-decoration:none;">
            Visit ConnectNest
          </a>
        </div>
      </div>

      <div style="background:#f1f1f1; padding:15px; text-align:center; font-size:12px;">
        © ${new Date().getFullYear()} ConnectNest. All rights reserved.
      </div>

    </div>
  </div>
  `
);

    // 👉 Delete Community
    if (admin.communityId) {
      await Community.findByIdAndDelete(admin.communityId._id);
    }

    // 👉 Delete User
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "Admin rejected, email sent, and records deleted." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});


module.exports = router; 
