const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 5,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  cart: {
    type: Array,
    default: []
  },

  orders: {
    type: Array,
    default: []
  },

  contact: {
    type: Number
  },

  picture: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);
