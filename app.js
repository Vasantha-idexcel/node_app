const express = require('express')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(require('./config/routes'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Listening to port - ' + PORT)
})