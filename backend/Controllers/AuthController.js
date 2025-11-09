console.log("✅ AuthRouter imports success");

// controllers/authController.js
const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Debug helper: safe print of environment keys we rely on
console.log("AUTH CONTROLLER LOADED - env checks:");
console.log("  - JWT_SECRET present:", !!process.env.JWT_SECRET);
console.log("  - NODE_ENV:", process.env.NODE_ENV || "not-set");

// --- Signup
const signup = async (req, res) => {
  try {
    console.log("SIGNUP body:", req.body);

    // Guard: ensure body exists and required fields provided
    if (!req.body) {
      console.error("SIGNUP ERROR: missing request body");
      return res.status(400).json({ message: "Missing request body", success: false });
    }
    const { name, email, password, rollnumber, role } = req.body;
    if (!email || !password || !name) {
      console.error("SIGNUP ERROR: missing required fields", { name, email, password });
      return res.status(400).json({
        message: "Missing required fields: name, email and password are required",
        success: false,
      });
    }

    // Check existing user
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "user is already exist, you can login",
        success: false,
      });
    }

    // Create & hash
    const userModel = new UserModel({ name, email, password, rollnumber, role });
    // Use SALT_ROUNDS env if provided, else default to 10
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
    userModel.password = await bcrypt.hash(password, saltRounds);
    await userModel.save();

    res.status(201).json({
      message: "signup successfully",
      success: true,
    });
  } catch (err) {
    // Full server log
    console.error("SIGNUP ERROR:", err.stack || err);

    // DEBUG: return error message & stack to client (temporary)
    return res.status(500).json({
      message: "Internal server error 500",
      success: false,
      error: err.message,   // remove in production
      stack: err.stack,     // remove in production
    });
  }
};

// --- Login
const login = async (req, res) => {
  try {
    console.log("LOGIN attempt body:", req.body);
    console.log("JWT_SECRET present:", !!process.env.JWT_SECRET);

    if (!req.body) {
      console.error("LOGIN ERROR: missing request body");
      return res.status(400).json({ message: "Missing request body", success: false });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      console.error("LOGIN ERROR: missing email/password", { email, password });
      return res.status(400).json({ message: "Email and password required", success: false });
    }

    const user = await UserModel.findOne({ email });
    const errorMsg = "Email (or) password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    if (!process.env.JWT_SECRET) {
      // Explicit helpful error when JWT_SECRET missing
      const missingErr = new Error("JWT_SECRET is not set in environment variables");
      console.error("LOGIN ERROR:", missingErr);
      throw missingErr;
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
    console.error("LOGIN ERROR:", err.stack || err);
    // DEBUG: return detailed error to client (temporary)
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,  // remove in production
      stack: err.stack,    // remove in production
    });
  }
};

module.exports = {
  signup,
  login,
};
