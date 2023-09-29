const express =require('express')
const route=express.Router()

const {GetCartProducts,AddtoCart,DeleteFromCart,UpdateQuantity} = require('../controlers/cart')

route.get('/getcartproducts/:u_id',GetCartProducts)
route.post('/addtocart/:p_id/:u_id',AddtoCart)
route.delete('/deletecart/:id',DeleteFromCart)
route.get('/updateqty/:id/:qty',UpdateQuantity)

module.exports=route