import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    userId: req.user.id
  });

  res.status(201).json(blog);
};

export const getBlogs = async (req, res) => {
  const blogs = await Blog.find({ userId: req.user.id });
  res.status(200).json(blogs);
};

export const getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog)
    return res.status(404).json({ message: "Not found" });

  res.status(200).json(blog);
};

export const updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(blog);
};

export const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Deleted" });
};