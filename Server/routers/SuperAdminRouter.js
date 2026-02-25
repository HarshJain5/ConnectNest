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
      "Your Admin Access is Approved!",
      `
        <h3>Congratulations!</h3>
        <p>Your registration has been approved in <strong>CONNECTOPIA</strong>. Below are your credentials:</p>
        <ul>
          <li><strong>Login ID:</strong> ${admin.email}</li>
          <li><strong>Password:</strong> (Password you set at registration)</li>
          <li><strong>Community ID:</strong> ${admin.communityId.communityCode}</li>
        </ul>
        <p><a href=${frontendurl}/admin-login >Login Here</a></p>
      `
    );

    res.json({ message: "Admin approved and email sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});




module.exports = router; 
