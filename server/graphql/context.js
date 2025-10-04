import jwt from 'jsonwebtoken'
import User from '../rest/models/user.js'

export default async ({ req, connection }) => {
  try {
    let token

    if (req && req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (connection && connection.context && connection.context.Authorization) {
      token = connection.context.Authorization.split(' ')[1]
    }

    if (!token) {
      return { user: null }
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)

    return { user }
  } catch (err) {
    console.error('❌ context error:', err.message)
    return { user: null }
  }
}