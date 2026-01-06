const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/userDB",{
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  imgurl: String
});

module.exports = mongoose.model('User', userSchema);
