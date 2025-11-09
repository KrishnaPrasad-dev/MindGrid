const express = require('express');
const router = express.Router();
const User = require('../Models/User');

router.get('/all', async (req, res) => {
  try {
    // Find all users but only select the specified fields
    const users = await User.find({}, 'name email rollnumber role');
    res.json(users);
  } catch (err) {
    console.error('getAllUsers ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
