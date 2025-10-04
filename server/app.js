import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express4'
import http from 'http'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/use/ws'
import { typeDefs, resolvers } from './graphql/schema.js'
import context from './graphql/context.js'
import cors from 'cors'
import bodyParser from 'body-parser'

import authRoutes from './rest/routes/auth.routes.js'
import backgroundRoutes from './rest/routes/background.routes.js'
import genderRoutes from './rest/routes/gender.routes.js'
import avatarRoutes from './rest/routes/avatar.routes.js'
import profileRoutes from './rest/routes/profile.routes.js'
import usernameRoutes from './rest/routes/username.routes.js'
import postsRoutes from './rest/routes/posts.routes.js'
import usersRoutes from './rest/routes/users.routes.js'
import newsRoutes from './rest/routes/news.routes.js'
import notificationsRoutes from './rest/routes/notifications.routes.js'
import imagesRoutes from './rest/routes/images.routes.js'
import dialogsRoutes from './rest/routes/dialogs.routes.js'
import messagesRoutes from './rest/routes/messages.routes.js'

const app = express()
const httpServer = http.createServer(app)

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/auth', authRoutes)
app.use('/api/background', backgroundRoutes)
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

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
})
await apolloServer.start()

app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
        context: async ({ req, res }) => ({ req, res, ...context }),
    })
)

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
})

useServer(
    {
        schema: apolloServer.schema,
        context: async (ctx, msg, args) => {
            return { ...context }
        },
    },
    wsServer
)

async function startApp() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION)
        httpServer.listen(process.env.PORT || 8000, () => {
            console.log('🚀 Server started on port ' + (process.env.PORT || 8000))
        })
    } catch (e) {
        console.error('❌ Failed to start the server:', e)
        process.exit(1)
    }
}

startApp()