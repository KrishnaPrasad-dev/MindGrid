import User from "../Models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name role rollNumber email"); // exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
