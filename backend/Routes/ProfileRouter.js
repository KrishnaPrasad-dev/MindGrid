const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../Models/User');
const auth = require('../Middlewares/auth');


// ===============================
// GET current logged-in user
// GET /api/profile
// ===============================
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password -__v')
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (err) {
    console.error('GET /api/profile error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});


// ===============================
// GET any user by ID
// GET /api/profile/:id
// ===============================
router.get('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 Prevent invalid ObjectId crash
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(id)
      .select('-password -__v')
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (err) {
    console.error('GET /api/profile/:id error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});


// ===============================
// UPDATE logged-in user
// PUT /api/profile
// ===============================
router.put('/profile', auth, async (req, res) => {
  try {
    const body = req.body || {};
    const update = {};

    const fields = [
      'name',
      'title',
      'resumeLink',
      'role',
      'section',
      'bio',
      'github',
      'linkedin',
      'rollnumber'
    ];

    fields.forEach(field => {
      if (typeof body[field] !== 'undefined') {
        update[field] = body[field];
      }
    });

    // 🔥 Skills handling (array OR comma string)
    if (typeof body.skills !== 'undefined') {
      if (Array.isArray(body.skills)) {
        update.skills = body.skills
          .map(s => String(s).trim())
          .filter(Boolean);
      } else {
        update.skills = String(body.skills)
          .split(',')
          .map(s => s.trim())
          .filter(Boolean);
      }
    }

    const updated = await User.findByIdAndUpdate(
      req.userId,
      { $set: update },
      { new: true }
    )
      .select('-password -__v')
      .lean();

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(updated);
  } catch (err) {
    console.error('PUT /api/profile error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;