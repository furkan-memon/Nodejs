const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Admin = require('../models/admin');
const Product = require('../models/products');

const generateToken = require('../utils/token');
const isLoggedIn = require('../Middleware/islogdin');

const router = express.Router();


router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password)
      return res.status(400).send("All fields are required");

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword
    });

    const token = generateToken(user);
    res.cookie('token', token);

    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});



router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send("Email and password required");

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).send("Invalid credentials");

    const token = generateToken(user);
    res.cookie('token', token);

    res.redirect('/');
  } catch (err) {
    res.status(500).send("Server error");
  }
});


router.get('/', async (req, res) => {
  const product = await Product.find();
  res.render("index", { product });
});



router.get('/adminregister', (req, res) => {
  res.render('adminregister');
});

router.post('/adminregister', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password)
      return res.status(400).send("All fields required");

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).send("Admin already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      fullname,
      email,
      password: hashedPassword
    });

    const token = generateToken(admin);
    res.cookie('token', token);

    res.redirect('/adminlogin');

  } catch (err) {
    res.status(500).send(err.message);
  }
});



router.get('/adminlogin', (req, res) => {
  res.render('adminlogin');
});

router.post('/adminlogin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send("Email and password required");

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(400).send("Invalid credentials");

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return res.status(400).send("Invalid credentials");

    const token = generateToken(admin);
    res.cookie('token', token);

    res.redirect('/upload');

  } catch (err) {
    res.status(500).send("Server error");
  }
});


router.get('/upload', (req, res) => {
  res.render('upload');
});


router.get('/addtocart/:productid', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user)
      return res.redirect('/login');

    const productId = req.params.productid;

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

    await user.save();

    res.redirect('/cart');

  } catch (err) {
    res.status(500).send("Server error");
  }
});



router.get('/cart', isLoggedIn, async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .populate('cart.product');

    res.render('cart', { user });

  } catch (err) {
    res.status(500).send("Server error");
  }
});
router.get('/cart/increase/:productid', isLoggedIn, async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    const item = user.cart.find(
      item => item.product.toString() === req.params.productid
    );

    if (item) {
      item.qty += 1;
      await user.save();
    }

    res.redirect('/cart');

  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get('/cart/decrease/:productid', isLoggedIn, async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    const item = user.cart.find(
      item => item.product.toString() === req.params.productid
    );

    if (item) {
      item.qty -= 1;

      if (item.qty <= 0) {
        user.cart = user.cart.filter(
          i => i.product.toString() !== req.params.productid
        );
      }

      await user.save();
    }

    res.redirect('/cart');

  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get('/cart/remove/:productid', isLoggedIn, async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.redirect('/login');
    }

    const productId = req.params.productid;

    user.cart = user.cart.filter(
      item => item.product.toString() !== productId
    );

    await user.save();

    res.redirect('/cart');

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
module.exports = router;