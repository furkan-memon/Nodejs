const express = require("express");
const app = express();
const path = require('path')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.set('viwe engine','ejs')
app.get('/',function(req,res) {
   
    res.render('index.ejs')
})
app.get('/',function(req,res) {
   
    res.render('index.ejs')
})
app.get('/profile/:username',function(req,res) {
   
    res.send(`Hello Mr.${req.params.username}`)
})
app.listen(7809,()=>{
 console.log("hellooooooo")
})

