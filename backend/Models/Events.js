const { mongoose } = require('./db');

const EventSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  },

  location: {
    type: String,
    default: ''
  },

  speaker: {
    type: String,
    default: ''
  },

  registrationLink: {
    type: String,
    default: ''
  },

  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed'],
    default: 'Upcoming'
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },

  isFeatured: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model('events', EventSchema);