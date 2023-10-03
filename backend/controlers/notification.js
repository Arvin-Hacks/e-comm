const Notification = require('../models/Notification')
// const WebSocket=require('ws')
// const admin=new WebSocket('ws://localhost:5000')

module.exports.GetNotifiactions = async (req, resp) => {
    const result = await Notification.find()
    if (result.length > 0) {
        resp.send({ result: result, success: true })
    } else {
        resp.send({ result: "No data", success: false })

    }

}
module.exports.DeleteNotifiaction = async (req, resp) => {
    const result = await Notification.deleteOne({ _id: req.params.id })
    if (result) {
        resp.send({ result: result, success: true })

    } else {
        resp.send({ result: "error", success: false })

    }
}

