const mongoose=require('mongoose')
require('../db/config')

const CartSchema= new mongoose.Schema({
    product_id:mongoose.Schema.Types.ObjectId,
    user_id:String,
    quantity:Number
},{
    timestamps:true
})

module.exports= mongoose.model('carts',CartSchema)