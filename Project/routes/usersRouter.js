const express = require('express');
const router = express.Router();
const userModel = require('../model/user')
const userRegisterSchema = require('../validators/user.validator');

router.get('/',(req,res)=>{
    res.send('yooo  router done ');
    
})

router.post('/register', async (req, res) => {
  try {
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { fullname, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
if (existingUser) {
  return res.status(409).send('Email already registered');
}
    const createdUser = await userModel.create({
      fullname,
      email,
      password
    });

    res.status(201).json(createdUser);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
     
module.exports = router 