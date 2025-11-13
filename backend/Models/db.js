// Models/db.js
// Serverless-friendly mongoose connector (CommonJS)
// Replace your existing file with this copy-paste version.

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_CONN;
if (!MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not set');
}

const globalAny = global;

if (!globalAny._mongoose) {
  globalAny._mongoose = { conn: null, promise: null };
}

async function connectToMongoose() {
  if (globalAny._mongoose.conn) {
    return globalAny._mongoose.conn;
  }

  if (!globalAny._mongoose.promise) {
    // serverless-friendly mongoose options
    const opts = {
      // Fail fast if server selection takes too long (ms)
      serverSelectionTimeoutMS: 5000,
      // Close sockets that are idle for too long
      socketTimeoutMS: 45000,
      // Limit pool size so you don't open too many connections from many lambdas
      // (tune up if you need more concurrent DB operations)
      maxPoolSize: 5,
      // Use unified topology (default in modern mongoose, but explicit here)
      useUnifiedTopology: true,
    };

    console.log('Creating new mongoose connection promise');
    globalAny._mongoose.promise = mongoose.connect(MONGO_URI, opts).then((instance) => {
      console.log('Mongoose connected');
      return instance;
    }).catch(err => {
      console.error('Mongoose initial connect failed:', err && err.stack ? err.stack : err);
      // rethrow so awaiting callers see the error
      throw err;
    });
  }

  globalAny._mongoose.conn = await globalAny._mongoose.promise;
  return globalAny._mongoose.conn;
}

// Start connecting now (keeps behavior similar to previous code)
// On serverless platforms this will attempt connect on cold-start; if it fails,
// the logs will show the error.
connectToMongoose().catch((err) => {
  console.error('Initial Mongoose connection error:', err && err.stack ? err.stack : err);
});

// Helpful global handlers so stack traces appear in Vercel logs
if (typeof process !== 'undefined') {
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection in process:', err && err.stack ? err.stack : err);
  });
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception in process:', err && err.stack ? err.stack : err);
  });
}

module.exports = { connectToMongoose };
