const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: {
        type: String,
        enum: ["high", "medium", "low"],
        default: "medium"
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
