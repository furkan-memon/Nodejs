
const bcrypt = require('bcrypt')
const ganrateToken = require('../utils/ganrateToken')
const userModel = require('../model/user')
const userRegisterSchema = require('../validators/user.validator'); // new

const registerUser = async (req,res) =>{
    try {
        const { error } =  userRegisterSchema.validate(req.body);
        if (error)    return res.status(400).send(error.details[0].message);
        
        const { fullname, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
    
    if (existingUser) {
      return res.status(401).send('Email already registered');
    }

    const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);

const user = await userModel.create({
  fullname,
  email,
  password: hash
});

const token = ganrateToken(user);

res.cookie('token', token);
res.redirect('/shop');
    
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }

}
const loginuser = async (req,res) => {
  try{
  const {email,password} = req.body
  if (!email || !password) {
      return res.status(400).send('Email and password required');
    }
  let user = await userModel.findOne({email})
  if(user)
    {
     let match = await bcrypt.compare(password,user.password )
     if(match){
       const token = ganrateToken(user);
    res.cookie('token', token);
    res.redirect('/shop')
     }
     else{
      res.send('error')
     }
    }
  }
     catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
  
}
const logoutuser = (req , res) =>{
req.clearCookie("token");
res.redirect('/');
}

module.exports.registerUser = registerUser
module.exports.loginuser = loginuser
module.exports.logoutuser = logoutuser
