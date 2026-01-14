const express = require('express');
const router = express.Router();
const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const {ganretatoken} = require('../utils/ganrateToken')
const {registerUser,loginuser,logoutuser} = require('../controller/authController')
router.get('/',(req,res)=>{
        res.send('yooo  router done ');

})

router.use(cookieParser())
router.post('/register',registerUser);
router.post('/login',loginuser);
router.get('/logout',(req,res)=>{
    res.clearCookie("token");
 return res.redirect('/');
});

     
module.exports = router 