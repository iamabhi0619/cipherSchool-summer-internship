const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {type: String, unique: true},
  password: { type: String, required: true },
  department: {
    type: String,
    enum: ["EE", "ECE", "CSE", "CE", "ME", "MCA", "MBA"], 
    required: true,
  },
  regdNo: { type: String, required: true },
  role: { type: String, default: "student" },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date }
});

module.exports = mongoose.model("User", UserSchema);
