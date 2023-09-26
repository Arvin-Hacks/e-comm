const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')

const Product = require('./db/Product')
const Admin = require('./db/Admin')
const User = require('./db/user')
const Cart = require('./db/Cart')
const Product_path = '../frontend/public/product_images'
app.use(express.json(), cors())


const fileupload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, Product_path)
        },
        filename: function (req, file, cb) {
            let filenamee = file.fieldname + "-" + Date.now() + '.' + file.mimetype.split('/').pop();
            cb(null, filenamee)
        }
    })
})

app.get('/', async (req, resp) => {
    const result = await Product.find()
    resp.send({ result: result, success: true })
})
app.post('/admin', async (req, resp) => {
    // const data = new Admin({ name: "John", email: "john@test.com", password: "john@123" })
    // const result = await data.save()
    // if(result){
    //     resp.send(result)

    // }else{
    //     resp.send('errror')
    // }
})

app.post('/adminlogin', async (req, resp) => {
    console.log('body', req.body)
    let result = await Admin.find({ $and: [{ email: req.body.email }, { password: req.body.password }] }).select('email name -_id')
    console.log(result)
    if (result.length > 0) {
        resp.send({ result: result[0], success: true })
    } else {
        resp.send({ result: 'Admin Not Found', success: false })
    }
})
app.post('/userlogin', async (req, resp) => {
    console.log('body', req.body)
    let result = await User.find({ $and: [{ email: req.body.email }, { password: req.body.password }] }).select('name email _id')
    console.log(result)
    if (result.length > 0) {
        resp.send({ result: result[0], success: true })
    } else {
        resp.send({ result: 'User Not Found', success: false })
    }
})
app.post('/usersignup', async (req, resp) => {
    const data = new User(req.body)
    const result = await data.save()
    if (result) {
        resp.send({ result: result, success: true })
    } else {
        resp.send({ result: 'signup error', success: false })
    }
})

// Product APIs
app.post('/upload', fileupload.single('product'), async (req, resp) => {
    console.log('body', req.body)
    if (!req.file) {
        return resp.status(400).send({ result: 'No file uploaded.', success: false });
    }
    console.log('file details', req.file)
    resp.status(200).send({ result: 'File uploaded successfully.', success: true });
    image = req.file.filename
    //   console.log('name',image)
})
app.post('/addproduct', async (req, resp) => {
    // let image=req.file.fieldname
    // console.log('imaage name',image)
    const temp = req.body
    temp.image = image
    let data = new Product(temp)

    const result = await data.save()
    if (result) {
        resp.send({ result: result, success: true })
    } else {
        resp.send({ result: "Something went wrong", success: true })
    }
})

app.get('/getproductdetails/:id', async (req, resp) => {
    const data = await Product.findById(req.params.id)
    if (data) {
        resp.send({ result: data, success: true })
    } else {
        resp.send({ result: 'no data', success: false })

    }
})

app.put('/updateproduct/:id', async (req, resp) => {
    const result = await Product.updateOne({ _id: req.params.id }, { $set: req.body })
    if (result) {
        resp.send({ result: result, success: true })
    } else {
        resp.send({ result: "Something went wrong", success: false })
    }
})

// Cart APIs
app.get('/getcartproduct/:u_id', async (req, resp) => {
    // const data = await Cart.find({ user_id: req.params.u_id })

    const data = await Cart.aggregate([
        {
            $match:
                { user_id: req.params.u_id }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'product_id',
                foreignField: '_id',
                as: 'product'
            }
        }])

    if (data) {
        resp.send({ result: data, success: true })
    } else {
        resp.send({ result: "NO data found", success: false })
    }
})
app.get('/addtocart/:p_id/:u_id', async (req, resp) => {
    const data = new Cart({ product_id: req.params.p_id, user_id: req.params.u_id, quantity: 1 })
    const result = await data.save()
    if (result) {
        resp.send({ result: result, success: true })
    } else {
        resp.send({ result: "something went wrong", success: false })
    }
})

app.delete('/deletecart/:p_id/:u_id', async (req, resp) => {
    const result = await Cart.deleteOne({ $and: [{ product_id: req.params.p_id }, { user_id: req.params.u_id }] })
    if (result.deletedCount > 0) {
        resp.send({ result: result, success: true })
    } else {
        resp.send({ result: "something went wrong", success: false })
    }
})

app.get('/updateqty/:id/:qty', async (req, resp) => {
    let qty = req.params.qty

    let data = await Cart.updateOne({ _id: req.params.id }, { $set: { quantity: qty } })
    if (data) {
        resp.send({ result: data, success: true })
    } else {
        resp.send({ result: 'error', success: false })
    }
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})


