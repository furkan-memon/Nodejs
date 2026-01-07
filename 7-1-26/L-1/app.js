const express = require('express')
const app = express()
const userModel = require('./model/user')
const postModel = require('./model/post')

app.get('/',(req,res)=>{
  res.send('✋yooooo!')
})
app.get('/create',async(req,res)=>{
  let user = await userModel.create({
    username:'CodesFm',
    age:19,
    email:'amanmemon@gmail.com'
  })
  res.send(user)
})
app.get('/post/create',async(req,res)=>{
  let post = await postModel.create({
   post:"Yooo✋",
   usre:"CodesFm"
  })
  let user = await userModel.findOne({username:"CodesFm"})
  
  
  user.post.push(post._id)
  user.save()
  res.send(post)
})
app.listen(3000,()=>{
  console.log("Yoo is Done ")
})