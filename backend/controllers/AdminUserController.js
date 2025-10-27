const Admin = require("../models/Admin");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    try {
      const existingAdmin = await Admin.findOne({ where: email });
      if (existingAdmin) {
        return res
          .status(400)
          .json({ message: "Email address is already registered." });
      }
    } catch (error) {}
  } catch (error) {}
};
