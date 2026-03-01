const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn("⚠️ MONGO_URI is missing. Database will not connect.");
      return;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn("⚠️ Server is staying alive, but database features will not work until the MONGO_URI password is fixed.");
    // We completely removed process.exit(1) so the server doesn't crash!
  }
};

module.exports = connectDB;
