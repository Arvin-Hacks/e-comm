const mongoose=require('mongoose')
require('../db/config')
const ProductSchema= new mongoose.Schema({
    title:String,
    category:String,
    description:String,
    price:Number,
    quantity:Number,
    image:String
},{
    timestamps:true
})

module.exports= mongoose.model('products',ProductSchema)