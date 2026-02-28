const express = require("express");
const router = express.Router();
const Project = require("../Models/Project");
const { connectToMongoose } = require("../Models/db");
const requireAuth = require("../Middlewares/RequireAuth");

router.post("/projects", requireAuth, async (req, res) => {
  try {
    await connectToMongoose();

    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const project = new Project({
      ...req.body,
      createdBy: userId,
    });

    await project.save();

    res.status(201).json(project);

  } catch (err) {
    console.error("Project creation error:", err);
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;