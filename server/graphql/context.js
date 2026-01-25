import { pubsub } from './pubsub.js'
import jwt from 'jsonwebtoken'
import User from '../rest/models/user.js'

export async function verifyJwt(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return await User.findById(decoded.userId || decoded.id)
  } catch (error) {
    console.error('JWT verification failed:', error.message)
    return null
  }
}

export async function getContext({ req, connection } = {}) {
  let token = null

  // HTTP
  if (req?.headers?.authorization) {
    token = req.headers.authorization.split(' ')[1]
  }

  // WS
  if (!token && connection?.connectionParams?.Authorization) {
    token = connection.connectionParams.Authorization.split(' ')[1]
  }

  let user = null
  if (token) {
    user = await verifyJwt(token)
  }

  return { user, pubsub }
}