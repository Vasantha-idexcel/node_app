const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://localhost:27017/node_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

module.exports = {
    mongoose,
    validator
}