const User = require('../models/user')

module.exports.Userlogin = async (req, resp) => {
    try {
        // console.log('body', req.body)
        let result = await User.find({ $and: [{ email: req.body.email }, { password: req.body.password }] }).select('name email _id')
        console.log(result)
        if (result.length > 0) {
            resp.send({ result: result[0], success: true })
        }else{
            resp.send({ result: 'User Not Found', success: false })
        }
    } catch (error) {
        resp.send({ result: 'User Not Found', success: false })
    }
}

module.exports.Usersignup = async (req, resp) => {
    const data = new User(req.body)
    const result = await data.save()
    if (result) {
        resp.send({ result: result, success: true })
    } else {
        resp.send({ result: 'signup error', success: false })
    }
}
module.exports.UserList = async (req, resp) => {
    const result = await User.find()
    // resp.send({ result: data, success: true })

    if (result) {
        resp.send({ result: result, success: true })
    } else {
        resp.send({ result: ' error', success: false })
    }
}