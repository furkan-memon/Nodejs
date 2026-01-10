const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
 image:String,
 name:String,
 price:Number,
 discount: {
    type:Number,
    default:0
 }
 
})
module.exports = mongoose.model('product',ProductSchema);
