const mongoose=require('mongoose')
require('../db/config')
const UserSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
},{
    timestamps:true
})

module.exports= mongoose.model('users',UserSchema)