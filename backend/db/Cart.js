const mongoose=require('mongoose')
require('./config')
const CartSchema= new mongoose.Schema({
    product_id:String,
    user_id:String,
    product_id:String,
},{
    timestamps:true
})

module.exports= mongoose.model('carts',CartSchema)