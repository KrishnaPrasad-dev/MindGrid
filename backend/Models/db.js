// Models/db.js
// Serverless-friendly mongoose connector (CommonJS)
// Place this file at Models/db.js and don't call mongoose.connect() elsewhere.

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  // Fail fast so you can see the error in Vercel logs during deployment
  throw new Error('MONGO_URI environment variable is not set');
}

// Use a global cache so the connection is reused across lambda invocations
const globalAny = global;

if (!globalAny._mongoose) {
  globalAny._mongoose = { conn: null, promise: null };
}

async function connectToMongoose() {
  if (globalAny._mongoose.conn) {
    // already connected — fast path
    return globalAny._mongoose.conn;
  }

  if (!globalAny._mongoose.promise) {
    const opts = {
      // You can uncomment/tune timeouts if you want faster failures:
      // serverSelectionTimeoutMS: 5000,
      // socketTimeoutMS: 45000,
      // bufferCommands: false,
    };
    globalAny._mongoose.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  globalAny._mongoose.conn = await globalAny._mongoose.promise;
  return globalAny._mongoose.conn;
}

// Immediately try to connect when required (keeps previous behavior of your app)
connectToMongoose().catch((err) => {
  console.error('Mongoose initial connection error:', err && err.stack ? err.stack : err);
  // Don't process.exit — in serverless we want the invocation to fail and the error to appear in logs
});

// Helpful global handlers so stack traces show up in Vercel logs
if (typeof process !== 'undefined') {
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection in process:', err && err.stack ? err.stack : err);
  });
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception in process:', err && err.stack ? err.stack : err);
  });
}

module.exports = { connectToMongoose };
