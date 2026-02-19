const express = require('express')
const adminroutes = require('./routes/adminroutes')
const app = express()
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path:'./.env'
})
const port = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.set('views' , path.resolve('views'))

app.use('/admin',adminroutes)
app.listen(port , () => {
  console.log(`server start on port ${port}`);
  
})