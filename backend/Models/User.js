// Models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rollnumber: { type: String, required: true },
  role: { type: String, required: true },

  // Optional profile fields (added)
  title: { type: String, default: '' },
  resumeLink: { type: String, default: '' },        // raw user-provided link
  resumeDirectLink: { type: String, default: '' },  // sanitized / drive-direct link
  section: { type: String, default: '' },
  bio: { type: String, default: '' },
  skills: { type: [String], default: [] },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  profilePicUrl: { type: String, default: '' } // e.g. /uploads/...
}, { timestamps: true });

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
