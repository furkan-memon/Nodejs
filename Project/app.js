const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const db = require('./config/mongoose-conection')
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')
const debug = require('debug')('development:server');
const path = require('path');
const config = require('config')
const expressSession = require('express-session')
const flash = require('connect-flash')
const indexRouter = require('./routes/index')
require('dotenv').config()
app.use((req, res, next) => {
  console.log('INCOMING:', req.method, req.url);
  next();
});
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({
   resave:false,
   saveUninitialized:false,
   secret:process.env.EXPRESS_SESSION_SECRET
}));
app.use(flash())
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');
 app.use('/', indexRouter)
 app.use('/owners', ownersRouter)
 app.use('/users', usersRouter)
 app.use('/products', productsRouter)


 app.listen(3000,(err)=>{
    
    console.log('yooo its done 🎉 your server is running on 3000 posrt');
    
 })
