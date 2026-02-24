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
router.get('/edit/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render('edit', { product });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post('/update/:id', upload.single('image'), async (req, res) => {
  try {

    const { name, authorname, price } = req.body;

    const updateData = { name, authorname, price };

    if (req.file) {
      updateData.image = req.file.buffer;
    }

    await Product.findByIdAndUpdate(req.params.id, updateData);

    res.redirect('/admin/product');

  } catch (err) {
    res.status(500).send("Server error");
  }
});
router.get('/delete/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/product');
});
module.exports = router;
