const User = require("../models/User");
const Role = require("../models/Role");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role", "name");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { roleId } = req.body;
  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    const user = await User.findByIdAndUpdate(
      id,
      { role: roleId },
      { new: true }
    ).populate("role", "name");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUsers, updateUserRole };
