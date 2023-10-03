const nodemailer = require('nodemailer')

module.exports.sendAdminNotification = (subject, message) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 'arvindakm246@gmail.com',
            pass: 'eivqucumtjjigybj'
        }
    })
    const mailOption = {
        from: 'arvindakm246@gmail.com',
        to: 'boatgamer0980@gmail.com',
        subject: subject,
        text: message
    }
    transporter.sendMail(mailOption, (error, info) => {
        if (error) {            
            console.error('Error sending email notification:', error);
            return false
        } else {
            console.log('Email notification sent:', info.response);
            return true
        }
    })
}

