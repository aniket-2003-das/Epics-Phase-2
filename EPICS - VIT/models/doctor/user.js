const mongoose = require("mongoose");
const passportLocalMongoodse = require("passport-local-mongoose");


const userSchema = new mongoose.Schema({
    email: String,
    password: String,
  });
  
  userSchema.plugin(passportLocalMongoodse);
  
  const User = new mongoose.model("users", userSchema);

module.exports = User; 