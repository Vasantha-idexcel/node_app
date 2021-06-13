const { mongoose, validator } = require('./mongoose')

const collateralAdvanceRateSchema = {
    collateral_name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 10
    },
    source: {
        type: String,
        required: true,
        trim: true,
        enum: ['Receivable', 'Payable', 'Inventory', 'Other Collateral']
    },
    sublimit: {
        type: Number
    },
    advance: {
        type: Number,
        min: 0,
        max: 100
    },
    division: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Division'
    }
}

const CollateralAdvanceRate = mongoose.model('CollateralAdvanceRate', collateralAdvanceRateSchema)
module.exports = CollateralAdvanceRate