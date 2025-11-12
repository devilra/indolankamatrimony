const Profile = require("../models/profile");
const { Op, Sequelize } = require("sequelize");
const nodemailer = require("nodemailer");
const OtpTemp = require("../models/otptemp");

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

exports.registerProfile = async (req, res) => {
  //console.log(req.file);
  console.log(req.body);
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

    // ✅ Check if email or phone number already exists

    // const existingProfile = await Profile.findOne({
    //   where: {
    //     // Sequelize OR condition
    //     [Op.or]: [{ email }, { phonenumber }],
    //   },
    // });

    // if (existingProfile) {
    //   // Decide which field is duplicated
    //   let message = "";
    //   if (
    //     existingProfile.email === email &&
    //     existingProfile.phonenumber === phonenumber &&
    //     existingProfile.whatsappno === whatsappno
    //   ) {
    //     message = "Email and phone number already exist";
    //   } else if (existingProfile.email === email) {
    //     message = "Email already exists";
    //   } else {
    //     message = "Phone number already exists";
    //   }

    //   // 🛑 Error: Profile already exists. Response sent here.
    //   return res.status(400).json({
    //     success: false,
    //     message,
    //   });
    // }

    // ✅ Create new profile (Step 1: Database Write)

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
      // Cloudinary URL Image
      image: imagePath,
      // Cloudinary Public_id
      imagePublicId: publicId,
      created_day,
      created_month,
      created_year,
    });

    // ----------------------------------------------------------------------------------
    // ✅ NEW ORDER: Step 2: Send Email (MUST BE AHEAD OF final response)
    // ----------------------------------------------------------------------------------

    let emailMessage = "Profile registered successfully. Email is sending..."; // Default success message

    try {
      // 🔥 Nodemailer Setup
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email to registered user
      const userMailOptions = {
        from: `Indolankamatrimony services <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "🎉 Profile Registration Successful!",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
            
            <div style="background-color: #B02E2E; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">Welcome</h1>
            </div>

            <div style="padding: 25px; color: #333333;">
                <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; margin-top: 0;">Hello ${pname}, Congratulations!</h2>
                
                <p style="font-size: 16px; line-height: 1.6;">
                    Your Matrimony profile has been successfully registered with us. We are excited to help you find your perfect life partner!
                </p>

                <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 0; font-weight: bold; color: #B02E2E;">Profile Details:</p>
                    <ul style="list-style-type: none; padding: 0; margin: 10px 0 0 0;">
                        <li style="margin-bottom: 5px;"><strong>Name:</strong> ${pname}</li>
                        <li style="margin-bottom: 5px;"><strong>Registered Email:</strong> ${email}</li>
                        <li style="margin-bottom: 5px;"><strong>Profile Type:</strong> ${mprofile}</li>
                        <li style="margin-bottom: 5px;"><strong>Profile ID:</strong> ${
                          newProfile.id
                        }</li>
                     
                    </ul>
                </div>
                
                <p style="font-size: 16px; line-height: 1.6;">
                    Our team will review your profile shortly. We will contact you soon on your registered phone number (${phonenumber}) to discuss the next steps.
                </p>

                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://www.indolankamatrimony.com/profile/${
                      newProfile.id
                    }" target="_blank" style="display: inline-block; padding: 12px 25px; background-color: #B02E2E; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View Your Profile</a>
                </div>
                
                <p style="margin-top: 40px; font-size: 15px;">
                    Thank you for trusting us. <br>
                    Warm Regards, <br>
                    The Indolankamatrimony Team.
                </p>
            </div>

            <div style="background-color: #333333; color: #aaaaaa; padding: 15px; text-align: center; font-size: 12px;">
                <p style="margin: 0;">© ${new Date().getFullYear()} Indolankamatrimony. All rights reserved.</p>
            </div>
        </div>
    `,
      };

      // Email to admin
      const adminMailOptions = {
        from: `Indolankamatrimony services <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `🔔 ACTION REQUIRED: New Matrimony Profile Registered - ${pname}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #ffcc00; border-radius: 8px; overflow: hidden; background-color: #fffaf0;">
            
            <div style="background-color: #ffcc00; color: #333333; padding: 15px; text-align: center; border-bottom: 3px solid #ff9900;">
                <h2 style="margin: 0; font-size: 20px;">🚨 New Profile Registration Alert 🚨</h2>
            </div>

            <div style="padding: 20px; color: #333333;">
                <p style="font-size: 16px; font-weight: bold;">A new user has registered a profile. Please verify and approve the details.</p>

                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #ffffff; font-weight: bold; width: 35%;">Name</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #f9f9f9;">${pname}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #ffffff; font-weight: bold;">Email</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #f9f9f9;">${email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #ffffff; font-weight: bold;">Phone Number</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #f9f9f9;">${phonenumber}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #ffffff; font-weight: bold;">Profile Type</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #f9f9f9;">${mprofile}</td>
                    </tr>
                     <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #ffffff; font-weight: bold;">Profile ID</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #f9f9f9;">${newProfile.id}</td>
                    </tr>
                </table>

                <div style="text-align: center; margin-top: 30px;">
                    <a href="[Your Admin Panel Link to Profile List]" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #B02E2E; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View/Approve Profile</a>
                </div>

                <p style="margin-top: 25px; font-size: 14px; color: #666666;">
                    This is an automated notification. Please do not reply to this email.
                </p>
            </div>

            <div style="background-color: #333333; color: #aaaaaa; padding: 10px; text-align: center; font-size: 11px;">
                Matrimony Admin System
            </div>
        </div>
    `,
      };
      // ✅ Await both emails to ensure they are sent before sending the final response
      await Promise.all([
        transporter.sendMail(userMailOptions),
        transporter.sendMail(adminMailOptions),
      ]);

      console.log(`SUCCESS: User email sent to ${email} and Admin email sent.`);
      emailMessage =
        "Profile registered successfully and confirmation email sent! ✅";
    } catch (emailError) {
      // Email fail ஆனா, Registration Success-ன்னு காட்டலாம், ஆனா Email Fail-ஆச்சுன்னு log பண்ணுவோம்.
      console.error(
        "WARNING: Email sending failed. The user was registered, but mail delivery failed. Check SMTP settings.",
        emailError.message
      );
      // Email fail ஆனாலும் registration successful தான், ஆனா response message மாத்திருவோம்.
      emailMessage =
        "Profile registered successfully, but failed to send confirmation email. Please check your email settings. ⚠️";
    }

    // ----------------------------------------------------------------------------------
    // ✅ FINAL STEP: Send success response to the client
    // ----------------------------------------------------------------------------------
    res.status(201).json({
      success: true,
      message: emailMessage, // Updated message based on email status
      imageUrl: imagePath,
      data: newProfile,
    });
  } catch (error) {
    console.error("Registration Error:", error.message);

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

const otpStorage = {};
const OTP_EXPIRY_MINUTES = 5;

// 🔥 Utility Functions

const generateOTP = () => {
  // 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// local server and render base server base gmail send
// const createMailTransporter = () => {
//   return nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "rockraja91338@gmail.com",
//       pass: "kgdngrwjibulofxh",
//     },
//   });
// };

// hosting cpanel custom mail send function
const createMailTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
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
  //console.log("SERVER OTP START");
  try {
    // Image and Profile Data extraction
    const imagePath = req.file ? req.file.path : null;
    const publicId = req.file ? req.file.path : null;

    let profileData = req.body;
    //console.log(profileData);

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

    // Time for DB storage
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Profile data-kku time/date-a add seiyungal (ungal original logic)
    profileData.created_day = now.getDate().toString().padStart(2, "0");
    profileData.created_month = (now.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    profileData.created_year = now.getFullYear().toString();
    profileData.image = imagePath;
    profileData.imagePublicId = publicId;

    // --- Check if email or phone number already exists in DB ---

    // const existingProfile = await Profile.findOne({
    //   where: { [Op.or]: [{ email }, { phonenumber }] },
    // });

    //console.log(profileData);

    // if (existingProfile) {
    //   let message =
    //     existingProfile.email === email
    //       ? "Email already exists ❌"
    //       : "Phone number already exists ❌";
    //   return res.status(400).json({ success: false, message });
    // }

    // --- Generate OTP and Save Data Temporarily ---
    const otp = generateOTP();

    // otpStorage[email] = {
    //   otp: otp,
    //   profileData: profileData,
    //   timestamp: Date.now(),
    // };

    // 🛑 DATABASE FIX: In-memory otpStorage-kku badhilaaga OtpTemp table-la save seiyungal

    await OtpTemp.upsert({
      email: email,
      otp: otp,
      profileData: JSON.stringify(profileData), // JSON object-a string-aah maatri save seiyungal
      timestamp: Date.now(), // Current time in milliseconds for expiry check
      created_time: time,
      created_day: profileData.created_day,
      created_month: profileData.created_month,
      created_year: profileData.created_year,
    });

    // ------5min Otp Expire--------

    // setTimeout(() => {
    //   if (otpStorage[email] && otpStorage[email].otp === otp) {
    //     delete otpStorage[email];
    //     console.log(`INFO: OTP for ${email} expired and cleared.`);
    //   }
    // }, OTP_EXPIRY_MINUTES * 60 * 1000);

    // --- Send OTP Email ---

    const transporter = createMailTransporter();

    const mailOptions = {
      //from: `Indolankamatrimony services <${process.env.EMAIL_USER}>`,
      from: "rockraja91338@gmail.com",
      to: email,
      subject: "🔐 Your Profile Verification OTP - Indolankamatrimony",
      // 🎨 Attractive, Branded HTML UI
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            
            <div style="background-color: #A91D3C; color: #ffffff; padding: 20px; text-align: center;">
                <h2 style="margin: 0; font-size: 24px;">Indolankamatrimony Services</h2>
            </div>

            <div style="padding: 30px; color: #333333;">
                
                <h3 style="margin-top: 0; font-size: 18px; color: #333333;">Hello ${pname},</h3>
                
                <p style="font-size: 16px; line-height: 1.5;">
                    Your One-Time Password (OTP) for profile confirmation is provided below. 
                    Please enter this code in your application to complete the registration process.
                </p>

                <div style="text-align: center; margin: 30px 0; padding: 15px 20px; border: 1px dashed #A91D3C; background-color: #FFF0F5; border-radius: 6px;">
                    <p style="font-size: 14px; color: #A91D3C; margin: 0 0 10px 0; font-weight: bold;">
                        Verification Code:
                    </p>
                    <h1 style="color: #4CAF50; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 0;">
                        ${otp}
                    </h1>
                </div>

                <p style="font-size: 14px; line-height: 1.4; color: #777777; margin-top: 20px;">
                    ⚠️ This code will expire in **${OTP_EXPIRY_MINUTES} minutes**.
                </p>
                <p style="font-size: 14px; line-height: 1.4; color: #777777;">
                    For security reasons, please do not share this OTP with anyone.
                </p>
            </div>

            <div style="background-color: #f8f8f8; padding: 15px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                <p style="font-size: 12px; color: #999999; margin: 0;">
                    Thank you for choosing Indolankamatrimony services.
                </p>
            </div>
        </div>
    `,
    };
    //console.log("Mail Sending Started");

    await transporter.sendMail(mailOptions);
    //console.log(`SUCCESS: OTP sent to ${email}`);

    res.status(200).json({
      success: true,
      //otpStorage,
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

  // 🛑 DATABASE FIX: Database-la irundhu record-a thedungal

  const storedRecord = await OtpTemp.findOne({
    where: {
      email: email,
    },
  });
  //const storedData = otpStorage[email];

  //console.log(storedData);

  // 1. Storage Data  (Expired or Not Sent)

  // if (!storedData) {
  //   return res.status(400).json({
  //     storedData,
  //     success: false,
  //     message:
  //       "Verification failed. OTP expired or not sent. Please resubmit profile form.",
  //   });
  // }

  // 1. Storage Data (Expired or Not Sent)
  if (!storedRecord) {
    // otpStorage-a thevaiyillai
    return res.status(400).json({
      success: false,
      message:
        "Verification failed. OTP expired or not sent. Please resubmit profile form.",
    });
  }

  // Stored data-vai JSON object-aah maatrungal

  const storedData = {
    otp: storedRecord.otp,
    profileData: JSON.parse(storedRecord.profileData),
    timestamp: storedRecord.timestamp,
  };

  const timeElapsed = Date.now() - storedData.timestamp;

  if (timeElapsed > OTP_EXPIRY_MINUTES * 60 * 1000) {
    // 🛑 Database expiry: Expired aanal, database-la irundhu record-a delete seiyungal
    await OtpTemp.destroy({ where: { email: email } });
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
    // const existingProfile = await Profile.findOne({
    //   where: { email },
    // });

    // if (existingProfile) {
    //   delete otpStorage[email];
    //   return res.status(400).json({
    //     success: false,
    //     message: "Profile already exists in the indolankamatrimony",
    //   });
    // }

    const newProfile = await Profile.create(profileData);

    // --- Final Success Response ---
    // res.status(201).json({
    //   success: true,
    //   message: "Profile verified and registered successfully!",
    //   imageUrl: newProfile.image,
    //   data: newProfile,
    // });

    // 🛑 Success: Database-la irundhu OtpTemp record-a delete seiyungal
    await OtpTemp.destroy({ where: { email: email } });

    // console.log("Successful Registered");
    let emailMessage = "Profile registered successfully. Email is sending...";

    try {
      // --- Admin/User Notification Email ---
      const transporter = createMailTransporter();

      //console.log(email);

      // Email to registered user
      const userMailOptions = {
        //from: `Indolankamatrimony services <${process.env.EMAIL_USER}>`,
        from: "rockraja91338@gmail.com",
        to: email,
        subject: "🎉 Profile Registration Successful!",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
            
            <div style="background-color: #B02E2E; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">Welcome</h1>
            </div>

            <div style="padding: 25px; color: #333333;">
                <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; margin-top: 0;">Hello ${
                  newProfile.pname
                }, Congratulations!</h2>
                
                <p style="font-size: 16px; line-height: 1.6;">
                    Your Matrimony profile has been successfully registered with us. We are excited to help you find your perfect life partner!
                </p>

                <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 0; font-weight: bold; color: #B02E2E;">Profile Details:</p>
                    <ul style="list-style-type: none; padding: 0; margin: 10px 0 0 0;">
                        <li style="margin-bottom: 5px;"><strong>Name:</strong> ${
                          newProfile.pname
                        }</li>
                        <li style="margin-bottom: 5px;"><strong>Registered Email:</strong> ${
                          newProfile.email
                        }</li>
                        <li style="margin-bottom: 5px;"><strong>Profile Type:</strong> ${
                          newProfile.mprofile
                        }</li>
                        <li style="margin-bottom: 5px;"><strong>Profile ID:</strong> ${
                          newProfile.id
                        }</li>
                     
                    </ul>
                </div>
                
                <p style="font-size: 16px; line-height: 1.6;">
                    Our team will review your profile shortly. We will contact you soon on your registered phone number (${
                      newProfile.phonenumber
                    }) to discuss the next steps.
                </p>

                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://www.indolankamatrimony.com/profile/${
                      newProfile.id
                    }" target="_blank" style="display: inline-block; padding: 12px 25px; background-color: #B02E2E; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View Your Profile</a>
                </div>
                
                <p style="margin-top: 40px; font-size: 15px;">
                    Thank you for trusting us. <br>
                    Warm Regards, <br>
                    The Indolankamatrimony Team.
                </p>
            </div>

            <div style="background-color: #333333; color: #aaaaaa; padding: 15px; text-align: center; font-size: 12px;">
                <p style="margin: 0;">© ${new Date().getFullYear()} Indolankamatrimony. All rights reserved.</p>
            </div>
        </div>
    `,
      };

      // Email to admin
      const adminMailOptions = {
        //from: `Indolankamatrimony services <${process.env.EMAIL_USER}>`,
        from: "rockraja91338@gmail.com",
        to: "rockerraja906@gmail.com",
        //to: process.env.ADMIN_EMAIL,
        subject: `🔔 ACTION REQUIRED: New Matrimony Profile Registered - ${newProfile.pname}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #ffcc00; border-radius: 8px; overflow: hidden; background-color: #fffaf0;">
            
            <div style="background-color: #ffcc00; color: #333333; padding: 15px; text-align: center; border-bottom: 3px solid #ff9900;">
                <h2 style="margin: 0; font-size: 20px;">🚨 New Profile Registration Alert 🚨</h2>
            </div>

            <div style="padding: 20px; color: #333333;">
                <p style="font-size: 16px; font-weight: bold;">A new user has registered a profile. Please verify and approve the details.</p>

                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #ffffff; font-weight: bold; width: 35%;">Name</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #f9f9f9;">${newProfile.pname}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #ffffff; font-weight: bold;">Email</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #f9f9f9;">${email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #ffffff; font-weight: bold;">Phone Number</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #f9f9f9;">${newProfile.phonenumber}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #ffffff; font-weight: bold;">Profile Type</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #f9f9f9;">${newProfile.mprofile}</td>
                    </tr>
                     <tr>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #ffffff; font-weight: bold;">Profile ID</td>
                        <td style="padding: 10px; border: 1px solid #e0e0e0; background-color: #f9f9f9;">${newProfile.id}</td>
                    </tr>
                </table>

                <div style="text-align: center; margin-top: 30px;">
                    <a href="[Your Admin Panel Link to Profile List]" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #B02E2E; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View/Approve Profile</a>
                </div>

                <p style="margin-top: 25px; font-size: 14px; color: #666666;">
                    This is an automated notification. Please do not reply to this email.
                </p>
            </div>

            <div style="background-color: #333333; color: #aaaaaa; padding: 10px; text-align: center; font-size: 11px;">
                Matrimony Admin System
            </div>
        </div>
    `,
      };

      // Send emails in the background
      await Promise.all([
        transporter.sendMail(userMailOptions),
        transporter.sendMail(adminMailOptions),
      ]);

      //console.log(`SUCCESS: User email sent to ${email} and Admin email sent.`);
      emailMessage =
        "Profile registered successfully and confirmation email sent! ✅";
    } catch (error) {
      console.error(
        "WARNING: Email sending failed. The user was registered, but mail delivery failed. Check SMTP settings.",
        error.message
      );
      // Email fail ஆனாலும் registration successful தான், ஆனா response message மாத்திருவோம்.
      emailMessage =
        "Profile registered successfully, but failed to send confirmation email. Please check your email settings. ⚠️";
    }

    delete otpStorage[email];

    // ----------------------------------------------------------------------------------
    // ✅ FINAL STEP: Send success response to the client
    // ----------------------------------------------------------------------------------
    res.status(201).json({
      success: true,
      message: emailMessage, // Updated message based on email status
      imageUrl: newProfile.image,
      data: newProfile,
    });
  } catch (error) {
    console.error("❌ DB Registration Error:", error.message);

    // 🛑 Error aanal, database-la irundhu record-a delete seiyungal
    if (email) {
      await OtpTemp.destroy({ where: { email: email } });
    }

    res.status(500).json({
      success: false,
      message:
        "OTP verified, but profile save failed due to database error ❌. Please contact support.",
      error: error.message,
    });
  }
};

// exports.getAllProfiles = async (req, res) => {
//   //console.log("Api called");
//   try {
//     const { query } = req;
//     const search = query.search ? query.search.trim() : "";

//     let whereCondition = {};

//     // 🔍 If user types something in search bar
//     if (search) {
//       // if number => try to match id also
//       const isNumber = !isNaN(Number(search));

//       if (isNumber) {
//         whereCondition = {
//           [Op.or]: [
//             {
//               id: Number(search),
//             },
//             {
//               pname: {
//                 [Op.like]: `%${search}%`,
//               },
//             },
//           ],
//         };
//       } else {
//         whereCondition = {
//           pname: {
//             [Op.like]: `%${search}%`,
//           },
//         };
//       }
//     }

//     const profiles = await Profile.findAll({
//       where: whereCondition,
//       order: [["id", "DESC"]],
//     });

//     // ❌ No profiles found
//     if (profiles.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: search
//           ? `No profiles found for "${search}" ❌`
//           : "No profiles found ❌",
//       });
//     }

//     // ✅ Response success
//     res.status(200).json({
//       success: true,
//       message: search
//         ? `Profiles matching "${search}" fetched successfully ✅`
//         : "All profiles fetched successfully ✅",
//       count: profiles.length,
//       data: profiles,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching profiles:", error);
//     console.error("❌ Error fetching profiles:", error);
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong while fetching profiles ❌",
//       error: error.message,
//     });
//   }
// };

exports.getAllProfiles = async (req, res) => {
  //console.log("Api called");
  try {
    const { query } = req; // Filters from frontend
    const search = query.search ? query.search.trim() : "";
    const gender = query.gender ? query.gender.trim() : "";
    const maritalStatus = query.maritalStatus ? query.maritalStatus.trim() : "";
    const caste = query.caste ? query.caste.trim() : ""; // ✅ New Caste Filter

    //console.log(gender);

    let whereCondition = {}; // 1. 🔍 Search Filter (pname and id)

    if (search) {
      const isNumber = !isNaN(Number(search));

      const searchConditions = {
        [Op.or]: [
          {
            pname: {
              [Op.like]: `%${search}%`, // Partial name match
            },
          }, // ID search-kku number-a irundha mattum
          isNumber && {
            id: Number(search),
          },
        ].filter(Boolean), // empty objects-ai remove pannuvom
      }; // whereCondition-la search-ai add panna vendum
      whereCondition = { ...whereCondition, ...searchConditions };
    } // 2. 🚻 Gender Filter

    if (gender) {
      // Frontend-la 'All' empty string-a anuppinaalum, indha check-la filter aagum
      whereCondition.gender = gender;
    } // 3. 💍 Marital Status Filter

    if (maritalStatus) {
      whereCondition.maritalstatus = maritalStatus; // DB field: maritalstatus
    } // 4. ⚜️ Caste Filter (FIXED)

    if (caste) {
      whereCondition.caste = caste; // DB field: caste
    } //console.log("Final Sequelize whereCondition:", whereCondition);

    const profiles = await Profile.findAll({
      // whereCondition empty-a irundhaa, ellathaiyum edukkum. Illaati filters apply aagum.
      where: whereCondition,
      order: [["id", "DESC"]],
    }); // ❌ No profiles found

    if (profiles.length === 0) {
      // User-kku nalla message kaatta, current filters-aiyum use panni message create pannalaam.
      const filterText = [search, gender, maritalStatus, caste].filter(
        (f) => f
      );
      const message =
        filterText.length > 0
          ? `No profiles found matching the current filters: ${filterText.join(
              ", "
            )} ❌`
          : "No profiles found ❌";

      return res.status(404).json({
        success: false,
        message: message,
      });
    } // ✅ Response success

    res.status(200).json({
      success: true,
      message: "Profiles fetched successfully based on filters ✅",
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

// waiting for Filter Apply

// exports.getAllProfiles = async (req, res) => {
//   //console.log("Api called");
//   try {
//     const { query } = req; // Filters from frontend
//     const search = query.search ? query.search.trim() : "";
//     const gender = query.gender ? query.gender.trim() : "";
//     const maritalStatus = query.maritalStatus ? query.maritalStatus.trim() : "";
//     const caste = query.caste ? query.caste.trim() : ""; // ✅ New Caste Filter

//     let whereCondition = {}; // 1. 🔍 Search Filter (pname and id)

//     if (search) {
//       // முழுமையான எண் சரிபார்ப்பு
//       const isNumber = /^\d+$/.test(search);

//       const searchConditions = {
//         [Op.or]: [
//           {
//             // 1. Name Search (Partial match anywhere)
//             pname: {
//               [Op.like]: `%${search}%`,
//             },
//           }, // 💥 ID Search: Exact Match for Speed
//           // (Partial match-க்கு பதில் Exact Number Match பயன்படுத்தப்பட்டுள்ளது)
//           isNumber && {
//             id: Number(search), // 💡 ID-ஐ Number-ஆக மாற்றி Exact match செய்கிறோம்.
//           },
//         ].filter(Boolean), // empty objects-ஐ remove பண்ணுவதற்கு
//       };
//       whereCondition = { ...whereCondition, ...searchConditions };
//     } // 2. 🚻 Gender Filter

//     if (gender) {
//       whereCondition.gender = gender;
//     } // 3. 💍 Marital Status Filter

//     if (maritalStatus) {
//       whereCondition.maritalstatus = maritalStatus; // DB field: maritalstatus
//     } // 4. ⚜️ Caste Filter

//     if (caste) {
//       whereCondition.caste = caste; // DB field: caste
//     } //console.log("Final Sequelize whereCondition:", whereCondition);

//     const profiles = await Profile.findAll({
//       // whereCondition empty-a irundhaa, ellathaiyum edukkum. Illaati filters apply aagum.
//       where: whereCondition,
//       order: [["id", "DESC"]],
//     }); // ❌ No profiles found

//     if (profiles.length === 0) {
//       // User-kku nalla message kaatta, current filters-ஐயும் use panni message create pannalaam.
//       const filterText = [search, gender, maritalStatus, caste].filter(
//         (f) => f
//       );
//       const message =
//         filterText.length > 0
//           ? `No profiles found matching the current filters: ${filterText.join(
//               ", "
//             )} ❌`
//           : "No profiles found ❌";

//       return res.status(404).json({
//         success: false,
//         message: message,
//       });
//     } // ✅ Response success

//     res.status(200).json({
//       success: true,
//       message: "Profiles fetched successfully based on filters ✅",
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

// exports.searchMatches = async (req, res) => {
//   console.log(req.query);

// Not included ID based search
//   try {
//     const { query } = req;

//     // --- 1. Basic Filters Parsing ---
//     const looking_for = query.looking_for ? query.looking_for.trim() : ""; // Partner Gender
//     const religion = query.religion ? query.religion.trim() : "";
//     const caste = query.caste ? query.caste.trim() : "";
//     const mother_tongue = query.mother_tongue ? query.mother_tongue.trim() : "";
//     // --- 2. Range Filters Parsing (Age) ---
//     const age_from = Number(query.age_from);
//     const age_to = Number(query.age_to);

//     // --- 3. Single Height Filter Parsing ---
//     const selected_height = query.selected_height
//       ? query.selected_height.trim()
//       : "";

//     let whereCondition = {};

//     // ---------------------------------------------
//     // 🔍 FILTER LOGIC
//     // ---------------------------------------------

//     // 1. 🚻 Gender Filter
//     if (looking_for) {
//       if (looking_for.toLowerCase() === "bride") {
//         whereCondition.gender = "Female";
//       } else if (looking_for.toLowerCase() === "groom") {
//         whereCondition.gender = "Male";
//       } else {
//         whereCondition.gender = looking_for;
//       }
//     }

//     // 2. 🎂 Age Range Filter
//     if (
//       !isNaN(age_from) &&
//       !isNaN(age_to) &&
//       age_from > 0 &&
//       age_to >= age_from
//     ) {
//       whereCondition.age = {
//         [Op.between]: [`${age_from}`, `${age_to}`],
//       };
//     }

//     // 3. 📏 Single Height Exact Match Filter 🎯

//     if (selected_height) {
//       whereCondition.height = selected_height;
//     }

//     // 4. ⚜️ Caste and Religion Filters (Direct Match)

//     if (caste) {
//       whereCondition.caste = caste;
//     }
//     if (religion) {
//       whereCondition.religion = religion;
//     }

//     // 5. 🗣️ Mother Tongue Filter (NEW Logic)
//     // Query-la 'mother_tongue' value irundhaa, adha use panni filter pannum.

//     if (mother_tongue) {
//       // Unga DB field name: mothertongue
//       whereCondition.mothertongue = mother_tongue;
//     }

//     // --- 3. Execute Query ---

//     const profiles = await Profile.findAll({
//       where: whereCondition,
//       order: [["id", "DESC"]],
//       // ... pagination settings
//     });

//     // --- 4. Handle Results ---
//     if (profiles.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No matches found for your partner preference 💔",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Potential matches fetched successfully! ✨",
//       count: profiles.length,
//       data: profiles,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching matches:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong while searching for matches ❌",
//       error: error.message,
//     });
//   }
// };

exports.searchMatches = async (req, res) => {
  //console.log(req.query);
  // new add new ID based unique search code
  try {
    const { query } = req;

    // --- 1. Basic Filters Parsing ---
    const looking_for = query.looking_for ? query.looking_for.trim() : ""; // Partner Gender
    const religion = query.religion ? query.religion.trim() : "";
    const caste = query.caste ? query.caste.trim() : "";
    const mother_tongue = query.mother_tongue ? query.mother_tongue.trim() : "";
    // 🚩 NEW: Profile ID Parsing
    const profile_id = query.profile_id ? query.profile_id.trim() : "";

    // --- 2. Range Filters Parsing (Age) ---
    const age_from = Number(query.age_from);
    const age_to = Number(query.age_to);

    // 🚩 NEW: Height Range Parsing (Front-end-லிருந்து cm மதிப்புகள் வரும்)
    const height_from = query.height_from ? Number(query.height_from) : null;
    const height_to = query.height_to ? Number(query.height_to) : null;

    // --- 3. Single Height Filter Parsing ---
    const selected_height = query.selected_height
      ? query.selected_height.trim()
      : "";

    let whereCondition = {};

    // ---------------------------------------------
    // 🔍 FILTER LOGIC
    // ---------------------------------------------
    // 🛑 CRITICAL NEW LOGIC: ID Search Override
    // profile_id கொடுக்கப்பட்டால், அதுவே ஒரே filter ஆக இருக்க வேண்டும்.

    if (profile_id) {
      // ID யை uppercase ஆக மாற்றி search செய்கிறோம். (உங்களுடைய Front-end logic-ஐப் போலவே)
      whereCondition.id = profile_id.toUpperCase();
      // இந்த இடத்தில் return செய்தால், கீழே உள்ள மற்ற filter logic-ஐத் தவிர்க்கலாம்
    } else {
      // --- ID கொடுக்கப்படவில்லை, மற்ற filters-ஐ apply செய்யலாம் ---
      // 1. 🚻 Gender Filter
      if (looking_for) {
        if (looking_for.toLowerCase() === "bride") {
          whereCondition.gender = "Female";
        } else if (looking_for.toLowerCase() === "groom") {
          whereCondition.gender = "Male";
        } else {
          whereCondition.gender = looking_for;
        }
      }

      // 2. 🎂 Age Range Filter
      if (
        !isNaN(age_from) &&
        !isNaN(age_to) &&
        age_from > 0 &&
        age_to >= age_from
      ) {
        whereCondition.age = {
          [Op.between]: [`${age_from}`, `${age_to}`],
        };
      }

      // 3. 📏 Single Height Exact Match Filter 🎯

      // if (selected_height) {
      //   whereCondition.height = selected_height;
      // }

      // 🛑 NEW: Height Range Filter (DB String-ல் இருந்து CM Extract செய்தல்)
      if (height_from && height_to) {
        // height string-ல் இருந்து 'cm' மதிப்பை பிரித்தெடுக்க வேண்டியிருக்கும்.
        // Sequelize Literal-ஐப் பயன்படுத்தி SQL function-களைப் பயன்படுத்துவோம்.

        // height field format: "5ft 8in - 172cm"
        // SPLIT_PART(height, ' - ', 2) -> '172cm'
        // REPLACE(..., 'cm', '') -> '172'
        // CAST(AS INTEGER) -> 172

        const heightExtractionSql = `CAST(REPLACE(SUBSTRING_INDEX(height, ' - ', -1), 'cm', '') AS UNSIGNED)`;

        whereCondition[Op.and] = [
          ...(whereCondition[Op.and] || []),

          // Min Height Check: Extracted CM >= height_from
          Profile.sequelize.literal(`${heightExtractionSql} >= ${height_from}`),

          // Max Height Check: Extracted CM <= height_to
          Profile.sequelize.literal(`${heightExtractionSql} <= ${height_to}`),
        ];
      }

      // 4. ⚜️ Caste and Religion Filters (Direct Match)

      if (caste) {
        whereCondition.caste = caste;
      }
      if (religion) {
        whereCondition.religion = religion;
      }

      // 5. 🗣️ Mother Tongue Filter (NEW Logic)
      // Query-la 'mother_tongue' value irundhaa, adha use panni filter pannum.

      if (mother_tongue) {
        // Unga DB field name: mothertongue
        whereCondition.mothertongue = mother_tongue;
      }
    } // End of else (if not profile_id)

    // --- 3. Execute Query ---
    // Note: profile_id இருந்தால், whereCondition = { id: '...' } ஆக இருக்கும்.
    // இல்லாவிட்டால், மற்ற filters இருக்கும்.

    // --- 3. Execute Query ---

    const profiles = await Profile.findAll({
      where: whereCondition,
      order: [["id", "DESC"]],
      // ... pagination settings
    });

    // --- 4. Handle Results ---
    if (profiles.length === 0) {
      // End of else (if not profile_id)

      // --- 3. Execute Query ---
      // Note: profile_id இருந்தால், whereCondition = { id: '...' } ஆக இருக்கும்.
      // இல்லாவிட்டால், மற்ற filters இருக்கும்.
      if (profile_id) {
        return res.status(404).json({
          success: false,
          message: `Profile ID ${profile_id} not found.`,
        });
      }

      return res.status(404).json({
        success: false,
        message: "No matches found for your partner preference 💔",
      });
    }

    res.status(200).json({
      success: true,
      message: "Potential matches fetched successfully! ✨",
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    console.error("❌ Error fetching matches:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while searching for matches ❌",
      error: error.message,
    });
  }
};
