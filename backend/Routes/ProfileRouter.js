// Routes/ProfileRouter.js
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const User = require('../Models/User');

// NOTE: your middleware lives in backend/Middlewares/auth.js (capital M)
const auth = require('../Middlewares/auth'); // <- FIX: use the actual folder name/casing

// GET /api/profile -> returns current logged-in user
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password -__v').lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error('GET /api/profile error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/profile -> update current user (no file writes here; use S3 for serverless)
router.put('/profile', auth, async (req, res) => {
  try {
    // Protect serverless from multipart disk writes — reject multipart for now
    if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
      return res.status(400).json({ message: 'File uploads disabled on serverless; use S3 or send JSON' });
    }

    const body = req.body || {};
    const update = {};

    // allowed text fields
    const fields = ['name','title','resumeLink','role','section','bio','github','linkedin','rollnumber'];
    fields.forEach(k => {
      if (typeof body[k] !== 'undefined') update[k] = body[k];
    });

    // skills: accept JSON array or comma separated string
    if (typeof body.skills !== 'undefined') {
      try {
        const parsed = JSON.parse(body.skills);
        if (Array.isArray(parsed)) update.skills = parsed.map(s => String(s).trim()).filter(Boolean);
        else update.skills = String(body.skills).split(',').map(s => s.trim()).filter(Boolean);
      } catch (e) {
        update.skills = String(body.skills).split(',').map(s => s.trim()).filter(Boolean);
      }
    }

    const updated = await User.findByIdAndUpdate(req.userId, { $set: update }, { new: true }).select('-password -__v').lean();
    if (!updated) return res.status(404).json({ message: 'User not found' });
    return res.json(updated);
  } catch (err) {
    console.error('PUT /api/profile error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
