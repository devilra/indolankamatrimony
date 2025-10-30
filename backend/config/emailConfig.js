const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter object using the default SMTP transport
// Testing Free gmail send Code
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// cpanel Email using Transport

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  //secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Admin-ku send aagum email- template.
 * @param {object} data - Form data (name, email, phone, message)
 * @returns {object} Mail options object
 */

const adminMailOptions = (data) => ({
  from: `Contact Form <${process.env.EMAIL_USER}>`,
  to: process.env.ADMIN_EMAIL,
  subject: `New Contact Enquiry from ${data.name}`,
  html: `
    <h2>New Contact Form Submission</h2>
    <p>Details of the enquiry:</p>
    <ul>
      <li><strong>Name:</strong> ${data.name}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Phone:</strong> ${data.phone}</li>
    </ul>
    <h3>Message:</h3>
    <p>${data.message}</p>
  `,
});

/**
 * User-ku send aagum email- template.
 * @param {object} data - Form data (name, email, phone, message)
 * @returns {object} Mail options object
 */

const userMailOptions = (data) => ({
  from: `[indolanka matrimonial services] ${process.env.EMAIL_USER}`,
  to: data.email,
  subject: `Thank you for your enquiry, ${data.name}!`,
  html: `
    <h2>Thank you for contacting us!</h2>
    <p>Dear ${data.name},</p>
    <p>We have successfully received your enquiry. Our team will review your message and get back to you shortly.</p>
    <p>Regards,<br/>The Indolankamatrimony Team</p>
  `,
});

module.exports = { transporter, adminMailOptions, userMailOptions };
