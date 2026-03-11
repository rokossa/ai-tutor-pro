const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
        console.error("🔥 FATAL ERROR: MONGO_URI environment variable is missing!");
        return;
    }
    
    console.log("⏳ Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("🔥 MongoDB Connection Failed! Ensure your Render IP is whitelisted in MongoDB Atlas.");
    console.error("Error details:", err.message);
  }
};

module.exports = connectDB;
