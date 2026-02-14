const { mongoose } = require('./db');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  rollnumber: String,
  role: String,

  // ADD THESE ↓↓↓
  title: { type: String, default: '' },
  section: { type: String, default: '' },
  bio: { type: String, default: '' },
  resumeLink: { type: String, default: '' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },

  skills: {
    type: [String],
    default: []
  }

}, { timestamps: true });

module.exports = mongoose.model('users', UserSchema);
