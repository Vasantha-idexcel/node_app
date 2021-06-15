const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const sendConfirmationMail = (email, password) => {
    const token = jwt.sign({ email, password }, process.env.JWT_KEY, { expiresIn: '30m' })

    const output = `
        <h2>Please click on the below link to activate your account..</h2>
        <p>http://localhost:${process.env.PORT}/api/v1/activate/${token}</p>
        <p><b>NOTE: </b>The above activation link expires in 30 minutes</p>
        `

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "nodejsappauth@gmail.com",
            pass: "Password@123"
        }
    })

    const mailOptions = {
        from: "'Auth Admin' <nodejsappauth@gmail.com>",
        to: email,
        subject: "Account Verification: NodeApp",
        html: output
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            } else {
                resolve(info)
            }
        })
    })
}

module.exports = sendConfirmationMail