// controllers/userController.js
const User = require('../Models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '_id name role rollnumber email profilePic'); // select needed fields
    return res.json(users);
  } catch (err) {
    console.error('getAllUsers ERROR:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
