const User = require("../models/user")
const params = require('params')
const decoder = require('jwt-decode')
const json_error = require('../config/utils')
const sendConfirmationMail = require("../emails/send_confirmation")

const usersController = {
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
    signup: async(req, res) => {
        try {
            user = await User.findOne({ email: req.bodyContent.email })
            if (user) {
                throw "Email already exists"
            }
            data = await sendConfirmationMail(req.bodyContent.email, req.bodyContent.password)
            res.json({
                message: "Please activate your account with the confirmation mail sent to you email."
            })
        } catch (error) {
            res.status(400).json(json_error('Bad Request', error))
        }
    },
    create: async(req, res) => {
        try {
            user = decoder(req.params.token)
            oldUser = await User.findOne({ email: user.email })
            if (oldUser) {
                throw "Account already exists!"
            }
            newUser = new User({
                email: user.email,
                password: user.password
            })
            newUser = await newUser.save()
            res.status(201).json(newUser)
        } catch (error) {
            res.status(400).json(json_error('Bad Request', error))
        }
    }
}

module.exports = usersController