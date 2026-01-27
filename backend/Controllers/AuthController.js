// backend/Controllers/AuthController.js
console.log("✅ AuthController loaded");

const UserModel = require("../Models/User");
const { connectToMongoose } = require("../Models/db"); // 🔥 IMPORTANT
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Load static allowed members list
let allowedList = [];
try {
  allowedList = require("../config/allowedMembers");
  console.log("✅ Loaded allowed members list with", allowedList.length, "entries");
} catch (err) {
  console.error("⚠️ Could not load allowedMembers.js:", err.message);
}

// Debug env
console.log("AUTH CONTROLLER ENV CHECK:");
console.log("  - JWT_SECRET present:", !!process.env.JWT_SECRET);
console.log("  - NODE_ENV:", process.env.NODE_ENV || "not-set");

/** ✅ Helper: check if email or rollnumber is allowed */
async function isAllowedMember({ email, rollnumber }) {
  if (String(process.env.DISABLE_MEMBERSHIP_CHECK).toLowerCase() === "true") {
    return { allowed: true, source: "disabled-by-env" };
  }

  const normalizedEmail = email ? email.toLowerCase().trim() : "";
  const normalizedRoll = rollnumber ? rollnumber.toLowerCase().trim() : "";

  if (!allowedList || !allowedList.length) {
    console.warn("⚠️ allowedMembers list empty — denying all signups.");
    return { allowed: false, source: "empty-list" };
  }

  const lowerList = allowedList.map((x) => String(x).toLowerCase().trim());

  if (normalizedEmail && lowerList.includes(normalizedEmail)) {
    return { allowed: true, source: "file" };
  }
  if (normalizedRoll && lowerList.includes(normalizedRoll)) {
    return { allowed: true, source: "file" };
  }

  return { allowed: false, source: "file" };
}

/** ✅ Membership check endpoint */
const checkMember = async (req, res) => {
  try {
    const email = req.query.email ? String(req.query.email).toLowerCase() : null;
    const rollnumber = req.query.rollnumber ? String(req.query.rollnumber).toLowerCase() : null;

    if (!email && !rollnumber) {
      return res.status(400).json({
        allowed: false,
        message: "Please provide email or rollnumber",
      });
    }

    const result = await isAllowedMember({ email, rollnumber });

    if (result.allowed) {
      return res.status(200).json({
        allowed: true,
        message: "Allowed to register",
        source: result.source,
      });
    }

    return res.status(403).json({
      allowed: false,
      message: "Not allowed to register",
      source: result.source,
    });
  } catch (err) {
    console.error("CHECK MEMBER ERROR:", err);
    return res.status(500).json({
      allowed: false,
      message: "Membership check failed",
    });
  }
};

// =======================
// SIGNUP
// =======================
const signup = async (req, res) => {
  try {
    await connectToMongoose(); // 🔥 CRITICAL FOR SERVERLESS

    const { name, email, password, rollnumber, role } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
        success: false,
      });
    }

    const membership = await isAllowedMember({ email, rollnumber });
    if (!membership.allowed) {
      return res.status(403).json({
        message: "You are not allowed to register on this site.",
        success: false,
        source: membership.source,
      });
    }

    const existing = await UserModel.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({
        message: "User already exists, please login",
        success: false,
      });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new UserModel({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      rollnumber,
      role,
    });

    await user.save();

    return res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err.stack || err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// =======================
// LOGIN
// =======================
const login = async (req, res) => {
  try {
    await connectToMongoose(); // 🔥 CRITICAL FOR SERVERLESS

    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
        success: false,
      });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(403).json({
        message: "Email or password incorrect",
        success: false,
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: "Email or password incorrect",
        success: false,
      });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken: token,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err.stack || err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
  checkMember,
};
