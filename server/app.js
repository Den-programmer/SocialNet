const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/gender', require('./routes/gender.routes.js'))
app.use('/api/avatar', require('./routes/avatar.routes.js'))
app.use('/api/profile', require('./routes/profile.routes.js'))
app.use('/api/username', require('./routes/username.routes.js'))
app.use('/api/posts', require('./routes/posts.routes.js'))
app.use('/api/users', require('./routes/users.routes.js'))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
 
if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

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