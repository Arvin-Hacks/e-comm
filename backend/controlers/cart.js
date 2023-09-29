const Cart = require('../models/Cart')

module.exports.GetCartProducts = async (req, resp) => {
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
}
module.exports.AddtoCart = async (req, resp) => {
    const data = new Cart({ product_id: req.params.p_id, user_id: req.params.u_id, quantity: 1 })
    const result = await data.save()
    if (result) {
        resp.send({ result: result, success: true })
    } else {
        resp.send({ result: "something went wrong", success: false })
    }
}
module.exports.DeleteFromCart = async (req, resp) => {
    const result = await Cart.deleteOne({ _id: req.params.id })
    if (result.deletedCount > 0) {
        resp.send({ result: result, success: true })
    } else {
        resp.send({ result: "something went wrong", success: false })
    }
}
module.exports.UpdateQuantity = async (req, resp) => {
    let qty = req.params.qty

    let data = await Cart.updateOne({ _id: req.params.id }, { $set: { quantity: qty } })
    if (data) {
        resp.send({ result: data, success: true })
    } else {
        resp.send({ result: 'error', success: false })
    }

}