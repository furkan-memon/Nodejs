const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  image: {
    type: Buffer,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  authorname: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
