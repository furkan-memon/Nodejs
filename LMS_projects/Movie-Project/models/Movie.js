const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  director: String,
  genre: String,
  releaseYear: Number,
  description: String,
  poster: Buffer
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);