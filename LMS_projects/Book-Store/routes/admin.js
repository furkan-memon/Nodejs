const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const Product = require("../models/products");


// Show Upload Page
router.get("/upload", (req, res) => {
  res.render("upload");
});


// Handle Upload
router.post("/upload", upload.single("image"), async (req, res) => {
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

    res.redirect("/admin/product");

  } catch (err) {
    res.send(err.message);
  }
});


router.get("/product", async (req, res) => {
  const product = await Product.find();
  res.render("product", { product });
});

module.exports = router;
