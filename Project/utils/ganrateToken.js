       const jwt = require('jsonwebtoken')
 
 const ganrateToken = (user) => {
       
        return jwt.sign({email:user.email,id : user._id },process.env.JWT_KAY,{expiresIn : '2d'})
 }
module.exports = ganrateToken