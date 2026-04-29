const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: { type: String, default: "user" }
});

module.exports = mongoose.model("User", schema);