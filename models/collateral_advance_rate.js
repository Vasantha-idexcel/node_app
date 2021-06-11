const { mongoose, validator } = require('./mongoose')

const collateralAdvanceRateSchema = {
    collateral_type: {
        type: String,
        required: true,
        trim: true,
        maxLength: 10
    },
    collateral_name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 10
    },
    sublimit: {
        type: Number
    },
    advance: {
        type: Number,
        min: 0,
        max: 100
    }
}

const CollateralAdvanceRate = mongoose.model('CollateralAdvanceRate', collateralAdvanceRateSchema)
module.exports = CollateralAdvanceRate