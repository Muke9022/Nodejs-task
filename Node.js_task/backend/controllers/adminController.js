const Admin = require('../models/Admin');
const Seller = require('../models/Seller');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');


exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = generateToken(admin._id, admin.role); 
      return res.status(200).json({ success: true, token, role: admin.role }); 
    }
    return res.status(401).json({ message: 'Invalid admin credentials' }); 
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
};


exports.createSeller = async (req, res) => {
  try {
    const { name, email, mobileNo, country, state, skills, password } = req.body; 
    
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) return res.status(400).json({ message: 'Seller already exists' }); 

    const seller = await Seller.create({
      name, email, mobileNo, country, state, skills, password 
    });

    res.status(201).json({ success: true, data: seller }); 
  } catch (err) {
    res.status(400).json({ message: err.message }); 
  }
};


exports.getSellers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const skip = (page - 1) * limit;

    const total = await Seller.countDocuments();
    const sellers = await Seller.find().select('-password').skip(skip).limit(limit); 

    res.status(200).json({
      success: true,
      page,
      pages: Math.ceil(total / limit),
      data: sellers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};