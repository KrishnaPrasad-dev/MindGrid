// Routes/ProfileRouter.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../Models/User');
const auth = require('../middleware/auth');

// ensure uploads dir exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

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

// PUT /api/profile -> update current user (multipart/form-data or JSON)
router.put('/profile', auth, upload.single('profilePic'), async (req, res) => {
  try {
    const body = req.body || {};
    const update = {};

    // allowed text fields (safe update)
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

    // file handling
    if (req.file) {
      const publicPath = `/uploads/${req.file.filename}`;
      update.profilePicUrl = publicPath;

      // optional: delete old local file if it exists and was uploaded previously
      try {
        const current = await User.findById(req.userId).lean();
        if (current && current.profilePicUrl && current.profilePicUrl.startsWith('/uploads/')) {
          const oldPath = path.join(process.cwd(), current.profilePicUrl);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
      } catch (e) { /* ignore */ }
    }

    // apply update
    const updated = await User.findByIdAndUpdate(req.userId, { $set: update }, { new: true }).select('-password -__v').lean();
    if (!updated) return res.status(404).json({ message: 'User not found' });
    return res.json(updated);
  } catch (err) {
    console.error('PUT /api/profile error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
