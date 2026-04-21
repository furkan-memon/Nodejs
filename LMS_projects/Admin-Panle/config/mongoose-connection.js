// config/mongoose-connection.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // 1. Get the base URI from .env or use local default
    // Use 127.0.0.1 instead of localhost to avoid DNS issues in Node 18+
    const baseUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

    // 2. Ensure we aren't doubling up on slashes or missing them
    // This format: mongodb://127.0.0.1:27017/blogProject
    const fullUri = `${baseUri.replace(/\/$/, "")}/blogProject`;

    await mongoose.connect(fullUri);
    console.log("✅ Connected to MongoDB:", fullUri);
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    // Log the attempted URI to debug exactly what is being sent
    console.error("Attempted URI:", process.env.MONGODB_URI);
    process.exit(1);
  }
};

export default connectDB;