const express = require("express");
const router = express.Router();
const Project = require("../Models/Project");
const { connectToMongoose } = require("../Models/db");
const requireAuth = require("../Middlewares/RequireAuth");

// CREATE PROJECT
router.post("/projects", requireAuth, async (req, res) => {
  try {
    await connectToMongoose();

    const project = new Project({
      ...req.body,
      createdBy: req.user._id,
    });

    await project.save();
    res.status(201).json(project);

  } catch (err) {
    console.error("Project creation error:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET ALL PROJECTS
router.get("/projects", async (req, res) => {
  try {
    await connectToMongoose();

    const projects = await Project.find()
      .populate("createdBy", "name linkedin")
      .sort({ createdAt: -1 });

    res.json(projects);

  } catch (err) {
    console.error("Fetch projects error:", err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/projects/:id", async (req, res) => {
  try {
    await connectToMongoose();

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);

  } catch (err) {
    console.error("Fetch single project error:", err);
    res.status(500).json({ message: err.message });
  }
});

// UPDATE PROJECT
router.put("/projects/:id", requireAuth, async (req, res) => {
  try {
    await connectToMongoose();

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Optional: Only creator can edit
    if (project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this project" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.json(updatedProject);

  } catch (err) {
    console.error("Update project error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;