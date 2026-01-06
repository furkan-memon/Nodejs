const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser');
const userModel = require('./model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(cookieParser())



app.get('/', (req, res) => {
  let email = req.cookies.email
  if (!email) { res.redirect('/login') }
  const decoded = jwt.verify(email, 'email');

  res.render('index', { email: decoded.email })

})
app.get('/login', (req, res) => {

  res.render('login')

})
app.get('/relogin', (req, res) => {
  let email = req.cookies.email
  if (!email) { res.redirect('/login') }
  const decoded = jwt.verify(email, 'email');

  res.render('relogin', { email: decoded.email })
})
app.post('/relogin', async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email })


  if (!user) {
    return res.send('Somthing is Wrong')
  }
  bcrypt.compare(req.body.password, user.password, (err, match) => {
    if (err) res.send('Somthing is Wrong')
    if (!match) {
      res.send("incorrect email or password")
    } else {
      let token = jwt.sign({ username: user.username }, "username");
        let emailtoken = jwt.sign({ email: user.email }, 'email');

      res.cookie('token', token)
      res.cookie('email', emailtoken)
    

      res.redirect('dashboard');
    }
  })
})
app.get('/updetpass', (req, res) => {
  res.render('updetpass')
})
app.post('/updetpass', async (req, res) => {
  const { email, password, newpass, conpass } = req.body
  let user = await userModel.findOne({ email })
  bcrypt.compare(password, user.password, async (err, match) => {
    if (!match) {
      res.send('incorrexct password')
    } else {
      const hashedPassword = await bcrypt.hash(newpass, 10)
      if (newpass !== conpass) {
        res.send('password not match')
      } else {
        let newpassword = await userModel.findOneAndUpdate({ email }, { password: hashedPassword })
        res.redirect('/login')
      }

    }

  })

})
app.get('/register', (req, res) => {
  res.render('register')
})
app.post('/register', async (req, res) => {
  const { username, email, password, cpassword } = req.body
  if (cpassword != password) {
    res.send("conform the password")
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    let createduser = userModel.create({
      username,
      email,
      password: hash
    })
    let emailtoken = jwt.sign({ email }, 'email');


    res.cookie('email', emailtoken)
    res.redirect('/login');

  }

})

app.post('/login', async (req, res) => {

  let user = await userModel.findOne({ email: req.body.email })


  if (!user) {
    return res.send('Somthing is Wrong')
  }
  bcrypt.compare(req.body.password, user.password, (err, match) => {
    if (err) res.send('Somthing is Wrong')
    if (!match) {
      res.send("incorrect email or password")
    } else {
      let token = jwt.sign({ username: user.username }, "username");
      let emailtoken = jwt.sign({ email: user.email }, 'email');

      res.cookie('token', token)
      res.cookie('email', emailtoken)
      res.redirect('dashboard');
    }
  })
  
})

app.get('/dashboard', (req, res) => {
  let token = req.cookies.token
  if (!token) redirect('/login')

  const decoded = jwt.verify(token, 'username');

  res.render('dashboard', { username: decoded.username })


})
app.get('/logout', (req, res) => {

  res.redirect('/');
});
app.listen(3000, () => {
  console.log('done');

})
