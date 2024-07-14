const User = require("../models/User");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Fetch the "User" role
    const userRole = await Role.findOne({ name: "User" });
    if (!userRole) {
      return res.status(500).json({ error: "User role not found" });
    }
    // Create a new user with the "User" role
    const newUser = await User.create({
      username,
      password,
      role: userRole._id,
    });
    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).populate(
      "role",
      "name menus"
    );
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser };
