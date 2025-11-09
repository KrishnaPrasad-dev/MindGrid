// controllers/userController.js
const User = require('../Models/User');

exports.getAllUsers = async (req, res) => {
  try {
    // select only the fields you want to expose
    const users = await User.find({}, 'name email rollnumber role').lean();
    return res.json({ success: true, data: users });
  } catch (err) {
    console.error('getAllUsers ERROR:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
