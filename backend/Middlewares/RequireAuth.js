// Middlewares/RequireAuth.js
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

const requireAuth = async (req, res, next) => {
  try {
    // Authorization header should look like: "Bearer <token>"
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user (optional if you only need basic check)
    const user = await UserModel.findById(decoded._id).select('name role');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // attach to req for later use
    next();
  } catch (error) {
    console.error("JWT Verify Error:", error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = requireAuth;
