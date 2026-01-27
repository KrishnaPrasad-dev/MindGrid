// ❌ NO require('mongoose') anywhere in this file
const { mongoose } = require('./db');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  rollnumber: String,
  role: String,
}, { timestamps: true });

module.exports = mongoose.model('users', UserSchema);
