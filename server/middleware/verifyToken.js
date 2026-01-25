import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export function decodeToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = decodeToken(token)
    req.user = decoded.userId

    res.cookie('token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })

    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}