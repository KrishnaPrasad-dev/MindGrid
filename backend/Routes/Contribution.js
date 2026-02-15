const express = require("express");
const router = express.Router();
const User = require("../Models/User");


console.log("🔥 Contribution route file loaded");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ totalContribution: -1 })
      .select("name email totalContribution");

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



router.post("/add", async (req, res) => {
  try {
    const { email, amount } = req.body;

    if (!email || !amount) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.totalContribution += Number(amount);
    await user.save();

    res.json({ message: "Contribution added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
