const mongoose=require('mongoose')
require('../db/config')

const AdminSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
},{
    timestamps:true
})

module.exports= mongoose.model('admins',AdminSchema)