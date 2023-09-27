const express = require('express')

const route = express.Router()

const {
    Userlogin
} = require("../controlers/user")


route.post('/ulogin', Userlogin
)


