const express = require('express')
const router = express.Router()
const resources = require('./resources')
const passport = require('passport')

const users = require('../controllers/usersController')
const sessions = require('../controllers/sessionsController')
const borrowers = require('../controllers/borrowersController')
const divisions = require('../controllers/divisionsController')
const collaterals = require('../controllers/collateralAdvanceRatesController')
const json_error = require('./utils')

router.post('/signup', users.checkParams, users.create)
router.post('/login', sessions.checkParams, sessions.create)

router.all('*', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || user === false) {
            res.status(403).json(json_error('Authorization Failed', "User not authenticated"))
        } else {
            next()
        }
    })(req, res, next)
})

resources(router, borrowers, "borrowers")
router.all('/borrowers/:borrower_id/*', divisions.getBorrower)
resources(router, divisions, "divisions", "/borrowers/:borrower_id/")
router.all('/borrowers/:borrower_id/divisions/:division_id/*', [collaterals.getBorrower, collaterals.getDivision])
resources(router, collaterals, "collaterals", "/borrowers/:borrower_id/divisions/:division_id/")

module.exports = router