const Profile = require("../models/profile");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");

exports.registerProfile = async (req, res) => {
  //console.log(req.file);
  try {
    // multer upload file path
    // const imagePath = req.file ? req.file.path : null;

    // ✅ Cloudinary-la ulla image data extract pannanum
    const imagePath = req.file ? req.file.path : null; // Full Cloudinary URL
    const publicId = req.file ? req.file.public_id : null; // Unique ID for management

    console.log(imagePath);

    let {
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

    if (Array.isArray(education)) {
      education = education.join(", ");
    }

    const now = new Date();
    const created_day = now.getDate().toString().padStart(2, "0");
    const created_month = (now.getMonth() + 1).toString().padStart(2, "0");
    const created_year = now.getFullYear().toString();

    //console.log(imagePath);

    //console.log(req.body);

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
      //image: imagePath ? imagePath.replace(/\\/g, "/") : null, // multer store  path
      // Cloudinary URL Image
      image: imagePath,
      // Cloudinary Public_id
      imagePublicId: publicId,
      created_day,
      created_month,
      created_year,
    });

    // ----------------------------
    // 🔥 Nodemailer Setup
    // ----------------------------

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    // Email to registered user

    // const userMailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: "Profile Registration Successful ✅",
    //   html: `<h3>Hello ${pname},</h3>
    //          <p>Your matrimony profile has been successfully registered.</p>
    //          <p>We will contact to soon.</p>
    //          <p>Thank you for registering!</p>`,
    // };

    // Email to admin
    // const adminMailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: process.env.ADMIN_EMAIL,
    //   subject: "New Profile Registered ✅",
    //   html: `<h3>New Profile Registered</h3>
    //          <p>Name: ${pname}</p>
    //          <p>Email: ${email}</p>
    //          <p>Phone: ${phonenumber}</p>
    //          <p>Profile Type: ${mprofile}</p>`,
    // };

    // Send emails
    // await transporter.sendMail(userMailOptions);
    // await transporter.sendMail(adminMailOptions);

    res.status(201).json({
      success: true,
      message: "Profile registered successfully ✅",
      // Response Cloudinary URL
      imageUrl: imagePath,
      data: newProfile,
    });
    //console.log("Register success");
  } catch (error) {
    //console.error("Registration Error:", error);

    // // 🔥 Multer/Size/File Type error handling
    if (error instanceof multer.MulterError) {
      let message = "Image upload failed.";
      if (error.code === "LIMIT_FILE_SIZE") {
        message = "Image size exceeds the 500 KB limit! 😞";
      }
      return res.status(400).json({ success: false, message });
    }
    // File Filter error handling
    if (error.message.includes("Only image files are allowed")) {
      return res.status(400).json({ success: false, message: error.message });
    }

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

// exports.getAllProfiles = async (req, res) => {
//   try {
//     const profiles = await Profile.findAll({
//       order: [["id", "DESC"]],
//     });

//     // no data check
//     if (profiles.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No profiles found ❌",
//       });
//     }

//     console.log(profiles);

//     res.status(200).json({
//       success: true,
//       message: "All profiles fetched successfully ✅",
//       count: profiles.length,
//       data: profiles,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching profiles:", error);
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong while fetching profiles ❌",
//       error: error.message,
//     });
//   }
// };

// ✅ Get Single Profile by ID

exports.getAllProfiles = async (req, res) => {
  console.log("Api called");
  try {
    const { query } = req;
    const search = query.search ? query.search.trim() : "";

    let whereCondition = {};

    // 🔍 If user types something in search bar
    if (search) {
      // if number => try to match id also
      const isNumber = !isNaN(Number(search));

      if (isNumber) {
        whereCondition = {
          [Op.or]: [
            {
              id: Number(search),
            },
            {
              pname: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        };
      } else {
        whereCondition = {
          pname: {
            [Op.like]: `%${search}%`,
          },
        };
      }
    }

    const profiles = await Profile.findAll({
      where: whereCondition,
      order: [["id", "DESC"]],
    });

    // ❌ No profiles found
    if (profiles.length === 0) {
      return res.status(404).json({
        success: false,
        message: search
          ? `No profiles found for "${search}" ❌`
          : "No profiles found ❌",
      });
    }

    // ✅ Response success
    res.status(200).json({
      success: true,
      message: search
        ? `Profiles matching "${search}" fetched successfully ✅`
        : "All profiles fetched successfully ✅",
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    console.error("❌ Error fetching profiles:", error);
    console.error("❌ Error fetching profiles:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching profiles ❌",
      error: error.message,
    });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByPk(id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: `Profile with ID ${id} not found ❌`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile details fetched successfully ✅",
      data: profile,
    });
  } catch (error) {
    console.error("❌ Error fetching profile by ID:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching profile details ❌",
      error: error.message,
    });
  }
};
