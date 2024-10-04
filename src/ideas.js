const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea'); // Adjust the path as necessary
const auth = require('../middleware/auth'); // You'll need to create this middleware

// GET user's ideas
router.get('/user', auth, async (req, res) => {
  try {
    const ideas = await Idea.find({ creator: req.user.id }).sort({ createdAt: -1 });
    res.json(ideas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;