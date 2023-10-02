const express = require('express')
const bcrypt=require('bcrypt')

// let pass='abc123'
// bcrypt.hash(pass,15,(err,hash)=>{
//     console.warn('hashed password',hash)
// })

const route = express.Router()

const {Userlogin,Usersignup,UserList} = require("../controlers/user")


route.post('/userlogin', Userlogin)
route.post('/usersignup',Usersignup)
route.get('/getallusers',UserList)


module.exports= route;