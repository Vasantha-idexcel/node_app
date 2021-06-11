const { mongoose, validator } = require('./mongoose')
const collateralAdvanceRateSchema = require('./collateral_advance_rate')

const divisionSchema = mongoose.Schema({
    division_name: {
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
    collaterals: [{
        collateralAdvanceRateSchema
    }]
})

module.exports = divisionSchema