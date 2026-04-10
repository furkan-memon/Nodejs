const express = require("express");
const Task = require("../Models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * GET /api/tasks
 * Protected
 */
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(tasks);
});

/**
 * POST /api/tasks
 * Protected
 */
router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    userId: req.user.id,
  });

  res.status(201).json(task);
});

module.exports = router;
