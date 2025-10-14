const express = require("express");
const upload = require("../middleware/upload");
const {
  registerProfile,
  getAllProfiles,
} = require("../controllers/profileController");

const router = express.Router();

router.post("/register", upload.single("image"), registerProfile);
router.get("/all", getAllProfiles);

module.exports = router;
