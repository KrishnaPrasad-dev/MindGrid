// backend/Models/db.js
const mongoose = require("mongoose");

// 🔥 Critical for serverless
mongoose.set("bufferCommands", false);

const MONGO_URI = process.env.MONGO_CONN;

if (!MONGO_URI) {
  throw new Error("MONGO_CONN environment variable is missing");
}

// Global cache (survives across invocations)
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function connectToMongoose() {
  // If already connected, reuse
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection attempt yet, create one
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 5,
      })
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection failed:", err.message);
        // 🔥 RESET so next request can retry
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = {
  mongoose,
  connectToMongoose,
};
