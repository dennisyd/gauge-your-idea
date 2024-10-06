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
mongoose.connect(mongoURI)
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
    },
    location: String,
    comment: String
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
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    res.status(201).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

// Submit idea route
app.post('/api/ideas', auth, async (req, res) => {
  const { title, description, targetAudience, industry } = req.body;
  try {
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
    res.status(500).json({ message: 'Failed to submit idea. Please try again.' });
  }
});

// Route to get ideas excluding those from the logged-in user
app.get('/api/ideas/other-users', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const sortOption = req.query.sort;
    const targetAudience = req.query.targetAudience;
    const industry = req.query.industry;

    let sortCriteria = {};
    switch (sortOption) {
      case 'recent':
        sortCriteria = { createdAt: -1 };
        break;
      case 'old':
        sortCriteria = { createdAt: 1 };
        break;
      case 'most-voted':
        sortCriteria = { votesCount: -1 };
        break;
      case 'least-voted':
        sortCriteria = { votesCount: 1 };
        break;
      case 'title':
        sortCriteria = { title: 1 };
        break;
      default:
        sortCriteria = { createdAt: -1 };
    }

    console.log('Fetching ideas for other users with userId:', userId);
    console.log('Filters:', { targetAudience, industry });

    let matchCriteria = {
      creator: { $ne: new mongoose.Types.ObjectId(userId) }
    };

    if (targetAudience) {
      matchCriteria.targetAudience = targetAudience;
    }

    if (industry) {
      matchCriteria.industry = industry;
    }

    const ideas = await Idea.aggregate([
      {
        $match: matchCriteria
      },
      {
        $addFields: {
          votesCount: { $size: "$votes" }
        }
      },
      { $sort: sortCriteria },
      {
        $project: {
          title: 1,
          description: 1,
          targetAudience: 1,
          industry: 1,
          createdAt: 1,
          votesCount: 1,
          creator: 1
        }
      }
    ]);

    console.log('Ideas fetched successfully:', ideas);

    res.status(200).json(ideas);
  } catch (error) {
    console.error('Error fetching other users\' ideas:', error);
    res.status(500).json({ message: 'Error fetching other users\' ideas', error: error.message });
  }
});



// Route to get user's own ideas
app.get('/api/user/ideas', auth, async (req, res) => {
  try {
    const ideas = await Idea.find({ creator: req.userId });
    res.status(200).json(ideas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your ideas', error: error.message });
  }
});

// Get all ideas route
app.get('/api/ideas', async (req, res) => {
  try {
    const ideas = await Idea.find().populate('creator', 'name');
    res.status(200).json(ideas);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ideas. Please try again.' });
  }
});

// Get single idea route
app.get('/api/ideas/:id', auth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id).populate('creator', 'name');
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.status(200).json(idea);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch idea. Please try again.' });
  }
});

// Vote on an idea route
app.post('/api/ideas/:id/vote', auth, async (req, res) => {
  const { score, voterType, location, comment } = req.body;
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    idea.votes.push({ user: req.userId, score, voterType, location, comment });
    await idea.save();
    res.status(200).json({ message: 'Vote submitted successfully', idea });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit vote. Please try again.' });
  }
});

// Delete idea route
app.delete('/api/ideas/:id', auth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    if (idea.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'You do not have permission to delete this idea' });
    }

    await idea.remove();
    res.status(200).json({ message: 'Idea deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete idea. Please try again.' });
  }
});

// Route to generate report for a specific idea
app.get('/api/ideas/:id/report', auth, async (req, res) => {
  try {
    const report = await generateReport(req.params.id);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate report. Please try again.' });
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
