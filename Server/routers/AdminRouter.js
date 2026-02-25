const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Community=require("../models/Community")
const Announcement=require('../models/Announcement')
const MaintenanceBill = require("../models/MaintenanceBill");
const FamilyMember = require("../models/FamilyMember");
const authMiddleware = require("../middleware/authMiddleware");
const { sendMail } = require("../helpers/Nodemailer");
const twilio = require("twilio");
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const Complaint = require("../models/Complaint");
const multer = require("multer");
const {upload}=require("../helpers/Cloudinary");
const validatePassword = require("../helpers/passwordValidator");
const frontendurl=process.env.FRONTEND_URL || "http://localhost:3000";


// ✅ Protected route – sirf admin role allowed
router.get("/dashboard", authMiddleware(["admin"]), async (req, res) => {
  try {
    res.json({
      message: "Admin Dashboard Data",
      user: {
        id: req.user.userId,
        role: req.user.role,
        communityId: req.user.communityId
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error in dashboard" });
  }
});


// ✅ Get all residents of admin's community
router.get("/residents", authMiddleware(["admin"]), async (req, res) => {
  try {
    const residents = await User.find({
      role: "resident",
      communityId: req.user.communityId
    }).select("-password"); // password hide

    res.json(residents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch residents" });
  }
});




router.post("/add-resident", authMiddleware(["admin"]), async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, password, flatNumber, totalFamilyMembers } = req.body;

    // Check duplicate email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // 🔐 Strong password validation
if (!validatePassword(password)) {
  return res.status(400).json({
    error:
      "Password must be at least 8 characters long and include uppercase, lowercase, number and special character",
  });
}

    const hashedPassword = await bcrypt.hash(password, 10);

    let smsSent = false;
    let emailSent = false;

    // ✅ Try sending SMS with full error logging
    try {
      const smsResponse = await client.messages.create({
        body: `Welcome ${firstName}! Your account is successfully created on Connectopia.\nEmail: ${email}.\n Check Your Registered Mail box for Credentials.`,
        from: process.env.TWILIO_PHONE,
        to: `+91${mobile}`
      });
      console.log("✅ SMS sent successfully. SID:", smsResponse.sid);
      smsSent = true;
    } catch (smsErr) {
      console.error("❌ SMS sending failed. Full error object:", smsErr);
    }

    // ✅ Try sending Email
    try {
      await sendMail(
        email,
        "Welcome to Connectopia",
        `<p>Hello ${firstName},</p>
         <p>Your account has been created successfully on <strong>CONNECTOPIA<strong>.</p>
         <p>Email: ${email}</p>
         <p>Password: ${password}</p>`
      );
      console.log("✅ Email sent successfully to:", email);
      emailSent = true;
    } catch (mailErr) {
      console.error("❌ Email sending failed. Full error object:", mailErr);
    }

    // ❌ If both failed
    if (!smsSent && !emailSent) {
      return res.status(500).json({ error: "Failed to send both Email and SMS. Registration aborted." });
    }

    // ✅ Save to DB
    await User.create({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,
      role: "resident",
      status: "approved",
      flatNumber,
      totalFamilyMembers,
      communityId: req.user.communityId
    });

    res.json({
      message: `Resident added successfully. 
        ${smsSent ? "SMS sent." : ""} 
        ${emailSent ? "Email sent." : ""}`
    });

  } catch (err) {
    console.error("❌ Unexpected server error:", err);
    res.status(500).json({ error: "Failed to add resident" });
  }
});


router.put("/residents/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    const { firstName, lastName, mobile, flatNumber, totalFamilyMembers, status } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
      firstName, lastName, mobile, flatNumber, totalFamilyMembers, status
    });

    res.json({ message: "Resident updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update resident" });
  }
});

router.delete("/residents/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Resident deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete resident" });
  }
});

