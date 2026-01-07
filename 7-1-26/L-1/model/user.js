const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/projecauth')
const userSchema = mongoose.Schema({
    username:String,
    email:String,
    age:Number,
     date:{type:Date,default:Date.now},
     post:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }
     ]

})
module.exports = mongoose.model('user',userSchema);