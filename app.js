const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

dotenv.config()

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes.js'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

async function startApp() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
        app.listen(process.env.PORT, () => console.log('The server has been started on port ' + process.env.PORT + '...'))
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

startApp()