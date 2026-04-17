import mongoose from "mongoose";

const adminPanelSchema = new mongoose.Schema({
  firstname:{
    type:String
  },
  lastname:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  mobileno:{
    type:String
  },
  profileImage:{
    type:String
  }
} , {timestamps:true})

export const Admin = mongoose.model("admin" , adminPanelSchema)