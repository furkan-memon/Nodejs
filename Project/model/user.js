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

 cart: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    qty: {
      type: Number,
      default: 0
    }
  }
],

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
