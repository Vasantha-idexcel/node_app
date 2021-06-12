const { mongoose, validator } = require('./mongoose')

const borrowerSchema = mongoose.Schema({
    client_name: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        unique: true
    },
    client_number: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email provided')
            }
        }
    }
})

borrowerSchema.pre('save', async function(next) {
    const borrower = this
    if (borrower.isModified('client_name')) {
        borrower.client_name = borrower.client_name.toUpperCase()
    }
    if (borrower.isModified('client_number')) {
        borrower.client_number = borrower.client_name.toUpperCase()
    }
    next()
})

const Borrower = mongoose.model('Borrower', borrowerSchema)
module.exports = Borrower