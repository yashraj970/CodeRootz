const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateUserRole,
} = require("../controllers/userManagementController");

// Get all users
router.get("/", getUsers);

// Update user role
router.put("/:id/role", updateUserRole);

module.exports = router;
