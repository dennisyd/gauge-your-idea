const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  targetAudience: String,
  industry: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  votes: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, min: 1, max: 10 },
    voterType: {
      type: String,
      enum: ['General Enthusiast', 'Industry Expert', 'Experienced Entrepreneur', 'Potential Customer/User']
    },
    location: String,
    comment: String  // Add this line
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Idea', IdeaSchema);