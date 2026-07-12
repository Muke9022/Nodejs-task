const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true }, 
  mobileNo: { type: String, required: true }, 
  country: { type: String, required: true }, 
  state: { type: String, required: true }, 
  
  skills: [{ type: String }], 
  password: { type: String, required: true }, 
  role: { type: String, default: 'seller' }
}, { timestamps: true });

sellerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('Seller', sellerSchema);