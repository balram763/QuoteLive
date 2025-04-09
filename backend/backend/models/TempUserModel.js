const mongoose = require("mongoose");

const TempUserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  otp: String,
  otpExpires: Date,
});

module.exports = mongoose.model("TempUser", TempUserSchema);
