const mongoose = require("mongoose");
require("dotenv").config(); 
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Successfully connected to MongoDB.");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); 
    }
}

module.exports = connect;