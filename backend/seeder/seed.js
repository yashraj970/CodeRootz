const mongoose = require("mongoose");
const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");

// Seed Database Function
const seedDatabase = async () => {
  try {
    await Role.deleteMany();
    await User.deleteMany();

    // Create roles
    const superadminRole = await Role.create({
      name: "Superadmin",
      menus: [
        "Menu 1",
        "Menu 2",
        "Menu 3",
        "Menu 4",
        "Menu 5",
        "User Management",
        "Role Management",
      ],
    });
    const userRole = await Role.create({
      name: "User",
      menus: ["Menu 1", "Menu 2", "Menu 3", "Menu 4", "Menu 5"],
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("superadminpassword", salt);

    await User.create({
      username: "superadmin",
      password: hashedPassword,
      role: superadminRole._id,
    });

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Connect to MongoDB and seed the database
connectDB().then(() => {
  console.log("MongoDB connected");
  seedDatabase();
});
