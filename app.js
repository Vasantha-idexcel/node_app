const express = require('express')
const passport = require('passport')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/v1/', require('./config/routes'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Listening to port - ' + PORT)
})