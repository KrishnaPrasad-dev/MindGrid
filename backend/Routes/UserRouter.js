// backend/Routes/UserRouter.js
const express = require('express');
const router = express.Router();

console.log('🚫 UserRouter disabled temporarily');

router.get('/all', (req, res) => {
  res.status(503).json({ error: 'User routes disabled temporarily' });
});

module.exports = router;
