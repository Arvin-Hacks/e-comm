const mongoose=require('mongoose')
require('../db/config')

const NotifySchema= new mongoose.Schema({
    message:String,
    subject:String,
},{
    timestamps:true
})

module.exports= mongoose.model('notifications',NotifySchema)