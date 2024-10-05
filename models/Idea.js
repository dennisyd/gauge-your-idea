// Correct order for route definitions
router.get('/other-users', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Get user id from the authenticated user
    const ideas = await Idea.find({ creator: { $ne: userId } }).populate('creator', 'name');
    res.status(200).json(ideas);
  } catch (error) {
    console.error('Error fetching other users\' ideas:', error);
    res.status(500).json({ message: 'Server Error: Unable to fetch ideas.' });
  }
});

// Define this route AFTER all specific routes
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.json(idea);
  } catch (error) {
    console.error('Error fetching idea:', error);
    res.status(500).json({ message: 'Server Error: Unable to fetch idea.' });
  }
});
