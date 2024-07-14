const mongoose = require("mongoose");
const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");

const seedDatabase = async () => {
  try {
    // Clear existing roles and users
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

    // Create a Superadmin user
    const superadminUser = new User({
      username: "superadmin",
      password: "superadminpassword",
      role: superadminRole._id,
    });

    await superadminUser.save(); // This will trigger the pre('save') hook

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
