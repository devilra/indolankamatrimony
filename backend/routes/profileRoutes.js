const express = require("express");
const upload = require("../middleware/upload");
const {
  registerProfile,
  getAllProfiles,
  getProfileById,
} = require("../controllers/profileController");
const cloudinaryUpload = require("../middleware/cloudinaryUploads");

const router = express.Router();

// Register profile
//router.post("/register", upload.single("image"), registerProfile);

router.post("/register", cloudinaryUpload.single("image"), registerProfile);

// Get all profiles
router.get("/all", getAllProfiles);

// ✅ Get single profile by ID
router.get("/:id", getProfileById);

module.exports = router;
