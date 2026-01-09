const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser');
const userModel = require('./model/user')
const postModel = require('./model/post')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const upload = require("./config/multerconfig");






app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(cookieParser())
const uploadDir = path.join(__dirname, 'public', 'images', 'upload');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir)
//   },
//   filename: function (req, file, cb) {
//     crypto.randomBytes(16, (err, buf) => {
//       const fn = buf.toString('hex') + path.extname(file.originalname); /* path remove the extansin name from the file adn add it in hax file name */
//       cb(null,  fn)
//     })
//   }
// })

// const upload = multer({ storage: storage })


app.get('/', (req, res) => {
  res.render('index')
})

app.get('/profile/upload',authenticateToken,async (req, res) => {
  
  let token = req.user;
  if (!token) return res.send("You must be Loggd in")
  
  let user = await userModel.findOne({ _id: token.userid })
  console.log(user);
  
  res.render('profilepic',
  {
    user: user
  });
})

app.post('/upload',authenticateToken, upload.single('image'), async (req, res) => {
  const file = req.file;
let token = req.user;
 
  let user = await userModel.findOne({ _id: token.userid } )
    user.avatar = file.filename
    await user.save()
    res.redirect("/profile")  
})

app.get('/register', (req, res) => {
  res.render('register')
})
app.post('/register', async (req, res) => {
  let { email, password, username, age } = req.body
  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send("User already ragisterd")
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username,
        email,
        age,
        password: hash
      })
      let token = jwt.sign({ email: email, userid: user._id }, "MHA")
      res.cookie('token', token)
      res.redirect("/login")

    })
  })


})
app.get('/login', (req, res) => {
  res.render('login')
})
app.post('/login', async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("Invalid Credentials")
  bcrypt.compare(password, user.password, (err, match) => {

    if (!match) return res.status(500).send("Invalid Credentials")
    let token = jwt.sign({ email: email, userid: user._id }, "MHA")
    res.cookie('token', token)
    res.redirect("/profile")
  })

})
function authenticateToken(req, res, next) {
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
app.get('/profile', authenticateToken, async (req, res) => {
  let token = req.user;
  if (!token) return res.send("You must be Loggd in")

  let user = await userModel
    .findOne({ _id: token.userid })
    .populate('post')
  res.render('profile',
    {
      user: user
    });


})
app.post('/post', authenticateToken, async (req, res) => {
  let token = req.user;

  let user = await userModel.findOne({ _id: token.userid })
  let { caption, content } = req.body;
  let post = await postModel.create({
    user: user._id,
    content: content,
    caption: caption
  })
  user.post.push(post._id)
  await user.save()
  res.redirect('/profile')
})
app.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.redirect('/login')
})

app.get('/like/:id', authenticateToken, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate('user')
  if (post.likes.indexOf(req.user.userid) === -1) {

    post.likes.push(req.user.userid)
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1)
  }
  await post.save()
  res.redirect('/profile')
})
app.get('/edit/:id', authenticateToken, async (req, res) => {
  let token = req.user;
  let post = await postModel.findOne({ _id: req.params.id }).populate('user')

  if (!token) return res.send("You must be Loggd in")

  let user = await userModel
    .findOne({ _id: token.userid })

  res.render('edit',
    {
      username: user.username, post: post
    });

})
app.post('/edit/update/:id', authenticateToken, async (req, res) => {

  let post = await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content, caption: req.body.caption })

  await post.save()
  let token = req.user;
  if (!token) return res.send("You must be Loggd in")
  res.redirect('/profile')

})
app.listen(3000, () => {
  console.log("Yoo is Done ")
})