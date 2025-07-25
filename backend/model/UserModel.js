const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  pass: String,
  phonenum: String,
  gender: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
