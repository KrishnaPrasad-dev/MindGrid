// lib/mongoose.js
import mongoose from 'mongoose';


const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
throw new Error('MONGO_URI environment variable is not set');
}


/**
* Serverless-friendly mongoose connector.
* Reuses a cached connection across imports/Cold starts.
*/


const globalAny = global;


if (!globalAny._mongoose) {
globalAny._mongoose = { conn: null, promise: null };
}


export async function connectToMongoose() {
if (globalAny._mongoose.conn) {
// already connected
return globalAny._mongoose.conn;
}


if (!globalAny._mongoose.promise) {
const opts = {
// Mongoose v6+ mostly handles defaults; include some timeouts for serverless
// Adjust these if needed.
// bufferCommands: false,
// serverSelectionTimeoutMS: 5000,
// socketTimeoutMS: 45000,
};


globalAny._mongoose.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
return mongooseInstance;
});
}


globalAny._mongoose.conn = await globalAny._mongoose.promise;
return globalAny._mongoose.conn;
}


// Helpful crash logging during development — these will show up in Vercel logs.
if (typeof process !== 'undefined') {
process.on('unhandledRejection', (err) => {
console.error('Unhandled Rejection in process:', err && err.stack ? err.stack : err);
});
process.on('uncaughtException', (err) => {
console.error('Uncaught Exception in process:', err && err.stack ? err.stack : err);
});
}


export default connectToMongoose;