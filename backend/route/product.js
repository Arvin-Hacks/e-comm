const express=require('express')
const route=express.Router()


const { 
    GetProductDetails,
    getAllProducts,
    DeleteProduct,
    UpdateProduct,
    UpdateProductQTY,
    AddProduct,
    FilterProduct,
    CheckproductQuantity
} = require('../controlers/product')

route.get('/getproducts',getAllProducts)
route.get('/getproductdetail/:id',GetProductDetails)
route.post('/addproduct',AddProduct)
route.put('/updateproduct/:id',UpdateProduct)
route.put('/updateproductqty/:id/:qty',UpdateProductQTY)
route.delete('/deleteproduct/:id',DeleteProduct)
route.get('/filterproduct/:filter/:key',FilterProduct)
route.get('/inventorycheck',CheckproductQuantity)

module.exports =route