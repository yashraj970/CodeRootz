const Role = require("../models/Role");

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createRole = async (req, res) => {
  const { name, menus } = req.body;
  try {
    const role = new Role({ name, menus });
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, menus } = req.body;
  try {
    const role = await Role.findByIdAndUpdate(
      id,
      { name, menus },
      { new: true }
    );
    res.status(200).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    await Role.findByIdAndDelete(id);
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getRoles, createRole, updateRole, deleteRole };
