const express = require("express");
const router = express.Router();
const Event = require("../Models/Events");
const authMiddleware = require('../Middlewares/auth');

router.post("/events", authMiddleware, async (req, res) => {
  try {

    const event = new Event({
      ...req.body,
      createdBy: req.userId
    });

    await event.save();

    res.status(201).json(event);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating event" });
  }
});

router.get("/events", async (req, res) => {
  try {

    const events = await Event
      .find()
      .populate("createdBy", "email")
      .sort({ createdAt: -1 });

    res.json(events);

  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

router.get("/events/:id", async (req, res) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching event" });
  }
});


router.put("/events/:id/feature", authMiddleware, async (req, res) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.isFeatured = !event.isFeatured;

    await event.save();

    res.json(event);

  } catch (err) {
    res.status(500).json({ message: "Error toggling feature" });
  }
});



router.put("/events/:id", authMiddleware, async (req, res) => {
  try {

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updatedEvent);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Error updating event" });

  }
});

module.exports = router;