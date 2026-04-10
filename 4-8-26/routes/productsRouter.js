const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const productModel = require("../model/Product");
router.post("/create", upload.single("image"), async (req, res) => {
  try {const { name, price, discount } = req.body;
  let product = await productModel.create({
    image:req.file.buffer,
    name,
    price,
    discount
  })
  req.flash('success',"Product created")
 
  res.redirect('/owners/admin')
} catch(err){

        res.send(err.message);
  }
});
module.exports = router;
