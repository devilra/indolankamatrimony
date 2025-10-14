const Profile = require("../models/profile");
const { Op } = require("sequelize");

exports.registerProfile = async (req, res) => {
  try {
    // multer upload file path
    const imagePath = req.file ? req.file.path : null;

    const {
      mprofile,
      pname,
      dob,
      age,
      pbrith,
      tbrith,
      rasi,
      nakshatram,
      laknam,
      height,
      weight,
      color,
      maritalstatus,
      gender,
      education,
      occupation,
      annualincome,
      mothertongue,
      religion,
      caste,
      subcaste,
      fname,
      foccupation,
      mname,
      moccupation,
      sister,
      brother,
      children,
      rplace,
      whatsappno,
      email,
      addressdetails,
      phonenumber,
    } = req.body;

    // ✅ Check if email or phone number already exists

    const existingProfile = await Profile.findOne({
      where: {
        // Sequelize OR condition
        [Op.or]: [{ email }, { phonenumber }],
      },
    });

    if (existingProfile) {
      // Decide which field is duplicated
      let message = "";
      if (
        existingProfile.email === email &&
        existingProfile.phonenumber === phonenumber
      ) {
        message = "Email and phone number already exist ❌";
      } else if (existingProfile.email === email) {
        message = "Email already exists ❌";
      } else {
        message = "Phone number already exists ❌";
      }

      return res.status(400).json({
        success: false,
        message,
      });
    }

    // ✅ Create new profile

    const newProfile = await Profile.create({
      mprofile,
      pname,
      dob,
      age,
      pbrith,
      tbrith,
      rasi,
      nakshatram,
      laknam,
      height,
      weight,
      color,
      maritalstatus,
      gender,
      education,
      occupation,
      annualincome,
      mothertongue,
      religion,
      caste,
      subcaste,
      fname,
      foccupation,
      mname,
      moccupation,
      sister,
      brother,
      children,
      rplace,
      whatsappno,
      email,
      addressdetails,
      phonenumber,
      image: imagePath ? imagePath.replace(/\\/g, "/") : null, // multer store  path
    });

    res.status(201).json({
      success: true,
      message: "Profile registered successfully ✅",
      data: newProfile,
    });
  } catch (error) {
    console.error(error);
    // Handle Sequelize unique constraint error just in case
    if (error.name === "SequelizeUniqueConstraintError") {
      const field = error.errors[0].path; // email or phonenumber
      return res.status(400).json({
        success: false,
        message: `${field} already exists ❌`,
      });
    }

    res.status(500).json({
      success: false,
      message: "Profile registration failed ❌",
      error: error.message,
    });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      order: [["id", "DESC"]],
    });

    // no data check
    if (profiles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No profiles found ❌",
      });
    }

    res.status(200).json({
      success: true,
      message: "All profiles fetched successfully ✅",
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    console.error("❌ Error fetching profiles:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching profiles ❌",
      error: error.message,
    });
  }
};
