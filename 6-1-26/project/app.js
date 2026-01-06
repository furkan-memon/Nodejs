const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser');
const userModel = require('./model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(cookieParser())



app.get('/',(req,res)=>{
   res.render('index')
})
app.get('/login',(req,res)=>{
   res.render('login')
})
app.get('/register',(req,res)=>{
   res.render('register')
})
app.post('/register',async (req,res)=>{
  const {username,email,password,cpassword} = req.body
  if(cpassword !=password){
    res.send("conform the password")
  }else{
      const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(password, salt);
     let createduser = userModel.create({
         username,
         email,
         password:hash
     })
     console.log(createduser);
     
     
      res.status(201).send("User registered successfully");
  }
    // bcrypt.hash(password,salt, async(err,hash)=>{
    // if(err) throw err;
    // console.log(hash)
    //  })
  })


app.listen(3000,()=>{
    console.log('done');
    
})