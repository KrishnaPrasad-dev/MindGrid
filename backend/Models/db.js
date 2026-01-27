// backend/Models/db.js
const mongoose = require("mongoose");

// 🔥 Disable mongoose buffering (CRITICAL for serverless)
mongoose.set("bufferCommands", false);

const MONGO_URI = process.env.MONGO_CONN;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_CONN environment variable is not set");
}

// Global cache for serverless
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function connectToMongoose() {
  // Reuse existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // Create connection promise if not exists
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // fail fast
      maxPoolSize: 5,                // safe for serverless
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = {
  mongoose,
  connectToMongoose,
};
