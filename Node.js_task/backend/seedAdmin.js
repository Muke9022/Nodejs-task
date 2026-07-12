const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await Admin.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists.");
      process.exit(0);
    }

    await Admin.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: "admin123", // pre-save middleware will hash it
      role: "admin",
    });

    console.log("✅ Admin created successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();