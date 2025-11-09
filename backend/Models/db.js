// backend/Models/db.js
const mongoose = require('mongoose');

const uri = process.env.MONGO_CONN; // make sure this name matches Vercel env
if (!uri) {
  console.error('MONGO_CONN is not set. Skipping DB connect. Set MONGO_CONN in environment variables.');
  // Export a resolved null so requiring this file won't throw
  module.exports = Promise.resolve(null);
  return;
}

// reuse existing connection promise across Lambda invocations / serverless cold starts
if (!global._mongooseConnectionPromise) {
  global._mongooseConnectionPromise = mongoose
    .connect(uri, {
      // optional recommended options; mongoose 6+ sets sensible defaults,
      // but you can add here if needed
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log('MONGODB connected ✔');
      return mongoose;
    })
    .catch((err) => {
      console.error('mongoDB connection Error:', err);
      // swallow the error here so require() doesn't throw synchronously.
      // Return null so callers can detect the failure.
      return null;
    });
}

module.exports = global._mongooseConnectionPromise;
