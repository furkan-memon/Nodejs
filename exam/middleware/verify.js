let jwt=require('jsonwebtoken')
const cookie=require("cookie-parser")


const verify=(req,res,next)=>{
    let {token}=req.cookies
   
    if(token){
        let decode=jwt.verify(token,"gius")
        if(decode){
            req.user=decode
            next()
        }
        else{
            res.send({msg:"login...."})
        }
    }else{
        res.send({msg:"login or signup...."})
    }
}



module.exports=verify