const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// --- Signup
const signup = async (req, res) => {
  try {
    console.log("SIGNUP body:", req.body);

    const { name, email, password, rollnumber, role } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "user is already exist, you can login", success: false });
    }
    const userModel = new UserModel({ name, email, password, rollnumber, role });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "signup successfully",
      success: true,
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({
      message: "Internal server error 500",
      success: false,
    });
  }
};

// --- Login
const login = async (req, res) => {
  try {
    console.log("LOGIN attempt body:", req.body);
    console.log("JWT_SECRET present:", !!process.env.JWT_SECRET);

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Email (or) password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
