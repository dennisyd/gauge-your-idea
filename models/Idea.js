const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  industry: String,
  location: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  votes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, score: Number }],
  comments: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, text: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Idea', IdeaSchema);