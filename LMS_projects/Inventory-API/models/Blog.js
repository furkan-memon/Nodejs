import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);