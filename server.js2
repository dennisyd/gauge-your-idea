const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateReport = require('./src/utils/reportGenerator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/ideaFeedbackPlatform';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// User model
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Idea model
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
    }
  }],
  createdAt: { type: Date, default: Date.now }
});

const Idea = mongoose.model('Idea', IdeaSchema);

// Auth middleware
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// Routes

// Health check route
app.get('/api/health-check', (req, res) => {
  res.status(200).json({ message: 'Backend is up and running' });
});

// Register route
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Submit idea route
app.post('/api/ideas', auth, async (req, res) => {
  try {
    const { title, description, targetAudience, industry } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required.' });
    }

    const idea = new Idea({
      title,
      description,
      targetAudience,
      industry,
      creator: req.userId
    });
    await idea.save();
    res.status(201).json(idea);
  } catch (error) {
    console.error('Submit Idea Error:', error);
    res.status(500).json({ message: 'Error submitting idea', error: error.message });
  }
});

// Route to get user's ideas
app.get('/api/user/ideas', auth, async (req, res) => {
  try {
    const ideas = await Idea.find({ creator: req.userId }).select('title createdAt');
    res.json(ideas);
  } catch (error) {
    console.error('Fetch User Ideas Error:', error);
    res.status(500).json({ message: 'Error fetching user ideas', error: error.message });
  }
});

// Route to generate report for a specific idea
app.get('/api/ideas/:id/report', auth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id).populate('votes.user', 'name');
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    
    // Check if the authenticated user is the creator of the idea
    if (idea.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only generate reports for your own ideas' });
    }

    const pdfBuffer = await generateReport(idea);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=idea_report_${idea._id}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Generate Report Error:', error);
    res.status(500).json({ message: 'Error generating report', error: error.message });
  }
});


// Get all ideas route
app.get('/api/ideas', async (req, res) => {
  try {
    const ideas = await Idea.find().populate('creator', 'name email').sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    console.error('Fetch Ideas Error:', error);
    res.status(500).json({ message: 'Error fetching ideas', error: error.message });
  }
});

// Get single idea route
app.get('/api/ideas/:id', auth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id).populate('creator', 'name email');
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.json(idea);
  } catch (error) {
    console.error('Fetch Idea Error:', error);
    res.status(500).json({ message: 'Error fetching idea', error: error.message });
  }
});

// Vote on an idea route
app.post('/api/ideas/:id/vote', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { score, voterType, location, comment } = req.body;

    if (score < 1 || score > 10) {
      return res.status(400).json({ message: 'Invalid vote score. Must be between 1 and 10.' });
    }

    if (!['General Enthusiast', 'Industry Expert', 'Experienced Entrepreneur', 'Potential Customer/User'].includes(voterType)) {
      return res.status(400).json({ message: 'Invalid voter type.' });
    }

    const idea = await Idea.findById(id);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    const existingVoteIndex = idea.votes.findIndex(vote => vote.user.toString() === req.userId);

    if (existingVoteIndex !== -1) {
      // Update existing vote
      idea.votes[existingVoteIndex] = { user: req.userId, score, voterType, location, comment };
    } else {
      // Add new vote
      idea.votes.push({ user: req.userId, score, voterType, location, comment });
    }

    await idea.save();

    res.json({ idea });
  } catch (error) {
    console.error('Vote Error:', error);
    res.status(500).json({ message: 'Error voting on idea', error: error.message });
  }
});

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});