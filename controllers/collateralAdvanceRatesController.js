const ResourceController = require('./resourceController')
const Borrower = require('../models/borrower')
const CollateralAdvanceRate = require('../models/collateral_advance_rate')

const collateralAdvanceRatesController = new ResourceController(
    CollateralAdvanceRate,
    "CollateralAdvanceRate",
    "collateral_advance_rate", ["collateral_name", "sublimit", "advance", "collateral"]
)

collateralAdvanceRatesController.getBorrower = async(req, res, next) => {
    try {
        if (req.params.borrower_id.length != 24) {
            throw 'Invalid Object id has been passed!'
        }
        borrower = await Borrower.findById(req.params.borrower_id)
        if (!borrower) {
            throw "Unable to fetch borrower with given id!"
        }
        collateralAdvanceRatesController.parent = {
            borrower: req.params.borrower_id
        }
        Object.assign(req.query, collateralAdvanceRatesController.parent)
        next()
    } catch (error) {
        res.status(400).json(collateralAdvanceRatesController.json_error('Resource Not Found Request', error))
    }
}

module.exports = collateralAdvanceRatesController