const { mongoose, validator } = require('./mongoose')
const collateralAdvanceRateSchema = require('./collateral_advance_rate')

const divisionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
    },
    collateral_advance_rates: [{
        collateralAdvanceRateSchema
    }]
})

const Division = mongoose.model('Division', divisionSchema)
module.exports = Division