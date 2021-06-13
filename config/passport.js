const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')
const decoder = require('jwt-decode')
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

const strategy = new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.id).then(user => {
        if (user && (decoder(user.token).iat === payload.iat)) {
            return done(null, true)
        }
        return done(null, false)
    }).catch(error => {
        return done(error, false)
    })
})

module.exports = passport => {
    passport.use(strategy)
}