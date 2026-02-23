const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,

  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      qty: {
        type: Number,
        default: 1
      }
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
