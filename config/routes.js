const express = require('express')
const router = express.Router()

const borrowers = require('../controllers/borrowersController')
const divisions = require('../controllers/divisionsController')

router.get('/borrowers', borrowers.index)
router.post('/borrowers', borrowers.checkParams, borrowers.create)
router.get('/borrowers/:id', borrowers.getRecord, borrowers.show)
router.patch('/borrowers/:id', [borrowers.getRecord, borrowers.checkParams], borrowers.update)
router.delete('/borrowers/:id', borrowers.getRecord, borrowers.destroy)

router.all('/borrowers/:borrower_id/*', divisions.getBorrower)
router.get('/borrowers/:borrower_id/divisions', divisions.index)
router.post('/borrowers/:borrower_id/divisions', divisions.checkParams, divisions.create)

module.exports = router