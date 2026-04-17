import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.render("index", { blogs });
});

router.post("/add", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.send("All fields are required");
  }

  await Blog.create({ title, description });
  res.redirect("/");
});

router.get("/delete/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

router.get("/edit/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("edit", { blog });
});

router.post("/update/:id", async (req, res) => {
  const { title, description } = req.body;

  await Blog.findByIdAndUpdate(req.params.id, {
    title,
    description
  });

  res.redirect("/");
});

export default router;