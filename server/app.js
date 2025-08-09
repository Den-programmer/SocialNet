import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

import authRoutes from './routes/auth.routes.js'
import genderRoutes from './routes/gender.routes.js'
import avatarRoutes from './routes/avatar.routes.js'
import profileRoutes from './routes/profile.routes.js'
import usernameRoutes from './routes/username.routes.js'
import postsRoutes from './routes/posts.routes.js'
import usersRoutes from './routes/users.routes.js'
import newsRoutes from './routes/news.routes.js'
import notificationsRoutes from './routes/notifications.routes.js'
import imagesRoutes from './routes/images.routes.js'
import dialogsRoutes from './routes/dialogs.routes.js'
import messagesRoutes from './routes/messages.routes.js'

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/auth', authRoutes)
app.use('/api/gender', genderRoutes)
app.use('/api/avatar', avatarRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/username', usernameRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/notifications', notificationsRoutes)
app.use('/api/images', imagesRoutes)
app.use('/api/dialogs', dialogsRoutes)
app.use('/api/messages', messagesRoutes)

// Serve static files in production
// if (process.env.NODE_ENV === 'production') {
//     app.use('/', express.static(resolve(__dirname, 'client', 'build')))
//     app.get('*', (req, res) => {
//         res.sendFile(resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }

async function startApp() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION)
        app.listen(process.env.PORT || 8000, () => {
            ('Server started on port ' + (process.env.PORT || 8000))
        })
    } catch (e) {
        console.error('Failed to start the server:', e)
        process.exit(1)
    }
}

startApp()