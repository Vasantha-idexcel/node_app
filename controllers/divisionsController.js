const Borrower = require('../models/borrower')

function divisionController() {
    this.json_error = (title, message) => {
        return {
            code: title,
            message: message,
            timeStamp: Date(),
            source: 'Division source'
        }
    }
    this.getBorrower = async(req, res) => {
        try {
            if (req.params.borrower_id.length != 24) {
                throw 'Invalid Object id has been passed!'
            }
            borrower = Borrower.findById(req.params.borrower_id)
            if (!borrower) {
                throw "Unable to fetch borrower with given id!"
            }
            req.borrower = borrower
            next()
        } catch (error) {
            res.status(404).json(this.json_error('Resource Not Found', error))
        }
    }
    this.index = async(req, res) => {
        try {
            query = (req.query === {}) ? {} : req.query;
            console.log(borrower.divisions)

            // data = await borrower.divisions.find(query);
            map = []

            // data.forEach((resource) => {
            //     map.push(resource)
            // })
            res.json(map);
        } catch (error) {
            res.status(400).json(this.json_error('Bad Request', error));
        }
    }
}

module.exports = divisionController