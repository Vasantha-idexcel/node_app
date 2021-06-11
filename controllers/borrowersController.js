const ResourceController = require('./resourceController')
const Borrower = require('../models/borrower')

const borrowersController = new ResourceController(
    Borrower,
    "Borrower",
    "borrower", ["client_name", "client_number", "email"]
)

module.exports = borrowersController