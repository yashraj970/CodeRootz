const mongoose = require("mongoose");
const localDB = `mongodb://0.0.0.0:27017/app_ghl_ai`;
const connectDB = async () => {
  try {
    await mongoose.connect(localDB, {});
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
