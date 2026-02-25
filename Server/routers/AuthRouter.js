const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken"); 
const User = require('../models/User');
const Community = require('../models/Community');
const EmailVerification = require('../models/EmailVerification');
const { sendMail } = require("../helpers/Nodemailer");
const validatePassword = require("../helpers/passwordValidator");
const crypto = require("crypto");
const frontendurl=process.env.FRONTEND_URL || "http://localhost:3000";

// Helper to generate community code
const generateCode = (name) => {
  const prefix = name.trim().toUpperCase().split(' ')[0];
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${random}`;
};


router.post("/verify-email", async (req, res) => {
  try {
    const { email } = req.body;

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.status(400).json({
        error: "Email is already registered with us.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await EmailVerification.findOneAndUpdate(
      { email },
      {
        email,
        token,
        expiresAt: Date.now() + 15 * 60 * 1000,
        verified: false,
      },
      { upsert: true, new: true }
    );

    const link = `${frontendurl}/verify-email/${token}`;

    await sendMail(
      email,
      "Verify your email",
      `<a href="${link}">Click here to verify</a>`
    );

    res.json({ message: "Verification email sent" });
  } catch (err) {
    console.error("EMAIL ERROR 👉", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});


router.get("/verify-email/:token", async (req, res) => {
  try {
    const record = await EmailVerification.findOne({
      token: req.params.token,
      expiresAt: { $gt: Date.now() },
    });

    if (!record) {
      return res.status(400).json({
        error: "Verification link expired or invalid",
      });
    }

    record.verified = true;
    await record.save();

    // ✅ SEND JSON, NOT REDIRECT
    return res.status(200).json({
      message: "Email verified successfully",
      email: record.email,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});




router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      password,
      communityName,
      communityType,
      unit,
      address,
      state,
      city,
      pincode,
    } = req.body;

    // 1️⃣ check email verified
    const emailCheck = await EmailVerification.findOne({
      email,
      verified: true,
    });

    if (!emailCheck) {
      return res.status(400).json({
        error: "Please verify your email first",
      });
    }

    // 2️⃣ prevent duplicate user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User already registered",
      });
    }

    // 3️⃣ create community
    const community = await Community.create({
      name: communityName,
      type: communityType,
      unit,
      address,
      state,
      city,
      pincode,
      communityCode: generateCode(communityName),
    });

    // 4️⃣ password validation
    if (!validatePassword(password)) {
      return res.status(400).json({
        field: "password",
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number and special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ CREATE USER (IMPORTANT)
    await User.create({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,
      role: "admin",
      status: "pending",
      communityId: community._id,
    });

    res.status(201).json({
      message: "Admin registered and pending approval.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Something went wrong during registration.",
    });
  }
});

router.post("/admin-login", async (req, res) => {
  const { email, password, communityCode } = req.body;

  try {
    const user = await User.findOne({ email }).populate("communityId");
    if (!user) return res.status(404).json({ error: "Email not found" });
    if (user.role !== "admin") return res.status(403).json({ error: "Not an admin account" });
    if (user.status !== "approved") return res.status(401).json({ error: "Your account is not approved yet" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

    if (user.communityId.communityCode !== communityCode) {
      return res.status(400).json({ error: "Community ID does not match" });
    }

    // ✅ JWT Token Generate
    const token = jwt.sign(
      { userId: user._id, role: user.role, communityId: user.communityId._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token,
      communityName: user.communityId.name,
      communityCode: user.communityId.communityCode
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during login" });
  }
});




// POST /api/auth/forgot-password
router.post("/forget-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Email not registered" });

    // create short-lived JWT (15 minutes)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // store token & expiry in DB (so we can invalidate / ensure one-time-use)
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // frontend url from env or fallback
    const resetLink = `${frontendurl}/reset-password/${token}`;

    // send the mail (re-usable sendMail)
    await sendMail(
      user.email,
      "Connectopia - Password Reset",
      `
        <p>Hello ${user.firstName || ""},</p>
        <p>We received a request to reset your password. Click the link below to set a new password. This link expires in 15 minutes.</p>
        <p><a href="${resetLink}">Reset your password</a></p>
        <p>If you didn't request this, ignore this email.</p>
      `
    );

    res.json({ message: "Reset link sent to your email (if it exists in our system)." });
  } catch (err) {
    console.error("forget-password error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // ✅ 1️⃣ STRONG PASSWORD VALIDATION
    if (!validatePassword(password)) {
      return res.status(400).json({
        field: "password",
        error:
          "Password must be at least 8 characters long and include uppercase, lowercase, number and special character",
      });
    }

    // ✅ 2️⃣ verify token
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // ✅ 3️⃣ find user
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(400).json({ error: "Invalid token (user not found)" });
    }

    // ✅ 4️⃣ one-time token validation
    if (!user.resetToken || user.resetToken !== token) {
      return res.status(400).json({ error: "Token already used or invalid" });
    }

    if (!user.resetTokenExpiry || user.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ error: "Token expired" });
    }

    // ✅ 5️⃣ hash & update password
    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;

    // ✅ 6️⃣ clear reset token
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.error("reset-password error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//resident-part
// Resident Login
router.post("/resident-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate("communityId");

    if (!user) return res.status(404).json({ error: "Email not found" });

    if (user.role !== "resident")
      return res.status(403).json({ error: "Not a resident account" });

    if (user.status !== "approved")
      return res.status(401).json({ error: "Your account is not approved yet" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

    // ✅ JWT Token Generate
    const token = jwt.sign(
      { userId: user._id, role: user.role, communityId: user.communityId._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      firstName: user.firstName,
      role: user.role,
      communityName: user.communityId.name,
      communityCode: user.communityId.communityCode,
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during login" });
  }
});


module.exports = router;
