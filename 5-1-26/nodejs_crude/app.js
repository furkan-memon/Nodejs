const express = require('express');
const app = express();
const port = 3000;
const User = require('./usermodel');    
const userModel = require('./usermodel');


app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get('/create', async (req, res) => {
  const newUser = await userModel.create({
    name : "Fm",
    email:"fm04@gmail.com",
    age : 15
  })
  res.send(newUser)
});

app.get('/read', async (req, res) => {
  const readUser = await userModel.findOne({name:"Fm"})
  res.send(readUser)
});
app.get('/update', async (req, res) => {
  const updatedUser = await userModel.findOneAndUpdate({name:"CodesFm"},{age:19},{new: true})
  res.send(updatedUser)
});
app.get('/delete', async (req, res) => {
  const readUser = await userModel.findOneAndDelete({name:"CodesFm"})
  res.send(readUser)
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});