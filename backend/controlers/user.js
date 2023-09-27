const User = require('../models/user')

module.exports.Userlogin = async (req, resp) => {
    try {
        // console.log('body', req.body)
        let result = await User.find({ $and: [{ email: req.body.email }, { password: req.body.password }] }).select('name email _id')
        console.log(result)
        if (result.length > 0) {
            resp.send({ result: result[0], success: true })
        }
    } catch (error) {
        resp.send({ result: 'User Not Found', success: false })
    }
}