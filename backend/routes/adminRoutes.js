const express = require("express");
const {
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} = require("../controllers/AdminController");
const cloudinaryUpload = require("../middleware/cloudinaryUploads");

const router = express.Router();

router.get("/profiles", getAllProfiles);
router.get("/profiles/:id", getProfileById);
router.put("/profiles/:id", cloudinaryUpload.single("image"), updateProfile); // PUT /api/admin/profiles/123
router.delete("/profiles/:id", deleteProfile); // DELETE /api/admin/profiles/123

module.exports = router;
