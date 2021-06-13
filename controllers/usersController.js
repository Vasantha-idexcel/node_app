const User = require("../models/user")
const params = require('params')
const json_error = require('../config/utils')

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
    create: async(req, res) => {
        try {
            user = await User.findOne({ email: req.body.user.email })
            if (user) {
                throw new Error("Email already exists")
            }
            newUser = await new User(req.bodyContent)
            newUser = await newUser.save()
            res.status(201).json(newUser)
        } catch (error) {
            res.status(400).json(json_error('Bad Request', error.message))
        }
    }
}

module.exports = usersController