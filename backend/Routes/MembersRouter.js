// Routes/MembersRouter.js
const express = require('express');
const router = express.Router();
const UserModel = require('../Models/User');
const requireAuth = require('../Middlewares/RequireAuth');

// GET /members → returns all users (name, role)
router.get('/', requireAuth, async (req, res) => {
  try {
    // Optional: Only allow director/admin to fetch all members
    // if (req.user.role !== 'director' && req.user.role !== 'admin') {
    //   return res.status(403).json({ message: 'Access denied' });
    // }

    const members = await UserModel.find({}, 'name role').sort({ name: 1 }); // only name, role
    res.status(200).json({ success: true, count: members.length, members });
  } catch (err) {
    console.error("Fetch members error:", err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
