const express = require("express");
const {
  register,
  login,
  logout,
  getMe,
  updateName,
  updateEmail,
  updatePassword,
  deleteAdmin,
} = require("../controllers/AdminUserController");
const { protectAdminRoute } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// ------------------------------------------------------------------
// 👤 PROTECTED GET ROUTE (பாதுகாக்கப்பட்ட விவரங்கள்)
// ------------------------------------------------------------------
router.get("/getMe", protectAdminRoute, getMe);

// ------------------------------------------------------------------
// 🛠️ PROTECTED UPDATE/DELETE ROUTES (பாதுகாக்கப்பட்ட நிர்வாக செயல்பாடுகள்)
// ------------------------------------------------------------------

// Admin Name-ஐ அப்டேட் செய்ய (PUT Request)
router.put("/update-name", protectAdminRoute, updateName);

// Admin Email-ஐ அப்டேட் செய்ய (PUT Request)
router.put("/update-email", protectAdminRoute, updateEmail);

// Admin Password-ஐ அப்டேட் செய்ய (PUT Request)
router.put("/update-password", protectAdminRoute, updatePassword);

// Admin Account-ஐ நீக்க (DELETE Request)
router.delete("/delete-admin", protectAdminRoute, deleteAdmin);

module.exports = router;
