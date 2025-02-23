const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/gender', require('./routes/gender.routes.js'))
app.use('/api/avatar', require('./routes/avatar.routes.js'))
app.use('/api/profile', require('./routes/profile.routes.js'))
app.use('/api/username', require('./routes/username.routes.js'))
app.use('/api/posts', require('./routes/posts.routes.js'))
app.use('/api/users', require('./routes/users.routes.js'))
app.use('/api/news', require('./routes/news.routes.js'))
app.use('/api/notifications', require('./routes/notifications.routes.js'))
app.use('/api/images', require('./routes/images.routes.js'))


// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function startApp() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, { 
            useUnifiedTopology: true, 
            useNewUrlParser: true 
        })
        app.listen(process.env.PORT, () => {
            console.log('The server has been started on port ' + process.env.PORT + '...')
        })
    } catch (e) {
        console.error('Failed to start the server:', e)
        process.exit(1)
    }
}

startApp()