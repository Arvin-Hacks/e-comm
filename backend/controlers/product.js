const Product = require('../models/Product')


module.exports.getAllProducts = async (req, resp) => {
    const result = await Product.find()
    resp.send({ result: result, success: true })
}
module.exports.GetProductDetails = async (req, resp) => {
    const data = await Product.findById(req.params.id)
    if (data) {
        resp.send({ result: data, success: true })
    } else {
        resp.send({ result: 'no data', success: false })

    }
}
module.exports.AddProduct = async (req, resp) => {
    const temp = req.body
    temp.image = image
    let data = new Product(temp)

    const result = await data.save()
    if (result) {
        resp.send({ result: result, success: true })
    } else {
        resp.send({ result: "Something went wrong", success: true })
    }
}

module.exports.UpdateProduct = async (req, resp) => {
    const result = await Product.updateOne({ _id: req.params.id }, { $set: req.body })
    if (result) {
        resp.send({ result: result, success: true })
    } else {
        resp.send({ result: "Something went wrong", success: false })
    }
}

module.exports.DeleteProduct = async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    if (result.deletedCount > 0) {
        resp.send({ result: result, success: true })
    } else {
        resp.send({ result: "something went wrong", success: false })
    }
}

module.exports.FilterProduct = async (req, resp) => {
    let key = req.params.key
    let filter = req.params.filter
    try {
        if (filter === 'category') {
            let data = await Product.find({ category: key })
            resp.send({ result: data, success: true })
        } else if (filter === 'search') {
            let data = await Product.find({
                "$or":
                    [
                        { title: { $regex: key, $options: "i" } },
                        { description: { $regex: key, $options: "i" } },
                        { category: { $regex: key, $options: "i" } }
                    ]
            })
            resp.send({ result: data, success: true })
        }else if(filter==="price"){
            let data = await Product.find().sort({price:parseInt(key)})
            resp.send({ result: data, success: true })
        }
    } catch (error) {
        resp.send({ result: 'no data', success: false })
    }
}

