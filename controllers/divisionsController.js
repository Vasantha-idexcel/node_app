const ResourceController = require('./resourceController')
const Division = require('../models/division')
const Borrower = require('../models/borrower')

const divisionsController = new ResourceController(
    Division,
    "Division",
    "division", ["division_name", "description", "borrower"]
)

divisionsController.getBorrower = async(req, res, next) => {
    try {
        if (req.params.borrower_id.length != 24) {
            throw 'Invalid Object id has been passed!'
        }
        borrower = await Borrower.findById(req.params.borrower_id)
        if (!borrower) {
            throw "Unable to fetch borrower with given id!"
        }
        divisionsController.parent = {
            borrower: req.params.borrower_id
        }
        Object.assign(req.query, divisionsController.parent)
        next()
    } catch (error) {
        res.status(400).json(divisionsController.json_error('Resource Not Found Request', error))
    }
}

module.exports = divisionsController