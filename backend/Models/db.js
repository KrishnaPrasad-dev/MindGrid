// backend/config/db.js
// Serverless-safe mongoose connector (Vercel compatible)

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_CONN; // 🔴 MUST MATCH Vercel ENV NAME

if (!MONGO_URI) {
  throw new Error('MONGO_CONN environment variable is not set');
}

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function connectToMongoose() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 5,
    };

    console.log('🔌 Connecting to MongoDB...');
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
      console.log('✅ MongoDB connected');
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = { connectToMongoose };
