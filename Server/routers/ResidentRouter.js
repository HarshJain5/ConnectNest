const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Announcement = require("../models/Announcement");
const FamilyMember = require("../models/FamilyMember");
const Complaint = require("../models/Complaint");
const User = require("../models/User");
const MaintenanceBill = require("../models/MaintenanceBill");
const multer = require("multer");
const {upload}=require("../helpers/Cloudinary");
const calculateSimilarity = require("../helpers/SmartSimilarity");



// ✅ Resident announcements API
router.get("/announcements", authMiddleware(["resident"]), async (req, res) => {
  try {
    const anns = await Announcement.find({
      communityId: req.user.communityId,
      status: "published"
    }).sort({ createdAt: -1 }); // latest first

    res.json(anns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});





// 🔹 Get profile + family members
router.get("/profile", authMiddleware(["resident"]), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password")
      .populate("communityId", "name communityCode"); // ✅ Community details le aayega

    const family = await FamilyMember.find({ residentId: req.user.userId });

    res.json({ profile: user, family });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});


// 🔹 Update resident profile
router.put("/profile", authMiddleware(["resident"]), async (req, res) => {
  try {
    const { firstName, lastName, mobile, flatNumber } = req.body;

 // ✅ Mobile validation
    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({ error: "Mobile number must be 10 digits" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { firstName, lastName, mobile, flatNumber },
      { new: true, select: "-password" }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Profile updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});


// 🔹 Add family member
router.post("/family-member", authMiddleware(["resident"]), async (req, res) => {
  try {
    
    const { name, age, gender, relation } = req.body;
    

    const fam = await FamilyMember.create({
      residentId: req.user.userId,
      name,
      age,
      gender,
      relation,
    });

    res.json({ message: "Family member added", fam });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add family member" });
  }
});

// 🔹 Update family member
router.put("/family-member/:id", authMiddleware(["resident"]), async (req, res) => {
  try {
    const fam = await FamilyMember.findOneAndUpdate(
      { _id: req.params.id, residentId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!fam) return res.status(404).json({ error: "Family member not found" });
    res.json({ message: "Family member updated", fam });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update family member" });
  }
});

// 🔹 Delete family member
router.delete("/family-member/:id", authMiddleware(["resident"]), async (req, res) => {
  try {
    const fam = await FamilyMember.findOneAndDelete({
      _id: req.params.id,
      residentId: req.user.userId,
    });

    if (!fam) return res.status(404).json({ error: "Family member not found" });
    res.json({ message: "Family member deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete family member" });
  }
});

// 🔹 Update Profile Image
router.put(
  "/profile-image",
  authMiddleware(["resident"]),
  upload.single("profileImage"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image uploaded" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.userId,
        { profileImage: req.file.path },
        { new: true }
      );

      res.json({
        message: "Profile image updated",
        image: updatedUser.profileImage,
      });

    } catch (err) {
      res.status(500).json({ error: "Failed to update profile image" });
    }
  }
);

//bill
router.get("/maintenance/bills", authMiddleware(["resident"]), async (req, res) => {
  const bills = await MaintenanceBill.find({
    residentId: req.user.userId, // ✅ sirf apne hi bills
    communityId: req.user.communityId
  });
  res.json(bills);
});

// ✅ Mark Bill as Paid
router.put("/maintenance/bills/:id/pay", authMiddleware(["resident"]), async (req, res) => {
  try {
    const bill = await MaintenanceBill.findOne({
  _id: req.params.id,
  residentId: req.user.userId,
  communityId: req.user.communityId
});

    if (!bill) return res.status(404).json({ error: "Bill not found" });

    if (bill.status === "Paid") {
      return res.status(400).json({ error: "Bill already paid" });
    }

    bill.status = "Paid";
    bill.paidAt = new Date();
    await bill.save();

    res.json({ message: "Bill marked as Paid", bill });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update bill" });
  }
});

// router.post(
//   "/complaints",
//   authMiddleware(["resident"]),
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const { title, description } = req.body;
//       const imageUrl = req.file ? req.file.path : "";

//       const fullText = title + " " + description;

//       // 1️⃣ Fetch existing complaints in same community
//       const existingComplaints = await Complaint.find({
//         communityId: req.user.communityId
//       });

//       let highestSimilarity = 0;
//       let mostSimilarComplaint = null;

//       // 2️⃣ Compare similarity
//       for (let existing of existingComplaints) {
//   const existingText = existing.title + " " + existing.description;

//   const similarity = await calculateSimilarity(fullText, existingText);

//   if (similarity > highestSimilarity) {
//     highestSimilarity = similarity;
//     mostSimilarComplaint = existing;
//   }
// }

//       // 3️⃣ Threshold logic (Duplicate Found)
//       if (highestSimilarity > 0.7 && mostSimilarComplaint) {

//         // Increase duplicate count of original complaint
//         const updatedComplaint = await Complaint.findByIdAndUpdate(
//           mostSimilarComplaint._id,
//           { $inc: { duplicateCount: 1 } },
//           { new: true }
//         );

//         return res.status(200).json({
//           isDuplicate: true,
//           originalComplaintId: updatedComplaint._id,
//           duplicateCount: updatedComplaint.duplicateCount,
//           message: "Similar complaint already exists."
//         });
//       }

//       // 4️⃣ If NOT duplicate → Save new complaint
//       const complaint = new Complaint({
//         title,
//         description,
//         imageUrl,
//         residentId: req.user.userId,
//         communityId: req.user.communityId,
//         duplicateCount: 1, // first report
//         aiAnalysis: {
//           isDuplicate: false,
//           relatedComplaintId: null,
//           similarityScore: highestSimilarity
//         }
//       });

//       await complaint.save();

//       res.status(201).json({
//         isDuplicate: false,
//         complaint,
//         message: "Complaint submitted successfully."
//       });

//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }
// );




// Get My + Others' Complaints
router.post(
  "/complaints",
  authMiddleware(["resident"]),
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const imageUrl = req.file ? req.file.path : "";

      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Title and description are required"
        });
      }

      const fullText = title + " " + description;

      // 1️⃣ Fetch existing complaints of same community
      const existingComplaints = await Complaint.find({
        communityId: req.user.communityId
      });

      let highestSimilarity = 0;
      let mostSimilarComplaint = null;

      // 2️⃣ Compare similarity
      for (let existing of existingComplaints) {
        const existingText =
          (existing.title || "") + " " + (existing.description || "");

        const similarity = calculateSimilarity(fullText, existingText);

        // 🔎 Debug (optional — remove after testing)
        // console.log("Similarity:", similarity);

        if (similarity > highestSimilarity) {
          highestSimilarity = similarity;
          mostSimilarComplaint = existing;
        }
      }

      // 3️⃣ Duplicate Check (Threshold tuned)
      // 3️⃣ Duplicate Check (Improved Logic)
if (highestSimilarity > 0.65 && mostSimilarComplaint) {

  let updatedComplaint = mostSimilarComplaint;

  // ✅ Check if this resident already reported this complaint
  if (!mostSimilarComplaint.reportedResidents.includes(req.user.userId)) {

    updatedComplaint = await Complaint.findByIdAndUpdate(
      mostSimilarComplaint._id,
      {
        $inc: { duplicateCount: 1 },
        $addToSet: { reportedResidents: req.user.userId }
      },
      { new: true }
    );
  }

  return res.status(200).json({
    success: true,
    isDuplicate: true,
    originalComplaintId: updatedComplaint._id,
    duplicateCount: updatedComplaint.duplicateCount,
    similarityScore: highestSimilarity,
    message: "Similar complaint already exists."
  });
}

      // 4️⃣ If NOT duplicate → Save new complaint
      const complaint = new Complaint({
        title,
        description,
        imageUrl,
        residentId: req.user.userId,
        communityId: req.user.communityId,
        duplicateCount: 1,
        aiAnalysis: {
          isDuplicate: false,
          relatedComplaintId: null,
          similarityScore: highestSimilarity
        },
        reportedResidents: [req.user.userId],
      });

      await complaint.save();

      res.status(201).json({
        success: true,
        isDuplicate: false,
        complaint,
        similarityScore: highestSimilarity,
        message: "Complaint submitted successfully."
      });

    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
);

router.get(
    "/complaints",
    authMiddleware(["resident"]),
    async (req, res) => {
        try {
            const myComplaints = await Complaint.find({
                residentId: req.user.userId,
            }).sort({ createdAt: -1 });

            const othersComplaints = await Complaint.find({
                communityId: req.user.communityId,
                residentId: { $ne: req.user.userId },
            })
                .populate("residentId", "firstName lastName flatNumber")
                .sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                myComplaints,
                othersComplaints,
            });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
);

// Update Complaint
router.put(
    "/complaints/:id",
    authMiddleware(["resident"]),
    async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description } = req.body;

            const updated = await Complaint.findOneAndUpdate(
                { _id: id, residentId: req.user.userId }, // only owner can update
                { title, description },
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
// Delete Complaint
router.delete(
    "/complaints/:id",
    authMiddleware(["resident"]),
    async (req, res) => {
        try {
            const { id } = req.params;

            const deleted = await Complaint.findOneAndDelete({
                _id: id,
                residentId: req.user.userId,
            });

            if (!deleted) {
                return res.status(404).json({ success: false, message: "Complaint not found" });
            }

            res.json({ success: true, message: "Complaint deleted successfully" });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
);

module.exports = router;
