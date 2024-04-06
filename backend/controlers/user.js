const User = require('../models/user')
const bcrypt = require('bcrypt')
const { sendAdminmessage } = require('../socketmanager')
async function hashPassword(plainPassword) {
    try {
        const saltRounds = 10;
        const hash = await new Promise((resolve, reject) => {
            bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hashedPassword);
                }
            });
        });
        return hash;
    } catch (error) {
        throw error;
    }
}
async function comparePassword(loginPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(loginPassword, hashedPassword);
        return match;
    } catch (error) {
        throw error;
    }
}

module.exports.Userlogin = async (req, resp) => {

    try {
        // resp.send({result:a})
        console.log('body', req.body)
        let result = await User.findOne({ email: req.body.email })
        // resp.send(result)
        console.log('resssssss', result)
        if (result) {
            let pass = await comparePassword(req.body.password, result.password)
            console.log('pass', pass)

            if (pass) {
                // sendAdminmessage(`Welcome back admin`)
                console.log('passssed', pass)

                return resp.send({ result: result, success: true })
            } else {
                console.log('passssed 2', pass)

                return resp.send({ result: 'Invalid password', success: false })
            }
        } else {
            console.log('passssed 3', )

            return resp.send({ result: 'User Not Found', success: false })
        }
    } catch (error) {
        return resp.send({ result: 'User Not Foundd', success: false })
    }
}

module.exports.Usersignup = async (req, resp) => {
    let pass = req.body.password
    pass = await hashPassword(pass)
    console.log('passs', pass)

    // resp.send({'testing':req.body})
    const data = new User({ ...req.body, password: pass })
    const result = await data.save()
    console.log('resilttt', result)
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