// Routes/ProfileRouter.js
const express = require('express');
const router = express.Router();
const User = require('../Models/User');

// NOTE: your middleware lives in backend/Middlewares/auth.js (capital M)
const auth = require('../Middlewares/auth'); // ensure path/casing matches your repo

// ---- Helpers ----
// Convert Google Drive share link to direct download/view link
function googleDriveDirectLink(url) {
  if (!url || typeof url !== 'string') return '';
  // /d/FILE_ID pattern
  const fileIdMatch = url.match(/\/d\/([A-Za-z0-9_-]+)/);
  if (fileIdMatch) return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
  // id param pattern (drive links sometimes include ?id=...)
  const idParam = url.match(/[?&]id=([A-Za-z0-9_-]+)/);
  if (idParam) return `https://drive.google.com/uc?export=download&id=${idParam[1]}`;
  // If already looks like a direct download/view link, return as-is
  return url;
}

// Basic URL sanitizer (reject javascript:, data:)
function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  // Reject dangerous schemes
  if (/^\s*(javascript|data):/i.test(trimmed)) return '';
  return trimmed;
}

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

// PUT /api/profile -> update current user (no file writes here; use S3 for uploads)
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
        const parsed = typeof body.skills === 'string' ? JSON.parse(body.skills) : body.skills;
        if (Array.isArray(parsed)) update.skills = parsed.map(s => String(s).trim()).filter(Boolean);
        else update.skills = String(body.skills).split(',').map(s => s.trim()).filter(Boolean);
      } catch (e) {
        update.skills = String(body.skills).split(',').map(s => s.trim()).filter(Boolean);
      }
    }

    // Handle resumeLink specially: sanitize and create resumeDirectLink if applicable
    if (typeof update.resumeLink !== 'undefined') {
      const raw = sanitizeUrl(String(update.resumeLink || ''));
      update.resumeLink = raw;
      const direct = googleDriveDirectLink(raw);
      update.resumeDirectLink = sanitizeUrl(direct);
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
