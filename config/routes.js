const express = require('express')
const router = express.Router()

const borrowers = require('../controllers/borrowersController')

router.get('/borrowers', borrowers.index)
router.post('/borrowers', borrowers.checkParams, borrowers.create)
router.get('/borrowers/:id', borrowers.getRecord, borrowers.show)
router.patch('/borrowers/:id', [borrowers.getRecord, borrowers.checkParams], borrowers.update)
router.delete('/borrowers/:id', borrowers.getRecord, borrowers.destroy)

module.exports = router