router.get("/residents-with-family", authMiddleware(["admin"]), async (req, res) => {
  try {
    const residents = await User.find({
      communityId: req.user.communityId,
      role: "resident"
    }).select("-password");

    // har resident ke family fetch karo
    const result = [];
    for (let r of residents) {
      const fam = await FamilyMember.find({ residentId: r._id });
      result.push({ ...r.toObject(), family: fam });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error in fetching residents with family" });
  }
});



// Manage-announcements
// Add new announcement
router.post("/add-announcements", authMiddleware(["admin"]), async (req, res) => {
  try {
    const { title, message } = req.body;
    const announcement = await Announcement.create({
      title,
      message,
      status: "unpublished",
      communityId: req.user.communityId,
      createdAt: new Date()
    });
    res.json({ message: "Announcement created", announcement });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create announcement" });
  }
});

// Get all announcements
router.get("/announcements", authMiddleware(["admin"]), async (req, res) => {
  try {
    const announcements = await Announcement.find({ communityId: req.user.communityId }).sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});

router.put("/announcements/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    const { title, message } = req.body;

    const ann = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, message },
      { new: true }
    );

    if (!ann) return res.status(404).json({ error: "Announcement not found" });

    // ✅ get community name
    const community = await Community.findById(req.user.communityId);
    const colonyName = community ? community.name : "Your Colony";
    const dashLink = `${frontendurl}/resident/dashboard`;

    // ✅ fetch residents of that community
    const residents = await User.find({
      communityId: req.user.communityId,
      role: "resident",
      status: "approved",
    });

    const smsBody = `📢 Announcement regarding "${ann.title}" has been Updated in ${colonyName}.\n\nCheck your dashboard for updated Announcement: ${dashLink}`;

    // ✅ send SMS to each resident
    for (const resi of residents) {
      try {
        await client.messages.create({
          body: smsBody,
          from: process.env.TWILIO_PHONE,
          to: `+91${resi.mobile}`,
        });
      } catch (smsErr) {
        console.error(`❌ SMS failed to ${resi.mobile}:`, smsErr.message);
      }
    }

    res.json({ message: "Announcement updated & residents notified", ann });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update announcement" });
  }
});


// Delete announcement
router.delete("/announcements/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    await Announcement.findOneAndDelete({ _id: req.params.id, communityId: req.user.communityId });
    res.json({ message: "Announcement deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete announcement" });
  }
});

// Publish/Unpublish
router.put("/announcements/:id/toggle", authMiddleware(["admin"]), async (req, res) => {
  try {
    const ann = await Announcement.findById(req.params.id);
    if (!ann) return res.status(404).json({ error: "Not found" });

    ann.status = ann.status === "published" ? "unpublished" : "published";
    await ann.save();

    // ✅ only send when publishing
    if (ann.status === "published") {
      // get all residents of same community
      const residents = await User.find({
        communityId: req.user.communityId,
        role: "resident",
        status: "approved",
      });

      const community = await Community.findById(req.user.communityId);
const colonyName = community ? community.name : "Your Colony";

      const dashLink = `${frontendurl}/resident/dashboard`; // frontend URL

      const smsBody = `📢 New Announcement in ${colonyName}!\n\n"${ann.title}"\n\nLogin to your dashboard to view th full Announcement: ${dashLink}`;

      // send SMS one by one
      for (const r of residents) {
        try {
          await client.messages.create({
            body: smsBody,
            from: process.env.TWILIO_PHONE,
            to: `+91${r.mobile}`,
          });
        } catch (err) {
          console.error("SMS failed to:", r.mobile, err.message);
        }
      }

      
    }

    res.json({ message: "Status updated", announcement: ann });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update status" });
  }
});


//maintance
// ✅ Create Bill
router.post("/maintenance/create", authMiddleware(["admin"]), async (req, res) => {
  const { residentId, month, year, amount, dueDate } = req.body;

  const resident = await User.findById(residentId);
  if (!resident) return res.status(404).json({ error: "Resident not found" });

  const bill = new MaintenanceBill({
    residentId,
    communityId: req.user.communityId, // ✅ admin jis community ka hai wahi save hoga
    flatNumber: resident.flatNumber,
    month,
    year,
    amount,
    dueDate
  });

  await bill.save();
  res.json({ message: "Bill created", bill });
});




// ✅ Get All Bills (with resident info)
router.get("/maintenance/bills", authMiddleware(["admin"]), async (req, res) => {
  const bills = await MaintenanceBill.find({ communityId: req.user.communityId })
    .populate("residentId", "firstName lastName flatNumber email");
  res.json(bills);
});


// ✅ Update Bill (amount, dueDate, etc.)
router.put("/maintenance/bills/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    const bill = await MaintenanceBill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Bill updated successfully", bill });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating bill" });
  }
});

