const express = require('express')
const app = express()
const server = require('http').createServer(app)

const cors = require('cors')
const multer = require('multer')
const WebSocket=require('ws')
const wss=new WebSocket.Server({server})
const Admin = require('./models/Admin')
const Product_path = '../frontend/public/product_images'
app.use(express.json(), cors())

const userRouter = require('./route/user')
const productRouter = require('./route/product')
const cartRouter = require('./route/cart')
const notifyRouter=require('./route/notification')
const { sendAdminNotification } = require('./middileware/sendemail')

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


app.use('/user', userRouter)

app.use('/product', productRouter)

app.use('/cart', cartRouter)
app.use('/notify', notifyRouter)



app.post('/sendemail', async (req, resp) => {
    let subject = req.body.subject
    let message = req.body.message
    let result = await sendAdminNotification(subject, message)
    if (result) {
        console.log('test', result)
        resp.send({ result: "email sent" })
    } else {
        resp.send({ result: "error sending email" })
    }
})

wss.on('connection',(ws)=>{
    console.log("client is Connected")
    ws.send('welcome Admin')

    ws.on('massage',(message)=>{
        console.log(`Received : ${message}`)
    })
})


// sendMessage('hello')

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

app.get('/getnotification',async()=>{
})

server.listen(5000, () => {
    console.log("Server is running on port 5000")
})









