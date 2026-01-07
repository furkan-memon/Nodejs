const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser');
const userModel = require('./model/user')
const postModel = require('./model/post')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const user = require('./model/user');






app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(cookieParser())



app.get('/',(req,res)=>{
  res.render('index')
})

app.get('/register',(req,res)=>{
  res.render('register')
})
app.post('/register',async (req,res)=>{
  let {email,password,username,age} = req.body
  let user = await userModel.findOne({email});
  if(user) return res.status(500).send("User already ragisterd")
    bcrypt.genSalt(10 ,(err,salt)=>{
  bcrypt.hash(password,salt, async (err,hash)=>{
  let user = await  userModel.create({
      username,
      email,
      age,
      password:hash
    })
let token = jwt.sign({email:email,userid:user._id},"MHA")
    res.cookie('token',token)
    res.redirect("/login")
    
  })
})
  

})
app.get('/login',(req,res)=>{
  res.render('login')
})
app.post('/login', async (req,res)=>{
  let  {email , password} = req.body;
  let user = await userModel.findOne({email});
  if(!user) return res.status(500).send("Invalid Credentials")
  bcrypt.compare(password,user.password,(err,match)=>{
    
    if(!match) return res.status(500).send("Invalid Credentials")
    let token = jwt.sign({email:email,userid:user._id},"MHA")
    res.cookie('token',token)
    res.redirect("/dashboard")
  })
  
})
function authenticateToken(req,res,next){
   const token = req.cookies.token;
     if (!token || token.trim() === "") {
    return res.status(401).redirect("/login");
  }
  try {
    const data = jwt.verify(token, "MHA");
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).send("Invalid or expired token");
  }
}                                                           
app.get('/dashboard',authenticateToken, async(req,res)=>{
  let token = req.user;
  if(!token) return res.send("You must be Loggd in")
  
  let user = await userModel.findOne({_id:token.userid})
  res.render('dashboard',{username:user.username});
  
})
app.get('/logout',(req,res)=>{
  res.clearCookie('token')
  res.redirect('/login')
})
app.listen(3000,()=>{
  console.log("Yoo is Done ")
})