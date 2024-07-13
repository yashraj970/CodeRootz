const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const RoleRoutes = require("./routes/RoleRoutes");
const UserRoutes = require("./routes/UserRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/roles", RoleRoutes);
app.use("/api/roles", UserRoutes);

app.listen(4000, () => {
  console.log("server is running on 4000");
});
