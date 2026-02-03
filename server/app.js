import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import http from 'http'
import { WebSocketServer } from 'ws'
import { createHandler } from 'graphql-http/lib/use/express'
import { useServer } from 'graphql-ws/lib/use/ws'
import { makeExecutableSchema } from '@graphql-tools/schema'

import { typeDefs, resolvers } from './graphql/schema.js'
import {getContext} from './graphql/context.js'


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
import AIroutes from './rest/routes/AI.routes.js'

const app = express()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())

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
app.use("/api/ai", AIroutes)

const schema = makeExecutableSchema({ typeDefs, resolvers })

const httpServer = http.createServer(app)

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql'
})

app.use(
  '/graphql',
  createHandler({
    schema,
    context: async (req) => {
      return getContext({ req })
    }
  })
)

useServer(
  {
    schema,
    context: async (ctx) => {
      return getContext({ connection: ctx })
    }
  },
  wsServer
)

async function startApp() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION)
    httpServer.listen(process.env.PORT || 8000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 8000}`)
    })
  } catch (err) {
    console.error('❌ Failed to start server:', err)
    process.exit(1)
  }
}

startApp()