// ✅ Mark as Paid
router.put("/maintenance/bills/:id/pay", authMiddleware(["admin"]), async (req, res) => {
  try {
    const bill = await MaintenanceBill.findByIdAndUpdate(
      req.params.id,
      { status: "Paid" },
      { new: true }
    );
    res.json({ message: "Bill marked as Paid", bill });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error marking bill as Paid" });
  }
});
//update bill
router.put("/maintenance/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    const { amount, dueDate, status } = req.body;

    const updatedBill = await MaintenanceBill.findByIdAndUpdate(
      req.params.id,
      { amount, dueDate, status },
      { new: true }
    );

    if (!updatedBill) return res.status(404).json({ error: "Bill not found" });

    res.json({ message: "Bill updated successfully", updatedBill });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while updating bill" });
  }
});


// ✅ Delete Bill
router.delete("/maintenance/bills/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    await MaintenanceBill.findByIdAndDelete(req.params.id);
    res.json({ message: "Bill deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting bill" });
  }
});


// GET /api/admin/complaints?status=Pending
router.get("/complaints", authMiddleware(["admin"]), async (req, res) => {
  try {
    const { status } = req.query;
    const query = { communityId: req.user.communityId }; // admin limited to own community
    if (status) query.status = status;

    const complaints = await Complaint.find(query)
      .populate("residentId", "firstName lastName flatNumber mobile email")
  .populate("reportedResidents", "firstName lastName flatNumber")
      .sort({ createdAt: -1 });

    res.json({ success: true, complaints });
  } catch (err) {
    console.error("admin/complaints GET:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single complaint
router.get("/complaints/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    const c = await Complaint.findOne({
      _id: req.params.id,
      communityId: req.user.communityId,
    }).populate("residentId", "firstName lastName flatNumber mobile email");

    if (!c) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, complaint: c });
  } catch (err) {
    console.error("admin/complaints/:id GET:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});


router.put(
  "/complaints/:id",
  authMiddleware(["admin"]),
  upload.single("responseImage"),
  async (req, res) => {
    try {
      const complaint = await Complaint.findOne({
        _id: req.params.id,
        communityId: req.user.communityId,
      });
      if (!complaint) return res.status(404).json({ success: false, message: "Complaint not found" });

      const { status, adminText } = req.body;

      if (status) {
        if (!["Pending", "In Progress", "Resolved"].includes(status)) {
          return res.status(400).json({ success: false, message: "Invalid status" });
        }
        complaint.status = status;
      }

      if (adminText) {
        complaint.adminResponse = complaint.adminResponse || {};
        complaint.adminResponse.text = adminText;
        complaint.adminResponse.respondedBy = req.user.userId;
        complaint.adminResponse.respondedAt = new Date();
      }

      if (req.file && req.file.path) {
        complaint.adminResponse = complaint.adminResponse || {};
        complaint.adminResponse.imageUrl = req.file.path; // multer-storage-cloudinary sets `path` to secure_url
      }

      await complaint.save();

      // Optionally: Notify resident(s) here (SMS/push/email) — add later
      res.json({ success: true, complaint });
    } catch (err) {
      console.error("admin/complaints/:id PUT:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
);
// Admin adds response to complaint
router.put(
    "/complaints/:id/response",
    authMiddleware(["admin"]), // sirf admin kare
    async (req, res) => {
        try {
            const { id } = req.params;
            const { response } = req.body;

            const updated = await Complaint.findByIdAndUpdate(
                id,
                { adminResponse: response },
                { new: true }
            );

            if (!updated) {
                return res.status(404).json({ success: false, message: "Complaint not found" });
            }

            res.json({ success: true, complaint: updated });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
);

// ✅ Dashboard Stats (REAL DATA)
router.get(
  "/dashboard/stats",
  authMiddleware(["admin"]),
  async (req, res) => {
    try {
      const communityId = req.user.communityId;

      const residents = await User.countDocuments({
        role: "resident",
        communityId
      });

      const complaints = await Complaint.countDocuments({
        communityId
      });

      const bills = await MaintenanceBill.countDocuments({
        communityId
      });

      const announcements = await Announcement.countDocuments({
        communityId
      });

      res.json({
        residents,
        complaints,
        bills,
        announcements
      });
    } catch (err) {
      console.error("Dashboard Stats Error:", err);
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  }
);


module.exports = router;
