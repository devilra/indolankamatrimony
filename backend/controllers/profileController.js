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
    const publicId = req.file ? req.file.filename : null; // Unique ID for management

    //console.log(publicId);

    console.log(imagePath);
    console.log(req.body);

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
        existingProfile.phonenumber === phonenumber &&
        existingProfile.whatsappno === whatsappno
      ) {
        message = "Email and phone number already exist";
      } else if (existingProfile.email === email) {
        message = "Email already exists";
      } else {
        message = "Phone number already exists";
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

    res.status(201).json({
      success: true,
      message: "Profile registered successfully ✅",
      // Response Cloudinary URL
      imageUrl: imagePath,
      data: newProfile,
    });

    try {
      // 🔥 Nodemailer Setup
      // ----------------------------

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email to registered user

      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Profile Registration Successful ✅",
        html: `<h3>Hello ${pname},</h3>
             <p>Your matrimony profile has been successfully registered.</p>
             <p>We will contact to soon.</p>
             <p>Thank you for registering!</p>`,
      };

      // Email to admin
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: "New Profile Registered ✅",
        html: `<h3>New Profile Registered</h3>
             <p>Name: ${pname}</p>
             <p>Email: ${email}</p>
             <p>Phone: ${phonenumber}</p>
             <p>Profile Type: ${mprofile}</p>`,
      };

      // Send emails (FIRE AND FORGET - NO AWAIT)
      // The promise will resolve/reject in the background, not blocking the main thread.

      // Send emails
      //console.log("Email send Start");
      transporter
        .sendMail(userMailOptions)
        .then(() => console.log(`SUCCESS: User email sent to ${email}`))
        .catch((err) =>
          console.log('ERROR: Failed to send admin email.", err')
        );
      //console.log("Email Send UserEmail");
      transporter
        .sendMail(adminMailOptions)
        .then(() => console.log("SUCCESS: Admin email sent."))
        .catch((err) =>
          console.error("ERROR: Failed to send admin email.", err)
        );
      //console.log("Email Send End finish");
    } catch (emailError) {
      console.error(
        "CRITICAL ERROR: Email setup failed, emails not sent.",
        emailError
      );
    }
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

// { 'user@example.com': { otp: '123456', profileData: { ... }, timestamp: 1678886400000 } }

const otpStorage = {};
const OTP_EXPIRY_MINUTES = 5;

// 🔥 Utility Functions

const generateOTP = () => {
  // 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const createMailTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// =========================================================
// API 1: sendOtp - (Form Submit -> OTP Generate & Send)
// =========================================================

exports.sendOtp = async (req, res) => {
  console.log("SERVER OTP START");
  try {
    // Image and Profile Data extraction
    const imagePath = req.file ? req.file.path : null;
    const publicId = req.file ? req.file.path : null;

    let profileData = req.body;

    let { email, phonenumber, pname } = profileData;

    // --- Data Validation and Pre-processing ---
    if (!email || !phonenumber) {
      return res.status(400).json({
        success: false,
        message: "Email and Phone number are required.",
      });
    }

    // Handle array fields like 'education'
    if (Array.isArray(profileData.education)) {
      profileData.education = profileData.education.join(", ");
    }

    // Add calculated fields to the profileData object
    const now = new Date();
    profileData.created_day = now.getDate().toString().padStart(2, "0");
    profileData.created_month = (now.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    profileData.created_year = now.getFullYear().toString();
    profileData.image = imagePath;
    profileData.imagePublicId = publicId;

    // --- Check if email or phone number already exists in DB ---

    const existingProfile = await Profile.findOne({
      where: { [Op.or]: [{ email }, { phonenumber }] },
    });

    console.log(profileData);

    if (existingProfile) {
      let message =
        existingProfile.email === email
          ? "Email already exists ❌"
          : "Phone number already exists ❌";
      return res.status(400).json({ success: false, message });
    }

    // --- Generate OTP and Save Data Temporarily ---
    const otp = generateOTP();

    otpStorage[email] = {
      otp: otp,
      profileData: profileData,
      timestamp: Date.now(),
    };

    // ------5min Otp Expire--------

    setTimeout(() => {
      if (otpStorage[email] && otpStorage[email].otp === otp) {
        delete otpStorage[email];
        console.log(`INFO: OTP for ${email} expired and cleared.`);
      }
    }, OTP_EXPIRY_MINUTES * 60 * 1000);

    // --- Send OTP Email ---

    const transporter = createMailTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Profile Verification OTP",
      html: `<h3>Hello ${pname},</h3>
                   <p>Your one-time password (OTP) for profile confirmation is:</p>
                   <h1 style="color: #4CAF50; font-size: 24px;">${otp}</h1>
                   <p>This code will expire in ${OTP_EXPIRY_MINUTES} minutes.</p>
                   <p>Do not share this OTP with anyone.</p>`,
    };

    console.log("Mail Sending Started");

    await transporter.sendMail(mailOptions);
    console.log(`SUCCESS: OTP sent to ${email}`);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email successfully. Please check and verify.",
      // Front-end- OTP verification form-
      emailSent: true,
    });
  } catch (error) {
    console.error("Send OTP Error:", error);

    // Multer/File error handling
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Image size exceeds the 500 KB limit!",
      });
    }
    if (
      error.message &&
      error.message.includes("Only image files are allowed")
    ) {
      return res.status(400).json({ success: false, message: error.message });
    }

    res.status(500).json({
      success: false,
      message: "Failed to send OTP or server error.",
      error: error.message,
    });
  }
};

