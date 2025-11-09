// controllers/userController.js (CommonJS)
const User = require('../Models/User');

exports.getAllUsers = async (req, res) => {
  try {
    // include _id explicitly; use the same field name you save in signup: rollnumber
    const users = await User.find({}, '_id name role rollnumber email');
    return res.json(users);
  } catch (error) {
    console.error('getAllUsers ERROR:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
