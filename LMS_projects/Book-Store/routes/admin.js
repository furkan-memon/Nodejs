const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const Product = require("../models/Product");


// Show Upload Page
router.get("/admin/upload", (req, res) => {
  res.render("upload");
});


// Handle Upload
router.post("/admin/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, authorname, price } = req.body;

    if (!req.file) {
      return res.send("Image is required");
    }

    await Product.create({
      image: req.file.buffer,
      name,
      authorname,
      price
    });

    res.redirect("/admin/products");

  } catch (err) {
    res.send(err.message);
  }
});


// Show All Products
router.get("/admin/products", async (req, res) => {
  const products = await Product.find();
  res.render("products", { products });
});

module.exports = router;
