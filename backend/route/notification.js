const express=require('express')
const route=express.Router()

const {GetNotifiactions,DeleteNotifiaction}= require('../controlers/notification')

route.get('/getnotifications',GetNotifiactions)
route.delete('/deletenotification/:id',DeleteNotifiaction)

module.exports=route