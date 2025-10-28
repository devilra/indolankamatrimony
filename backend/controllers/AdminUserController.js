const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Email address is already registered." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  பதிவு செய்யப்பட்ட தேதியைத் தனித்தனி Fields-க்கு பிரித்தல்
    const now = new Date();
    const register_date = now.getDate();
    const register_month = now.getMonth();
    const register_year = now.getFullYear();

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      register_date,
      register_month,
      register_year,
    });

    res.status(201).json({
      message: "Admin registered successfully. Please login.",
      adminId: newAdmin.id,
    });
  } catch (error) {
    console.error("Admin Registration Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  //console.log(req.body);
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const payload = {
      admin: {
        id: admin.id,
        email: admin.email,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("admin_auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({
      message: "Login successful",
      adminId: admin.id,
      // Client-க்கு token-ஐ அனுப்பத் தேவையில்லை, ஏனெனில் அது Cookie-யில் உள்ளது.
    });
  } catch (error) {
    console.error("Admin Login Error:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
};

exports.getMe = async (req, res) => {
  //console.log("Get Me called");
  try {
    const admin = await Admin.findByPk(req.adminId, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!admin) {
      // இந்த பிழை பெரும்பாலும் JWT-யில் உள்ள ID தவறாக இருக்கும்போது நிகழும்
      return res.status(404).json({ message: "Admin not found." });
    }

    res.status(200).json({
      status: true,
      admin: admin,
    });
  } catch (error) {
    console.error("Get Me Error:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching admin details." });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("admin_auth_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({ message: "Logout successful" });
};
