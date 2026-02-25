const express = require("express");
const Movie = require("../models/Movie");
const upload = require("../config/multer");

const router = express.Router();

/* =====================
   USER MODULE
===================== */

// Movie List
router.get("/", async (req, res) => {
  const search = req.query.search || "";

  const movies = await Movie.find({
    title: { $regex: search, $options: "i" }
  });

  res.render("index", { movies, search });
});

// Movie Details
router.get("/movie/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render("details", { movie });
});


router.get("/admin", async (req, res) => {
  const movies = await Movie.find();
  res.render("admin/dashboard", { movies });
});

// Add Movie Page
router.get("/admin/add", (req, res) => {
  res.render("admin/add");
});

// Add Movie
router.post("/admin/add", upload.single("poster"), async (req, res) => {
  const { title, director, genre, releaseYear, description } = req.body;

  await Movie.create({
    title,
    director,
    genre,
    releaseYear,
    description,
    poster: req.file ? req.file.buffer : null
  });

  res.redirect("/admin");
});

// Edit Page
router.get("/admin/edit/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render("admin/edit", { movie });
});

// Update Movie
router.post("/admin/update/:id", upload.single("poster"), async (req, res) => {

  const { title, director, genre, releaseYear, description } = req.body;

  const updateData = {
    title,
    director,
    genre,
    releaseYear,
    description
  };

  if (req.file) {
    updateData.poster = req.file.buffer;
  }

  await Movie.findByIdAndUpdate(req.params.id, updateData);

  res.redirect("/admin");
});

// Delete Movie
router.get("/admin/delete/:id", async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
});

module.exports = router;