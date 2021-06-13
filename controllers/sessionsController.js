const User = require("../models/user")
const params = require('params')
const bcrypt = require('bcryptjs')
const json_error = require('../config/utils')
const jwt = require("jsonwebtoken")

const sessionsController = {
    checkParams: (req, res, next) => {
        try {
            data = params(req.body).require('user')
            data = params(data['user']).only('email', 'password')
            req.bodyContent = data
            next()
        } catch (error) {
            res.status(400).json(json_error('Bad Request', 'Missing params - user'))
        }
    },
    create: async(req, res) => {
        try {
            user = await User.findOne({ email: req.bodyContent.email })
            if (!user) {
                throw new Error()
            }
            isMatch = await bcrypt.compare(req.bodyContent.password, user.password)
            if (isMatch) {
                token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1 hour" })
                user["token"] = token
                await user.save()
                res.json({ token })
            } else {
                throw new Error()
            }
        } catch (error) {
            res.status(401).json(json_error('Authentication Failed', "Invalid Login Credentials"))
        }
    }
}

module.exports = sessionsController