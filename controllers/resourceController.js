const params = require('params');

function resourceController(Resource, resourceName, paramsName, paramsArray) {
    this.Resource = Resource
    this.resourceName = resourceName
    this.paramsName = paramsName || ''
    this.paramsArray = paramsArray || []
    this.json_error = (title, message) => {
        return {
            code: title,
            message: message,
            timeStamp: Date(),
            source: this.resourceName + ' source'
        }
    }
    this.checkParams = (req, res, next) => {
        try {
            data = params(req.body).require(this.paramsName)
            data = params(data[this.paramsName]).only(this.paramsArray)
            next()
        } catch (error) {
            res.status(400).json(this.json_error('Bad Request', 'Missing params - ${this.paramsName}'))
        }
    }
    this.getRecord = async(req, res, next) => {
        try {
            if (req.params.id.length != 24) {
                throw 'Invalid Object id has been passed!'
            }
            record = await this.Resource.findById(req.params.id)
            if (!record) {
                throw 'Unable to fetch ${this.paramsName} with given id!'
            }
            req.resourceContent = record
            next()
        } catch (error) {
            res.status(404).json(this.json_error('Resource Not Found', error))
        }
    }
    this.index = async(req, res) => {
        try {
            query = (req.query === {}) ? {} : req.query;
            data = await this.Resource.find({});
            map = []
            data.forEach((resource) => {
                map.push(resource)
            })
            res.json(map);
        } catch (error) {
            res.status(400).json(this.json_error('Bad Request', error));
        }
    }
    this.create = async(req, res) => {
        try {
            resource = new this.Resource(req.bodyContent);
            resource = await resource.save();
            res.status(201).json(resource);
        } catch (error) {
            res.status(400).json(this.json_error('Bad Request', error));
        }
    }
    this.show = async(req, res) => {
        res.json(req.resourceContent)
    }
    this.update = async(req, res) => {
        try {
            record = req.resourceContent
            Object.keys(req.bodyContent).forEach(item => {
                record[item] = req.bodyContent[item]
            })
            data = await record.save()
            res.status(200).json(record)
        } catch (error) {
            res.status(400).json(this.json_error('Bad Request', error.message))
        }
    }
    this.destroy = async(req, res) => {
        record = req.resourceContent
        try {
            record = await this.Resource.findByIdAndDelete(req.params.id)
            res.json({
                message: 'Record successfully deleted!'
            })
        } catch (error) {
            res.status(400).json(this.json_error('Bad Request', error))
        }
    }
}

module.exports = resourceController