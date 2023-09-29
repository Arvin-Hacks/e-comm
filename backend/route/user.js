const express = require('express')

const route = express.Router()

const {Userlogin,Usersignup,UserList} = require("../controlers/user")


route.post('/userlogin', Userlogin)
route.post('/usersignup',Usersignup)
route.get('/getallusers',UserList)


module.exports= route;