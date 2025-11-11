// middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

module.exports = function (req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Missing token' });

    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload._id || payload.id || null;
    if (!req.userId) return res.status(401).json({ message: 'Invalid token payload' });
    next();
  } catch (err) {
    console.error('auth middleware error', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
