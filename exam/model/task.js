const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: String,
    category: String,
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Task", schema);