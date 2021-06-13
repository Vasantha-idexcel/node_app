const { mongoose, validator } = require('./mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(v) {
            if (!validator.isEmail(v)) {
                throw new Error("Invalid Email provided")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(v) {
            if (!validator.isStrongPassword(v)) {
                throw new Error([
                    "Minimum length of Password should be 8",
                    "1 Uppercase and 1 Lowercase character should be included",
                    "Atleast 1 number and 1 symbol should be included"
                ])
            }
        }
    },
    token: {
        type: String
    }
})

userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User