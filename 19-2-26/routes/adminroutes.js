const express = require('express')

const router = express.Router()
const user = []
router.get('/deshbord',(req,res)=>{
    res.render('deshbord')
})

router.get('/form',(req,res)=>{
    res.render('form')
})
router.post('/form',(req,res)=>{
  const {fullname,email} = req.body
  user.push({ fullname, email });
console.log(user);

   
  res.redirect('form')
})

router.get('/table',(req,res)=>{
    const users = [
    {name:"John" , email:"john@gmail.com"},
    {name:"Vecter" , email:"Vecter@gmail.com"}
  ]
  res.render('table' , {users})
})


module.exports = router 