const mongoose=require("mongoose")
const userschema=mongoose.Schema({
    username:String,
    password:String,
    role:{type: String,
        enum: ["user", "admin"],
        default: "user"},
})

const user=mongoose.model("pdhhud",userschema)
module.exports=user;