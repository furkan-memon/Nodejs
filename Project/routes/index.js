const express = require("express");
const router = express.Router();
const isloggedin = require("../middleware/islogdin");
const productModel = require('../model/Product')
const userModel = require('../model/user');
const user = require("../model/user");
const { route } = require("./usersRouter");
router.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index", { error ,loggedin:false});
});
router.get("/login", function (req, res) {
    let error = req.flash("error");
    res.render("login", { error ,loggedin:false });
});
router.get("/shop", isloggedin, async (req, res) =>{
    let products = await productModel.find()
    
    res.render("shop", {products});
}); 

router.get('/addtocart/:productid', isloggedin, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) return res.status(404).send('User not found');

    const productId = req.params.productid;

    // find product in cart
    const cartItem = user.cart.find(
      item => item.product.toString() === productId
    );

    if (cartItem) {
      cartItem.qty += 1;
    } else {
      user.cart.push({
        product: productId,
        qty: 1
      });
    }

    await user.save(); // ✅ IMPORTANT

    req.flash('success', 'Product added to cart');
    res.redirect('/shop');

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/cart', isloggedin, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate('cart.product'); // ✅ correct path

  console.log(user.cart);
  res.render('cart', { cart: user.cart });
});
router.get('/decrease/:id',isloggedin,async(req,res)=>{
    const user = await userModel.findOne({ email: req.user.email });
    const productId = req.params.id;
 const cartItem = user.cart.find(
      item => item.product.toString() === productId
    );
if (cartItem.qty >-1) {
      cartItem.qty -= 1;
    }
    if (cartItem.qty == 0) {
     user.cart.findOneAndDelete(
      item => item.product.toString() === productId
    );
    }
    await user.save();
    res.redirect('/cart') 
})
router.get('/increaseQty/:id',isloggedin,async(req,res)=>{
    const user = await userModel.findOne({ email: req.user.email });
    const productId = req.params.id;
 const cartItem = user.cart.find(
      item => item.product.toString() === productId
    );
if (cartItem.qty ) {
      cartItem.qty += 1;
    }
    await user.save();
    res.redirect('/cart') 
})
module.exports = router;