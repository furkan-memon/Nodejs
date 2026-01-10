const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const db = require('./config/mongoose-conection')
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')
const debug = require('debug')('development:server');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine ', 'ejs');
 app.use('/owners', ownersRouter)
 app.use('/users', usersRouter)
 app.use('/products', productsRouter)

 app.listen(3000,(err)=>{
    
    console.log('yooo its done 🎉 your server is running on 3000 posrt');
    
 })
