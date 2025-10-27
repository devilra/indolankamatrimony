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

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //  பதிவு செய்யப்பட்ட தேதியைத் தனித்தனி Fields-க்கு பிரித்தல்
      const now = new Date();
      const register_date = now;
    } catch (error) {}
  } catch (error) {}
};
