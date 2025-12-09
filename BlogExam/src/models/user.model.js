const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"]
    },
    profilePic: {
      type: String,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "User"]
    },
    contactNum: {
      type: Number,
    },
    password: {
      type: String,
    },
    isDelete: {
      type: Boolean,
      default: false
    }

  },
);

module.exports = mongoose.model('User', userSchema);

