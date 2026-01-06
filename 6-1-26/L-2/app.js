const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const user = require('./models/user');

app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.get ('/', (req, res) => {
    res.render('index');
});
app.get ('/login', (req, res) => {
    res.render('login');
});
app.post ('/login', async(req, res) => {
    
  let user = await userModel.findOne({email:req.body.email} )
  if(!user){
    return res.send('Somthing is Wrong')
  }
    bcrypt.compare(req.body.password,user.password,(err,match)=>{
        if(err) res.send('Somthing is Wrong')
        if(!match){
            return res.send('Invalid Password')
        }
        else{
             let token =jwt.sign({email:user.email},"shhhh");
             res.cookie('token', token)
res.redirect('/') // only one response

        }
    })
  
});
app.post ('/creat', async (req, res) => {

    const {username, email, password, age} = req.body;
    bcrypt.genSalt(10,async (err,salt) => {
        if(err) throw err;
        bcrypt.hash(password,salt,async (err,hash)=>{
           if(err) throw err;
          
           let createduser = await userModel.create({
               username,
               email,      
               password:hash,
               age
           });
           let token =jwt.sign({email},"shhhh");
              req.cookie('token',token)
              res.redirect('/login');
        })
    })
});
app.get ('/logout', (req, res) => {
    res.cookie('token','');
    res.redirect('/');
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});