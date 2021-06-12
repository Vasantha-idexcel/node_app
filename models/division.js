const { mongoose, validator } = require('./mongoose')

const divisionSchema = mongoose.Schema({
    division_name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
    },
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Borrower'
    }
})

const Division = mongoose.model('Division', divisionSchema)
module.exports = Division