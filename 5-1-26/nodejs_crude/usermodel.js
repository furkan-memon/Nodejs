const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));
const userScahema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})
module.exports = mongoose.model('User', userScahema);