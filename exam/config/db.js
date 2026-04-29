const mongoose=require("mongoose")

const connect=async()=>{
    await mongoose.connect("mongodb://localhost 127.0.0.1::27017")
    console.log("connect");
}

module.exports=connect