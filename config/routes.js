const express = require('express')
const router = express.Router()
const resources = require('./resources')

const borrowers = require('../controllers/borrowersController')
const divisions = require('../controllers/divisionsController')
const collaterals = require('../controllers/collateralAdvanceRatesController')

resources(router, borrowers, "borrowers")
router.all('/borrowers/:borrower_id/*', divisions.getBorrower)
resources(router, divisions, "divisions", "/borrowers/:borrower_id/")
router.all('/borrowers/:borrower_id/divisions/:division_id/*', [collaterals.getBorrower, collaterals.getDivision])
resources(router, collaterals, "collaterals", "/borrowers/:borrower_id/divisions/:division_id/")

module.exports = router