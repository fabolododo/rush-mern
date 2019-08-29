const mongoose = require('mongoose');
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 5,
    max: 20,
    unique:  true,
    index: true,
    required: true
  },
  email: {
    type: String,
    unique: [true, 'This email already exists'],
    validate: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/, "this email isn't valid"],
    required: [true, 'This field is required'],
  },
  password: {
    type: String,
    min: 6,
    max: 20,
    required: [true, 'This field is required']
  },
  admin: {
    type: Boolean,
    default: false
  },
  createdAt: {
      type: Date,
      default: Date.now
    },
  UpdatedAt: {
    type: Date,
    default: Date.now
    }
});

UserSchema.methods = {
  authenticate: function(password) {
    return passwordHash.verify(password, this.password);
  },
  getToken: function() {
    return jwt.encode(this, config.secret);
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;