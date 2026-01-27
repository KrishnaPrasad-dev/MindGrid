const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_CONN;
if (!MONGO_URI) throw new Error('MONGO_CONN missing');

let cached = global._mongoose || { conn: null, promise: null };
global._mongoose = cached;

async function connectToMongoose() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 5,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = { mongoose, connectToMongoose };
