const params = require('params');

function borrowerSubController() {
    this.json_error = (title, message) => {
        return {
            code: title,
            message: message,
            timeStamp: Date(),
            source: 'Division source'
        }
    }
    this.getBorrower = async(req, res, next) => {
        try {
            if (req.params.borrower_id.length != 24) {
                throw 'Invalid Object id has been passed!'
            }
            borrower = await Borrower.findById(req.params.borrower_id)
            if (!borrower) {
                throw 'Unable to fetch a borrower with given id!'
            }
            req.borrower = borrower
            next()
        } catch (error) {
            res.status(404).json(this.json_error('Resource Not Found', error))
        }
    }
    this.checkParams = (req, res, next) => {
        try {
            data = params(req.body).require('division')
            data = params(data['division']).only('division_name', 'description')
            req.bodyContent = data
            next()
        } catch (error) {
            res.status(400).json(this.json_error('Bad Request', "Missing params - division"))
        }
    }
    this.index = async(req, res) => {
        try {
            query = (req.query === {}) ? {} : req.query;
            res.json(borrower.divisions)
        } catch (error) {
            res.status(400).json(this.json_error('Bad Request', error));
        }
    }
}

module.exports = borrowerSubController