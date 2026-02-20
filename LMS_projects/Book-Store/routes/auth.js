const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const ganrateToken = require('../utils/token')
const router = express.Router();
const Admin = require('../models/admin')
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword
    });

    // res.status(201).json({
    //   message: "User registered successfully",
    //   user: {
    //     id: newUser._id,
    //     fullname: newUser.fullname,
    //     email: newUser.email
    //   }
    // });
    const token = ganrateToken(newUser)
    res.cookie('token',token)
    res.redirect('/login')

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});
router.post("/login", async (req,res)=>{
  try{
    const {email,password} = req.body
    
  if(!email || !password) {
   return  res.status(400).send('Email and password required')
  }
  const user =  await User.findOne({email})
  if (!user) {
  return res.status(400).send("Invalid credentials");
}
  
    let match = await bcrypt.compare(password,user.password)
    if(match){
       const token = ganrateToken(user);
    res.cookie('token', token);
    res.redirect('/')
     }
     else{
      res.send('error')
     }

  }
  catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
})
router.get('/', (req, res) => {
  res.render('index');
});
router.get('/adminlogin', (req, res) => {
  res.render('adminlogin');
});
router.get('/adminragister', (req, res) => {
  res.render('adminragister');
});


router.post('/adminragister', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
  console.log(req.body);
  
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.find();

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      fullname,
      email,
      password: hashedPassword
    });

    
    const token = ganrateToken(newAdmin)
    res.cookie('token',token)
    res.redirect('/adminlogin')

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/adminlogin', (req, res) => {
  res.render('adminlogin');
});

router.post("/adminlogin", async (req,res)=>{
  try{
    const {email,password} = req.body
    
  if(!email || !password) {
   return  res.status(400).send('Email and password required')
  }
  const admin =  await Admin.findOne({email})
  if (!admin) {
  return res.status(400).send("Invalid credentials");
}
  
    let match = await bcrypt.compare(password,admin.password)
    if(match){
       const token = ganrateToken(admin);
    res.cookie('token', token);
    res.redirect('/upload')
     }
     else{
      res.send('error')
     }

  }
  catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
})
router.get('/upload', (req, res) => {
  res.render('upload');
});
module.exports = router;
