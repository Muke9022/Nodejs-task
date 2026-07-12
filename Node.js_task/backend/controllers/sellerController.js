const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(seller._id, seller.role);

    return res.status(200).json({
      success: true,
      token,
      role: seller.role,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};