const { mongoose } = require('./db');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  techStack: {
    type: [String],
    default: []
  },

  githubLink: {
    type: String,
    default: ''
  },

  liveLink: {
    type: String,
    default: ''
  },

  status: {
    type: String,
    enum: ['Idea', 'In Progress', 'Completed'],
    default: 'Idea'
  },

  progress: {
    type: Number, // 0 to 100
    default: 0
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },

  teamMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  ],

  isFeatured: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model('projects', ProjectSchema);