// Routes/MembersRouter.js
const express = require('express');
const router = express.Router();
const UserModel = require('../Models/User');

// GET /members
router.get('/', async (req, res) => {
  try {
    const members = await UserModel.find({}, '-password -__v').lean();
    res.status(200).json({ success: true, members });
  } catch (err) {
    console.error('GET /members error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch members' });
  }
});

// GET /members/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.length < 6) {
      return res.status(400).json({ success: false, message: 'Invalid id' });
    }

    const member = await UserModel.findById(id).select('-password -__v').lean();
    if (!member) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    res.status(200).json({ success: true, member });
  } catch (err) {
    console.error('GET /members/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
});

module.exports = router;
