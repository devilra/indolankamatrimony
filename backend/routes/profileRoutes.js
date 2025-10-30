const express = require("express");
const upload = require("../middleware/upload");
// const {
//   registerProfile,
//   getAllProfiles,
//   getProfileById,
// } = require("../controllers/profileController");
const cloudinaryUpload = require("../middleware/cloudinaryUploads");
const {
  sendOtp,
  verifyOtpAndRegister,

  getProfileById,
  registerProfile,
  getAllProfiles,
} = require("../controllers/profileController");

const router = express.Router();

// Register profile
// router.post("/register", upload.single("image"), registerProfile);

router.post("/register", cloudinaryUpload.single("image"), registerProfile);

// // Get all profiles
router.get("/all", getAllProfiles);

// // ✅ Get single profile by ID
router.get("/:id", getProfileById);

// 1. Confirm Profile  with otp verification

router.post("/send-otp", cloudinaryUpload.single("image"), sendOtp);

// 2. OTP confirm and Verification

router.post("/verify-and-register", verifyOtpAndRegister);

module.exports = router;