// =========================================================
// API 2: verifyOtpAndRegister - (OTP Submit -> Verify & Save to DB)
// =========================================================

exports.verifyOtpAndRegister = async (req, res) => {
  const { email, otp } = req.body;

  if (!email && !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP are required." });
  }

  const storedData = otpStorage[email];

  // 1. Storage Data  (Expired or Not Sent)

  if (!storedData) {
    return res.status(400).json({
      success: false,
      message:
        "Verification failed. OTP expired or not sent. Please resubmit profile form.",
    });
  }

  const timeElapsed = Date.now() - storedData.timestamp;

  if (timeElapsed > OTP_EXPIRY_MINUTES * 60 * 1000) {
    delete otpStorage[email]; // Clear expired data
    return res.status(400).json({
      success: false,
      message: "OTP has expired. Please resend the profile form.",
    });
  }

  // OTP Verifications Profile

  if (storedData.otp !== otp) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid OTP . Please try again." });
  }

  try {
    const profileData = storedData.profileData;

    // Final check to prevent duplicate submission just in case
    const existingProfile = await Profile.findOne({
      where: { email },
    });

    if (existingProfile) {
      delete otpStorage[email];
      return res.status(400).json({
        success: false,
        message: "Profile already exists in the indolankamatrimony",
      });
    }

    const newProfile = await Profile.create(profileData);

    delete otpStorage[email];

    // --- Final Success Response ---
    res.status(201).json({
      success: true,
      message: "Profile verified and registered successfully!",
      imageUrl: newProfile.image,
      data: newProfile,
    });

    console.log("Successful Registered");

    try {
      // --- Admin/User Notification Email ---
      const transporter = createMailTransporter();

      // Email to registered user
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Profile Registration Successful and Verified ✅",
        html: `<h3>Hello ${profileData.pname},</h3>
                    <p>Your matrimony profile has been successfully registered and verified.</p>
                    <p>Thank you for registering!</p>`,
      };

      // Email to admin
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: "New Profile Registered and Verified ✅",
        html: `<h3>New Profile Registered</h3>
                     <p>Name: ${profileData.pname}</p>
                     <p>Email: ${email}</p>
                     <p>Phone: ${profileData.phonenumber}</p>
                     <p>Profile Type: ${profileData.mprofile}</p>`,
      };

      // Send emails in the background
      transporter
        .sendMail(userMailOptions)
        .then(() => console.log("Email Send SuccessFully"))
        .catch((err) => console.error("User success email failed:", err));
      transporter
        .sendMail(adminMailOptions)
        .then(() => console.log("Email Send SuccessFully"))
        .catch((err) => console.error("Admin notification email failed:", err));
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: "Email Send Faild",
      });
    }
  } catch (error) {
    console.error("❌ DB Registration Error:", error);

    delete otpStorage[email];

    res.status(500).json({
      success: false,
      message:
        "OTP verified, but profile save failed due to database error ❌. Please contact support.",
      error: error.message,
    });
  }
};

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
