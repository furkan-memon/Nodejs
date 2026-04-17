import express from "express";
import Blog from "../models/Blog.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// READ
router.get("/", protect, async (req, res) => {
  const blogs = await Blog.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.render("index", { blogs });
});

// CREATE
router.post("/add", protect, async (req, res) => {
  await Blog.create({
    title: req.body.title,
    description: req.body.description,
    userId: req.user.id
  });
  res.redirect("/");
});

// DELETE
router.get("/delete/:id", protect, async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog || blog.userId.toString() !== req.user.id)
    return res.send("Unauthorized");

  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// EDIT PAGE
router.get("/edit/:id", protect, async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog || blog.userId.toString() !== req.user.id)
    return res.send("Unauthorized");

  res.render("edit", { blog });
});

// UPDATE
router.post("/update/:id", protect, async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog || blog.userId.toString() !== req.user.id)
    return res.send("Unauthorized");

  await Blog.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

export default router;