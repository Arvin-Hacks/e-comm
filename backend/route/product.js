const express=require('express')
const route=express.Router()


const { GetProductDetails,getAllProducts,DeleteProduct,UpdateProduct,AddProduct,FilterProduct} = require('../controlers/product')

route.get('/getproducts',getAllProducts)
route.get('/getproductdetail/:id',GetProductDetails)
route.post('/addproduct',AddProduct)
route.put('/updateproduct/:id',UpdateProduct)
route.delete('/updateproduct/:id',DeleteProduct)
route.get('/filterproduct/:filter/:key',FilterProduct)

module.exports =route